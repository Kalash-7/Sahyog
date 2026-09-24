# Sahyog: SIH 2026 Prototype
**Tagline:** “Every Problem Deserves a Path to a Solution.”
**Tech Stack:** React (via Vite), Tailwind CSS, React Router DOM, Lucide React Icons.
**Architecture:** Client-side only Single Page Application (SPA). Use React Context and localStorage to simulate a full database for a live pitch demo.

**Core Data Model (Challenge):**
- id, title, description, district, status (Submitted, Validated, Assigned, In Progress, Completed), industryFunded, industryPartner
- ai_analysis: { domain, keywords, priority, duplicate_flag, recommended_uni, match_reason }

**Routes Required:**
1. `/` (Home): Landing page with portal links.
2. `/citizen`: Submit challenge (Text, Image dropzone, Location).
3. `/admin`: Government validation dashboard (AI explainability).
4. `/university`: Workspace to accept challenges and track lifecycle.
5. `/industry`: CSR Funding marketplace.