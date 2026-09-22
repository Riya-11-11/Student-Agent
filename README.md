# Study Buddy AI

Create a completely new web application from scratch called:

"AI Student Agent"

IMPORTANT:

This is a NEW project.

Do not redesign, modify, migrate, or reuse an existing application.

Start the project from the base level and create the complete application structure, UI and frontend experience from scratch.

The application is an AI-powered study assistant for students.

The main goal is to help students:

1. Create personalized study plans

2. Analyze Previous Year Questions (PYQs)

3. Summarize study notes

The application should feel like one complete AI Student Agent, with three separate tools that students can access easily.

====================================================

1. OVERALL DESIGN DIRECTION

====================================================

Use the attached reference image as the PRIMARY VISUAL INSPIRATION for the UI style.

IMPORTANT:

Do NOT copy the reference image exactly.

Use its visual personality and design direction to create an original UI for the AI Student Agent.

The UI should feel:

- Friendly

- Modern

- Attractive

- Student-focused

- AI-powered

- Clean

- Playful

- Professional

- Easy to understand

Avoid making it look like a generic corporate SaaS dashboard or admin panel.

The visual style should include:

- Soft pastel backgrounds

- White/light cards

- Rounded corners

- Soft shadows

- Subtle gradients

- Blue, purple, green and yellow accent colors

- Friendly icons

- Clean charts

- Progress bars

- Small doodle/handwritten-style decorative elements

- Friendly educational illustrations

- Plenty of whitespace

- Clear typography

- Good visual hierarchy

The design should be colorful but not messy.

====================================================

2. COLOR SYSTEM

====================================================

Use different visual identities for the three main tools.

Study Plan Generator:

- Blue

- Light blue

- Soft cyan

PYQ Analysis:

- Purple

- Lavender

- Soft violet

Notes Summarizer:

- Green

- Mint

- Soft teal

Supporting accent:

- Yellow / orange

Use pastel versions of these colors for backgrounds and stronger versions for buttons/icons.

Do not use too many colors inside one section.

====================================================

3. THEME SYSTEM

====================================================

Implement both:

Light Theme

Dark Theme

IMPORTANT:

LIGHT THEME MUST BE THE DEFAULT.

When the application opens for the first time, it should always display the light theme shown by the reference design direction.

Add a Light/Dark theme toggle in the main header.

Example:

☀️ Light    🌙 Dark

The user should be able to switch between themes.

The selected theme should persist after refreshing the page.

Dark mode should be properly designed, not simply an inverted version of the light theme.

====================================================

4. APPLICATION STRUCTURE

====================================================

Create a proper multi-page application.

The three main features MUST have separate dedicated pages.

Do NOT put all three tools on one large page.

Create these main routes:

/                    → Home Dashboard

/study-plan          → Study Plan Generator

/pyq-analysis        → PYQ Analysis

/notes-summarizer    → Notes Summarizer

/saved-plans         → Saved Study Plans

/settings            → Settings

Use proper client-side routing.

Navigation between pages must work properly.

Do not create buttons that visually look clickable but do nothing.

====================================================

5. GLOBAL NAVIGATION

====================================================

Create a clean navigation system.

Desktop:

Use a left sidebar.

Sidebar should contain:

AI Student Agent logo/name

🏠 Home

📅 Study Plan

📊 PYQ Analysis

📝 Notes Summarizer

🔖 Saved Plans

⚙️ Settings

The currently active page should be visually highlighted.

At the top/header area include:

- Search

- Theme toggle

- Notification icon

- User/profile avatar

The navigation should remain consistent across pages.

On mobile:

Convert the sidebar into a responsive menu or mobile navigation.

Make sure there is no horizontal scrolling.

====================================================

6. HOME DASHBOARD

====================================================

Create a beautiful Home Dashboard.

The Home page should introduce the AI Student Agent and its three main tools.

----------------------------------------------------

HERO SECTION

----------------------------------------------------

Create a large hero section inspired by the attached reference image.

Heading:

"Study Smarter,

Not Harder"

Supporting text:

