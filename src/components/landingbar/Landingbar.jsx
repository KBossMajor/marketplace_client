// import { Badge } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile, tablet } from "../../responsive";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Landingbar() {
    return (
        <Container>
      <Wrapper>
        <Left>
          {/* <Language>EN</Language> */}
          <Image src="images/logo.png" alt="" />
        </Left>
        <Center>

        <NavLink to="/homestore">
          <MenuItem>
             Explore
          </MenuItem>
          </NavLink>

          <NavLink to="/register">
          <MenuItem color="black">Register</MenuItem>
          </NavLink>

          <NavLink to="/signin">
          <MenuItem>Sign In</MenuItem>
          </NavLink>
         
          
       
          {/* <Logo>ShopZone</Logo> */}
        </Center>
        <Right>
        <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "green", fontSize: 16, cursor: "pointer" }} />
          </SearchContainer>
        </Right>
      </Wrapper>
    </Container>
    );
}



const Container = styled.div`
 position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 9;
    background: transparent;
  height: 60px;
  ${mobile({
     height: "50px"
     
     })}
`;

const Wrapper = styled.div`
  /* padding: 10px 20px; */
  padding: 20px 120px 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  padding-left: 5%;
`;

// const Language = styled.span`
//   font-size: 14px;
//   cursor: pointer;
// color: #fff7f7;
//   ${mobile({ display: "none" })}
// `;

const NavLink = styled(Link)`
  color: #000;
  /* font-family: 'Manrope', sans-serif;
  font-size: 11px; */

  /* padding: 0 15px; */
  /* font-size: 16px;
  line-height: 80px;
  font-weight: 700; */
  text-decoration: none;
  &:hover {
    color:#257022c5;
    /* background: #DDDDDD; */
    /* wid */
  }
  `;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  z-index: 8;
  ${mobile({
    marginLeft: "8px",
    marginRight: "15px"
     
     })}
  /* border-radius: 10%; */

`;

const Input = styled.input`
  border: none;
  &:focus {
    /* display: inline-block; */
    box-shadow: 0 0 0 0.2rem #257022c5 !important;
    backdrop-filter: blur(12rem);
    border-color:#2A7727 !important;
    /* border-radius: 2rem; */
    color:#2A7727;
    outline: none;
  }
  &::placeholder {
    color: #000;
    font-weight: 300;
    /* font-size: 1rem; */
  }
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
/* padding-left: 10%; */
  flex: 1;
  display: flex;
  align-items: center;
  ${tablet({ 
   
   flex: 2, 
   justifyContent: "center"
  
   })}
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const Image = styled.img`
  /* height: 80%; */
  height: 70px;
  ${mobile({
     height: "50px"
     
     })}
`;

// const Logo = styled.h1`
//   font-weight: bold;
//  color: #fff7f7;
//   ${mobile({ fontSize: "14px" })}
// `;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* z-index: 89; */
  ${mobile({
    justifyContent: "center"
     
     })}
 
`;

const MenuItem = styled.div`
  font-size: 15px;
  color: #000000;
  font-family: 'Poppins';
  cursor: pointer;
    &:hover {
      color: #2A7727;
    }
  
  margin-left: 25px;
    
${tablet({ 
   
   fontSize: "14px",
   marginLeft: "11px"
  
   })}
  ${mobile({ fontSize: "10.5px", marginLeft: "9px" })}
`;