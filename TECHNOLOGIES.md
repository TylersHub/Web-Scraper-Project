# Pricetunity Technologies and Libraries

This document explains the main technologies, frameworks, libraries, and external services used in this project.

## Project Overview

Pricetunity is a full-stack web application with:

- A `Next.js` frontend in `Frontend/`
- A `Flask` backend in `Backend/`
- A `SQLite` database managed through `SQLAlchemy`
- Product scraping through `Bright Data`
- AI chatbot responses through `Google Gemini`

## Core Architecture

### Frontend

- `Next.js`
  - The main frontend framework.
  - Handles routing, page rendering, layouts, and production builds.
  - This project uses the App Router structure with files like `app/page.tsx` and `app/products/[id]/page.tsx`.

- `React`
  - The UI library used by Next.js.
  - Powers components, hooks, state management, and client-side interactivity.

- `React DOM`
  - Connects React components to the browser DOM.
  - Required for rendering the React app in the browser.

- `TypeScript`
  - Adds static typing to the frontend code.
  - Helps catch mistakes earlier and makes the codebase easier to maintain.

### Backend

- `Flask`
  - The main Python web framework used for the backend API.
  - Provides routes such as `/api/data` and `/api/chat`.

- `Flask-Cors`
  - Enables cross-origin requests between the frontend and backend.
  - Needed because the frontend and backend may run on different hosts or domains.

- `Flask-SQLAlchemy`
  - Integrates SQLAlchemy with Flask.
  - Used to define the `Product` model and interact with the SQLite database.

- `SQLAlchemy`
  - ORM and database toolkit used underneath Flask-SQLAlchemy.
  - Handles database table definitions, queries, inserts, and updates.

- `SQLite`
  - The current database used by the backend.
  - Stores scraped product records in `products.db`.

## Frontend Libraries

These packages are installed in `Frontend/package.json`.

### UI and Styling

- `tailwindcss`
  - Utility-first CSS framework used to style the frontend.

- `postcss`
  - CSS processing tool used in the Tailwind build pipeline.

- `autoprefixer`
  - Adds browser-specific CSS prefixes automatically when needed.

- `tailwindcss-animate`
  - Adds reusable animation utilities for Tailwind-based UI effects.

- `class-variance-authority`
  - Helps manage reusable component style variants.
  - Commonly used with shadcn/ui-style components.

- `clsx`
  - Small helper for conditionally joining CSS class names.

- `tailwind-merge`
  - Merges Tailwind class strings intelligently and resolves conflicting classes.

- `lucide-react`
  - Icon library used throughout the UI.

### Component System and UI Primitives

- `shadcn/ui`
  - Not installed as one package, but used as the component pattern for this project.
  - The project has `components.json`, which confirms shadcn/ui configuration.
  - Many installed Radix packages support these UI components.

- `@radix-ui/*`
  - Low-level accessible UI primitives used by the component layer.
  - This project includes packages for:
    - accordion
    - alert-dialog
    - aspect-ratio
    - avatar
    - checkbox
    - collapsible
    - context-menu
    - dialog
    - dropdown-menu
    - hover-card
    - label
    - menubar
    - navigation-menu
    - popover
    - progress
    - radio-group
    - scroll-area
    - select
    - separator
    - slider
    - slot
    - switch
    - tabs
    - toast
    - toggle
    - toggle-group
    - tooltip
  - These provide accessibility, keyboard support, and interaction behavior for UI components.

### Forms and Validation

- `react-hook-form`
  - Form state management library for React.
  - Useful for handling input validation and submission flows.

- `@hookform/resolvers`
  - Connects `react-hook-form` with validation libraries like `zod`.

- `zod`
  - Schema validation library.
  - Useful for validating forms and structured data.

### Utility and Feature Libraries

- `date-fns`
  - Date utility library for parsing and formatting dates.

- `sonner`
  - Toast notification library.
  - Likely used in notification-related UI.

- `cmdk`
  - Command menu component toolkit.
  - Often used for searchable menus or command palettes.

- `embla-carousel-react`
  - Carousel/slider library for React interfaces.

- `input-otp`
  - OTP or verification-code input helper.

- `react-day-picker`
  - Date picker component library.

- `react-resizable-panels`
  - Provides resizable split-panel layouts.

- `recharts`
  - Charting library for data visualizations.

- `vaul`
  - Drawer/sheet component library for mobile-style panels.

- `cheerio`
  - HTML parsing library for Node.js.
  - It is installed on the frontend side, but it does not appear to be central to the current Next.js UI flow.
  - It may be leftover from earlier work or reserved for future parsing tasks.

### Type Definitions

- `@types/node`
  - TypeScript types for Node.js APIs.

- `@types/react`
  - TypeScript types for React.

- `@types/react-dom`
  - TypeScript types for React DOM.

## Backend Libraries

These packages are installed in `Backend/requirements.txt`.

### Backend Framework and Database

- `Flask`
  - Core Python web server framework for the API.

- `Flask-Cors`
  - Enables frontend-to-backend communication across domains.

- `Flask-SQLAlchemy`
  - Flask integration for SQLAlchemy ORM.

- `SQLAlchemy`
  - ORM and SQL toolkit used for the product database.

- `greenlet`
  - Internal dependency commonly used by SQLAlchemy for some execution models.

- `Werkzeug`
  - Low-level WSGI utility library that powers much of Flask.