"Your AI-powered study assistant to plan better, understand patterns and learn faster."

Add a friendly student/AI educational illustration on the right side.

Add small benefit badges:

⚡ Save Time

🎯 Stay Focused

📈 Achieve More

Use a soft blue/pastel background with subtle decorative doodles.

----------------------------------------------------

THREE MAIN TOOL CARDS

----------------------------------------------------

Below the hero, show three large feature cards.

These are entry points to the three separate tools.

----------------------------------------------------

CARD 1 — STUDY PLAN GENERATOR

----------------------------------------------------

Use blue/light-blue styling.

Title:

"Study Plan Generator"

Description:

"Tell us your goals, subjects and timeline. Get a personalized study plan that keeps you on track."

Show a small preview inside the card.

Example:

AI:

"What would you like to achieve?"

Student:

"I want to prepare for my semester exams in 4 weeks."

Then show:

Week 1 — DSA Basics + Practice

Week 2 — DBMS Concepts + PYQs

Week 3 — OS Core Topics + Revision

Week 4 — Full Revision + Mock Tests

Button:

"View Full Plan →"

Clicking it should open:

/study-plan

----------------------------------------------------

CARD 2 — PYQ ANALYSIS

----------------------------------------------------

Use purple/lavender styling.

Title:

"PYQ Analysis"

Description:

"Upload past year questions and discover important topics, trends, repeated concepts and question patterns."

Show a small preview:

Upload PYQs

Subject

Year

Analyze PYQs

Show a small sample analysis preview.

Button:

"Analyze PYQs →"

Clicking it should open:

/pyq-analysis

----------------------------------------------------

CARD 3 — NOTES SUMMARIZER

----------------------------------------------------

Use green/mint styling.

Title:

"Notes Summarizer"

Description:

"Turn your notes into clean, concise and easy-to-revise study material in seconds."

Show a small preview:

Text | PDF | Image | Link

Input:

"Paste your notes or upload a file..."

Button:

"Summarize →"

Clicking it should open:

/notes-summarizer

====================================================

7. DASHBOARD SUMMARY / INSIGHTS

====================================================

Add a section below the three main tools showing useful student insights.

Example metric cards:

Total Questions Analyzed

1,280

Total Topics

18

Years Analyzed

5

Average Difficulty

Medium

IMPORTANT:

These numbers are only sample/mock data for the UI.

Do not present them as real data.

Also add a "Quick Insights" section.

Example:

💡 Some topics appear frequently across previous papers.

📊 Most analyzed questions are from the medium difficulty level.

🔁 Some concepts appear repeatedly across different years.

📈 Some topics show changes in frequency over recent years.

Use attractive insight cards.

====================================================

8. STUDY PLAN GENERATOR PAGE

====================================================

Create a COMPLETE dedicated Study Plan Generator page.

Do not just show the dashboard preview.

The user should be able to enter information and generate a structured study plan.

Page heading:

"Study Plan Generator"

Supporting text:

"Tell us what you want to achieve and create a personalized plan for your preparation."

Create a clean form containing:

- Goal

- Subjects

- Exam date

- Preparation timeline

- Available study hours per day

- Preferred study days

- Current preparation level

- Additional instructions

Example:

Goal:

"Prepare for semester exams"

Subjects:

DSA

DBMS

OS

Computer Networks

Timeline:

4 weeks

Study Hours:

3 hours/day

Preparation Level:

Beginner / Intermediate / Advanced

Button:

"✨ Generate Study Plan"

----------------------------------------------------

GENERATED PLAN

----------------------------------------------------

After generation, display:

"Your Personalized Study Plan"

Example:

Week 1

DSA Basics + Practice

Week 2

DBMS Concepts + PYQs

Week 3

OS Core Topics + Revision

Week 4

Full Revision + Mock Tests

Each week should be able to show:

- Topics

- Tasks

- Estimated time

- Revision activities

- Progress

Include actions:

View Details

Regenerate Plan

Save Plan

Show progress using clean progress bars/cards.

Use blue/light-blue styling.

====================================================

