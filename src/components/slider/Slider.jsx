// import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
// import { useState } from "react";
import styled from "styled-components";
import { mobile, tablet, mtablet  } from "../../responsive";
// import {sliderItems } from "../../data";





export default function Slider() {

 
    return (
      
        <Container>
     
        <Wrapper>
          
            <Slide >
              
              <InfoContainer>
                <Title>welcome to<Br></Br> <Name>SHOP-WIT-EAZE</Name> </Title>
                <Desc> get your online shop, no council, no rent, secure payment, shipping option and more online</Desc>
                <Button>SHOP NOW</Button>
              </InfoContainer>
              <ImgContainer>
                <Image src="images/11.jpg" />
              </ImgContainer>
            </Slide>
        
        </Wrapper>
       
      
      </Container>

        );
    }


    
const Container = styled.div`

width: 100%;
height: 100vh;
display: flex;
position: relative;



`;




const Wrapper = styled.div`

height: 100%;
display: flex;
padding:30px;
${mtablet({ 
  
  padding: "10px"
 
  })}

${tablet({ 
 
  padding: "10px"
 
  })}

${mobile({ padding: "10px" })}
/* display: flex;
align-items: center;
justify-content: space-between;
padding:100px;
color: #ffffff;
min-height: 100%; */
/* display: flex; */
/* transition: all 1.5s ease; */
/* transform: translateX(${(props) => props.slideIndex * -100}vw); */
/* z-index: 8; */




`;

const Slide = styled.div`

width: 100vw;
height: 100vh;
display: flex;
${mobile({ 
  
  flexDirection: "column" 
  
  })}
/* flex-wrap: wrap; */
align-items: center;
justify-content: space-between;


/* width: 100vw; */

/* height: 100vh; */
/* position: relative; */
  /* left: 0;
  top: 0;
  padding:20px 100px; */

/* display: flex;
align-items: center;
justify-content: space-between; */
/* background-image:url(${(props) => props.bg});
background-repeat: no-repeat;
background-position: center center;
background-size: cover; */

`;
// (${background})
// const ImgContainer = styled.div`
//   height: 100%;
//   flex: 1;
//   padding-top:10%;
//   z-index: 99;
//   ${tablet({ display: "none" })}
//   ${mobile({ display: "none" })}
// `;

const ImgContainer = styled.div`
height: 100%;
flex: 1;
z-index: 7;
/* padding:10%; */
 display: flex;
align-items: center;
justify-content: center;

${mobile({ marginTop:"-14px" })}
`;

const Image = styled.img`
/* height: 60%; */
max-width:80%;
display: flex;
text-align:center; 
align-items: center;
`;

const Br = styled.br`
/* height: 80%; */
/* max-width:340px; */
/* display: flex;
text-align:center; 
align-items: center; */
`;

const InfoContainer = styled.div`
flex: 1;
/* display: flex; */
align-items: center;
justify-content: center;
/* max-width:600px; */
 padding: 50px; 
 ${mobile({  padding: "80px", marginTop:"10%" })}
/* margin: auto 0px; */
/* text-align:center; */
/* align-items: center; */

/* display: flex;
align-items: center;
justify-content: center; */

/* z-index: 999; */
`;

const Name = styled.span`
 /* font-size: 1.2em; */
 
font-weight: Bold; 
color: #2A7727;


`;

const Title = styled.h2`
font-size: 3.5em;
text-transform: capitalize;
font-family: 'Volkhov', sans-serif;
line-height:1.4em;
/* font-weight: 300; */
/* text-shadow: 1px 2px 3px #666; */
${mobile({ 
  fontSize: "2.2em" ,
 
  })}

${tablet({ 
  fontSize: "2.6em" ,
 
  })}
    ${mtablet({ 
  fontSize: "3em" ,
 
  })}
`;

const Desc = styled.p`
margin: 20px 0px;
font-size: 17px;
font-family: 'Poppins', sans-serif;
/* font-weight: 500; */
letter-spacing: 3px;
text-transform: capitalize;


${mobile({ 
  fontSize: "12px" ,
 
  })}

${mtablet({ 
  fontSize: "14px" ,
 
  })}

${tablet({ 
  fontSize: "13px" ,
 
  })}
`;

const Button = styled.button`
padding: 12px 25px;
font-size: 15px;
border-radius: 6px;
/* background-color: transparent; */
background-color:  #28a745;
/* text-shadow: 1px 2px 3px #666; */
cursor: pointer;
color:#ffffff;
${mobile({ 
  fontSize: "15px" ,
  padding: "10px"
  })}

${mtablet({ 
  fontSize: "12px" ,
  padding: "10px"
 
  })}
`;