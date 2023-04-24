import React, { useState, MouseEvent } from "react";
import "./style.css";
import { IPhoto } from "./itemSlice";
interface ItemProps {
  data: IPhoto;
  onTitleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
}

const Itemm = ({ data, onTitleChange }: ItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = (e: MouseEvent<HTMLLabelElement>) => {
    setIsEditing(true);
  };
  const hoverStyle = {
    border: "#555",
  };
  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div
      style={{
        display: "flex",
        padding: 15,
        backgroundColor:
          data.id % 2 === 0 ? "white" : "yellow",
      }}
      onBlur={handleBlur}
    >
      <div style={{ marginRight: 35, marginLeft: 40 }}>
        <img
          style={{ borderRadius: 80 }}
          src={data.thumbnailUrl}
          alt="thumbnail"
        />
      </div>

      <div
        style={{ marginTop: "50px", marginLeft: "30px" }}
      >
        {!isEditing && (
          <label
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor =
                hoverStyle.border;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                "transparent";
            }}
            onClick={handleEdit}
          >
            {data.title}
          </label>
        )}
        {isEditing && (
          <input
            type="text"
            value={data.title}
            onChange={(e) => onTitleChange(e, data.id)}
            className="item"
            onBlur={handleBlur}
          />
        )}

        <div>{Date.now()}</div>
      </div>
    </div>
  );
};

export default React.memo(Itemm);
