# SYNTRA – Homepage Redesign + Feature Pages

## Current State
- App has a sidebar + header layout. On load, it shows the CurriculumATS module directly.
- Sidebar has Level-3/2/1/0 navigation buttons for the 3 modules.
- Header has AI news ticker and "Get in Touch" button.
- 3 modules exist: CurriculumATS, AIHIRatioArchitect, RealityCheckMarketplace.
- No landing/homepage exists — app starts directly at the module view.

## Requested Changes (Diff)

### Add
1. **Homepage (Landing Page)** — New `HomePage` component shown on first load (view = "home"):
   - Hero section: SYNTRA logo/name, tagline text, short description.
   - **Feature Circles row**: 3 large clickable circular buttons, one per module. Each circle shows the feature icon + name. Clicking navigates to the respective module page.
   - **AI News Section**: Grid of company "news blocks". Each block has:
     - A square button/label at top showing the company name (e.g. "Meta", "OpenAI", "Nvidia", "Google", "Microsoft", "Anthropic").
     - Below it a 4×4 square news card showing the latest AI news/research for that company, cycling/auto-updating every few seconds to simulate live updates.
   - All module navigations from homepage go to their respective dedicated pages.

2. **Level-Gate Page** (`LevelGatePage`) — Dedicated page explaining how Level -3 to Level 0 works:
   - Full explainer of the 4 levels: Level-3 (Foundations/Curriculum ATS), Level-2 (Builder/AI-HI Ratio Architect), Level-1 (Market Reality/Marketplace), Level-0 (Locked/Apex).
   - Visual timeline/roadmap with each level's purpose, what user learns, and how to unlock next level.
   - CTA button linking to start at Level-3.

3. **Curriculum ATS Page** (expanded `CurriculumATSPage`) — Existing CurriculumATS module PLUS:
   - Career Decision Prompt Box: textarea where user enters their career goal/confusion and gets AI guidance.
   - Salary Section: show current real-world salary data aligned by job role (reuse data from RealityCheckMarketplace).
   - Multiple Profile Creator: Like Instagram account switcher — user can create/switch between multiple profiles (stored in React state). Each profile has a name, branch, and career focus.
   - Industry Expert Profiles: A row of expert profile cards per job role. Each expert has name, current role, company, and a "Ask Expert" button that opens a contact/request modal.
   - College Resume Builder: a simple template with fields (name, skills, projects, target role) that generates a formatted resume preview.

4. **Routing system**: Add a `view` state to App.tsx with values: `"home"` | `"levelGate"` | `"curriculumATS"` | `"aiHIRatio"` | `"marketplace"`. Update Sidebar to show a "Home" button at top. Update module navigation to set the view state.

### Modify
- `App.tsx`: Add `view` state, show `HomePage` when view is `"home"`, show `LevelGatePage` when view is `"levelGate"`, keep existing modules for other views.
- `Sidebar.tsx`: Add a Home icon button at the top that goes to `view = "home"`. The existing Level-3/2/1/0 entries can also set view to the relevant module (same as before), plus add a "Level Gate Info" link to `"levelGate"` view.
- `Header.tsx`: Keep as-is.

### Remove
- Nothing removed. Existing modules preserved fully.

## Implementation Plan
1. Create `src/frontend/src/pages/HomePage.tsx` — landing page with hero, feature circles, and AI news blocks.
2. Create `src/frontend/src/pages/LevelGatePage.tsx` — level roadmap explainer.
3. Expand `src/frontend/src/components/modules/CurriculumATS.tsx` into a full page with career prompt, salary section, multi-profile creator, industry experts, and resume builder.
4. Update `src/frontend/src/App.tsx` to use `view` state and render the right page.
5. Update `src/frontend/src/components/Sidebar.tsx` to add Home button and LevelGate link.
