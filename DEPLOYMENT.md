# Deployment status & steps

The portfolio auto-adds a **Live demo** button to a project the moment its
GitHub repo has a **homepage URL** set. So the flow for every project is:
**deploy → copy the URL → set it as the repo's homepage** (Repo ▸ About ▸ ⚙ ▸ Website).

| Project | Host | Status | Needs |
|---|---|---|---|
| Visual Product Matcher | GitHub Pages (in-browser CLIP) | ✅ **LIVE** | — done, no account |
| TaskFlow API + client | Render (Blueprint) | ✅ ready to deploy | Render account |
| Lyftr webhook service | Render (Blueprint) | ✅ ready to deploy | Render account |
| Car Price | GitHub Pages (in-browser ML) | ✅ **LIVE** | — done, no account |
| Finance backend | Render + MongoDB Atlas | ⏳ security fixed; needs DB | Atlas account + rotate secret |
| Advanced RAG | Render/HF + Groq | ⏳ needs LLM swap | Groq API key |
| Peblo Quiz Engine | Render/HF + Groq | ⏳ needs LLM swap | Groq API key |
| Fraud Guard | Render + Vercel/Render | ⏳ needs Firebase | Firebase project + web config |

## Render (TaskFlow, Lyftr, Car Price)
1. https://render.com → sign up with GitHub → authorize.
2. **New ▸ Blueprint** → pick the repo → **Apply**. Render reads `render.yaml`.
3. Wait for build, open the service URL, confirm it works.
4. Set that URL as the repo's homepage (Repo ▸ About ▸ ⚙ ▸ Website).

> Free Render services sleep after 15 min idle; first hit wakes in ~30 s.

## Hugging Face (Visual Product Matcher)
1. https://huggingface.co → sign up.
2. **New ▸ Space** → name `visual-product-matcher`, SDK **Streamlit** → Create.
3. **Files ▸ Add file ▸ Upload files** → upload `app.py`, `utils.py`,
   `requirements.txt`, `features_clip.pkl`, `products.csv` from the repo.
4. It builds automatically. Set the Space URL as the repo homepage.

## Still needed from you
- **Groq API key** (free, console.groq.com) → unlocks RAG + Peblo online.
- **MongoDB Atlas** free cluster + rotate the old DB password → Finance.
- **Firebase** project + web config → Fraud Guard.
