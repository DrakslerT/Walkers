export const handleDate = (x: string) => {
  if (x === '') {
    return 'Not given';
  }
  const date = new Date(x);
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDay();
  const h = date.getHours();
  const min = date.getMinutes();

  return `${h}:${min} ${d}-${m}-${y}`;
};

export const handleResponseTime = (t: number) => {
  switch (t) {
    case 7:
      return 'Daily';
    case 5:
      return 'Less than 3 days';
    case 3:
      return 'Weekly';
    case 1:
      return 'More than a week';
  }
};
