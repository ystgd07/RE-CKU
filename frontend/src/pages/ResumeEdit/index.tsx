import React, { FunctionComponent, useEffect, useState } from 'react';
import { ResumeContainer, ResumeFrame, UserInfo, FormTitle, InputForm, Title } from './style';
import { BiPlus } from '@react-icons/all-files/bi/BiPlus';
import { BiEdit } from '@react-icons/all-files/bi/BiEdit';
import axios, { AxiosResponse } from 'axios';
import Header from 'components/Header';
import { useParams } from 'react-router-dom';
import Job from './Job';
import Project from './Project';
import { UserData, ResumeData, FormStore, CareerData, WorkFormData } from 'models/resume-model';
import { useSelector, useDispatch } from 'react-redux';

const Resume = () => {
    const [isWorkFormToggle, setIsWorkFormToggle] = useState<boolean>(false);
    const [projectFormToggle, setProjectFormToggle] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserData>({} as UserData);
    const [resumeTitle, setResumeTitle] = useState<ResumeData>({} as ResumeData);
    const [addJob, setAddJob] = useState<FormStore[]>([]);
    const [careerData, setCareerData] = useState<CareerData[]>([]);

    const params = useParams();
    const resumeIds = params.id;
    const token = localStorage.getItem('accessToken');
    // const value = useSelector<boolean>(state => state.form.workFormToggle);
    // console.log(value, 'susususuusussususu');

    const fetchResume = async () => {
        try {
            const res = await axios.get<
                AxiosResponse<{
                    userData: UserData;
                    resumeData: ResumeData;
                    careersData: CareerData;
                }>
            >(`/my-portfolio/resumes/${resumeIds}`, {
                headers: { authorization: `Bearer ${token}` },
            });
            const userInfoData = res.data.data.userData;
            const resumeTitle = res.data.data.resumeData;
            const careerId = res.data.data.careersData;
            const newCar = [...careerData, { ...careerId }];
            setResumeTitle(resumeTitle);
            setUserInfo(userInfoData);
            setCareerData(newCar);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    console.log(careerData);
    const caId = careerData.filter(e => e.careerId);
    console.log(caId);

    useEffect(() => {
        fetchResume();
    }, [resumeIds, token]);

    const choiceJob = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const posionValue = e.target.value;
        try {
            await axios.patch(`/my-portfolio/resumes/${resumeIds}`, {
                position: posionValue,
            });
        } catch (err: unknown) {
            console.log(err);
        }
    };

    const resumeNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResumeTitle({
            ...resumeTitle,
            title: e.target.value,
        });
    };

    const resumeNameChange = async () => {
        try {
            const res = await axios.patch(`/my-portfolio/resumes/${resumeIds}`, {
                name: resumeTitle.title,
            });

            console.log(res);
        } catch (err: unknown) {
            console.log(err);
        }
    };

    const addJobEl = () => {
        const newJob = [...addJob, { list: 1, state: false }];
        setAddJob(newJob);
        setIsWorkFormToggle(true);
    };
    console.log(addJob);
    const getJob = () => {
        const res = axios.get(`/my-portfolio/careers/:careerId`);
    };

    return (
        <>
            <Header />
            <ResumeContainer>
                <ResumeFrame>
                    <UserInfo>
                        <Title>
                            <input
                                type="text"
                                defaultValue={resumeTitle.resumeName}
                                onChange={resumeNameValue}
                            />
                            <span>
                                <button type="button" onClick={resumeNameChange}>
                                    <BiEdit />
                                </button>
                            </span>
                        </Title>
                        <div className="userFlex">
                            <ul>
                                <li>
                                    <input
                                        type="text"
                                        placeholder="name"
                                        readOnly
                                        value={`${userInfo.username}`}
                                    />
                                </li>
                                <li>
                                    <small>Email</small>{' '}
                                    <input
                                        type="email"
                                        placeholder="이메일"
                                        readOnly
                                        value={`${userInfo.email}`}
                                    />
                                </li>
                                <li>
                                    <small>Phone</small>
                                    <input
                                        type="tel"
                                        placeholder="연락처"
                                        readOnly
                                        value={`${userInfo.phoneNumber}`}
                                    />
                                </li>
                                {/* <li>
                                    <textarea
                                        placeholder="채용자에게 지원자님을 소개해주세요. (최대 200자)"
                                        maxLength={200}
                                        rows={3}
                                        autoComplete="off"
                                    ></textarea>
                                </li> */}
                            </ul>
                        </div>
                    </UserInfo>
                    <InputForm>
                        <div className="inputFlex">
                            <section>
                                <div>
                                    <select onChange={choiceJob} defaultValue={'position'}>
                                        <option value="position" disabled>
                                            포지션 선택
                                        </option>
                                        <option>전체</option>
                                        <option>개발</option>
                                        <option>게임개발</option>
                                        <option>디자인</option>
                                        <option>기획</option>
                                    </select>
                                    {/* <button type="button" onClick={patchPo}>
                                        저장
                                    </button> */}
                                </div>
                            </section>

                            <section>
                                <FormTitle>
                                    <label>업무경험</label>
                                    <span onClick={addJobEl}>
                                        <BiPlus className={isWorkFormToggle ? 'rotate' : ''} />
                                    </span>
                                </FormTitle>

                                {isWorkFormToggle &&
                                    addJob.map((_, idx) => {
                                        return (
                                            <Job
                                                key={idx}
                                                setIsWorkFormToggle={setIsWorkFormToggle}
                                                setAddJob={setAddJob}
                                            />
                                        );
                                    })}
                            </section>

                            <section>
                                <FormTitle>
                                    <label>프로젝트</label>
                                    <span
                                        onClick={(): void =>
                                            setProjectFormToggle(!projectFormToggle)
                                        }
                                    >
                                        <BiPlus className={projectFormToggle ? 'rotate' : ''} />
                                    </span>
                                </FormTitle>
                                {projectFormToggle && <Project />}
                            </section>
                        </div>
                    </InputForm>
                </ResumeFrame>
            </ResumeContainer>
        </>
    );
};

export default Resume;
