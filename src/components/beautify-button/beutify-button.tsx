import { MouseEventHandler } from "react";
import "./beautify-button.scss";

interface IButtonProps {
  handleChange: MouseEventHandler<HTMLButtonElement>;
  arrow: string;
}
const BeautifyButton = ({ handleChange, arrow }: IButtonProps) => {
  return (
    <button className="beautify-button" onClick={handleChange}>
      {arrow === "left" && (
        <img
          className="beautify-botton-img left"
          src={`${process.env.PUBLIC_URL}/arrow-${arrow}.png`}
          alt=""
        />
      )}
      Beautify
      {arrow === "right" && (
        <img
          className="beautify-botton-img right"
          src={`${process.env.PUBLIC_URL}/arrow-${arrow}.png`}
          alt=""
        />
      )}
    </button>
  );
};

export default BeautifyButton;
