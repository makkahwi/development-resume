# Makkahwi AI

A standalone, AI-first personal site for public information about Suhaib Ahmad. The site contains the Phase 1 foundation, a Phase 2 server-side RAG pipeline, and an interactive landing-page chat preview. Ingestion is explicit and the answer route is development-only. Chat persistence and the full production chat UI are still pending.

## Architecture and RAG plan

The UI will send a question and active chat ID to a Next.js Route Handler. The server will trim recent conversation context, embed the retrieval query, query Upstash Vector, build a bounded prompt from matching public chunks, call Google Gemini, validate cited chunk IDs against retrieved results, persist messages in Firebase Realtime Database, and return the answer with safe source metadata. The browser will never receive embeddings or service credentials. A small `LlmProvider` boundary isolates Gemini generation; an independent `EmbeddingProvider` boundary isolates embedding generation.

```text
Browser question → Next.js route → Gemini Embedding 2 → Upstash Vector search
                                      ↓
Firebase chat storage ← validated answer ← Google Gemini generation ← retrieved chunks
```

The 121 supplied records in `knowledge-base/chunks.jsonl` cover profile, experience, projects, skills, articles, and testimonials. Their Markdown sources live in `knowledge-base/knowledge/`. Each chunk has `id`, `documentId`, `documentType`, `title`, `section`, `content`, and metadata including `sourcePath`; some have language, URL, or technology fields. The supplied corpus intentionally excludes a phone number and third-party trainee details. Treat every future addition as public and review it before ingestion.

## Phase 2 implementation

Create a 1,536-dimensional Upstash Vector index using cosine similarity and caller-provided vectors. Set `GEMINI_API_KEY`, `UPSTASH_VECTOR_REST_URL`, and `UPSTASH_VECTOR_REST_TOKEN` in `.env.local`. The command reads only `knowledge-base/chunks.jsonl`, validates every chunk, compares SHA-256 hashes in its dedicated namespace, embeds changed chunks, upserts them, then removes stale vectors after successful upserts. Run it deliberately with `npm run ai:ingest -- --execute`. Re-run it after changing the corpus. Ingestion does not run on application startup.

Start `npm run dev`, then send a direct development request: `curl -sS -X POST http://localhost:3000/api/dev/answer -H "Content-Type: application/json" -d '{"question":"What did Suhaib build for Sanad?"}'`. The route is unavailable outside development. Until Upstash is configured, the development route uses keyword retrieval over the checked-in public chunks so the landing input can be exercised. This is a preview fallback, not a substitute for validating Upstash retrieval. Answers carry only sources whose IDs were retrieved; unsupported output falls back to an explicit insufficient-evidence answer. Run `npm run test:ai` for corpus and pipeline tests.

## Decisions for Phase 2

- **Vector store:** Upstash Vector with caller-provided embeddings, cosine similarity, and a 1,536-dimension index. Its REST and TypeScript APIs fit a small serverless site; the managed free tier is sufficient for the initial 121 vectors. Firebase RTDB stores application state, never vectors.
- **Generation:** Google Gemini `gemini-3.5-flash-lite` through the official `@google/genai` SDK. This Flash Lite model is currently listed for new projects and has free-tier input and output. The model is configurable with `GEMINI_MODEL`.
- **Embeddings:** Separately selected `gemini-embedding-2`, using a 1,536-dimensional output with Upstash cosine similarity. Documents and queries use the model’s recommended question-answering prefixes. This embedding model is currently free for text input. A model or dimension change requires a new index or complete re-ingestion; embedding spaces are incompatible.
- **Chunk identity:** preserve supplied chunk IDs. Hash content, relevant metadata, and embedding model for incremental upserts. Delete stale IDs during explicit ingestion.
- **Retrieval:** start at `topK=5`, cap context size, and evaluate answer quality and Arabic/English retrieval with the actual corpus.
- **Response shape:** generate answer text and cited IDs, then accept only cited IDs from the retrieved set. Favor a complete validated response over streaming if streaming complicates source correctness.

## Firebase data plan

Use `devices/{deviceId}` for timestamps, `chats/{deviceId}/{chatId}` for title and timestamps, and `messages/{deviceId}/{chatId}/{messageId}` for role, content, timestamp, and validated sources. Query chat metadata by `updatedAt`, limit results, and reverse for newest first. A browser-created UUID is only an anonymous locator: it is **not authentication** and cannot protect sensitive records. Keep RTDB rules closed to clients and access it through server Route Handlers. Expose only non-sensitive public chat data and apply per-client rate limits plus size limits before AI calls. Revisit whether server-managed anonymous cookies or Firebase anonymous auth are needed for stronger isolation.

## Proposed structure

