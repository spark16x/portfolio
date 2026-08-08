# Spark — Pratham Vig | Personal Portfolio

A modern, high-performance developer portfolio showcasing digital experiences, SaaS products, and creative experiments. Built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Lenis Smooth Scroll**.

![Spark Portfolio](/assets/images/page.png)

---

## ✨ Features

- ⚡ **React 18 & TypeScript**: Component-driven architecture with strict type safety.
- 🚀 **Vite Bundler**: Instant Hot Module Replacement (HMR) and optimized build outputs.
- 🌊 **Lenis Smooth Scrolling**: Buttery-smooth wheel and touch scrolling with dynamic ScrollSpy navbar indicators.
- 🧲 **Magnetic Cursor & Fill Buttons**: Dynamic, cursor-aware button fill expansion animations.
- 🧊 **3D Card Perspective Tilt**: Interactive 3D tilt effects on mouse hover and mobile device orientation.
- ⌨️ **Typewriter Hero**: Animated text effect cycling through developer titles.
- 🎨 **Material Design 3 Token System**: Custom extended Tailwind CSS palette, typography (`Geist`, `Inter`), and glassmorphism styling.
- 📱 **Fully Responsive**: Mobile-first layout with touch optimizations and motion chip indicator.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Smooth Scroll Engine**: [Lenis](https://lenis.darkroom.engineering/) (`@lenis/react`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Geist & Inter via Google Fonts

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher) and `npm` installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/spark16x/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

---

## 📦 Build & Deployment

### Production Build
To run TypeScript type checks and generate an optimized production bundle:

```bash
npm run build
```

### Preview Production Build
To preview the compiled production build locally:

```bash
npm run preview
```

---

## 📂 Project Structure

```
portfolio/
├── public/
│   └── assets/
│       ├── images/        # Project images & avatar
│       └── logo/          # Favicons & manifest
├── src/
│   ├── components/        # Reusable React components (.tsx)
│   │   ├── About.tsx
│   │   ├── AtmosphericBlurs.tsx
│   │   ├── BackToTop.tsx
│   │   ├── Clients.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── Navbar.tsx
│   │   ├── Skills.tsx
│   │   ├── TiltCard.tsx
│   │   └── Typewriter.tsx
│   ├── App.tsx            # Main application shell with Lenis provider
│   ├── main.tsx           # Application entry point
│   ├── index.css          # Tailwind base & custom utility styles
│   └── vite-env.d.ts      # TypeScript declarations
├── index.html             # HTML entry shell with SEO meta tags
├── package.json           # Scripts & dependencies
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Extended Tailwind theme & tokens
└── vite.config.ts         # Vite configuration
```

---

## 👤 Author

**Spark (Pratham Vig)**
- **GitHub**: [@spark16x](https://github.com/spark16x)
- **Instagram**: [@spark16.x](https://instagram.com/spark16.x)
- **Email**: [spark2009971@gmail.com](mailto:spark2009971@gmail.com)
- **Fiverr**: [Hire Me](https://www.fiverr.com/s/Q7Lj2de)

---

© 2024 Spark (Pratham Vig). Crafted with precision.
