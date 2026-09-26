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
export const yearTrends = {
  DSA: [
    { year: "2019", Arrays: 8, Trees: 6, Graphs: 3 },
    { year: "2020", Arrays: 9, Trees: 7, Graphs: 4 },
    { year: "2021", Arrays: 8, Trees: 8, Graphs: 5 },
    { year: "2022", Arrays: 11, Trees: 8, Graphs: 5 },
    { year: "2023", Arrays: 13, Trees: 10, Graphs: 7 },
    { year: "2024", Arrays: 15, Trees: 12, Graphs: 9 },
  ],

  DBMS: [
    { year: "2019", SQL: 8, Normalization: 5, Transactions: 3 },
    { year: "2020", SQL: 9, Normalization: 6, Transactions: 4 },
    { year: "2021", SQL: 10, Normalization: 7, Transactions: 4 },
    { year: "2022", SQL: 11, Normalization: 8, Transactions: 6 },
    { year: "2023", SQL: 13, Normalization: 9, Transactions: 7 },
    { year: "2024", SQL: 15, Normalization: 11, Transactions: 8 },
  ],

  OS: [
    { year: "2019", Processes: 8, "Memory Management": 5, Deadlocks: 3 },
    { year: "2020", Processes: 9, "Memory Management": 6, Deadlocks: 4 },
    { year: "2021", Processes: 10, "Memory Management": 7, Deadlocks: 4 },
    { year: "2022", Processes: 11, "Memory Management": 8, Deadlocks: 6 },
    { year: "2023", Processes: 13, "Memory Management": 9, Deadlocks: 7 },
    { year: "2024", Processes: 15, "Memory Management": 11, Deadlocks: 8 },
  ],

  CN: [
    { year: "2019", "Transport Layer": 8, "Network Layer": 6, "Data Link Layer": 3 },
    { year: "2020", "Transport Layer": 9, "Network Layer": 7, "Data Link Layer": 4 },
    { year: "2021", "Transport Layer": 10, "Network Layer": 8, "Data Link Layer": 5 },
    { year: "2022", "Transport Layer": 11, "Network Layer": 9, "Data Link Layer": 6 },
    { year: "2023", "Transport Layer": 13, "Network Layer": 10, "Data Link Layer": 7 },
    { year: "2024", "Transport Layer": 15, "Network Layer": 12, "Data Link Layer": 9 },
  ],
};
export const difficultyBySubject = {
  DSA: [
    { name: "Easy", value: 25 },
    { name: "Medium", value: 50 },
    { name: "Hard", value: 25 },
  ],

  DBMS: [
    { name: "Easy", value: 30 },
    { name: "Medium", value: 48 },
    { name: "Hard", value: 22 },
  ],

  OS: [
    { name: "Easy", value: 28 },
    { name: "Medium", value: 52 },
    { name: "Hard", value: 20 },
  ],

  CN: [
    { name: "Easy", value: 32 },
    { name: "Medium", value: 46 },
    { name: "Hard", value: 22 },
  ],
};

export const questionTypesBySubject = {
  DSA: [
    { name: "Conceptual", value: 35 },
    { name: "Problem Solving", value: 40 },
    { name: "Algorithm", value: 15 },
    { name: "Theory", value: 10 },
  ],

  DBMS: [
    { name: "SQL", value: 35 },
    { name: "Conceptual", value: 30 },
    { name: "Problem Solving", value: 20 },
    { name: "Theory", value: 15 },
  ],

  OS: [
    { name: "Conceptual", value: 35 },
    { name: "Numerical", value: 25 },
    { name: "Problem Solving", value: 25 },
    { name: "Theory", value: 15 },
  ],

  CN: [
    { name: "Conceptual", value: 35 },
    { name: "Numerical", value: 30 },
    { name: "Problem Solving", value: 20 },
    { name: "Theory", value: 15 },
  ],
};

export const thinkingLevelsBySubject = {
  DSA: [
    { name: "Recall", value: 20 },
    { name: "Apply", value: 45 },
    { name: "Analyze", value: 35 },
  ],

  DBMS: [
    { name: "Recall", value: 25 },
    { name: "Apply", value: 45 },
    { name: "Analyze", value: 30 },
  ],

  OS: [
    { name: "Recall", value: 25 },
    { name: "Apply", value: 40 },
    { name: "Analyze", value: 35 },
  ],

  CN: [
    { name: "Recall", value: 30 },
    { name: "Apply", value: 42 },
    { name: "Analyze", value: 28 },
  ],
};

export const marksDataBySubject = {
  DSA: [
    { topic: "Arrays", marks: 18, questions: 12, average: 1.5 },
    { topic: "Trees", marks: 15, questions: 9, average: 1.7 },
    { topic: "Graphs", marks: 11, questions: 6, average: 1.8 },
  ],

  DBMS: [
    { topic: "SQL", marks: 20, questions: 13, average: 1.5 },
    { topic: "Normalization", marks: 14, questions: 8, average: 1.8 },
    { topic: "Transactions", marks: 12, questions: 7, average: 1.7 },
  ],

  OS: [
    { topic: "Processes", marks: 18, questions: 11, average: 1.6 },
    { topic: "Memory Management", marks: 15, questions: 8, average: 1.9 },
    { topic: "Deadlocks", marks: 12, questions: 6, average: 2.0 },
  ],

  CN: [
    { topic: "Transport Layer", marks: 17, questions: 10, average: 1.7 },
    { topic: "Network Layer", marks: 16, questions: 9, average: 1.8 },
    { topic: "Data Link Layer", marks: 12, questions: 7, average: 1.7 },
  ],
};
export const recentPyqs = [
  ["2024", "DBMS", "Normalization"], ["2023", "OS", "Process Scheduling"], ["2023", "DSA", "Binary Search"], ["2022", "CN", "Network Topology"],
];
export const recentNotes = ["DBMS — Important Concepts", "OS — Key Formulas", "CN — Important Topics"];

export const wait = (ms = 1100) => new Promise((resolve) => setTimeout(resolve, ms));
