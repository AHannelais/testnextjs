import React from "react";

const TextInput = ({
  label = "",
  placeholder = "",
  value,
  id,
  onChangeVariable,
  validator = false
}) => {
  return (
    <form className="form-group">
      <label htmlFor={id}>{label}</label>
      <div style={{ color: "red" }}>
        {validator ? validator.message(label, value, "required|max:50") : null}
      </div>
      <input
        className="form-control"
        placeholder={placeholder}
        id={id}
        value={value || ""}
        onChange={onChangeVariable}
      />
    </form>
  );
};

export default TextInput;
