import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  Brain,
  FileImage,
  FileText,
  Lightbulb,
  Sparkles,
  UploadCloud,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  difficultyBySubject,
  marksDataBySubject,
  questionTypesBySubject,
  thinkingLevelsBySubject,
  wait,
  yearTrends,
} from "@/lib/mock-data";

import { PageIntro } from "./study-plan";

type Status = "empty" | "loading" | "ready" | "error";

const chartConfig = {
  primary: {
    label: "Frequency",
    color: "var(--chart-purple)",
  },
  secondary: {
    label: "Secondary",
    color: "var(--chart-mint)",
  },
};

const reportData = {
  DSA: {
    topics: [
      [
        "Arrays",
        "Search · Prefix Sum · Matrices",
        "22%",
        "5 of 6 years",
        "Strong",
      ],
      [
        "Trees",
        "Binary Tree · BST · AVL · Traversal",
        "18%",
        "4 of 6 years",
        "Rising",
      ],
      [
        "Graphs",
        "BFS · DFS · Shortest Path",
        "12%",
        "3 of 6 years",
        "Rising",
      ],
    ],

    insights: [
      "Arrays and Trees appear frequently across the analyzed papers.",
      "Most questions are at a medium difficulty level.",
      "Tree traversal repeats across multiple years.",
      "Graph questions increased in recent papers.",
    ],
  },

  DBMS: {
    topics: [
      [
        "SQL",
        "Queries · Joins · Subqueries · Aggregation",
        "24%",
        "5 of 6 years",
        "Strong",
      ],
      [
        "Normalization",
        "1NF · 2NF · 3NF · BCNF",
        "18%",
        "4 of 6 years",
        "Strong",
      ],
      [
        "Transactions",
        "ACID · Serializability · Locks",
        "14%",
        "4 of 6 years",
        "Rising",
      ],
    ],

    insights: [
      "SQL queries appear frequently across the analyzed papers.",
      "Normalization is repeated across multiple years.",
      "Transaction and concurrency questions are common.",
      "Join-based questions appear regularly.",
    ],
  },

  OS: {
    topics: [
      [
        "Processes",
        "Scheduling · Processes · Threads",
        "22%",
        "5 of 6 years",
        "Strong",
      ],
      [
        "Memory Management",
        "Paging · Segmentation · Virtual Memory",
        "18%",
        "4 of 6 years",
        "Strong",
      ],
      [
        "Deadlocks",
        "Banker's Algorithm · Detection · Prevention",
        "13%",
        "3 of 6 years",
        "Rising",
      ],
    ],

    insights: [
      "Process scheduling appears frequently across the papers.",
      "Memory management is repeated across multiple years.",
      "Deadlock questions appear regularly.",
      "Scheduling problems are useful for focused practice.",
    ],
  },

  CN: {
    topics: [
      [
        "Transport Layer",
        "TCP · UDP · Flow Control",
        "21%",
        "5 of 6 years",
        "Strong",
      ],
      [
        "Network Layer",
        "IP · Routing · Subnetting",
        "19%",
        "5 of 6 years",
        "Strong",
      ],
      [
        "Data Link Layer",
        "Error Control · MAC · Framing",
        "14%",
        "4 of 6 years",
        "Rising",
      ],
    ],

    insights: [
      "Transport-layer questions appear frequently.",
      "Routing and IP concepts repeat across multiple years.",
      "Subnetting is an important area for practice.",
      "Data-link concepts appear consistently.",
    ],
  },
};

