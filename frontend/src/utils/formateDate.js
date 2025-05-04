export const formateDate = (isDate) => {
  const date = new Date(isDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
