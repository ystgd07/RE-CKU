import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from 'axios';
import * as S  from './style';
import Logo from "assets/images/iogo.png";


const Join = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [passwordCheck, setPasswordCheck] = useState("");
   const [name, setName] = useState("");
   const [phone, setPhone] = useState("");
   const [code, setCode] = useState("");

   const navigate = useNavigate();
   const data = {
      email: email,
      password: password,
      username : name,
      phoneNumber : phone,
   }

   const data2 = {
      email: email,
      code : Number(code),
   }


   const onSubmitHandler = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
         console.log('data', data);
         const res = await axios.post("/users/individual", data);
         console.log(res, '성공')

         alert("회원가입이 완료되었습니다.");
         navigate('/login');

      } catch (err : any)  {
         console.error(err.stack);
         
      }
   }

      const sendEmail = async (e : any ) => {
         e.preventDefault();
         console.log('email', email);
         
         try {
            const res = await axios.post("/users/email",{ email } );
            console.log(res, '성공')

         } catch (err : any)  {
            console.error(err.stack);
            

         }
   };

   const emailAuth = async (e : any ) => {
      e.preventDefault();
      console.log('data', data2);
      
      try {
         const res = await axios.post("/users/email/auth", data2 );
         console.log(res, '성공')

         const reqConfirm = res.data.msg

         sessionStorage.setItem("reqConfirm", reqConfirm);
         sessionStorage.setItem("email", email);

      } catch (err : any)  {
         console.error(err.stack);
         

         }
   };



   const errStyle = () => {
      if(password !== passwordCheck){
         return {border : "3px solid red"}

      }
   }

   const errjoin = () => {
         
         if(!(email && password && passwordCheck && name &&  phone && code) ){
            return { display: "none" } 
         }
         if(( password !== passwordCheck)){
            return { display: "none" }
         }
         if(!(email === sessionStorage.getItem('email'))){
            return { display: "none" }
         }
         if(!(sessionStorage.getItem('reqConfirm'))){
            return { display: "none" }
         }
   }

   return (
      <S.Div>
         <S.MobileDiv >
            <p ><S.Image src={Logo} alt="로고"/></p>
            <form onSubmit={onSubmitHandler}>
               <div style={{ display : "flex", flexDirection: "column", width: "400px" ,minWidth:"320px" , textAlign: "center",paddingBottom: "30px"  }}>
                  <h1>회원가입</h1>
                  <p>이메일</p>
                  <input type="email" value={email} placeholder='이메일 입력' onChange={e => {setEmail(e.currentTarget.value)}}/>
                     <button onClick={sendEmail} >인증번호 보내기</button>
                  <div style={{ display: "flex" ,textAlign: "left" }}>
                     <input placeholder='인증번호를 입력해주세요' value={code} onChange={e => {setCode(e.currentTarget.value)}}></input>
                  <button onClick={emailAuth}>인증하기</button>
                  </div>
                  <p>비밀번호</p>
                  <input type="password" value={password} placeholder='비밀번호 입력' onChange={e => {setPassword(e.currentTarget.value)}}/>
                  <p>비밀번호 확인</p>
                  <input type="password" style={errStyle()}  value={passwordCheck} placeholder='비밀번호 입력' onChange={e => {setPasswordCheck(e.currentTarget.value)}} />
                  <p>이름</p>
                  <input type="string"  value={name} placeholder='이름 입력' onChange={e => {setName(e.currentTarget.value)}}/> 
                  <p>휴대폰</p>
                  <input type="string" value={phone} placeholder='- 빼고 입력해주세요' onChange={e => {setPhone(e.currentTarget.value)}}/> 
                  <button  formAction='' style={errjoin()} >회원가입</button> 
                  <Link to="/login" style={{ textDecoration: 'none' , color:"black", fontSize: "10px", fontWeight:"bold" }}>로그인  </Link> 
               </div>
            </form>
         </S.MobileDiv>
      </S.Div>
      )
   };


export default Join;
