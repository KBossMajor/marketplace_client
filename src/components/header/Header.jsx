import React  from 'react';

import { Link, Route } from 'react-router-dom';
import styled from "styled-components";
import { mobile } from "../../responsive";
// import { Badge } from "@material-ui/core";
// import { ShoppingCartOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import './header.css';
import { useState, useEffect } from "react";
import { signout } from '../../actions/userActions';
import SearchBox from '../SearchBox';
import { listProductCategories } from '../../actions/productActions';
import LoadingBox from '../loadingBox/LoadingBox';
import MessageBox from '../messageBox/MessageBox';
import {
 
  FaHashtag,

} from "react-icons/fa";



export default function Header() {

    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    // const cart = useSelector((state) => state.cart);
    // const { cartItems } = cart;
   

    const [isOpen, setIsOpen] = useState(false);
    // const [isOpenn, setIsOpenn] = useState(false);
    // const toggling = () => setIsOpen(!isOpen);

    const userSignin = useSelector((state) => state.userSignin);
    const { user: loggedInUser } = userSignin;

    // console.log(loggedInUser);
    
    const dispatch = useDispatch();

    const backend_url = process.env.REACT_APP_API;
    
    const signoutHandler = () => {
      dispatch(signout());
    };
    // console.log{loggedInUser.isAdmin }

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
      loading: loadingCategories,
      error: errorCategories,
      categories,
    } = productCategoryList;
    useEffect(() => {
      
      dispatch(listProductCategories());
    }, [dispatch]);

    return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Sidebar>
            <button
                type="button"
                className="open-sidebar"
                onClick={() => setSidebarIsOpen(true)}
              >
                <i className="fa fa-bars"></i>
            </button>
            </Sidebar>
            <Logo>
               <Link   to='/' style={{ textDecoration: "none" }}>
                <LogoImage src={`${backend_url}/images/logo.png`}></LogoImage>
             
             
            </Link>
        </Logo> 
          </Left>
          <Center>
            <SearchContainer>
              <Route
                  render={({ history }) => (
                    <SearchBox history={history}></SearchBox>
                  )}
              ></Route>
            </SearchContainer>
            
          </Center>
          <Right>
          <Link className="explore" to='/homestore'>
      <FaHashtag className='exp' />
          Explore
      </Link>

          {loggedInUser ? (
          <DropDownContainer 
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            >
              <DropDownHeader 
                  > {loggedInUser.username} <i className="fa fa-caret-down"></i> 
            </DropDownHeader>
              {isOpen && (
                <DropDownListContainer>            
                  <DropDownList>
                      {(loggedInUser && loggedInUser.isAdmin &&

                        <>

                          <NavLink to="/dashboard">
                            <ListItem> 
                            Dashboard
                            </ListItem>
                          </NavLink>
                        
                          
                          <NavLink to="/productlist">
                            <ListItem> 
                              Products
                            </ListItem>
                          </NavLink>

                        
                          <NavLink to="/orderlist">
                            <ListItem> 
                              Orders
                            </ListItem>
                          </NavLink>

                          <NavLink to="/userlist">
                            <ListItem> 
                              Users
                            </ListItem>
                          </NavLink>
                        </>
                      )} 

                      {(loggedInUser && loggedInUser.isSeller && !loggedInUser.isAdmin && 
                          <>
                            <NavLink to={`/profile/${loggedInUser.username}`}>
                              <ListItem> 
                                  Profile
                              </ListItem>
                            </NavLink>

                            <NavLink to="/productlist/seller">
                              <ListItem> 
                                Product
                              </ListItem>
                            </NavLink>
                        
                            <NavLink to="/orderlist/seller">
                              <ListItem> 
                                Orders
                              </ListItem>
                            </NavLink>

                          </>
                        
                      )}

                      

                      {(loggedInUser && 
                        <>
                          <NavLink to="/orderhistory"> <ListItem>Order History</ListItem></NavLink>
                            
                          <NavLink to="#signout" onClick={signoutHandler}>
                              <ListItem>
                                  Sign Out
                              </ListItem>
                          </NavLink>
                          </>
                      )}   
                      
                  </DropDownList>
                </DropDownListContainer>
            )}
          </DropDownContainer>
            ) : (
              <NavLink to="/signin">
              <MenuItem>SIGN IN</MenuItem>
            </NavLink>
                )}

      {/* {loggedInUser && loggedInUser.isSeller && ( 
          <DropDownContainer 
              onMouseEnter={() => setIsOpenn(true)}
              onMouseLeave={() => setIsOpenn(false)}
              >
                  <DropDownHeader >SELLER</DropDownHeader>
                  {isOpenn && (
                  <DropDownListContainer>
                    <DropDownList>
                    
                      <NavLink to="/profilestore">
                        <ListItem> 
                            Seller profile
                        </ListItem>
                      </NavLink>
                    
                      
                      <NavLink to="/productlist/seller">
                        <ListItem> 
                          Product
                        </ListItem>
                      </NavLink>
                  
                    
                    <NavLink to="/orderlist/seller">
                        <ListItem> 
                          Orders
                        </ListItem>
                      </NavLink>
                      
                    </DropDownList>
                  </DropDownListContainer>
                  )}
            </DropDownContainer>
          )} */}


        {/* {loggedInUser && loggedInUser.isAdmin && ( 
          <DropDownContainer 
              onMouseEnter={() => setIsOpenn(true)}
              onMouseLeave={() => setIsOpenn(false)}
              >
                  <DropDownHeader >ADMIN</DropDownHeader>
                  {isOpenn && (
                  <DropDownListContainer>
                    <DropDownList>
                    
                      <NavLink to="/dashboard">
                        <ListItem> 
                        Dashboard
                        </ListItem>
                      </NavLink>
                    
                      
                      <NavLink to="/productlist">
                        <ListItem> 
                          Products
                        </ListItem>
                      </NavLink>
                  
                    
                    <NavLink to="/orderlist">
                        <ListItem> 
                          Orders
                        </ListItem>
                      </NavLink>

                      <NavLink to="/userlist">
                        <ListItem> 
                          Users
                        </ListItem>
                      </NavLink>
                      
                    </DropDownList>
                  </DropDownListContainer>
                  )}
            </DropDownContainer>
          )} */}
        
            {/* <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={5} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
            </Link> */}
          </Right>
        </Wrapper>
      </Container>
    
      <aside className={sidebarIsOpen ? 'open' : ''}>
        <ul className="categories">
          <li>
            <strong>Categories</strong>
            <button
              onClick={() => setSidebarIsOpen(false)}
              className="close-sidebar"
              type="button"
            >
              <i className="fa fa-close"></i>
            </button>
          </li>
          {loadingCategories ? (
            <LoadingBox></LoadingBox>
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            categories.map((c) => (
              <li key={c}>
                <Link
                  to={`/search/category/${c}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  {c}
                </Link>
              </li>
            ))
          )}
        </ul>
      </aside>
    </>
        // <header className="row">
        //     <div>
        //         <Link className="brand" to="/">
        //             Home
        //         </Link>
               
        //     </div>
        //     <div>
        //         <Link to="/cart">Cart
        //             {cartItems.length > 0 && (
        //             <span className="badge">{cartItems.length}</span>
        //         )}
        //         </Link>
        //         {loggedInUser ? (
        //         <div className="dropdown">
        //             <Link to="#">
        //             {loggedInUser.username} <i className="fa fa-caret-down"></i>{' '}
        //             </Link>
        //             <ul className="dropdown-content">
                     
        //              <li>
        //               <Link to="/orderhistory">Order History</Link>
        //             </li>
        //             <li>
        //             <Link to="#signout" onClick={signoutHandler}>
        //             Sign Out
        //             </Link>
        //             </li>
        //             </ul>
        //         </div>
        //     ) : (
        //       <Link to="/signin">Sign In</Link>
        //     )}
        //     {loggedInUser && loggedInUser.isSeller && (
        //       <div className="dropdown">
        //         <Link to="#admin">
        //           Seller <i className="fa fa-caret-down"></i>
        //         </Link>
        //         <ul className="dropdown-content">
        //           {/* <li>
        //               <Link to="/profilestore">Seller Profile</Link>
        //              </li> */}
        //           <li>
        //             <Link to="/productlist/seller">Products</Link>
        //           </li>
        //           <li>
        //             <Link to="/orderlist/seller">Orders</Link>
        //           </li>
        //         </ul>
        //       </div>
        //     )}
        //     {loggedInUser && loggedInUser.isAdmin && (
        //       <div className="dropdown">
        //         <Link to="#admin">
        //           Admin <i className="fa fa-caret-down"></i>
        //         </Link>
        //         <ul className="dropdown-content">
        //           <li>
        //             <Link to="/dashboard">Dashboard</Link>
        //           </li>
        //           <li>
        //             <Link to="/productlist">Products</Link>
        //           </li>
        //           <li>
        //             <Link to="/orderlist">Orders</Link>
        //           </li>
        //           <li>
        //             <Link to="/userlist">Users</Link>
        //           </li>
        //         </ul>
        //       </div>
        //     )}
        //     </div>
        // </header>
  )
}


const Container = styled.div`
  height: 70px;
  position: sticky;
  top: 0px;
  z-index: 5;
 
  background-color:white;
  ${mobile({ height: "50px" })}
`;

const Sidebar = styled.div`
  display: none;
  ${mobile({ display: "inline-block" })}
`;


const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;



const SearchContainer = styled.div`
  /* border: 0.5px solid lightgray; */
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  width:60%;
`;

// const Input = styled.input`
//   width:60%;
//   background-color: #f5f5f5;
//   border: none;
//   outline: none;
//   padding: 1.2rem;
//   /* border-top-left-radius: 5px;
//   border-bottom-left-radius: 5px; */
//   &:hover {
//     border: 0.1rem #257022c5 solid;
//     }
//   &:focus {
//     /* box-shadow: 0 0 0 0.2rem #257022c5;
//     backdrop-filter: blur(12rem); */
//     /* outline: none;
//     border: none; */
//   }
//   ${mobile({ width: "50px" })}
// `;


// const Select = styled.select`
//   width: 15%;
//   height:39px;
//   background: #DDDDDD;
//   /* border: 1px solid #DDDDDD; */
//   color: #000;
//   /* border: none; */
//   outline: none;
//   border-top-left-radius: 5px;
//   border-bottom-left-radius: 5px;
//   padding-left: 10px;
//   font-size: 14px;
//   border:none;
//   margin-left: 10px;

//        option {
//          color: black;
//          background: white;
//          font-weight: small;
//          display: flex;
//          white-space: pre;
//          min-height: 20px;
//          padding: 0px 2px 1px;
//        }
// `;

// const Button = styled.div`
// /* padding: 10px;
// font-size: 20px; */
// display: flex;
// align-items: center;
// justify-content: center;
// /* border-radius: 5px; */
// border-bottom-right-radius: 5px;
// border-top-right-radius: 5px;
// width: 48px;;
// height:39px;
// background-color: #257022c5;
// cursor: pointer;
// `;


const Center = styled.div`
  flex: 2;
  text-align: center;
  /* width:80%; */
`;

const Logo = styled.div`
  height: 60px;
  /* font-weight: bold; */
  ${mobile({ fontSize: "24px" })}
`;


const LogoImage = styled.img`
   width: 100%;
  height:60px;
  /* border-radius: 50%; */
  object-fit: cover;
  cursor: pointer;
  /* font-weight: bold; */
 
`;


const NavLink = styled(Link)`
  color: #000;
  font-family: 'Manrope', sans-serif;
  font-size: 11px;

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

const DropDownContainer = styled("div")`
   display: inline-block;
  position: relative;
  /* margin: 0 auto; */
  
`;

const DropDownHeader = styled("div")`
/* cursor: pointer; */

font-size: 13px;
  cursor: pointer;
  color:#000;
  /* display: flex;
 
  align-items: center;
  justify-content: space-between; */
  
  /* margin-left: 25px; */
  &:hover {
    color:#257022c5;
    /* background: #DDDDDD; */
    /* wid */
  }

  /* margin-bottom: 0.8em; */
  padding: 0.4em 0.5em 0.4em 1em;
  /* box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
  background: #ffffff; */
`;

const DropDownListContainer = styled("div")`

  
`;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  
  position: absolute;
 
  /* display: none; */
  right: 0;
  min-width: 16rem;
  /* padding: 1rem; */
  z-index: 5;
  /* background-color: #203040; */
  margin: 0;
  /* margin-top: 0.4rem; */
  border-radius: 0.5rem;
  /* padding-left: 1em; */
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #000;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    /* padding-top: 0.8em; */
  }
`;

const ListItem = styled("li")`
  list-style: none;
  padding: 1.5rem;
  margin-top: 0;
  padding-left: 9%;
  /* margin-bottom: 0.5em; */
  cursor: pointer;

  &:hover {
    color:#257022c5;
    background: #DDDDDD;
    /* wid */
  }
`;


const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  color:#000;
  font-family: 'Manrope', sans-serif;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
