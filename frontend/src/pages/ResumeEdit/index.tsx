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
import { UserData, ResumeData, FormStore, CareerData, ProjectData } from 'models/resume-model';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'context/store';

const Resume = () => {
    const [isWorkFormToggle, setIsWorkFormToggle] = useState<boolean>(false);
    const [isprojectFormToggle, setIsProjectFormToggle] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserData>({} as UserData);
    const [resumeTitle, setResumeTitle] = useState<ResumeData>({} as ResumeData);
    const [addJobElement, setAddJobElement] = useState<FormStore[]>([]);
    const [addProjectElement, setAddProjectElement] = useState<FormStore[]>([]);

    const [careerDataAll, setCareerDataAll] = useState<CareerData[]>([]);
    const [getCareerComponents, setGetCareerComponents] = useState<CareerData[]>([]);
    const [carrerIds, setCarrerIds] = useState<number[]>([]);

    const [projectDataAll, setProjectDataAll] = useState<ProjectData[]>([]);
    const [projectIds, setProjectIds] = useState<number[]>([]);

    const params = useParams();
    const resumeIds = params.id;
    const token = localStorage.getItem('accessToken');
    // const value = useSelector<RootState>(state => state.form.workFormToggle);
    // console.log(value, 'susususuusussususu');

    const fetchResume = async () => {
        try {
            const res = await axios.get<
                AxiosResponse<{
                    userData: UserData;
                    resumeData: ResumeData;
                    careersData: CareerData[];
                    projectsData: ProjectData[];
                }>
            >(`/my-portfolio/resumes/${resumeIds}`, {
                headers: { authorization: `Bearer ${token}` },
            });
            const userInfoData = res.data.data.userData;
            const resumeTitle = res.data.data.resumeData;
            const careerData = res.data.data.careersData;
            const projectData = res.data.data.projectsData;

            setResumeTitle(resumeTitle);
            setUserInfo(userInfoData);
            setCareerDataAll(careerData);
            setProjectDataAll(projectData);

            const carrerId = careerDataAll.map(e => e.careerId);
            setCarrerIds(carrerId);

            const projectId = projectDataAll.map(e => e.projectId);
            setProjectIds(projectId);
            console.log(projectDataAll, ' carrData', projectIds, ' carrerIds');
        } catch (err) {
            console.log(err);
        }
    };

    const getJobCarrerData = async (ids: number[]) => {
        const res = await Promise.all(
            ids.map(id => {
                return axios.get(`/my-portfolio/careers/${id}`).then(res => res.data.data);
            }),
        );
        return res;
    };

    // const getProjectData = async (ids: number[]) => {
    //     const res = await Promise.all(
    //         ids.map(id => {
    //             return axios.get(`/my-portfolio/projects/${id}`).then(res => res.data.data);
    //         }),
    //     );
    //     return res;
    // };

    useEffect(() => {
        fetchResume();
    }, [resumeIds, token]);

    useEffect(() => {
        getJobCarrerData(carrerIds).then(result => {
            const newData = [];
            for (let i = 0; i < result.length; i++) {
                newData.push(...result[i]);
                setGetCareerComponents(newData);
            }
        });
    }, [carrerIds]);

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

    const addJobComponents = () => {
        const newJob = [...addJobElement, { list: addJobElement.length, state: false }];
        setAddJobElement(newJob);
        setIsWorkFormToggle(true);
    };
    // console.log(addJob, ' addjob list');

    const addProjectComponents = () => {
        const newProject = [...addProjectElement, { list: addProjectElement.length, state: false }];
        setAddProjectElement(newProject);
        setIsProjectFormToggle(true);
    };
    // console.log(addProject, ' addProject list');

    const handleJobComponent = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        const name = e.currentTarget.name;

        switch (name) {
            case 'update':
                return await axios.patch(`/my-portfolio/careers/${id}`);
            case 'delete': {
                return (
                    await axios.delete(`/my-portfolio/careers/${id}`),
                    setGetCareerComponents([...getCareerComponents])
                );
            }

            default:
                return;
        }
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
                                    <span onClick={addJobComponents}>
                                        <BiPlus className={isWorkFormToggle ? 'rotate' : ''} />
                                    </span>
                                </FormTitle>

                                {getCareerComponents.map((tem: CareerData, idx: number) => {
                                    return (
                                        <ExistForm key={idx}>
                                            <div>
                                                <h1>업무경험 {tem.careerId}</h1>
                                                <ul className="customBtn">
                                                    <li>
                                                        <button
                                                            type="button"
                                                            name="update"
                                                            onClick={e =>
                                                                handleJobComponent(e, tem.careerId)
                                                            }
                                                        >
                                                            수정
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            type="button"
                                                            name="delete"
                                                            onClick={e =>
                                                                handleJobComponent(e, tem.careerId)
                                                            }
                                                        >
                                                            삭제
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="existDiv">
                                                <ul>
                                                    <li>
                                                        {tem.startDate} ~ &nbsp;
                                                        {tem.workNow ? tem.endDate : '재직중'}
                                                    </li>
                                                </ul>

                                                <ul>
                                                    <li>
                                                        <strong>{tem.company}</strong>
                                                    </li>
                                                    <li>{tem.position}</li>
                                                </ul>

                                                <dl>
                                                    <dt>{tem.reward}</dt>
                                                </dl>
                                            </div>
                                        </ExistForm>
                                    );
                                })}

                                {isWorkFormToggle &&
                                    addJobElement.map((jobItem: any, idx: number) => {
                                        return (
                                            <Job
                                                key={idx}
                                                onCareerCreated={state => {
                                                    setCarrerIds([...carrerIds]);
                                                    setGetCareerComponents([
                                                        ...getCareerComponents,
                                                        state,
                                                    ]);
                                                }}
                                                setIsWorkFormToggle={setIsWorkFormToggle}
                                                setAddJobElement={setAddJobElement}
                                                jobItem={jobItem}
                                                addJobElement={addJobElement}
                                                idx={idx}
                                            />
                                        );
                                    })}
                            </section>

                            <section>
                                <FormTitle>
                                    <label>프로젝트</label>
                                    <span onClick={addProjectComponents}>
                                        <BiPlus className={isprojectFormToggle ? 'rotate' : ''} />
                                    </span>
                                </FormTitle>
                                {isprojectFormToggle &&
                                    addProjectElement.map((projectTem: any, idx: number) => {
                                        return (
                                            <Project
                                                key={idx}
                                                setIsProjectFormToggle={setIsProjectFormToggle}
                                                setAddProjectElement={setAddProjectElement}
                                                addProjectElement={addProjectElement}
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
