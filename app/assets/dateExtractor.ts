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
    'january': 1, 'february': 2, 'march': 3, 'april': 4, 'may': 5, 'june': 6,
    'july': 7, 'august': 8, 'september': 9, 'october': 10, 'november': 11, 'december': 12,
  };

  // Split the string using " to " as the separator
  const dateParts: string[] = dateString.split(" to ");

  // Extract start date, month, and year
  const startDateString: string = dateParts[0];
  const [startDay, startMonth, startYear]: string[] = startDateString.split(" ");
  const startMonthNumber: number = monthMap[startMonth] || monthMap[startMonth.toLowerCase()];

  // Extract end date, month, and year
  const endDateString: string = dateParts[1];
  const [endDay, endMonth, endYear]: string[] = endDateString.split(" ");
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

// Example usage
// const dateString: string = "16 October 2019 to 25 October 2019";
// const extractedDates = extractDates(dateString);
// console.log(extractedDates);
