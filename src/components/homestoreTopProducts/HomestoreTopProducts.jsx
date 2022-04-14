import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from '../../components/Product';
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { mobile } from "../../responsive";

// import {categories} from "../../data";
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function HomestoreTopProducts(props) {
    const { products, loading, error} = props;
    // console.log( products);
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
    slidesToShow: 4,
    // slidesToScroll: 1,
    // infinite={false}
    // slidesToScroll={3}
    centerMode: true,
    // centerPadding: "100px",
    responsive: [
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          // centerPadding: "10px",
          // centerMode: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          centerPadding: "90px",
          centerMode: true,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
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
                {/* <Link to={"/search/name/"}><h1 style={{ marginBottom: "-60px" }}>All Products</h1></Link> */}
                <Link to={"/search/name/"}>All Products</Link>
                

                  {loading ? (
                                    <LoadingBox></LoadingBox>
                                ) : error ? (
                                    <MessageBox variant="danger">{error}</MessageBox>
                                ) : (

                  <Slider {...carouselProperties}>
                    { products.map((product) => (
                        <Wrapper>
                          <Product key={product._id} product={product}></Product>
                        </Wrapper>

                    ))}
                  </Slider>
                    )}
                    
                    
                </div>
            </Container>


            {/* <Container>
              <div  className="carousel">
                <h1 style={{ marginBottom: "-10px" }}>All Sellers</h1>
              

                {loading ? (
                                  <LoadingBox></LoadingBox>
                              ) : error ? (
                                  <MessageBox variant="danger">{error}</MessageBox>
                              ) : (

                <Slider {...carouselProperties}>
                  { products.map((product) => (
                      <Wrapper>
                        <Product key={product._id} product={product}></Product>
                      </Wrapper>

                  ))}
                </Slider>
                  )}
                  
                  
              </div>
            </Container> */}


     </>  
    );
  }



    const Container = styled.div`
          display: flex;
           width: 90%;
          padding: 10px;
            margin:0 auto;
          margin-top: 60px;
          justify-content: center;
          ${mobile({ padding: "0px", flexDirection:"column" })} 

      `;






const Wrapper = styled.div`

  /* margin: 7px; */
  /* margin-top:40px; */
  margin-bottom:10%;


`;





