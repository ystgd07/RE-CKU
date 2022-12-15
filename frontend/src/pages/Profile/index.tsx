import { Bar } from "./style";

const Profile = () => {
  let mock: {
    name: string;
    tier: string;
    point: number;
  }[];
  mock = [
    {
      name: "sungsoo",
      tier: "bronze",
      point: 30,
    },
  ];
  const arr = [20, 40, 100];
  let upperLimit = arr[0];
  let lowerLimit = 0;
  arr.map((e, idx) => {
    if (e <= mock[0].point) {
      upperLimit = arr[idx + 1];
      if (upperLimit === arr[0]) {
        lowerLimit = 0;
      } else {
        lowerLimit = upperLimit - arr[idx];
      }
    }
  });

  console.log(upperLimit, lowerLimit);
  const testWidth = `${
    ((mock[0].point - lowerLimit) / (upperLimit - lowerLimit)) * 100
  }`;

  console.log(testWidth);

  return (
    <>
      <h1>profile page</h1>
      <Bar>
        Bronze<div style={{ width: `${testWidth}%` }}>Bronze</div>
      </Bar>
    </>
  );
};

export default Profile;
