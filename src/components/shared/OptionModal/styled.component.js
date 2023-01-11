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
  height: 150px;
  padding: 20px;
  border-radius: 10px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.h6`
  font-weight: bold;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 90%;
`;
