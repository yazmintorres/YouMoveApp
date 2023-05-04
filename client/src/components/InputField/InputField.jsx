import React from "react";

const InputField = ({ id, title, type, name, placeholder }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3  ">
      <label htmlFor={id}>{title}</label>
      <input
        className="input-field w-20 basis-auto"
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
      ></input>
    </div>
  );
};

export default InputField;
