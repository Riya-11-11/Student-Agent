# AI Student Agent

## Goal
Build a fresh, responsive, multi-page student study companion inspired by the uploaded pastel illustration style, without copying its layout or artwork. The first screen will clearly present the three core actions: plan studies, analyze PYQs, and summarize notes.

## Application shell
- Create a consistent desktop sidebar and compact mobile menu across all pages.
- Add a top bar with search, notifications, profile avatar, and a persistent Light/Dark theme control.
- Use proper routes for Home, Study Plan, PYQ Analysis, Notes Summarizer, Saved Plans, and Settings.
- Define a new semantic design system with light mode as default and a purpose-designed dark mode.

## Visual direction
- Use an original soft-blue dashboard composition with a friendly student/AI illustration, subtle educational doodles, rounded white surfaces, gentle shadows, and restrained motion.
- Give each tool a focused identity: blue/cyan for Study Plan, purple/lavender for PYQ, green/mint for Notes, and yellow as a supporting accent.
- Use clear, friendly typography, responsive charts, progress bars, and compact educational previews without resembling a corporate admin dashboard.

## Home dashboard
- Build the “Study Smarter, Not Harder” introduction with benefit badges and an original educational illustration.
- Add three prominent linked tool previews, clearly labeled sample insight metrics, quick insights, recent PYQs, and recent notes.
- Ensure every visible action navigates or responds meaningfully.

## Study Plan Generator
- Build a complete labeled form for goal, subjects, date, timeline, hours, study days, level, and instructions.
- Validate required fields, show a polished generation state, then display a structured weekly plan with topics, tasks, time, revision, and progress.
- Add functional detail expansion, regeneration, and saving; saved plans will appear on the Saved Plans page.

## PYQ Analysis
- Build PDF/image upload and manual-question entry with subject and year controls.
- Provide empty, loading, error/retry, and populated report states.
- Group the requested metrics into readable sections: high-priority patterns, topic depth, time trends, repetition/similarity, question mix/difficulty/thinking level, syllabus coverage/concentration, and marks distribution.
- Add simple report filters and responsive Recharts visualizations backed by realistic mock analysis data.

## Notes Summarizer
- Build accessible Text, PDF, Image, and Link tabs with mode-specific inputs.
- Provide empty, loading, error/retry, and summary states.
- Show readable key points and quick revision output with functional copy, regenerate, and clear actions.

## Saved Plans and Settings
- Show saved plan name, subjects, duration, date, and progress with functional open/delete actions.
- Provide profile and preference controls plus the shared theme selector.
- Keep mock state and service boundaries clean so future API responses can replace local generators without rebuilding the views.

## Technical details
- Create reusable shell, form, state, card, chart, upload, and report components.
- Use TanStack Router links and dedicated route files with unique page metadata.
- Use browser storage only for theme and locally saved mock plans; keep the data models and async mock services isolated for later backend integration.
- Use semantic Tailwind v4 tokens, accessible labels/focus states, reduced-motion support, and mobile layouts without horizontal overflow.
- Verify the main workflows and visual layout at desktop and mobile sizes in the running preview.
