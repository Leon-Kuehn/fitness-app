"use client";
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockCalendarEvents } from "@/lib/mock-data";

const typeColors: Record<string, string> = {
  strength: "#6366f1",
  cardio: "#10b981",
  rest: "#737373",
  mobility: "#f59e0b",
};

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDow = getDay(monthStart);

  const upcomingEvents = mockCalendarEvents
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#f5f5f5]">Calendar</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="rounded-lg p-1.5 hover:bg-[#242424] text-[#737373] hover:text-[#f5f5f5] transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="rounded-lg p-1.5 hover:bg-[#242424] text-[#737373] hover:text-[#f5f5f5] transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="py-1 text-center text-xs font-medium text-[#737373]">{d}</div>
            ))}
          </div>
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: startDow }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {days.map((day) => {
              const dateStr = format(day, "yyyy-MM-dd");
              const events = mockCalendarEvents.filter((e) => e.date === dateStr);
              const isToday = isSameDay(day, new Date());
              return (
                <div
                  key={dateStr}
                  className={`flex flex-col items-center py-1 rounded-lg ${isToday ? "bg-[#6366f1]/15" : ""}`}
                >
                  <span className={`text-xs ${isToday ? "text-[#6366f1] font-bold" : "text-[#737373]"}`}>
                    {format(day, "d")}
                  </span>
                  {events.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                      {events.slice(0, 2).map((e) => (
                        <div
                          key={e.id}
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: typeColors[e.type] ?? "#6366f1" }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-[#2a2a2a]">
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs text-[#737373] capitalize">{type}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length === 0 ? (
            <p className="text-sm text-[#737373]">No upcoming events</p>
          ) : (
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between py-2 border-b border-[#2a2a2a] last:border-0">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: typeColors[event.type] ?? "#6366f1" }}
                    />
                    <div>
                      <p className="text-sm font-medium text-[#f5f5f5]">{event.workoutName}</p>
                      <p className="text-xs text-[#737373]">{event.date}</p>
                    </div>
                  </div>
                  <Badge variant={event.completed ? "accent" : "default"}>
                    {event.completed ? "Done" : "Planned"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
