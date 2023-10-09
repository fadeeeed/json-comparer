interface ParsedObject {
  [key: string]: string | number | boolean | ParsedObject | ParsedArray;
}

interface ParsedArray
  extends Array<string | number | boolean | ParsedObject | ParsedArray> {}

export function parseObjectString(str: string): ParsedObject {
  const result: ParsedObject = {};
  let currentKey = "";
  let currentValue = "";
  let isValue = false;
  let braceCount = 0;
  let bracketCount = 0;
  for (let i = 1; i < str.length - 1; i++) {
    const char = str[i];
    if (char === "{") {
      braceCount++;
    } else if (char === "}") {
      braceCount--;
    } else if (char === "[") {
      bracketCount++;
    } else if (char === "]") {
      bracketCount--;
    }
    if (braceCount === 0 && bracketCount === 0) {
      if (char === ":") {
        isValue = true;
      } else if (char === ",") {
        addEntry(currentKey.trim(), currentValue.trim());
        currentKey = "";
        currentValue = "";
        isValue = false;
      } else if (!isValue) {
        currentKey += char;
      } else {
        currentValue += char;
      }
    } else {
      currentValue += char;
    }
  }
  addEntry(currentKey.trim(), currentValue.trim());

  function addEntry(
    key: string,
    value: string | number | boolean | ParsedObject | ParsedArray
  ) {
    key = `"${key}"`;
    if (typeof value === "string" && value[0] === "{") {
      value = parseObjectString(value);
    } else if (typeof value === "string" && value[0] === "[") {
      value = parseArrayString(value);
    } else if (typeof value === "string" && /^'(.*)'$/.test(value)) {
      value = value.replace(/^'(.*)'$/, "$1");
    } else if (typeof value === "string" && /^\d+$/.test(value)) {
      value = parseInt(value);
    } else if (typeof value === "string" && /^\d+\.\d+$/.test(value)) {
      value = parseFloat(value);
    } else if (value === "true" || value === "false") {
      value = value === "true";
    }
    result[key] = value;
  }

  function parseArrayString(str: string): ParsedArray {
    const result: ParsedArray = [];
    let currentValue = "";
    let braceCount = 0;
    let bracketCount = 0;
    for (let i = 1; i < str.length - 1; i++) {
      const char = str[i];
      if (char === "{") {
        braceCount++;
      } else if (char === "}") {
        braceCount--;
      } else if (char === "[") {
        bracketCount++;
      } else if (char === "]") {
        bracketCount--;
      }
      if (braceCount === 0 && bracketCount === 0) {
        if (char === ",") {
          result.push(parseValue(currentValue.trim()));
          currentValue = "";
        } else {
          currentValue += char;
        }
      } else {
        currentValue += char;
      }
    }
    result.push(parseValue(currentValue.trim()));

    function parseValue(
      value: string
    ): string | number | boolean | ParsedObject | ParsedArray {
      if (value[0] === "{") {
        return parseObjectString(value);
      } else if (value[0] === "[") {
        return parseArrayString(value);
      } else if (/^'(.*)'$/.test(value)) {
        return value.replace(/^'(.*)'$/, "$1");
      } else if (/^\d+$/.test(value)) {
        return parseInt(value);
      } else if (/^\d+\.\d+$/.test(value)) {
        return parseFloat(value);
      } else if (value === "true" || value === "false") {
        return value === "true";
      }
      return value;
    }

    return result;
  }

  return result;
}

const myString =
  "{name: 'John', age: 30, isStudent: false, scores: [90, 85, 95], address: {city: 'New York', country: 'USA'}}";

const myObject = parseObjectString(myString);

console.log(myObject);
