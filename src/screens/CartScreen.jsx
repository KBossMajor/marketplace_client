import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation, useHistory, useParams } from "react-router";
// import { useLocation,  useParams } from "react-router";
import { addToCart, removeFromCart } from '../actions/cartActions';
// import { addToCart} from '../actions/cartActions';
import MessageBox from '../components/messageBox/MessageBox';
// import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";


export default function CartScreen() {
  
  const location = useLocation();
  const history = useHistory();
  const {id: productId} = useParams();

  const qty = location.search
    ? Number( location.search.split('=')[1])
    : 1;

    const cart = useSelector((state) => state.cart);
    const { cartItems, error } = cart;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/signin?redirect=shipping');
  };

  return (
    <>
    <Container>
    
    {error && <MessageBox variant="danger">{error}</MessageBox>}
         {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/homestore">Go Shoping</Link>
          </MessageBox>
         ) : (
    
    <Wrapper>
      <Title>YOUR BAG</Title>
      <Top>
        <TopBack onClick={history.goBack}>CONTINUE SHOPPING</TopBack>
        <TopTexts>
          <TopText>Shopping Bag ({cartItems.reduce((a, c) => a + c.qty, 0)})</TopText>
          {/* <TopText>Your Wishlist (0)</TopText> */}
        </TopTexts>
        {/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
      </Top>
      <Bottom>
        <Info>
          {cartItems.map((item) => (
            <Product>
              <ProductDetail>
                <Image src={item.image} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {item.name}
                  </ProductName>
                  <ProductId>
                    <b>SELLER:</b> {item.seller.seller.name}
                  </ProductId>
                  <ProductColor color={item.color} />
                  {/* <ProductSize>
                    <b>Size:</b> {item.size}
                  </ProductSize> */}
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                   <Filter>
                    <FilterTitle>Quantity</FilterTitle>
                    <FilterQty value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }>
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <FilterQtyOption key={x + 1} value={x + 1}>{x + 1}</FilterQtyOption>
                      ))}
                    </FilterQty>
                </Filter>
                  {/* <Add />
                  <ProductAmount>{item.qty}</ProductAmount>
                  <Remove /> */}
                </ProductAmountContainer>
                <ProductPrice>
                ₦{item.price}
                  {/* $ {product.price * product.quantity} */}
                </ProductPrice>
              </PriceDetail>
              <TopButton onClick={() => removeFromCartHandler(item.product)}>DELETE</TopButton>
            </Product>

        //  <Hr/>
         ))}
          {/* <Hr/> */}
        </Info>
        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemPrice>   ₦
                 {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Estimated Shipping</SummaryItemText>
            <SummaryItemPrice>₦ 0.00</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Shipping Discount</SummaryItemText>
            <SummaryItemPrice>₦ 0.00</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice></SummaryItemPrice>
          </SummaryItem>
         
            <Button  onClick={checkoutHandler}
              
              disabled={cartItems.length === 0}>
                Proceed to Checkout
           </Button>
         
        </Summary>
      </Bottom>
      </Wrapper>
      )}
     
  </Container>
  </>
  
    
  );
}




const Container = styled.div`
 flex:9;
 /* background-color: #f5f5f5;
 margin:0; */
`;

const Wrapper = styled.div`
/* font-family: 'Josefin Sans', sans-serif; */
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;



const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 7px;
  font-weight: 600;
  height:30px;
  /* margin :0 auto; */
  margin :10px;
  margin-right:9%;
  margin-top:2%;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopBack = styled.button`
  padding: 7px;
  font-weight: 600;
  height:30px;
  margin-right:24%;
  /* margin :0 auto; */
  /* margin :10px;
  margin-right:9%;
  margin-top:2%; */
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  font-family: 'Josefin Sans', sans-serif;
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 16px;
  font-weight: 400;
`;



const FilterQty = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterQtyOption = styled.option``;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
 font-family: 'Josefin Sans', sans-serif;
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 100px;
  height:100px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
   margin-bottom :10px;
   /* font-family: 'Josefin Sans', sans-serif; */
`;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

// const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Josefin Sans', sans-serif;
  /* font-weight: 500; */
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

// const ProductAmount = styled.div`
//   font-size: 24px;
//   margin: 5px;
//   ${mobile({ margin: "5px 15px" })}
// `;

const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 400;
  ${mobile({ marginBottom: "20px" })}
`;

// const Hr = styled.hr`
//   background-color: #eee;
//   border: none;
//   height: 1px;
// `;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  background-color: #ffff;
  border-radius: 10px;
  padding: 20px;
  /* height: 50vh; */
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #257022c5;
  color: white;
  font-weight: 600;
`;