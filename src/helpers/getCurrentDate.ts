// helpers/getCurrentDate.ts
export const getCurrentDate = (date: string | Date) => {
    if (typeof date === 'string' && date.includes('-')) return date.split('T')[0];
    
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}