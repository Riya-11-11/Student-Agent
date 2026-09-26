import {
  ArrowRight,
  Bookmark,
  CalendarDays,
  Check,
  Clock3,
  GraduationCap,
  Palette,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useApp } from "./app-context";
import { EmptyState } from "./states";
import { PageIntro } from "./study-plan";

export function SavedPlans() {
  const { savedPlans, deletePlan } = useApp();

  return (
    <div className="page-enter saved-page">
      <PageIntro
        icon={Bookmark}
        kicker="Your study journey"
        title="My Study Plans"
        text="Keep your plans in one place and pick up your preparation whenever you're ready."
        tone="blue"
      />

      {savedPlans.length === 0 ? (
        <div className="saved-empty-wrapper">
          <section className="saved-empty-hero">
            <div className="saved-empty-visual">
              <div className="saved-empty-icon">
                <Bookmark />
              </div>

              <div className="saved-empty-sparkle sparkle-one">
                <Sparkles />
              </div>

              <div className="saved-empty-sparkle sparkle-two">
                <Sparkles />
              </div>
            </div>

            <div className="saved-empty-copy">
              <span className="eyebrow">Your study space</span>

              <h2>Your next study plan starts here.</h2>

              <p>
                Create a plan around your goals, save it, and come back whenever
                you want to continue studying.
              </p>

              <div className="saved-empty-points">
                <span>
                  <Check />
                  Keep everything organised
                </span>

                <span>
                  <Check />
                  Track your progress
                </span>

                <span>
                  <Check />
                  Continue anytime
                </span>
              </div>
            </div>
          </section>

          <div className="standalone-state">
            <EmptyState
              title="No saved plans yet"
              description="Once you create and save a study plan, you'll find it here."
            />
          </div>
        </div>
      ) : (
        <>
          <section className="saved-plans-tip">
            <div className="saved-plans-tip-icon">
              <Sparkles />
            </div>

            <div className="saved-plans-tip-copy">
              <strong>Small progress still counts.</strong>
              <p>
                Open a plan, complete a little, and keep building your study
                streak one session at a time.
              </p>
            </div>
          </section>

          <div className="saved-plans-heading">
            <div>
              <span className="saved-section-label">Your plans</span>
              <h2>
                {savedPlans.length}{" "}
                {savedPlans.length === 1 ? "study plan" : "study plans"}
              </h2>
            </div>

            <span className="saved-plan-count">
              {savedPlans.length === 1 ? "1 plan saved" : "Plans saved"}
            </span>
          </div>

         <div className="saved-grid">
  {savedPlans.map((plan) => {
    const isCompleted = plan.progress >= 100;
    const isStarted = plan.progress > 0;

    return (
      <article
        className={`saved-card ${
          isCompleted ? "saved-card-completed" : ""
        }`}
        key={plan.id}
      >
 <div className="saved-card-top">
  <div className="saved-plan-mark">
    <CalendarDays />
  </div>
</div>

        <div className="saved-card-heading">
          <div className="saved-card-title">
            <h2>{plan.name}</h2>

            <p>
              {isCompleted
                ? "You've completed this study plan."
                : isStarted
                  ? "Keep building your progress."
                  : "Your plan is ready when you are."}
            </p>
          </div>

          {isCompleted && (
            <span className="completed-badge">
              <Check />
              Done
            </span>
          )}
        </div>

        <div className="saved-subjects">
          {plan.subjects.map((subject) => (
            <span key={subject}>{subject}</span>
          ))}
        </div>

       <div className="saved-plan-meta">
  <span>
    <Clock3 />
    {plan.duration}
  </span>

  <span>
    {plan.weeks.length}{" "}
    {plan.weeks.length === 1 ? "week" : "weeks"}
  </span>

  <span className="saved-plan-date">
    <CalendarDays />
    {plan.createdAt}
  </span>
</div>

        <div className="saved-progress">
          <div className="saved-progress-heading">
            <div>
              <span>Study progress</span>

              <strong>
                {isCompleted
                  ? "Completed"
                  : isStarted
                    ? "In progress"
                    : "Not started"}
              </strong>
            </div>

            <b>{plan.progress}%</b>
          </div>

          <div className="saved-progress-bar">
            <i style={{ width: `${plan.progress}%` }} />
          </div>
        </div>

        <div className="saved-card-action">
          <Button className="saved-open-button">
            {isCompleted ? "Review plan" : "Continue studying"}
            <ArrowRight />
          </Button>

          <Button
            variant="ghost"
            className="saved-delete-button"
            onClick={() => deletePlan(plan.id)}
            aria-label={`Delete ${plan.name}`}
          >
            <Trash2 />
          </Button>
        </div>
      </article>
    );
  })}
</div>
        </>
      )}
    </div>
  );
}

