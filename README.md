# E-Commerce Care – Angular Universal E-Commerce Platform

## 🧾 Project Overview

This is a **full-stack e-commerce platform** built using **Angular** with **Angular Universal (SSR)** for improved SEO and initial load performance. It integrates a modular **authentication library (`auth-api`)** that communicates with an external Auth microservice, and supports product/category APIs, static mock data, and a responsive design.

---

## 📦 Architecture & Main Components

### 1. 🌐 Browser (Client SPA)
Responsible for rendering the Angular app in the browser and communicating with the APIs.

- `src/main.ts`
- `src/index.html`
- `src/app/app.component.ts` / `.html` / `.scss`

### 2. 🧠 SSR Server (Angular Universal + Express)
Handles server-side rendering and proxies requests.

- `src/server.ts`
- `src/main.server.ts`
- `src/app/app.config.server.ts`
- `src/app/app.routes.server.ts`

### 3. 🧩 Angular App Structure

#### 🛠️ Core Module
Contains base classes, adapters, interceptors, global services, enums, and interfaces.

- `src/app/core/adapters/*.adapter.ts`
- `src/app/core/base/*.ts` (e.g., `ProductsAPI.ts`, `CategoriesAPI.ts`)
- `src/app/core/enums/api.endpoints.ts`
- `src/app/core/interfaces/*.ts`
- `src/app/core/interceptors/loading.interceptor.ts`
- `src/app/core/service/*.service.ts`
- `src/app/core/layout/*`
- `src/app/core/locale/en.json`, `ar.json`
- `src/app/core/pages/Authcomponents/*`

#### 📦 Features Module
Feature-specific components and pages.

- `src/app/features/pages/home/`
- `src/app/features/pages/all-prodect/`
- `src/app/features/pages/single-product/`
- `src/app/features/pages/cart/`
- `src/app/features/pages/checkout/`
- `src/app/features/pages/about/`
- `src/app/features/pages/static pages/`

#### 🧱 Shared Module
Reusable components, pipes, utilities.

- `src/app/shared/components/ui/*`
- `src/app/shared/pipes/truncate.pipe.ts`
- `src/app/shared/texts/texts.component.ts`
- `src/app/shared/utilites/validsignup.ts`

### 4. 🔐 `auth-api` Library
A standalone Angular library for interacting with the external Authentication Microservice.

- `projects/auth-api/src/lib/base/AuthAPI.ts`
- `projects/auth-api/src/lib/adaptor/*.adapter.ts`
- `projects/auth-api/src/lib/enums/AuthAPI.endpoint.ts`
- `projects/auth-api/src/lib/interface/*.ts`
- `projects/auth-api/src/lib/auth-api.service.ts`
- `projects/auth-api/public-api.ts`

### 5. 🌐 External Services
- Authentication Microservice (via `auth-api`)
- Products API (`core/base/ProductsAPI.ts`)
- Categories API (`core/base/CategoriesAPI.ts`)

### 6. 📂 Static JSON Fixtures (Mock Data)
Used for local testing/demo.

- `public/assets/data/*.json` (cart, data, images, product)

---

## 🔁 Data Flow

```plaintext
Browser → SSR Server → Angular Universal → Initial HTML
Browser ↔ Angular Services ↔ External APIs (Auth, Products, Categories)
Services ↔ Adapters ↔ Domain Interfaces ↔ UI Components
```

---

## 🎯 Design Patterns

- **Modular Architecture:** Core, Features, Shared
- **Adapter Pattern:** Transforms API payloads to internal models
- **Dependency Injection:** For services and interceptors
- **Library Isolation:** `auth-api` for reusable authentication logic
- **SSR:** Improves SEO and initial load times

---

## 🧰 Technologies Used

- Angular CLI, Angular Universal
- Express.js (for SSR)
- TypeScript, SCSS, Tailwind CSS
- JSON for local data
- i18n: Multilingual support (EN/AR)
- Unit Testing Stubs (`*.spec.ts`)

---

## 🗂️ Folder Structure Summary

```plaintext
src/
├── app/
│   ├── core/
│   ├── features/
│   ├── shared/
│   ├── app.component.*
│   ├── app.config.server.ts
│   ├── app.routes.server.ts
├── server.ts
├── main.server.ts
projects/
└── auth-api/
    └── src/lib/
public/
└── assets/data/
```

---

## 📌 Notes

- All API interaction is abstracted through the Core module.
- The auth-api is completely decoupled from the main app for reusability.
- Static data under `public/assets/data/` is useful for offline demos or mock states.
- The app is fully responsive and optimized for SEO and performance.

---

## 📈 Future Enhancements

- Integrate payment gateways
- Add real-time order tracking
- Enhance unit/e2e test coverage

---

## 🧾 License

MIT – Free to use and modify.
