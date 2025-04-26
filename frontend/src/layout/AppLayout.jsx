import FileExplorer from '../components/sidebar/FileExplorer';
// import TopBarWrapper from './TopBarWrapper';
import CodeEditor from '../components/editor/CodeEditor';

export default function AppLayout({ ...props }) {
    return (
        <div className="flex h-screen bg-zinc-900 text-white">
            <aside className="w-64 border-r border-zinc-800 p-4">
                <FileExplorer />
            </aside>

            <div className="flex-1 flex flex-col">
                {/* <TopBarWrapper /> */}
                <div className="flex-1">
                    <CodeEditor {...props} />
                </div>
            </div>
        </div>
    );
}
