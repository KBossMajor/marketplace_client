import "./homestore.css"

import styled from "styled-components";
import { Link} from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { mobile } from "../../responsive";
import {categories} from "../../data";
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function HomestoreCategories() {
    const PreviousBtn = (props) => {
      // console.log(props);
      const { className, onClick } = props;
      return (
        <div className={className} onClick={onClick}>
          <ArrowBackIos style={{ color: "green", fontSize: "20px" }} />
        </div>
      );
    };

    const NextBtn = (props) => {
      const { className, onClick } = props;
      return (
        <div className={className} onClick={onClick}>
          <ArrowForwardIos style={{ color: "green", fontSize: "20px" }} />
        </div>
      );
    };
  
    const carouselProperties = {
      prevArrow: <PreviousBtn />,
      nextArrow: <NextBtn />,
      slidesToShow: 5,
      // slidesToScroll: 1,
      // infinite={false}
      // slidesToScroll={3}
      centerMode: true,
      centerPadding: "170px",
      responsive: [
        {
          breakpoint: 426,
          settings: {
            slidesToShow: 1,
            centerMode: false,
          },
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 3,
            centerMode: false,
          },
        },
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 4,
            centerMode: false,
            slidesToScroll: 2,
          },
        },
      ],
    };

    return (
      <>
          <Container>
          <div style={{ margin: "0px" }} className="carousel">
            <h1>Categories</h1>
            {/* <Slider {...carouselProperties}> */}

            <Slider {...carouselProperties}>
              {categories.map((item) => (
                <Card item={item} />
              ))}
            </Slider>
          </div>
          </Container>
     </>  
    );
  }



  const Card = ({ item }) => {
    return (


      <Wrapper>
      <Link to={`/products/${item.cat}`}>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
      </Link>
    </Wrapper>
    );
  };

  const Container = styled.div`
  display: flex;
  width: 90%;
  padding: 20px;
  margin:0 auto;
  justify-content: center;
  ${mobile({ padding: "0px", flexDirection:"column" })}

`;



const Wrapper = styled.div`
/* display: flex; */
/* width: 90%; */
  flex: 1;
  margin: 1px;
  height: 40vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}

`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;




//   const Container = styled.div`
//   height: 53px;
//   margin:15px;
//   padding:10px;

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color:#257022c5
// `;
// const Wrapper = styled.div`

//   align-items: center;
//   justify-content: space-between;
// `;

// const NavLink = styled(Link)`
//   color: #000;
//   display: flex;
 
//   align-items: center;
//   justify-content: space-between;
//   text-transform: capitalize;
//   font-family: 'Volkhov', sans-serif;
//   font-size: 14px;

//   text-decoration: none;
//   &:hover {
//     color:#257022c5;
//     /* background: #DDDDDD; */
//     /* wid */
//   }
//   `;



// const Menu = styled.ul`
//   display: flex;
//   list-style: none;

//   @media only screen and (max-width: 480px) {
//     display: none;
//   }
// `;

// const MenuItem = styled.li`
//   margin-right: 37px;
//   font-size: 14px;
//   font-weight: bold;
//   color: white;
  
// `;

