import React, { useEffect, useState } from 'react';
// import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from "styled-components";
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/loadingBox/LoadingBox';
import MessageBox from '../components/messageBox/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import ReactPaginate from "react-paginate";
import { prices, ratings } from '../utils';
import { useHistory } from 'react-router';
import { mobile } from "../responsive";
import "./paginate.css";


export default function SearchScreen(props) {



 

  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = 'newest',
  } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;



  
  const [pageNumber, setPageNumber] = useState(0);
  const [pagelenght, setPagelenght] = useState(0);
  // const [pagelenght1, setPagelenght1] = useState(false);

  const productPerPage = 5;
  const pagesVisited = pageNumber * productPerPage;

  const numb =  () => {


     window.location.reload()

    // let produ = await setPagelenght(0);

    //  setPagelenght(0)
    // if (produ) {
      // listproduct(products)
    // }
   
   
 
    // console.log(p);
   
  }

  // console.log(productList.products);
  // console.log(setPagelenght1)
  // const listpr = productList.products
  // console.log(listpr.length)
  


  const listproduct = (product) => {

    let currentIndex = product.length 
    console.log(pagelenght)

    if ((pagelenght === 0 ) ) {

      setPagelenght(currentIndex)
    } 
    // else if (pagelenght1 === true) {
    //   console.log(product.length)
    //   // setPagelenght(currentIndex)

    // } else {

    //   setPagelenght(0)

    // }

    

  
  
    return product;
}



// const listproduct1 = (product) => {

//   let currentIndex = product.length 

//   // if (pagelenght1 === true ) {
//     setPagelenght(currentIndex)
//   // }

  
//   console.log(currentIndex)


//   return true;
// }






  
  const pageCount = Math.ceil(pagelenght / productPerPage);
// console.log(pageCount)

// console.log(pageCount)


  useEffect(() => {

    // const pageCount = Math.ceil(pagelenght / productPerPage);

    // setPagelenght(products.length);
   dispatch(
      listProducts({
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        rating,
        order,
      })
      
    );
   
  }, [category, dispatch, name, max, min, order, rating,]);


  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    // setPagelenght1(true);
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
   
    
    // window.location.reload();
  };


  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  
  // const displayUsers = products
  //   .slice(pagesVisited, pagesVisited + productPerPage)
  //   .map((user) => {
  //     return (
  //       <div className="user">
  //         <h3>{user.firstName}</h3>
  //         <h3>{user.lastName}</h3>
  //         <h3>{user.email}</h3>
  //       </div>
  //     );
  //   });

  return (
    <>


     {/* {!loading && listproduct1(products)} */}
    
    <div>
       
       <FilterContainer>
        <Filter>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          // {setPagelenght(products.length)}

          // {setPagelenght({products.length})}
            
          // {listproduct1(product)}
          <FilterText> Products Result: {products.length}  </FilterText>
          // {!loading && setFollowed(currentUser.followings.includes(user?._id))}
          //  {setFollowed(products.length)}
        )}

         {/* <>
         {!loading && setPagelenght(products.length))}
         </> */}
          {/* <FilterText> Products Result: {products.length}</FilterText> */}
        
        
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select  value={order}
            onChange={(e) => {
              history.push(getFilterUrl({ order: e.target.value }));
            }}>
            <Option value="newest">Newest Arrivals</Option>
            <Option value="lowest">Price: Low to High</Option>
            <Option value="highest">Price: High to Low</Option>
            <Option  value="toprated">Avg. Customer Reviews</Option>
           
          </Select>
        </Filter>
      </FilterContainer>
{/* 
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
         <div>
          Sort by{' '}
          <select
            value={order}
            onChange={(e) => {
              history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </div>
      </div> */}

      <div className="row1 top">
        <SideBar className="col-3">
          <h3>Categories</h3>
          <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul onClick={numb}>
                <li >
                  <SideLink
                    className={'all' === category ? 'active' : ''}
                    to={getFilterUrl({ category: 'all' })}
                  >
                    Any
                  </SideLink>
                </li>
                {categories.map((c) => (
                  <li key={c} >
                    <SideLink
                      className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </SideLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3>Price</h3>n\
            <ul onClick={numb} >
            {prices.map((p) => (
                <li key={p.name}>
                  <SideLink
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                    }
                  >
                  {p.name}
                  </SideLink>
                </li>
              ))}
            </ul>
            </div>
          <div onClick={numb}>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <SideLink
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'active' : ''}
                  >
                    <Rating caption={' & up'} rating={r.rating}></Rating>
                  </SideLink>
                </li>
              ))}
            </ul>
          </div>
        </SideBar>
        <div className="col-9">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <Wrapper>
           
                {listproduct([...products]).slice(pagesVisited, pagesVisited + productPerPage).map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
                </Wrapper>
            
            </>
          )}


             <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              /> 
        </div>    

              
      </div>

     

        
    </div>


   
    </>
  );
}



const Wrapper = styled.div`
 justify-content: center;
  align-items: center;
  /* align-items: flex-start; */
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 70px;
  /* justify-content: space-between; */
`;


const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SideBar = styled.div`
flex: 1 1 25rem;
padding-left: 40px;
padding-top: 15px;
background-color: white;
padding: 20px;
box-shadow: 1px;
box-shadow: 4px 5px 8px #888;
margin-left: 20px;
margin-top: 30px;
border-radius: 12px;
`;
// const CatResult = styled.div`

// `;



const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 15px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
padding: 10px;
margin-right: 20px;
border-radius: 12px;
background-color: white;
border: none;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const SideLink = styled(Link)`
  margin-left: 10px;
  color: black;
  text-decoration: none;
`;