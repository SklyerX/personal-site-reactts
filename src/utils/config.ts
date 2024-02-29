import dayjs from "dayjs";

export const config = {
  dateOfBirth: {
    year: 2007,
    month: 11, // Note, January is 0
    day: 12,
    getYears() {
      const currentDate = dayjs();
      const birthDate = dayjs(
        `${this.year}-${this.month}-${this.day}`,
        "YYYY-MM-DD"
      );

      const years = currentDate.diff(birthDate, "year");
      return years;
    },
  },
  urls: {
    api: "https://api.skylerx.ir",
    github: "https://github.com/SklyerX",
    contactMail: "skylerx2323@gmail.com",
  },
  names: {
    githubUsername: "SklyerX",
    developerName: "SkylerX",
  },
};
