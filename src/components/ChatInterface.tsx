import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { cn } from "../lib/utils";

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

interface ChatInterfaceProps {
  className?: string;
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  title?: string;
  loading?: boolean;
}

const ChatInterface = ({
  className,
  messages = [],
  onSendMessage = () => {},
  title = "AI Assistant",
  loading = false,
}: ChatInterfaceProps) => {
  const [chatMessages, setChatMessages] = useState<Message[]>(messages);

  const handleSendMessage = (message: string) => {
    // Create a new user message
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: message,
      timestamp: new Date(),
    };

    // Add the new message to the chat
    const updatedMessages = [...chatMessages, newMessage];
    setChatMessages(updatedMessages);

    // Call the parent handler
    onSendMessage(message);

    // Simulate AI response (in a real app, this would come from the API)
    if (!loading) {
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          content: "I'm analyzing your request...",
          timestamp: new Date(),
        };
        setChatMessages([...updatedMessages, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full w-full bg-background relative",
        className,
      )}
    >
      <ChatHeader title={title} />
      <div className="flex-1 overflow-hidden pb-[80px]">
        <ChatMessages messages={chatMessages} />
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={loading}
          placeholder={
            loading ? "AI is thinking..." : "Type your message here..."
          }
        />
      </div>
    </div>
  );
};

export default ChatInterface;
