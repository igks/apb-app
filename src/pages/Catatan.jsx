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

function Catatan() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    detail: "",
  });

  const loadNotes = async () => {
    const q = query(collection(db, "notes"));
    const querySnapshot = await getDocs(q);
    let newNotes = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      newNotes.push({
        id: doc.id,
        title: data.title,
        detail: data.detail,
      });
    });

    setNotes(newNotes);
    setIsLoading(false);
  };

  const onSubmit = async () => {
    if (formData.title === "" || formData.detail === "") {
      setIsShowModal(false);
      alert("Data tidak valid!");
      return;
    }

    try {
      await addDoc(collection(db, "notes"), formData);
    } catch (err) {
      alert(err);
    }

    setFormData({
      ...formData,
      id: null,
      title: "",
      detail: "",
    });
    setIsShowModal(false);
    loadNotes();
  };

  const updateFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onAddNote = () => {
    setFormData({
      ...formData,
      title: "",
      detail: "",
    });
    setIsShowModal(true);
  };

  const onDelete = async (id) => {
    if (window.confirm("Hapus catatan?")) {
      await deleteDoc(doc(db, "notes", id));
      loadNotes();
    }
  };

  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line
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
          <S.Title>CATATAN</S.Title>
          <AddFileIcon size="xl" color={Colors.green} onClick={onAddNote} />
        </S.Row>
        <S.Divider />
      </S.Header>
      <S.Body>
        {isLoading ? (
          <S.Container>
            <LoadingFallback />
          </S.Container>
        ) : notes.length > 0 ? (
          <S.List>
            {notes.map((note, index) => (
              <Note key={index} note={note} onDelete={onDelete} />
            ))}
          </S.List>
        ) : (
          <S.Container>
            <S.EmptyNote>Tidak ada catatan!</S.EmptyNote>
          </S.Container>
        )}

        {isShowModal && (
          <FormNote
            formData={formData}
            updateFormData={updateFormData}
            setIsShowModal={setIsShowModal}
            onSubmit={onSubmit}
          />
        )}
      </S.Body>
    </S.Container>
  );
}

export default Catatan;
