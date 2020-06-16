import React from "react";
import styled from "styled-components";

import Header from "./components/Header";
import Sentences from "./components/Sentences";

const AppWrapper = styled.div`
  padding: 4rem 8rem;
  background: papayawhip;
  min-height: 100vh;
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
