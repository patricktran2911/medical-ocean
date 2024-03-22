export function formatDateToString(dateInput: Date | string): string {
    let date = dateInput;
    
    // Check if dateInput is a string and convert it to a Date object
    if (typeof dateInput === 'string') {
      date = new Date(dateInput);
    }
  
    // Now we ensure that 'date' is a Date object, but we need to check if the date is valid
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid date input');
    }
  
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }
  