import { DatePicker } from 'antd';
import React, { FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import { FormStore, WorkFormData } from 'models/resume-model';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';

type StateToggle = {
    setIsWorkFormToggle: React.Dispatch<React.SetStateAction<boolean>>;
    setAddJob: React.Dispatch<React.SetStateAction<FormStore[]>>;
};

const Job = ({ setIsWorkFormToggle, setAddJob }: StateToggle) => {
    const [isStilWork, setIsStilWork] = useState<boolean>(true);

    const [workFormDataState, setWorkFormDataState] = useState<WorkFormData>({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        reward: '',
        notDevlop: false,
        workNow: false,
    });

    const params = useParams();
    const resumeIds = params.id;
    const token = localStorage.getItem('accessToken');

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
            startDate: dateString,
        });
    };

    const workEndTimeHandler = (date: any, dateString: string) => {
        setWorkFormDataState({
            ...workFormDataState,
            endDate: dateString,
        });
    };

    const createWorkForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/my-portfolio/resumes/${resumeIds}/new-career`, {
                company: workFormDataState.company,
                position: workFormDataState.position,
                startDate: workFormDataState.startDate,
                endDate: workFormDataState.endDate,
                reward: workFormDataState.reward,
            });
            console.log(res, ' data');
        } catch (err: unknown) {
            console.log(err);
        }
    };

    const deleteWorkForm = () => {
        console.log(
            setAddJob(e => e),
            'asd',
        );
    };
    return (
        <form>
            <div className="formWrap">
                <ul>
                    <li>
                        <dl>
                            <dt>회사명</dt>
                            <dd>
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="회사 이름"
                                    value={workFormDataState.company}
                                    onChange={workFormHandler}
                                />
                            </dd>
                        </dl>
                        <dl>
                            <dt>직무</dt>
                            <dd>
                                <input
                                    type="text"
                                    name="position"
                                    placeholder="프론트엔드"
                                    value={workFormDataState.position}
                                    onChange={workFormHandler}
                                />
                            </dd>
                        </dl>
                        <dl className="noneDevelop">
                            <dt>
                                <input type="checkbox" name="noneDevelop" />
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
                                        checked={isStilWork ? true : false}
                                        onChange={(): void => setIsStilWork(!isStilWork)}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </dt>

                            <dd>
                                <DatePicker
                                    placeholder="YYYY-MM"
                                    picker="month"
                                    name="startDate"
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
                                        name="endDate"
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
                            name="reward"
                            onChange={workFormHandler}
                        ></textarea>
                    </li>
                </ul>
            </div>

            <div className="formBtn">
                <button type="button" onClick={deleteWorkForm}>
                    취소
                </button>
                <button type="submit" onClick={createWorkForm}>
                    저장
                </button>
            </div>
        </form>
    );
};

export default Job;
