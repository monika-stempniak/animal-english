import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  line-height: 1.2;
  color: #ffbb00;
  margin: 0;
`;

function Header() {
  return (
    <header>
      <Title>Animal English</Title>
    </header>
  );
}

export default Header;
