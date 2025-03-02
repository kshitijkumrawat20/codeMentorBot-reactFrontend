import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Code,
  FileCode,
  BarChart2,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

interface EditorHeaderProps {
  onDebugCode?: () => void;
  onAnalyzeComplexity?: () => void;
  onConvertCode?: () => void;
  onAllInOne?: () => void;
  selectedLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

const EditorHeader = ({
  onDebugCode = () => {},
  onAnalyzeComplexity = () => {},
  onConvertCode = () => {},
  onAllInOne = () => {},
  selectedLanguage = "javascript",
  onLanguageChange = () => {},
}: EditorHeaderProps) => {
  const [convertToLanguage, setConvertToLanguage] = useState("python");

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "go", label: "Go" },
    { value: "ruby", label: "Ruby" },
    { value: "rust", label: "Rust" },
    { value: "php", label: "PHP" },
  ];

  const handleLanguageChange = (value: string) => {
    onLanguageChange(value);
  };

  const handleConvertTo = (language: string) => {
    setConvertToLanguage(language);
    onConvertCode();
  };

  return (
    <div className="bg-background border-b p-2 flex flex-row justify-between items-center gap-1 w-full">
      <div className="flex items-center">
        <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-[130px] h-8">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem key={language.value} value={language.value}>
                {language.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-row flex-wrap gap-2 justify-end">
        <Button
          variant="outline"
          className="flex items-center gap-2 h-9"
          onClick={onDebugCode}
        >
          <Code className="h-4 w-4" />
          Debug
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2 h-9"
          onClick={onAnalyzeComplexity}
        >
          <BarChart2 className="h-4 w-4" />
          Analyze
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 h-9">
              <FileCode className="h-4 w-4" />
              Convert
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {languages
              .filter((lang) => lang.value !== selectedLanguage)
              .map((language) => (
                <DropdownMenuItem
                  key={language.value}
                  onClick={() => handleConvertTo(language.value)}
                >
                  Convert to {language.label}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="flex items-center gap-2 h-9" onClick={onAllInOne}>
          <RefreshCw className="h-4 w-4" />
          All-in-One
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
