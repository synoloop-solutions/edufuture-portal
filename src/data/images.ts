// Centralized image URLs (real Unsplash photography, school-related).
// Using Unsplash's image CDN with sizing params for performance.

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const images = {
  heroCampus: u("photo-1523050854058-8df90110c9f1"),
  heroStudents: u("photo-1571260899304-425eee4c7efc"),
  principal: u("photo-1573496359142-b8d87734a5a2", 800),
  classroom: u("photo-1580582932707-520aed937b7b"),
  library: u("photo-1521587760476-6c12a4b040da"),
  science: u("photo-1532094349884-543bc11b234d"),
  sports: u("photo-1571019613454-1cb2f99b2d8b"),
  arts: u("photo-1513475382585-d06e58bcb0e0"),
  ict: u("photo-1531482615713-2afd69097998"),
  graduation: u("photo-1523580494863-6f3031224c94"),
  studentsReading: u("photo-1503676260728-1c00da094a0b"),
  studentSmiling: u("photo-1503454537195-1dcabb73ffb9", 800),
  teacher: u("photo-1544717297-fa95b6ee9643", 800),
  parents: u("photo-1542810634-71277d95dcbb"),
  campusAerial: u("photo-1562774053-701939374585"),
  event1: u("photo-1540575467063-178a50c2df87"),
  event2: u("photo-1511578314322-379afb476865"),
  event3: u("photo-1492538368677-f6e0afe31dcc"),
  news1: u("photo-1427504494785-3a9ca7044f45"),
  news2: u("photo-1606761568499-6d2451b23c66"),
  news3: u("photo-1503676382389-4809596d5290"),
  gallery1: u("photo-1581726707445-75cbe4efc586"),
  gallery2: u("photo-1577896851231-70ef18881754"),
  gallery3: u("photo-1497486751825-1233686d5d80"),
  gallery4: u("photo-1455390582262-044cdead277a"),
  gallery5: u("photo-1577896851231-70ef18881754"),
  gallery6: u("photo-1509062522246-3755977927d7"),
};

// Avatar generator (real photos via randomuser-style ids on Unsplash people)
export const portrait = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=400&h=400&q=70`;
