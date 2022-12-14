import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from 'axios';
import * as S  from './style';
import Logo from "assets/images/iogo.png";



const FindPw = () => {

   const [Email, setEmail] = useState("");
   
   const onSubmitHandler = (e : any) => {
      e.preventDefault();


      
      // dispatch();
   };

   return (
      <S.Div>
         <S.MobileDiv >
            <p ><S.Image src={Logo} alt="로고"/></p>
            <form onSubmit={onSubmitHandler}>
               <div style={{width: "400px" ,minWidth:"320px" , textAlign: "center" }}>
                  <h1>임시 비밀번호 보내기</h1>
                  <div style={{height: "30px"}}></div>
                  <p>이메일</p>
                  <input type="email" value={Email} placeholder='이메일 입력' onChange={e => {setEmail(e.currentTarget.value)}}/>
                  
                  <button  formAction=''>이메일로 임시 비밀번호 보내기</button> 
               </div>
            </form>
         </S.MobileDiv>
      </S.Div>
      )
   };


export default FindPw;
