// Function to generate an array of numbers from start to end
function generateNumberArray(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

// Function to create arrays for date, month, and year
export function createDateArrays(): { dates: number[], months: number[], years: number[] } {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const dates = generateNumberArray(1, 31);
  const months = generateNumberArray(1, 12);
  const years = generateNumberArray(currentYear - 1, currentYear); // Adjust the range as needed

  return { dates, months, years };
}