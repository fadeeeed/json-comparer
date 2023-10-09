import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModalState } from "../../store/redux";
import "./error-modal.scss";

const ErrorModal = () => {
  const dispatch = useDispatch();
  const modalToggle = useSelector(
    (state: any) => state.errorModalState.isClose
  );
  const handleModalChange = () => {
    dispatch(toggleModalState());
  };

  return (
    <div className="error-modal-container">
      <div className="error-modal-content" id="cookiesPopup">
        <button className="error-modal-close" onClick={handleModalChange}>
          ✖
        </button>
        <img src={`${process.env.PUBLIC_URL}/error.png`} alt="error-img" />
        <p>
          Uh-oh! It seems there was an{" "}
          <span className="hightlighted-text">issue parsing the JSON</span>.
          Verify that the data is correctly formatted and attempt once more.
        </p>
        <button className="error-modal-accept" onClick={handleModalChange}>
          Ah, Looking!
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
