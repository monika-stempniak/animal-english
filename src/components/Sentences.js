import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ReactComponent as PawPrintIcon } from "../assets/icon.svg";
import { getAllSentences, createNewSentence } from "../api/sentencesApi";
import AddSentence from "./AddSentence";

const Container = styled.ul`
  flex: 1;
  list-style: none;
  padding: 0;
  max-width: 900px;
  width: 100%;
`;

const FlexContainer = styled.div`
  flex: ${(props) => props.flex};
  display: flex;
  align-items: baseline;
`;

const LangContainer = styled(FlexContainer)`
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Item = styled.li`
  display: flex;
  align-items: baseline;
  margin: 12px 0;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Heading = styled.h3`
  margin: 0;
  padding: 0;
  @media (max-width: 767px) {
    padding-right: 20px;
    line-height: 1.2;
    max-width: 200px;
  }
`;

const P = styled.p`
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;

const En = styled(P)`
  flex: 1;
  color: palevioletred;
  padding: 0 20px;
  @media (max-width: 767px) {
    padding: 0;
  }
`;

const Pl = styled(P)`
  flex: 1;
`;

const Icon = styled(PawPrintIcon)`
  width: 20px;
  color: palevioletred;
  margin-right: 20px;
  position: relative;
  top: 2px;
`;

const Loader = styled.div`
  text-align: center;
  font-size: 2rem;
  color: palevioletred;
`;

function Sentences() {
  const [sentences, setSentences] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllSentences();
  }, []);

  const fetchAllSentences = async () => {
    const data = await getAllSentences();
    setSentences(data || []);
    setLoading(false);
  };

  const addNewSentence = async (newData) => {
    setLoading(true);
    await createNewSentence(newData);

    const newSentences = [newData, ...sentences];
    setSentences(newSentences);
    setLoading(false);
  };

  return (
    <>
      <AddSentence addNewSentence={addNewSentence} />
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Container className="container animals" id="animals">
          {sentences.map(({ animals, en, pl }) => {
            return (
              <Item key={en}>
                <FlexContainer flex={1}>
                  <Icon />
                  <Heading>{animals.join(", ")}</Heading>
                </FlexContainer>
                <LangContainer flex={2}>
                  <En>{en}</En>
                  <Pl>{pl}</Pl>
                </LangContainer>
              </Item>
            );
          })}
        </Container>
      )}
    </>
  );
}

export default Sentences;
