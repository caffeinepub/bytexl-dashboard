# SYNTRA — AI EdTech Web App

## Current State
This is a new project being built from scratch. No existing frontend or backend modules.

## Requested Changes (Diff)

### Add
- Full SYNTRA app with Cyber-Luxury Dark Mode theme (Pure Black #000000 background)
- Persistent Level-Gate Sidebar (vertical roadmap: Level-3 bottom → Level-0 top with locked gold-green gradient animation)
- Minimalist Header: SYNTRA logo left, Live AI News Ticker center (scrolling: Meta, OpenAI, Nvidia news), "Get in Touch" button right with pulsating glow
- Module 1: Curriculum ATS — 2-column hero (Left: headline + tagline, Right: Branch dropdown CSE/AIML + PDF upload). Result: circular progress gauge (Industry Alignment %), Conflict List (College X vs Industry Y)
- Module 2: AI-HI Ratio Architect — Central prompt box "Describe your Project Idea", Brain-Sync loading animation, Split-screen IDE result (Left: Tech Stack, Right: AI/HI ratio progress bars with HI zones in Amber Yellow #FFBF00)
- Module 3: Reality Check Marketplace — Grid of Job Role Cards (SDE-1, AI Engineer, Data Scientist, ML Engineer, Full Stack, DevOps). Each card: Live Salary ₹LPA + Verification Score %. "Talk to a Real Job-Doer" button opens payment/chat modal
- Salary Area Charts for each role
- Glassmorphism: all cards with 1px #ffffff10 border, 10px backdrop-blur
- Electric Spring Green (#00FF88) as primary accent with 20px outer glow
- Buttons: rounded-full, high-gloss, #00FF88 text on black, 2px green borders
- Smooth fade-in transitions between modules (CSS keyframes)
- Backend: store curriculum analysis results, job role data, contact inquiries

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Backend: Motoko canister with data types for curriculum analysis results, job roles, contact inquiries, and chat requests
2. Frontend: Single-page app with sidebar navigation and 3 module views
3. Header with ticker animation and pulsating CTA button
4. Module 1: Branch selector + file upload simulation + circular gauge animation + conflict table
5. Module 2: Prompt input + brain-sync animation + IDE split-screen with progress bars
6. Module 3: Job card grid + salary area charts + modal for Job-Doer contact
7. CSS: OKLCH tokens, glassmorphism utilities, glow effects, fade-in keyframes
