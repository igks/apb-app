import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  padding: 24px;
`;

export const Modal = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

export const Header = styled.div`
  border-bottom: 1px solid #e0e0e0;
  font-weight: bold;
`;
export const Body = styled.div`
  margin: 20px 0;
`;
export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
export const Form = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
`;
export const Input = styled.input`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 2px 8px;
`;
export const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 2px 8px;
`;
export const Label = styled.p`
  padding: 0;
  margin: 0;
`;

export const Button = styled.button`
  background-color: ${({ color }) => color};
  border-radius: 5px;
  border: none;
  color: white;
  padding: 3px 15px;
  width: 40%;
`;
