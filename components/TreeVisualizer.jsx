// src/components/TreeVisualizer.jsx
const TreeVisualizer = ({ node }) => {
  if (!node) return null;

  return (
    <div className="text-center p-2">
      <div className="bg-blue-100 inline-block px-3 py-1 rounded shadow">
        {node.call}
      </div>
      <div className="flex justify-center space-x-4 mt-2">
        {node.children.map((child, idx) => (
          <TreeVisualizer key={idx} node={child} />
        ))}
      </div>
    </div>
  );
};

export default TreeVisualizer;
