import React from "react";
import { Colors } from "../constants";
import { CloseIcon, DeleteIcon, EditIcon, ListIcon } from "./Icons";

const OptionModal = ({
  onClickCloseButton,
  onClickList,
  onClickEdit,
  onClickDelete,
}) => {
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
            <h6 className="modal-title">Pilih Menu</h6>
            <CloseIcon
              color={Colors.red}
              size="xl"
              onClick={onClickCloseButton}
            />
          </div>
          <div className="d-flex flex-row justify-content-around my-3">
            <div>
              <ListIcon size="xl" className="text-info" onClick={onClickList} />
            </div>
            <div>
              <EditIcon size="xl" color={Colors.yellow} onClick={onClickEdit} />
            </div>
            <div>
              <DeleteIcon
                size="xl"
                color={Colors.red}
                onClick={onClickDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionModal;
