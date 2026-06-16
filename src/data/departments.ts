import { images } from "./images";

export type Department = {
  slug: string;
  name: string;
  short: string;
  description: string;
  highlights: string[];
  image: string;
  icon: string;
};

export const departments: Department[] = [
  {
    slug: "science",
    name: "Science",
    short: "Physics, Chemistry, Biology and integrated STEM.",
    description:
      "Our Science department equips students with rigorous experimental skills, modern lab facilities, and a curriculum aligned with global standards. Students consistently win regional and national science olympiads.",
    highlights: ["3 modern laboratories", "STEM Olympiad team", "University-track curriculum"],
    image: images.science,
    icon: "🧪",
  },
  {
    slug: "arts",
    name: "Arts & Humanities",
    short: "Literature, History, Languages and Creative Arts.",
    description:
      "We cultivate critical thinkers, articulate writers, and culturally aware citizens through literature, history, modern languages, and the creative arts.",
    highlights: ["Annual drama festival", "Debate national champions", "French & Spanish tracks"],
    image: images.arts,
    icon: "🎭",
  },
  {
    slug: "commercial",
    name: "Commercial",
    short: "Accounting, Economics, Business and Entrepreneurship.",
    description:
      "Business education with real-world relevance — accounting, economics, entrepreneurship workshops, and a student-run enterprise programme.",
    highlights: ["Student enterprise programme", "Industry mentorship", "Financial literacy lab"],
    image: images.classroom,
    icon: "📊",
  },
  {
    slug: "ict",
    name: "ICT & Computing",
    short: "Programming, Robotics, AI and Digital Design.",
    description:
      "From scratch programming to AI fundamentals, our ICT department prepares students for a digital-first world with hands-on labs and project-based learning.",
    highlights: ["Robotics club", "Coding bootcamps", "AI fundamentals course"],
    image: images.ict,
    icon: "💻",
  },
  {
    slug: "sports",
    name: "Sports & Athletics",
    short: "Football, Basketball, Athletics and Swimming.",
    description:
      "We believe a healthy body powers a strong mind. Our sports department fields competitive teams across multiple disciplines and develops every student's fitness.",
    highlights: ["Regional football champions", "Olympic-size pool", "Certified coaches"],
    image: images.sports,
    icon: "⚽",
  },
];
