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
import { DatePicker } from 'antd';
import axios, { AxiosResponse } from 'axios';
import Header from 'components/Header';
import { useParams } from 'react-router-dom';
import { Moment } from 'moment';
import { UserData, ResumeData, WorkFormData } from 'models/resume-model';

const Resume = () => {
    const [isStilWork, setIsStilWork] = useState<boolean>(true);
    const [isWorkFormToggle, setIsWorkFormToggle] = useState<boolean>(false);
    const [projectFormToggle, setProjectFormToggle] = useState<boolean>(false);
    const [workFormDataState, setWorkFormDataState] = useState<WorkFormData>({
        companyName: '',
        jobGroup: '',
        startWork: '',
        endWork: '',
        workPerformance: '',
    });
    // const [projectFromDataState, setProjectFromDataState] = useState<>({});

    // const [value, setValue] = useState<string>('');
    const [userInfo, setUserInfo] = useState<UserData>({} as UserData);
    const [resumeTitle, setResumeTitle] = useState<ResumeData>({} as ResumeData);

    const params = useParams();
    const resumeIds = params.id;
    const token = localStorage.getItem('accessToken');
    console.log('id ======================================', resumeIds);

    useEffect(() => {
        async function fetchResume() {
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
                console.log(
                    res.data.data,
                    'infoData ==========================================================================',
                    userInfoData,
                    'resumeTitle =====================================================================',
                    resumeTitle,
                );
            } catch (err) {
                console.log(err);
            }
        }
        fetchResume();
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

    console.log(workFormDataState, 'datadata 1231 123 123 ');
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
            console.log(res, '123123123 - post');
        } catch (err: unknown) {
            console.log(err);
        }
    };

    // const patchPo = async () => {
    //     console.log(
    //         '========================================================================',
    //         value,
    //     );
    //     try {
    //         const res = await axios.patch(`/my-portfolio/resumes/${resumeIds}`, {
    //             position: '왜 안되냐',
    //         });
    //     } catch (err: unknown) {
    //         console.log(err);
    //     }
    // };

    const choiceJob = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const posionValue = e.target.value;
        // setValue(value);
        // console.log(value, 'value value value');
        try {
            const res = await axios.patch(`/my-portfolio/resumes/${resumeIds}`, {
                position: posionValue,
            });
            console.log(res);
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
                                                            />
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>진행 연도</dt>
                                                        <dd>
                                                            <select>
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
                                                    <input type="text" placeholder="스택 입력" />
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
                                                    ></textarea>
                                                </li>
                                            </ul>

                                            <section style={{ paddingTop: '2rem' }}>
                                                <ul>
                                                    <li>
                                                        <label>저장소</label>
                                                    </li>
                                                    <li style={{ paddingBottom: '1rem' }}>
                                                        <input type="url" placeholder="URL" />
                                                    </li>
                                                    <li>
                                                        <input type="url" placeholder="URL" />
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
                                                <button type="submit">저장</button>
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
