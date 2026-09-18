import { createFileRoute } from "@tanstack/react-router";
import { PyqWorkspace } from "@/components/app/pyq";

export const Route = createFileRoute("/pyq-analysis")({
  head: () => ({
    meta: [
      { title: "PYQ Analysis — AI Student Agent" },
      { name: "description", content: "Analyze previous year questions to find repeated topics, trends, difficulty and syllabus coverage." },
      { property: "og:title", content: "PYQ Analysis — AI Student Agent" },
      { property: "og:description", content: "Analyze previous year questions to find repeated topics, trends, difficulty and syllabus coverage." },
    ],
  }),
  component: PyqWorkspace,
});
