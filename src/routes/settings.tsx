import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/app/saved-settings";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — AI Student Agent" },
      {
        name: "description",
        content: "Personalize your study space: theme, profile details and study preferences.",
      },
      { property: "og:title", content: "Settings — AI Student Agent" },
      {
        property: "og:description",
        content: "Personalize your study space: theme, profile details and study preferences.",
      },
    ],
  }),
  component: SettingsPage,
});
