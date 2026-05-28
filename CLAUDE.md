@AGENTS.md

# Admin Page Design Rules

These rules MUST be followed when creating any admin (or user) page in this project.

## 1. Smooth Animations

- Hover lift (subtle translate-Y / scale on hover)
- Card glow (cyan accent glow on hover/focus)
- Scroll reveal (fade + rise on enter)
- Smooth transitions (ease-in-out, ~200–300ms)

## 2. Typography

Use one of these fonts (in order of preference):

- Inter
- Satoshi
- General Sans
- Plus Jakarta Sans

## 3. Spacing

- Generous breathing space between elements
- Whitespace is treated as a premium-feel feature, not wasted space

## 4. Consistent Design System

Standardize across the whole app:

- `radius` (consistent border-radius scale)
- `padding` (consistent spacing scale)
- `shadows` (consistent elevation scale)
- Button style (one canonical button system)
- Icon style (one icon family, one stroke weight)

## 5. Responsive Design

Must work on: laptop, desktop, tablet, mobile.

## 6. Admin Capabilities

The admin page must let an admin:

- Add games
- Edit games
- Upload banners and auto-play muted video
- Manage prices

## 7. Extra Features for User Page

- Skeleton loading for data-fetching screens

## 8. Layout — NO Sidebar

- Do NOT add a sidebar.
- Use only a top navbar with this exact structure (left → right):
  `Webpage logo` · `Homepage / Browse page (or admin links)` · `Profile icon`
- Do NOT add a global search bar to the navbar.
- Do NOT add a cart anywhere in the admin app — no cart icon in the navbar, no cart link in the profile popover, no cart page, no cart components. This is an admin tool, not a shopper-facing store.

## 9. Color Palette (Dark Theme — authoritative)

### Main Background Colors

| Usage              | HEX       |
| ------------------ | --------- |
| Main Background    | `#121212` |
| Sidebar Background | `#111111` |
| Card Background    | `#1F1F1F` |
| Navbar Background  | `#181818` |
| Secondary Dark     | `#1E1E1E` |

### Text Colors

| Usage              | HEX       |
| ------------------ | --------- |
| Primary White Text | `#ECECEC` |
| Secondary Text     | `#B8C1CC` |
| Muted Text         | `#8B949E` |

### Cyan / Neon Accent Colors (most important — gaming + cyberpunk + premium SaaS vibe)

| Usage             | HEX       |
| ----------------- | --------- |
| Primary Neon Cyan | `#00D9FF` |
| Soft Cyan         | `#4C807E` |
| Cyan Glow         | `#21C7E5` |
| Cyan Border       | `#214A52` |

### Success / Positive Colors (discounts, positive stats, offers)

| Usage         | HEX       |
| ------------- | --------- |
| Green Success | `#00C16A` |
| Light Green   | `#36E28A` |

### Danger / Sale Colors (sale %, low stock, discounts)

| Usage     | HEX       |
| --------- | --------- |
| Neon Red  | `#FF5A5F` |
| Soft Red  | `#B23A48` |

### Border Colors

| Usage       | HEX       |
| ----------- | --------- |
| Card Border | `#2A2A2A` |
| Soft Border | `#2F2F2F` |

# Code Structure Rules

These rules MUST be followed for every file you create or modify in this project.

## 1. Component Size Limit

- Every component file MUST stay within **200 lines**.
- If a component exceeds 200 lines, split it into smaller sub-components.

## 2. Keep `app/` Thin

- Do NOT write large amounts of code inside `app/`.
- `app/` should only contain route entry points (and minimal route-specific glue).
- The bulk of the code lives in `src/`.

## 3. Global `not-found.tsx`

- Create **one** global `not-found.tsx` in `app/` — do not duplicate per-route.

## 4. Reusable Components Get Their Own Folder

- Any reusable component MUST live in its own folder (e.g. `ComponentName/index.tsx`, with related styles/types inside the same folder).

## 5. Folder Locations (authoritative — do NOT deviate)

| What                       | Where                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| Page-level code            | `E:\epic-games-store-admin\gamevault-admin\src\views`                                          |
| All card components        | `E:\epic-games-store-admin\gamevault-admin\src\components\cards`                               |
| All reusable buttons       | `E:\epic-games-store-admin\gamevault-admin\src\components\buttons`                             |
| All modal components       | `E:\epic-games-store-admin\gamevault-admin\src\components\modal`                               |
| All popover components     | `E:\epic-games-store-admin\gamevault-admin\src\components\popover`                             |
| All constant data          | `E:\epic-games-store-admin\gamevault-admin\src\constants`                                      |

- All page code goes into `src/views/`. The `app/` route file should import from there.
- All card components go into `src/components/cards/`.
- All reusable buttons go into `src/components/buttons/`.
- All modal components (base Modal, ConfirmModal, etc.) go into `src/components/modal/`.
- All popover components (base Popover, etc.) go into `src/components/popover/`.
- All constant data (enums, static lists, config arrays, etc.) goes into `src/constants/`.

## 6. Global Skeleton Loading & Not-Found

- Create skeleton loading **globally** in `app/` (e.g. via `loading.tsx` at the app root).
- Create `not-found.tsx` **globally** in `app/` (one shared 404 page).

## 7. Search Bar — Admin Panel

- Only add a search bar to the admin panel **if it is actually needed** for that screen. Do not include a search bar by default.