9. PYQ ANALYSIS PAGE

====================================================

Create a COMPLETE dedicated PYQ Analysis workspace.

This should be one of the most important pages of the application.

Page heading:

"PYQ Analysis"

Supporting text:

"Upload your previous year questions and discover important topics, trends and question patterns."

----------------------------------------------------

INPUT SECTION

----------------------------------------------------

Create a beautiful upload area.

Title:

"Upload PYQs"

Support:

- PDF

- Image

Also provide an option to manually paste questions.

Add:

Subject dropdown

Year Range dropdown

Example:

Subject:

Data Structures & Algorithms

Years:

2019 – 2024

Main button:

"✨ Analyze PYQs"

Before analysis, show an attractive empty state:

"No PYQs analyzed yet.

Upload your previous year questions to discover important patterns."

====================================================

10. PYQ ANALYSIS REPORT

====================================================

After analysis, show a proper analysis report.

At the top display:

"PYQ Analysis Report"

Subject:

Data Structures & Algorithms

Years:

2019–2024

Questions Analyzed:

128

Then organize the analysis into logical sections.

IMPORTANT:

Do NOT create 16 separate boring cards for 16 metrics.

Group related metrics together and make the report easy for students to understand.

====================================================

11. PYQ METRICS

====================================================

The analysis should support the following metrics researched for PYQ analysis.

A. Topic Frequency

Show how frequently each topic appears.

Example:

Arrays — 22%

Trees — 18%

Sorting — 14%

Graphs — 12%

Others — 34%

Use progress bars or charts.

----------------------------------------------------

B. Marks Weightage

Show which topics carry more marks.

Example:

DBMS — 22%

DSA — 18%

OS — 16%

CN — 12%

----------------------------------------------------

C. Year-wise Frequency

Show how often topics appeared in each year.

Use charts.

----------------------------------------------------

D. Topic Trend

Show whether a topic is increasing, decreasing or staying relatively stable across years.

Use line/bar charts.

----------------------------------------------------

E. Topic Consistency / Persistence

Show how consistently a topic appears across years.

Example:

Arrays:

Appeared in 5 of 6 years

Trees:

Appeared in 4 of 6 years

----------------------------------------------------

F. Recent Frequency / Recency

Show topics that appear frequently in recent years.

Allow the user to see recent patterns separately.

----------------------------------------------------

G. Question Repetition Rate

Identify questions or concepts that repeat across different papers.

Show:

Repeated Questions

Repeated Concepts

----------------------------------------------------

H. Semantic Similarity

Identify questions that are different in wording but similar in meaning.

Example:

Question A

Question B

Similarity:

87%

Keep this student-friendly.

Do not expose complicated technical terminology unnecessarily.

----------------------------------------------------

I. Topic / Subtopic Frequency

Allow topics to be expanded into subtopics.

Example:

Trees

- Binary Tree

- BST

- AVL Tree

- Tree Traversal

Show frequency for each.

----------------------------------------------------

J. Question Type Distribution

Show:

MCQ — 45%

Short Answer — 30%

Long Answer — 15%

Numerical — 10%

Use a chart.

----------------------------------------------------

K. Difficulty Distribution

Show:

Easy — 40%

Medium — 35%

Hard — 25%

Also show:

Average Difficulty:

Medium

----------------------------------------------------

L. Bloom's Taxonomy / Thinking Level

If the required data is available, categorize questions by thinking level:

Remember

Understand

Apply

Analyze

Evaluate

Create

Present this in a simple visual format.

Do not make the terminology intimidating.

----------------------------------------------------

M. Syllabus Coverage

Show how much of the syllabus is represented in the analyzed PYQs.

Example:

Syllabus Coverage:

78%

Then show:

Frequently Covered

Less Covered

topics.

----------------------------------------------------

N. Topic Concentration

Show whether a large portion of questions is concentrated around a small number of topics.

Present this visually.

----------------------------------------------------

O. Question / Marks Distribution

Show:

- Number of questions per topic

- Marks per topic

- Average marks per question

====================================================

