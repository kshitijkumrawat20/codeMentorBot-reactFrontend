import React from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Info, Settings } from "lucide-react";

interface ChatHeaderProps {
  title?: string;
  onSettingsClick?: () => void;
  onInfoClick?: () => void;
}

const ChatHeader = ({
  title = "AI Assistant",
  onSettingsClick = () => {},
  onInfoClick = () => {},
}: ChatHeaderProps) => {
  return (
    <div className="w-full h-[60px] bg-background border-b border-border flex items-center justify-between px-4 py-2">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onInfoClick}
                className="h-8 w-8"
              >
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Information about the AI assistant</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onSettingsClick}
                className="h-8 w-8"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chat settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ChatHeader;
