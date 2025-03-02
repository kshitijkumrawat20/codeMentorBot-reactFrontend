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

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
  codeBlocks?: Array<{
    language: string;
    code: string;
  }>;
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
  const [messages, setMessages] = useState<Message[]>([]);

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
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: "user",
        content: "Debug my code",
        timestamp: new Date(),
      };

      // Add AI response
      const aiMessage: Message = {
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

      setMessages((prevMessages) => [...prevMessages, userMessage, aiMessage]);
    } catch (error: any) {
      console.error("Error debugging code:", error);

      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        sender: "ai",
        content: `Error debugging code: ${error.message}`,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
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
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: "user",
        content: "Analyze the time and space complexity of my code",
        timestamp: new Date(),
      };

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: `Complexity Analysis:\n${data.time_complexity}\n${data.space_complexity}\n\n${data.explanation || ""}`,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, userMessage, aiMessage]);
    } catch (error: any) {
      console.error("Error analyzing complexity:", error);

      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        sender: "ai",
        content: `Error analyzing complexity: ${error.message}`,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleConvertCode = async (targetLang: string) => {
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
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: "user",
        content: `Convert my ${language} code to ${targetLang}`,
        timestamp: new Date(),
      };

      // Add AI response
      const aiMessage: Message = {
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

      setMessages((prevMessages) => [...prevMessages, userMessage, aiMessage]);
    } catch (error: any) {
      console.error("Error converting code:", error);

      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        sender: "ai",
        content: `Error converting code: ${error.message}`,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleAllInOne = async () => {
    setLoading(true);
    try {
      // Add user message first
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: "user",
        content: "Perform a comprehensive analysis of my code",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Make API calls in sequence
      const debugResponse = await fetch(API_ENDPOINTS.debug, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          source_lang: language,
        }),
      });

      const debugData = await debugResponse.json();

      const analyzeResponse = await fetch(API_ENDPOINTS.analyze, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          source_lang: language,
        }),
      });

      const analyzeData = await analyzeResponse.json();

      // Combine results into one comprehensive message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: `# Comprehensive Code Analysis\n\n## Debug Results\n${debugData.summary || "No debug summary available"}\n\n## Complexity Analysis\n${analyzeData.time_complexity || "Time complexity: Unknown"}\n${analyzeData.space_complexity || "Space complexity: Unknown"}\n\n${analyzeData.explanation || ""}`,
        timestamp: new Date(),
        codeBlocks: [
          {
            language: language,
            code: debugData.fixed_code || code,
          },
        ],
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error: any) {
      console.error("Error in all-in-one analysis:", error);

      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        sender: "ai",
        content: `Error performing comprehensive analysis: ${error.message}`,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
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
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // For now, we'll just echo the message back
    // In a real app, you'd send this to your AI backend
    setLoading(true);
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: `I received your message: "${message}". You can use the buttons above to analyze your code.`,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
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
