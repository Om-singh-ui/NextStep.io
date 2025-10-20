"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { entrySchema } from "@/app/lib/schema";
import { Sparkles, PlusCircle, X, Loader2, Upload, User } from "lucide-react";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { improveWithAI } from "@/actions/resume";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = parse(dateString, "yyyy-MM", new Date());
    return format(date, "MMM yyyy");
  } catch {
    return dateString;
  }
};

export function EntryForm({
  type,
  entries,
  onChange,
  onImageChange,
  profileImage,
  darkMode = false,
  onImproveWithAI,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const { loading: isImproving } = useFetch(improveWithAI);
  const current = watch("current");
  const description = watch("description");

  // --- File Upload ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => onImageChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleAdd = handleValidation((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "" : formatDisplayDate(data.endDate),
    };
    onChange([...entries, formattedEntry]);
    reset();
    setIsAdding(false);
  });

  const handleDelete = (index) =>
    onChange(entries.filter((_, i) => i !== index));

  const handleImproveDescription = async () => {
    if (!description) {
      toast.error("Please enter a description first");
      return;
    }

    const improved = await onImproveWithAI(type.toLowerCase(), description);
    if (improved) setValue("description", improved);
  };

  const baseCard =
    "transition-all duration-300 backdrop-blur-lg border rounded-2xl shadow-lg";
  const cardClass = darkMode
    ? `${baseCard} bg-gray-800/80 border-gray-700 text-white hover:border-blue-500/60`
    : `${baseCard} bg-white/70 border-gray-200 hover:border-blue-300`;

  const inputClass = darkMode
    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
    : "bg-white border-gray-300 focus:ring-2 focus:ring-blue-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Profile Image Section */}
      {type === "Profile" && (
        <motion.div layout>
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle>Profile Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  {profileImage ? (
                    <motion.img
                      layoutId="profile-photo"
                      src={profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-2 border-blue-400 shadow-md"
                      whileHover={{ scale: 1.05 }}
                    />
                  ) : (
                    <div
                      className={`w-24 h-24 flex items-center justify-center rounded-full border-2 border-dashed ${
                        darkMode
                          ? "border-gray-600 bg-gray-700"
                          : "border-gray-300 bg-gray-100"
                      }`}
                    >
                      <User className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={triggerFileInput}
                      variant="outline"
                      className={
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                          : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                      }
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {profileImage ? "Change" : "Upload"}
                    </Button>
                    {profileImage && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onImageChange(null)}
                        className="text-red-500 hover:bg-red-100"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Recommended: Square JPG/PNG, max 2MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Existing Entries */}
      {entries.map((item, index) => (
        <motion.div
          key={index}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cardClass}
        >
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-base font-medium">
              {item.title} {item.organization && `@ ${item.organization}`}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(index)}
              className="hover:bg-red-100 text-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            {item.organization && (
              <p className="opacity-80">{item.organization}</p>
            )}
            <p className="opacity-70">
              {item.current
                ? `${item.startDate} - Present`
                : `${item.startDate} - ${item.endDate}`}
            </p>
            <p className="mt-2 whitespace-pre-wrap opacity-90">
              {item.description}
            </p>
          </CardContent>
        </motion.div>
      ))}

      {/* Add New Entry Form */}
      {isAdding ? (
        <motion.div layout>
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle>Add {type}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder={
                    type === "Profile" ? "Full Name" : "Title / Position"
                  }
                  {...register("title")}
                  className={inputClass}
                />
                {type !== "Profile" && (
                  <Input
                    placeholder="Organization / Company"
                    {...register("organization")}
                    className={inputClass}
                  />
                )}
              </div>

              {type !== "Profile" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="month" {...register("startDate")} className={inputClass} />
                    <Input
                      type="month"
                      {...register("endDate")}
                      disabled={current}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("current")}
                      onChange={(e) => {
                        setValue("current", e.target.checked);
                        if (e.target.checked) setValue("endDate", "");
                      }}
                      className={darkMode ? "accent-blue-500" : ""}
                    />
                    <span className="text-sm">Current {type}</span>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm">Description</label>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handleImproveDescription}
                    disabled={isImproving || !description}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    {isImproving ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Improving...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI Enhance
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  {...register("description")}
                  placeholder={`Describe your ${type.toLowerCase()}...`}
                  className={`h-32 ${inputClass}`}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  reset();
                  setIsAdding(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAdd}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ) : (
        <motion.div layout>
          <Button
            variant="outline"
            onClick={() => setIsAdding(true)}
            className={`w-full ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                : "hover:bg-blue-50"
            }`}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add {type}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
