# Copilot Instructions for ConfigMate

## Project Overview
- **ConfigMate** is a React application bootstrapped with Vite, using modern React (function components, hooks) and Tailwind CSS for styling.
- The main UI layout is split into a left navigation (`LeftNav.jsx`) and a right content section (`RightSection.jsx`), composed in `App.jsx` inside a `.container` flexbox.
- File uploads and metadata configuration are handled in `FileUpload.jsx` (see `upload-section` class for styling hooks).

## Key Files & Structure
- `src/App.jsx`: Main app layout, imports `LeftNav` and `RightSection`.
- `src/LeftNav.jsx`, `src/RightSection.jsx`: Major UI panels.
- `src/FileUpload.jsx`: Form for uploading and configuring metadata.
- `src/index.css`: Custom global styles, including layout and flex rules.
- `src/App.css`: Imports Tailwind CSS (see `tailwind.config.js` if present).
- `vite.config.js`: Vite build configuration.
- `public/`: Static assets.

## Build & Run
- **Install dependencies:** `npm install`
- **Start dev server:** `npm run dev`
- **Build for production:** `npm run build`
- **Preview production build:** `npm run preview`

## Styling Conventions
- Uses both Tailwind utility classes (via `@import "tailwindcss";` in `App.css`) and custom CSS in `index.css`.
- Layout is managed with flexbox: `.container` is a flex row, `.left-nav` and `.right-section` are its children.
- Avoid mixing Tailwind and custom class names on the same element unless necessary.

## Component Patterns
- All components are function components using hooks.
- Props and state are managed locally; no global state management is present.
- Forms (e.g., in `FileUpload.jsx`) use standard HTML form elements; validation is not implemented by default.

## Integration & Extensibility
- To add new sections, create a new component in `src/` and import it into `App.jsx` or the appropriate parent.
- For new styles, prefer Tailwind classes, but use `index.css` for layout or global overrides.

## Troubleshooting
- If layout does not fill the viewport, check `html, body, #root, .container` for correct `width`/`height` and `overflow-x: hidden`.
- If Tailwind classes do not apply, ensure `App.css` is imported and Tailwind is installed.

## Example: Adding a New Panel
```jsx
// src/NewPanel.jsx
export default function NewPanel() {
  return <div className="new-panel">New Content</div>;
}
// In App.jsx
import NewPanel from './NewPanel';
// ...
<div className="container">
  <LeftNav />
  <RightSection />
  <NewPanel />
</div>
```

---
For more, see `README.md` and Vite/Tailwind docs. Update this file as project structure evolves.
