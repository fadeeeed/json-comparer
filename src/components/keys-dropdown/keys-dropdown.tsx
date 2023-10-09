import React, { useState } from "react";
import "./keys-dropdown.scss";
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedOptions } from "../../store/redux";

interface DropdownProps {
  options: string[];
}

const KeysDropdown: React.FC<DropdownProps> = ({ options }: DropdownProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  //const [selectedOption, setSelectedOption] = useState<string[]>([]);

  const selectedOption = useSelector(
    (state: any) => state.optionsState.selectedOptions
  );

  const dispatch = useDispatch();

  let filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("selectedOption", selectedOption);
  // filteredOptions = filteredOptions.filter(
  //   (option) => !selectedOption.includes(option)
  // );

  //const selectedOption: string[] = [];

  const handleOptionClick = (option: any) => {
    if (selectedOption.includes(option)) {
      const removedArray = selectedOption.filter(
        (ele: string) => ele !== option
      );
      dispatch(updateSelectedOptions(removedArray));
    } else {
      dispatch(updateSelectedOptions([...selectedOption, option]));
    }
    //dispatch(updateSelectedOptions([...selectedOption, option]));
    setSearchTerm("");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchTerm("");
  };

  return (
    <div className="dropdown-container">
      <input
        type="text"
        className="dropdown-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      {filteredOptions.length > 0 && (
        <ul className="dropdown-menu">
          {filteredOptions.map((option) => (
            <li
              key={option}
              className={`dropdown-item ${
                selectedOption.includes(option) ? "active" : "not-active"
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}{" "}
              {selectedOption.includes(option) && (
                <span className="cross-dropdown-item">✖</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KeysDropdown;
