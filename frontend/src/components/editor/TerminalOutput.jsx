
export default function TerminalOutput({ output }) {
    return (
        <div className=" font-mono whitespace-pre-wrap" style={{ color: "#9DFF34CF" }}>
            {output || 'Run your code to see output here...'}
        </div>
    );
}