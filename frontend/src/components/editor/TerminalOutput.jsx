export default function TerminalOutput({ output }) {
    return (
        <div className="text-green-400 font-mono whitespace-pre-wrap">
            {output || 'Run your code to see output here...'}
        </div>
    );
}