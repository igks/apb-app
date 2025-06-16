import { AddFileIcon, GoBackIcon } from "components/shared/Icons";
import LoadingFallback from "components/shared/LoadingFallback";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormNote from "../components/forms/FormNote";
import Note from "../components/note";
import { Colors } from "../constants";
import { db } from "../services/firebase";
import * as S from "./styled.component";
import CloudinaryUpload, { openWidget } from "../components/cloud-upload";
import CloudPreview from "../components/cloud-preview";
import FormKwitansi from "../components/forms/FormKwitansi";
import PreviewKwitansi from "../components/preview-kwitansi";
import KwitansiList from "../components/kwitansi-list";

function Kwitansi() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const [preview, setPreview] = useState({
    period: '',
    publicId: '',
    isShow: false
  });
  const [kwitansiList, setKwitansi] = useState([]);
  const [formData, setFormData] = useState({
    period: "",
  });

  const addKwitansi = async (info) => {
    await addDoc(collection(db, "kwitansi"), {
      period: formData.period,
      publicId: info.public_id,
      timestamp: new Date()
    });
    await loadKwitansi();
  }

  const loadKwitansi = async () => {
    setIsLoading(true);
    const q = query(collection(db, "kwitansi"));
    const querySnapshot = await getDocs(q);
    let record = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      record.push({
        id: doc.id,
        period: data.period,
        publicId: data.publicId,
        timestamp: data.timestamp
      });
    });

    record = record.sort((a, b) => a.timestamp - b.timestamp);

    setKwitansi(record);
    setIsLoading(false);
  }

  const onSubmit = async () => {
    if (formData.period === "") {
      setIsShowModal(false);
      alert("Data tidak valid!");
      return;
    }

    try {
      openWidget(addKwitansi)
    } catch (err) {
      alert(err);
    }

    setFormData({period: ""});
    setIsShowModal(false);
    loadKwitansi();
  };

  const updateFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onAddKwitansi = () => {
    setFormData({
      ...formData,
      period: "",
    });
    setIsShowModal(true);
  };

  const onView = (kwitansi) => {
    setPreview({
      period: kwitansi.period,
      publicId: kwitansi.publicId,
      isShow: true
    })
  }

  useEffect(() => {
    loadKwitansi();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.Row mb={"10px"}>
          <GoBackIcon
            size="xl"
            color={Colors.grey}
            onClick={() => navigate("/")}
          />
          <S.Title>KWITANSI</S.Title>
          <AddFileIcon size="xl" color={Colors.green} onClick={onAddKwitansi} />
        </S.Row>
        <S.Divider />
      </S.Header>
      <S.Body>
        {isLoading ? (
          <S.Container>
            <LoadingFallback />
          </S.Container>
        ) : kwitansiList.length > 0 ? (
          <S.List>
            {kwitansiList.map((kwitansi, index) => (
              <KwitansiList key={index} period={kwitansi.period} onView={() => onView(kwitansi)} />
            ))}
          </S.List>
        ) : (
          <S.Container>
            <S.EmptyNote>Tidak ada kwitansi!</S.EmptyNote>
          </S.Container>
        )}

        {isShowModal && (
          <FormKwitansi
            formData={formData}
            updateFormData={updateFormData}
            setIsShowModal={setIsShowModal}
            onSubmit={onSubmit}
          />
        )}

        {
          preview.isShow && (
            <PreviewKwitansi
              period={preview.period}
              publicId={preview.publicId}
              hidePreview={() => setPreview((prev) => ({...prev, isShow: false}))}
            />
          )
        }
      </S.Body>
    </S.Container>
  );
}

export default Kwitansi;