12. PYQ REPORT FILTERS

====================================================

Add useful filters to the analysis report.

Filters:

- Subject

- Year

- Year Range

- Topic

- Subtopic

- Difficulty

- Question Type

The report should update based on filters when real data is connected.

Keep filters simple and easy to use.

====================================================

13. KEY INSIGHTS IN PYQ ANALYSIS

====================================================

Add a visually attractive "Key Insights" section.

Example:

💡 Arrays and Trees appear frequently across the analyzed papers.

📊 Most questions are from the medium difficulty level.

🔁 Some concepts appear repeatedly across multiple years.

📈 Some topics show increased frequency in recent papers.

The insights should be generated from the analysis data when backend/AI functionality is connected.

For now, use realistic mock data.

====================================================

14. PYQ PAGE DESIGN

====================================================

The PYQ page should feel like an AI-generated analysis report, not like a business analytics dashboard.

Use:

- Purple/lavender cards

- Clean charts

- Progress bars

- Insight cards

- Topic cards

- Small badges

- Soft shadows

- Rounded sections

- Clear headings

The most important insights should appear first.

Avoid overwhelming the student.

====================================================

15. NOTES SUMMARIZER PAGE

====================================================

Create a COMPLETE dedicated Notes Summarizer page.

Page heading:

"Notes Summarizer"

Supporting text:

"Turn your notes into simple, clear and easy-to-revise study material."

Provide four input modes:

Text

PDF

Image

Link

Use tabs for these modes.

----------------------------------------------------

TEXT

----------------------------------------------------

Large text area:

"Paste your notes here..."

----------------------------------------------------

PDF

----------------------------------------------------

Upload PDF.

----------------------------------------------------

IMAGE

----------------------------------------------------

Upload an image of handwritten or printed notes.

----------------------------------------------------

LINK

----------------------------------------------------

Paste a URL.

Main button:

"✨ Summarize Notes"

====================================================

16. NOTES SUMMARY OUTPUT

====================================================

After summarization, display:

"Summary Output"

Section:

"Key Points"

Example:

1. Important concept

2. Main explanation

3. Important facts

4. Important examples

Then show:

"Quick Revision"

A short and easy-to-revise version.

Also provide:

Copy

Regenerate

Clear

The output should be highly readable.

Use green/mint styling.

====================================================

17. AI LOADING STATES

====================================================

Create polished loading states for all AI actions.

Study Plan:

"Creating your personalized study plan..."

PYQ:

"Analyzing your PYQs..."

Notes:

"Reading your notes and creating a summary..."

Use subtle animations or skeleton loaders.

====================================================

18. EMPTY STATES

====================================================

Create meaningful empty states.

PYQ:

"No PYQs analyzed yet.

Upload a paper to discover important patterns."

Study Plan:

"Create your first personalized study plan."

Notes:

"Add your notes to create an easy-to-revise summary."

Make empty states visually attractive.

====================================================

19. ERROR STATES

====================================================

Create proper error states.

Example:

"Something went wrong.

Please try again."

Include a retry button.

Errors should be clear and friendly.

====================================================

20. RECENT ACTIVITY

====================================================

On the dashboard, add:

"Recent PYQs"

Example:

2024 — DBMS — Normalization

2023 — OS — Process Scheduling

2023 — DSA — Binary Search

2022 — CN — Network Topology

Also add:

"Recent Notes"

Example:

DBMS — Important Concepts

OS — Key Formulas

CN — Important Topics

Use mock data for now.

====================================================

21. SAVED PLANS

====================================================

Create a Saved Plans page.

Users should be able to see study plans they previously saved.

Each saved plan can show:

Plan name

Subjects

Duration

Created date

Progress

Actions:

Open

Delete

Use the same visual design system.

====================================================

22. SETTINGS

====================================================

Create a simple Settings page.

Include:

Theme

Profile

Preferences

The theme section should contain the Light/Dark toggle.

Light should remain the default.

====================================================

23. RESPONSIVE DESIGN

====================================================

The entire application must be responsive.

Desktop:

- Sidebar

