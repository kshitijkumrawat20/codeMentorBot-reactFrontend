import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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

interface ChatMessagesProps {
  messages?: Message[];
  className?: string;
}

const ChatMessages = ({
  messages = defaultMessages,
  className,
}: ChatMessagesProps) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={cn("bg-background w-full h-full", className)}>
      <ScrollArea className="h-full w-full p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    </div>
  );
};

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isAi = message.sender === "ai";

  return (
    <div className={cn("flex", isAi ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3",
          isAi
            ? "bg-secondary text-secondary-foreground"
            : "bg-primary text-primary-foreground",
        )}
      >
        {message.codeBlocks ? (
          <div className="space-y-2">
            <div className="whitespace-pre-wrap">{message.content}</div>
            {message.codeBlocks.map((codeBlock, index) => (
              <CodeBlock
                key={index}
                language={codeBlock.language}
                code={codeBlock.code}
              />
            ))}
          </div>
        ) : (
          <div className="whitespace-pre-wrap">{message.content}</div>
        )}
        <div className="text-xs opacity-70 mt-1 text-right">
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock = ({ language, code }: CodeBlockProps) => {
  return (
    <div className="rounded bg-muted p-2 font-mono text-sm">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted-foreground">{language}</span>
        <button
          className="text-xs text-muted-foreground hover:text-foreground"
          onClick={() => navigator.clipboard.writeText(code)}
        >
          Copy
        </button>
      </div>
      <pre className="overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

// Default messages for display when no props are provided
const defaultMessages: Message[] = [
  {
    id: "1",
    sender: "user",
    content: "How do I implement a binary search algorithm in JavaScript?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "2",
    sender: "ai",
    content: "Here's a binary search implementation in JavaScript:",
    timestamp: new Date(Date.now() - 1000 * 60 * 29),
    codeBlocks: [
      {
        language: "javascript",
        code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Target not found
}`,
      },
    ],
  },
  {
    id: "3",
    sender: "user",
    content: "What's the time complexity of this algorithm?",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: "4",
    sender: "ai",
    content:
      "The time complexity of binary search is O(log n), where n is the number of elements in the array. This is because each comparison eliminates roughly half of the remaining elements from consideration.",
    timestamp: new Date(Date.now() - 1000 * 60 * 19),
  },
  {
    id: "5",
    sender: "user",
    content: "Can you help me debug this code?",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    codeBlocks: [
      {
        language: "javascript",
        code: `function findMax(arr) {
  let max = arr[0];
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`,
      },
    ],
  },
  {
    id: "6",
    sender: "ai",
    content: "I found a couple of issues in your code:",
    timestamp: new Date(Date.now() - 1000 * 60 * 9),
    codeBlocks: [
      {
        language: "javascript",
        code: `function findMax(arr) {
  // Check if array is empty
  if (arr.length === 0) return null;
  
  let max = arr[0];
  // Loop condition should be i < arr.length (not <=)
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`,
      },
    ],
  },
];

export default ChatMessages;
