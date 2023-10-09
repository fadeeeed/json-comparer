export const MapFlatObjects = (
  json1: any,
  json2: any,
  selectedOptions: string[]
) => {
  const finalJson1: Record<string, any> = {};
  const finalJson2: Record<string, any> = {};
  const mismatchJson1: Record<string, any> = {};
  const mismatchJson2: Record<string, any> = {};

  if (Array.isArray(json1) && Array.isArray(json2)) {
    const finalJson1: Record<string, any>[] = [];
    const finalJson2: Record<string, any>[] = [];
    const mismatchJson1: Record<string, any>[] = [];
    const mismatchJson2: Record<string, any>[] = [];

    /*
     * Started sanitizing the data, such as sorting the internal object keys
     */

    const sortedJson1: Record<string, any>[] = [];

    for (const value of json1) {
      if (typeof value === "object") {
        sortedJson1.push(sortObject(value));
      }
    }
    const sortedJson2: Record<string, any>[] = [];

    for (const value of json2) {
      if (typeof value === "object") {
        sortedJson2.push(sortObject(value));
      }
    }

    const stringifyJson1: string = JSON.stringify(sortedJson1);
    const stringifyJson2: string = JSON.stringify(sortedJson2);

    /*
     * Ended sanitizing the data, such as sorting the internal object keys
     */

    for (let key1 of sortedJson1) {
      if (!stringifyJson2.includes(JSON.stringify(key1))) {
        mismatchJson1.push(key1);
      } else finalJson1.push(key1);
    }

    for (let key2 of sortedJson2) {
      if (!stringifyJson1.includes(JSON.stringify(key2))) {
        mismatchJson2.push(key2);
      } else finalJson2.push(key2);
    }

    return [
      finalJson1,
      finalJson2,
      mismatchJson1,
      mismatchJson2,
      Object.keys(mismatchJson1).length === 0 &&
        Object.keys(mismatchJson2).length === 0,
    ];
  } else if (typeof json1 === "object" && typeof json2 === "object") {
    for (let key in json1) {
      if (json1[key] != null && json1.hasOwnProperty(key)) {
        if (json2[key] != null && json2.hasOwnProperty(key)) {
          const [
            nestedFinalJson1,
            nestedFinalJson2,
            nestedMismatchJson1,
            nestedMismatchJson2,
          ] = MapFlatObjects(json1[key], json2[key], selectedOptions);

          if (Object.keys(nestedFinalJson1).length > 0) {
            finalJson1[key] = nestedFinalJson1;
          }
          if (Object.keys(nestedFinalJson2).length > 0) {
            finalJson2[key] = nestedFinalJson2;
          }
          if (Object.keys(nestedMismatchJson1).length > 0) {
            mismatchJson1[key] = nestedMismatchJson1;
          }
          if (Object.keys(nestedMismatchJson2).length > 0) {
            mismatchJson2[key] = nestedMismatchJson2;
          }
        } else {
          mismatchJson1[key] = json1[key];
        }
      }
    }
  }

  const isSame = JSON.stringify(json1) === JSON.stringify(json2);

  return [finalJson1, finalJson2, mismatchJson1, mismatchJson2, isSame];
};

