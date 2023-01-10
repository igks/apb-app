import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import * as S from "./styled.component";

const Spinner = ({ loading }) => {
  return (
    <S.Container>
      <PulseLoader
        color={"#546e7a"}
        loading={loading}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </S.Container>
  );
};

export default Spinner;
