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
      [
        "Arrays and Trees appear frequently across the analyzed papers.",
        "high priority",
      ],
      [
        "Most questions are at a medium difficulty level.",
        "balanced practice",
      ],
      [
        "Tree traversal repeats across multiple years.",
        "revise again",
      ],
      [
        "Graph questions increased in recent papers.",
        "rising topic",
      ],
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
      [
        "SQL queries appear frequently across the analyzed papers.",
        "high priority",
      ],
      [
        "Normalization is repeated across multiple years.",
        "revise again",
      ],
      [
        "Transaction and concurrency questions are common.",
        "important topic",
      ],
      [
        "Join-based questions appear regularly.",
        "practice more",
      ],
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
      [
        "Process scheduling appears frequently across the papers.",
        "high priority",
      ],
      [
        "Memory management is repeated across multiple years.",
        "revise again",
      ],
      [
        "Deadlock questions appear regularly.",
        "important topic",
      ],
      [
        "Scheduling problems are useful for focused practice.",
        "practice more",
      ],
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
      [
        "Transport-layer questions appear frequently.",
        "high priority",
      ],
      [
        "Routing and IP concepts repeat across multiple years.",
        "revise again",
      ],
      [
        "Subnetting is an important area for practice.",
        "practice more",
      ],
      [
        "Data-link concepts appear consistently.",
        "important topic",
      ],
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
          ? "Please upload at least one PYQ paper first."
          : "Please paste some PYQ questions first.",
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
        kicker="Learn from past papers"
        title="Analyze your PYQs"
        text="Upload your previous year questions and we'll help you spot important topics, repeated patterns, and what to revise."
        tone="purple"
      />

      <section className="pyq-input purple-panel">
        <div className="panel-title">
          <div>
            <span className="eyebrow">Step 1 · Add your questions</span>
            <h2>How do you want to add your PYQs?</h2>
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
              Paste questions
            </button>
          </div>
        </div>

        <div className="pyq-start-guide">
          <div className="pyq-start-guide-icon">
            <Lightbulb size={18} />
          </div>

          <div>
            <strong>Before you start</strong>

            <p>
              Add 2–6 years of PYQs if possible. More papers help you spot
              repeated topics and question patterns more clearly.
            </p>
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

              <small>
                Upload papers from different years to compare repeated topics
                and question patterns.
              </small>

              <span className="upload-help">
                You can select multiple papers at once
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
                  {files.length === 1 ? "paper" : "papers"} ready for analysis
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
              <span>Which subject?</span>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="DSA">
                  Data Structures & Algorithms
                </option>

                <option value="DBMS">
                  Database Management Systems
                </option>

                <option value="OS">
                  Operating Systems
                </option>

                <option value="CN">
                  Computer Networks
                </option>
              </select>
            </label>

            <label>
              <span>Which years?</span>

              <select
                value={yearRange}
                onChange={(e) => setYearRange(e.target.value)}
              >
                <option value="2019-2024">2019 – 2024</option>
                <option value="2020-2024">2020 – 2024</option>
                <option value="2022-2024">2022 – 2024</option>
              </select>
            </label>

            <Button
              onClick={() => void analyze()}
              disabled={status === "loading"}
            >
              <Sparkles />

              {status === "loading"
                ? "Analyzing your PYQs..."
                : "Analyze my PYQs"}
            </Button>

            <small className="pyq-analyze-hint">
              Takes a few seconds • You can update your inputs anytime
            </small>
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
                Your analysis will appear here
              </span>

              <h3>See what your PYQs are telling you</h3>

              <p>
                Add your previous year papers above and we'll turn them into
                simple revision signals.
              </p>

              <div className="pyq-empty-points">
                <span>🔥 Repeated topics</span>
                <span>📊 Question patterns</span>
                <span>📈 Year-wise trends</span>
                <span>🎯 Revision priorities</span>
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
              <span className="eyebrow">Analyzing your PYQs</span>

              <h3>{analysisStep}</h3>

              <p>
                We’re going through your questions to find patterns that can
                help you plan your revision.
              </p>

              <div className="pyq-loading-steps">
                <span className="active">✓ Check questions</span>
                <span>• Find repeated topics</span>
                <span>• Spot important patterns</span>
                <span>• Prepare study insights</span>
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="pyq-error-guide">
            <div className="pyq-error-icon">⚠</div>

            <div className="pyq-error-content">
              <span className="eyebrow">Something went wrong</span>

              <h3>We couldn't finish the analysis</h3>

              <p>
                Check that your PYQ files or pasted questions are valid, then
                try the analysis again.
              </p>

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
  const currentReport = reportData[subject as keyof typeof reportData] ?? reportData.DSA;

  const currentYearTrends =
    yearTrends[subject as keyof typeof yearTrends] ?? yearTrends.DSA;

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
    : currentReport.topics.filter((topic) => topic[0] === topicFilter);

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
    .sort((a, b) => b.value - a.value)[0]?.name ?? "Mixed questions";

  return (
    <div className="pyq-v2-report">
      {/* HEADER */}
      <header className="pyq-v2-header">
        <div>
          <div className="pyq-v2-eyebrow">
            <Sparkles size={15} />
            PYQ ANALYSIS
          </div>

          <h2>{subjectName} exam patterns</h2>

<p className="pyq-v2-year-range">
  Based on PYQs from {yearRange.replace("-", " – ")}. See what keeps
  repeating and where to focus next.
</p>
        </div>

        <div className="pyq-v2-ready">
          <span className="pyq-v2-ready-dot" />
          Analysis ready
        </div>
      </header>

      {/* QUICK READ */}
      <section className="pyq-v2-section pyq-v2-quick-read">
        <div className="pyq-v2-section-heading">
          <div>
            <span className="pyq-v2-label">QUICK READ</span>

            <h3>Your PYQ story</h3>

            <p>
              Start here if you only have a minute. These are the patterns
              worth noticing first.
            </p>
          </div>
        </div>

        <div className="pyq-v2-insight-grid">
          {/* FOCUS */}
          <article className="pyq-v2-insight-card pyq-v2-insight-primary">
            <div className="pyq-v2-card-top">
              <span className="pyq-v2-icon">🎯</span>
              <span className="pyq-v2-mini-label">START HERE</span>
            </div>

            <h4>{focusTopic?.[0]}</h4>

            <div className="pyq-v2-big-stat">
              {focusTopic?.[2]}
              <span>frequency</span>
            </div>

            <p>
              Appeared in <strong>{focusTopic?.[3]}</strong>. This is the first
              topic worth revising.
            </p>
          </article>

          {/* TREND */}
          <article className="pyq-v2-insight-card">
            <div className="pyq-v2-card-top">
              <span className="pyq-v2-icon">📈</span>
              <span className="pyq-v2-mini-label">WATCH THIS</span>
            </div>

            <h4>{risingTopic?.[0]}</h4>

            <div className="pyq-v2-trend-badge">
              {risingTopic?.[4] || "Active"}
            </div>

            <p>
              This topic has a noticeable pattern across the papers. Keep it
              on your practice list.
            </p>
          </article>

          {/* PRACTICE */}
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
              Also keep <strong>{topDifficulty}</strong>-level questions in
              your practice mix.
            </p>
          </article>
        </div>

        {/* NEXT MOVE */}
        <div className="pyq-v2-next-move">
          <div className="pyq-v2-next-icon">
            <ArrowRight size={18} />
          </div>

          <div>
            <span>BEST NEXT MOVE</span>

            <p>
              Revise <strong>{focusTopic?.[0]}</strong> → solve a few PYQs →
              then move to <strong>{secondTopic?.[0]}</strong>.
            </p>
          </div>
        </div>

        <div className="pyq-v2-stop-note">
          <Lightbulb size={16} />
          <span>
            Short on time? You can stop here and start with{" "}
            <strong>{focusTopic?.[0]}</strong>. The sections below are optional
            details.
          </span>
        </div>
      </section>

      {/* TOPIC MAP */}
      <section className="pyq-v2-section">
        <div className="pyq-v2-section-heading pyq-v2-heading-with-control">
          <div>
            <span className="pyq-v2-label">THE PATTERN</span>

            <h3>What keeps coming back?</h3>

            <p>
              Compare topics at a glance instead of reading through a long
              table.
            </p>
          </div>

          <select
            value={topicFilter}
            onChange={(event) => setTopicFilter(event.target.value)}
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
            const [name, description, frequency, papers, trend] = topic;

            const numericFrequency =
              Number.parseInt(String(frequency).replace("%", ""), 10) || 0;

            return (
              <article className="pyq-v2-topic-row" key={name}>
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
                      style={{ width: `${Math.min(numericFrequency, 100)}%` }}
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

        {/* SMALL INSIGHT */}
        <div className="pyq-v2-pattern-note">
          <div className="pyq-v2-pattern-note-icon">
            <Sparkles size={17} />
          </div>

          <div>
            <strong>One pattern worth noticing</strong>

            <p>
              {currentReport.insights?.[0]?.[0] ??
                `${focusTopic?.[0]} appears regularly, so it deserves early attention.`}
            </p>
          </div>
        </div>
      </section>

      {/* EXPLORE DETAILS */}
      <section className="pyq-v2-section pyq-v2-explore">
        <div className="pyq-v2-section-heading">
          <div>
            <span className="pyq-v2-label">OPTIONAL DETAILS</span>

            <h3>Explore the pattern</h3>

            <p>
              Open only the analysis you want to understand. You don't need
              to read everything.
            </p>
          </div>
        </div>

        {/* FREQUENCY + TREND */}
        <details className="pyq-v2-detail-card" open>
          <summary>
            <div className="pyq-v2-summary-icon">📊</div>

            <div className="pyq-v2-summary-copy">
              <strong>Frequency & yearly trend</strong>
              <span>
                See which topics repeat and how the pattern changes over time.
              </span>
            </div>

            <span className="pyq-v2-summary-arrow">⌄</span>
          </summary>

          <div className="pyq-v2-detail-content">
            <ChartCard
              title="Topic frequency"
              description="How often each topic appears in the analysed papers."
              takeaway={`Start with ${focusTopic?.[0]}, which has the highest frequency in this report.`}
            >
              <div className="pyq-v2-frequency-list">
                {currentReport.topics.map((topic) => (
                  <div className="pyq-v2-frequency-item" key={topic[0]}>
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
                              String(topic[2]).replace("%", ""),
                              10
                            ) || 0,
                            100
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
              description="How the topic mix changes across the selected years."
              takeaway="Use the trend to notice topics that are becoming more or less common."
            >
              <ChartContainer
                config={{
                  topic1: {
                    label: currentReport.topics[0]?.[0] ?? "Topic 1",
                    color: "hsl(var(--chart-1))",
                  },
                  topic2: {
                    label: currentReport.topics[1]?.[0] ?? "Topic 2",
                    color: "hsl(var(--chart-2))",
                  },
                  topic3: {
                    label: currentReport.topics[2]?.[0] ?? "Topic 3",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="w-full" style={{ height: "250px" }}
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

                  <ChartTooltip content={<ChartTooltipContent />} />

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

        {/* QUESTION TYPES + DIFFICULTY */}
        <details className="pyq-v2-detail-card">
          <summary>
            <div className="pyq-v2-summary-icon">🧠</div>

            <div className="pyq-v2-summary-copy">
              <strong>Question types & difficulty</strong>
              <span>
                Understand what kind of questions you should practise.
              </span>
            </div>

            <span className="pyq-v2-summary-arrow">⌄</span>
          </summary>

          <div className="pyq-v2-detail-content">
            <ChartCard
              title="Question types"
              description="The kinds of questions appearing most often."
              takeaway={`Spend extra practice time on ${topQuestionType.toLowerCase()} questions.`}
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

                  <ChartTooltip content={<ChartTooltipContent />} />

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
              description="A quick view of how challenging the papers tend to be."
              takeaway={`Keep a balanced practice set, with extra attention to ${topDifficulty.toLowerCase()} questions.`}
            >
              <div className="pyq-v2-difficulty-list">
                {currentDifficulty.map((item) => {
                  const value = Number(item.value) || 0;

                  return (
                    <div className="pyq-v2-difficulty-item" key={item.name}>
                      <div className="pyq-v2-frequency-head">
                        <span>{item.name}</span>
                        <strong>{value}%</strong>
                      </div>

                      <div className="pyq-v2-progress-track">
                        <div
                          className="pyq-v2-progress-fill"
                          style={{ width: `${Math.min(value, 100)}%` }}
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

      {/* NEXT STEP */}
      <section className="pyq-v2-action-card">
        <div className="pyq-v2-action-content">
          <span className="pyq-v2-label">NEXT STEP</span>

          <h3>Turn this analysis into a study plan</h3>

          <p>
            You now know what repeats. The next step is simply to revise,
            practise, and test yourself in that order.
          </p>

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

        <Button asChild size="lg" className="pyq-v2-action-button">
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
  description,
  takeaway,
  children,
}: {
  title: string;
  description: string;
  takeaway?: string;
  children: ReactNode;
}) {
  return (
    <article className="chart-card">
      <div className="chart-card-header">
        <span>{description}</span>
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
