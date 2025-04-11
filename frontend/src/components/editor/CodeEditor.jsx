import { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import TerminalOutput from './TerminalOutput';

import {
    Panel,
    PanelGroup,
    PanelResizeHandle,
} from 'react-resizable-panels';

// function CodeEditor() {
//     const [value, setValue] = React.useState("console.log('hello world!');");
//     const onChange = React.useCallback((val, viewUpdate) => {
//         console.log('val:', val);
//         setValue(val);
//     }, []);
//     return <CodeMirror value={value} height="200px" extensions={[javascript({ jsx: true })]} onChange={onChange} />;
// }
// export default CodeEditor;


export default function CodeEditor({ language, theme }) {
    const [value, setValue] = useState("console.log('hello world!');");
    const onChange = useCallback((val, viewUpdate) => {
        console.log('val:', val);
        setValue(val);
    }, []);
    return (
        <PanelGroup direction="horizontal" className="flex-1">
            {/* Code Editor (left side) */}
            <Panel defaultSize={70} minSize={40}>
                <CodeMirror
                    value={value}
                    height="100%"
                    extensions={[javascript({ jsx: true })]}
                    theme={theme}
                    onChange={onChange}
                />
            </Panel>

            {/* Divider/Dragger */}
            <PanelResizeHandle className="w-1 bg-zinc-600 custom-resize-cursor transition-all duration-150" />



            {/* Terminal (right side) */}
            <Panel defaultSize={30} minSize={20}>
                <div className="w-[30%] border-l border-zinc-700 bg-zinc-950 p-2 overflow-auto">
                    <TerminalOutput />
                </div>
            </Panel>
        </PanelGroup>
    );
}
