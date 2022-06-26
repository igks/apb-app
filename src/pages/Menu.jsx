import React from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div
          className="alert alert-info"
          style={{
            textDecoration: "none",
            color: "#555",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/anggaran")}
        >
          ANGGARAN
        </div>
        <div
          className="alert alert-info"
          style={{
            textDecoration: "none",
            color: "#555",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/#")}
        >
          CATATAN
        </div>
        <div
          className="alert alert-info"
          style={{
            textDecoration: "none",
            color: "#555",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/#")}
        >
          LAPORAN
        </div>
      </div>
    </>
  );
};

export default Menu;
