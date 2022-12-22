/** 쿼리한 값을 string -> parse 하여 일반적으로 사용할수 있게 함. */
export const jsonParse = (data: any) => {
  const result = JSON.parse(JSON.stringify(data));
  return result;
};
