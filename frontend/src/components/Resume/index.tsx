import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { ResumeContainer, ResumeFrame, UserInfo, FormTitle, InputForm, Title } from './style';
import { BiPlus } from '@react-icons/all-files/bi/BiPlus';
import { BiEdit } from '@react-icons/all-files/bi/BiEdit';
import { DatePicker } from 'antd';
import axios from 'axios';
import Header from 'components/Header';
import { useParams } from 'react-router-dom';

const Resume = () => {
    const [swtich, setSwtich] = useState<boolean>(true);
    const [formToggle, setFormToggle] = useState<boolean>(false);
    const [formToggle2, setFormToggle2] = useState<boolean>(false);
    const [formc, setFormc] = useState<ReactElement[]>([]);
    const [userInfo, setUserInfo] = useState([]);

    // interface user = {

    //         username: string;
    //         avatarUrl: string;
    //         created: string;
    //         email: string;
    //         id: number;
    //         phoneNumber?: number;
    //         username: string;
    // };

    // Record<string, string | number | boolean>

    const choiceJob = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value, '123');
    };

    const params = useParams();
    const ids = params.id;
    console.log(params.id, 'ididididididid');
    const token = localStorage.getItem('accessToken');

    async function fetchResume() {
        try {
            const res = await axios.get(`/myportfolio/resume/${ids}`, {
                headers: { authorization: `Bearer ${token}` },
            });
            const data = res.data;
            setUserInfo(data);
            console.log(userInfo, 'infoinfoinfoinfoinfoinfo', data);

            // const { username, phoneNumber, email } = data;
            // console.log(res, data, '123123123123', username, phoneNumber, email);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchResume();
    }, []);

    const JobEx: FunctionComponent = () => {
        return (
            <form>
                <div className="formWrap">
                    <ul>
                        <li>
                            <dl>
                                <dt>회사명</dt>
                                <dd>
                                    <input type="text" placeholder="회사 이름" />
                                </dd>
                            </dl>
                            <dl>
                                <dt>직무</dt>
                                <dd>
                                    <input type="text" placeholder="프론트엔드" />
                                </dd>
                            </dl>
                            <dl className="noneDevelop">
                                <dt>
                                    <input type="checkbox" />
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
                                            checked={swtich ? true : false}
                                            onChange={(): void => setSwtich(!swtich)}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </dt>

                                <dd>
                                    <DatePicker
                                        placeholder="YYYY-MM"
                                        picker="month"
                                        onChange={(date, dateString): void =>
                                            console.log('asd', dateString)
                                        }
                                    />
                                </dd>
                            </dl>
                            {!swtich && (
                                <dl>
                                    <dt>퇴사</dt>
                                    <dd>
                                        <DatePicker placeholder="YYYY-MM" picker="month" />
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
                            ></textarea>
                        </li>
                    </ul>
                </div>

                <div className="formBtn">
                    <button type="button" onClick={() => setFormToggle(!formToggle)}>
                        취소
                    </button>
                    <button type="submit">저장</button>
                </div>
            </form>
        );
    };

    return (
        <>
            <Header />
            <ResumeContainer>
                <ResumeFrame>
                    <UserInfo>
                        <Title>
                            <input type="text" value={`Title`} />
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
                                        // value={`${userInfo.userData.username}`}
                                    />
                                </li>
                                <li>
                                    <small>Email</small>{' '}
                                    <input
                                        type="email"
                                        placeholder="이메일"
                                        // value={`${users.email}`}
                                    />
                                </li>
                                <li>
                                    <small>Phone</small>
                                    <input
                                        type="tel"
                                        placeholder="연락처"
                                        // value={`${users.phoneNumber}`}
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
                                    <select onChange={choiceJob}>
                                        <option selected disabled>
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
                                    <span onClick={() => setFormToggle(!formToggle)}>
                                        <BiPlus className={formToggle ? 'rotate' : ''} />
                                    </span>
                                </FormTitle>

                                {formToggle && <JobEx />}
                            </section>

                            <section>
                                <FormTitle>
                                    <label>프로젝트</label>
                                    <span onClick={(): void => setFormToggle2(!formToggle2)}>
                                        <BiPlus className={formToggle2 ? 'rotate' : ''} />
                                    </span>
                                </FormTitle>
                                {formToggle2 && (
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
                                                    onClick={() => setFormToggle2(!formToggle2)}
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
