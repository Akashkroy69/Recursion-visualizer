// src/parser/parsePython.js
export function buildRecursionTree(funcName, param, depth) {
  if (depth <= 0) return { call: `${funcName}(${depth})`, children: [] };

  return {
    call: `${funcName}(${depth})`,
    children: [
      buildRecursionTree(funcName, param, depth - 1),
      buildRecursionTree(funcName, param, depth - 1),
    ],
  };
}
