// silahkan sesuaikan :
// xAxis = label di bawah chart
// series = value nya
export const demographyData = {
  age: {
    xAxis: ["20", "25", "30", "35", "40", "45", "50", "55", "60"],
    series: [79, 2837, 9726, 11966, 2017, 472, 195, 74, 10],
  },
  tenure: {
    xAxis: [
      "0",
      "3",
      "6",
      "9",
      "12",
      "15",
      "18",
      "21",
      "24",
      "27",
      "30",
      "33",
      "36",
      "39",
    ],
    series: [6403, 4829, 7943, 7123, 131, 57, 417, 180, 94, 98, 41, 47, 3, 0],
  },
  jobPosition: {
    yAxis: [
      "MANTRI",
      "MANTRI PENUGASAN",
      "ASSOCIATE MANTRI 2",
      "JUNIOR ASSOCIATE MANTRI",
      "ASSOCIATE MANTRI 1",
    ],
    series: [13, 14, 437, 6322, 20579],
  },
  employeeStatus: {
    series: [
      { value: 3749, name: "Pekerja Kontrak" },
      { value: 23617, name: "Pekerja Tetap" },
    ],
    colors: ["#F3C317", "#8A5AC8"],
  },
  generation: {
    series: [
      { value: 914, name: "Gen X" },
      { value: 25245, name: "Gen Y" },
      { value: 1210, name: "Gen Z" },
    ],
    colors: ["#8A5AC8", "#F3C317", "#E87CAC"],
  },
  gender: {
    series: [
      { value: 7745, name: "Female" },
      { value: 19617, name: "Male" },
      { value: 4, name: "Unknown" },
    ],
    colors: ["#ff6b6b", "#54a0ff", "#a9a9a9"],
  },
  educationDegree: {
    xAxis: [
      "External course/sem.",
      "Internal course/sem.",
      "SLTP / Setingkat",
      "SLTA / Setingkat",
      "Diploma 1",
      "Diploma 2",
      "Diploma 3/4",
      "Strata 1",
      "Strata 2",
      "Strata 3",
    ],
    series: [2, 7, 2, 126, 17, 6, 4055, 22994, 154, 3],
  },
};

export const rawPerformanceData = {
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Des",
  ],
  q1: [4, 3.5, 4.2],
  q2: [3.2, 3, 2.4],
  q3: [4.1, 3.3, 4],
  q4: [3.8, 4.3, 4.1],
};

export const rawRatingData = [
  { name: "Q1", value: 85 },
  { name: "Q2", value: 75 },
  { name: "Q3", value: 78 },
  { name: "Q3", value: 70 },
];
