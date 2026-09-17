<p align="center">
  <a href="https://codesampa.io">
    <img src="public/assets/logo/codesampa-io-v1.svg" alt="CodeSampa.io Logo" width="150" />
  </a>
</p>

<h1 align="center">codesampa.io</h1>

<p align="center">
  <strong>The Next-Gen Software Engineering Portfolio</strong>
</p>

<p align="center">
  <a href="https://codesampa.io">
    <img src="https://img.shields.io/website?url=https%3A%2F%2Fcodesampa.io&up_message=online&down_message=offline&style=flat-square&logo=vercel&color=2563eb" alt="Website Status" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-16.0.7-black?style=flat-square&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind v4" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript" alt="TypeScript" />
</p>

<p align="center">
  <a href="#-about">🚀 About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tech-stack">⚡ Tech Stack</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-installation">🛠️ Installation</a>&nbsp;&nbsp;&nbsp;
</p>

## 🚀 About

**codesampa.io** is not just a portfolio; it is a software engineering playground developed by **Gabriel Sampaio**.

This project explores the boundaries of modern web development, utilizing **RC (Release Candidate)** and **Beta** versions of the most popular tools in the React ecosystem. The goal is to demonstrate high visual fidelity, extreme performance, and a scalable architecture ready for the future of the web.

> **Highlights:** 3D Animations with Three.js, native internationalization (EN/PT), MDX-managed blog (Velite), and next-generation styling with Tailwind v4.

---

## ⚡ Tech Stack

This project was built on a solid and modern foundation:

### 🌟 Core & Architecture

| Technology    | Version   | Role                                             |
| ------------- | --------- | ------------------------------------------------ |
| **Next.js**   | `v16.0.7` | App Router, Server Actions & Optimization.       |
| **React**     | `v19.2.0` | Modern Hooks and new rendering architecture.     |
| **Velite**    | `v0.3.0`  | Type-safe Content Layer for Blog/MDX management. |
| **Next-intl** | `v4.5.6`  | Internationalization and localized routing.      |

### 🎨 UI & Visual Experience

- **Styling:** `Tailwind CSS v4` (Engine rewritten for performance).
- **Components:** `Radix UI` (Accessibility) & `Lucide React` (Icons).
- **Motion:** `Framer Motion` (Layout transitions and scroll).
- **3D World:** `Three.js` + `@react-three/fiber` + `@react-three/rapier` (Physics and immersion).

### ⚙️ Backend & Utilities

- **Email:** `Resend` (Newsletter and Contact).
- **State Management:** `Zustand` (Lightweight global state management).
- **Validation:** `Zod` (Robust schema validation).

---

## 🛠️ Installation

To run this code lab on your machine:

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/gabriel-codesampaio/codesampa.io.git](https://github.com/gabriel-codesampaio/codesampa.io.git)
   cd codesampa.io
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Start the development server:**

   ```bash
   yarn dev
   ```

   The project will be running at `http://localhost:3000`.

---

## 📜 Scripts

- `yarn dev`: Starts the development environment.
- `yarn build`: Production build (Velite + Next Build).
- `yarn blog`: Watches for changes in MDX content (Velite watch).
- `yarn lint`: Checks code quality.
