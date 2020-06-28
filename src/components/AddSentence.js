import React, { useState } from "react";
import styled from "styled-components";
import { isEmpty } from "lodash";

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Input = styled.input`
  font-size: 1rem;
  color: #1a1300;
  background-color: transparent;
  border-width: 0;
  border-bottom: 1px solid #1a1300;
  margin: 0 20px;
  box-sizing: border-box;
  outline: none;
  &:focus {
    border-bottom: 1px solid #ffbb00;
  }
  @media (max-width: 928px) {
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  font-size: 1rem;
  color: white;
  background-color: ${(props) => (props.disabled ? "#6b6964" : "#1a1300")};
  padding: 8px 30px;
  border-radius: 4px;
  border-width: 0;
  box-sizing: border-box;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  margin: 0 20px;
`;

function AddSentence({ addNewSentence }) {
  const emptySentence = {
    animals: [],
    en: "",
    pl: "",
  };
  const [newSentence, setNewSentence] = useState(emptySentence);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewSentence({
      ...newSentence,
      [name]: name === "animals" ? [value] : value,
    });
  };

  const createNewSentence = async (e) => {
    e.preventDefault();

    setLoading(true);
    await addNewSentence(newSentence);

    setNewSentence(emptySentence);
    setLoading(false);
  };

  const isSomeEmpty = Object.values(newSentence).some(
    (value) => isEmpty(value) || !value
  );

  return (
    <Form onSubmit={createNewSentence}>
      <InputContainer>
        <Input
          type="text"
          name="animals"
          placeholder="animals"
          value={newSentence.animals}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="en"
          placeholder="sentence in EN"
          value={newSentence.en}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="pl"
          placeholder="sentence in PL"
          value={newSentence.pl}
          onChange={handleChange}
        />
      </InputContainer>
      <Button type="submit" disabled={isSomeEmpty || isLoading}>
        Add&nbsp;new
      </Button>
    </Form>
  );
}

export default AddSentence;
