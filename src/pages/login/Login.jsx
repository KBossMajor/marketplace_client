import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Icon } from "./incon";
// import {  tablet  } from "../../responsive";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { login } from '../../actions/userActions';
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import { CircularProgress } from "@material-ui/core";
import { mobile, tablet  } from "../../responsive";
import { useHistory, useLocation } from "react-router";



export default function Login() { 
  const email = useRef();
  const password = useRef();
  // const { isFetching, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
 
  const redirect = location.search
    ? location.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { user: loggedInUser, loading, error } = userSignin;

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(login(email.current.value, password.current.value));
    
  };
 
   useEffect(() => {
    if (loggedInUser) {
      history.push(redirect);
    }
  }, [history, redirect, loggedInUser]);

  return (

    <Container>

       <Link to="/">
          <WelcomeText>
            <Image src="images/logo.png" alt="" />
          
          </WelcomeText>
        </Link>
        <Title>Sign in to bring your market to the world</Title>
        {/* <SubTitle> </SubTitle> */}
      <Wrapper>
      {loading && <LoadingBox></LoadingBox>}
        {/* <Title>Sign in to bring your market to the world</Title> */}
        {/* <SubTitle> bring your market to the world</SubTitle> */}
        <Form onSubmit={handleClick}>
       
          <Input
            placeholder="Email"
                type="email"
                required
                ref={email}
            // onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            required
            minLength="6"
            ref={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
          <ButtonContainer>
          <Button type="submit" disabled={loading}>
           {loading ? (
              <CircularProgress color="primary" size="20px" />
            ) : (
              "LOGIN"
            )}
            
          </Button>
          </ButtonContainer>
          <HorizontalRule />
          {error && <MessageBox variant="danger">{error}</MessageBox>}

             
          {/* {error && <Error>Something went wrong...</Error>} */}
          {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}


            <Link to={`/register?redirect=${redirect}`}>
             <MenuItem>
              CREATE A NEW ACCOUNT
              </MenuItem>
            </Link>
         
        </Form>
      </Wrapper>
    </Container>

  );
}


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fafafa;
 /* background: linear-gradient(
      rgba(255, 255, 255, 0.027),
      rgba(255, 255, 255, 0)
    ); */
    /* url("images/21.jpg")
      center;  
 background-size: cover;  */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* #fafafa */
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: #FFFFFF;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
 
  /* flex: 5; */
  /* background: rgba(255, 255, 255, 1); */
 /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.219);  */
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px); 
  border-radius: 10px;
  /* color: #faf6f6fc; */
  /* text-transform: uppercase; */
  letter-spacing: 0.4rem;
  
${tablet({ 
   
   width: "45%"
  
   })}

  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 500;
  font-family: 'Volkhov', Poppins;
  margin-bottom:9px;
  ${mobile({ fontSize: "22px",
              padding:"10px"

   })}
`;
// const SubTitle = styled.h1`
//   font-size: 15px;
//   margin-top: -9px;
//   font-weight: 500;
// `;

const WelcomeText = styled.div`
  width: 100%;
  margin-top: -45%;
  /* flex: 1; */
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin: 3rem 0 2rem 0; */
`;

const Image = styled.img`
  /* height: 80%; */
  height: 60px;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  /* flex: 1.5; */
  min-width: 35%;
  margin: 15px 0;
  padding: 10px;
  /* box-shadow: 0 4px 12px rgba(0,0,0,0.5); */

  /* background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  /* border-radius: 2rem; */
  height: 1.1rem;
  /* padding: 1rem; */
  /* border: none; */
  outline: none;
  /* color: #3c354e; */
  color: #000;
  font-size: 1.3rem;
  /* font-weight: bold; */

  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #257022c5;
    backdrop-filter: blur(12rem);
    /* border-radius: 2rem; */
  }
  &::placeholder {
    color: #8e8e8e;
    opacity: 1;
    /* font-weight: 100; */
    font-size: 1.2rem;
  }
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 60%;
  border: none;
  padding: 10px 13px;
  background-color: #2A7727;
  color: white;
  cursor: pointer;
  font-family: 'Oswald', Poppins;
  margin-bottom: 10px;
  border-radius: 2rem;
  &:disabled {
    /* color: green; */
    cursor: not-allowed;
  }
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #2A7727 0%, #4aad47 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;


const MenuItem = styled.div`
  margin: 10px 0px;
  font-size: 12px;
  /* font-family: 'Oswald', Poppins; */
  text-decoration: underline;
  cursor: pointer;
  color: #000;

    &:hover {
      color: #4aad47;
    }
`;

// const Error = styled.span`
//   color: red;
// `;
