// import { useState } from "react";
import styled from "styled-components";



export default function HomestoreSubcat({ item }) {

return (
  
  // <>
  // <ListItem   onClick={showSubnav}>
  
     item.subNav.map((item, index) => {
     
    return (
       
  <Listlinks key={index}>{item.title}</Listlinks>
    );
  })


// </ListItem>

);
}





const Listlinks = styled("div")`
 position: absolute;
  padding: 15px;
  background: #FFF;
  -webkit-box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.175);
  z-index: 100;
  top: 100%;
  min-width: 200px;
  /* opacity: 0; */
  opacity: 1;
  /* visibility: hidden; */
  -webkit-transition: 0.3s all;
  transition: 0.3s all;

  border-left: 2px solid #257022c5;
    left: 94%;
    top: 0;
    right:0;
    width: 750px;
    -webkit-transform: translate(15px, 0px);
    -ms-transform: translate(15px, 0px);
    transform: translate(15px, 0px);

/* position: relative; */


`;




