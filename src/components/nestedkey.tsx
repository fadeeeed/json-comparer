import React, { useState } from "react";

interface JSONDropdownProps {
  json: any;
  onChange: (selectedKey: string) => void;
}

function JSONDropdown({ json, onChange }: JSONDropdownProps): JSX.Element {
  const [selectedKey, setSelectedKey] = useState<string>("");

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedKey = event.target.value;
    setSelectedKey(selectedKey);
    onChange(selectedKey);
  };

  const getAllNestedKeys = (obj: any, prefix = ""): string[] => {
    let keys: string[] = [];

    for (const key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        typeof obj[key] === "object" &&
        !Array.isArray(obj[key])
      ) {
        const nestedKey = prefix ? `${prefix}.${key}` : key;
        keys.push(nestedKey);

        const nestedKeys = getAllNestedKeys(obj[key], nestedKey);
        keys = keys.concat(nestedKeys);
      }
    }

    return keys;
  };

  const nestedKeys = getAllNestedKeys(json);

  return (
    <div>
      <select value={selectedKey} onChange={handleDropdownChange}>
        <option value="">Select a nested key</option>
        {nestedKeys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
}

export default JSONDropdown;
