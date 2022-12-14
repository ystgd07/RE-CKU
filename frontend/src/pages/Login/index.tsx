import React, { useState } from "react";
import * as S  from './style';
import Logo from "assets/images/iogo.png";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from 'axios';

// import { useSelector, useDispatch } from 'react-redux';

// interface FormData {
//    email: String;
//    password: Number;
//    }



   const Login = (props: any) => {

      const [Email, setEmail] = useState("");
      const [Password, setPassword] = useState("");
      // const dispatch = useDispatch();

      const onSubmitHandler = (e : any) => {
         e.preventDefault();
         console.log('Email', Email);
         console.log('Password', Password);
         let body = {
            email: Email,
            password: Password,
         }


         // dispatch();
      };

   return (
      <S.Div>
         <S.MobileDiv >
            <form  onSubmit={onSubmitHandler}>
            <p ><S.Image src={Logo} alt="로고"/></p>
            <div style={{width: "400px" ,minWidth:"320px" , textAlign: "center" , paddingBottom: "30px" }}>
            <h1>로그인</h1>
            <input type="email" value={Email} onChange={e => {setEmail(e.currentTarget.value)}} placeholder='이메일 입력' /> 
            <input type="password" value={Password} onChange={e => {setPassword(e.currentTarget.value)}}  placeholder='비밀번호 입력'/>
            <button formAction='' >로그인</button> 
            <Link to="/Join" style={{ textDecoration: 'none' , color:"black", fontSize: "10px", fontWeight:"bold",margin:"10px" }}>회원가입  </Link> 
            <Link to="/FindPw" style={{ textDecoration: 'none' , color:"black", fontSize: "10px",margin:"10px" }}>비밀번호를 잊으셨나요?</Link>
            </div>
            </form>
         </S.MobileDiv>
      </S.Div>
      )
   };


export default Login;
