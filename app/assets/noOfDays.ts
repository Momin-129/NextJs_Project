function daysBetweenDates(
  startDay: number,
  startMonth: number,
  startYear: number,
  endDay: number,
  endMonth: number,
  endYear: number
): number {
  // Create Date objects for the start and end dates
  const startDate = new Date(startYear, startMonth - 1, startDay);
  const endDate = new Date(endYear, endMonth - 1, endDay);

  // Calculate the difference in milliseconds
  const timeDifference = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to days
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  // Return the number of days
  return Math.floor(daysDifference);
}

// Example usage
const startDay = 1;
const startMonth = 1;
const startYear = 2022;

const endDay = 31;
const endMonth = 12;
const endYear = 2022;

const result = daysBetweenDates(startDay, startMonth, startYear, endDay, endMonth, endYear);
console.log(result); // Output: 364
