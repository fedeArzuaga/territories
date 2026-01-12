export const formatToLocalDateString = (date: Date | string) => {
  const d = new Date(date);
  // We use getUTC... because Prisma/Postgres stores dates at UTC midnight
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  
  return `${day}/${month}/${year}`; // Returns "11/01/2024"
};