import React from "react";

interface Props {
  btnName: string;
  btnClick: () => void;
}

const Button = ({ btnName, btnClick }: Props) => {
  return (
    <button className="btn btn-primary" onClick={btnClick}>
      {btnName}
    </button>
  );
};

export default Button;
