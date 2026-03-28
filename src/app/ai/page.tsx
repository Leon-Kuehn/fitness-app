"use client";
import { Sparkles, Brain, BarChart2, Apple, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Brain,
    title: "Plan Generation",
    description: "AI creates personalized training plans based on your goals, fitness level, and schedule.",
    color: "#6366f1",
  },
  {
    icon: BarChart2,
    title: "Workout Analysis",
    description: "Get insights on your performance trends, volume load, and recovery patterns.",
    color: "#10b981",
  },
  {
    icon: Apple,
    title: "Nutrition Advice",
    description: "Receive macro targets and meal suggestions tailored to your training and goals.",
    color: "#f59e0b",
  },
  {
    icon: TrendingUp,
    title: "Progress Insights",
    description: "Understand your body composition changes and predict future progress milestones.",
    color: "#ef4444",
  },
];

const fakeMessages = [
  { role: "assistant", text: "Hi! I am your AI fitness coach. I can help you optimize your training, nutrition, and recovery. What would you like to work on today?" },
  { role: "user", text: "Can you help me build a plan to increase my bench press?" },
  { role: "assistant", text: "Absolutely! Based on your current volume and frequency, I recommend adding one dedicated push day with progressive overload on the bench press. Start at 75% of your 1RM for 4x6, increasing weight by 5lbs every 2 sessions. Would you like me to generate the full program?" },
];

export default function AIPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f5f5f5]">AI Coach</h1>
          <p className="text-sm text-[#737373] mt-1">Your intelligent fitness companion</p>
        </div>
        <Badge variant="warning">Coming Soon</Badge>
      </div>

      {/* Hero */}
      <Card className="text-center py-8">
        <CardContent>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6366f1]/20 mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-[#6366f1]" />
          </div>
          <h2 className="text-xl font-bold text-[#f5f5f5] mb-2">Meet Your AI Coach</h2>
          <p className="text-sm text-[#737373] max-w-sm mx-auto">
            Powered by advanced machine learning, your AI coach analyzes your data to deliver personalized guidance that evolves with you.
          </p>
        </CardContent>
      </Card>

      {/* Feature Cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title}>
              <CardContent>
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <Icon className="h-4.5 w-4.5" style={{ color: feature.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#f5f5f5]">{feature.title}</p>
                    <p className="text-xs text-[#737373] mt-1">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mock Chat */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#ef4444] animate-pulse" />
            <CardTitle>Preview</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4">
            {fakeMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs rounded-2xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-[#6366f1] text-white rounded-br-sm"
                      : "bg-[#242424] text-[#f5f5f5] rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 opacity-50 pointer-events-none">
            <input
              type="text"
              placeholder="Ask your AI coach..."
              disabled
              className="flex-1 rounded-xl bg-[#242424] border border-[#2a2a2a] px-3 py-2 text-sm text-[#f5f5f5] placeholder:text-[#737373]"
            />
            <Button size="sm" disabled>Send</Button>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 p-6 text-center">
        <Sparkles className="h-6 w-6 text-[#6366f1] mx-auto mb-2" />
        <h3 className="text-base font-semibold text-[#f5f5f5] mb-1">Be the first to know</h3>
        <p className="text-sm text-[#737373] mb-4">Join the waitlist and get early access when AI Coach launches.</p>
        <Button>Join Waitlist</Button>
      </div>
    </div>
  );
}
