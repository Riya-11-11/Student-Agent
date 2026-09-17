export type StudyWeek = { week: number; title: string; topics: string[]; tasks: string[]; time: string; revision: string; progress: number };
export type SavedPlan = { id: string; name: string; subjects: string[]; duration: string; createdAt: string; progress: number; weeks: StudyWeek[] };

export const sampleWeeks: StudyWeek[] = [
  { week: 1, title: "DSA foundations + practice", topics: ["Arrays", "Linked lists", "Complexity"], tasks: ["Review core notes", "Solve 15 practice questions"], time: "9 hours", revision: "Friday recall quiz", progress: 72 },
  { week: 2, title: "DBMS concepts + PYQs", topics: ["Normalization", "SQL", "Transactions"], tasks: ["Build a concept map", "Attempt 2 past papers"], time: "10 hours", revision: "Sunday error review", progress: 48 },
  { week: 3, title: "OS core topics + revision", topics: ["Processes", "Scheduling", "Deadlocks"], tasks: ["Create formula sheet", "Practice scheduling problems"], time: "9 hours", revision: "Mixed-topic flashcards", progress: 24 },
  { week: 4, title: "Full revision + mock tests", topics: ["Weak areas", "High-frequency topics"], tasks: ["Complete 3 timed mocks", "Review every mistake"], time: "12 hours", revision: "Final rapid recall", progress: 8 },
];

export const topicFrequency = [
  { topic: "Arrays", value: 22 }, { topic: "Trees", value: 18 }, { topic: "Sorting", value: 14 }, { topic: "Graphs", value: 12 }, { topic: "Others", value: 34 },
];
export const yearTrends = [
  { year: "2019", Arrays: 8, Trees: 6, Graphs: 3 }, { year: "2020", Arrays: 9, Trees: 7, Graphs: 4 }, { year: "2021", Arrays: 8, Trees: 8, Graphs: 5 }, { year: "2022", Arrays: 11, Trees: 8, Graphs: 5 }, { year: "2023", Arrays: 13, Trees: 10, Graphs: 7 }, { year: "2024", Arrays: 15, Trees: 12, Graphs: 9 },
];
export const questionTypes = [
  { name: "MCQ", value: 45 }, { name: "Short answer", value: 30 }, { name: "Long answer", value: 15 }, { name: "Numerical", value: 10 },
];
export const difficulty = [
  { name: "Easy", value: 40 }, { name: "Medium", value: 35 }, { name: "Hard", value: 25 },
];
export const thinkingLevels = [
  { name: "Remember", value: 18 }, { name: "Understand", value: 26 }, { name: "Apply", value: 30 }, { name: "Analyze", value: 16 }, { name: "Evaluate", value: 7 }, { name: "Create", value: 3 },
];
export const marksData = [
  { topic: "DBMS", questions: 24, marks: 44, average: 1.8 }, { topic: "DSA", questions: 23, marks: 36, average: 1.6 }, { topic: "OS", questions: 19, marks: 32, average: 1.7 }, { topic: "CN", questions: 15, marks: 24, average: 1.6 },
];
export const recentPyqs = [
  ["2024", "DBMS", "Normalization"], ["2023", "OS", "Process Scheduling"], ["2023", "DSA", "Binary Search"], ["2022", "CN", "Network Topology"],
];
export const recentNotes = ["DBMS — Important Concepts", "OS — Key Formulas", "CN — Important Topics"];

export const wait = (ms = 1100) => new Promise((resolve) => setTimeout(resolve, ms));
