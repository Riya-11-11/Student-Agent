import { useState } from "react";
import {
  Check,
  Clipboard,
  FileImage,
  FileText,
  Link as LinkIcon,
  RotateCcw,
  Sparkles,
  Text,
  Trash2,
  UploadCloud,
  Lightbulb,
  BookOpen,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { EmptyState, ErrorState, LoadingState } from "./states";
import { wait } from "@/lib/mock-data";
import { PageIntro } from "./study-plan";

type Status = "empty" | "loading" | "ready" | "error";

export function NotesWorkspace() {
  const [status, setStatus] = useState<Status>("empty");
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const summarize = async () => {
    if (!text.trim() && status === "empty") {
      return;
    }

    setStatus("loading");

    await wait();

    setStatus("ready");
  };

  const clear = () => {
    setText("");
    setStatus("empty");
    setCopied(false);
  };

  const copy = async () => {
    const summary = `Key Points

1. Normalization organizes data into related tables to reduce repetition and improve consistency.

2. Primary and foreign keys connect tables while maintaining relationships between records.

3. Third Normal Form removes transitive dependencies, so non-key fields depend only on the key.

4. Normalization keeps data clean, while selective denormalization can sometimes improve reading speed.

Remember This

1NF → Atomic values
2NF → No partial dependency
3NF → No transitive dependency`;

    await navigator.clipboard.writeText(summary);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="page-enter">
      <PageIntro
        icon={Text}
        kicker="Study smarter"
        title="Notes Summarizer"
        text="Turn long notes into simple points that are easier to understand and revise."
        tone="green"
      />

      {/* Simple student guide */}
      <div className="notes-guide">
        <div className="guide-icon">
          <Lightbulb />
        </div>

        <div className="guide-content">
          <strong>How it works</strong>

          <div className="guide-steps">
            <span>
              <b>1</b> Add your notes
            </span>

            <ArrowRight />

            <span>
              <b>2</b> Summarize
            </span>

            <ArrowRight />

            <span>
              <b>3</b> Revise easily
            </span>
          </div>
        </div>
      </div>

      <div className="notes-workspace">
        {/* INPUT PANEL */}
        <section className="form-panel green-panel">
          <div className="panel-title">
            <div>
              <span className="eyebrow">Step 1</span>

              <h2>Add your notes</h2>

              <p className="panel-helper">
                Choose how you want to add your study material.
              </p>
            </div>

            <div className="notes-sparkle">
              <Sparkles />
            </div>
          </div>

          <Tabs defaultValue="text">
            <TabsList className="mode-tabs">
              <TabsTrigger value="text">
                <Text />
                Text
              </TabsTrigger>

              <TabsTrigger value="pdf">
                <FileText />
                PDF
              </TabsTrigger>

              <TabsTrigger value="image">
                <FileImage />
                Image
              </TabsTrigger>

              <TabsTrigger value="link">
                <LinkIcon />
                Link
              </TabsTrigger>
            </TabsList>

            {/* TEXT */}
            <TabsContent value="text">
              <div className="notes-input-wrapper">
                <textarea
                  className="notes-textarea"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your notes here..."
                />

                {!text && (
                  <span className="textarea-hint">
                    Tip: You can paste a chapter, class notes or revision
                    material.
                  </span>
                )}

                <div className="notes-input-meta">
                  <span>
                    {text.trim()
                      ? text.trim().split(/\s+/).length
                      : 0}{" "}
                    words
                  </span>

                  <span>
                    For best results, use one topic at a time.
                  </span>
                </div>
              </div>
            </TabsContent>

            {/* PDF */}
            <TabsContent value="pdf">
              <UploadArea
                accept=".pdf"
                label="Upload your PDF"
                detail="PDF files up to 20MB"
              />
            </TabsContent>

            {/* IMAGE */}
            <TabsContent value="image">
              <UploadArea
                accept="image/*"
                label="Upload a photo of your notes"
                detail="JPG, PNG or WEBP"
              />
            </TabsContent>

            {/* LINK */}
            <TabsContent value="link">
              <label className="field">
                <span>Paste your notes link</span>

                <div className="link-input">
                  <LinkIcon />

                  <input
                    type="url"
                    placeholder="Paste your notes link here..."
                  />
                </div>
              </label>
            </TabsContent>
          </Tabs>

          <Button
            className="primary-wide notes-summarize-button"
            onClick={() => void summarize()}
            disabled={status === "loading"}
          >
            <Sparkles />

            {status === "loading"
              ? "Summarizing your notes..."
              : "Summarize My Notes"}

            {status !== "loading" && <ArrowRight />}
          </Button>

          <p className="privacy-hint">
            ✨ Your notes will be turned into clear, revision-friendly
            points.
          </p>
        </section>

        {/* OUTPUT PANEL */}
        <section className="summary-panel" aria-live="polite">
          {/* EMPTY STATE */}
          {status === "empty" && (
            <div className="notes-empty-state">
              <div className="empty-icon">
                <BookOpen />
              </div>

              <span className="eyebrow">Step 2 · Your summary</span>

              <h3>Your summary will appear here</h3>

              <p>
                Add your notes on the left and we'll turn them into
                easy-to-revise points.
              </p>

              <div className="empty-mini-tip">
                <Sparkles />

                <span>
                  <strong>Student tip:</strong> Start with one topic or
                  chapter for a more focused summary.
                </span>
              </div>

              <div className="empty-next-step">
                <ArrowRight />

                <div>
                  <strong>Start with a small topic</strong>

                  <span>
                    Paste 1 chapter or concept, then click
                    “Summarize My Notes”.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* LOADING STATE */}
          {status === "loading" && (
            <LoadingState message="Turning your notes into simple revision points..." />
          )}

          {/* ERROR STATE */}
          {status === "error" && <ErrorState retry={summarize} />}

          {/* READY STATE */}
          {status === "ready" && (
            <div className="summary-output">
              <div className="panel-title">
                <div>
                  <span className="eyebrow">
                    Step 3 · Ready to revise
                  </span>

                  <h2>Your Easy Revision Notes</h2>
                </div>

                <span className="status-pill">
                  <Check />
                  Ready
                </span>
              </div>

              <div className="summary-intro">
                <Sparkles />

                <p>
                  Here are the important ideas from your notes,
                  simplified for quick revision.
                </p>
              </div>

              {/* KEY POINTS */}
              <section>
                <h3>Key Points</h3>

                <ol>
                  <li>
                    <span>1</span>

                    <p>
                      <b>Normalization organizes data</b> into related
                      tables to reduce repetition and improve
                      consistency.
                    </p>
                  </li>

                  <li>
                    <span>2</span>

                    <p>
                      <b>Primary and foreign keys</b> connect tables
                      while maintaining relationships between
                      records.
                    </p>
                  </li>

                  <li>
                    <span>3</span>

                    <p>
                      <b>Third Normal Form</b> removes transitive
                      dependencies, so non-key fields depend only on
                      the key.
                    </p>
                  </li>

                  <li>
                    <span>4</span>

                    <p>
                      <b>Practical idea:</b> normalization keeps data
                      clean, while selective denormalization can
                      sometimes improve reading speed.
                    </p>
                  </li>
                </ol>
              </section>

              {/* REMEMBER THIS */}
              <section className="quick-revision">
                <span>⚡</span>

                <div>
                  <h3>Remember This</h3>

                  <p>
                    <b>1NF</b> → Atomic values ·{" "}
                    <b>2NF</b> → No partial dependency ·{" "}
                    <b>3NF</b> → No transitive dependency
                  </p>
                </div>
              </section>

              {/* NEXT STEP */}
              <section className="study-next-section">
                <div className="study-next-icon">
                  <ArrowRight />
                </div>

                <div>
                  <span className="eyebrow">Your next step</span>

                  <h3>What to do next</h3>

                  <ul>
                    <li>
                      Read the Key Points once.
                    </li>

                    <li>
                      Try recalling the Remember This box without
                      looking.
                    </li>

                    <li>
                      Practise a few questions from this topic.
                    </li>
                  </ul>
                </div>
              </section>

              {/* REVISION TIP */}
              <div className="revision-tip">
                <Lightbulb />

                <div>
                  <strong>Quick revision tip</strong>

                  <p>
                    Read the “Remember This” box once before your
                    next revision session.
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="result-actions">
                <Button
                  variant="outline"
                  onClick={() => void copy()}
                >
                  {copied ? <Check /> : <Clipboard />}

                  {copied ? "Copied" : "Copy summary"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => void summarize()}
                >
                  <RotateCcw />
                  Regenerate
                </Button>

                <Button
                  variant="ghost"
                  onClick={clear}
                >
                  <Trash2 />
                  Start Over
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function UploadArea({
  accept,
  label,
  detail,
}: {
  accept: string;
  label: string;
  detail: string;
}) {
  return (
    <label className="upload-area">
      <div className="upload-icon">
        <UploadCloud />
      </div>

      <b>{label}</b>

      <span>
        Drag and drop, or click to choose a file
      </span>

      <small>{detail}</small>

      <input
        className="sr-only"
        type="file"
        accept={accept}
      />
    </label>
  );
}