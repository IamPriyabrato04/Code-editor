export default function LanguageSelector({ value, onChange }) {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-zinc-800 p-1 rounded">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
        </select>
    );
}
