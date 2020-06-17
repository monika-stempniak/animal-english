import React from "react";
import styled from "styled-components";

import Header from "./components/Header";
import Sentences from "./components/Sentences";

const AppWrapper = styled.div`
  padding: 40px 24px;
  background: papayawhip;
  min-height: 91vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 767px) {
    padding: 24px;
    min-height: 94vh;
  }
`;

function App() {
  return (
    <AppWrapper>
      <Header />
      <Sentences />
    </AppWrapper>
  );
}

export default App;
