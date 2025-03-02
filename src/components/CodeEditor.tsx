import React, { useState } from "react";
import EditorHeader from "./EditorHeader";
import CodeInputArea from "./CodeInputArea";
import { Card } from "./ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CodeEditorProps {
  onDebugCode?: () => void;
  onAnalyzeComplexity?: () => void;
  onConvertCode?: () => void;
  onAllInOne?: () => void;
  onCodeChange?: (code: string) => void;
  initialCode?: string;
  problemDescription?: string;
  selectedLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

const CodeEditor = ({
  onDebugCode = () => {},
  onAnalyzeComplexity = () => {},
  onConvertCode = () => {},
  onAllInOne = () => {},
  onCodeChange = () => {},
  initialCode = '// Write your code here\n\nfunction example() {\n  console.log("Hello, Code Mentor!");\n}\n\nexample();',
  problemDescription = "# Binary Search Implementation\n\nImplement a binary search algorithm that finds the position of a target value within a sorted array.\n\n## Requirements:\n- The function should return the index of the target if found\n- If the target is not found, return -1\n- The array is sorted in ascending order\n- Optimize for time complexity",
  selectedLanguage = "javascript",
  onLanguageChange = () => {},
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange(newCode);
  };

  return (
    <Card className="flex flex-col h-full w-full bg-background border-border overflow-hidden">
      <EditorHeader
        onDebugCode={onDebugCode}
        onAnalyzeComplexity={onAnalyzeComplexity}
        onConvertCode={onConvertCode}
        onAllInOne={onAllInOne}
        selectedLanguage={selectedLanguage}
        onLanguageChange={onLanguageChange}
      />

      <Collapsible
        open={isDescriptionOpen}
        onOpenChange={setIsDescriptionOpen}
        className="border-b border-border"
      >
        <div className="flex items-center justify-between px-4 py-2 bg-muted/30">
          <h3 className="text-sm font-medium">Problem Description</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {isDescriptionOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              <span className="sr-only">
                {isDescriptionOpen ? "Close" : "Open"} problem description
              </span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="p-4 bg-muted/20">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap">{problemDescription}</div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex-1 overflow-hidden">
        <CodeInputArea
          code={code}
          onChange={handleCodeChange}
          language={selectedLanguage}
        />
      </div>
    </Card>
  );
};

export default CodeEditor;
