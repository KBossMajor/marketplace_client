import { useState } from "react";
import styled from "styled-components";
// import {SidebarData } from "../../data";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import {sliderItems } from "../../data";
import { mobile } from "../../responsive";
// import HomestoreSubcat from "./HomestoreSubcat";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

  
export default function HomestoreSlider() {

  // const [subnav, setSubnav] = useState(false);

  // const showSubnav = () => setSubnav(!subnav);

    const [slideIndex, setSlideIndex] = useState(0);
    const num = sliderItems.length
    const handleClick = (direction) => {
      if (direction === "left") {
        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : num - 1);
      } else {
        setSlideIndex(slideIndex < num - 1 ? slideIndex + 1 : 0);
      }
    };


    setTimeout(() => {
      if (slideIndex < sliderItems.length - 1) {
        setSlideIndex(slideIndex + 1);
      } else {
        setSlideIndex(0);
      }
    }, 5000);
    
    return (
      <>
        <Container>
          {/* <ContainerCategorynav> */}

          {/* <DropDownContainer  */}
           
            {/* > */}
                {/* <DropDownHeader> Explore Products  <i className="fa fa-bars" style={{ marginRight:"5px"}}></i>   */}
                {/* <ExpandMoreIcon style={{color:"white", marginLeft:"5px"}}/> */}
                {/* </DropDownHeader> */}
               
                {/* <DropDownListContainer>
                  
                  <DropDownList > */}
                  
                   {/* {categories.map((c) => (
                    
                    <ListItem key={c}> 
                      <NavLink to={`/search/category/${c}`}>
                      {c}
                      <ArrowForwardIosIcon/>
                      </NavLink>
                      
                     </ListItem>
                     
                     ))} */}
                   
                     
                   {/* {SidebarData.map((item, index) => (
                      <ListItem   onClick={showSubnav}> 
                         {item.title}
                         
                         <ArrowForwardIosIcon/>
                      

                         <HomestoreSubcat item={item} key={index} />
                      
                         
                       </ListItem>
                        ))} */}


                       {/* <ListItem> 
                       Computers & Laptops
                         <ArrowForwardIosIcon/>
                       </ListItem>
                       <ListItem> 
                       PHONES & ACCESSORIES
                         <ArrowForwardIosIcon/>
                       </ListItem>
                       <ListItem> 
                         BAG & SHOES
                         <ArrowForwardIosIcon/>
                       </ListItem>
                       <ListItem> 
                       JEWELRY & WATCHES
                         <ArrowForwardIosIcon/>
                       </ListItem>
                       <ListItem> 
                       JEWELRY & WATCHES
                         <ArrowForwardIosIcon/>
                       </ListItem>
                    
                 
                  
                  
                       <ListItem> 
                         Orders
                         <ArrowForwardIosIcon/>
                         
                       </ListItem>
                       <ListItem> 
                         Orders
                         <ArrowForwardIosIcon/>
                       </ListItem> 
                       
                   
                    
                  </DropDownList>
                </DropDownListContainer>
               
          </DropDownContainer>

          </ContainerCategorynav> */}
        <ContainerSlider>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowLeftOutlined />
        </Arrow>

        <Wrapper slideIndex={slideIndex}>
          {sliderItems.map((item) => (
            <Slide bg={item.bg} key={item.id}>
              <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>{item.desc}</Desc>
                <Button>SHOW NOW</Button>
              </InfoContainer>
            </Slide>
          ))}
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <ArrowRightOutlined />
        </Arrow>
        </ContainerSlider>
      </Container>
      </>
    );
  }




  const Container = styled.div`

     display: flex;
    /* width: 100%; */
    background-color:#f5f5f5;
    padding: 20px;
    font-family: 'Poppins', sans-serif;
    /* padding-bottom: 20px;   */
    `;
  //  const ContainerCategorynav = styled.div`
  //    flex:2.5;
   
  //  `;

   
