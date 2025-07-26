// RecursionVisualizer.jsx
import './index.css';
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import TreeVisualizer from "./components/TreeVisualizer";
import { buildRecursionTree } from "./parser/parsePython";

const defaultCode = `def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)`;

export default function RecursionVisualizer() {
  const [code, setCode] = useState(defaultCode);
  const [view, setView] = useState(null);
  const [tree, setTree] = useState(null);

const handleVisualize = (type) => {
  setView(type);
  if (type === "tree") {
    const match = code.match(/def\s+(\w+)\s*\(\s*(\w+)\s*\)/);
    if (match) {
      const [, funcName, param] = match;
      try {
        const root = buildRecursionTree(funcName, param, 3); // You can later add user input for 3
        setTree(root);
      } catch (err) {
        alert("Failed to build recursion tree: " + err.message);
        setTree(null);
      }
    } else {
      alert("Could not parse function name and parameter from the code.");
      setTree(null);
    }
  }
};

  return (
    <div className="min-h-screen bg-gray-50 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Panel: Code Input & Controls */}
      <div>
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Recursive Function Code</h2>
        <Editor
          height="300px"
          defaultLanguage="python"
          value={code}
          onChange={(value) => setCode(value || "")}
        />

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => handleVisualize("stack")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
          >
             Visualize Stack
          </button>

          <button
            onClick={() => handleVisualize("tree")}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded shadow"
          >
            Visualize Recursion Tree
          </button>
        </div>
      </div>

      {/* Right Panel: Visualization Output */}
      <div className="border p-4 rounded shadow bg-white overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Visualization Output</h2>
        {view === "stack" && (
          <p className="text-gray-600 italic">[Stack visual output goes here]</p>
        )}
        {view === "tree" && tree && (
          <TreeVisualizer node={tree} />
        )}
        {!view && (
          <p className="text-gray-400"> Choose a visualization method to begin</p>
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 right-4 text-sm text-white bg-indigo-700 px-4 py-2 rounded shadow-lg z-50">
        © Akash Kumar Roy
      </div>
    </div>
  );
}
