import React, { useEffect, useState } from 'react';
import { UserData, ResumeData, WorkFormData, ProjectFormData } from 'models/resume-model';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { GiCancel } from '@react-icons/all-files/gi/GiCancel';

const Project = () => {
    const [searchStackToggle, setSearchStackToggle] = useState<boolean>(false);
    const [AllStacks, setAllStacks] = useState([]);
    const [stackInputValue, setStackInputValue] = useState<string>('');
    const [tagListItem, setTagListItem] = useState<string[]>([]);
    const [tagItemActive, setTagItemActive] = useState<boolean>(false);
    const [projectFormToggle, setProjectFormToggle] = useState<boolean>(false);
    const [projectFormDataState, setProjectFormDataState] = useState<ProjectFormData>({
        projectName: '',
        year: '',
        information: '',
        link1: '',
        link2: '',
        stacks: [],
    });

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
    useEffect(() => {
        getStack();
    }, []);

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
    }, [tagListItem]);

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

    return (
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
                                <select onChange={projectFormHandler} name="year">
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
                        {tagListItem.map((tem, idx) => {
                            return (
                                <div key={idx} className="stackList">
                                    <span>{tem}</span>
                                    <button type="button" onClick={(): void => deleteTagItem(idx)}>
                                        <GiCancel />
                                    </button>
                                </div>
                            );
                        })}
                        <input
                            type="text"
                            placeholder="스택 입력"
                            onFocus={() => setSearchStackToggle(!searchStackToggle)}
                            onKeyPress={enterKeyPress}
                            onChange={changeStackValue}
                        />
                        <article className={searchStackToggle ? 'block' : 'none'}>
                            {stackFilter.length === 0 &&
                                AllStacks.map((stack: { name: string }, idx: number) => {
                                    return (
                                        <dl key={idx}>
                                            <dt>{stack.name}</dt>
                                        </dl>
                                    );
                                })}
                            {stackFilter.map((tem: { name: string }, idx: number) => {
                                return (
                                    <dl key={idx}>
                                        <dt onClick={() => addTagList(tem.name, idx)}>
                                            {tem.name}
                                        </dt>
                                    </dl>
                                );
                            })}
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
                    <button type="button" onClick={() => setProjectFormToggle(!projectFormToggle)}>
                        취소
                    </button>
                    <button type="submit" onClick={createProjectForm}>
                        저장
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Project;
