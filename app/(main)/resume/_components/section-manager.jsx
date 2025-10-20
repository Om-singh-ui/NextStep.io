// components/resume/section-manager.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { GripVertical, Eye, EyeOff, Settings2 } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  arrayMove,
} from "@dnd-kit/core";
import {
  arrayMove as sortableArrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const sections = [
  { id: "summary", title: "Professional Summary", enabled: true, required: true },
  { id: "experience", title: "Work Experience", enabled: true, required: true },
  { id: "education", title: "Education", enabled: true, required: true },
  { id: "skills", title: "Skills", enabled: true, required: false },
  { id: "projects", title: "Projects", enabled: true, required: false },
  { id: "certifications", title: "Certifications", enabled: false, required: false },
  { id: "languages", title: "Languages", enabled: false, required: false },
  { id: "awards", title: "Awards", enabled: false, required: false },
];

function SortableSection({ section, onToggle }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
        section.enabled
          ? "bg-white border-gray-200 shadow-sm"
          : "bg-gray-50/50 border-gray-100"
      } ${isDragging ? "shadow-lg ring-2 ring-blue-200" : ""}`}
    >
      <div className="flex items-center gap-3 flex-1">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors"
        >
          <GripVertical className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-medium ${section.enabled ? "text-gray-900" : "text-gray-500"}`}>
              {section.title}
            </h3>
            {section.required && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                Required
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {section.enabled ? "Visible on resume" : "Hidden from resume"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Switch
          checked={section.enabled}
          onCheckedChange={(checked) => onToggle(section.id, checked)}
        />
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
          <Settings2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function SectionManager({ onSectionsChange }) {
  const [enabledSections, setEnabledSections] = useState(sections);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = enabledSections.findIndex((item) => item.id === active.id);
      const newIndex = enabledSections.findIndex((item) => item.id === over.id);

      const newSections = sortableArrayMove(enabledSections, oldIndex, newIndex);
      setEnabledSections(newSections);
      onSectionsChange(newSections);
    }
  };

  const handleToggle = (sectionId, enabled) => {
    const newSections = enabledSections.map((section) =>
      section.id === sectionId ? { ...section, enabled } : section
    );
    setEnabledSections(newSections);
    onSectionsChange(newSections);
  };

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-purple-50/50 border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <GripVertical className="h-5 w-5" />
          Section Manager
        </CardTitle>
        <p className="text-sm text-gray-600">
          Drag to reorder and toggle sections visibility
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={enabledSections.map(s => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {enabledSections.map((section) => (
                <SortableSection
                  key={section.id}
                  section={section}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}