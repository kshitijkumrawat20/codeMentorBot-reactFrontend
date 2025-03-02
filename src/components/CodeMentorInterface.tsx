import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor from "./CodeEditor";
import ChatInterface from "./ChatInterface";
import { cn } from "../lib/utils";
import { API_ENDPOINTS } from "../lib/config";

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

  // State for chat messages
  const [messages, setMessages] = useState([]);

  // Handlers for code editor actions
  const handleDebugCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.debug, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          source_lang: language,
        }),
      });

      const data = await response.json();

      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        sender: "user",
        content: "Debug my code",
        timestamp: new Date(),
      };

      // Add AI response
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: `Debug Results:\n${data.summary}`,
        timestamp: new Date(),
        codeBlocks: [
          {
            language: language,
            code: data.fixed_code || code,
          },
        ],
      };

      setMessages([...messages, userMessage, aiMessage]);
    } catch (error) {
      console.error("Error debugging code:", error);

      // Add error message
      const errorMessage = {
        id: Date.now().toString(),
        sender: "ai",
        content: `Error debugging code: ${error.message}`,
        timestamp: new Date(),
      };

      setMessages([...messages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeComplexity = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.analyze, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          source_lang: language,
        }),
      });

      const data = await response.json();

      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        sender: "user",
        content: "Analyze the time and space complexity of my code",
        timestamp: new Date(),
      };

      // Add AI response
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: `Complexity Analysis:\n${data.time_complexity}\n${data.space_complexity}\n\n${data.explanation || ""}`,
        timestamp: new Date(),
      };

      setMessages([...messages, userMessage, aiMessage]);
    } catch (error) {
      console.error("Error analyzing complexity:", error);

      // Add error message
      const errorMessage = {
        id: Date.now().toString(),
        sender: "ai",
        content: `Error analyzing complexity: ${error.message}`,
        timestamp: new Date(),
      };

      setMessages([...messages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleConvertCode = async (targetLang) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.convert, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          source_lang: language,
          target_lang: targetLang,
        }),
      });

      const data = await response.json();

      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        sender: "user",
        content: `Convert my ${language} code to ${targetLang}`,
        timestamp: new Date(),
      };

      // Add AI response
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: `Converted Code (${targetLang}):`,
        timestamp: new Date(),
        codeBlocks: [
          {
            language: targetLang,
            code: data.converted_code || "Conversion failed",
          },
        ],
      };

      setMessages([...messages, userMessage, aiMessage]);
    } catch (error) {
      console.error("Error converting code:", error);

      // Add error message
      const errorMessage = {
        id: Date.now().toString(),
        sender: "ai",
        content: `Error converting code: ${error.message}`,
        timestamp: new Date(),
      };

      setMessages([...messages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleAllInOne = async () => {
    setLoading(true);
    try {
      // For now, we'll just call debug and analyze in sequence
      // You can implement a dedicated all-in-one endpoint later
      await handleDebugCode();
      await handleAnalyzeComplexity();
    } catch (error) {
      console.error("Error in all-in-one analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleSendMessage = (message: string) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);

    // For now, we'll just echo the message back
    // In a real app, you'd send this to your AI backend
    setLoading(true);
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: `I received your message: "${message}". You can use the buttons above to analyze your code.`,
        timestamp: new Date(),
      };

      setMessages([...messages, userMessage, aiMessage]);
      setLoading(false);
    }, 1000);
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
            messages={messages}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CodeMentorInterface;
