export default function TerminalOutput({ output = "Hello, World!\n" }) {
    return (
        <div className="h-full font-mono text-sm whitespace-pre-wrap text-green-400">
            {output}
        </div>
    );
}