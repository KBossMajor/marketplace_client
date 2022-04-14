// import axios from "axios";
import "./register.css";
import styled from "styled-components";
import { mobile } from "../../responsive";

import { useHistory, useLocation } from "react-router";
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/userActions';
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import { useState } from "react";




export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const [isSeller, setIsSeller] = useState(false);
  const [sellerName, setSellerName] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');
 

  const userRegister = useSelector((state) => state.userRegister);
  const { user: registeredUser, loading, error } = userRegister;

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';
  const backend_url = process.env.REACT_APP_API;
  
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else if(isSeller && (sellerName ==='' || sellerDescription ==='')){
          alert("kindly fill your company's name and description  of work");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        isSeller,
        sellerName,
        sellerDescription
      };
      dispatch(register(user.username, user.email, user.password, user.isSeller, user.sellerName, user.sellerDescription));
    }
  };

  useEffect(() => {
    if (registeredUser) {
      
      history.push("/");
    }
    
    //  console.log(isSeller);
  }, [registeredUser, redirect, history, isSeller]);

  return (
    <Container>
     <WelcomeText style={{ }}>
      <Link to="/">
        <Image src={`${backend_url}/images/logo.png`} alt="" />
      </Link>
        
      </WelcomeText>
      <WelcomeText>
      <Title>Create an account to bring your market to the world</Title>
      </WelcomeText>
     
    <Wrapper>

      
     
    {loading && <LoadingBox></LoadingBox>}
     
      <Form onSubmit={handleClick}>
      
        {/* <Input placeholder="Name" />
        <Input placeholder="last Name" /> */}
        <Input placeholder="Username"
                required
               ref={username}
         />
        <Input placeholder="Email" 
                required
                ref={email}
                type="email"
        />
        <Input placeholder="Password"
               required
              ref={password}
                type="password"
                minLength="6"
        />
        <Input placeholder="Confirm Password"
              required
              ref={passwordAgain}
              type="password"
        />
        <Item>
        <RadioButton
          type="radio"
          id="no"
          checked={isSeller === false}
          // checked
          value={false}
          // value="false"
           name="seller"
           onChange={(e) => setIsSeller(!Boolean(e.target.value))}
        />
        <RadioButtonLabel />
        <div htmlFor="no"> User</div>
      </Item>

      <Item>
        <RadioButton
         type="radio"
          id="yes"
          name="seller"
          value={1>0}
          onChange={(e) => setIsSeller(Boolean(e.target.value))}
        />
        <RadioButtonLabel />
        <div htmlFor="yes"> Seller</div>
      </Item>
      {isSeller && (
       <> 
      <SellerDetails>
      <Textarea placeholder="What's Your Company's Name"
          id="sellerName"
          type="text"
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
      
      />

      <Textarea  placeholder="Describe What You Sell"
                  id="sellerDescription"
                  type="text"
                  value={sellerDescription}
                  onChange={(e) => setSellerDescription(e.target.value)}
      /> 
       
      </SellerDetails>
      </>)}
      
        <ButtonContainer>
        <Button type="submit">CREATE</Button>
        </ButtonContainer>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <HorizontalRule />
        <Link to={`/signin?redirect=${redirect}`}>
             <MenuItem>
             signin into Account
              </MenuItem>
            </Link>
        {/* <Agreement>
          By creating an account, I consent to the processing of my personal
          data in accordance with the <b>PRIVACY POLICY</b>
        </Agreement> */}
      </Form>
    </Wrapper>
  </Container>

  );
}



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-y:scroll;
  /* background-color: #fafafa; */
  /* background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ); */
    /* url("images/21.jpg")
      center;
  background-size: cover; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 33%;
  padding: 20px;
  background-color: #FFFFFF;
  margin-bottom:10px;
  /* box-shadow: 0 4px 12px rgba(0,0,0,0.15); */
  /* background: rgba(0, 0, 0, 0.603); */
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.219);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  /* color: #faf6f6fc; */
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  ${mobile({ width: "75%" })}
`;

const WelcomeText = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom:10px;
  /* margin: 3rem 0 2rem 0; */
`;


