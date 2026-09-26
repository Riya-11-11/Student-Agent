import { useState } from "react";
import "./study-plan.css";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  RotateCcw,
  Save,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ErrorState } from "./states";
import { sampleWeeks, wait } from "@/lib/mock-data";
import { useApp } from "./app-context";

type Status = "empty" | "loading" | "ready" | "error";

type StudyPlanWorkspaceProps = {
  pyqTopic?: string;
};

export function StudyPlanWorkspace({ pyqTopic }: StudyPlanWorkspaceProps) {
  const { savePlan } = useApp();

  const [status, setStatus] = useState<Status>("empty");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const [goal, setGoal] = useState("Prepare for semester exams");

  const [subjects, setSubjects] = useState(
    pyqTopic ? `DSA, DBMS, OS, Computer Networks, ${pyqTopic}` : "DSA, DBMS, OS, Computer Networks",
  );

  const [examDate, setExamDate] = useState("2026-11-15");
  const [timeline, setTimeline] = useState("4 weeks");
  const [studyHours, setStudyHours] = useState("3");
  const [level, setLevel] = useState("Intermediate");

  const [showPyqSuggestion, setShowPyqSuggestion] = useState(Boolean(pyqTopic));

  const generate = async () => {
    setStatus("loading");
    setSaved(false);
    setSaveMessage("");
    setSessionStarted(false);
    setSessionCompleted(false);
    setCompletedTasks({});
    setExpanded(null);

    await wait();

    setStatus("ready");
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void generate();
  };

  const removePyqSuggestion = () => {
    if (!pyqTopic) return;

    setSubjects((current) =>
      current
        .split(",")
        .map((subject) => subject.trim())
        .filter((subject) => subject.toLowerCase() !== pyqTopic.toLowerCase())
        .join(", "),
    );

    setShowPyqSuggestion(false);
  };

  const save = () => {
    savePlan({
      id: `study-plan-${Date.now()}`,
      name: goal || "My Study Plan",
      subjects: subjects
        .split(",")
        .map((subject) => subject.trim())
        .filter(Boolean),
      duration: timeline,
      createdAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      progress: 0,
      weeks: sampleWeeks,
    });

    setSaved(true);
    setSaveMessage("Your study plan has been saved.");
  };

  const focusTopic =
    showPyqSuggestion && pyqTopic ? pyqTopic : subjects.split(",")[0]?.trim() || "Your first topic";

  const subjectCount = subjects
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean).length;

  return (
    <div className="study-plan-page page-enter">
      <PageIntro
        icon={CalendarDays}
        kicker="Let's plan your study"
        title="Build your study plan"
        text="Tell us your goal and schedule. We'll organise the rest."
        tone="purple"
      />

      {pyqTopic && showPyqSuggestion && (
        <section className="pyq-plan-suggestion">
          <div className="pyq-plan-suggestion-icon">
            <TrendingUp />
          </div>

          <div className="pyq-plan-suggestion-content">
            <span className="eyebrow">From your PYQ analysis</span>

            <h3>{pyqTopic} could be a good place to start</h3>

            <p>
              We've added this topic to your subjects because it appeared regularly in your PYQ
              analysis.
            </p>
          </div>

          <button
            type="button"
            className="pyq-suggestion-close"
            onClick={removePyqSuggestion}
            aria-label={`Remove ${pyqTopic} suggestion`}
          >
            <X />
          </button>
        </section>
      )}

      <div className="workspace-grid">
        <form className="form-panel" onSubmit={submit}>
          <div className="form-progress">
            <div className="form-step active">
              <span>1</span>
              <small>Your goal</small>
            </div>

            <div className="form-progress-line" />

            <div className="form-step">
              <span>2</span>
              <small>Your schedule</small>
            </div>
          </div>

          <div className="panel-title">
            <div>
              <span className="eyebrow">Step 1 of 2</span>
              <h2>What are you preparing for?</h2>
              <p>Start with your goal and the subjects you want to cover.</p>
            </div>

            <div className="panel-title-icon">
              <Target />
            </div>
          </div>

          <div className="form-section first-section">
            <Field label="Your goal">
              <input
                required
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Prepare for semester exams"
              />
            </Field>

            <Field label="Subjects">
              <input
                required
                value={subjects}
                onChange={(e) => setSubjects(e.target.value)}
                placeholder="e.g. DSA, DBMS, Operating Systems"
              />

              {pyqTopic && showPyqSuggestion && (
                <small className="field-hint">
                  <TrendingUp />
                  {pyqTopic} was added from your PYQ insights.
                </small>
              )}
            </Field>
          </div>

          <div className="form-section">
            <div className="form-section-heading">
              <div>
                <span className="eyebrow">Step 2 of 2</span>
                <h3>Set your schedule</h3>
              </div>

              <Clock3 />
            </div>

            <p className="form-section-helper">Choose a schedule you can realistically follow.</p>

            <div className="form-row">
              <Field label="Exam date">
                <input
                  required
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                />
              </Field>

              <Field label="Plan length">
                <select value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                  <option>2 weeks</option>
                  <option>4 weeks</option>
                  <option>6 weeks</option>
                  <option>8 weeks</option>
                </select>
              </Field>
            </div>

            <div className="form-row">
              <Field label="Study hours per day">
                <input
                  required
                  type="number"
                  min="1"
                  max="12"
                  step="0.5"
                  value={studyHours}
                  onChange={(e) => setStudyHours(e.target.value)}
                />
              </Field>

              <Field label="Your level">
                <select value={level} onChange={(e) => setLevel(e.target.value)}>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </Field>
            </div>

            <Field label="Study days">
              <div className="day-picker">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                  <label key={`${day}-${index}`}>
                    <input type="checkbox" defaultChecked={index < 6} />
                    <span>{day}</span>
                  </label>
                ))}
              </div>

              <small className="field-hint">
                Choose the days you can usually study. Rest days are completely okay.
              </small>
            </Field>

            <Field label="Anything else?">
              <textarea
                rows={2}
                placeholder="Optional — e.g. I need extra revision for difficult topics"
              />
            </Field>
          </div>

          <Button className="primary-wide" type="submit" disabled={status === "loading"}>
            <Sparkles />
            {status === "loading" ? "Building your plan..." : "Create my study plan"}
            {status !== "loading" && <ArrowRight />}
          </Button>

          <p className="form-submit-helper">You can always change your plan later.</p>
        </form>

        <section className="result-panel" aria-live="polite">
          {status === "empty" && (
            <div className="plan-empty-state">
              <div className="plan-empty-icon">
                <CalendarDays />
              </div>

              <span className="eyebrow">Your roadmap</span>

              <h2>Your study plan will appear here</h2>

              <p>
                Fill in the details on the left and we'll turn them into a simple weekly roadmap.
              </p>

              <div className="plan-empty-steps">
                <div>
                  <span>1</span>
                  <strong>Tell us your goal</strong>
                </div>

                <div>
                  <span>2</span>
                  <strong>Set your schedule</strong>
                </div>

                <div>
                  <span>3</span>
                  <strong>Start studying</strong>
                </div>
              </div>

              <div className="plan-empty-message">
                <Sparkles />
                <span>We'll help you decide what to focus on first.</span>
              </div>
            </div>
          )}

          {status === "loading" && (
            <div className="plan-building-state">
              <div className="plan-building-icon">
                <Sparkles />
              </div>

              <span className="eyebrow">Almost there</span>

              <h2>Building your study plan...</h2>

              <p>We're turning your goals and schedule into manageable weekly steps.</p>

              <div className="plan-building-steps">
                <span>
                  <Check />
                  Organising subjects
                </span>

                <span>
                  <Check />
                  Planning your weeks
                </span>

                <span>
                  <Check />
                  Adding revision
                </span>
              </div>
            </div>
          )}

          {status === "error" && <ErrorState retry={generate} />}

          {status === "ready" && (
            <div className="plan-result">
              <div className="plan-result-head">
                <div>
                  <span className="eyebrow">Your plan is ready ✨</span>
                  <h2>Let's get started</h2>
                  <p>You don't have to figure everything out at once. Start with today's focus.</p>
                </div>

                <span className="status-pill">
                  <Check />
                  Ready
                </span>
              </div>

              <div className="plan-at-a-glance">
                <div className="plan-glance-item">
                  <CalendarDays />
                  <div>
                    <small>Exam</small>
                    <strong>
                      {new Date(examDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </strong>
                  </div>
                </div>

                <div className="plan-glance-item">
                  <Clock3 />
                  <div>
                    <small>Daily study</small>
                    <strong>{studyHours} hrs</strong>
                  </div>
                </div>

                <div className="plan-glance-item">
                  <BookOpen />
                  <div>
                    <small>Subjects</small>
                    <strong>{subjectCount}</strong>
                  </div>
                </div>
              </div>

              {pyqTopic && showPyqSuggestion && (
                <div className="plan-focus-note">
                  <TrendingUp />

                  <div>
                    <strong>Recommended from your PYQs</strong>
                    <span>Start with {pyqTopic}</span>
                  </div>
                </div>
              )}

              <section className="today-focus-card">
                <div className="today-focus-header">
                  <div>
                    <span className="eyebrow">Start here</span>
                    <h3>Today's focus</h3>
                    <p>One focused session is enough to get started.</p>
                  </div>

                  <span className="today-focus-time">45 min</span>
                </div>

                <div className="today-focus-topic">
                  <div className="today-focus-icon">
                    <Target />
                  </div>

                  <div>
                    <span>Focus topic</span>
                    <strong>{focusTopic}</strong>
                  </div>
                </div>

                <div className="today-focus-steps">
                  <div>
                    <span>1</span>
                    <strong>Learn</strong>
                  </div>

                  <div>
                    <span>2</span>
                    <strong>Practice</strong>
                  </div>

                  <div>
                    <span>3</span>
                    <strong>Revise</strong>
                  </div>
                </div>

                {!sessionStarted && !sessionCompleted && (
                  <Button
                    type="button"
                    className="today-focus-button"
                    onClick={() => setSessionStarted(true)}
                  >
                    Start today's session
                    <ArrowRight />
                  </Button>
                )}

                {sessionStarted && !sessionCompleted && (
                  <div className="session-active">
                    <div className="session-active-message">
                      <span className="session-active-icon">
                        <Clock3 />
                      </span>

                      <div>
                        <strong>Session in progress</strong>
                        <span>Focus on {focusTopic} for 45 minutes.</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      className="today-focus-button"
                      onClick={() => {
                        setSessionCompleted(true);
                        setSessionStarted(false);
                      }}
                    >
                      <Check />
                      Mark session complete
                    </Button>
                  </div>
                )}

                {sessionCompleted && (
                  <div className="session-completed-message">
                    <span className="session-completed-icon">
                      <Check />
                    </span>

                    <div>
                      <strong>Session completed 🎉</strong>
                      <span>Great start. Continue with your roadmap when you're ready.</span>
                    </div>
                  </div>
                )}
              </section>

              <div className="roadmap-section">
                <div className="roadmap-heading">
                  <div>
                    <span className="eyebrow">Your roadmap</span>
                    <h3>{timeline} to go</h3>
                  </div>

                  <span>{sampleWeeks.length} weeks</span>
                </div>

                <div className="week-stack">
                  {sampleWeeks.map((week) => {
                    const completed = week.tasks.filter(
                      (_, index) => completedTasks[`${week.week}-${index}`],
                    ).length;

                    const progress =
                      week.tasks.length > 0 ? Math.round((completed / week.tasks.length) * 100) : 0;

                    return (
                      <article className="week-card" key={week.week}>
                        <button
                          type="button"
                          className="week-summary"
                          onClick={() => setExpanded(expanded === week.week ? null : week.week)}
                        >
                          <span className="week-number">{week.week}</span>

                          <span className="week-heading">
                            <strong>{week.title}</strong>
                            <small>
                              {week.week === 1
                                ? "Build your foundation"
                                : week.week === 2
                                  ? "Practise what you learned"
                                  : week.week === 3
                                    ? "Strengthen weak areas"
                                    : "Revise and test yourself"}
                            </small>
                          </span>

                          <span className="week-progress-mini">{progress}%</span>

                          {expanded === week.week ? <ChevronUp /> : <ChevronDown />}
                        </button>

                        {expanded === week.week && (
                          <div className="week-details">
                            <div className="week-goal">
                              <Target />

                              <div>
                                <span>This week's goal</span>

                                <strong>
                                  {week.week === 1
                                    ? "Build a strong foundation"
                                    : week.week === 2
                                      ? "Get comfortable with practice"
                                      : week.week === 3
                                        ? "Strengthen your weak areas"
                                        : "Revise and test your progress"}
                                </strong>
                              </div>
                            </div>

                            <div className="week-detail-item">
                              <b>
                                <BookOpen />
                                What to study
                              </b>

                              <p>{week.topics.join(" · ")}</p>
                            </div>

                            <div className="week-detail-item">
                              <b>
                                <Check />
                                Tasks
                              </b>

                              <div className="week-task-list">
                                {week.tasks.map((task, index) => {
                                  const taskId = `${week.week}-${index}`;
                                  const taskCompleted = Boolean(completedTasks[taskId]);

                                  return (
                                    <label
                                      key={taskId}
                                      className={`week-task ${taskCompleted ? "completed" : ""}`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={taskCompleted}
                                        onChange={() =>
                                          setCompletedTasks((current) => ({
                                            ...current,
                                            [taskId]: !current[taskId],
                                          }))
                                        }
                                      />

                                      <span>{task}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="week-bottom-info">
                              <span>
                                <Clock3 />
                                {week.time}
                              </span>

                              <span>
                                <RotateCcw />
                                {week.revision}
                              </span>
                            </div>

                            <div className="week-progress">
                              <div className="week-progress-label">
                                <span>Your progress</span>
                                <strong>{progress}%</strong>
                              </div>

                              <div className="progress-track">
                                <i style={{ width: `${progress}%` }} />
                              </div>

                              <p className="week-progress-hint">
                                {progress === 100
                                  ? "All tasks complete — great work!"
                                  : progress >= 50
                                    ? "You're halfway there — keep going."
                                    : "Start with the first task and build your momentum."}
                              </p>
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>

              <div className="result-actions">
                <Button
                  variant="outline"
                  onClick={() => {
                    const shouldRegenerate = window.confirm(
                      "Are you sure you want to create a new study plan?",
                    );

                    if (shouldRegenerate) {
                      void generate();
                    }
                  }}
                >
                  <RotateCcw />
                  Create another
                </Button>

                <Button onClick={save} disabled={saved}>
                  <Save />
                  {saved ? "Plan saved ✓" : "Save plan"}
                </Button>
              </div>

              {saveMessage && (
                <div className="save-feedback" role="status">
                  <Check />

                  <div>
                    <strong>{saveMessage}</strong>
                    <span>Your plan is ready whenever you are.</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export function PageIntro({
  icon: Icon,
  kicker,
  title,
  text,
  tone,
}: {
  icon: typeof CalendarDays;
  kicker: string;
  title: string;
  text: string;
  tone: "blue" | "purple" | "green";
}) {
  return (
    <header className={`page-intro ${tone}`}>
      <span className="page-icon">
        <Icon />
      </span>

      <div>
        <span className="eyebrow">{kicker}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </header>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}
