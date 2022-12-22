import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from './style';
import Logo from 'assets/images/logo.png';
import Header from 'components/Header';

interface careerDataRes {
    company: string;
    endDate: string;
    careerId: number;
    notDevelop: number;
    position: string;
    reward: string;
    startDate: string;
    resumeId: number;
    workNow: number;
}
interface projectDataRes {
    projectId: number;
    information: string;
    link1: string;
    link2: string;
    projectName: string;
    resumeId: number;
    year: string;
}
interface resumeDataRes {
    resumeId: number;
    intro: string;
    resumeName: string;
    position: string;
    updatedAt: string;
    userId: number;
}
interface userDataRes {
    avatarUrl: string;
    created: string;
    id: number;
    email: string;
    phoneNumber: string;
    username: string;
    password: string;
    point: number;
}

const resumeId = 1;
const Resume = () => {
    const navigate = useNavigate();
    const [careerData, setCareerData] = useState<careerDataRes[]>([]);
    const [projectData, setProjectData] = useState<projectDataRes[]>([]);
    const [resumeData, setResumeData] = useState<resumeDataRes>();
    const [userData, setUserData] = useState<userDataRes>();

    async function getResume() {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await axios.get(`/my-portfolio/resumes/${resumeId}`, {
                headers: { authorization: `Bearer ${token}` },
            });
            console.log('여기 사람 있어요!!');
            console.log(res.data.data);
            setCareerData(res.data.data.careersData);
            setProjectData(res.data.data.projectsData);
            setResumeData(res.data.data.resumeData);
            setUserData(res.data.data.userData);
            console.log('됬나?');
            console.log('res!!!!!!!!!!', res);
        } catch (e) {
            console.log(e);
        }
    }
    console.log('resumeData?', resumeData);
    useEffect(() => {
        getResume();
    }, []);

    return (
        <div>
            <Header />
            <S.MobileDiv>
                <div>
                    {/* {resumeData.map((data: any) => ( */}
                    <h1 key={resumeData?.resumeId}>{resumeData?.resumeName}</h1>
                    {/* ))} */}
                </div>
                <S.LineDiv>
                    <S.H2>Info</S.H2>
                </S.LineDiv>
                {/* {resumeData.map((data: any) => ( */}
                <S.BorderDiv key={resumeData?.resumeId}>
                    <h2>{userData?.username}</h2>
                    <div>
                        <img src={Logo}></img>
                        <div>
                            <p>
                                information <br /> {resumeData?.intro}
                            </p>
                            <br />
                            <p>
                                포지션 <br /> {resumeData?.position}
                            </p>
                            <p>
                                이메일 <br /> {userData?.email}
                            </p>
                        </div>
                    </div>
                </S.BorderDiv>
                {/* ))} */}
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
