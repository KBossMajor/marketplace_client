import styled from "styled-components";





export default function HomestoreTrending({ products }) {
    // const { product } = props;
    const backend_url = process.env.REACT_APP_API;
    
    return (
        <>
        {/* {console.log(products)} */}
        <div>
              <Container>
               <Header> Latest Arrivals  
              
               </Header>
              
               <ListContainer>
                 
                 <List >
                  {products.slice(0,5).map((product) => (
                      <ListItem> 
                        <Image src={backend_url+product.image}  />
                        <InfoContainer>
                            <Title>
                            {product.name}  
                            </Title>
                            <Amount>
                            ₦{product.price}
                            </Amount>

                        </InfoContainer>
                        
                      </ListItem>
                     ))} 
                   
                 </List>
               </ListContainer>
              
         </Container>
         
        </div>
        </>
    );
  }

  const Container = styled("div")`
  margin-top:15%;
  /* display: inline-block; */
  /* position: relative; */
  /* height: 100px; */
  /* margin: 0 auto; */
  
  `;
  
  const Header = styled("div")`
  
  padding: 15px;
    /* display: block; */
    text-transform: uppercase;
    
    /* background: #ffffff; */
    color: #000;
    font-weight: 700;
  
  font-weight: bold;
  
  /* cursor: pointer; */
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
  
  const ListContainer = styled("div")`
  /* margin: 0 auto; */
  
  
  `;
  
  const List = styled("ul")`
  /* padding: 0; */
    width: 270px;
    /* height: 400px; */
   
  
    /* z-index: 50; */
    -webkit-transition: 0.3s all;
    transition: 0.3s all;
  /* margin: 0 auto; */
  /* position: absolute; */
  color:#000;
  
  /* height: 100vh; */
  
  min-width: 25rem;
  z-index: 5;
  margin: 0;
  
  border-radius: 0.5rem;
  
  background: #ffffff;
  border: 2px solid #e5e5e5;
  color: #000;
  font-size: 1.5rem;
  font-weight: 500;
  &:first-child {
   /* padding-top: 0.8em; */
  }
  `;
  
  const ListItem = styled("li")`
  /* position: relative; */
  list-style: none;
 
  padding: 15px;
  display: flex;
  /* justify-content: space-between; */


  align-items: center;
  justify-content: space-between; 
  border-bottom:1px solid #DADADA;
  /* margin: 0 auto; */
  /* margin-bottom: 0.5em; */
  cursor: pointer;
  
  &:hover {
   color:#257022c5;
   background: #DDDDDD;
   
  }
  `;


const Image = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  

`;


const InfoContainer = styled.div`
  width: 50%;
  /* height: 60px; */
  /* margin: 20px 0px; */
  display: flex;
  flex-direction: column;

  /* justify-content: space-between; */
 
  /* padding: 0px 30px; */
  
`;

const Title = styled.h1`
margin: 0px;
overflow-wrap: break-word;
font-size:16px;
 
`;

const Amount = styled.div`
  display: flex;
  align-items: center;
  margin-top: -7px;
  color:#257022c5;
  /* font-weight: 700; */
`;




  