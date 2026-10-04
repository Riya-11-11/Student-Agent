import { useState } from "react";
import "./study-plan.css";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
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

export function StudyPlanWorkspace({
  pyqTopic,
}: StudyPlanWorkspaceProps) {
  const { savePlan } = useApp();

  const [status, setStatus] = useState<Status>("empty");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<
    Record<string, boolean>
  >({});

  const [goal, setGoal] = useState("Prepare for semester exams");

  const [subjects, setSubjects] = useState(
    pyqTopic
      ? `DSA, DBMS, OS, Computer Networks, ${pyqTopic}`
      : "DSA, DBMS, OS, Computer Networks",
  );

  const [examDate, setExamDate] = useState("2026-11-15");
  const [timeline, setTimeline] = useState("4 weeks");
  const [studyHours, setStudyHours] = useState("3");
  const [level, setLevel] = useState("Intermediate");

  const [showPyqSuggestion, setShowPyqSuggestion] =
    useState(Boolean(pyqTopic));

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
        .filter(
          (subject) =>
            subject.toLowerCase() !== pyqTopic.toLowerCase(),
        )
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
    setSaveMessage("Plan saved");
  };

  const focusTopic =
    showPyqSuggestion && pyqTopic
      ? pyqTopic
      : subjects.split(",")[0]?.trim() || "Your first topic";

  const subjectCount = subjects
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean).length;

  return (
    <div className="study-plan-page page-enter">
      {/* PAGE HEADER */}
      <PageIntro
        icon={CalendarCheck}
        kicker="Study plan"
        title="Plan what to study"
        text="Set your goal and schedule."
        tone="purple"
      />

      {/* PYQ SUGGESTION */}
      {pyqTopic && showPyqSuggestion && (
        <section className="pyq-plan-suggestion">
          <div className="pyq-plan-suggestion-icon">
            <TrendingUp />
          </div>

          <div className="pyq-plan-suggestion-content">
            <span className="eyebrow">From PYQ analysis</span>

            <h3>Start with {pyqTopic}</h3>

            <p>Added from your PYQ insights.</p>
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
        {/* FORM */}
        <form className="form-panel" onSubmit={submit}>
          <div className="form-progress">
            <div className="form-step active">
              <span>1</span>
              <small>Goal</small>
            </div>

            <div className="form-progress-line" />

            <div className="form-step">
              <span>2</span>
              <small>Schedule</small>
            </div>
          </div>

          {/* STEP 1 */}
          <div className="panel-title">
            <div>
              <span className="eyebrow">Step 1 of 2</span>
              <h2>What are you preparing for?</h2>
            </div>

            <div className="panel-title-icon">
              <Target />
            </div>
          </div>

          <div className="form-section first-section">
            <Field label="Goal">
              <input
                required
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Semester exams"
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
                  Added from PYQ analysis
                </small>
              )}
            </Field>
          </div>

          {/* STEP 2 */}
          <div className="form-section">
            <div className="form-section-heading">
              <div>
                <span className="eyebrow">Step 2 of 2</span>
                <h3>Set your schedule</h3>
              </div>

              <Clock3 />
            </div>

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
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                >
                  <option>2 weeks</option>
                  <option>4 weeks</option>
                  <option>6 weeks</option>
                  <option>8 weeks</option>
                </select>
              </Field>
            </div>

            <div className="form-row">
              <Field label="Study hours">
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

              <Field label="Level">
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </Field>
            </div>

            <Field label="Study days">
              <div className="day-picker">
                {["M", "T", "W", "T", "F", "S", "S"].map(
                  (day, index) => (
                    <label key={`${day}-${index}`}>
                      <input
                        type="checkbox"
                        defaultChecked={index < 6}
                      />
                      <span>{day}</span>
                    </label>
                  ),
                )}
              </div>
            </Field>

            <Field label="Anything else?">
              <textarea
                rows={2}
                placeholder="Optional"
              />
            </Field>
          </div>

          <Button
            className="primary-wide"
            type="submit"
            disabled={status === "loading"}
          >
            <Sparkles />

            {status === "loading"
              ? "Creating plan..."
              : "Create study plan"}

            {status !== "loading" && <ArrowRight />}
          </Button>
        </form>

        {/* RESULT */}
        <section className="result-panel" aria-live="polite">
          {/* EMPTY */}
          {status === "empty" && (
            <div className="plan-empty-state">
              <div className="plan-empty-icon">
                <CalendarDays />
              </div>

              <span className="eyebrow">Your plan</span>

              <h2>Your study plan will appear here</h2>

              <p>Add your details to get started.</p>

              <div className="plan-empty-steps">
                <div>
                  <span>1</span>
                  <strong>Set goal</strong>
                </div>

                <div>
                  <span>2</span>
                  <strong>Set schedule</strong>
                </div>

                <div>
                  <span>3</span>
                  <strong>Start</strong>
                </div>
              </div>
            </div>
          )}

          {/* LOADING */}
          {status === "loading" && (
            <div className="plan-building-state">
              <div className="plan-building-icon">
                <Sparkles />
              </div>

              <span className="eyebrow">Creating plan</span>

              <h2>Putting it together...</h2>

              <div className="plan-building-steps">
                <span>
                  <Check />
                  Subjects
                </span>

                <span>
                  <Check />
                  Schedule
                </span>

                <span>
                  <Check />
                  Revision
                </span>
              </div>
            </div>
          )}

          {/* ERROR */}
          {status === "error" && <ErrorState retry={generate} />}

          {/* READY */}
          {status === "ready" && (
            <div className="plan-result">
              <div className="plan-result-head">
                <div>
                  <span className="eyebrow">Plan ready</span>

                  <h2>Here's where to start</h2>
                </div>

                <span className="status-pill">
                  <Check />
                  Ready
                </span>
              </div>

              {/* AT A GLANCE */}
              <div className="plan-at-a-glance">
                <div className="plan-glance-item">
                  <CalendarDays />

                  <div>
                    <small>Exam</small>

                    <strong>
                      {new Date(examDate).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
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

              {/* PYQ FOCUS */}
              {pyqTopic && showPyqSuggestion && (
                <div className="plan-focus-note">
                  <TrendingUp />

                  <div>
                    <strong>Priority topic</strong>
                    <span>{pyqTopic}</span>
                  </div>
                </div>
              )}

              {/* TODAY */}
              <section className="today-focus-card">
                <div className="today-focus-header">
                  <div>
                    <span className="eyebrow">Start here</span>
                    <h3>Today's focus</h3>
                  </div>

                  <span className="today-focus-time">
                    45 min
                  </span>
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
                    Start session
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

                        <span>
                          {focusTopic} · 45 min
                        </span>
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
                      Mark complete
                    </Button>
                  </div>
                )}

                {sessionCompleted && (
                  <div className="session-completed-message">
                    <span className="session-completed-icon">
                      <Check />
                    </span>

                    <div>
                      <strong>Session complete</strong>

                      <span>Continue with your roadmap.</span>
                    </div>
                  </div>
                )}
              </section>

              {/* ROADMAP */}
              <div className="roadmap-section">
                <div className="roadmap-heading">
                  <div>
                    <span className="eyebrow">Roadmap</span>

                    <h3>{timeline} to go</h3>
                  </div>

                  <span>{sampleWeeks.length} weeks</span>
                </div>

                <div className="week-stack">
                  {sampleWeeks.map((week) => {
                    const completed = week.tasks.filter(
                      (_, index) =>
                        completedTasks[`${week.week}-${index}`],
                    ).length;

                    const progress =
                      week.tasks.length > 0
                        ? Math.round(
                            (completed / week.tasks.length) * 100,
                          )
                        : 0;

                    return (
                      <article
                        className="week-card"
                        key={week.week}
                      >
                        <button
                          type="button"
                          className="week-summary"
                          onClick={() =>
                            setExpanded(
                              expanded === week.week
                                ? null
                                : week.week,
                            )
                          }
                        >
                          <span className="week-number">
                            {week.week}
                          </span>

                          <span className="week-heading">
                            <strong>{week.title}</strong>
                          </span>

                          <span className="week-progress-mini">
                            {progress}%
                          </span>

                          {expanded === week.week ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                        </button>

                        {expanded === week.week && (
                          <div className="week-details">
                            <div className="week-goal">
                              <Target />

                              <div>
                                <span>Goal</span>

                                <strong>
                                  {week.week === 1
                                    ? "Build a strong foundation"
                                    : week.week === 2
                                      ? "Get comfortable with practice"
                                      : week.week === 3
                                        ? "Strengthen weak areas"
                                        : "Revise and test your progress"}
                                </strong>
                              </div>
                            </div>

                            <div className="week-detail-item">
                              <b>
                                <BookOpen />
                                Topics
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
                                  const taskCompleted =
                                    Boolean(
                                      completedTasks[taskId],
                                    );

                                  return (
                                    <label
                                      key={taskId}
                                      className={`week-task ${
                                        taskCompleted
                                          ? "completed"
                                          : ""
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={taskCompleted}
                                        onChange={() =>
                                          setCompletedTasks(
                                            (current) => ({
                                              ...current,
                                              [taskId]:
                                                !current[taskId],
                                            }),
                                          )
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
                                <span>Progress</span>
                                <strong>{progress}%</strong>
                              </div>

                              <div className="progress-track">
                                <i
                                  style={{
                                    width: `${progress}%`,
                                  }}
                                />
                              </div>

                              <p className="week-progress-hint">
                                {progress === 100
                                  ? "Complete"
                                  : progress >= 50
                                    ? "Halfway there"
                                    : "Keep going"}
                              </p>
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="result-actions">
                <Button
                  variant="outline"
                  onClick={() => {
                    const shouldRegenerate =
                      window.confirm(
                        "Create a new study plan?",
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
                <div
                  className="save-feedback"
                  role="status"
                >
                  <Check />

                  <div>
                    <strong>{saveMessage}</strong>
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}