const Image = styled.img`
  /* height: 80%; */
  height: 60px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 500;
  font-family: 'Volkhov', Poppins;
  ${mobile({ fontSize: "22px",
              padding:"10px"

   })}
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  /* min-width: 40%; */
  /* margin: 15px 0; */
  padding: 10px;
  margin: 20px 10px 0px 0px; 
  /* min-width: 40%;
 
  /* padding: 10px; */
  /* background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  /* border-radius: 2rem; */
  height: 1.1rem;
  /* padding: 1rem; */
  /* border: none; */
  outline: none;
  /* color: white; */
  font-size: 1.3rem;

  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #257022c5;
    backdrop-filter: blur(12rem);
    /* border-radius: 2rem; */
  }
  &::placeholder {
    color: #8e8e8e;
    /* font-weight: 100; */
    font-size: 1.2rem;
  }
`;

const Textarea = styled.textarea`
 flex: 1;
 /* height: 30px; */
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  /* background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem; */
  height: 3.5rem;
  padding: 1rem;
  /* border: none; */
  outline: none;
  color: #000;
  font-size: 1.3rem;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #257022c5;
    backdrop-filter: blur(12rem);
    /* border-radius: 2rem; */
  }
  &::placeholder {
    color: #8e8e8e;
    /* font-weight: 100; */
    font-size: 1.2rem;
  }
`;

const SellerDetails = styled.div`
width: 100%;
  display: flex;
  flex-wrap: wrap;
  transition: all 1.5s ease;
  /* margin: 20px 10px 0px 0px; */
`;

// const Agreement = styled.span`
//   font-size: 12px;
//   margin: 20px 0px;
// `;


const Item = styled.div`
 display: flex;
 flex: 1;
 /* font-size:12px; */
 font-family: 'Poppins', Poppins;

 min-width: 40%;
 margin: 15px 10px 0px 0px;
  align-items: center;
  height: 37px;
  position: relative;
  border: 1px solid #ccc;
  box-sizing: border-box;
  /* border-radius: 10px; */
  /* margin-bottom: 10px; */
`;
const RadioButtonLabel = styled.label`
  position: absolute;
  top: 23%;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: white;
  /* font-family: 'Jost', Poppins; */
  /* font-size:12px; */
  border: 1px solid #ccc;
`;
const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 22px;
  height: 22px;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    background: #ccc;
    &::after {
      content: "\f005";
      font-family: "FontAwesome";
      display: block;
      color: white;
      width: 12px;
      height: 12px;
      margin: 4px;
    }
  }
  /* &:checked + ${Item} {
    background: #257022c5;
    border: 2px solid yellowgreen;
  } */
  &:checked + ${RadioButtonLabel} {
    background: #4aad47;
    border: 1px solid yellowgreen;
    &::after {
      content: "\f005";
      font-family: "FontAwesome";
      display: block;
      color: white;
      width: 10px;
      height: 10px;
      margin: 2.5px;
    }
  }
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #2A7727 0%, #4aad47 79%);
  background-color: #ebd0d0;
  margin: 1rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

// const StyledTextarea = styled.textarea`
// width: 100%;
// `;

const ButtonContainer = styled.div`
  /* margin: 1rem 0 2rem 0; */
  margin: 20px 0px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Button = styled.button`
  width: 60%;
  border: none;
  font-family: 'Oswald', Poppins;
  /* padding: 15px 20px; */
  padding: 13px 15px;
  background-color: #2A7727;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 2rem;
  &:disabled {
    color: green;
    cursor:not-allowed;
  }
  /* background-color: #2A7727;
  color: white;
  cursor: pointer; */
`;

const MenuItem = styled.div`
  margin: 7px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: #000;

  &:hover {
      color: #4aad47;
    }

  
`;
