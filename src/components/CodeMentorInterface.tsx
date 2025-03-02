import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor from "./CodeEditor";
import ChatInterface from "./ChatInterface";
import { cn } from "../lib/utils";

interface CodeMentorInterfaceProps {
  className?: string;
  initialCode?: string;
  problemDescription?: string;
  selectedLanguage?: string;
}

const CodeMentorInterface = ({
  className,
  initialCode = '// Write your code here\n\nfunction example() {\n  console.log("Hello, Code Mentor!");\n}\n\nexample();',
  problemDescription = "# Binary Search Implementation\n\nImplement a binary search algorithm that finds the position of a target value within a sorted array.\n\n## Requirements:\n- The function should return the index of the target if found\n- If the target is not found, return -1\n- The array is sorted in ascending order\n- Optimize for time complexity",
  selectedLanguage = "javascript",
}: CodeMentorInterfaceProps) => {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState(selectedLanguage);
  const [loading, setLoading] = useState(false);

  // Handlers for code editor actions
  const handleDebugCode = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleAnalyzeComplexity = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleConvertCode = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleAllInOne = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleSendMessage = (message: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={cn("h-full w-full bg-background", className)}>
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        <ResizablePanel defaultSize={65} minSize={30} className="h-full">
          <CodeEditor
            onDebugCode={handleDebugCode}
            onAnalyzeComplexity={handleAnalyzeComplexity}
            onConvertCode={handleConvertCode}
            onAllInOne={handleAllInOne}
            onCodeChange={handleCodeChange}
            initialCode={code}
            problemDescription={problemDescription}
            selectedLanguage={language}
            onLanguageChange={handleLanguageChange}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={35} minSize={25} className="h-full">
          <ChatInterface
            onSendMessage={handleSendMessage}
            title="Code Mentor AI"
            loading={loading}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CodeMentorInterface;