export function PyqWorkspace() {
  const [status, setStatus] = useState<Status>("empty");
  const [mode, setMode] = useState<"upload" | "paste">("upload");
  const [files, setFiles] = useState<File[]>([]);
  const [questions, setQuestions] = useState("");
  const [inputError, setInputError] = useState("");
  const [subject, setSubject] = useState("DSA");
  const [yearRange, setYearRange] = useState("2019-2024");
  const [analysisStep, setAnalysisStep] = useState(
    "Checking your questions...",
  );

  const analyze = async () => {
    setInputError("");

    const hasInput =
      mode === "upload"
        ? files.length > 0
        : questions.trim().length > 0;

    if (!hasInput) {
      setInputError(
        mode === "upload"
          ? "Upload at least one PYQ paper to continue."
          : "Paste some PYQ questions to continue.",
      );
      return;
    }

    setStatus("loading");

    setAnalysisStep("Checking your questions...");
    await wait(500);

    setAnalysisStep("Finding repeated topics...");
    await wait(500);

    setAnalysisStep("Looking for important patterns...");
    await wait(500);

    setAnalysisStep("Preparing your study insights...");
    await wait(500);

    setStatus("ready");
  };

  return (
    <div className="study-plan-page page-enter">
      <PageIntro
        icon={Brain}
        kicker="Past paper analysis"
        title="Analyze your PYQs"
        text="Find the topics, question types, and patterns worth focusing on."
        tone="purple"
      />

      <section className="pyq-input purple-panel">
        <div className="panel-title">
          <div>
            <span className="eyebrow">Step 1</span>
            <h2>Add your PYQs</h2>
          </div>

          <div className="segmented">
            <button
              type="button"
              className={mode === "upload" ? "active" : ""}
              onClick={() => {
                setMode("upload");
                setInputError("");
              }}
            >
              Upload
            </button>

            <button
              type="button"
              className={mode === "paste" ? "active" : ""}
              onClick={() => {
                setMode("paste");
                setInputError("");
              }}
            >
              Paste
            </button>
          </div>
        </div>

        <div className="pyq-input-grid">
          {mode === "upload" ? (
            <label className="upload-area compact">
              <UploadCloud />

              <b>Drop your PYQ papers here</b>

              <span>
                <FileText /> PDF <FileImage /> Image
              </span>

              <input
                className="sr-only"
                type="file"
                accept=".pdf,image/*"
                multiple
                onChange={(e) => {
                  setFiles(Array.from(e.target.files ?? []));
                  setInputError("");
                }}
              />

              {files.length > 0 && (
                <small className="pyq-input-success">
                  ✓ {files.length}{" "}
                  {files.length === 1 ? "paper" : "papers"} ready
                </small>
              )}
            </label>
          ) : (
            <textarea
              className="question-paste"
              value={questions}
              onChange={(e) => {
                setQuestions(e.target.value);
                setInputError("");
              }}
              placeholder="Paste your previous year questions here..."
            />
          )}

          <div className="filter-form">
            <label>
              <span>Subject</span>

              <input
                list="subject-options"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Select or type a subject"
              />

              <datalist id="subject-options">
                <option value="DSA">
                  Data Structures & Algorithms
                </option>
                <option value="DBMS">
                  Database Management Systems
                </option>
                <option value="OS">Operating Systems</option>
                <option value="CN">Computer Networks</option>
              </datalist>
            </label>

            <label>
              <span>Years</span>

              <input
                list="year-options"
                value={yearRange}
                onChange={(e) => setYearRange(e.target.value)}
                placeholder="Select or type years"
              />

              <datalist id="year-options">
                <option value="2019-2024" />
                <option value="2020-2024" />
                <option value="2022-2024" />
              </datalist>
            </label>

            <Button
              onClick={() => void analyze()}
              disabled={status === "loading"}
            >
              <Sparkles />

              {status === "loading"
                ? "Analyzing..."
                : "Analyze my PYQs"}
            </Button>
          </div>
        </div>

        {inputError && (
          <p className="pyq-input-error" role="alert">
            {inputError}
          </p>
        )}
      </section>

      <section className="pyq-result" aria-live="polite">
        {status === "empty" && (
          <div className="pyq-empty-guide">
            <div className="pyq-empty-icon">
              <Brain />
            </div>

            <div className="pyq-empty-content">
              <span className="eyebrow">
                Your results will appear here
              </span>

              <h3>See what repeats in your PYQs</h3>

              <div className="pyq-empty-points">
                <span>🔥 Repeated topics</span>
                <span>📊 Question types</span>
                <span>📈 Year trends</span>
                <span>🎯 Focus areas</span>
              </div>
            </div>
          </div>
        )}

        {status === "loading" && (
          <div className="pyq-analysis-loading">
            <div className="pyq-loading-icon">
              <Sparkles />
            </div>

            <div className="pyq-loading-content">
              <h3>{analysisStep}</h3>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="pyq-error-guide">
            <div className="pyq-error-icon">⚠</div>

            <div className="pyq-error-content">
              <h3>Analysis failed</h3>

              <p>Check your input and try again.</p>

              <Button onClick={() => void analyze()}>
                Try again
                <ArrowRight />
              </Button>
            </div>
          </div>
        )}

        {status === "ready" && (
          <Report subject={subject} yearRange={yearRange} />
        )}
      </section>
    </div>
  );
}

