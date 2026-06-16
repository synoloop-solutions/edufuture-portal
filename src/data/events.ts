import { images } from "./images";

export type SchoolEvent = {
  slug: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  excerpt: string;
  description: string[];
  image: string;
};

export const events: SchoolEvent[] = [
  {
    slug: "open-day-2025",
    title: "Open Day 2025",
    date: "2025-11-15",
    time: "10:00 – 14:00",
    venue: "Main Campus",
    category: "Admissions",
    excerpt: "Tour the campus, meet the staff and learn about our admissions process.",
    description: [
      "Prospective families are warmly invited to our annual Open Day.",
      "The day includes guided campus tours, meet-the-staff sessions and a Q&A with the Principal.",
      "Registration is recommended but not required.",
    ],
    image: images.campusAerial,
  },
  {
    slug: "science-fair-2025",
    title: "Annual Science Fair",
    date: "2025-11-22",
    time: "09:00 – 16:00",
    venue: "Adewale Science Block",
    category: "Academics",
    excerpt: "Junior and senior science projects on display — vote for your favourite.",
    description: [
      "Our annual science fair showcases over 100 student-led projects from JSS1 through SS3.",
      "Visitors are invited to interact with student researchers and vote for the People's Choice Award.",
    ],
    image: images.science,
  },
  {
    slug: "carol-service-2025",
    title: "Carol Service & Christmas Concert",
    date: "2025-12-12",
    time: "18:00",
    venue: "Main Hall",
    category: "Community",
    excerpt: "An evening of music, readings and reflection to close the term.",
    description: [
      "Our beloved end-of-term carol service features the school choir, orchestra and special guest performers.",
      "All families and friends of the school are welcome.",
    ],
    image: images.event1,
  },
  {
    slug: "sports-day-2026",
    title: "Inter-House Sports Day",
    date: "2026-02-07",
    time: "08:30 – 15:00",
    venue: "Sports Complex",
    category: "Sports",
    excerpt: "Athletics, team events and the famous inter-house relay.",
    description: [
      "The whole school takes to the track for our annual inter-house sports day.",
      "Parents, alumni and friends are warmly invited.",
    ],
    image: images.sports,
  },
  {
    slug: "drama-festival-2026",
    title: "Spring Drama Festival",
    date: "2026-03-14",
    time: "19:00",
    venue: "Main Hall",
    category: "Arts",
    excerpt: "Three nights of student-directed theatre to close out the spring term.",
    description: [
      "Three nights of original, student-directed theatre by our SS1, SS2 and SS3 drama groups.",
      "Tickets are free but space is limited — reserve via the school office.",
    ],
    image: images.arts,
  },
  {
    slug: "career-day-2026",
    title: "Senior Career Day",
    date: "2026-03-28",
    time: "10:00 – 14:00",
    venue: "Main Hall",
    category: "Academics",
    excerpt: "Alumni and industry leaders meet senior students.",
    description: [
      "Over 40 alumni and industry leaders return to campus to talk with our senior students about university and career pathways.",
    ],
    image: images.event2,
  },
  {
    slug: "alumni-day-2026",
    title: "Alumni Day 2026",
    date: "2026-04-25",
    time: "11:00 – 22:00",
    venue: "Main Campus",
    category: "Community",
    excerpt: "Homecoming, sports, panels and a gala dinner.",
    description: [
      "Our biggest alumni event of the year — open to all graduates and their families.",
    ],
    image: images.graduation,
  },
  {
    slug: "summer-school-2026",
    title: "Summer Enrichment School",
    date: "2026-07-06",
    time: "All day, 3 weeks",
    venue: "Main Campus",
    category: "Academics",
    excerpt: "Three weeks of enrichment courses for current and prospective students.",
    description: [
      "Our popular summer enrichment programme offers three weeks of half-day courses in coding, robotics, debate, art and athletics.",
    ],
    image: images.ict,
  },
  {
    slug: "graduation-2026",
    title: "Class of 2026 Graduation",
    date: "2026-07-18",
    time: "10:00",
    venue: "Main Hall",
    category: "Community",
    excerpt: "Celebrating our graduating SS3 cohort.",
    description: [
      "A formal graduation ceremony for our SS3 graduating class, followed by a reception for families and staff.",
    ],
    image: images.graduation,
  },
  {
    slug: "music-recital-2026",
    title: "Autumn Music Recital",
    date: "2026-10-10",
    time: "18:30",
    venue: "Music Hall",
    category: "Arts",
    excerpt: "An evening of solo and ensemble performances by our music students.",
    description: [
      "Soloists and small ensembles from across the school perform a varied programme spanning classical, jazz and contemporary repertoire.",
    ],
    image: images.event3,
  },
];
