import { images } from "./images";

export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
  content: string[];
};

export const news: NewsArticle[] = [
  {
    slug: "stem-olympiad-gold",
    title: "BrightFuture Wins National STEM Olympiad Gold",
    excerpt:
      "Our senior physics team took home gold at this year's national STEM Olympiad in Abuja.",
    category: "Achievements",
    date: "2025-09-14",
    author: "Communications Office",
    image: images.science,
    content: [
      "BrightFuture Academy is proud to announce that our senior physics team has won the gold medal at the 2025 National STEM Olympiad, held in Abuja.",
      "The team of four — led by Mr. James Adewale — outperformed 84 schools across 23 events spanning mathematics, physics, chemistry and engineering challenges.",
      "Principal Dr. Amara Okeke praised the students' dedication: 'This result reflects the daily curiosity and effort our students bring to the laboratory. We could not be prouder.'",
    ],
  },
  {
    slug: "new-science-block",
    title: "New Science Block Opens This Term",
    excerpt:
      "A purpose-built science block featuring three modern laboratories is now welcoming students.",
    category: "Campus",
    date: "2025-09-02",
    author: "Communications Office",
    image: images.library,
    content: [
      "The long-awaited Adewale Science Block opened its doors at the start of this academic year, adding three state-of-the-art laboratories to our campus.",
      "The facility includes specialised physics, chemistry and biology labs, a 60-seat lecture theatre, and a research-grade incubator.",
      "Funded through alumni contributions and our 25th anniversary appeal, it represents a major investment in the next generation of scientists.",
    ],
  },
  {
    slug: "debate-champions",
    title: "Debate Team Crowned Regional Champions",
    excerpt:
      "Our debate team made it three in a row, winning the West African Schools Debate Championship.",
    category: "Achievements",
    date: "2025-08-21",
    author: "Mrs. Fatima Bello",
    image: images.classroom,
    content: [
      "The BrightFuture Academy debate team has been crowned regional champions for the third year running.",
      "Captain Aisha Adeyemi was named best individual speaker of the tournament.",
    ],
  },
  {
    slug: "alumni-day-2025",
    title: "Alumni Day 2025: A Homecoming to Remember",
    excerpt:
      "Over 400 alumni returned to campus for talks, sports, and a gala dinner.",
    category: "Community",
    date: "2025-08-10",
    author: "Alumni Relations",
    image: images.graduation,
    content: [
      "Alumni Day 2025 saw over 400 graduates return to campus for a day of reconnection and celebration.",
      "Highlights included career-panel sessions, an inter-class football tournament, and a gala dinner attended by founders and former staff.",
    ],
  },
  {
    slug: "ai-fundamentals-launch",
    title: "AI Fundamentals Course Joins Senior Curriculum",
    excerpt:
      "Senior students can now take a year-long AI Fundamentals course as part of the ICT track.",
    category: "Academics",
    date: "2025-07-28",
    author: "Mr. David Chen",
    image: images.ict,
    content: [
      "From this term, our SS2 and SS3 students can elect to take AI Fundamentals — a year-long course covering machine learning concepts, ethics and applied projects.",
      "The course was designed in consultation with university partners and industry advisors.",
    ],
  },
  {
    slug: "football-finals",
    title: "Boys' Football Through to State Finals",
    excerpt:
      "After a dramatic semi-final, our boys' football team will contest the state finals next month.",
    category: "Sports",
    date: "2025-07-15",
    author: "Mr. Samuel Uche",
    image: images.sports,
    content: [
      "An injury-time goal from striker Tunde Okoye secured a 2–1 win in the semi-final, sending our boys' team to the state final.",
      "The final will be played on 12 October. All families are warmly invited.",
    ],
  },
  {
    slug: "scholarship-programme",
    title: "Scholarship Programme Doubles in Size",
    excerpt:
      "Our needs-based scholarship programme will support 40 students this year, up from 20.",
    category: "Community",
    date: "2025-06-30",
    author: "Bursary Office",
    image: images.studentSmiling,
    content: [
      "Thanks to record donor support, the BrightFuture Scholarship Programme will fund 40 students this academic year — twice the size of last year's cohort.",
      "Scholarships cover tuition, books and uniforms for the full academic year.",
    ],
  },
  {
    slug: "library-expansion",
    title: "Library Expansion Adds 12,000 Volumes",
    excerpt:
      "Our recently expanded library now houses over 30,000 volumes and quiet study areas.",
    category: "Campus",
    date: "2025-06-12",
    author: "Library Services",
    image: images.library,
    content: [
      "The library expansion was completed over the summer break, adding 12,000 new volumes and 80 quiet study seats.",
      "Students can now reserve study rooms online and access an expanded digital catalogue.",
    ],
  },
  {
    slug: "parent-portal-launch",
    title: "Parent Portal Launches This Month",
    excerpt:
      "Parents can now track attendance, results and fees from a single secure portal.",
    category: "Announcements",
    date: "2025-05-22",
    author: "Administration",
    image: images.parents,
    content: [
      "We are pleased to launch the BrightFuture Parent Portal — a single, secure place to track your child's attendance, results and fees.",
      "Login details have been emailed to all registered parents.",
    ],
  },
  {
    slug: "art-exhibition",
    title: "Senior Art Exhibition Opens to the Public",
    excerpt:
      "Our annual senior art exhibition opens this weekend in the main hall.",
    category: "Arts",
    date: "2025-05-10",
    author: "Arts Department",
    image: images.arts,
    content: [
      "The annual senior art exhibition will open this Saturday and run for two weeks.",
      "Over 60 student works will be on display, including painting, sculpture and digital media.",
    ],
  },
  {
    slug: "swim-team-records",
    title: "Swim Team Breaks Three School Records",
    excerpt:
      "Our swim team rewrote the record books at this year's inter-house gala.",
    category: "Sports",
    date: "2025-04-29",
    author: "Mr. Samuel Uche",
    image: images.sports,
    content: [
      "Three long-standing school records fell at last weekend's inter-house swimming gala.",
      "Particular congratulations to Ada Nwosu, who broke the senior girls' 100m freestyle record by nearly two seconds.",
    ],
  },
  {
    slug: "world-book-day",
    title: "Students Mark World Book Day in Style",
    excerpt:
      "Costumes, readings and a book swap brought the campus alive for World Book Day.",
    category: "Community",
    date: "2025-04-15",
    author: "Library Services",
    image: images.studentsReading,
    content: [
      "Our annual World Book Day celebration filled the campus with costumes, author readings and a hugely successful book swap.",
      "Over 800 books changed hands — a new record for the event.",
    ],
  },
];