const MapNestedObjects = (
  json1: any,
  json2: any,
  selectedOptions: string[]
) => {
  const similarityMap: any = {};

  const finalJson1: any = {};
  const finalJson2: any = {};
  const mismatchJson1: any = {};
  const mismatchJson2: any = {};
  let isSame = true;
  for (const key1 in json1) {
    if (json1.hasOwnProperty(key1) && typeof json1[key1] === "object") {
      let obj1 = json1[key1];
      obj1 = removeKey(obj1, selectedOptions);
      const sortedArray1 = Object.keys(obj1).sort();

      const sortedJson1: any = {};

      for (let i = 0; i < sortedArray1.length; i++) {
        sortedJson1[sortedArray1[i]] = obj1[sortedArray1[i]];
      }

      let isNestedSame = false;

      for (const key2 in json2) {
        if (json2.hasOwnProperty(key2) && typeof json2[key2] === "object") {
          let obj2 = json2[key2];
          obj2 = removeKey(obj2, selectedOptions);
          const sortedArray2 = Object.keys(obj2).sort();
          const sortedJson2: any = {};

          for (let i = 0; i < sortedArray2.length; i++) {
            sortedJson2[sortedArray2[i]] = obj2[sortedArray2[i]];
          }
          if (areObjectsSimilar(sortedJson1, sortedJson2)) {
            if (!similarityMap[key1]) {
              similarityMap[key1] = [];
            }
            isNestedSame = true;

            similarityMap[key1].push(key2);
            break;
          }
        }
      }

      if (isNestedSame) {
        const { key1, ...rest } = json1;
        json1 = rest;
      } else {
        isSame = false;
      }
    }
  }
  console.log("Similarity Map: ", similarityMap);
  for (const key in similarityMap) {
    finalJson1[key] = sortJson(json1[key]);
    finalJson2[similarityMap[key][0]] = sortJson(json2[similarityMap[key][0]]);
  }

  for (const key in json1) {
    if (!finalJson1.hasOwnProperty(key)) {
      mismatchJson1[key] = sortJson(json1[key]);
    }
  }
  for (const key in json2) {
    if (!finalJson2.hasOwnProperty(key)) {
      mismatchJson2[key] = sortJson(json2[key]);
    }
  }
  return [finalJson1, finalJson2, mismatchJson1, mismatchJson2, isSame];
};

function sortJson(json: any) {
  const sortedFinalArray2 = Object.keys(json).sort();
  const sortedFinalJson2: any = {};

  for (let i = 0; i < sortedFinalArray2.length; i++) {
    sortedFinalJson2[sortedFinalArray2[i]] = json[sortedFinalArray2[i]];
  }
  return sortedFinalJson2;
}

function removeKey(json: any, selectedOptions: string[]) {
  if (typeof json !== "object" || !Array.isArray(selectedOptions)) {
    return json;
  }

  // Create a copy of the JSON object
  const updatedJson = { ...json };

  // Iterate over the keys to remove
  selectedOptions.forEach((key) => {
    // Remove the key from the JSON object
    delete updatedJson[key];
  });

  return updatedJson;
}

function areObjectsSimilar(obj1: any, obj2: any) {
  const obj1String = JSON.stringify(obj1);
  const obj2String = JSON.stringify(obj2);
  return obj1String === obj2String;
}

export function getAllKeys(
  json1: object,
  json2: object,
  ignoreNestedRootKeys: boolean = false
): string[] {
  const keys1 = getObjectKeys(json1, ignoreNestedRootKeys);
  const keys2 = getObjectKeys(json2, ignoreNestedRootKeys);

  // Concatenate the keys from both objects and remove duplicates
  const allKeys: string[] = Array.from(new Set([...keys1, ...keys2]));

  return allKeys;
}

function getObjectKeys(obj: any, ignoreNestedRootKeys: boolean): string[] {
  let keys: string[] = [];

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (
        !ignoreNestedRootKeys ||
        typeof obj[key] !== "object" ||
        obj[key] === null
      ) {
        keys.push(key);
      }

      if (typeof obj[key] === "object" && obj[key] !== null) {
        keys = keys.concat(getObjectKeys(obj[key], ignoreNestedRootKeys));
      }
    }
  }

  return keys;
}
export default MapNestedObjects;

export const IsValidObject = (obj: string) => {
  let myObject;
  try {
    myObject = new Function(`return ${obj}`)();
  } catch (error) {
    return false;
  }

  if (myObject) {
    return true;
  }
};

const sortArray: any = (arr: any[]) => {
  return arr.map((item: any) => {
    if (Array.isArray(item)) {
      return sortArray(item);
    }
    if (typeof item === "object" && item !== null) {
      return sortObject(item);
    }
    return item;
  });
};

const sortObject = (obj: any) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const sortedObj: any = {};
  const keys = Object.keys(obj).sort();

  for (const key of keys) {
    sortedObj[key] = obj[key];
  }

  return sortedObj;
};
