import React from "react";
import CodeMentorInterface from "./CodeMentorInterface";
import { cn } from "../lib/utils";

interface HomeProps {
  className?: string;
}

const Home = ({ className }: HomeProps) => {
  return (
    <div
      className={cn("flex flex-col w-full h-screen bg-background", className)}
    >
      <header className="p-2 border-b bg-background">
        <h1 className="text-xl font-bold">Code Mentor Bot</h1>
      </header>

      <main className="flex-1 overflow-hidden">
        <CodeMentorInterface />
      </main>

      <footer className="p-1 text-center text-xs text-muted-foreground border-t">
        <p>
          © {new Date().getFullYear()} Code Mentor Bot. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
