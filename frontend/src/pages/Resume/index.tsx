import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from './style';
import Logo from 'assets/images/iogo.png';

interface careerDataRes {
    company: string;
    endDate: string;
    id: number;
    notDevelop: number;
    position: string;
    reward: string;
    startDay: string;
    useResumeId: number;
    nowWork: number;
}
interface projectDataRes {
    id: number;
    information: string;
    link1: string;
    link2: string;
    projectName: string;
    usedResumeId: number;
    year: string;
}
interface resumeDataRes {
    id: number;
    information: string;
    name: string;
    position: string;
    updatedAt: string;
    usedUserId: number;
}
interface userDataRes {
    avatarUrl: string;
    created: string;
    id: number;
    email: string;
    phoneNumber: string;
    username: string;
}

const resumeId = 34;
const Resume = () => {
    const navigate = useNavigate();
    const [careerData, setCareerData] = useState<careerDataRes[]>([]);
    const [projectData, setProjectData] = useState<projectDataRes[]>([]);
    const [resumeData, setResumeData] = useState<resumeDataRes[]>([]);
    const [userDataRes, setUserData] = useState<userDataRes[]>([]);

    async function getResume() {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await axios.get(`/myportfolio/resume/${resumeId}`, {
                headers: { authorization: `Bearer ${token}` },
            });

            setCareerData(res.data.careerData);
            setProjectData(res.data.projectData);
            setResumeData(res.data.resumeData);
            setUserData(res.data.userDataRes);

            console.log('됬나?');
            console.log('res!!!!!!!!!!', res);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getResume();
    }, []);
    // console.log('data', data);
    // console.log('careerData', careerData);
    return (
        <div>
            <S.MobileDiv>
                <div>
                    {resumeData.map((data: any) => (
                        <h1 key={data.id}>{data.name} 의 이력서</h1>
                    ))}
                </div>
                <S.LineDiv>
                    <S.H2>Info</S.H2>
                </S.LineDiv>
                {resumeData.map((data: any) => (
                    <S.BorderDiv key={data.id}>
                        <h2>{data.name}</h2>
                        <div>
                            <img src={Logo}></img>
                            <div>
                                <p>
                                    information <br /> {data.information}
                                </p>
                                <br />
                                <p>
                                    포지션 <br /> {data.position}
                                </p>
                            </div>
                        </div>
                    </S.BorderDiv>
                ))}
                <S.LineDiv>
                    <S.H2>Project</S.H2>
                </S.LineDiv>

                {projectData.map((data: any) => (
                    <S.BorderDiv key={data.id}>
                        <h2>{data.projectName}</h2>
                        <div>
                            {/* <img src={Logo}></img> */}
                            <div>
                                <p>{data.information}</p>
                                <p>{data.year}</p>
                                <p>{data.link1}</p>
                                <p>{data.link2}</p>
                            </div>
                        </div>
                    </S.BorderDiv>
                ))}
                <S.LineDiv>
                    <S.H2>Career</S.H2>
                </S.LineDiv>
                {careerData.map((data: any) => (
                    <S.BorderDiv key={data.id}>
                        <h2>{data.company}</h2>
                        <h4>{data.notDevlop ? '개발자' : '비개발자'}</h4>
                        <div>
                            <div>
                                <p>
                                    {data.startDate}~{data.endDate}
                                </p>
                                <p>{data.position}</p>
                                <p>{data.reward}</p>
                            </div>
                        </div>
                    </S.BorderDiv>
                ))}
            </S.MobileDiv>
        </div>
    );
};

export default Resume;
