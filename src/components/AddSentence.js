import React, { useState } from "react";
import styled from "styled-components";
import { isEmpty } from "lodash";

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
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
    border-bottom: 1px solid palevioletred;
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
      <Button type="submit" disabled={isSomeEmpty || isLoading}>
        Add&nbsp;new
      </Button>
    </Form>
  );
}

export default AddSentence;
