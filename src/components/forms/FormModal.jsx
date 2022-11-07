import React from "react";

const FormModal = ({ formData, updateFormData, setIsShowModal, onSubmit }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="mx-2 w-100">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {formData.id == null ? "Tambah" : "Edit"} Item
            </h5>
          </div>

          <div className="px-3 mb-3">
            <p className="p-0 m-0">Nama Item</p>
            <input
              className="form-control form-control-sm"
              type="text"
              value={formData.item}
              name="item"
              autoComplete="off"
              onChange={(e) => updateFormData(e)}
            />
          </div>

          <div className="px-3 mb-3">
            <p className="p-0 m-0">Jumlah</p>
            <input
              className="form-control form-control-sm"
              type="number"
              value={formData.value}
              name="value"
              autoComplete="off"
              onChange={(e) => updateFormData(e)}
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsShowModal(false)}
            >
              Tutup
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
