import React, { useState } from 'react';
import { ResumeContainer, ResumeFrame, UserInfo, FormTitle, InputForm } from './style';
import { BsPlusCircle } from '@react-icons/all-files/bs/BsPlusCircle';
import { DatePicker } from 'antd';
import Pica from 'assets/images/pica.jpeg';

const Resume = () => {
    const [toggle, setToggle] = useState<boolean>(false);
    return (
        <ResumeContainer>
            <ResumeFrame>
                <UserInfo>
                    <div className="userFlex">
                        <ul>
                            <li>
                                <input type="text" placeholder="name" value={`이다노`} />
                            </li>
                            <li>
                                <small>Email</small>{' '}
                                <input
                                    type="email"
                                    placeholder="이메일"
                                    value={`eksh7080@naver.com`}
                                />
                            </li>
                            <li>
                                <small>Phone</small>
                                <input type="tel" placeholder="연락처" value={`010-3993-3263`} />
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
                            <label>포지션 선택</label>
                            <div>
                                <select>
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
                                <span>
                                    <BsPlusCircle />
                                </span>
                            </FormTitle>
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
                                                            checked={toggle ? true : false}
                                                            onChange={(): void =>
                                                                setToggle(!toggle)
                                                            }
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
                                            {toggle && (
                                                <dl>
                                                    <dt>퇴사</dt>
                                                    <dd>
                                                        <DatePicker
                                                            placeholder="YYYY-MM"
                                                            picker="month"
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
                                            ></textarea>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <button type="button">취소</button>
                                    <button type="submit">저장</button>
                                </div>
                            </form>
                        </section>

                        <section>
                            <label>프로젝트</label>
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
                                </li>
                                <li>
                                    <dl>
                                        <dt>진행 연도</dt>
                                        <dd>
                                            <select>
                                                <option value="none">제작 연도</option>
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

                            <p>
                                <input type="text" placeholder="저장소 URL" />
                            </p>
                        </section>
                    </div>
                </InputForm>
            </ResumeFrame>
        </ResumeContainer>
    );
};

export default Resume;
