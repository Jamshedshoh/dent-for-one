import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { BottomNavigation } from "@/components/BottomNavigation";

type Message = {
  id: number;
  content: string;
};

const MOCK_MESSAGES = [
  {
    id: 1,
    content: "Hello, how are you?",
  },
];

const AiHelp = () => {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessages([...messages, { id: -1, content: input }]);
    setInput("");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Header title="AI Help" />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">AI Help</h1>
          <p className="text-sm text-muted-foreground">
            Ask me anything about your teeth and I'll help you out.
          </p>
          <div className="flex flex-col items-center justify-center">
            {/* MessageBox */}
            {messages.map((message) => (
              <div
                key={message.id}
                className="flex flex-col items-center justify-center"
              >
                <p className="text-sm text-muted-foreground">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSubmit}
            // push to bottom
            className="fixed container bottom-20 left-0 right-0"
          >
            <Input placeholder="Ask me anything about your oral health and I'll help you out." />
          </form>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default AiHelp;
