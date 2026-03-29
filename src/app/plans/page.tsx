"use client";
import { useState } from "react";
import { Plus, ChevronDown, ChevronUp, Dumbbell, Play, X, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockPlans } from "@/lib/mock-data";
import { useLanguage } from "@/contexts/LanguageContext";

const LABELS = {
  de: {
    title: "Trainingspläne",
    subtitle: "Organisiere deine Workouts in Plänen",
    newPlan: "Neuer Plan",
    workouts: "Workouts",
    active: "Aktiv",
    startPlan: "Plan starten",
    noPlans: "Noch keine Pläne",
    createFirst: "Erstelle deinen ersten Trainingsplan",
    // Modal
    createPlan: "Neuen Plan erstellen",
    planName: "Planname",
    planNamePlaceholder: "z.B. Push / Pull / Legs",
    description: "Beschreibung",
    descPlaceholder: "Kurze Beschreibung des Plans...",
    cancel: "Abbrechen",
    create: "Erstellen",
    planStarted: "Plan gestartet!",
    planCreated: "Plan erstellt!",
  },
  en: {
    title: "Training Plans",
    subtitle: "Organize your workouts into plans",
    newPlan: "New Plan",
    workouts: "workouts",
    active: "Active",
    startPlan: "Start Plan",
    noPlans: "No plans yet",
    createFirst: "Create your first training plan",
    // Modal
    createPlan: "Create New Plan",
    planName: "Plan Name",
    planNamePlaceholder: "e.g. Push / Pull / Legs",
    description: "Description",
    descPlaceholder: "Short description of the plan...",
    cancel: "Cancel",
    create: "Create",
    planStarted: "Plan started!",
    planCreated: "Plan created!",
  },
};

export default function PlansPage() {
  const { language } = useLanguage();
  const L = LABELS[language];

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [plans, setPlans] = useState(mockPlans);
  const [activePlanId, setActivePlanId] = useState<string | null>(mockPlans[0]?.id ?? null);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleStartPlan = (planId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePlanId(planId);
    showToast(L.planStarted);
  };

  const handleCreatePlan = () => {
    if (!newName.trim()) return;
    const newPlan = {
      id: `plan-${Date.now()}`,
      name: newName.trim(),
      description: newDesc.trim() || L.subtitle,
      color: "#6366f1",
      icon: "Dumbbell",
      workouts: [] as string[],
    };
    setPlans((prev) => [...prev, newPlan]);
    setNewName("");
    setNewDesc("");
    setShowModal(false);
    showToast(L.planCreated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f5f5f5]">{L.title}</h1>
          <p className="text-sm text-[#737373] mt-1">{L.subtitle}</p>
        </div>
        <Button size="sm" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4" />
          {L.newPlan}
        </Button>
      </div>

      {/* Plan Cards */}
      {plans.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Dumbbell className="h-12 w-12 text-[#737373] mb-4" />
          <p className="text-[#f5f5f5] font-medium">{L.noPlans}</p>
          <p className="text-sm text-[#737373] mt-1">{L.createFirst}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {plans.map((plan) => {
            const isExpanded = expandedId === plan.id;
            const isActive = activePlanId === plan.id;
            return (
              <Card
                key={plan.id}
                className="cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : plan.id)}
              >
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
                    <Badge variant="muted">{plan.workouts.length} {L.workouts}</Badge>
                    <div className="h-1 w-1 rounded-full bg-[#2a2a2a]" />
                    <span
                      className="text-xs"
                      style={{ color: isActive ? plan.color : "#737373" }}
                    >
                      {isActive ? `✓ ${L.active}` : L.active}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 space-y-2 border-t border-[#2a2a2a] pt-4">
                      <p className="text-xs font-medium text-[#737373] uppercase tracking-wide">{L.workouts}</p>
                      {plan.workouts.length === 0 ? (
                        <p className="text-xs text-[#737373] italic">Keine Workouts</p>
                      ) : (
                        plan.workouts.map((workout, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2a2a2a] text-xs text-[#737373]">
                              {i + 1}
                            </span>
                            <span className="text-sm text-[#f5f5f5]">{workout}</span>
                          </div>
                        ))
                      )}
                      <Button
                        size="sm"
                        className="w-full mt-2"
                        onClick={(e) => handleStartPlan(plan.id, e)}
                      >
                        <Play className="h-3.5 w-3.5 mr-1" />
                        {L.startPlan}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* New Plan Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#f5f5f5]">{L.createPlan}</h2>
              <button onClick={() => setShowModal(false)} className="text-[#737373] hover:text-[#f5f5f5]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-[#737373] mb-1 block">{L.planName}</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={L.planNamePlaceholder}
                  className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-[#f5f5f5] placeholder-[#737373] focus:outline-none focus:border-[#6366f1]"
                  onKeyDown={(e) => e.key === "Enter" && handleCreatePlan()}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#737373] mb-1 block">{L.description}</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder={L.descPlaceholder}
                  rows={3}
                  className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-[#f5f5f5] placeholder-[#737373] focus:outline-none focus:border-[#6366f1] resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>
                {L.cancel}
              </Button>
              <Button className="flex-1" onClick={handleCreatePlan} disabled={!newName.trim()}>
                <Check className="h-4 w-4 mr-1" />
                {L.create}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#6366f1] text-white text-sm font-medium rounded-xl shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
