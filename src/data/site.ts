export const site = {
  name: "BrightFuture Academy",
  short: "BrightFuture",
  tagline: "Nurturing tomorrow's leaders, today.",
  description:
    "BrightFuture Academy is a forward-thinking institution offering primary, secondary, and college education with a focus on academic excellence, character, and innovation.",
  address: "12 Learning Avenue, Education District, Lagos, Nigeria",
  phone: "+234 800 000 0000",
  email: "hello@brightfutureacademy.edu",
  founded: 1998,
  social: {
    facebook: "#",
    instagram: "#",
    twitter: "#",
    youtube: "#",
  },
};

export const stats = [
  { label: "Students", value: "1,250+" },
  { label: "Qualified Teachers", value: "85+" },
  { label: "University Placement", value: "98%" },
  { label: "Years of Excellence", value: "25+" },
];

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/admissions", label: "Admissions" },
  { to: "/academics", label: "Academics" },
  { to: "/departments", label: "Departments" },
  { to: "/staff", label: "Staff" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
] as const;
