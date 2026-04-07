# TekkieStack

A browser-native, offline-first coding education platform for school-age learners from Year 3 to Year 11, structured as a progressive journey from computational thinking to AI engineering.

## Problem Statement

Most coding education for young people either requires expensive hardware, persistent internet access, or commercial subscriptions that schools and families in lower-income areas cannot afford. Standard platforms also treat Year 3 and Year 11 students identically, providing no progression structure that builds on prior learning over multiple years. TekkieStack addresses this by running entirely in the browser as an installable Progressive Web App, with a structured curriculum split into a Junior Journey (Year 3 to 6) and a Senior Journey (Year 7 to 11), an XP and badge reward system, an in-browser code editor, and a three-tool AI Lab that teaches students to use AI as a thinking partner rather than a shortcut. Osi's background teaching computing in Nigeria in 2009 and managing national-scale examinations at the British Council from 2016 to 2019 directly informs the pedagogy: structured, accessible, and designed for learners who have never written a line of code.

## Demo / Screenshot

**Live:** [https://www.tekkiestck.com](https://www.tekkiestck.com)

## Tech Stack

| Layer | Technologies |
|---|---|
| Language | JavaScript |
| Frontend | HTML, CSS, vanilla JavaScript (no framework) |
| Backend | Vercel Serverless Functions (Node.js) |
| AI and LLM | Claude API (claude-haiku-4-5-20251001), Gemini 1.5 Flash, OpenRouter, Hugging Face (fallback chain) |
| Infrastructure | Vercel, Service Worker (PWA, offline-first) |

## Architecture Overview

TekkieStack is a single-page application implemented as a modular JavaScript PWA. The application core (`assets/js/app.js`) bootstraps a global `window.TSA` namespace, registers the service worker (`sw.js`), and manages a screen-based router where each view is a hidden `<div>` toggled by class. Each feature module registers its render function into `TSA.routes`, which the router calls on navigation. The Junior and Senior phase modules (`modules/junior-phases.js`, `modules/senior-phases.js`) define the full curriculum content inline as HTML strings, with lesson content, worked examples, and interactive activities rendered into the DOM on demand. The in-browser code editor (`modules/code-editor.js`) provides a sandboxed editing and preview environment for HTML, CSS, and JavaScript exercises. The AI Lab (`modules/ai-lab.js`) implements a three-layer safety system: input guards strip PII patterns, enforce character limits for Year 3 and 4 learners, and block off-topic content; output guards truncate AI responses to three sentences for learners in Year 6 and below; and a mode gate restricts online AI to Year 5 and above when enabled. The AI API call chain tries Claude Haiku, then Gemini Flash, then OpenRouter, then Hugging Face, then falls back to curated offline responses stored in the module itself.

## Key Features

- A structured two-journey curriculum covering Year 3 to Year 11 across nine phases: four Junior phases (Think Like a Builder, Build the Web, Smart Builder, AI and Applied Engineering) and five Senior phases (Accelerated Foundations, Software Engineering, Real Development, AI Engineering, Portfolio Projects), each with XP rewards and completion certificates.
- An installable Progressive Web App with a service worker providing full offline functionality, allowing students to continue learning without internet access. The offline banner activates automatically when connectivity is lost.
- An AI Lab with three tools: Code Helper gives hints without revealing solutions, Code Detective identifies one specific bug without fixing it, and Prompt Trainer scores AI prompts from 1 to 10 with constructive feedback. All three tools operate in offline mode using curated responses when internet access is unavailable.
- A four-provider AI fallback chain (Claude Haiku, Gemini Flash, OpenRouter, Hugging Face) with rate limiting enforced at eight requests per 20 seconds to prevent abuse, and a local keyword-based fallback that activates if all external providers fail.
- An XP and badge reward system tracked in `localStorage`, with achievements including first AI interaction, phase completions, and code milestones. Junior history carries forward visibly into the Senior journey, giving learners a continuous record of progress across years.

## How to Run Locally

### Prerequisites

- A modern web browser.
- The Vercel CLI (`npm i -g vercel`), required to run the AI serverless function locally.
- An Anthropic API key for Claude Haiku (primary AI). Gemini and OpenRouter keys are optional.

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/abuj07/tekkiestack.git
cd tekkiestack

# 2. Configure environment variables
# Create a .env file with the following:
# ANTHROPIC_API_KEY  — Anthropic API key for Claude Haiku (primary AI)
# GEMINI_KEY         — Google Gemini API key (first fallback)
# OPENROUTER_KEY     — OpenRouter API key (second fallback)
# HUGGINGFACE_KEY    — Hugging Face API key (third fallback)
```

### Run

```bash
vercel dev
# Visit http://localhost:3000
```

To run without AI features (offline mode only):

```bash
npx serve .
# Visit http://localhost:3000
```

### Run Tests

```bash
# Open tests/test-runner.html in a browser to run the test suite
```

## AI Integration

The AI Lab's serverless function (`api/ai.js`) implements a four-provider fallback chain. Claude Haiku is called first using the Anthropic REST API with a system prompt calibrated to the learner's year group, instructing the model to give hints only, refuse to write full solutions, and limit responses to three sentences for Year 5 to 6 or five sentences for Year 7 and above. If Claude fails, the function retries with Gemini 1.5 Flash via the Google Generative Language API, then with OpenRouter using `meta-llama/llama-3-8b-instruct`, then with Hugging Face using the Zephyr 7B model, and finally falls back to a keyword-based local response if all external providers fail. On the client side, the AI Lab module enforces three independent safety layers before any prompt reaches the API: PII stripping, off-topic pattern blocking, and a hard 150-character input limit for Year 3 and 4 learners. Output is sanitised server-side and then again client-side before display. This repository corresponds to the TekkieStack product in Osi's portfolio.

## Status

🟢 **Live** — deployed and publicly accessible at [https://www.tekkiestck.com](https://www.tekkiestck.com).

## Author

**Osi Abu** — Full Stack AI Engineer and AI Builder, London.
🌐 [osiabu.dev](https://www.osiabu.dev)
💼 [LinkedIn](https://www.linkedin.com/in/osiabu)
🐙 [GitHub](https://www.github.com/abuj07)
