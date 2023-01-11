import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ mb }) => mb};
`;

export const Card = styled.div`
  background-color: ${({ color }) => color};
  border-radius: 5px;
  padding: 5px 10px;
  height: fit-content;
  width: 49%;
`;

export const Divider = styled.hr`
  margin: 5px 0;
`;

export const Title = styled.h6`
  text-align: center;
  margin: 0;
  font-weight: bold;
`;
