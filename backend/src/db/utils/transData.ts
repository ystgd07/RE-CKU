/**UPDATE 쿼리를 도와주는 함수입니다.
 * const [keys, values] = updateData(data)
 * db.query(`UPDATE user SET ${keys.join(", ")} WHERE id = ?`, [...values, id])
 */
export const updateData = (input: Record<string, string | number | boolean>) => {
  const data = Object.entries(input).reduce(
    (a, [key, value]) => {
      a[0].push(`${key} = ?`);
      a[1].push(value);
      return a;
    },
    [[], []] as [string[], Array<string | number | boolean>]
  );
  return data;
};

/**Insert 쿼리를 도와주는 함수입니다.
 * const [keys, values, keyValue, valueValue] = insertData(data)
 * db.query(`INSERT INTO table(keys)` VALUES(values), [...keyValue,...valueValue]))
 */
export const insertData = (input: Record<string, string | number | boolean>) => {
  const data = Object.entries(input).reduce(
    (a, [key, value]) => {
      a[0].push(`?`);
      a[1].push(`?`);
      a[2].push(key);
      a[3].push(value);
      return a;
    },
    [[], [], [], []] as [string[], string[], string[], Array<string | number | boolean>]
  );
  return data;
};
