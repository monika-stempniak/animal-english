import React from "react";
import styled from "styled-components";

import { ReactComponent as PawPrintIcon } from "../assets/icon.svg";
import data from "../mocks/data.json";

const Container = styled.ul`
  flex: 1;
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: baseline;
  margin: 12px 0;
`;

const Heading = styled.h3`
  margin: 0;
  padding: 0;
`;

const P = styled.p`
  margin: 0;
  padding: 0;
`;

const En = styled(P)`
  color: palevioletred;
  padding: 0 20px;
`;

const Icon = styled(PawPrintIcon)`
  width: 20px;
  color: palevioletred;
  margin-right: 20px;
  position: relative;
  top: 2px;
`;

function Sentences() {
  return (
    <Container className="container animals" id="animals">
      {data.map(({ animals, en, pl }) => {
        return (
          <Item key={en}>
            <Icon />
            <Heading>{animals.join(", ")}</Heading>
            <En>{en}</En>
            <P>{pl}</P>
          </Item>
        );
      })}
    </Container>
  );
}

export default Sentences;
