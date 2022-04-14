import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from 'react-redux';
import { Add, Remove } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { useHistory, useParams } from "react-router";
import { createReview , detailsProduct } from '../actions/productActions';
import Rating from '../components/Rating';
import LoadingBox from '../components/loadingBox/LoadingBox';
import MessageBox from '../components/messageBox/MessageBox';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
// import data from '../data';

export default function ProductScreen() {

   // const productId = props.match.params.id;

    const dispatch = useDispatch();
    
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const userSignin = useSelector((state) => state.userSignin);
    const { user: loggedInUser } = userSignin;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
      loading: loadingReviewCreate,
      error: errorReviewCreate,
      success: successReviewCreate,
    } = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const history = useHistory();
    // console.log(useParams());
    const {id: productId} = useParams();

    useEffect(() => {
        if (successReviewCreate) {
          window.alert('Review Submitted Successfully');
          setRating('');
          setComment('');
          dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
        }

        dispatch(detailsProduct(productId));

    }, [dispatch, productId, successReviewCreate]);

    const addToCartHandler = () => {
       history.push(`/cart/${productId}?qty=${qty}`);
    };

    const handleQuantity = (type) => {
        if (type === "dec") {
          qty > 1 && setQty(qty - 1);
        } else {
          qty < product.countInStock && setQty(qty + 1);
        }
    };

    const submitHandler = (e) => {
      e.preventDefault();
      if (comment && rating) {
        dispatch(
          createReview(productId, { rating, comment, name: loggedInUser.name })
        );
      } else {
        alert('Please enter comment and rating');
      }
    };

    return (
          

      <Container>
           <TopButton onClick={history.goBack}>Back to result</TopButton>
        {/* <TopButton>Back to result</TopButton>   */}
      {loading ? (
             <LoadingBox></LoadingBox>
             ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              
          <Wrapper>
            
            <ImgContainer>
              <Image src={product.image} />
            </ImgContainer>
            <InfoContainer>
            <ReviewContainer>
            {product.countInStock > 0 ? (
                <InStock>in stock</InStock>
                ) : (
                    <OutStock>out stock</OutStock>
                )}
              

              <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                ></Rating>
              
                
            </ReviewContainer>
              <Title>{product.name}</Title>
              <Desc>{product.description}</Desc>
              <Price>₦ {product.price}</Price>

              <SellerContainer>
                <Seller> 
                  <NavLink to={`/seller/${product.seller._id}`}>
                    Seller : {product.seller.seller.name}
                  </NavLink>
                </Seller>
                <SellerReview>
                  <Rating
                    rating={product.seller.seller.rating} 
                    numReviews={product.seller.seller.numReviews}
                    ></Rating>
                </SellerReview>
              </SellerContainer>

              {/* <FilterContainer>
                <Filter>
                  <FilterTitle>Color</FilterTitle>
                  <FilterColor>
           
                    <FilterColorOption> Blue</FilterColorOption>
                    <FilterColorOption> Red</FilterColorOption>
                  </FilterColor>
          
                </Filter>
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize>
        
                      <FilterSizeOption> M</FilterSizeOption>
                      <FilterSizeOption> L</FilterSizeOption>
                 
                  </FilterSize>
                </Filter>
              </FilterContainer> */}

             {product.countInStock > 0 &&
              <AddContainer>
                <AmountContainer>
                  <Remove onClick={() => handleQuantity("dec")} />
                  <Amount>{qty}</Amount>
                  <Add onClick={() => handleQuantity("inc")} />
                </AmountContainer>
                <Button  onClick={addToCartHandler}>ADD TO CART</Button>
              </AddContainer>}

            </InfoContainer>
            <div>
            <h2 id="reviews">Reviews</h2>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {loggedInUser ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
          </Wrapper>
       )}
      </Container>
       
    );
 }



 const Container = styled.div`
  flex:9.5;
  /* height: calc(100vh - 70px); */
 /* background-color: #f5f5f5; */
 `;

const Wrapper = styled.div`
  padding: 20px;
  text-transform: Capitalize;
    font-family: 'Josefin Sans', sans-serif;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const NavLink = styled(Link)`
color: #000;

  text-decoration: none;
  &:hover {
    color:#257022c5;
    border-bottom: 1px solid #257022c5;
    
  }
  `;

const TopButton = styled.button`
margin: 15px;

/* margin-top: 10px; */
padding: 10px;
font-weight: 600;
cursor: pointer;
border: ${(props) => props.type === "filled" && "none"};
background-color: ${(props) =>
  props.type === "filled" ? "black" : "transparent"};
color: ${(props) => props.type === "filled" && "white"};
`;
const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 30px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  /* font-weight: 200; */
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px
  /* font-weight: 300; */
`;

const InStock = styled.span`
  background-color: #257022c5;
  padding:2px;
  color:white;
  margin-right:2px;
  font-size: 12px;
  /* font-weight: 100;
  font-size: 40px; */
`;

const OutStock = styled.span`
  background-color: red;
  padding:1px;
  color:white;
  font-size: 12px;
  /* font-weight: 100;
  font-size: 40px; */
`;

const Price = styled.span`
  /* font-weight: 100; */
  font-size: 30px;
`;
const Seller = styled.span`
  /* font-weight: 100; */
  font-size: 16px;
`;
const SellerReview = styled.span`
  /* font-weight: 100; */
  /* font-size: 20px; */
`;

// const FilterContainer = styled.div`
//   width: 50%;
//   margin: 30px 0px;
//   display: flex;
//   justify-content: space-between;
//   ${mobile({ width: "100%" })}
// `;

const ReviewContainer = styled.div`
  width: 60%;
  margin: 25px 0px;
  margin-top:5px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const SellerContainer = styled.div`
  width: 60%;
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

// const Filter = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const FilterTitle = styled.span`
//   font-size: 20px;
//   font-weight: 200;
// `;

/* const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`; */

// const FilterSize = styled.select`
//   margin-left: 10px;
//   padding: 5px;
// `;

// const FilterColor = styled.select`
//   margin-left: 10px;
//   margin-right: 10px;
//   padding: 5px;
// `;

// const FilterSizeOption = styled.option``;
// const FilterColorOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #257022c5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: 2px solid #257022c5;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;

  &:hover {
    background-color: #f8f4f4;
  }
`;
