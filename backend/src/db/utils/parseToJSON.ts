export const jsonParse = (data: any) => {
  const result = JSON.parse(JSON.stringify(data));
  return result;
};
