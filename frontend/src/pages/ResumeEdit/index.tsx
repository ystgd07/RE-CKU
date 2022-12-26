import React, { useEffect, useState } from 'react';
import {
    ResumeContainer,
    ResumeFrame,
    UserInfo,
    FormTitle,
    InputForm,
    Title,
    ExistForm,
} from './style';
import { BiPlus } from '@react-icons/all-files/bi/BiPlus';
import { BiEdit } from '@react-icons/all-files/bi/BiEdit';
import axios, { AxiosResponse } from 'axios';
import Header from 'components/Header';
import { useParams } from 'react-router-dom';
import Job from './Job';
import Project from './Project';
import { UserData, ResumeData, FormStore, CareerData } from 'models/resume-model';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'context/store';

const Resume = () => {
    const [isWorkFormToggle, setIsWorkFormToggle] = useState<boolean>(false);
    const [isprojectFormToggle, setIsProjectFormToggle] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserData>({} as UserData);
    const [resumeTitle, setResumeTitle] = useState<ResumeData>({} as ResumeData);
    const [addJob, setAddJob] = useState<FormStore[]>([]);
    const [addProject, setAddProject] = useState<FormStore[]>([]);

    const [careerData, setCareerData] = useState<CareerData[]>([]);
    const [getCareeData, setGetCareeData] = useState<CareerData[]>([]);
    const [carrIds, setCarrIds] = useState<number[]>([]);

    const params = useParams();
    const resumeIds = params.id;
    const token = localStorage.getItem('accessToken');
    const value = useSelector<RootState>(state => state.form.workFormToggle);
    console.log(value, 'susususuusussususu');

    const fetchResume = async () => {
        try {
            const res = await axios.get<
                AxiosResponse<{
                    userData: UserData;
                    resumeData: ResumeData;
                    careersData: CareerData[];
                }>
            >(`/my-portfolio/resumes/${resumeIds}`, {
                headers: { authorization: `Bearer ${token}` },
            });
            const userInfoData = res.data.data.userData;
            const resumeTitle = res.data.data.resumeData;
            const careerData = res.data.data.careersData;
            setResumeTitle(resumeTitle);
            setUserInfo(userInfoData);
            setCareerData(careerData);

            const carrerIds = careerData.map(e => e.careerId);
            setCarrIds(carrerIds);
            console.log(careerData, ' carrData', carrerIds, ' carrIds');
        } catch (err) {
            console.log(err);
        }
    };

    console.log(carrIds, ' carrids');

    const getJob = async (ids: number[]) => {
        const res = await Promise.all(
            ids.map(id => {
                return axios.get(`/my-portfolio/careers/${id}`).then(res => res.data.data);
            }),
        );
        return res;

        // const res = carrIds.map(async ids => {
        //     return await axios.get(`/my-portfolio/careers/${ids}`).then(result => result);
        // });
        // return res;
    };

    useEffect(() => {
        fetchResume();
    }, [resumeIds, token]);

    useEffect(() => {
        // getJob()
        //     .then(res => res.json())
        //     .then(data => console.log(data));
        getJob(carrIds).then(result => {
            // const newData = [...result];
            // console.log(newData, 'data');
            const newData = [];
            for (let i = 0; i < result.length; i++) {
                newData.push(...result[i]);
                setGetCareeData(newData);
            }
        });
    }, [carrIds]);

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
        const newJob = [...addJob, { list: addJob.length, state: false }];
        setAddJob(newJob);
        setIsWorkFormToggle(true);
    };
    // console.log(addJob, ' addjob list');

    const addProjectEl = () => {
        const newProject = [...addProject, { list: addProject.length, state: false }];
        setAddProject(newProject);
        setIsProjectFormToggle(true);
    };
    // console.log(addProject, ' addProject list');

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
                                <li>
                                    <textarea
                                        placeholder="채용자에게 지원자님을 소개해주세요. (최대 200자)"
                                        maxLength={200}
                                        rows={3}
                                        autoComplete="off"
                                    ></textarea>
                                </li>
                            </ul>
                        </div>
                    </UserInfo>
                    <InputForm>
                        <div className="inputFlex">
                            <section>
                                <div className="positionDiv">
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
                                </div>
                            </section>

                            <section>
                                <FormTitle>
                                    <label>업무경험</label>
                                    <span onClick={addJobEl}>
                                        <BiPlus className={isWorkFormToggle ? 'rotate' : ''} />
                                    </span>
                                </FormTitle>

                                {getCareeData.map((tem: CareerData, idx: number) => {
                                    return (
                                        <ExistForm key={idx}>
                                            {/* <div>
                                                <h1>업무경험 {idx}</h1>
                                                <button>수정</button>
                                                <button>삭제</button>
                                            </div> */}
                                            <div className="existDiv">
                                                <ul>
                                                    <li>
                                                        {tem.startDate} ~ &nbsp;
                                                        {tem.workNow ? '재직중' : tem.endDate}
                                                    </li>
                                                </ul>

                                                <ul>
                                                    <li>
                                                        <strong>{tem.company}</strong>
                                                    </li>
                                                    <li>직무: {tem.position}</li>
                                                </ul>

                                                <dl>
                                                    <dt>성과</dt>
                                                    <dt>{tem.reward}</dt>
                                                </dl>
                                            </div>
                                        </ExistForm>
                                    );
                                })}

                                {isWorkFormToggle &&
                                    addJob.map((jobItem: any, idx: number) => {
                                        return (
                                            <Job
                                                key={idx}
                                                // onCareerCreated={(state: workFormState) => {}}
                                                setIsWorkFormToggle={setIsWorkFormToggle}
                                                setAddJob={setAddJob}
                                                jobItem={jobItem}
                                                addJob={addJob}
                                                idx={idx}
                                            />
                                        );
                                    })}
                            </section>

                            <section>
                                <FormTitle>
                                    <label>프로젝트</label>
                                    <span onClick={addProjectEl}>
                                        <BiPlus className={isprojectFormToggle ? 'rotate' : ''} />
                                    </span>
                                </FormTitle>
                                {isprojectFormToggle &&
                                    addProject.map((projectTem: any, idx: number) => {
                                        return (
                                            <Project
                                                key={idx}
                                                setIsProjectFormToggle={setIsProjectFormToggle}
                                                setAddProject={setAddProject}
                                                addProject={addProject}
                                                idx={idx}
                                            />
                                        );
                                    })}
                            </section>
                        </div>
                    </InputForm>
                </ResumeFrame>
            </ResumeContainer>
        </>
    );
};

export default Resume;
