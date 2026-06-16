import { images } from "./images";

export type GalleryItem = {
  id: string;
  src: string;
  caption: string;
  category: string;
};

export const gallery: GalleryItem[] = [
  { id: "g1", src: images.classroom, caption: "A focused morning class", category: "Campus Life" },
  { id: "g2", src: images.library, caption: "Quiet study in the library", category: "Campus Life" },
  { id: "g3", src: images.science, caption: "Chemistry lab in action", category: "Academics" },
  { id: "g4", src: images.arts, caption: "Drama festival rehearsal", category: "Arts" },
  { id: "g5", src: images.sports, caption: "Inter-house football final", category: "Sports" },
  { id: "g6", src: images.ict, caption: "Robotics club build day", category: "Academics" },
  { id: "g7", src: images.graduation, caption: "Class of 2025 graduation", category: "Community" },
  { id: "g8", src: images.studentSmiling, caption: "Pride after exam results", category: "Campus Life" },
  { id: "g9", src: images.studentsReading, caption: "World Book Day", category: "Community" },
  { id: "g10", src: images.event1, caption: "Carol service evening", category: "Community" },
  { id: "g11", src: images.event2, caption: "Career day with alumni", category: "Community" },
  { id: "g12", src: images.campusAerial, caption: "Our campus from above", category: "Campus Life" },
];

export const galleryCategories = ["All", "Campus Life", "Academics", "Arts", "Sports", "Community"];
