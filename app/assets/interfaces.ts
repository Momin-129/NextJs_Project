export interface User {
    email:string,
    password:string
}

export interface Register{
    username:string,
    email:string,
    password:string
}

export interface cycleDate {
  startDay: number;
  startMonth: number;
  startYear: number;
  endDay: number;
  endMonth: number;
  endYear: number;
}

export interface cycleDates {
    startDay: number,
    startMonth: number,
    startYear: number,
    endDay: number,
    endMonth: number,
    endYear: number,
    afterDays: number
}
