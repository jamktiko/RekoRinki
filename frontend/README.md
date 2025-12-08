# 🎨 Frontend

This project was generated using [Angualr CLI](https://github.com/angular/angular-cli) version 18.2.21

## 🧑‍💻 Setup for New Developers

1. Clone the repo

   ```bash
   git clone https://github.com/<user>/<repo>.git

   ```

2. Check Node version

   ```bash
   nvm use 22.20.0

   ```

3. Go to frontend folder

   ```bash
   cd frontend

   ```

4. Install dependencies

   ```bash
   npm install

   ```

5. Run project

   ```bash
   ng serve

   ```

   Visit: `http://localhost:4200`

---

## ▶️ Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## 🧩 Code scaffolding

Run this comment to generate a new component:

```bash
ng generate component component-name

```

## 🌐 Ympäistömuuttuijat (API-yhtys)

`src/environments/environment.ts`

```bash
export const environment = {
  apiUrl: 'https://reko-rinki.eu-north-1.elasticbeanstalk.com'
};

```

## 🧪 Vitest unit Test

In our App Reko we used the Vitest unit and e2e testes

## 🧫 Running unit tests

Run unit tests via [Vitest](https://github.com/vitest-dev/vitest).

```bash
npm run dev

```

## 🚀 Running end-to-end tests

To run the end-to-end tests:

1️⃣ Start the app

```bash
ng serve
```

2️⃣ Run Cypress

Graphical UI:

```bash
npm run cypress:open
```

Terminal mode:

```bash
npm run cypress:run
```

## ❓ Further help

To get more help on the Angular CLI use:

```bash
ng help
```

or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