// const DropDownContainer = styled("div")`
// /* display: inline-block; */
// /* position: relative; */
// /* height: 100px; */
// /* margin: 0 auto; */

// `;

// const DropDownHeader = styled("div")`

// padding: 15px;
//   /* display: block; */
//   text-transform: uppercase;
  
//   /* background: #ffffff; */
//   color: #000;
//   font-weight: 700;

// font-weight: bold;

// /* cursor: pointer; */
// display: flex;

// align-items: center;
// justify-content: space-between;
// /* color:#000; */
// /* margin-left: 25px; */
// /* &:hover {
//  color:#257022c5;
 
// } */
// }
// /* margin-bottom: 0.8em; */
// padding: 0.4em 0.5em 0.4em 1em;
// /* box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
// font-weight: 500;
// font-size: 1.3rem;
// color: #3faffa;
// background: #ffffff; */
// `;

// const DropDownListContainer = styled("div")`
// /* margin: 0 auto; */


// `;

// const DropDownList = styled("ul")`
// /* padding: 0; */
//   width: 270px;
//   /* height: 400px; */
 

//   /* z-index: 50; */
//   -webkit-transition: 0.3s all;
//   transition: 0.3s all;
// /* margin: 0 auto; */
// /* position: absolute; */
// color:#000;

// /* height: 100vh; */

// min-width: 25rem;
// z-index: 5;
// margin: 0;

// border-radius: 0.5rem;

// background: #ffffff;
// border: 2px solid #e5e5e5;
// color: #000;
// font-size: 1.5rem;
// font-weight: 500;
// &:first-child {
//  /* padding-top: 0.8em; */
// }
// `;

// const ListItem = styled("li")`
// position: relative;
// list-style: none;
// /* padding: 1rem; */
// padding: 15px;
// /* margin-top: 0; */
// /* display: flex;

// align-items: center;
// justify-content: space-between; */
// border-bottom:1px solid #DADADA;
// /* margin: 0 auto; */
// /* margin-bottom: 0.5em; */
// cursor: pointer;

// &:hover {
//  color:#257022c5;
//  background: #DDDDDD;
//  /* wid */
// }
// `;



const ContainerSlider = styled.div`
 flex:8;

width: 90%;
height: 400px;
display: flex;
border-radius: 10px;

margin:0 auto;
margin-top:1.8%;
position: relative;
overflow: hidden;
/* ${mobile({ display: "none" })} */
`;

    
    const Arrow = styled.div`
    width: 40px;
    height: 40px;
    background-color: #fff7f7;
    border-radius: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${(props) => props.direction === "left" && "10px"};
    right: ${(props) => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
    &:hover {
    color:#000;
    background: #dddddde1;
    /* background: #257022c5; */
  /
  }
    `;
    
    const Wrapper = styled.div`
    height: 40%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
    `;
    
    const Slide = styled.div`
    margin:0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    
     background-image:url(${(props) => props.bg});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover; 
    
    `;
    
    
    const InfoContainer = styled.div`
    flex: 1;
    padding-bottom: 20%;
    /* padding: 30px; */
    `;
    
    const Title = styled.h1`
    font-size: 20px;
    font-weight: 600;
    width:50%;
    margin: 10px 10px;
    margin-left:8%;
    text-transform: Capitalize;
    font-family: 'Josefin Sans', sans-serif;
    `;
    
    const Desc = styled.p`
    margin: 20px 10px;
    font-family: 'Poppins', sans-serif;
    font-size: 10px;
    margin-left:8%;
    width:60%;
    z-index: 22;
    /* position: absolute; */
    text-transform: Capitalize;
    /* font-weight: 500; */
    letter-spacing: 3px;
    `;
    
    const Button = styled.button`
    padding: 5px;
    font-size: 10px;
    margin-left:8%;
    color:white;
    background-color: #257022c5;
    cursor: pointer;
    `;
  