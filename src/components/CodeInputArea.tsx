import React, { useState } from "react";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";

interface CodeInputAreaProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
}

const CodeInputArea = ({
  code = '// Write your code here\n\nfunction example() {\n  console.log("Hello, Code Mentor!");\n}\n\nexample();',
  onChange = () => {},
  language = "javascript",
}: CodeInputAreaProps) => {
  const [value, setValue] = useState(code);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Card className="flex flex-col h-full w-full overflow-hidden bg-slate-900 border-slate-700">
      <div className="flex-1 overflow-auto p-1">
        <Textarea
          value={value}
          onChange={handleChange}
          className="w-full h-full min-h-[400px] font-mono text-sm resize-none bg-slate-900 text-slate-100 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Write your code here..."
          spellCheck={false}
          data-language={language}
        />
      </div>
    </Card>
  );
};

export default CodeInputArea;
