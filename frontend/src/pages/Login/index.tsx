import React, { useState } from "react";
import * as S  from './style';
import Logo from "assets/images/iogo.png";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from 'axios';
import e from "express";


interface hey  {
   email : string, 
   password : string
}

   const Login = () => {

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();
      const data = {
         email: email,
         password: password,
      }
      const onSubmitHandler = async (e : React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();
         console.log('Email', email);
         console.log('Password', password);
         try {
            console.log('data', data);
            const res = await axios.post("/users", data);
            console.log(res, '성공')

               const accessToken = res.data.accessToken;
               const refreshToken = res.data.refreshToken;
               localStorage.setItem("accessToken", accessToken);
               localStorage.setItem("refreshToken", refreshToken);
               localStorage.setItem("email", email);
               navigate('/');

         } catch (err : any)  {
            console.error(err.stack);
            alert("아이디 혹은 비밀번호가 틀렸습니다");
         }
      };
      
   return (
      <S.Div>
         <S.MobileDiv >
            <form  onSubmit={onSubmitHandler}>
            <p ><S.Image src={Logo} alt="로고"/></p>
            <div style={{width: "400px" ,minWidth:"320px" , textAlign: "center" , paddingBottom: "30px" }}>
            <h1>로그인</h1>
            <input type="email" value={email}  onChange={e => {setEmail(e.currentTarget.value)}} placeholder='이메일 입력' /> 
            <input type="password" value={password} onChange={e => {setPassword(e.currentTarget.value)}}  placeholder='비밀번호 입력'/>
            <button type="submit" >로그인</button> 
            <Link to="/Join" style={{ textDecoration: 'none' , color:"black", fontSize: "10px", fontWeight:"bold",margin:"10px" }}>회원가입  </Link> 
            <Link to="/FindPw" style={{ textDecoration: 'none' , color:"black", fontSize: "10px",margin:"10px" }}>비밀번호를 잊으셨나요?</Link>
            </div>
            </form>
         </S.MobileDiv>
      </S.Div>
      )
   };


export default Login;
