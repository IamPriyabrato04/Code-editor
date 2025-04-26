import { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { go } from '@codemirror/lang-go';

import TerminalOutput from './TerminalOutput';
import useExecuteCode from '../../hooks/useCodeExecution.js';

import { Button, DropdownMenu } from "@radix-ui/themes";

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';

// Supported languages with icons
const languageOptions = [
  { name: 'C++', value: 'cpp', icon: 'https://img.icons8.com/?size=100&id=TpULddJc4gTh&format=png' },
  { name: 'Python', value: 'python', icon: 'https://img.icons8.com/?size=100&id=13441&format=png' },
  { name: 'JavaScript', value: 'javascript', icon: 'https://img.icons8.com/?size=100&id=108784&format=png' },
  { name: 'Java', value: 'java', icon: 'https://img.icons8.com/?size=100&id=13679&format=png' },
  { name: 'Golang', value: 'go', icon: 'https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_Aqua.png' },
];

// Language extensions
const langExtensions = {
  javascript: javascript({ jsx: true }),
  cpp: cpp(),
  python: python(),
  java: java(),
  go: go(),
};

// Boilerplate/starter code
const boilerplateCode = {
  javascript: "console.log('Hello World!');",
  cpp: `#include<iostream>\nusing namespace std;\nint main() {\n  cout << "Hello World!";\n  return 0;\n}`,
  python: "print('Hello World!')",
  java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World!");\n  }\n}`,
  go: `package main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hello World!")\n}`,
};

export default function CodeEditor({ theme }) {
  const [language, setLanguage] = useState('javascript');
  const [value, setValue] = useState(boilerplateCode['javascript']);
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
    setInput('');
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setValue(boilerplateCode[lang]); // Load boilerplate code
  };

  const selectedLang = languageOptions.find((lang) => lang.value === language);

  return (
    <PanelGroup direction="horizontal" className="flex-1">

      {/* Code Editor Panel */}
      <Panel defaultSize={70} minSize={40}>
        <div className="flex flex-col h-full">
          <div className="p-2 border-b bg-zinc-800 flex justify-between items-center">

            {/* Language Dropdown */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="soft" className="flex items-center gap-2">
                  <img src={selectedLang.icon} className="w-6 h-6" />
                  {selectedLang.name}
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content className="bg-zinc-900 p-2 rounded shadow-md">
                {languageOptions.map((lang) => (
                  <DropdownMenu.Item key={lang.value} onSelect={() => handleLanguageChange(lang.value)} className="cursor-pointer flex justify-between items-center p-2 hover:bg-zinc-700 rounded">
                    <span>{lang.name}</span>
                    <img src={lang.icon} className="w-6 h-6" />
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>


            {/* Run Button */}
            <Button onClick={handleRun} disabled={loading}>
              {loading ? 'Running...' : 'Run'}
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </Button>

          </div>

          {/* CodeMirror */}
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
        <span className='flex pl-1 p-2 gap-3 border-b bg-zinc-800'>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACzUlEQVR4nO2YTWhTQRDH1y9U6kEFEQ9SkYI1byZR6kH0IFIED8VbK148KHrSk0IRhbZHLaUmO0ktCp4U6UU8KagIfoAHkVLSN9uKVHsRwagUxFbUyCQbKU3aJCbmvbTvD0N4u2/nzW9nd/blKRXIZ6JkaJ02eI0Mpshgus4sJbH3DocbFBkc9EFAldqAymUiwdii6kyaYY8F+aRyVKpORbn4AxCfiBZtRqjOTS06EFWnogDEZ6IgIz4TLemM9E9E1mvXaYsZ5yQZ6KBkqKnYmJhx9mvG0zEDzcprkN7hcAMZjJHBmbwazvB4ISDNeCR7H97xFKRvcu9abfCF3KMNThHDdW2wUzPEieFLpp3hI43ubCw0vuvJgZXa4AdinO5LhjZ6BkIM/Rbi3QBHts3uG3Sbt2jGyWw/3F7Ax+XMc1w44wlIdHzXJs34PROo67QVdDSGp2xWvqbTapm0aYPtYjQaceQ6wbhDM/4mhteegJCLx2x/aijdvqJc55qx+28b43Npi46Hd1cLonQQxh472y9VGSoMAifsEo2W46sqINrAlWw/PFBlKDGCG8SkUMz5WjMl2Y2ON61WtQXBTruRk/M5GnzVsioxhtvFutJq+YIPZbwh/mLGOVoNiNKXlsFWewZMy2FY+J7wYQv7LbfZ51OcnX3/kuGKQWS2yeB7C9NT2BHcsvvovipBmtElxl/xN85WVdNzxECHDfSnZjgrcNIus08M56SsZkqrwdZZzofEpATngzjn7cRcqimISLtwwQYrVeeznAeZ0zpbmQTkoipStXK6OgKbtYEfmvFtsaX4X14a5eWPDNyzlUfGzGiGR9qFQ3nOGR+KxcfCxws+nPGu+Iizc7DmILOV+WhcgW5ONK6R8iy/qkLRkv4/4kdRAOIzUZARn4mCjPhMFGTEZ6IgIz4TBRnxe0aozk1phmdeB1GxMTz1emUEUnP0B0uqG0DnMEmPAAAAAElFTkSuQmCC" alt="command-line" width={"25px"} height={"25px"} />
          <span className="text-lg font-normal text-white">Terminal</span>
        </span>
        <div className="w-full h-full border-l border-zinc-700 bg-zinc-950 p-2 overflow-auto">
          <TerminalOutput output={output} />
        </div>
      </Panel>
    </PanelGroup>
  );
}
