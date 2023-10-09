import "./toggle.scss";
import { useSelector, useDispatch } from "react-redux";
import { toggleNestedObjects } from "../../store/redux";
const Toggle = ({ text }: any) => {
  const dispatch = useDispatch();
  const toggle = useSelector(
    (state: any) => state.compareNestedObjects.compareNestedObjects
  );
  console.log(toggle);
  const handleChanges = (event: any) => {
    console.log("file: toggle.tsx:12 ~ handleChanges ~ event:", event);

    console.log("Toggle Event: " + event.target.value);
    dispatch(toggleNestedObjects(event.target.value));
  };
  return (
    <div className="toggle-component">
      <label className="toggle" htmlFor="uniqueID">
        <input
          type="checkbox"
          className="toggle__input"
          id="uniqueID"
          onClick={handleChanges}
        />
        <span className="toggle-track">
          <span className="toggle-indicator">
            <span className="checkMark">
              <svg
                viewBox="0 0 24 24"
                id="ghq-svg-check"
                role="presentation"
                aria-hidden="true"
              >
                <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
              </svg>
            </span>
          </span>
        </span>
        {text}
      </label>
    </div>
  );
};

export default Toggle;
