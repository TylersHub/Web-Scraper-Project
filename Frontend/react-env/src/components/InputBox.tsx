import React from "react";

interface Props {
  inputLabel: string;
  inputPlaceholder: string;
}

const InputBox = ({ inputLabel, inputPlaceholder }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor="formGroupExampleInput" className="form-label">
        {inputLabel}
      </label>
      <input
        type="text"
        className="form-control"
        id="formGroupExampleInput"
        placeholder={inputPlaceholder}
      />
    </div>
  );
};

export default InputBox;
