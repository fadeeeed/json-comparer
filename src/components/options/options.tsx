import "./options.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleOptionsModalState } from "../../store/redux";
import KeysDropdown from "../keys-dropdown/keys-dropdown";

const Options = () => {
  const dispatch = useDispatch();
  const handleOptionsChange = () => {
    dispatch(toggleOptionsModalState());
  };
  const options = useSelector((state: any) => state.optionsState.options);
  return (
    <div className="options-container">
      <div className="options-content">
        <button className="options-close" onClick={handleOptionsChange}>
          ✖
        </button>
        <div className="options-heading">
          <h1>Exclude Keys</h1>
          <KeysDropdown options={options}></KeysDropdown>
        </div>
        <button className="options-accept" onClick={handleOptionsChange}>
          Go Back !
        </button>
      </div>
    </div>
  );
};

export default Options;