```text
src/app/                 App Router pages and, later, API routes
src/components/          landing, conversation, history UI (Phase 4)
src/lib/ai/config.ts      validated server AI configuration
src/lib/firebase/        server-only Admin SDK and chat repository
src/lib/ai/              embedding, retrieval, prompt, generation, RAG modules
src/lib/vector/          Upstash adapter
src/types/               shared public DTOs
scripts/                 explicit knowledge ingestion
knowledge-base/          reviewed Markdown and prepared JSONL chunks
```

## Local setup

Requires Node.js 20.9 or newer (Node 22 recommended). Run `npm install`, then `npm run dev`. Visit `http://localhost:3000`. Run `npm run typecheck`, `npm run lint`, and `npm run build` before a release. The Phase 1 landing page does not require service credentials.

The development checks follow the repository's `8.x` branch: `.nvmrc` selects Node 22, Husky runs lint-staged on commit, commitlint checks conventional commit messages, and a pre-push hook runs TypeScript typechecking. `npm install` runs the `prepare` script to set up hooks. The lint-staged rule runs ESLint with fixes on staged JavaScript and TypeScript files. Run `npm run lint` for a full-project check.

Copy `.env.example` to `.env.local` when implementing external services. Do not commit `.env.local` or service account credentials.

## Environment variables

`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, and `FIREBASE_DATABASE_URL` configure server-side Admin access. `GEMINI_API_KEY`, `GEMINI_MODEL`, `AI_EMBEDDING_MODEL`, `AI_TOP_K`, `AI_MAX_OUTPUT_TOKENS`, and `AI_MAX_MESSAGE_LENGTH` configure RAG. `UPSTASH_VECTOR_REST_URL` and `UPSTASH_VECTOR_REST_TOKEN` configure retrieval. `RATE_LIMIT_REQUESTS` and `RATE_LIMIT_WINDOW_SECONDS` configure the development route limiter. The example file contains operational defaults for non-secret settings. The API key and Upstash credentials must be supplied privately.

## Updating knowledge and deployment

`npm run ai:ingest -- --execute` validates the JSONL, hashes chunks, embeds changed records, upserts vectors, and removes stale records. Ingestion is a deliberate developer action, separate from application startup. The Markdown files are the human-maintained source; update prepared chunks consistently. Production hosting for `ai.suhaib.dev` has not been selected. Use a Next.js-compatible Node runtime with server-only environment variables, Firebase RTDB, and Upstash Vector.

## Search visibility

The landing page includes a visible, server-rendered public profile so visitors and crawlers can understand the site before chat is available. Keep its claims aligned with the reviewed files in `knowledge-base/knowledge/`. The App Router supplies canonical and social metadata, an Open Graph image, an icon, `robots.txt`, `sitemap.xml`, and WebSite/WebPage/Person structured data. The sitemap lists only routes that currently exist. Future anonymous chat routes must set `noindex` on the response itself; robots rules alone do not guarantee exclusion from search results. After deployment, verify the production URLs and submit the sitemap through the search engine's webmaster tools.

## Security, privacy, and free-tier limits

The development route validates question length, bounds conversation and RAG context, caps output, applies a per-client in-memory limit, and handles Gemini quota and timeout responses with friendly errors. It is disabled in production. Before exposing a public route on serverless hosting, replace the in-memory limiter with a shared store and determine client identity from trusted proxy information. Keep the API key server-side and do not log full conversations. Retrieved documents are data, never instructions. Firebase Admin access bypasses RTDB rules, so all server routes must validate paths and authorization assumptions. No user accounts or private knowledge are part of V1.

Google's [Developer API pricing page](https://ai.google.dev/gemini-api/docs/pricing) currently says free-tier content may be used to improve Google's products. Only the current question, bounded relevant conversation text, system instructions, and retrieved public chunks are sent for generation. Device IDs, Firebase IDs, IP addresses, analytics, unrelated history, and environment data are excluded. The embedding endpoint receives only the text being embedded. Do not put private data in the public knowledge base or development requests. Check current pricing, data practices, and quotas before public launch.

The chosen [Flash Lite model](https://ai.google.dev/gemini-api/docs/models) and [embedding model](https://ai.google.dev/gemini-api/docs/embeddings) are independently configurable. There is no paid-provider fallback. Quota exhaustion returns a short retry message.

## Assumptions to confirm

The supplied corpus may be used publicly as reviewed; the Firebase project and Upstash index are not yet provisioned; hosting and exact rate-limit backing store remain undecided. The existing `knowledge-base/README.md` says its content was generated from `res.json`, which is not present in this repository. Phase 2 should inspect content quality and establish a repeatable Markdown-to-JSONL update path before ingestion.
