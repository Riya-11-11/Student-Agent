import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  FileSearch,
  Focus,
  Sparkles,
  Text,
  TrendingUp,
  Zap,
} from "lucide-react";
import heroImage from "@/assets/student-ai-hero.jpg";
import { Button } from "@/components/ui/button";
import { useApp } from "./app-context";

const weeks = [
  "DSA Basics + Practice",
  "DBMS Concepts + PYQs",
  "OS Core Topics + Revision",
  "Full Revision + Mock Tests",
];
function ToolCard({
  tone,
  icon: Icon,
  title,
  description,
  to,
  action,
  children,
}: {
  tone: string;
  icon: typeof CalendarDays;
  title: string;
  description: string;
  to: "/study-plan" | "/pyq-analysis" | "/notes-summarizer";
  action: string;
  children: React.ReactNode;
}) {
  return (
    <article className={`tool-card ${tone}`}>
      <div className="tool-heading">
        <span className="tool-icon">
          <Icon />
        </span>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="tool-preview">{children}</div>
      <Button asChild className="tool-action">
        <Link to={to}>
          {action}
          <ArrowRight />
        </Link>
      </Button>
    </article>
  );
}
export function Dashboard() {
const { savedPlans } = useApp();

const hasPlan = savedPlans.length > 0;

  return (
    <div className="dashboard page-enter">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles /> Your study companion
          </span>

          <h1>
            Let's figure out
            <br />
            <span>what to study next.</span>
          </h1>

          <p>
            Don't worry about where to start. Tell us your goal and we'll guide you through the
            right study steps.
          </p>

          <div className="hero-actions">
            <Button asChild className="hero-primary-action">
  <Link to="/study-plan">
    {hasPlan ? "View my study plan" : "Get started"}
    <ArrowRight />
  </Link>
</Button>

            <span className="hero-hint">Takes less than a minute</span>
          </div>

          <div className="benefits">
            <span>
              <Zap /> Save Time
            </span>

            <span>
              <Focus /> Stay Focused
            </span>

            <span>
              <TrendingUp /> Achieve More
            </span>
          </div>
        </div>

        <div className="hero-art">
          <img
            src={heroImage}
            width={1280}
            height={960}
            alt="Student learning with a friendly AI study companion"
          />

          <span className="doodle doodle-one">start here →</span>

          <span className="doodle doodle-two">you've got this!</span>
        </div>
      </section>
      <section className="next-step-section">
        <div className="section-heading">
          <div>
           <span className="eyebrow">Your next step</span>
<h2>{hasPlan ? "Your plan is ready" : "Your first step is simple"}</h2>
          </div>

          <p>
  {hasPlan
    ? "Your study plan is ready. Open it and start your first study session."
    : "Start with your study plan. We'll guide you from there."}
</p>
        </div>

        <article className="next-step-card">
          <div className="next-step-icon">
            <CalendarDays />
          </div>

          <div className="next-step-content">
    <span>{hasPlan ? "NEXT STEP" : "STEP 1"}</span>

<h3>
  {hasPlan ? "Start your first study session" : "Create your study plan"}
</h3>

<p>
  {hasPlan
    ? "Your roadmap is ready. Open your plan and begin with Week 1."
    : "Tell us what you're studying, your goal, and how much time you have. We'll help organize the rest."}
</p>

            <Button asChild>
              <Link to="/study-plan">
                {hasPlan ? "Open my plan" : "Create my plan"}
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </article>
      </section>
      <section className="today-section">
        <div className="today-content">
          <div className="today-icon">
            <Focus />
          </div>

          <div className="today-text">
            <span className="eyebrow">Your focus today</span>

            <h2>Let's make today count.</h2>

            <p>Your progress will appear here as you study.</p>

           <div className="today-task">
  <div>
    <span>TODAY'S FIRST TASK</span>
    <strong>Set up your study plan</strong>
    <small>Choose your subjects, goal, and available study time.</small>
  </div>

  <Button asChild>
    <Link to="/study-plan">
      Start task
      <ArrowRight />
    </Link>
  </Button>
</div>
          </div>
        </div>
      </section>
   
      <section className="progress-section">
  <div className="progress-header">
    <div>
      <span className="eyebrow">Your study progress</span>
      <h2>
  {hasPlan ? "You're ready to start 🌱" : "Your progress starts here 🌱"}
</h2>

<p>
  {hasPlan
    ? "Complete your first study session and your progress will grow from here."
    : "Create your study plan and your progress will appear here."}
</p>
    </div>

    <div className="progress-badge">
  {hasPlan ? "Plan created" : "0% started"}
</div>
  </div>

  <div className="progress-bar-wrapper">
    <div className="progress-bar">
      <div className="progress-bar-fill" />
    </div>

    <span>Your progress starts with your first study session.</span>
  </div>

        <div className="progress-metrics">
          <div className="progress-metric">
            <span className="progress-metric-icon">
              <BookOpenCheck />
            </span>

            <div>
              <strong>0</strong>
              <small>Topics started</small>
            </div>
          </div>

          <div className="progress-metric">
            <span className="progress-metric-icon">
              <FileSearch />
            </span>

            <div>
              <strong>0</strong>
              <small>Questions analyzed</small>
            </div>
          </div>

          <div className="progress-metric">
            <span className="progress-metric-icon">
              <CalendarDays />
            </span>

            <div>
              <strong>0</strong>
              <small>Study sessions</small>
            </div>
          </div>
        </div>
      </section>
      <section className="section-heading">
        <div>
          <span className="eyebrow">More ways to study</span>
<h2>Explore your study tools</h2>
        </div>

       <p>Choose a tool whenever you need extra help.</p>
      </section>
      <section className="tools-grid">
        <ToolCard
          tone="tool-blue"
          icon={CalendarDays}
          title="Study Plan"
          description="Build a simple study plan around your goals."
          to="/study-plan"
         action="Open tool"
        >
          <div className="mini-chat">
            <p>
              <span>AI</span> What would you like to achieve?
            </p>
            <p className="student">Semester exams in 4 weeks.</p>
          </div>
          <div className="mini-plan">
            {weeks.map((week, index) => (
              <div key={week}>
                <b>W{index + 1}</b>
                <span>{week}</span>
                <i />
              </div>
            ))}
          </div>
        </ToolCard>
        <ToolCard
          tone="tool-purple"
          icon={FileSearch}
          title="PYQ Analysis"
          description="Spot important topics and repeated questions."
          to="/pyq-analysis"
          action="Open tool"
        >
          <div className="mini-upload">
            <FileSearch />
            <b>Drop PYQs here</b>
            <small>PDF or image</small>
          </div>
          <div className="mini-stats">
            <span>
              <b>78%</b> syllabus coverage
            </span>
            <span>
              <b>22%</b> arrays
            </span>
          </div>
        </ToolCard>
        <ToolCard
          tone="tool-green"
          icon={Text}
          title="Notes Summarizer"
          description="Turn long notes into quick revision points."
          to="/notes-summarizer"
         action="Open tool"
        >
          <div className="mini-tabs">
            <span>Text</span>
            <span>PDF</span>
            <span>Image</span>
            <span>Link</span>
          </div>
          <div className="mini-summary">
            <b>Key points</b>
            <p>1. Clear explanations</p>
            <p>2. Important facts</p>
            <p>3. Quick revision</p>
          </div>
        </ToolCard>
      </section>
    </div>
  );
}
