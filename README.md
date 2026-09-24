# Makkahwi AI

A standalone, AI-first personal site for public information about Suhaib Ahmad. This repository currently contains the **Phase 1 foundation**: a Next.js App Router application, strict TypeScript, a base landing page, environment template, and a server-only Firebase Admin boundary. Conversation, ingestion, and RAG are planned, not active yet.

## Architecture and RAG plan

The UI will send a question and active chat ID to a Next.js Route Handler. The server will trim recent conversation context, embed the retrieval query, query Upstash Vector, build a bounded prompt from matching public chunks, call OpenAI, validate cited chunk IDs against retrieved results, persist messages in Firebase Realtime Database, and return the answer with safe source metadata. The browser will never receive embeddings or service credentials.

```text
Browser question → Next.js route → OpenAI embedding → Upstash Vector search
                                      ↓
Firebase chat storage ← validated answer ← OpenAI generation ← retrieved chunks
```

The 121 supplied records in `knowledge-base/chunks.jsonl` cover profile, experience, projects, skills, articles, and testimonials. Their Markdown sources live in `knowledge-base/knowledge/`. Each chunk has `id`, `documentId`, `documentType`, `title`, `section`, `content`, and metadata including `sourcePath`; some have language, URL, or technology fields. The supplied corpus intentionally excludes a phone number and third-party trainee details. Treat every future addition as public and review it before ingestion.

## Decisions for Phase 2

- **Vector store:** Upstash Vector with caller-provided embeddings, cosine similarity, and a 1,536-dimension index. Its REST and TypeScript APIs fit a small serverless site; the managed free tier is sufficient for the initial 121 vectors. Firebase RTDB stores application state, never vectors.
- **Generation:** OpenAI `gpt-5-mini` as an initial cost-conscious choice, subject to a grounded-answer evaluation before release.
- **Embeddings:** OpenAI `text-embedding-3-small` at its default 1,536 dimensions. A model or dimension change requires a new index or complete re-ingestion.
- **Chunk identity:** preserve supplied chunk IDs. Hash content, relevant metadata, and embedding model for incremental upserts. Delete stale IDs during explicit ingestion.
- **Retrieval:** start at `topK=5`, cap context size, and evaluate answer quality and Arabic/English retrieval with the actual corpus.
- **Response shape:** generate answer text and cited IDs, then accept only cited IDs from the retrieved set. Favor a complete validated response over streaming if streaming complicates source correctness.

## Firebase data plan

Use `devices/{deviceId}` for timestamps, `chats/{deviceId}/{chatId}` for title and timestamps, and `messages/{deviceId}/{chatId}/{messageId}` for role, content, timestamp, and validated sources. Query chat metadata by `updatedAt`, limit results, and reverse for newest first. A browser-created UUID is only an anonymous locator: it is **not authentication** and cannot protect sensitive records. Keep RTDB rules closed to clients and access it through server Route Handlers. Expose only non-sensitive public chat data and apply per-IP rate limits plus size limits before paid AI calls. Revisit whether server-managed anonymous cookies or Firebase anonymous auth are needed for stronger isolation.

## Proposed structure

```text
src/app/                 App Router pages and, later, API routes
src/components/          landing, conversation, history UI (Phase 4)
src/lib/config/          validated server configuration (Phase 2)
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

## Planned environment variables

`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, and `FIREBASE_DATABASE_URL` configure server-side Admin access. `OPENAI_API_KEY`, `AI_MODEL`, `AI_EMBEDDING_MODEL`, `AI_TOP_K`, `AI_MAX_OUTPUT_TOKENS`, and `AI_MAX_MESSAGE_LENGTH` configure RAG. `UPSTASH_VECTOR_REST_URL` and `UPSTASH_VECTOR_REST_TOKEN` configure retrieval. `RATE_LIMIT_REQUESTS` and `RATE_LIMIT_WINDOW_SECONDS` will configure the public endpoint. Values in `.env.example` are placeholders, not operational defaults.

## Updating knowledge and deployment

Phase 2 will add `npm run ai:ingest` to validate the JSONL, hash chunks, embed changed records, upsert vectors, and remove stale records. Ingestion will be a deliberate developer action, separate from application startup. The Markdown files are the human-maintained source; update prepared chunks consistently. Production hosting for `ai.suhaib.dev` has not been selected. Use a Next.js-compatible Node runtime with server-only environment variables, Firebase RTDB, and Upstash Vector.

## Security and cost controls to implement

Validate message shape and length, cap active conversation context and model output, rate limit by trusted deployment IP information rather than device ID, constrain retrieval, keep secrets server-only, time out provider calls, and log timings without full conversation text. Retrieved documents are data, never instructions. Firebase Admin access bypasses RTDB rules, so all server routes must validate paths and authorization assumptions. No user accounts or private knowledge are part of V1.

## Assumptions to confirm

The supplied corpus may be used publicly as reviewed; the Firebase project and Upstash index are not yet provisioned; hosting and exact rate-limit backing store remain undecided. The existing `knowledge-base/README.md` says its content was generated from `res.json`, which is not present in this repository. Phase 2 should inspect content quality and establish a repeatable Markdown-to-JSONL update path before ingestion.
