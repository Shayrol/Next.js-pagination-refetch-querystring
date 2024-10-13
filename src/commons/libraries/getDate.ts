export const getDate = (date: string | number | Date) => {
  const _date = new Date(date);
  const yyyy = _date.getFullYear();
  const mm = ("0" + (_date.getMonth() + 1)).slice(-2);
  const dd = ("0" + _date.getDate()).slice(-2);

  return `${yyyy}-${mm}-${dd}`;
};
