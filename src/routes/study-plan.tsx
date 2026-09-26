import { createFileRoute } from "@tanstack/react-router";

import { StudyPlanWorkspace } from "@/components/app/study-plan";

export const Route = createFileRoute("/study-plan")({
  head: () => ({
    meta: [
      { title: "Study Plan Generator — AI Student Agent" },
      {
        name: "description",
        content:
          "Create a personalized weekly study plan around your goals, subjects and available time.",
      },
      {
        property: "og:title",
        content: "Study Plan Generator — AI Student Agent",
      },
      {
        property: "og:description",
        content:
          "Create a personalized weekly study plan around your goals, subjects and available time.",
      },
    ],
    
  }),

 component: StudyPlanWorkspace,
});

