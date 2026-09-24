# Personal Knowledge Directory

Drop the Markdown files in this directory into the `knowledge/personal/` area of the Makkahwi AI knowledge base.

## Included by default

- background.md
- places-lived.md
- education-journey.md
- travel.md
- hobbies.md
- books.md
- movies-series.md
- documentaries-podcasts-programs.md
- social-media.md
- personal-site.md

## Optional

`_optional/lifestyle.md` contains health/lifestyle information from the supplied personal profile. It is intentionally excluded from the default public corpus recommendation. Move it into the active personal knowledge directory only if this information is intentionally public/retrievable.

## Retrieval notes

The files use `domain: personal` metadata so they can coexist with the professional corpus. Cultural-library entries should be treated as curated interests, not evidence that Suhaib endorses every view expressed by the listed authors, programs, or media.

After adding this directory, regenerate the unified `chunks.jsonl` and run the normal embedding/vector ingestion command.
