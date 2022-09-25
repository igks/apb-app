import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  query,
  getDocs,
} from "firebase/firestore";
import FormNote from "../components/FormNote";
import Note from "../components/Note";

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
    <div className="container">
      <>
        <div className="row">
          <div className="col-12">
            <h4 className="text-center">Catatan</h4>
          </div>
          <div className="col-12 mt-3">
            <div className="d-flex justify-content-between align-items-center px-3">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={onAddNote}
              >
                Tambah
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => navigate("/")}
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div style={{ height: "70vh", overflow: "auto" }}>
          <ul className="p-0 m-0">
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <Note key={index} note={note} onDelete={onDelete} />
              ))
            ) : isLoading ? (
              <div className="text-center mt-5">Memuat catatan...</div>
            ) : (
              <div className="text-center mt-5">Tidak ada catatan!</div>
            )}
          </ul>
        </div>

        {isShowModal && (
          <FormNote
            formData={formData}
            updateFormData={updateFormData}
            setIsShowModal={setIsShowModal}
            onSubmit={onSubmit}
          />
        )}
      </>
    </div>
  );
}

export default Catatan;
