// import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
// import { useState } from "react";
import styled from "styled-components";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// import { Link } from 'react-router-dom';
// import { mobile, tablet, mtablet  } from "../../responsive";
// import { mobile } from "../../responsive";
// import { useSelector } from 'react-redux';
import { sliderItems } from "../../data";


export default function Slider( {user}) {

  const backend_url = process.env.REACT_APP_API;

  // const userSignin = useSelector((state) => state.userSignin);
  // const { user: user } = userSignin;

  let bgImg = [{
                  id: 1, img: user.seller.bgFirst, caption: user.seller.cpbgFirst
                }, 
                {
                  id: 2, img: user.seller.bgSecond, caption: user.seller.cpbgSecond
              }]
              
          
    return (


      <Container>
        <Carousel showArrows autoPlay showThumbs={false} infiniteLoop={true}>
            {!user.seller.bgFirst ? sliderItems.map((seller) => (
            <div className="sellercaro" key={seller.id}>
                
                <img className="sellerImg" src={backend_url+seller.bg} alt={seller.bg} />
                {/* <Desc>{seller.desc}</Desc> */}
                <p className="legend">{seller.desc}</p>
              
            </div>
            )) : bgImg.map((seller) => (
              <div className="sellercaro" key={seller.id}>
                  
                  <img className="sellerImg" src={backend_url+seller.img} alt={seller.bg} />
                  {/* <Desc>{seller.desc}</Desc> */}
                  <p className="legend">{seller.caption}</p>
                
              </div>
              )) }
        </Carousel>

      </Container>
      

        );
    }
     

        const Container = styled.div`

                              /* width: 100%; */
                              max-width: 75rem ;
                              height: 500px;
                              margin-bottom:3%;
                              margin-left:14%;
                              /* align-items: center;
                              justify-content: center; */
                              /* height: 50vh; */
                              /* display: flex; */
                              position: relative;
                              overflow: hidden;
                          `;

     
  //   const Container = styled.div`

  //   width: 100%;
  //   /* height: 50vh; */
  //   display: flex;
  //   position: relative;
  //   overflow: hidden;
  //   /* ${mobile({ display: "none" })} */
  //   `;
    
  //   const Arrow = styled.div`
  //   width: 50px;
  //   height: 50px;
  //   background-color: #fff7f7;
  //   border-radius: 50%;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   position: absolute;
  //   top: 0;
  //   bottom: 0;
  //   left: ${(props) => props.direction === "left" && "10px"};
  //   right: ${(props) => props.direction === "right" && "10px"};
  //   margin: auto;
  //   cursor: pointer;
  //   opacity: 0.5;
  //   z-index: 2;
  //   &:hover {
  //   color:#000;
  //   background: #dddddde1;
  //   /* background: #257022c5; */
  // /
  // }
  //   `;
    
  //   const Wrapper = styled.div`
  //   height: 100%;
  //   display: flex;
  //   transition: all 1.5s ease;
  //   transform: translateX(${(props) => props.slideIndex * -100}vw);
  //   `;
    
  //   const Slide = styled.div`
  //   margin:0;
  //   width: 100vw;
  //   height: 100vh;
  //   display: flex;
  //   align-items: center;
    
  //    background-image:url(${(props) => props.bg});
  //   background-repeat: no-repeat;
  //   background-position: center center;
  //   background-size: cover; 
    
  //   `;
    
    
  //   const InfoContainer = styled.div`
  //   flex: 1;
  //   padding: 50px;
  //   `;
    
  //   const Title = styled.h1`
  //   font-size: 60px;
  //   font-weight: 600;
  //   width:50%;
  //   margin: 10px 10px;
  //   margin-left:8%;
  //   text-transform: Capitalize;
  //   font-family: 'Josefin Sans', sans-serif;
  //   `;
    
    // const Desc = styled.p`
    // margin: 20px 10px;
    // font-family: 'Poppins', sans-serif;
    // font-size: 20px;
    // margin-left:8%;
    // width:60%;
    // z-index: 22;
    // /* position: absolute; */
    // text-transform: Capitalize;
    // /* font-weight: 500; */
    // letter-spacing: 3px;
    // `;
    
  //   const Button = styled.button`
  //   padding: 10px;
  //   font-size: 20px;
  //   margin-left:8%;
  //   color:white;
  //   background-color: #257022c5;
  //   cursor: pointer;
  //   `;

 