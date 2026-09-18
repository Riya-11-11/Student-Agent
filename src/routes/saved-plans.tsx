import { createFileRoute } from "@tanstack/react-router";
import { SavedPlans } from "@/components/app/saved-settings";

export const Route = createFileRoute("/saved-plans")({
  head: () => ({
    meta: [
      { title: "Saved Study Plans — AI Student Agent" },
      { name: "description", content: "Revisit your saved study plans with subjects, duration and weekly progress." },
      { property: "og:title", content: "Saved Study Plans — AI Student Agent" },
      { property: "og:description", content: "Revisit your saved study plans with subjects, duration and weekly progress." },
    ],
  }),
  component: SavedPlans,
});
