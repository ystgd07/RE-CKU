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
 * const [KEYS, VALUES,  valueValue] = insertData(data)
 * db.query(`INSERT INTO table(${KEYS.join(", ")})` VALUES(${VALUES.join(", ")}), [...valueValue]))
 */
export const insertData = (input: Record<string, string | number | boolean>) => {
  const data = Object.entries(input).reduce(
    (a, [key, value]) => {
      a[0].push(key);
      a[1].push("?");
      a[2].push(value);
      return a;
    },
    [[], [], []] as [string[], string[], Array<string | number | boolean>]
  );
  return data;
};

type Input = {
  id: number;
};
export const selectByWhere = (input: Input[]) => {
  const data = Object.entries(input).reduce(
    (a, [nullable, value], index) => {
      a[0].push(`${Object.keys(value)} != ?`);
      const forValue = Object.values(value);
      a[1].push(forValue[0]);
      return a;
    },
    [[], []] as [string[], number[]]
  );
  return data;
};
// export const selectData = (input : Record<string,|number>)=>{
//   const data = Object.entries(input).reduce(
//     (a,[key,value])=>{
//       a[0].push(key);
//       a[1].push()
//     },
//     [[],[]] as [string[],string[]]
//   )
// }
// ...
//   WHERE (WORKDEPT, EDLEVEL, JOB) = ('E11', 12, 'CLERK')
