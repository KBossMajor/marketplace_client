import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import {
  // FavoriteBorderOutlined,
  SearchOutlined,
  // ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";

export default function Product(props) {
  const { product } = props;

  const numb =  () => {

    // console.log(window.location.replace(`/seller/${product.seller._id}`))


    // window.location.reload()

 
  
 }
  const backend_url = process.env.REACT_APP_API;
  // console.log(props);
  return (

  <Container>
    {/* <Circle /> */}
    <Image src={backend_url+product.image} alt={product.name}/>
    <Info>
      
      {/* <Icon>
        <FavoriteBorderOutlined />
      </Icon> */}
      {/* <Icon> */}
        {/* <Link to={`/product/${product._id}`}> */}
        {/* <SearchOutlined /> */}
        {/* </Link> */}
      {/* </Icon> */}
      {/* <Icon>
        <iconCart />
      </Icon> */}
    

    <CartButton>
      <NavView  to={`/product/${product._id}`}>
      View Product <SearchOutlined style={{ color: "black", marginLeft:"3px", fontSize:"20PX"}} />
      </NavView >
      </CartButton>
    </Info>
    <InfoContainer>
    <InfoRating>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}>
          </Rating>
      </InfoRating>

      <InfoName>
            {product.name}
       </InfoName>
      

        <InfoDetail>
        ₦{product.price}
        </InfoDetail>
        <InfoDetail>
        <NavLink  onClick={numb} to={`/seller/${product.seller._id}`} >
             {product.seller.seller.name}
             
          </NavLink>
        </InfoDetail>   

            
    </InfoContainer>
    
  </Container>
  
   
  );
}



const Info = styled.div`
  opacity: 0;
  width:100%;
  height: 80%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  /* border: 1px solid grey; */
  z-index: 3;
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const Container = styled.div`
  /* flex: 1; */
  /* align-items: flex-start; */
  margin: 7px;
  margin-top:40px;
  margin-bottom:15px;
 width: 280px;
  height: 350px;
  /* display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem; */
  /* list-style: none; */
  /* padding: 0; */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  /* background-color: #f5fbfd; */
  /* background-color: #DDDDDD; */
  position: relative;

 /* &:hover ${Info}{
    opacity: 1;
  }  */
`;
const InfoContainer = styled.div`
/* display:block; */
/* position: absolute; */
display: flex;
margin-top:10%;
/* background-color: #DDDDDD; */
height: 25%;
width: 100%;
flex-direction: column;
align-items: center;
justify-content: flex-end;
text-transform: Capitalize;
font-family: 'Josefin Sans', sans-serif;
/* display: flex;
  flex-wrap: wrap;
  justify-content: space-between; */
/* right:0; */
/* bottom:0; */
/* display: flex;
  align-items: center;
  justify-content: center; */
 /* justify-self: center;
  align-self: center;
  text-align: center; */
  color: #222

`;

const InfoDetail = styled.div`
/* margin: 5px 0; */

margin-top:5px;
margin-left:6px;
  color: #222
/* flex: 1;
padding: 50px; */
`;

const InfoName = styled.div`
/* margin: 5px 0; */
margin-top:5px;
/* padding-right:30px; */
  color: #222
/* flex: 1;
padding: 50px; */
`;

const InfoRating = styled.div`
/* margin: 5px 0; */
margin-top:5px;
padding-right:30px;
  /* color: #222 */
/* flex: 1;
padding: 50px; */
`;

const CartButton = styled.button`
/* margin: 5px 0; */
width: 100%;
margin-top:236px;
display: flex;
padding: 1rem;

  align-items: center;
  justify-content: center;
  text-transform: Capitalize;
 font-family: 'Josefin Sans', sans-serif;
  &:hover {
    background: #257022c5;
    color:#ffff
  }


`;

const NavLink = styled(Link)`
color: #000;
  /* color: #000;
  font-family: 'Manrope', sans-serif; */
  /* font-size: 11px; */

  /* padding: 0 15px; */
  /* font-size: 16px;
  line-height: 80px;
  font-weight: 700; */
  text-decoration: none;
  &:hover {
    color:#257022c5;
    border-bottom: 1px solid #257022c5;
    /* background: #DDDDDD; */
    /* wid */
  }
  `;


  const NavView = styled(Link)`
color: #000;
  /* color: #000;
  font-family: 'Manrope', sans-serif; */
  /* font-size: 11px; */

  /* padding: 0 15px; */
  /* font-size: 16px;
  line-height: 80px;
  font-weight: 700; */
  text-decoration: none;
  &:hover {
    color:#FFFF;
    /* border-bottom: 1px solid #257022c5; */
    /* background: #DDDDDD; */
    /* wid */
  }
  `;

/* const iconCart = styled(ShoppingCartOutlined)`
  color: #000;
  



  &:hover ${Info}{
    color:white;
  }
`; */


// const Circle = styled.div`
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   background-color: white;
//   position: absolute;
// `;

const Image = styled.img`
  /* height: 75%; */
  width: 290px;
  height: 280px;
  /* border: 1px solid grey; */
  /* margin-top: -10px; */
  /* position: absolute; */
  /* top: 0;
  left: 0; */
  /* width: 100%; */
  z-index: 2;
`;

// const Icon = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: white;
//   /* background-color: rgba(0, 0, 0, 0.6); */
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 10px;
//   margin-left:auto;
//   transition: all 0.5s ease;
//   &:hover {
//     background-color: #e9f5f5;
//     transform: scale(1.1);
//   }
// `;