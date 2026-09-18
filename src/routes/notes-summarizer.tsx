import { createFileRoute } from "@tanstack/react-router";
import { NotesWorkspace } from "@/components/app/notes";

export const Route = createFileRoute("/notes-summarizer")({
  head: () => ({
    meta: [
      { title: "Notes Summarizer — AI Student Agent" },
      { name: "description", content: "Turn long notes, PDFs, images or links into clear key points and quick revision material." },
      { property: "og:title", content: "Notes Summarizer — AI Student Agent" },
      { property: "og:description", content: "Turn long notes, PDFs, images or links into clear key points and quick revision material." },
    ],
  }),
  component: NotesWorkspace,
});
