import { portrait } from "./images";

export type StaffMember = {
  slug: string;
  name: string;
  title: string;
  department: string;
  qualifications: string[];
  subjects: string[];
  yearsOfExperience: number;
  bio: string;
  photo: string;
  email: string;
};

export const staff: StaffMember[] = [
  {
    slug: "dr-amara-okeke",
    name: "Dr. Amara Okeke",
    title: "Principal",
    department: "Administration",
    qualifications: ["PhD Education (Cambridge)", "M.Ed Leadership", "B.Sc Mathematics"],
    subjects: ["Educational Leadership"],
    yearsOfExperience: 22,
    bio: "Dr. Okeke has led BrightFuture Academy for the past 8 years, building a culture of academic rigour and pastoral care that places graduates in top universities worldwide.",
    photo: portrait("1573496359142-b8d87734a5a2"),
    email: "principal@brightfutureacademy.edu",
  },
  {
    slug: "mr-james-adewale",
    name: "Mr. James Adewale",
    title: "Head of Sciences",
    department: "Science",
    qualifications: ["M.Sc Physics", "B.Sc Education"],
    subjects: ["Physics", "Further Mathematics"],
    yearsOfExperience: 15,
    bio: "Mr. Adewale leads our award-winning physics programme and coaches the national STEM Olympiad team.",
    photo: portrait("1544717297-fa95b6ee9643"),
    email: "j.adewale@brightfutureacademy.edu",
  },
  {
    slug: "mrs-fatima-bello",
    name: "Mrs. Fatima Bello",
    title: "Head of Languages",
    department: "Arts & Humanities",
    qualifications: ["M.A English Literature", "PGCE"],
    subjects: ["English Language", "Literature"],
    yearsOfExperience: 18,
    bio: "A passionate educator and published author, Mrs. Bello has nurtured countless writers and debaters at BrightFuture.",
    photo: portrait("1580489944761-15a19d654956"),
    email: "f.bello@brightfutureacademy.edu",
  },
  {
    slug: "mr-david-chen",
    name: "Mr. David Chen",
    title: "ICT Coordinator",
    department: "ICT & Computing",
    qualifications: ["M.Sc Computer Science", "AWS Certified"],
    subjects: ["Computer Science", "Robotics"],
    yearsOfExperience: 10,
    bio: "Mr. Chen brings industry experience to the classroom and mentors our robotics and coding clubs.",
    photo: portrait("1507003211169-0a1dd7228f2d"),
    email: "d.chen@brightfutureacademy.edu",
  },
  {
    slug: "ms-grace-okafor",
    name: "Ms. Grace Okafor",
    title: "Head of Commerce",
    department: "Commercial",
    qualifications: ["ACCA", "B.Sc Accounting"],
    subjects: ["Accounting", "Economics"],
    yearsOfExperience: 12,
    bio: "Ms. Okafor combines professional accounting practice with engaging classroom teaching and runs the student enterprise programme.",
    photo: portrait("1592621385612-4d7129426394"),
    email: "g.okafor@brightfutureacademy.edu",
  },
  {
    slug: "mr-samuel-uche",
    name: "Mr. Samuel Uche",
    title: "Director of Sports",
    department: "Sports & Athletics",
    qualifications: ["B.Sc Sports Science", "FIFA Coaching Licence"],
    subjects: ["Physical Education"],
    yearsOfExperience: 14,
    bio: "A former national footballer, Mr. Uche has built one of the region's most successful school sports programmes.",
    photo: portrait("1535713875002-d1d0cf377fde"),
    email: "s.uche@brightfutureacademy.edu",
  },
  {
    slug: "mrs-aisha-mohammed",
    name: "Mrs. Aisha Mohammed",
    title: "Senior Biology Teacher",
    department: "Science",
    qualifications: ["M.Sc Biology", "PGCE"],
    subjects: ["Biology", "Health Education"],
    yearsOfExperience: 11,
    bio: "Mrs. Mohammed leads field trips and the school's environmental sustainability initiatives.",
    photo: portrait("1531123897727-8f129e1688ce"),
    email: "a.mohammed@brightfutureacademy.edu",
  },
  {
    slug: "mr-peter-johnson",
    name: "Mr. Peter Johnson",
    title: "Mathematics Coordinator",
    department: "Science",
    qualifications: ["M.Sc Mathematics", "B.Ed"],
    subjects: ["Mathematics", "Further Mathematics"],
    yearsOfExperience: 16,
    bio: "Mr. Johnson's clear, patient teaching consistently produces top exam results year after year.",
    photo: portrait("1472099645785-5658abf4ff4e"),
    email: "p.johnson@brightfutureacademy.edu",
  },
];
