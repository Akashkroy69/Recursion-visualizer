// src/components/CodeEditor.jsx
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, setCode }) => {
  return (
    <Editor
      height="300px"
      defaultLanguage="python"
      value={code}
      onChange={(value) => setCode(value)}
    />
  );
};

export default CodeEditor;
