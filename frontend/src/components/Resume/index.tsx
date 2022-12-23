import React, {
    FunctionComponent,
    MouseEventHandler,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { ResumeContainer, ResumeFrame, UserInfo, FormTitle, InputForm, Title } from './style';
import { BiPlus } from '@react-icons/all-files/bi/BiPlus';
import { BiEdit } from '@react-icons/all-files/bi/BiEdit';
import { GiCancel } from '@react-icons/all-files/gi/GiCancel';
import { DatePicker } from 'antd';
import axios, { AxiosResponse } from 'axios';
import Header from 'components/Header';
import { useParams } from 'react-router-dom';
import { Moment } from 'moment';
import { UserData, ResumeData, WorkFormData, ProjectFormData, Stack } from 'models/resume-model';

const Resume = () => {
    const [isStilWork, setIsStilWork] = useState<boolean>(true);
    const [isWorkFormToggle, setIsWorkFormToggle] = useState<boolean>(false);
    const [projectFormToggle, setProjectFormToggle] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserData>({} as UserData);
    const [resumeTitle, setResumeTitle] = useState<ResumeData>({} as ResumeData);
    const [projectFormDataState, setProjectFormDataState] = useState<ProjectFormData>({
        projectName: '',
        year: '',
        information: '',
        link1: '',
        link2: '',
        stacks: [],
    });
    const [workFormDataState, setWorkFormDataState] = useState<WorkFormData>({
        companyName: '',
        jobGroup: '',
        startWork: '',
        endWork: '',
        workPerformance: '',
    });

    const [searchStackToggle, setSearchStackToggle] = useState<boolean>(false);
    const [AllStacks, setAllStacks] = useState([]);
    const [stackInputValue, setStackInputValue] = useState<string>('');
    const [tagListItem, setTagListItem] = useState<string[]>([]);
    const [tagItemActive, setTagItemActive] = useState<boolean>(false);

    const params = useParams();
    const resumeIds = params.id;
    const token = localStorage.getItem('accessToken');

    const getStack = async () => {
        try {
            const res = await axios.get<AxiosResponse>(`/my-portfolio/skills`);
            const data = res.data.data;
            setAllStacks(data);
        } catch (err: unknown) {
            console.log(err);
        }
    };

    const fetchResume = async () => {
        try {
            const res = await axios.get<
                AxiosResponse<{ userData: UserData; resumeData: ResumeData }>
            >(`/my-portfolio/resumes/${resumeIds}`, {
                headers: { authorization: `Bearer ${token}` },
            });
            const userInfoData = res.data.data.userData;
            const resumeTitle = res.data.data.resumeData;
            setResumeTitle(resumeTitle);
            setUserInfo(userInfoData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchResume();
        getStack();
    }, [resumeIds, token]);

    const workFormHandler = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const target = e.target;

        setWorkFormDataState({
            ...workFormDataState,
            [target.name]: target.value,
        });
    };

    const workStartTimeHandler = (date: any, dateString: string) => {
        setWorkFormDataState({
            ...workFormDataState,
            startWork: dateString,
        });
    };

    const workEndTimeHandler = (date: any, dateString: string) => {
        setWorkFormDataState({
            ...workFormDataState,
            endWork: dateString,
        });
    };

    const createWorkForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/my-portfolio/resumes/${resumeIds}/new-career`, {
                company: workFormDataState.companyName,
                position: workFormDataState.jobGroup,
                startDate: workFormDataState.startWork,
                endDate: workFormDataState.endWork,
                reward: workFormDataState.workPerformance,
            });
        } catch (err: unknown) {
            console.log(err);
        }
    };

    const changeStackValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setStackInputValue(e.target.value);
    };

    const enterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') e.preventDefault();
    };

    const searchStackBlur = (e: React.FocusEvent<HTMLElement>) => {
        setSearchStackToggle(!searchStackToggle);
    };

    const addTagList = (tagItem: string, idx: number) => {
        console.log(tagItem, '123123123 - oncl');
        const newTagItem = new Set<string>([...tagListItem]);
        newTagItem.add(tagItem);
        setTagListItem([...newTagItem]);
    };

    const stackFilter = AllStacks.filter((tem: { name: string; skillId: number }) =>
        tem.name.toLowerCase().includes(stackInputValue.toLowerCase()),
    );

    const deleteTagItem = (idx: number) => {
        const filterTagItem = tagListItem.filter((tem, id) => id !== idx);
        setTagListItem(filterTagItem);
    };

    const projectFormHandler = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const target = e.target;
        setProjectFormDataState({
            ...projectFormDataState,
            [target.name]: target.value,
        });
    };

    useEffect(() => {
        setProjectFormDataState({
            ...projectFormDataState,
            stacks: [...tagListItem],
        });
        console.log(projectFormDataState.stacks);
    }, [tagListItem]);

    console.log(projectFormDataState, 'propropropropropropropropropropropro', tagListItem);

    const choiceJob = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const posionValue = e.target.value;

        try {
            const res = await axios.patch(`/my-portfolio/resumes/${resumeIds}`, {
                position: posionValue,
            });
        } catch (err: unknown) {
            console.log(err);
        }
    };

    const createProjectForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/my-portfolio/resumes/${resumeIds}/new-project`, {
                projectName: projectFormDataState.projectName,
                year: projectFormDataState.year,
                information: projectFormDataState.information,
                link1: projectFormDataState.link1,
                link2: projectFormDataState.link2,
                skills: projectFormDataState.stacks,
            });
            console.log(res, ' project sususususususususuussusu');
        } catch (err: unknown) {
            console.log(err);
        }
    };

    // const JobEx: FunctionComponent = () => {
    //     return (
    //         <form>
    //             <div className="formWrap">
    //                 <ul>
    //                     <li>
    //                         <dl>
    //                             <dt>회사명</dt>
    //                             <dd>
    //                                 <input
    //                                     type="text"
    //                                     name="companyName"
    //                                     placeholder="회사 이름"
    //                                     value={workFormDataState.companyName}
    //                                     onChange={workFormHandler}
    //                                 />
    //                             </dd>
    //                         </dl>
    //                         <dl>
    //                             <dt>직무</dt>
    //                             <dd>
    //                                 <input
    //                                     type="text"
    //                                     name="jobGroup"
    //                                     placeholder="프론트엔드"
    //                                     value={workFormDataState.jobGroup}
    //                                     onChange={workFormHandler}
    //                                 />
    //                             </dd>
    //                         </dl>
    //                         <dl className="noneDevelop">
    //                             <dt>
    //                                 <input type="checkbox" name="noneDevelop" />
    //                             </dt>
    //                             <dd>
    //                                 <label>비개발 경력</label>
    //                             </dd>
    //                         </dl>
    //                     </li>
    //                 </ul>

    //                 <ul>
    //                     <li>
    //                         <dl>
    //                             <dt>
    //                                 <label>입사</label>
    //                                 <small>재직 중 </small>
    //                                 <label className="switch">
    //                                     <input
    //                                         type="checkbox"
    //                                         checked={isStilWork ? true : false}
    //                                         onChange={(): void => setIsStilWork(!isStilWork)}
    //                                     />
    //                                     <span className="slider"></span>
    //                                 </label>
    //                             </dt>

    //                             <dd>
    //                                 <DatePicker
    //                                     placeholder="YYYY-MM"
    //                                     picker="month"
    //                                     onChange={(date, dateString): void =>
    //                                         console.log('asd', dateString)
    //                                     }
    //                                 />
    //                             </dd>
    //                         </dl>
    //                         {!isStilWork && (
    //                             <dl>
    //                                 <dt>퇴사</dt>
    //                                 <dd>
    //                                     <DatePicker placeholder="YYYY-MM" picker="month" />
    //                                 </dd>
    //                             </dl>
    //                         )}
    //                     </li>
    //                 </ul>

    //                 <ul>
    //                     <li>
    //                         <label>업무 성과</label>
    //                     </li>
    //                     <li>
    //                         <textarea
    //                             maxLength={500}
    //                             placeholder={`구체적인 역할과 성과 위주의 글을 작성해보세요. \n수치와 함께 표현되면 경험이 잘 전달될 수 있습니다.`}
    //                         ></textarea>
    //                     </li>
    //                 </ul>
    //             </div>

    //             <div className="formBtn">
    //                 <button type="button" onClick={() => setIsWorkFormToggle(!isWorkFormToggle)}>
    //                     취소
    //                 </button>
    //                 <button type="submit">저장</button>
    //             </div>
    //         </form>
    //     );
    // };

    return (
        <>
            <Header />
            <ResumeContainer>
                <ResumeFrame>
                    <UserInfo>
                        <Title>
                            <input type="text" readOnly value={`${resumeTitle.resumeName}`} />
                            <span>
                                <button type="button">
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
                                    <span onClick={() => setIsWorkFormToggle(!isWorkFormToggle)}>
                                        <BiPlus className={isWorkFormToggle ? 'rotate' : ''} />
                                    </span>
                                </FormTitle>

                                {isWorkFormToggle && (
                                    <form>
                                        <div className="formWrap">
                                            <ul>
                                                <li>
                                                    <dl>
                                                        <dt>회사명</dt>
                                                        <dd>
                                                            <input
                                                                type="text"
                                                                name="companyName"
                                                                placeholder="회사 이름"
                                                                value={
                                                                    workFormDataState.companyName
                                                                }
                                                                onChange={workFormHandler}
                                                            />
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>직무</dt>
                                                        <dd>
                                                            <input
                                                                type="text"
                                                                name="jobGroup"
                                                                placeholder="프론트엔드"
                                                                value={workFormDataState.jobGroup}
                                                                onChange={workFormHandler}
                                                            />
                                                        </dd>
                                                    </dl>
                                                    <dl className="noneDevelop">
                                                        <dt>
                                                            <input
                                                                type="checkbox"
                                                                name="noneDevelop"
                                                            />
                                                        </dt>
                                                        <dd>
                                                            <label>비개발 경력</label>
                                                        </dd>
                                                    </dl>
                                                </li>
                                            </ul>

                                            <ul>
                                                <li>
                                                    <dl>
                                                        <dt>
                                                            <label>입사</label>
                                                            <small>재직 중 </small>
                                                            <label className="switch">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        isStilWork ? true : false
                                                                    }
                                                                    onChange={(): void =>
                                                                        setIsStilWork(!isStilWork)
                                                                    }
                                                                />
                                                                <span className="slider"></span>
                                                            </label>
                                                        </dt>

                                                        <dd>
                                                            <DatePicker
                                                                placeholder="YYYY-MM"
                                                                picker="month"
                                                                name="startWork"
                                                                onChange={workStartTimeHandler}
                                                            />
                                                        </dd>
                                                    </dl>
                                                    {!isStilWork && (
                                                        <dl>
                                                            <dt>퇴사</dt>
                                                            <dd>
                                                                <DatePicker
                                                                    placeholder="YYYY-MM"
                                                                    picker="month"
                                                                    name="endWork"
                                                                    onChange={workEndTimeHandler}
                                                                />
                                                            </dd>
                                                        </dl>
                                                    )}
                                                </li>
                                            </ul>

                                            <ul>
                                                <li>
                                                    <label>업무 성과</label>
                                                </li>
                                                <li>
                                                    <textarea
                                                        maxLength={500}
                                                        placeholder={`구체적인 역할과 성과 위주의 글을 작성해보세요. \n수치와 함께 표현되면 경험이 잘 전달될 수 있습니다.`}
                                                        name="workPerformance"
                                                        onChange={workFormHandler}
                                                    ></textarea>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="formBtn">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIsWorkFormToggle(!isWorkFormToggle)
                                                }
                                            >
                                                취소
                                            </button>
                                            <button type="submit" onClick={createWorkForm}>
                                                저장
                                            </button>
                                        </div>
                                    </form>
                                )}
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
                                {projectFormToggle && (
                                    <form>
                                        <div className="formWrap">
                                            <ul>
                                                <li>
                                                    <dl>
                                                        <dt>프로젝트 이름</dt>
                                                        <dd>
                                                            <input
                                                                type="text"
                                                                placeholder="프로젝트 이름을 입력해주세요."
                                                                name="projectName"
                                                                onChange={projectFormHandler}
                                                            />
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>진행 연도</dt>
                                                        <dd>
                                                            <select
                                                                onChange={projectFormHandler}
                                                                name="year"
                                                            >
                                                                <option value="none">
                                                                    제작 연도
                                                                </option>
                                                                <option>2023</option>
                                                                <option>2022</option>
                                                                <option>2021</option>
                                                                <option>2020</option>
                                                                <option>2019</option>
                                                                <option>2018</option>
                                                                <option>2017</option>
                                                                <option>2016</option>
                                                                <option>2015</option>
                                                                <option>2014</option>
                                                                <option>2013</option>
                                                                <option>2012</option>
                                                                <option>2011</option>
                                                                <option>2010</option>
                                                                <option>2009</option>
                                                                <option>2008</option>
                                                                <option>2007</option>
                                                                <option>2006</option>
                                                                <option>2005</option>
                                                                <option>2004</option>
                                                                <option>2003</option>
                                                                <option>2002</option>
                                                                <option>2001</option>
                                                                <option>2000</option>
                                                            </select>
                                                        </dd>
                                                    </dl>
                                                </li>
                                            </ul>

                                            <ul>
                                                <li>
                                                    <label>사용 기술 스택</label>
                                                </li>

                                                <li>
                                                    {tagListItem.map((tem, idx) => {
                                                        return (
                                                            <div key={idx}>
                                                                <span>{tem}</span>
                                                                <button
                                                                    type="button"
                                                                    onClick={(): void =>
                                                                        deleteTagItem(idx)
                                                                    }
                                                                >
                                                                    <GiCancel />
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                    <input
                                                        type="text"
                                                        placeholder="스택 입력"
                                                        onFocus={() =>
                                                            setSearchStackToggle(!searchStackToggle)
                                                        }
                                                        onKeyPress={enterKeyPress}
                                                        onChange={changeStackValue}
                                                    />
                                                    <article
                                                        className={
                                                            searchStackToggle ? 'block' : 'none'
                                                        }
                                                    >
                                                        {stackFilter.length === 0 &&
                                                            AllStacks.map(
                                                                (
                                                                    stack: { name: string },
                                                                    idx: number,
                                                                ) => {
                                                                    return (
                                                                        <dl key={idx}>
                                                                            <dt>{stack.name}</dt>
                                                                        </dl>
                                                                    );
                                                                },
                                                            )}
                                                        {stackFilter.map(
                                                            (
                                                                tem: { name: string },
                                                                idx: number,
                                                            ) => {
                                                                return (
                                                                    <dl key={idx}>
                                                                        <dt
                                                                            onClick={() =>
                                                                                addTagList(
                                                                                    tem.name,
                                                                                    idx,
                                                                                )
                                                                            }
                                                                        >
                                                                            {tem.name}
                                                                        </dt>
                                                                    </dl>
                                                                );
                                                            },
                                                        )}
                                                    </article>
                                                </li>
                                            </ul>

                                            <ul>
                                                <li>
                                                    <label>프로젝트 간단 소개</label>
                                                </li>
                                                <li>
                                                    <textarea
                                                        maxLength={500}
                                                        placeholder="프로젝트에서 나의 역할, 구체적인 기능을 명시하는것이 좋습니다."
                                                        name="information"
                                                        onChange={projectFormHandler}
                                                    ></textarea>
                                                </li>
                                            </ul>

                                            <section style={{ paddingTop: '3.2rem' }}>
                                                <ul>
                                                    <li>
                                                        <label>저장소</label>
                                                    </li>
                                                    <li style={{ paddingBottom: '1.6rem' }}>
                                                        <input
                                                            type="url"
                                                            placeholder="URL"
                                                            name="link1"
                                                            onChange={projectFormHandler}
                                                        />
                                                    </li>
                                                    <li>
                                                        <input
                                                            type="url"
                                                            placeholder="URL"
                                                            name="link2"
                                                            onChange={projectFormHandler}
                                                        />
                                                    </li>
                                                </ul>
                                            </section>

                                            <div className="formBtn">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setProjectFormToggle(!projectFormToggle)
                                                    }
                                                >
                                                    취소
                                                </button>
                                                <button type="submit" onClick={createProjectForm}>
                                                    저장
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </section>
                        </div>
                    </InputForm>
                </ResumeFrame>
            </ResumeContainer>
        </>
    );
};

export default Resume;
