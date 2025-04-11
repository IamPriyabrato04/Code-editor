import CopyCodeButton from "../components/topbar/CopyButton";
import LanguageSelector from "../components/topbar/LanguageSelector";
import ShareButton from "../components/topbar/ShareButton";
import ThemeSelector from "../components/topbar/ThemeSelector";


export default function TopBarWrapper() {
    return (
        <div className="flex justify-between items-center px-4 py-2 bg-zinc-900">

            <span className="flex gap-4">
                <LanguageSelector />
                <ThemeSelector />
            </span>
            <span className="flex gap-2">
                <ShareButton />
                <CopyCodeButton />
            </span>
        </div>
    );
}
