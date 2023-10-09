import React from "react";
import "./jsondisplay.css";
import { useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface JsonComparisonProps {
  json: object;
  type: string;
}

const JsonDisplay: React.FC<JsonComparisonProps> = ({ json, type }) => {
  useEffect(() => {
    return () => {
      // Cleanup logic here
    };
  }, [json]);
  return (
    <div className="json-comparison">
      <div className="json-container">
        {type === "matched" ? (
          <pre className="json-text">{JSON.stringify(json, null, 2)}</pre>
        ) : (
          <pre className="json-text">
            <SyntaxHighlighter language="json" style={darcula}>
              {JSON.stringify(json, null, 2)}
            </SyntaxHighlighter>
          </pre>
        )}
      </div>
    </div>
  );
};

export default JsonDisplay;
