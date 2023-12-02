export function extractDates(dateString: string): {
  startDay: number;
  startMonth: number;
  startYear: number;
  endDay: number;
  endMonth: number;
  endYear: number;
} {
  // Mapping of month names to month numbers
  const monthMap: Record<string, number> = {
  'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
  'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12,
  'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4,  'Jun': 6,
  'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12,
  'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
  'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12,
};

  // Split the string using a regular expression to handle additional spaces
  const dateParts: string[] = dateString.split(/\s+to\s+/);

  // Extract start date, month, and year
  const startDateString: string = dateParts[0];
  const [startDay, startMonth, startYear]: string[] = startDateString.split(/\s+/);
  const startMonthNumber: number = monthMap[startMonth] || monthMap[startMonth.toLowerCase()];

  // Extract end date, month, and year
  const endDateString: string = dateParts[1];
  const [endDay, endMonth, endYear]: string[] = endDateString.split(/\s+/);
  const endMonthNumber: number = monthMap[endMonth] || monthMap[endMonth.toLowerCase()];

  // Return the extracted values
  return {
    startDay: parseInt(startDay),
    startMonth: startMonthNumber,
    startYear: parseInt(startYear),
    endDay: parseInt(endDay),
    endMonth: endMonthNumber,
    endYear: parseInt(endYear),
  };
}


