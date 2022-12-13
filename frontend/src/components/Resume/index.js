import React from "react";
import { ResumeContainer, ResumeFrame } from "./style";
import Pica from "assets/images/pica.jpeg";


const Resume = () => {
    return (
        <ResumeContainer>
            <ResumeFrame>
                <section>
                    <strong>기본정보</strong><span>필수</span>
                    <ul>
                        <li><input type="email" placeholder="이메일" /></li>
                        <li><input type="tel" placeholder="연락처" /></li>
                        <li><img src={Pica} alt="Resume" /></li>
                        <li><textarea placeholder="채용자에게 지원자님을 소개해주세요. (최대 200자)" maxLength={200}></textarea></li>
                    </ul>
                </section>

                <section>
                    <strong>보유 기술 스택</strong>
                    <p><input type="text" placeholder="스택 입력"/></p>
                </section>

                <section>
                    <strong>업무경험</strong>
                    <div>
                        <ul>
                            <li>
                                <dl>
                                    <dt>회사명</dt>
                                    <dd><input type="text" placeholder="회사 이름을 입력해주세요." /></dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>직무</dt>
                                    <dd><input type="text" placeholder="프론트엔드" /></dd>
                                </dl>
                            </li>
                            <li>
                                <input type="checkbox" />
                                <label>비개발 경력</label>
                            </li>
                        </ul>

                        <ul>
                            <li>
                                <dl>
                                    <label>입사</label>
                                    <span>재직 중 <input type="button" /></span>
                                    <dd><input type="time" placeholder="YYYY-MM" /></dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>퇴사</dt>
                                    <dd><input type="time" placeholder="YYYY-MM" /></dd>
                                </dl>
                            </li>
                        </ul>

                        <ul>
                            <li>
                                <label>업무 성과</label>
                            </li>
                            <li>
                                <textarea maxLength="500" placeholder="구체적인 역할과 성과 위주의 글을 작성해보세요. 수치와 함께 표현되면 경험이 잘 전달될 수 있습니다."></textarea>
                            </li>
                        </ul>
                    </div>
                </section>

                <section>
                    <strong>프로젝트</strong>
                </section>
            </ResumeFrame>
        </ResumeContainer>
    )
}

export default Resume;





