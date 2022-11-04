import React from "react";
import ListCard from "components/ListCard";

const AnggaranList = ({ records, handleOptionModal }) => {
  return (
    <div style={{ height: "60vh", overflow: "auto" }}>
      <ul className="p-0 m-0">
        {records.length > 0 &&
          records.map((record, index) => (
            <ListCard
              key={index}
              record={record}
              onEllipsisClicked={() => handleOptionModal(record, true)}
            />
          ))}
      </ul>
    </div>
  );
};

export default AnggaranList;
