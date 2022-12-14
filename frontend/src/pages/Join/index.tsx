import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from 'axios';
import * as S  from './style';
import Logo from "assets/images/iogo.png";



const Join = () => {

   const [Email, setEmail] = useState("");
   const [Password, setPassword] = useState("");
   const [PasswordCheck, setPasswordCheck] = useState("");
   const [Name, setName] = useState("");
   const [Phone, setPhone] = useState("");
   const [Confirm, setConfirm] = useState("");

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
                  <h1>회원가입</h1>
                  <p>이메일</p>
                  <input type="email" value={Email} placeholder='이메일 입력' onChange={e => {setEmail(e.currentTarget.value)}}/>
                  <div style={{ display: "flex" ,textAlign: "left" }}>
                     <button >인증</button>
                     <input placeholder='인증번호를 입력해주세요' value={Confirm} onChange={e => {setConfirm(e.currentTarget.value)}}></input>
                  </div>
                  <p>비밀번호</p>
                  <input type="password" value={Password} placeholder='비밀번호 입력' onChange={e => {setPassword(e.currentTarget.value)}}/>
                  <p>비밀번호 확인</p>
                  <input type="password" value={PasswordCheck} placeholder='비밀번호 입력' onChange={e => {setPasswordCheck(e.currentTarget.value)}}/>
                  <p>이름</p>
                  <input type="email"  value={Name} placeholder='이름 입력' onChange={e => {setName(e.currentTarget.value)}}/> 
                  <p>휴대폰</p>
                  <input type="email" value={Phone} placeholder='- 빼고 입력해주세요' onChange={e => {setPhone(e.currentTarget.value)}}/> 
                  <button  formAction=''>회원가입</button> 
               </div>
            </form>
         </S.MobileDiv>
      </S.Div>
      )
   };


export default Join;
