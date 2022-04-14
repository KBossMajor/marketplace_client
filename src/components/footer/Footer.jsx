import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Room,
   
  } from "@material-ui/icons";
  import styled from "styled-components";
  import { mobile } from "../../responsive";








export default function Footer() {

    // const productId = props.match.params.id;
 
 
     return (
        <Container>
        <ContainerWrapper>
        <Left>
          <Logo>SHOP-WIT-EAZE.</Logo>
          <Desc>
          Welcome To
            SHOP-WIT-EAZE
            Get Your Online Shop, No Council, No Rent, Secure Payment, Shipping Option And More Online
          </Desc>
          <SocialContainer>
            <SocialIcon color="257022c5">
              <Facebook style={{ color: "white", fontSize: 16 }}  />
            </SocialIcon>
            <SocialIcon color="257022c5">
              <Instagram style={{ color: "white", fontSize: 16 }}  />
            </SocialIcon>
            {/* <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon> */}
            
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            
            
            <ListItem>Profile</ListItem>
            <ListItem>Message</ListItem>
            <ListItem>Orders</ListItem>
            
            {/* <ListItem>Terms</ListItem> */}
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{marginRight:"10px"}}/> Block 115, flat 6 L. S. D. P. C. Alaka Estate, Surulere Lagos, Nigeria
          </ContactItem>
          <ContactItem>
            <Phone style={{marginRight:"10px"}}/> 0701 435 8631
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px"}} /> alltsnetwork@gmail.com
          </ContactItem>
          {/* <Hr/> */}
        </Right>
        </ContainerWrapper>
       
        <Copyright>All-Tech Systems &amp; Co Ⓒ {new Date().getFullYear()}</Copyright>
      </Container>  
 
      
     );
  }



  const Container = styled.div`

  background-color: white;
  /* margin-top: 70px ; */
  /* padding:20px; */
  

 
`;

const ContainerWrapper = styled.div`
  /* background-color:#000; */
  color: #257022c5; 
  padding:20px;
  display: flex;

  ${mobile({ flexDirection: "column" })}
`;

const Copyright = styled.div`
 font-size: 1.2rem;
  margin-left:20px;
  padding-bottom:14px;
  color:grey;
 

  /* @media only screen and (max-width: 480px) {
    font-size: 14px;
  } */
`;



// const Hr = styled.hr`
//   background-color: white;
//   width:100%;
//   /* margin:13px; */
//   border: none;
//   height: 8px;
// `;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
color:grey;
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  color:grey;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  color:grey;
  align-items: center;
`;

// const Payment = styled.img`
//     width: 50%;
// `;