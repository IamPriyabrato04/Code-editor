import { TabNav } from "@radix-ui/themes";
import AppLayout from "./layout/AppLayout";
import { useState } from "react";


const App = () => {

  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('dark');

  return (

    <div className="h-screen w-full">
      <TabNav.Root>
        <TabNav.Link href="#" active>
          Account
        </TabNav.Link>
        <TabNav.Link href="#">Documents</TabNav.Link>
        <TabNav.Link href="#">Settings</TabNav.Link>
      </TabNav.Root>
      {/* <div className="flex-1 flex items-center justify-center">
          
        </div> */}
      <AppLayout
        code={code}
        setCode={setCode}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />

    </div>
  )
}

export default App