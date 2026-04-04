# Pricetunity

This repository contains an older, unfinished public version of the Pricetunity project.

## Status

This repo should be treated as:

- old
- outdated
- unfinished
- a work-in-progress prototype rather than a final production-ready codebase

The live idea behind Pricetunity is product search, price comparison, scraping product data from online stores, and offering AI-assisted shopping help. This repository reflects development work toward that idea, but it is not a polished or complete final release.

## What This Project Contains

- A `Next.js` frontend in `Frontend/`
- A `Flask` backend in `Backend/`
- Product scraping logic for ecommerce search results
- A simple product database using `SQLite`
- AI chatbot integration using `Google Gemini`

## Important Notes

- Some features are still experimental or partially implemented.
- Some dependencies were added during development and may not all be central to the current app flow.
- Deployment, scraping reliability, and external API integrations may require additional setup and maintenance.
- If you are reviewing this project, treat it as a prototype or archived development snapshot.

## Tech Stack

Main technologies used in this repo:

- `Next.js`
- `React`
- `TypeScript`
- `Tailwind CSS`
- `Flask`
- `SQLAlchemy`
- `SQLite`
- `Beautiful Soup`
- `Bright Data`
- `Google Gemini`

A fuller breakdown is available in [TECHNOLOGIES.md](C:\Users\callo\Desktop\CODING\MAIN_PROJECTS\Web Scraper\Web-Scraper-Project\TECHNOLOGIES.md).

## Project Structure

```text
Backend/
  app.py
  scraper.py
  requirements.txt

Frontend/
  app/
  components/
  lib/
  package.json
```

## Local Development

### Backend

From the project root:

```powershell
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The backend expects environment variables for services like Bright Data and Gemini. In development, these are typically provided through `Backend/.env`.

### Frontend

From the project root:

```powershell
cd Frontend
npm install
npm run dev
```

For local frontend-to-backend communication, configure:

- `Frontend/.env.local`
- `NEXT_PUBLIC_BACKEND_URL=http://localhost:5000`

## Deployment

The project has been worked on with this general setup:

- Backend hosted on `Render`
- Frontend hosted on `Hostinger`
- Source code hosted on `GitHub`

Deployment is not fully standardized in this repository, so expect to do some manual environment-variable and hosting configuration.

## Live Site

Project domain:

- [https://pricetunity.com/](https://pricetunity.com/)

The live site may differ from the state of this repository, since this repo is explicitly an older and unfinished code snapshot.

## Why This README Is Framed This Way

This README intentionally marks the project as old, outdated, and unfinished so there is no confusion about the repo's current maturity. It is still useful as a development reference, portfolio artifact, and foundation for future work, but it should not be presented as a finalized production codebase.