- `Jinja2`
  - Flask templating engine.
  - Not heavily used in the current API-first setup, but Flask includes it as part of its ecosystem.

- `itsdangerous`
  - Used by Flask for secure signing and related utilities.

- `click`
  - Supports Flask command-line behavior and developer tooling.

- `blinker`
  - Signal/event support used by Flask.

- `MarkupSafe`
  - Escaping/safe string support used with Jinja2 and Flask.

### HTTP Requests and Environment Configuration

- `requests`
  - Main HTTP client used by the backend.
  - Used to call:
    - Bright Data scraping endpoints
    - Google Gemini API

- `python-dotenv`
  - Loads environment variables from `.env` files during development.

- `urllib3`
  - Low-level HTTP library used underneath `requests`.

- `certifi`
  - Provides trusted CA certificates for HTTPS requests.

- `charset-normalizer`
  - Helps detect and normalize text encodings in HTTP responses.

- `idna`
  - Handles internationalized domain names in URLs.

### HTML Parsing and Scraping

- `beautifulsoup4`
  - Main HTML parsing library for the scraper.
  - Used to extract names, images, prices, and descriptions from product pages.

- `soupsieve`
  - CSS selector engine used underneath Beautiful Soup.

### AI and External Service Integration

- `requests`
  - Also used for communicating with the Gemini API for chatbot responses.

- `Bright Data`
  - External scraping service, not a Python package.
  - Used to fetch protected ecommerce pages more reliably.

- `Google Gemini`
  - External AI model service, not a Python package.
  - Used to generate chatbot answers based on search results and product context.

### Deployment and Production Serving

- `gunicorn`
  - Production WSGI server used to run the Flask app on Render.

- `asgiref`
  - ASGI helper utilities package.
  - Present in dependencies, but not central to the main Flask code path.

- `packaging`
  - Utility library for version parsing and package handling.

- `typing_extensions`
  - Backports typing features for compatibility.

### Selenium and Browser Automation Packages

- `selenium`
  - Browser automation library.
  - It is installed, but the current backend code primarily uses Bright Data plus Beautiful Soup instead of active Selenium browser automation.

- `webdriver-manager`
  - Helps download and manage browser drivers for Selenium.

- `PySocks`
  - SOCKS proxy support, often useful in scraping/network tooling.

- `attrs`
  - Utility library used by Selenium-related packages and others.

- `outcome`
  - Async helper library used by `trio`.

- `sniffio`
  - Detects which async library is currently running.

- `sortedcontainers`
  - Data structure library used by async/browser tooling.

- `trio`
  - Async concurrency library used by Selenium dependencies in some cases.

- `trio-websocket`
  - WebSocket support for Trio-based flows.

- `websocket-client`
  - WebSocket client library.

- `wsproto`
  - WebSocket protocol implementation.

- `h11`
  - HTTP/1.1 protocol implementation used by networking packages.

- `cffi`
  - C Foreign Function Interface package for Python.

- `pycparser`
  - Parser used by `cffi`.

- `colorama`
  - Cross-platform terminal color support.

## Project Technologies Beyond Libraries

### Routing

- `Next.js App Router`
  - Used for route files like:
    - `app/page.tsx`
    - `app/products/[id]/page.tsx`
    - `app/ui-preview/page.tsx`

### Database Model

- `Product` model
  - Stored in SQLite using SQLAlchemy.
  - Contains:
    - `id`
    - `name`
    - `image`
    - `url`
    - `price`
    - `description`

### Scraping Strategy

- `Bright Data`
  - Retrieves ecommerce HTML content through a scraping/unlocking service.

- `Beautiful Soup`
  - Parses the returned HTML and extracts the product details.

- `Regular Expressions`
  - Used in the backend to clean image URLs and sanitize text.

### AI Chatbot

- `Google Gemini API`
  - Generates product-related chatbot responses.
  - The backend controls prompt rules, context sanitization, and error handling before sending requests to Gemini.

### Environment Variables

The project uses environment variables for configuration such as:

- `NEXT_PUBLIC_BACKEND_URL`
- `BRIGHT_DATA_API_KEY`
- `BRIGHT_DATA_ZONE`
- `BRIGHT_DATA_URL`
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `MAX_DESCRIPTION_SCRAPES_PER_SEARCH`

## Hosting and Deployment Technologies

- `Render`
  - Used for backend hosting.
  - Runs the Flask app with Gunicorn.

- `Hostinger`
  - Used for frontend hosting.

- `GitHub`
  - Used as the source control and deployment-connected repository.

## Notes on Usage

- Some libraries are core to the current app.
  - Examples: `Next.js`, `React`, `Flask`, `Flask-SQLAlchemy`, `BeautifulSoup`, `requests`, `Tailwind CSS`, `lucide-react`.

- Some libraries are installed because of shadcn/ui setup or earlier experimentation.
  - Examples: many `@radix-ui/*` packages, `selenium`, `webdriver-manager`, `cheerio`, `recharts`, `react-day-picker`.

- That means not every installed dependency is necessarily used heavily on the current main user flow, but it is still part of the project dependency list and available to the codebase.

## Short Summary

Pricetunity uses:

- `Next.js + React + TypeScript` for the frontend
- `Flask + SQLAlchemy + SQLite` for the backend
- `Tailwind CSS + shadcn/ui + Radix UI` for styling and components
- `Beautiful Soup + Bright Data` for product scraping
- `Google Gemini` for chatbot features
- `Render + Hostinger + GitHub` for deployment and hosting
