# Suhaib AI Knowledge Base

Generated from the existing website `res.json`.

## Output
- `knowledge/` — AI-friendly Markdown source documents.
- `chunks.jsonl` — 121 semantic chunks ready for embedding.
- `manifest.json` — generation summary.

## Recommended RAG architecture with Firebase Realtime Database

Keep Firebase RTDB for the website/application data. It does not provide native vector similarity search, so do not force embeddings into RTDB and scan them manually.

Recommended flow:

1. Maintain these Markdown files as the AI knowledge source.
2. Run an ingestion script when the content changes.
3. Create an embedding for every record in `chunks.jsonl`.
4. Store vectors in a vector-search service/database.
5. Keep Firebase RTDB for normal application state and optionally chat/session metadata.
6. On each question:
   - embed the question;
   - retrieve the top relevant chunks;
   - pass those chunks + question to the LLM;
   - return the answer with source metadata.

## Chunk design

Chunks are semantic rather than arbitrary slices:
- project overview/contributions/technology sections stay meaningful;
- each job is its own document;
- blog articles are split by headings;
- Arabic and English versions carry language metadata;
- metadata includes project/company/technology/category/source path where available.

The chunk `content` is what should be embedded. Do not embed the full JSON wrapper.

## Suggested retrieval defaults

Start with top 5 chunks. Ask the model to answer only from retrieved context and to say when the knowledge base does not contain an answer. Return `documentId`, `title`, `section`, and any project URL as sources.

## Privacy choices

The source contained a WhatsApp contact and named trainees. Those were excluded from the RAG corpus because a public AI assistant does not need to retrieve third-party personal information or a phone number to answer professional questions.
