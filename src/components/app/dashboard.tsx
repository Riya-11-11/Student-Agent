import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  FileSearch,
  Sparkles,
  Text,
  Upload,
} from "lucide-react";
import heroImage from "@/assets/student-ai-hero.jpg";
import { Button } from "@/components/ui/button";
import { useApp } from "./app-context";

const weeks = ["DSA Basics", "DBMS + PYQs", "OS + Revision", "Mock Tests"];

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
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="hero dashboard-hero">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">
            <Sparkles />
            Your study companion
          </span>

          <h1>
            Know what to study
            <br />
            <span>and what to do next.</span>
          </h1>

          <p className="hero-description">Plan. Revise. Stay on track.</p>

          <div className="hero-actions">
            <Button asChild className="hero-primary-action">
              <Link to="/study-plan">
                {hasPlan ? "View study plan" : "Create study plan"}
                <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="hero-mini-stats">
            <div>
              <CheckCircle2 />
              <span>Plan</span>
            </div>

            <div>
              <BookOpenCheck />
              <span>Learn</span>
            </div>

            <div>
              <FileSearch />
              <span>Revise</span>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <div className="hero-image-glow" />

          <img
            src={heroImage}
            width={1280}
            height={960}
            alt="Student studying with an AI study companion"
          />

          <div className="hero-floating-card">
            <Sparkles />
            <strong>Study smarter</strong>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTINUE STUDYING
      ====================================================== */}
      <section className="dashboard-section continue-section">
        <div className="section-heading compact-heading">
          <h2>{hasPlan ? "Continue studying" : "Get started"}</h2>
        </div>

        <article className="next-step-card enhanced-next-card">
          <div className="next-step-icon">
            <CalendarDays />
          </div>

          <div className="next-step-content">
            <span className="card-label">{hasPlan ? "NEXT UP" : "STEP 1"}</span>

            <h3>{hasPlan ? "Start your first study session" : "Create your study plan"}</h3>

            <p>
              {hasPlan
                ? "Open your roadmap and start studying."
                : "Add your subjects, goal, and study time."}
            </p>
          </div>

          <Button asChild className="next-step-action">
            <Link to="/study-plan">
              {hasPlan ? "Start session" : "Create plan"}
              <ArrowRight />
            </Link>
          </Button>
        </article>
      </section>

      {/* =====================================================
          PROGRESS
      ====================================================== */}
      <section className="dashboard-section progress-section enhanced-progress">
        <div className="progress-header">
          <h2>Your progress</h2>
        </div>

        <div className="progress-main-card">
          <div className="progress-score">
            <strong>0%</strong>
          </div>

          <div className="progress-bar-wrapper">
            <div
              className="progress-bar"
              role="progressbar"
              aria-label="Study progress"
              aria-valuenow={0}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="progress-bar-fill" />
            </div>
          </div>
        </div>

        <div className="progress-metrics">
          <div className="progress-metric">
            <span className="progress-metric-icon">
              <BookOpenCheck />
            </span>

            <div>
              <strong>0</strong>
              <small>Topics</small>
            </div>
          </div>

          <div className="progress-metric">
            <span className="progress-metric-icon">
              <FileSearch />
            </span>

            <div>
              <strong>0</strong>
              <small>PYQs</small>
            </div>
          </div>

          <div className="progress-metric">
            <span className="progress-metric-icon">
              <CalendarDays />
            </span>

            <div>
              <strong>0</strong>
              <small>Sessions</small>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STUDY TOOLS
      ====================================================== */}
      <section className="dashboard-section tools-section">
        <div className="section-heading tools-heading">
          <div>
            <span className="eyebrow">Study tools</span>

            <h2>Choose what you need</h2>
          </div>
        </div>

        <section className="tools-grid">
          {/* Study Plan */}
          <ToolCard
            tone="tool-blue"
            icon={CalendarDays}
            title="Study Plan"
            description="Build a weekly roadmap."
            to="/study-plan"
            action="Create plan"
          >
            <div className="tool-preview-header">
              <span>4 WEEK PLAN</span>
              <CalendarDays />
            </div>

            <div className="mini-plan">
              {weeks.map((week, index) => (
                <div key={week} className={index === 0 ? "active-week" : ""}>
                  <b>W{index + 1}</b>
                  <span>{week}</span>

                  {index === 0 && <CheckCircle2 />}
                </div>
              ))}
            </div>
          </ToolCard>

          {/* PYQ Analysis */}
          <ToolCard
            tone="tool-purple"
            icon={FileSearch}
            title="PYQ Analysis"
            description="Spot high-yield exam topics."
            to="/pyq-analysis"
            action="Analyze PYQs"
          >
            <div className="tool-preview-header">
              <span>QUESTION INSIGHTS</span>
              <FileSearch />
            </div>

            <div className="mini-stats">
              <div>
                <b>78%</b>
                <span>Coverage</span>
              </div>

              <div>
                <b>22%</b>
                <span>Top topic</span>
              </div>
            </div>

            <div className="mini-upload compact">
              <Upload />
              <span>Upload PYQs</span>
            </div>
          </ToolCard>

          {/* Notes Summarizer */}
          <ToolCard
            tone="tool-green"
            icon={Text}
            title="Notes Summarizer"
            description="Turn notes into revision points."
            to="/notes-summarizer"
            action="Summarize"
          >
            <div className="tool-preview-header">
              <span>QUICK REVISION</span>
              <Text />
            </div>

            <div className="mini-summary">
              <div className="summary-item">
                <span />
                <p>Key concepts</p>
              </div>

              <div className="summary-item">
                <span />
                <p>Important facts</p>
              </div>

              <div className="summary-item">
                <span />
                <p>Main takeaways</p>
              </div>
            </div>
          </ToolCard>
        </section>
      </section>
    </div>
  );
}