- Multi-column dashboard

- Large cards

- Charts

Tablet:

- Responsive grid

Mobile:

- Single-column layouts

- Responsive navigation

- Collapsible menu

- Properly resized charts

- Touch-friendly buttons

- No horizontal overflow

====================================================

24. ANIMATIONS

====================================================

Use subtle animations.

Examples:

- Card hover

- Button hover

- Smooth transitions

- Page transitions

- Chart entrance animations

- Loading animations

Do NOT over-animate the application.

The UI should feel polished, not distracting.

====================================================

25. REUSABLE COMPONENTS

====================================================

Build the application using reusable components.

Examples:

Navbar

Sidebar

ThemeToggle

HeroSection

FeatureCard

MetricCard

InsightCard

ChartCard

UploadBox

FileUploader

StudyPlanForm

StudyPlanCard

PYQReport

TopicChart

TrendChart

DifficultyChart

QuestionTypeChart

NotesInput

SummaryOutput

LoadingState

EmptyState

ErrorState

Keep the code modular and easy to maintain.

====================================================

26. DATA / BACKEND READINESS

====================================================

For now, use realistic mock/sample data wherever backend or AI functionality is not available.

IMPORTANT:

Do not hardcode the application in a way that makes future API integration difficult.

The UI should be structured so that real backend/API responses can later replace mock data.

The three main actions should be prepared for real functionality:

Generate Study Plan

Analyze PYQs

Summarize Notes

Keep data structures clean and predictable.

====================================================

27. ACCESSIBILITY AND UX

====================================================

Make the application easy to use.

Use:

- Clear labels

- Readable text

- Good contrast

- Visible button states

- Helpful validation messages

- Keyboard-friendly interactions where appropriate

- Clear upload areas

- Obvious navigation

Do not make the user guess what to click.

====================================================

28. IMPORTANT PRODUCT PRINCIPLE

====================================================

The application should immediately communicate:

"This is my AI study companion."

A student should understand the three main capabilities within a few seconds:

📅 Plan my studies

📊 Analyze my PYQs

📝 Summarize my notes

The experience should be simple enough for a student but visually polished enough to feel like a real product.

====================================================

29. FINAL VISUAL DIRECTION

====================================================

Use the attached reference image as inspiration for:

- Overall visual personality

- Pastel backgrounds

- Rounded cards

- Colorful feature sections

- Friendly student illustration

- Doodle-style decorations

- Soft shadows

- Clean internal UI previews

- Playful educational feeling

But do NOT reproduce the exact layout or artwork.

Create an original AI Student Agent interface.

The final design should feel like:

"Study Smarter, Not Harder"

with a friendly, colorful and modern AI study companion experience.

====================================================

30. MOST IMPORTANT REQUIREMENTS

====================================================

Before finishing, make sure all of these are implemented:

✓ Completely new project from scratch

✓ Separate multi-page application

✓ Home Dashboard

✓ Study Plan Generator page

✓ PYQ Analysis page

✓ Notes Summarizer page

✓ Saved Plans page

✓ Settings page

✓ Working navigation/routing

✓ Light theme by default

✓ Light/Dark theme toggle

✓ Responsive desktop/tablet/mobile UI

✓ Reference-image-inspired visual style

✓ Blue Study Plan visual identity

✓ Purple PYQ Analysis visual identity

✓ Green Notes Summarizer visual identity

✓ Friendly student-focused design

✓ PYQ metrics and analysis sections

✓ Charts and visualizations

✓ Key insights

✓ Upload states

✓ Loading states

✓ Empty states

✓ Error states

✓ Mock/sample data where necessary

✓ Backend/API-ready structure

✓ Reusable components

✓ Clean and maintainable code

Do not start by modifying an existing design.

This is a fresh application and should be created from the base level as a complete AI Student Agent product.                                                                                                                                                                                                                                                                                                            “Please use the attached image only as visual inspiration for the design style. Do not copy its exact layout or content.”

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://plan-analyze-summarize.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c1ac52f6-8d38-4897-a63c-4bc05c22f93a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
