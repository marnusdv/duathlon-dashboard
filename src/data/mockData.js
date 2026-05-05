export const athlete = {
  name: "Divan",
  surname: "de Vries",
  age: 17,
  category: "Junior",
  club: "Cape Town Tri Club",
  targetEvent: "Duathlon World Champs 2026",
  targetDate: "Oct 2026",
  photo: null,
}

export const weeklyTraining = [
  { week: "W1 Jan", runKm: 28, bikeKm: 80, runTime: 135, bikeTime: 145, load: 62 },
  { week: "W2 Jan", runKm: 32, bikeKm: 95, runTime: 152, bikeTime: 162, load: 71 },
  { week: "W3 Jan", runKm: 35, bikeKm: 100, runTime: 168, bikeTime: 175, load: 78 },
  { week: "W4 Jan", runKm: 22, bikeKm: 60, runTime: 105, bikeTime: 110, load: 48 },
  { week: "W1 Feb", runKm: 38, bikeKm: 110, runTime: 182, bikeTime: 188, load: 85 },
  { week: "W2 Feb", runKm: 40, bikeKm: 120, runTime: 195, bikeTime: 205, load: 91 },
  { week: "W3 Feb", runKm: 42, bikeKm: 125, runTime: 200, bikeTime: 214, load: 95 },
  { week: "W4 Feb", runKm: 25, bikeKm: 65, runTime: 120, bikeTime: 115, load: 52 },
  { week: "W1 Mar", runKm: 44, bikeKm: 130, runTime: 210, bikeTime: 222, load: 99 },
  { week: "W2 Mar", runKm: 46, bikeKm: 135, runTime: 218, bikeTime: 228, load: 103 },
  { week: "W3 Mar", runKm: 48, bikeKm: 140, runTime: 226, bikeTime: 235, load: 108 },
  { week: "W4 Mar", runKm: 30, bikeKm: 70, runTime: 142, bikeTime: 122, load: 58 },
]

export const competitions = [
  {
    id: 1,
    name: "Durban Sprint Duathlon",
    date: "2026-01-18",
    type: "Sprint",
    run1: "15:42",
    bike: "32:18",
    run2: "16:55",
    total: "1:04:55",
    position: 3,
    category: "Junior",
    totalField: 24,
    notes: "Strong bike split, transition slow",
  },
  {
    id: 2,
    name: "Gauteng Standard Duathlon",
    date: "2026-02-08",
    type: "Standard",
    run1: "37:22",
    bike: "1:08:44",
    run2: "38:10",
    total: "2:24:16",
    position: 2,
    category: "Junior",
    totalField: 31,
    notes: "PB on run 1, held pace well on run 2",
  },
  {
    id: 3,
    name: "Cape Town City Duathlon",
    date: "2026-03-01",
    type: "Sprint",
    run1: "15:12",
    bike: "31:05",
    run2: "16:20",
    total: "1:02:37",
    position: 1,
    category: "Junior",
    totalField: 28,
    notes: "1st place! New sprint PB",
  },
  {
    id: 4,
    name: "SA Junior Champs",
    date: "2026-03-22",
    type: "Standard",
    run1: "36:58",
    bike: "1:06:33",
    run2: "37:44",
    total: "2:21:15",
    position: 2,
    category: "Junior",
    totalField: 42,
    notes: "2nd at SA Champs, qualified for Worlds",
  },
  {
    id: 5,
    name: "Pretoria Duathlon",
    date: "2026-04-12",
    type: "Sprint",
    run1: "14:58",
    bike: "30:44",
    run2: "16:02",
    total: "1:01:44",
    position: 1,
    category: "Junior",
    totalField: 19,
    notes: "Back-to-back wins, run pace improving",
  },
]

export const pbProgression = [
  { month: "Jan", run5k: "17:22", run10k: "36:10", bikePower: 245 },
  { month: "Feb", run5k: "17:01", run10k: "35:42", bikePower: 252 },
  { month: "Mar", run5k: "16:44", run10k: "35:08", bikePower: 261 },
  { month: "Apr", run5k: "16:28", run10k: "34:52", bikePower: 268 },
  { month: "May", run5k: "16:10", run10k: "34:20", bikePower: 275 },
]

// Convert mm:ss to seconds for chart
export const pbProgressionSeconds = pbProgression.map(d => ({
  month: d.month,
  run5k: parseInt(d.run5k.split(':')[0]) * 60 + parseInt(d.run5k.split(':')[1]),
  run10k: parseInt(d.run10k.split(':')[0]) * 60 + parseInt(d.run10k.split(':')[1]),
  bikePower: d.bikePower,
}))

export const currentStats = {
  totalRunKm: 430,
  totalBikeKm: 1230,
  sessionsThisMonth: 22,
  avgWeeklyLoad: 80,
  bestRun5k: "16:10",
  bestRun10k: "34:20",
  bestBikePower: 275,
  podiums: 4,
  wins: 2,
}

export const upcomingRaces = [
  { name: "Eastern Cape Sprint", date: "2026-05-24", type: "Sprint", priority: "A" },
  { name: "African Champs Selection", date: "2026-06-14", type: "Standard", priority: "A" },
  { name: "Duathlon World Champs", date: "2026-10-10", type: "Standard", priority: "A+" },
]
