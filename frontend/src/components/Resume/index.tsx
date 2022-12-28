import { useState, useEffect } from 'react';
import API from 'utils/api';
import * as S from './style';
import { careerDataRes, projectDataRes, resumeDataRes, userDataRes } from 'models/resume-model';
import { Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;

const Resume = ({ resumeId }: any) => {
    console.log(resumeId, 'resumeId');
    const [careerData, setCareerData] = useState<careerDataRes[]>([]);
    const [projectData, setProjectData] = useState<projectDataRes[]>([]);
    const [resumeData, setResumeData] = useState<resumeDataRes>();
    const [userData, setUserData] = useState<userDataRes>();

    async function getResume() {
        try {
            const res = await API.get(`/my-portfolio/resumes/${resumeId}`);
            setCareerData(res.careersData);
            setProjectData(res.projectsData);
            setResumeData(res.resumeData);
            setUserData(res.userData);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getResume();
    }, []);

    return (
        <>
            <S.TopSection>
                <h1>{resumeData?.resumeName}</h1>
                <div className="infoWrap">
                    <label>{userData?.username}</label>
                    <div>
                        <img src={userData?.avatarUrl} alt={'프로필사진'}></img>
                        <dl>
                            <dt>소개 : {resumeData?.intro}</dt>
                            <dt>포지션 : {resumeData?.position}</dt>
                            <dt>이메일 : {userData?.email}</dt>
                        </dl>
                    </div>
                </div>
            </S.TopSection>

            <S.ResumeFrame>
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
                            <Paragraph strong>기간:</Paragraph>
                            <Paragraph>
                                {data.startDate}~{data.endDate}&nbsp;&nbsp;&nbsp;
                            </Paragraph>
                            <Paragraph strong>포지션:</Paragraph>
                            <Paragraph> {data.position}&nbsp;&nbsp;&nbsp;</Paragraph>
                            <Paragraph strong>리워드가뭐야?: </Paragraph>
                            <Paragraph>{data.reward}&nbsp;&nbsp;&nbsp;</Paragraph>
                        </div>
                    </S.BorderDiv>
                ))}
            </S.ResumeFrame>
        </>
    );
};

export default Resume;
