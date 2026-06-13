"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Paperclip,
  Mic,
  Image,
  Sparkles,
  Bot,
  User,
  MoreVertical,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Download,
  Share2,
  Settings,
  Plus,
  MessageSquare,
  Folder,
  Search,
  ChevronDown,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  model?: string;
  timestamp: Date;
  isStreaming?: boolean;
}

const models = [
  { id: "gpt-5", name: "GPT-5", provider: "OpenAI", icon: "🧠" },
  { id: "claude-4", name: "Claude 4", provider: "Anthropic", icon: "🎯" },
  { id: "gemini-2", name: "Gemini 2.0", provider: "Google", icon: "✨" },
  { id: "deepseek-v3", name: "DeepSeek V3", provider: "DeepSeek", icon: "🔍" },
  { id: "grok-2", name: "Grok 2", provider: "xAI", icon: "🚀" },
];

const chatHistory = [
  { id: "1", title: "Code optimization discussion", date: "Today", pinned: true },
  { id: "2", title: "React component patterns", date: "Today", pinned: false },
  { id: "3", title: "Database schema design", date: "Yesterday", pinned: false },
  { id: "4", title: "API integration guide", date: "Yesterday", pinned: false },
  { id: "5", title: "Machine learning basics", date: "3 days ago", pinned: false },
];

const folders = [
  { id: "1", name: "Work Projects", color: "#00f0ff", count: 12 },
  { id: "2", name: "Personal", color: "#b026ff", count: 8 },
  { id: "3", name: "Research", color: "#00ff88", count: 5 },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your AI assistant powered by multiple cutting-edge models. How can I help you today?",
      model: "GPT-5",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-5");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const model = models.find((m) => m.id === selectedModel);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I understand you're asking about "${input}". As ${model?.name}, I can help you with that. Let me provide a comprehensive response based on my training data and capabilities.\n\nHere's what I can tell you about this topic...`,
        model: model?.name,
        timestamp: new Date(),
        isStreaming: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-4 sm:-m-6 lg:-m-8">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-r border-white/5 bg-cyber-panel/30 flex flex-col overflow-hidden"
          >
            {/* New Chat Button */}
            <div className="p-3">
              <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm text-white hover:bg-white/10 transition-all border border-white/10 hover:border-neon-blue/30">
                <Plus className="h-4 w-4" />
                New Chat
              </button>
            </div>

            {/* Search */}
            <div className="px-3 pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search chats..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-neon-blue/30"
                />
              </div>
            </div>

            {/* Folders */}
            <div className="px-3 py-2">
              <div className="flex items-center gap-2 text-xs text-white/40 mb-2 px-2">
                <Folder className="h-3 w-3" />
                Folders
              </div>
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: folder.color }} />
                  <span className="flex-1 text-left">{folder.name}</span>
                  <span className="text-xs text-white/30">{folder.count}</span>
                </button>
              ))}
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto px-3 py-2">
              <div className="flex items-center gap-2 text-xs text-white/40 mb-2 px-2">
                <MessageSquare className="h-3 w-3" />
                Recent Chats
              </div>
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  className="w-full flex items-start gap-2 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors group text-left"
                >
                  <MessageSquare className="h-4 w-4 mt-0.5 shrink-0 text-white/30 group-hover:text-neon-blue transition-colors" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{chat.title}</div>
                    <div className="text-xs text-white/30">{chat.date}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Prompt Library */}
            <div className="p-3 border-t border-white/5">
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                <Wand2 className="h-4 w-4" />
                Prompt Library
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="h-8 w-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
            </button>
            <div>
              <h2 className="text-sm font-medium text-white">New Chat</h2>
              <p className="text-xs text-white/40">Start a conversation</p>
            </div>
          </div>

          {/* Model Selector */}
          <div className="relative">
            <button
              onClick={() => setIsModelOpen(!isModelOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-sm text-white/70 hover:text-white transition-colors"
            >
              <Sparkles className="h-4 w-4 text-neon-blue" />
              {models.find((m) => m.id === selectedModel)?.name}
              <ChevronDown className={cn("h-3 w-3 transition-transform", isModelOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isModelOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 top-full mt-2 w-56 glass rounded-xl border border-white/10 p-2 z-50"
                >
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model.id);
                        setIsModelOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                        selectedModel === model.id
                          ? "bg-neon-blue/10 text-neon-blue"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <span>{model.icon}</span>
                      <div className="text-left">
                        <div className="text-sm">{model.name}</div>
                        <div className="text-xs text-white/40">{model.provider}</div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-4", message.role === "user" && "flex-row-reverse")}
            >
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                message.role === "assistant"
                  ? "bg-neon-blue/20"
                  : "bg-neon-purple/20"
              )}>
                {message.role === "assistant" ? (
                  <Bot className="h-4 w-4 text-neon-blue" />
                ) : (
                  <User className="h-4 w-4 text-neon-purple" />
                )}
              </div>
              <div className={cn("max-w-[80%] space-y-2", message.role === "user" && "items-end")}>
                <div className={cn(
                  "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  message.role === "assistant"
                    ? "glass rounded-tl-none"
                    : "bg-neon-blue/10 rounded-tr-none border border-neon-blue/20"
                )}>
                  <p className="text-white/80 whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === "assistant" && (
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="h-7 w-7 rounded-lg glass flex items-center justify-center text-white/30 hover:text-white transition-colors">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <button className="h-7 w-7 rounded-lg glass flex items-center justify-center text-white/30 hover:text-white transition-colors">
                      <ThumbsUp className="h-3.5 w-3.5" />
                    </button>
                    <button className="h-7 w-7 rounded-lg glass flex items-center justify-center text-white/30 hover:text-white transition-colors">
                      <ThumbsDown className="h-3.5 w-3.5" />
                    </button>
                    <button className="h-7 w-7 rounded-lg glass flex items-center justify-center text-white/30 hover:text-white transition-colors">
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="h-8 w-8 rounded-full bg-neon-blue/20 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-neon-blue animate-pulse" />
              </div>
              <div className="glass rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-neon-blue/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 rounded-full bg-neon-blue/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 rounded-full bg-neon-blue/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message X7 AI..."
                rows={1}
                className="w-full rounded-xl bg-cyber-panel/50 border border-white/10 px-4 py-3 pr-32 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-neon-blue/30 focus:ring-1 focus:ring-neon-blue/20 resize-none transition-all min-h-[48px] max-h-[200px]"
                style={{ height: "auto" }}
              />
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                <button className="h-8 w-8 rounded-lg glass flex items-center justify-center text-white/30 hover:text-white transition-colors">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button className="h-8 w-8 rounded-lg glass flex items-center justify-center text-white/30 hover:text-white transition-colors">
                  <Image className="h-4 w-4" />
                </button>
                <button className="h-8 w-8 rounded-lg glass flex items-center justify-center text-white/30 hover:text-white transition-colors">
                  <Mic className="h-4 w-4" />
                </button>
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center transition-all",
                    input.trim()
                      ? "bg-neon-blue text-cyber-dark hover:bg-neon-cyan"
                      : "glass text-white/20"
                  )}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-center text-xs text-white/20 mt-2">
              X7 AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
    }
      
