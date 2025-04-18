import { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import TerminalOutput from './TerminalOutput';

import {
    Panel,
    PanelGroup,
    PanelResizeHandle,
} from 'react-resizable-panels';

import useExecuteCode from '../../hooks/useCodeExecution.js'; // custom hook

// function CodeEditor() {
//     const [value, setValue] = React.useState("console.log('hello world!');");
//     const onChange = React.useCallback((val, viewUpdate) => {
//         console.log('val:', val);
//         setValue(val);
//     }, []);
//     return <CodeMirror value={value} height="200px" extensions={[javascript({ jsx: true })]} onChange={onChange} />;
// }
// export default CodeEditor;

const langExtensions = {
    javascript: javascript({ jsx: true }),
    cpp: cpp(),
    python: python(),
};


export default function CodeEditor({ language = "javascript", theme }) {
    const [value, setValue] = useState("console.log('hello world!');");
    const [output, setOutput] = useState('');
    const [input, setInput] = useState('');

    const { executeCode, loading } = useExecuteCode();

    const onChange = useCallback((val) => {
        setValue(val);
    }, []);

    const handleRun = async () => {
        if (!value) {
            alert('Please write some code to execute.');
            return;
        }

        const result = await executeCode(language, value, input);
        setOutput(result);
        setInput(''); // Clear input after execution
    };

    return (
        <PanelGroup direction="horizontal" className="flex-1">

            {/* Code Editor Panel */}
            <Panel defaultSize={70} minSize={40}>
                <div className="flex flex-col h-full">
                    <div className="p-2 border-b bg-zinc-800 flex justify-between items-center">
                        <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-zinc-800 p-1 rounded">
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="cpp">C++</option>
                            {/* <option value="java">Java</option> */}
                        </select>
                        <span className="text-sm font-medium text-white">Code Editor</span>
                        <button
                            onClick={handleRun}
                            disabled={loading}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Running...' : 'Run'}
                        </button>
                    </div>
                    <CodeMirror
                        value={value}
                        height="100%"
                        extensions={[langExtensions[language]]}
                        theme={theme}
                        onChange={onChange}
                    />
                </div>
            </Panel>

            <PanelResizeHandle className="w-1 bg-zinc-600" />

            {/* Terminal Panel */}
            <Panel defaultSize={30} minSize={20}>
                <div className="w-full h-full border-l border-zinc-700 bg-zinc-950 p-2 overflow-auto">
                    <TerminalOutput output={output} />
                </div>
            </Panel>
        </PanelGroup>
    );
}