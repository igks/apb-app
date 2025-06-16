import CloudPreview from "../cloud-preview";
import * as S from "../forms/styled.component";

const PreviewKwitansi = ({ period, publicId, hidePreview }) => {
  return (
    <S.Container>
      <S.Modal>
        <S.Header>{period}</S.Header>
        <S.Body>
          <CloudPreview publicId={publicId}/>
        </S.Body>
        <S.Footer>
          <S.Button
            type="button"
            onClick={hidePreview}
            color={"#f44336"}
          >
            Tutup
          </S.Button>
        </S.Footer>
      </S.Modal>
    </S.Container>
  );
};

export default PreviewKwitansi;
