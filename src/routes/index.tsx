import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/app/dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Student Agent — Study Smarter, Not Harder" },
      { name: "description", content: "Your AI-powered study assistant to plan better, understand question patterns and learn faster." },
      { property: "og:title", content: "AI Student Agent — Study Smarter, Not Harder" },
      { property: "og:description", content: "Your AI-powered study assistant to plan better, understand question patterns and learn faster." },
    ],
  }),
  component: Dashboard,
});
