export const formatDate = (date?: string) => {
  if (date) {
    let dt = new Date(date);
    return `${dt.getMonth()}/${dt.getDate()}/${dt.getFullYear()}`;
  } else return "";
};
