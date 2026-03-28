"use client";
import { useState } from "react";
import { Plus, ChevronDown, ChevronUp, Dumbbell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockPlans } from "@/lib/mock-data";

export default function PlansPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f5f5f5]">Training Plans</h1>
          <p className="text-sm text-[#737373] mt-1">Organize your workouts into plans</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          New Plan
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {mockPlans.map((plan) => {
          const isExpanded = expandedId === plan.id;
          return (
            <Card key={plan.id} className="cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : plan.id)}>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${plan.color}20` }}
                    >
                      <Dumbbell className="h-5 w-5" style={{ color: plan.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#f5f5f5]">{plan.name}</p>
                      <p className="text-xs text-[#737373] mt-0.5 line-clamp-2">{plan.description}</p>
                    </div>
                  </div>
                  <button className="text-[#737373] ml-2 shrink-0">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="muted">{plan.workouts.length} workouts</Badge>
                  <div className="h-1 w-1 rounded-full bg-[#2a2a2a]" />
                  <span className="text-xs text-[#737373]" style={{ color: plan.color }}>Active</span>
                </div>

                {isExpanded && (
                  <div className="mt-4 space-y-2 border-t border-[#2a2a2a] pt-4">
                    <p className="text-xs font-medium text-[#737373] uppercase tracking-wide">Workouts</p>
                    {plan.workouts.map((workout, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-lg bg-[#242424] px-3 py-2"
                      >
                        <div
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                          style={{ backgroundColor: `${plan.color}20`, color: plan.color }}
                        >
                          {i + 1}
                        </div>
                        <span className="text-sm text-[#f5f5f5]">{workout}</span>
                      </div>
                    ))}
                    <Button variant="secondary" size="sm" className="w-full mt-2">
                      Start Plan
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
