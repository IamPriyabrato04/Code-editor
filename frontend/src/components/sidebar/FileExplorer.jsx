import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Tree } from "@minoru/react-dnd-treeview";
import { useState } from "react";

const initialData = [
  {
    id: 1,
    parent: 0,
    text: "src",
    droppable: true,
  },
  {
    id: 2,
    parent: 1,
    text: "index.js",
    droppable: false,
  },
  {
    id: 3,
    parent: 1,
    text: "components",
    droppable: true,
  },
  {
    id: 4,
    parent: 3,
    text: "Button.jsx",
    droppable: false,
  },
  {
    id: 5,
    parent: 0,
    text: "package.json",
    droppable: false,
  },
];

const FileExplorer = () => {
  const [treeData, setTreeData] = useState(initialData);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-64 h-full overflow-auto" style={{ color: "#FDFDFFEF" }}>
        <h2 className="mb-2 font-medium" style={{ color: "#FDFDFFEF" }}>Explorer</h2>
        <Tree
          tree={treeData}
          rootId={0}
          className="text-gray-300"
          render={(node, { depth, isOpen, onToggle }) => (
            <div style={{ marginInlineStart: depth * 10 }} className="flex items-center gap-1">
              {node.droppable && (
                <span onClick={onToggle} className="cursor-pointer">
                  {isOpen ? "📂" : "📁"}
                </span>
              )}
              <span>📄 {node.text}</span>
            </div>
          )}
          dragPreviewRender={(monitorProps) => <div>{monitorProps.item.text}</div>}
          onDrop={(newTree) => setTreeData(newTree)}
        />
      </div>
    </DndProvider>
  );
};

export default FileExplorer;
