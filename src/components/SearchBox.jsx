import React, { useState } from 'react';
import styled from "styled-components";
import { Search } from "@material-ui/icons";
import { mobile } from "../responsive";


export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search" >
      <Wrapper>
      <Input placeholder="Search for product" 
         type="text"
         name="q"
         id="q"
         onChange={(e) => setName(e.target.value)}
      
      />
        {/* <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        ></input> */}
        <Button onClick={submitHandler}><Search style={{ color: "white", fontSize: 16 }} /></Button>
        {/* <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button> */}
      </Wrapper>
    </form>
  );
}


const Wrapper = styled.div`
  /* padding: 10px 20px; */
  /* background-color:#000 */
  display: flex;
  align-items: center;
  justify-content: space-between;
`;



const Input = styled.input`
  width:35rem;
  background-color: #f5f5f5;
  border: none;
  outline: none;
  padding: 1.2rem;
  /* border-top-left-radius: 5px;
  border-bottom-left-radius: 5px; */
  &:hover {
    border: 0.1rem #257022c5 solid;
    }
  &:focus {
    /* box-shadow: 0 0 0 0.2rem #257022c5;
    backdrop-filter: blur(12rem); */
    /* outline: none;
    border: none; */
  }
  /* ${mobile({ width: "50px" })} */
`;



const Button = styled.div`
/* padding: 10px;
font-size: 20px; */
display: flex;
align-items: center;
justify-content: center;
/* border-radius: 5px; */
border-bottom-right-radius: 5px;
border-top-right-radius: 5px;
width: 48px;;
height:39px;
background-color: #257022c5;
cursor: pointer;
`;
