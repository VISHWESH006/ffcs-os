# VTOP FFCS Registration Demo

An unofficial frontend simulation inspired by the VIT Bhopal VTOP course registration flow. This project is not affiliated with or endorsed by VIT Bhopal. All student, course, offering, faculty, and seat data is fictional. It does not connect to VTOP or perform real registration. Never enter actual VTOP credentials.

## Local development

Requirements: Node.js 22.12 or newer and npm.

```sh
npm install
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173/`.

## Demo login and scenarios

Use fictional values, such as register number `DEMO123`, any demo password, and captcha `7 K 4 P` (spaces and letter case are ignored). The app validates these locally; it does not authenticate with a service. Password and captcha values are not saved. Only a fixed `DEMO-SESSION` marker is persisted in localStorage, never the entered register number.

Choose **Programme Core (PC)**. Register `MCA1005` in `A11+A12+A13`, then try `MCA1002` in the same slot to see a clash. Modify `MCA1005` to `D11+D12+B14`, return to the course list, and register `MCA1002`. `MCA1002` also has a full zero-seat option; `MCA1003` has an unknown-seat option. Registered courses and the weekly timetable use the same atomic slot mapping.

Use **View Registered Course(s)** to see registered details and the generated timetable. **Reset Demo Data** clears only this demo's namespaced localStorage keys and returns to the home screen. Login, registrations, and seat counts persist across refresh. If browser storage is unavailable, the app remains usable for the current page session but will not persist state.

## Checks

```sh
npm test
npm run lint
npm run build
```

Tests cover reducer workflows, atomic slots, clashes, seat updates, modification, persistence, reset, and timetable generation. No browser automation framework is included, and the separate Chrome extension is not available here.

The extension's host permissions may only allow the official VTOP hostname. A localhost Vercel or Vite URL does not satisfy that permission unless the extension is separately configured for the test host. This project does not change extension files, and extension compatibility has not been tested.

## Vercel deployment

Use the Vite framework preset with:

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: `26.x` in Vercel project settings; `package.json` accepts `>=22.12.0` (Vite and `@vitejs/plugin-react` both require `^20.19.0 || >=22.12.0`)

No `vercel.json` rewrite is needed: screens are selected in client state and the app has no client-side URL router. Assets use root-relative public URLs and Vite-managed module paths, suitable for deployment at the domain root. There are no required environment variables.

To deploy, push the project to a Git provider and import it in Vercel, or run `npx vercel` from this directory and follow the prompts. Confirm the settings above, deploy a preview, then promote it with `npx vercel --prod` or the Vercel dashboard. Verify the deployed root page, favicon, CSS/JS asset requests, login, registration workflow, and browser refresh.

## Project structure

- `src/App.tsx` — portal screens and semantic HTML tables.
- `src/logic/appState.ts` — reducer and registration state transitions.
- `src/context/AppContext.tsx` — React context, hydration, and persistence effects.
- `src/data/demoData.ts` — fictional categories, courses, offerings, and session configuration.
- `src/logic/slotMapping.ts` — six-day, 42-period mapping and atomic slot validation.
- `src/logic/clashDetection.ts` — atomic conflict checks.
- `src/logic/timetableGenerator.ts` — timetable from current registrations.
- `src/logic/persistence.ts` — versioned, guarded localStorage access.
- `tests/workflow.test.cjs` — repeatable local workflow and logic tests.
