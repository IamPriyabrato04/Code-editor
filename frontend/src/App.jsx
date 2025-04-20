import { TabNav, Box, Card, Avatar, Text, Flex } from "@radix-ui/themes";
import AppLayout from "./layout/AppLayout";
import { useState } from "react";


const App = () => {

  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('dark');

  return (

      <div
        className="h-screen w-full"
        
      >
      <TabNav.Root>
        <TabNav.Link href="#" active>
          Account
        </TabNav.Link>
        <TabNav.Link href="#">Documents</TabNav.Link>
        <TabNav.Link href="#">Settings</TabNav.Link>
        <Box maxWidth="240px">
          <Card>
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                radius="full"
                fallback="T"
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  Teodros Girmay
                </Text>
                <Text as="div" size="2" color="gray">
                  Engineering
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
      </TabNav.Root>
      
      <AppLayout
        code={code}
        setCode={setCode}
        theme={theme}
        setTheme={setTheme}
      />

    </div>
  )
}

export default App