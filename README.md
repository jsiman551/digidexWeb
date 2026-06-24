# Digidex - Digimon Encyclopedia

## 📖 Overview

Digidex is a web application built with **Next.js** and **TypeScript** that allows users to explore detailed information about Digimon: levels, attributes, types, fields, evolutions, and skills.  
The project is designed with a modern, scalable, and SEO-friendly approach, supporting **native light/dark mode** based on the user's system preferences.

---

## 🛠️ Technologies Used

- **Next.js 13+ (App Router)** – React framework for modern web applications.
- **TypeScript** – Static typing for maintainability and robustness.
- **TailwindCSS v4+** – Utility-first styling with native light/dark mode support.
- **Prettier** – Standardized code formatting.
- **ESLint** – Linter to enforce best practices.
- **Digi API** – External API for Digimon data.
- **next/image** – Image optimization.
- **React Hooks** – State and effect management (`useState`, `useEffect`, `useMemo`, `useCallback`).

---

## 📂 Project Structure

project/  
├── app/  
│ ├── layout.tsx # Root layout with header, footer, and light/dark mode  
│ ├── page.tsx # Main page  
│ ├── favicon.ico # Project favicon  
│ ├── digimon/  
│ │ ├── page.tsx # Digimon list page  
│ │ └── [id]/page.tsx # Digimon detail page  
│  
├── components/  
│ ├── ClientHeader.tsx # Header with SEO-friendly logo  
│ ├── DigimonCard.tsx # Card component for Digimon  
│ ├── EvolutionsSection.tsx # Previous and next evolutions section  
│ ├── FiltersBar.tsx # Search and filter bar  
│ └── Tooltip.tsx # Accessible tooltip with light/dark support  
│  
├── lib/  
│ └── api.ts # Functions to consume Digi API

---

## 🚀 Key Features

- Digimon exploration with **pagination and filters**.
- **Detailed view** with attributes, levels, types, fields, evolutions, and skills.
- **Native light/dark mode** (no toggle, depends on system settings).
- **Responsive design** with TailwindCSS.
- **SEO-friendly**: titles, descriptions, and favicon configured.
- **Accessible tooltips** with consistent contrast in both modes.

---

## ▶️ Available Scripts

- `npm run dev` – Start the development server.
- `npm run build` – Build the app for production.
- `npm run start` – Run the app in production mode.
- `npm run format` – Format code using Prettier.
- `npm run format:check` – Verify code formatting.

---
