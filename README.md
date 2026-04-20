# TaskManager - Projet fil rouge CI/CD

Application Node.js/Express avec :
- API REST CRUD `/api/tasks`
- interface web minimale
- tests unitaires Jest
- tests API Supertest
- tests E2E Playwright
- reporting Allure
- exemples GitHub Actions, Docker

## Installation

```bash
npm install
npx playwright install --with-deps chromium
```

## Lancement local

```bash
npm run dev
```

Puis ouvrir : http://localhost:3000

## Tests

```bash
npm test
npm run test:api
npm run test:e2e
npm run test:coverage
```

## Rapport Allure

```bash
npm run test:all
npm run allure:generate
npm run allure:open
```
