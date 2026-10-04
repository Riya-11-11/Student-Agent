import { useState } from "react";
import {
  Check,
  Copy,
  FileImage,
  FileText,
  Link as LinkIcon,
  RefreshCw,
  Sparkles,
  NotebookTabs,
  Trash2,
  CloudUpload,
  Lightbulb,
  BookOpen,
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
        icon={NotebookTabs}
        kicker="Study Tools"
        title="Notes Summarizer"
        text="Turn your notes into clear, revision-friendly points."
        tone="purple"
      />

      <div className="notes-workspace">
        {/* INPUT PANEL */}
        <section className="form-panel purple-panel">
          <div className="panel-title">
            <div>
              <h2>Add your notes</h2>
            </div>

            <div className="notes-sparkle">
              <Sparkles />
            </div>
          </div>

          <Tabs defaultValue="text">
            <TabsList className="mode-tabs">
              <TabsTrigger value="text">
                <NotebookTabs />
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

                <div className="notes-input-meta">
                  <span>
                    {text.trim()
                      ? text.trim().split(/\s+/).length
                      : 0}{" "}
                    words
                  </span>
                </div>
              </div>
            </TabsContent>

            {/* PDF */}
            <TabsContent value="pdf">
              <UploadArea
                accept=".pdf"
                label="Upload your PDF"
                detail="PDF · Max 20MB"
              />
            </TabsContent>

            {/* IMAGE */}
            <TabsContent value="image">
              <UploadArea
                accept="image/*"
                label="Upload your notes"
                detail="JPG, PNG or WEBP"
              />
            </TabsContent>

            {/* LINK */}
            <TabsContent value="link">
              <label className="field">
                <span>Notes link</span>

                <div className="link-input">
                  <LinkIcon />

                  <input
                    type="url"
                    placeholder="Paste your notes link..."
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
              ? "Summarizing..."
              : "Summarize Notes"}

            {status !== "loading" && <Sparkles />}
          </Button>
        </section>

        {/* OUTPUT PANEL */}
        <section className="summary-panel" aria-live="polite">
          {/* EMPTY STATE */}
          {status === "empty" && (
            <div className="notes-empty-state">
              <div className="empty-icon">
                <BookOpen />
              </div>

              <h3>Your summary will appear here</h3>

              <p>
                Add your notes and summarize them to start revising.
              </p>
            </div>
          )}

          {/* LOADING STATE */}
          {status === "loading" && (
            <LoadingState message="Summarizing your notes..." />
          )}

          {/* ERROR STATE */}
          {status === "error" && (
            <ErrorState retry={summarize} />
          )}

          {/* READY STATE */}
          {status === "ready" && (
            <div className="summary-output">
              <div className="panel-title">
                <div>
                  <h2>Revision Notes</h2>
                </div>

                <span className="status-pill">
                  <Check />
                  Ready
                </span>
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
                <Lightbulb />

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
                  <BookOpen />
                </div>

                <div>
                  <h3>Next Steps</h3>

                  <ul>
                    <li>Review the key points.</li>
                    <li>Recall the Remember This section.</li>
                    <li>Practise questions from this topic.</li>
                  </ul>
                </div>
              </section>

              {/* REVISION TIP */}
              <div className="revision-tip">
                <Lightbulb />

                <div>
                  <strong>Revision Tip</strong>

                  <p>
                    Review the Remember This section during your next
                    revision.
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="result-actions">
                <Button
                  variant="outline"
                  onClick={() => void copy()}
                >
                  {copied ? <Check /> : <Copy />}

                  {copied ? "Copied" : "Copy Summary"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => void summarize()}
                >
                  <RefreshCw />
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
        <CloudUpload />
      </div>

      <b>{label}</b>

      <span>Drag and drop or choose a file</span>

      <small>{detail}</small>

      <input
        className="sr-only"
        type="file"
        accept={accept}
      />
    </label>
  );
}