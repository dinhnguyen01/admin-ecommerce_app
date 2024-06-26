import React from "react";

const CustomInput = (props) => {
  const { type, label, i_id, i_class, name, val, onCh } = props;
  return (
    <div className="form-floating">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onCh}
        autoComplete="off"
      />
      <label htmlFor={i_id}>{label}</label>
    </div>
  );
};

export default CustomInput;
