import "./landing.css";
// import Navbar from "../../components/navbar/Navbar";
// import logo from './kart2.png'; 
import Landingbar from "../../components/landingbar/Landingbar";
import Slider from "../../components/slider/Slider";
import styled from "styled-components";
import { mobile } from "../../responsive";
// import { Link } from "react-router-dom";


const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: #FFFFFF;


  ${mobile({ overflowY: "scroll"  })}
`;


export default function Landing() {
    return (
        <Container>
         <Landingbar/>
         <Slider/>
          
            {/* <nav className="topbar">
                <a href="/#" className="logo" ><h4>ShopZone</h4></a>
                <ul>
                   overflow-y: scroll;
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Signin</Link></li>
                    <li><Link to="/homestore">Explore</Link></li>
                </ul>
            </nav> */}
            {/* <div className="content">
                <div className="textbox">
                    <h1>
                        its not just a store<br/>
                        <span>ShopZone</span>
                    </h1>
                    <h4>
                        "Welcome to Your market Space...<br/>Get Your Online Shop, No Council, No
                        rent.<br/> Bring your market to The World"
                    </h4>
                </div>
                <div className="imgBox">
                   
                    <img src={logo} alt=""/>
                </div>
            </div> */}
            {/* <h1>WiredKart</h1> */}
       </Container>
    );
  }
