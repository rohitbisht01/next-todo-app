export function getDate(timestamp: string) {
  const date = new Date(timestamp).getDate();
  const month = new Date(timestamp).getMonth();
  const year = new Date(timestamp).getFullYear();

  return `${date}/${month}/${year}`;
}