export function SettingsPage() {
  const { theme, setTheme } = useApp();

  return (
    <div className="settings-page page-enter">
      <PageIntro
        icon={Settings}
        kicker="Make it yours"
        title="Settings"
        text="Set up your study space so it feels comfortable and works for the way you study."
        tone="purple"
      />

      <div className="settings-list">
        {/* Appearance */}
        <section className="settings-section">
          <div className="settings-section-header">
            <div className="settings-icon settings-icon-purple">
              <Palette />
            </div>

            <div className="settings-copy">
              <span className="settings-label">Appearance</span>

              <h2>Choose your study vibe</h2>

              <p>
                Pick the look that feels easiest to study with.
              </p>
            </div>
          </div>

          <div className="settings-options">
            <button
              type="button"
              className={theme === "light" ? "active" : ""}
              onClick={() => setTheme("light")}
              aria-pressed={theme === "light"}
            >
              <span className="theme-preview light-preview">
                <span />
                <i />
                <b />
              </span>

              <div>
                <b>Light mode</b>
                <small>Bright, clean and easy to scan</small>
              </div>

              {theme === "light" && (
                <span className="settings-selected">
                  <Check />
                </span>
              )}
            </button>

            <button
              type="button"
              className={theme === "dark" ? "active" : ""}
              onClick={() => setTheme("dark")}
              aria-pressed={theme === "dark"}
            >
              <span className="theme-preview dark-preview">
                <span />
                <i />
                <b />
              </span>

              <div>
                <b>Dark mode</b>
                <small>Comfortable for late-night sessions</small>
              </div>

              {theme === "dark" && (
                <span className="settings-selected">
                  <Check />
                </span>
              )}
            </button>
          </div>
        </section>

        {/* Study Profile */}
        <section className="settings-section">
          <div className="settings-section-header">
            <div className="settings-icon settings-icon-blue">
              <User />
            </div>

            <div className="settings-copy">
              <span className="settings-label">Your profile</span>

              <h2>Make your study space feel personal</h2>

              <p>
                A few details help keep your experience relevant to your
                preparation.
              </p>
            </div>
          </div>

          <div className="profile-fields">
            <label>
              <span>Your name</span>

              <input
                type="text"
                defaultValue="Riya Singh"
                placeholder="Enter your name"
              />

              <small>This is how your study space knows you.</small>
            </label>

            <label>
              <span>What are you preparing for?</span>

              <select defaultValue="University">
                <option value="School">School</option>
                <option value="University">University</option>
                <option value="Competitive exam">
                  Competitive exam
                </option>
              </select>

              <small>We'll use this to understand your study context.</small>
            </label>
          </div>
        </section>

        {/* Study Preferences */}
        <section className="settings-section">
          <div className="settings-section-header">
            <div className="settings-icon settings-icon-green">
              <SlidersHorizontal />
            </div>

            <div className="settings-copy">
              <span className="settings-label">Study preferences</span>

              <h2>Choose what keeps you on track</h2>

              <p>
                You can keep these helpful study nudges on or turn them off
                anytime.
              </p>
            </div>
          </div>

          <div className="preference-list">
            <label className="preference-item">
              <input type="checkbox" defaultChecked />

              <span className="preference-check">
                <Check />
              </span>

              <span className="preference-copy">
                <b>Daily study reminders</b>
                <small>
                  A gentle nudge when it is time to get back to your plan.
                </small>
              </span>

              <span className="preference-tag">Helpful</span>
            </label>

            <label className="preference-item">
              <input type="checkbox" defaultChecked />

              <span className="preference-check">
                <Check />
              </span>

              <span className="preference-copy">
                <b>Weekly progress recap</b>
                <small>
                  A quick look at what you completed during the week.
                </small>
              </span>

              <span className="preference-tag">Weekly</span>
            </label>

            <label className="preference-item">
              <input type="checkbox" />

              <span className="preference-check">
                <Check />
              </span>

              <span className="preference-copy">
                <b>Exam countdown</b>
                <small>
                  Keep the days remaining visible while you prepare.
                </small>
              </span>

              <span className="preference-tag">Optional</span>
            </label>
          </div>
        </section>

        {/* Save */}
        <div className="settings-save">
          <div className="settings-save-message">
            <span className="settings-save-icon">
              <GraduationCap />
            </span>

            <div>
              <strong>Ready for your next study session?</strong>

              <span>
                Your study space is set up the way you like it.
              </span>
            </div>
          </div>

          <Button type="button" className="settings-save-button">
            <Check />
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
}