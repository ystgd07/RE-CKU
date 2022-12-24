import React, { useState, useEffect } from 'react';

import axios from 'axios';
import * as S from './style';
import Header from 'components/Header';
import { Typography, Avatar } from 'antd';

const { Title, Paragraph, Text } = Typography;

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
                <Typography>
                    <Title key={resumeData?.resumeId}>{resumeData?.resumeName}</Title>
                </Typography>
                <S.LineDiv>
                    <Title level={3}>Info</Title>
                </S.LineDiv>
                {/* {resumeData.map((data: any) => ( */}
                <S.BorderDiv key={resumeData?.resumeId}>
                    <Title level={2}>{userData?.username}</Title>
                    <div>
                        {/* <Avatar src={userData?.avatarUrl} /> */}
                        <img src={userData?.avatarUrl} alt={'프로필사진'}></img>
                        <div>
                            <Paragraph strong>소개 : {resumeData?.intro}</Paragraph>
                            <Paragraph strong>포지션 : {resumeData?.position}</Paragraph>
                            <Paragraph strong>이메일 : {userData?.email}</Paragraph>
                        </div>
                    </div>
                </S.BorderDiv>
                {/* ))} */}
                <S.LineDiv>
                    <Title level={2}>Project</Title>
                </S.LineDiv>

                {projectData.map((data: any) => (
                    <S.BorderDiv key={data.id}>
                        <Title level={2}>{data.projectName}</Title>
                        <div>
                            <div>
                                <div>
                                    <Paragraph>
                                        <Text strong>소개 :</Text>
                                        &nbsp;{data.information}
                                    </Paragraph>
                                </div>
                                <div>
                                    <Paragraph>
                                        <Text strong>제작년도 :</Text>
                                        &nbsp;{data.year}
                                    </Paragraph>
                                </div>
                                <div>
                                    <Paragraph>
                                        <Text strong>링크 :</Text>
                                        &nbsp;{data.link1}
                                    </Paragraph>
                                </div>
                                <div>
                                    <Paragraph>
                                        <Text strong>링크 :</Text>
                                        &nbsp;{data.link2}
                                    </Paragraph>
                                </div>
                            </div>
                        </div>
                    </S.BorderDiv>
                ))}
                <S.LineDiv>
                    <Title level={2}>Career</Title>
                </S.LineDiv>
                {careerData.map((data: any) => (
                    <S.BorderDiv key={data.id}>
                        <h2>{data.company}</h2>
                        <h4>{data.notDevlop ? '개발자' : '비개발자'}</h4>
                        <div>
                            {/* <div> */}
                            <Paragraph strong>기간:</Paragraph>
                            <Paragraph>
                                {data.startDate}~{data.endDate}&nbsp;&nbsp;&nbsp;
                            </Paragraph>
                            <Paragraph strong>포지션:</Paragraph>
                            <Paragraph> {data.position}&nbsp;&nbsp;&nbsp;</Paragraph>
                            <Paragraph strong>리워드가뭐야?: </Paragraph>
                            <Paragraph>{data.reward}&nbsp;&nbsp;&nbsp;</Paragraph>
                            {/* </div> */}
                        </div>
                    </S.BorderDiv>
                ))}
            </S.MobileDiv>
        </div>
    );
};

export default Resume;
