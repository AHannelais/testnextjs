import React, { useRef } from "react";
import styled from "styled-components";
function Upload({ onChangeCallback }) {
  let fileInput = useRef(null);

  const openFileDialog = () => {
    fileInput.current.click();
  };

  const handleChange = e => {
    onChangeCallback(e);
  };

  return (
    <div>
      <input
        style={{ display: "none" }}
        ref={fileInput}
        type="file"
        onChange={handleChange}
        accept="audio/*"
      />
      <UploadIcon onClick={openFileDialog}>
        <i className="fas fa-upload" />
      </UploadIcon>
    </div>
  );
}

export default Upload;

const UploadIcon = styled.div`
  color: black !important;
  text-transform: uppercase;
  text-decoration: none;
  background: white;
  width: 50px;
  height: 50px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.2);
  border: 2px solid black !important;
  border-radius: 50%;
  transition: all 0.25s;
  font-size: 25px;
  text-align: center;
  i {
    font-size: 30px;
    margin: auto;
  }
  :hover {
    cursor: pointer;
    color: white !important;
    background: black;
    border-color: white !important;
  }
`;
