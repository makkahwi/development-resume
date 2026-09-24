# Work imagery

These five assets came from the public Firebase Storage bucket used by the existing `8.x` portfolio. Their filenames were matched to entries in the user-supplied `resume-data-8215f-default-rtdb-export.json`:

| Local file | Export entry | Storage object |
| --- | --- | --- |
| `sanad.jpg` | `developer.projects[0].image` | `20.jpg` |
| `mustaheq.jpg` | `developer.projects[9].image` | `29.jpg` |
| `deloitte.png` | `developer.clients[3].image` | `deloitte.png` |
| `modee.png` | `developer.clients[0].image` | `modee.png` |
| `several-brands.png` | `developer.clients[10].image` | `severalBrands.png` |

The storage URL follows the `NEXT_PUBLIC_STORAGE_URL` value in the `8.x` branch's `.env.local.example`. Keeping local copies makes the landing background independent of runtime requests to the old portfolio bucket.

`hobbies-triptych.png` is a generated editorial illustration of hobbies documented in the public knowledge base; it is not a photograph of Suhaib.
