import styled from "styled-components";

export const List = styled.ul`
  margin: 0;
  padding: 0;
`;

export const Card = styled.div`
  margin-bottom: 15px;
  margin-right: 15px;
  padding: 10px;
  border-radius: 5px;
  background-color: #c8e6c9;
  -webkit-box-shadow: 18px 11px 6px -4px rgba(129, 199, 132, 0.7);
  -moz-box-shadow: 18px 11px 6px -4px rgba(129, 199, 132, 0.7);
  box-shadow: 18px 11px 6px -4px rgba(129, 199, 132, 0.7);
`;

export const RowHeader = styled.div`
  margin: 0;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Item = styled.p`
  margin: 0;
  padding: 0;
  font-size: 15px;
  font-weight: bold;
`;
export const RowContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const Content = styled.div`
  width: 50%;
  font-size: 15px;
  color: ${({ color }) => color};
  font-weight: bold;
`;