function Report({
  subject,
  yearRange,
}: {
  subject: string;
  yearRange: string;
}) {
  const currentReport =
    reportData[subject as keyof typeof reportData] ?? reportData.DSA;

  const currentYearTrends =
    yearTrends[subject as keyof typeof yearTrends] ??
    yearTrends.DSA;

  const currentDifficulty =
    difficultyBySubject[subject as keyof typeof difficultyBySubject] ??
    difficultyBySubject.DSA;

  const currentQuestionTypes =
    questionTypesBySubject[
      subject as keyof typeof questionTypesBySubject
    ] ?? questionTypesBySubject.DSA;

  const [topicFilter, setTopicFilter] = useState("All topics");

  const subjectName = subject || "DSA";

  const filteredTopics =
    topicFilter === "All topics"
      ? currentReport.topics
      : currentReport.topics.filter(
          (topic) => topic[0] === topicFilter,
        );

  const focusTopic = filteredTopics[0] ?? null;
  const secondTopic = filteredTopics[1] ?? null;

  const risingTopic =
    filteredTopics.find((topic) => topic[4] === "Rising") ??
    filteredTopics[1] ??
    null;

  const topDifficulty: string =
    [...currentDifficulty]
      .sort((a, b) => b.value - a.value)[0]?.name ?? "Mixed";

  const topQuestionType: string =
    [...currentQuestionTypes]
      .sort((a, b) => b.value - a.value)[0]?.name ??
    "Mixed questions";

  return (
    <div className="pyq-v2-report">
      <header className="pyq-v2-header">
        <div>
          <div className="pyq-v2-eyebrow">
            <Sparkles size={15} />
            PYQ ANALYSIS
          </div>

          <h2>{subjectName} exam patterns</h2>

          <p className="pyq-v2-year-range">
            {yearRange.replace("-", " – ")}
          </p>
        </div>
      </header>

      <section className="pyq-v2-section pyq-v2-quick-read">
        <div className="pyq-v2-section-heading">
          <div>
            <span className="pyq-v2-label">QUICK READ</span>

            <h3>What should you focus on?</h3>
          </div>
        </div>

        <div className="pyq-v2-insight-grid">
          <article className="pyq-v2-insight-card pyq-v2-insight-primary">
            <div className="pyq-v2-card-top">
              <span className="pyq-v2-icon">🎯</span>
              <span className="pyq-v2-mini-label">
                FOCUS FIRST
              </span>
            </div>

            <h4>{focusTopic?.[0]}</h4>

            <div className="pyq-v2-big-stat">
              {focusTopic?.[2]}
              <span>frequency</span>
            </div>

            <p>
              Appeared in <strong>{focusTopic?.[3]}</strong>.
            </p>
          </article>

          <article className="pyq-v2-insight-card">
            <div className="pyq-v2-card-top">
              <span className="pyq-v2-icon">📈</span>
              <span className="pyq-v2-mini-label">
                KEEP AN EYE ON
              </span>
            </div>

            <h4>{risingTopic?.[0]}</h4>

            <div className="pyq-v2-trend-badge">
              {risingTopic?.[4] || "Active"}
            </div>
          </article>

          <article className="pyq-v2-insight-card">
            <div className="pyq-v2-card-top">
              <span className="pyq-v2-icon">🧠</span>
              <span className="pyq-v2-mini-label">PRACTISE</span>
            </div>

            <h4>{topQuestionType}</h4>

            <div className="pyq-v2-stat-line">
              <span>Most common question type</span>
            </div>

            <p>
              Focus on <strong>{topDifficulty}</strong>-level
              questions.
            </p>
          </article>
        </div>

        <div className="pyq-v2-next-move">
          <div className="pyq-v2-next-icon">
            <ArrowRight size={18} />
          </div>

          <div>
            <span>NEXT MOVE</span>

            <p>
              Revise <strong>{focusTopic?.[0]}</strong>, then
              practise <strong>{secondTopic?.[0]}</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="pyq-v2-section">
        <div className="pyq-v2-section-heading pyq-v2-heading-with-control">
          <div>
            <span className="pyq-v2-label">TOPICS</span>

            <h3>What keeps coming back?</h3>
          </div>

          <select
            value={topicFilter}
            onChange={(event) =>
              setTopicFilter(event.target.value)
            }
            className="pyq-v2-select"
          >
            <option>All topics</option>

            {currentReport.topics.map((topic) => (
              <option key={topic[0]}>{topic[0]}</option>
            ))}
          </select>
        </div>

        <div className="pyq-v2-topic-list">
          {filteredTopics.map((topic, index) => {
            const [
              name,
              description,
              frequency,
              papers,
              trend,
            ] = topic;

            const numericFrequency =
              Number.parseInt(
                String(frequency).replace("%", ""),
                10,
              ) || 0;

            return (
              <article
                className="pyq-v2-topic-row"
                key={name}
              >
                <div className="pyq-v2-topic-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="pyq-v2-topic-main">
                  <div className="pyq-v2-topic-title">
                    <h4>{name}</h4>

                    {trend && (
                      <span
                        className={`pyq-v2-topic-trend ${
                          trend === "Rising"
                            ? "pyq-v2-trend-rising"
                            : "pyq-v2-trend-stable"
                        }`}
                      >
                        {trend}
                      </span>
                    )}
                  </div>

                  <p>{description}</p>

                  <div className="pyq-v2-progress-track">
                    <div
                      className="pyq-v2-progress-fill"
                      style={{
                        width: `${Math.min(
                          numericFrequency,
                          100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="pyq-v2-topic-stats">
                  <strong>{frequency}</strong>
                  <span>frequency</span>
                </div>

                <div className="pyq-v2-topic-stats">
                  <strong>{papers}</strong>
                  <span>papers</span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="pyq-v2-pattern-note">
          <div className="pyq-v2-pattern-note-icon">
            <Sparkles size={17} />
          </div>

          <div>
            <strong>Worth noticing</strong>

            <p>
              {currentReport.insights?.[0] ??
                `${focusTopic?.[0]} appears regularly.`}
            </p>
          </div>
        </div>
      </section>

      <section className="pyq-v2-section pyq-v2-explore">
        <div className="pyq-v2-section-heading">
          <div>
            <span className="pyq-v2-label">MORE DETAILS</span>

            <h3>Explore the analysis</h3>
          </div>
        </div>

        <details
          className="pyq-v2-detail-card"
          open
        >
          <summary>
            <div className="pyq-v2-summary-icon">📊</div>

            <div className="pyq-v2-summary-copy">
              <strong>Frequency & yearly trend</strong>
            </div>

            <span className="pyq-v2-summary-arrow">
              ⌄
            </span>
          </summary>

          <div className="pyq-v2-detail-content">
            <ChartCard
              title="Topic frequency"
              takeaway={`Start with ${focusTopic?.[0]}, which appears most often.`}
            >
              <div className="pyq-v2-frequency-list">
                {currentReport.topics.map((topic) => (
                  <div
                    className="pyq-v2-frequency-item"
                    key={topic[0]}
                  >
                    <div className="pyq-v2-frequency-head">
                      <span>{topic[0]}</span>
                      <strong>{topic[2]}</strong>
                    </div>

                    <div className="pyq-v2-progress-track">
                      <div
                        className="pyq-v2-progress-fill"
                        style={{
                          width: `${Math.min(
                            Number.parseInt(
                              String(topic[2]).replace(
                                "%",
                                "",
                              ),
                              10,
                            ) || 0,
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>

            <ChartCard
              title="Yearly trend"
              takeaway="Spot topics that are becoming more or less common."
            >
              <ChartContainer
                config={{
                  topic1: {
                    label:
                      currentReport.topics[0]?.[0] ??
                      "Topic 1",
                    color: "hsl(var(--chart-1))",
                  },
                  topic2: {
                    label:
                      currentReport.topics[1]?.[0] ??
                      "Topic 2",
                    color: "hsl(var(--chart-2))",
                  },
                  topic3: {
                    label:
                      currentReport.topics[2]?.[0] ??
                      "Topic 3",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="w-full"
                style={{ height: "250px" }}
              >
                <LineChart data={currentYearTrends}>
                  <CartesianGrid vertical={false} />

                  <XAxis
                    dataKey="year"
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    width={30}
                  />

                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />

                  <Line
                    type="monotone"
                    dataKey="topic1"
                    stroke="var(--color-topic1)"
                    strokeWidth={3}
                    dot={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="topic2"
                    stroke="var(--color-topic2)"
                    strokeWidth={3}
                    dot={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="topic3"
                    stroke="var(--color-topic3)"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </ChartCard>
          </div>
        </details>

        <details className="pyq-v2-detail-card">
          <summary>
            <div className="pyq-v2-summary-icon">🧠</div>

            <div className="pyq-v2-summary-copy">
              <strong>Question types & difficulty</strong>
            </div>

            <span className="pyq-v2-summary-arrow">
              ⌄
            </span>
          </summary>

          <div className="pyq-v2-detail-content">
            <ChartCard
              title="Question types"
              takeaway={`Practise more ${topQuestionType.toLowerCase()} questions.`}
            >
              <ChartContainer
                config={{
                  questions: {
                    label: "Questions",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[250px] w-full"
              >
                <BarChart data={currentQuestionTypes}>
                  <CartesianGrid vertical={false} />

                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    width={30}
                  />

                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />

                  <Bar
                    dataKey="value"
                    fill="var(--color-questions)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </ChartCard>

            <ChartCard
              title="Difficulty mix"
              takeaway={`Focus on ${topDifficulty.toLowerCase()} questions.`}
            >
              <div className="pyq-v2-difficulty-list">
                {currentDifficulty.map((item) => {
                  const value = Number(item.value) || 0;

                  return (
                    <div
                      className="pyq-v2-difficulty-item"
                      key={item.name}
                    >
                      <div className="pyq-v2-frequency-head">
                        <span>{item.name}</span>
                        <strong>{value}%</strong>
                      </div>

                      <div className="pyq-v2-progress-track">
                        <div
                          className="pyq-v2-progress-fill"
                          style={{
                            width: `${Math.min(
                              value,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </ChartCard>
          </div>
        </details>
      </section>

      <section className="pyq-v2-action-card">
        <div className="pyq-v2-action-content">
          <span className="pyq-v2-label">NEXT STEP</span>

          <h3>Turn your PYQs into a study plan</h3>

          <div className="pyq-v2-study-sequence">
            <div>
              <span>01</span>
              <strong>Revise</strong>
              <small>{focusTopic?.[0]}</small>
            </div>

            <ArrowRight size={18} />

            <div>
              <span>02</span>
              <strong>Practise</strong>
              <small>Previous questions</small>
            </div>

            <ArrowRight size={18} />

            <div>
              <span>03</span>
              <strong>Move next</strong>
              <small>{secondTopic?.[0]}</small>
            </div>
          </div>
        </div>

        <Button
          asChild
          size="lg"
          className="pyq-v2-action-button"
        >
          <Link
            to="/study-plan"
            search={{
              topic: focusTopic?.[0],
            }}
          >
            Build my study plan
            <ArrowRight size={17} />
          </Link>
        </Button>
      </section>
    </div>
  );
}

function ChartCard({
  title,
  takeaway,
  children,
}: {
  title: string;
  takeaway?: string;
  children: ReactNode;
}) {
  return (
    <article className="chart-card">
      <div className="chart-card-header">
        <h3>{title}</h3>
      </div>

      <div className="chart-card-visual">
        {children}
      </div>

      {takeaway && (
        <p className="chart-takeaway">
          <Lightbulb size={14} />
          {takeaway}
        </p>
      )}
    </article>
  );
}