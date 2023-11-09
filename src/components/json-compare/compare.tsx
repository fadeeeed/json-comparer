import React, { useState, useEffect } from "react";
import MapNestedObjects, {
  MapFlatObjects,
  getAllKeys,
} from "../../helpers/utils";
import "./compare.scss";
import Toggle from "../toggle/toggle";
import { useSelector, useDispatch } from "react-redux";
import JsonDisplay from "../json-display/jsondisplay";
import BeautifyButton from "../beautify-button/beutify-button";
import ErrorModal from "../error-modal/error-modal";
import {
  toggleModalState,
  toggleOptionsModalState,
  updateOptionsState,
} from "../../store/redux";
import Options from "../options/options";
import Tabs from "../Tabs/tabs";

/**
 * desc
 * @date 2023-07-08
 * @returns { JSX.Element }
 */
function JSONComparer(): React.JSX.Element {
  const [finalJson1, setFinalJson1] = useState<object>({});
  const [finalJson2, setFinalJson2] = useState<object>({});
  const [mismatchJson1, setMismatchJson1] = useState<object>({});
  const [mismatchJson2, setMismatchJson2] = useState<object>({});
  const [isSame, setIsSame] = useState<boolean>(false);
  const [json1TextArea, setJson1TextArea] = useState<string>("");
  const [json2TextArea, setJson2TextArea] = useState<string>("");
  const [text1, setText1] = useState<string>("");
  const [text2, setText2] = useState<string>("");
  const [isMisMatchedKeys, setIsMisMatchedKeys] = useState<boolean>(false);
  const [isMatchedKeys, setIsMatchedKeys] = useState<boolean>(false);
  const dispatch = useDispatch();

  const toggle = useSelector(
    (state: any) => state.compareNestedObjects.compareNestedObjects
  );
  const isError = useSelector((state: any) => state.errorModalState.isClose);
  const isOptionsOpen = useSelector((state: any) => state.optionsState.isClose);
  const selectedOptions = useSelector(
    (state: any) => state.optionsState.selectedOptions
  );

  useEffect(() => {
    if (
      Object.keys(finalJson1).length > 0 ||
      Object.keys(finalJson2).length > 0
    ) {
      setIsMatchedKeys(true);
    } else {
      setIsMatchedKeys(false);
    }

    if (
      Object.keys(mismatchJson1).length > 0 ||
      Object.keys(mismatchJson2).length > 0
    ) {
      setIsMisMatchedKeys(true);
    } else {
      setIsMisMatchedKeys(false);
    }
  }, [finalJson1, finalJson2, mismatchJson1, mismatchJson2]);

  console.log("Is Options Open", isOptionsOpen);
  /**
   * desc
   * @date 2023-07-08
   * @param { React.ChangeEvent<HTMLTextAreaElement> } event
   * @returns { void }
   */
  const handleJson1Change = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setText1(event.target.value);
    setJson1TextArea(event.target.value);
  };

  /**
   * desc
   * @date 2023-07-08
   * @param { React.ChangeEvent<HTMLTextAreaElement> } event
   * @returns { void }
   */
  const handleJson2Change = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setText2(event.target.value);
    setJson2TextArea(event.target.value);
  };

  /**
   * desc
   * @date 2023-07-08
   * @returns { void }
   */
  const compareJSONs = (): void => {
    console.log("Toggle: " + toggle);

    let json1;
    let json2;
    let finalJsonArray;
    try {
      json1 = JSON.parse(json1TextArea);

      console.log("file: compare.tsx:107 ~ compareJSONs ~ json1:", json1);

      json2 = JSON.parse(json2TextArea);

      console.log("file: compare.tsx:108 ~ compareJSONs ~ json2:", json2);
      if (toggle) {
        finalJsonArray = MapNestedObjects(json1, json2, selectedOptions);
        console.log(finalJsonArray);
      } else {
        finalJsonArray = MapFlatObjects(json1, json2, selectedOptions);
        console.log(finalJsonArray);
      }

      setFinalJson1(finalJsonArray[0]);
      setFinalJson2(finalJsonArray[1]);
      setMismatchJson1(finalJsonArray[2]);
      setMismatchJson2(finalJsonArray[3]);
      setIsSame(finalJsonArray[4]);
    } catch (err) {
      dispatch(toggleModalState());
      console.error(err);
    }
  };

  /**
   * desc
   * @date 2023-07-08
   */
  const handleBeautify1Changes = () => {
    try {
      console.log(json1TextArea.trim());
      setText1(JSON.stringify(JSON.parse(json1TextArea.trim()), null, 2));
    } catch (err) {
      if (json1TextArea) dispatch(toggleModalState());
      console.log(err);
    }
  };

  /**
   * desc
   * @date 2023-07-08
   * ! trying better comments extension
   */
  const handleBeautify2Changes = () => {
    try {
      setText2(JSON.stringify(JSON.parse(json2TextArea.trim()), null, 2));
    } catch (err) {
      dispatch(toggleModalState());
      console.error(err);
    }
  };

  /**
   * desc
   * @date 2023-07-08
   */
  const handleOptions = () => {
    let json1;
    let json2;
    try {
      json1 = JSON.parse(json1TextArea);
      json2 = JSON.parse(json2TextArea);
      console.log("🚀 ~ file: compare.tsx:166 ~ handleOptions ~ json2:", json2);
    } catch (err) {
      console.error(err);
    }

    const allKeys = getAllKeys(json1, json2, toggle);
    dispatch(updateOptionsState(allKeys));
    console.log(allKeys);
    dispatch(toggleOptionsModalState());
  };

  const tabs = [
    {
      id: 1,
      title: "Mismatched Keys",
      content: (
        <div className="json-display-unmatched">
          <JsonDisplay json={mismatchJson1} type="unmatched" />
          <JsonDisplay json={mismatchJson2} type="unmatched" />
        </div>
      ),
    },
    {
      id: 2,
      title: "Matched Keys",
      content: (
        <div className="json-display-matched">
          <JsonDisplay json={finalJson1} type="matched" />
          <JsonDisplay json={finalJson2} type="matched" />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="json-comparer">
        <div className="json-comparer-content">
          <div className="json-comparer-heading">
            <h1 className="json-comparer-title">JSON Comparer</h1>
          </div>
          <div className="json-comparer-container">
            <textarea
              className="json-input json-input-first"
              value={text1}
              onChange={handleJson1Change}
              placeholder="Enter JSON 1"
              rows={5}
            />
            <div className="button-toggle">
              <BeautifyButton
                handleChange={handleBeautify1Changes}
                arrow="left"
              />
              <BeautifyButton
                handleChange={handleBeautify2Changes}
                arrow="right"
              />
              <Toggle text="Nested Objects"></Toggle>
              <button className="compare-button" onClick={handleOptions}>
                Options
              </button>
              <button className="compare-button" onClick={compareJSONs}>
                Compare JSONs
              </button>
            </div>

            <textarea
              className="json-input json-input-second"
              value={text2}
              onChange={handleJson2Change}
              placeholder="Enter JSON 2"
              rows={5}
            />
          </div>
        </div>

        {(isMisMatchedKeys || isMatchedKeys) && (
          <div className="json-display-container">
            Comparison Result:{" "}
            <span className="hightlighted-text">{isSame.toString()}</span>
            <Tabs
              tabs={tabs}
              defaultActiveTab={isMisMatchedKeys ? 1 : 2}
            ></Tabs>
          </div>
        )}
      </div>
      {isOptionsOpen && <Options></Options>}
      {isError && <ErrorModal></ErrorModal>}
    </>
  );
}

export default JSONComparer;
