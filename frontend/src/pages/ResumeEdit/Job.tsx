export {};
// import { DatePicker } from 'antd';
// import React, { FunctionComponent, SetStateAction, useEffect, useState } from 'react';

// const [isStilWork, setIsStilWork] = useState<boolean>(true);
// const [isWorkFormToggle, setIsWorkFormToggle] = useState<boolean>(false);
// const [workFormDataState, setWorkFormDataState] = useState<WorkFormData>({
//     companyName: '',
//     jobGroup: '',
//     startWork: '',
//     endWork: '',
//     workPerformance: '',
// });

// const Job: FunctionComponent = ({
//     createWorkForm,
//     workFormHandler,
//     workEndTimeHandler,
//     workStartTimeHandler,
// }) => {
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
//                                     name="startWork"
//                                     onChange={workStartTimeHandler}
//                                 />
//                             </dd>
//                         </dl>
//                         {!isStilWork && (
//                             <dl>
//                                 <dt>퇴사</dt>
//                                 <dd>
//                                     <DatePicker
//                                         placeholder="YYYY-MM"
//                                         picker="month"
//                                         name="endWork"
//                                         onChange={workEndTimeHandler}
//                                     />
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
//                             name="workPerformance"
//                             onChange={workFormHandler}
//                         ></textarea>
//                     </li>
//                 </ul>
//             </div>

//             <div className="formBtn">
//                 <button type="button" onClick={() => setIsWorkFormToggle(!isWorkFormToggle)}>
//                     취소
//                 </button>
//                 <button type="submit" onClick={createWorkForm}>
//                     저장
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default Job;
