import { Bar } from './style';
import { useEffect } from 'react';
import axios from 'axios';
const Profile = () => {
    let mock: {
        name: string;
        tier: string;
        point: number;
    }[];
    mock = [
        {
            name: 'sungsoo',
            tier: 'bronze',
            point: 15,
        },
    ];

    async function getProfile() {
        try {
            const token = localStorage.getItem('accessToken');
            // const res = await axios.post(
            //   "https://reactproject-test-78fcd-default-rtdb.firebaseio.com/mock.json",
            //   { mocksPortfolio }
            // );
            const mocks = await axios.get('users/individual', {
                headers: { authorization: `Bearer ${token}` },
            });

            console.log(mocks);
            // console.log(mocks.data["-NJJR5a9003Z0Qw6WOzB"]);
            // const mock = mocks.data["-NJJR5a9003Z0Qw6WOzB"].mocksPortfolio;
            // setRes(mock);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getProfile();
    }, []);
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
    const testWidth = `${((mock[0].point - lowerLimit) / (upperLimit - lowerLimit)) * 100}`;

    console.log(testWidth);

    return (
        <>
            <h1>profile page</h1>
            <Bar>
                <div>
                    <div style={{ width: `${testWidth}%` }}></div>
                </div>
            </Bar>
        </>
    );
};

export default Profile;
