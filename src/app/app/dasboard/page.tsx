"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Image,
  Code2,
  Mic,
  FileText,
  Zap,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Bot,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const quickActions = [
  { label: "New Chat", icon: MessageSquare, href: "/app/chat", color: "text-neon-blue", bg: "bg-neon-blue/10" },
  { label: "Generate Image", icon: Image, href: "/app/image", color: "text-neon-purple", bg: "bg-neon-purple/10" },
  { label: "Write Code", icon: Code2, href: "/app/code", color: "text-neon-green", bg: "bg-neon-green/10" },
  { label: "Voice AI", icon: Mic, href: "/app/voice", color: "text-neon-pink", bg: "bg-neon-pink/10" },
  { label: "Analyze PDF", icon: FileText, href: "/app/pdf", color: "text-neon-cyan", bg: "bg-neon-cyan/10" },
];

const stats = [
  { label: "Total Requests", value: "12,847", change: "+23.5%", up: true, icon: Zap },
  { label: "Tokens Used", value: "2.4M", change: "+18.2%", up: true, icon: Sparkles },
  { label: "Images Generated", value: "1,234", change: "+45.1%", up: true, icon: Image },
  { label: "Avg Response Time", value: "1.2s", change: "-12.3%", up: false, icon: Clock },
];

const recentActivity = [
  { type: "chat", title: "Code optimization discussion", model: "GPT-5", time: "2 min ago", icon: MessageSquare },
  { type: "image", title: "Cyberpunk cityscape", model: "DALL-E 3", time: "15 min ago", icon: Image },
  { type: "code", title: "React component generation", model: "Claude 4", time: "1 hour ago", icon: Code2 },
  { type: "voice", title: "Voice transcription", model: "Whisper", time: "2 hours ago", icon: Mic },
  { type: "pdf", title: "Annual report analysis", model: "Gemini 2.0", time: "3 hours ago", icon: FileText },
];

const aiModels = [
  { name: "GPT-5", provider: "OpenAI", status: "online", requests: 4521, color: "bg-neon-green" },
  { name: "Claude 4", provider: "Anthropic", status: "online", requests: 3892, color: "bg-neon-orange" },
  { name: "Gemini 2.0", provider: "Google", status: "online", requests: 2156, color: "bg-neon-blue" },
  { name: "DeepSeek V3", provider: "DeepSeek", status: "online", requests: 1873, color: "bg-neon-purple" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
          Welcome back, <span className="cyber-gradient-text">User</span>
        </h1>
        <p className="text-white/50">Here&apos;s what&apos;s happening with your AI workspace today.</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
      >
        {quickActions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            className="cyber-card p-4 text-center group hover:border-neon-blue/30 transition-all"
          >
            <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center mx-auto mb-2", action.bg)}>
              <action.icon className={cn("h-5 w-5", action.color)} />
            </div>
            <span className="text-sm text-white/70 group-hover:text-white transition-colors">{action.label}</span>
          </a>
        ))}
      </motion.div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
            className="cyber-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/50">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-white/30" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className={cn(
                "flex items-center gap-1 text-xs",
                stat.up ? "text-neon-green" : "text-neon-pink"
              )}>
                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 cyber-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <a href="/app/history" className="text-sm text-neon-blue hover:text-neon-cyan transition-colors">
              View All
            </a>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-neon-blue/10 transition-colors">
                  <activity.icon className="h-5 w-5 text-white/40 group-hover:text-neon-blue transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{activity.title}</div>
                  <div className="text-xs text-white/40">{activity.model}</div>
                </div>
                <div className="text-xs text-white/30 shrink-0">{activity.time}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Models Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="cyber-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">AI Models</h2>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-xs text-white/40">All Online</span>
            </div>
          </div>
          <div className="space-y-4">
            {aiModels.map((model) => (
              <div key={model.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-2 w-2 rounded-full", model.color)} />
                    <span className="text-sm text-white">{model.name}</span>
                  </div>
                  <span className="text-xs text-white/40">{model.requests.toLocaleString()} req</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-1000", model.color)}
                    style={{ width: `${(model.requests / 5000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Usage Chart Placeholder */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <h3 className="text-sm font-medium text-white mb-3">Usage This Week</h3>
            <div className="flex items-end gap-1.5 h-24">
              {[45, 62, 38, 75, 55, 88, 72].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-neon-blue/60 to-neon-blue/20 rounded-t transition-all duration-500 hover:from-neon-blue/80 hover:to-neon-blue/40"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-white/30">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
  }
              
