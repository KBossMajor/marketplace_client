import styled from "styled-components";
import { useState, useEffect } from "react";
import { listProductCategories } from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Right from "../../components/right/Right";
// import Left from "../../components/left/Left";




export default function Search () {

    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
      // loading: loadingCategories,
      // error: errorCategories,
      categories,
    } = productCategoryList;
    useEffect(() => {
      dispatch(listProductCategories());
    }, [dispatch]);
 
 
     return (
      
     <Container>
       {/* <Left /> */}
      <Wrapper>
        <Left>
        <DropDownContainer 
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            >
                <DropDownHeader> <i className="fa fa-bars" style={{ marginRight:"5px"}}></i>  Categories 
                <ExpandMoreIcon style={{color:"white", marginLeft:"5px"}}/>
                </DropDownHeader>
                {isOpen && (
                <DropDownListContainer>
                  
                  <DropDownList >
                  
                   {categories.map((c) => (
                    
                    <ListItem key={c}> 
                      <NavLink to={`/search/category/${c}`}>
                      {c}
                      <ArrowForwardIosIcon/>
                      </NavLink>
                      
                     </ListItem>
                     
                     ))}
                   
                     
{/*                     
                      <ListItem> 
                         Product
                         <ArrowForwardIosIcon/>
                       </ListItem>
                    
                 
                  
                  
                       <ListItem> 
                         Orders
                         <ArrowForwardIosIcon/>
                       </ListItem> */}
                   
                    
                  </DropDownList>
                </DropDownListContainer>
                )}
          </DropDownContainer>
          {/* <Logo>Categories</Logo> */}
          <Menu>
          <NavLink to='/homestore'>
            <MenuItem>Home</MenuItem>
          </NavLink>
          <NavLink to={`/search/category/${'Pants'}`}>
            <MenuItem>Pants</MenuItem>
          </NavLink>
          <NavLink to={`/search/category/${'Shirts'}`}>
            <MenuItem>Shirts</MenuItem>
          </NavLink>
            {/* <MenuItem>Services</MenuItem>
            <MenuItem>Pricing</MenuItem>
            <MenuItem>Contact</MenuItem> */}
          </Menu>
        </Left>
        {/* <Button>JOIN TODAY</Button> */}
      </Wrapper>
      {/* <Right /> */}
    </Container>
      
     );
  }



  const Container = styled.div`
  height: 33px;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  background-color:#257022c5
`;
const Wrapper = styled.div`
  /* padding: 10px 20px; */
  /* background-color:#000 */
  /* display: flex; */
  align-items: center;
  justify-content: space-between;
`;

const NavLink = styled(Link)`
  color: #000;
  display: flex;
 
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
  font-family: 'Volkhov', sans-serif;
  font-size: 14px;

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
const Left = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* const Logo = styled.h1`
  font-weight: bold;
  color: white;
  text-decoration: underline crimson;
`; */

const Menu = styled.ul`
  display: flex;
  list-style: none;

  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const MenuItem = styled.li`
  margin-right: 37px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  /* color: gray; */
`;

const DropDownContainer = styled("div")`
   display: inline-block;
  position: relative;
  /* height: 100px; */
  /* margin: 0 auto; */
  
`;

const DropDownHeader = styled("div")`

  font-weight: bold;
  color: white;
  cursor: pointer;
  display: flex;
 
  align-items: center;
  justify-content: space-between;
  /* color:#000; */
  /* margin-left: 25px; */
  /* &:hover {
    color:#257022c5;
    
  } */
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
/* margin: 0 auto; */


`;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0 auto;
  position: absolute;
  color:#000;
 
  height: 100vh;
left: 0;
  min-width: 25rem;
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
  font-size: 1.5rem;
  font-weight: 500;
  &:first-child {
    /* padding-top: 0.8em; */
  }
`;

const ListItem = styled("li")`
  list-style: none;
  padding: 1.5rem;
  margin-top: 0;
  /* display: flex;
 
  align-items: center;
  justify-content: space-between; */
  /* border-bottom:2px solid grey; */
  /* margin: 0 auto; */
  /* margin-bottom: 0.5em; */
  cursor: pointer;

  &:hover {
    color:#257022c5;
    background: #DDDDDD;
    /* wid */
  }
`;

// const Button = styled.button`
//   border: 2px solid white;
//   padding: 10px 15px;
//   background-color: crimson;
//   color: white;
//   font-weight: bold;
//   border-radius: 10px;
//   cursor: pointer;
// `;
