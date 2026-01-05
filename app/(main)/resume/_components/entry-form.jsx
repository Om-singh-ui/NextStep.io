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
          <Card className="transition-all duration-300 backdrop-blur-lg border rounded-2xl shadow-lg bg-card hover:border-primary/50">
            <CardHeader>
              <CardTitle className="text-card-foreground">Profile Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  {profileImage ? (
                    <motion.img
                      layoutId="profile-photo"
                      src={profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-2 border-primary shadow-md"
                      whileHover={{ scale: 1.05 }}
                    />
                  ) : (
                    <div
                      className="w-24 h-24 flex items-center justify-center rounded-full border-2 border-dashed border-border bg-accent"
                    >
                      <User className="h-8 w-8 text-muted-foreground" />
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
                      className="bg-accent border-border hover:bg-accent/80 text-card-foreground"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {profileImage ? "Change" : "Upload"}
                    </Button>
                    {profileImage && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onImageChange(null)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
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
          className="transition-all duration-300 backdrop-blur-lg border rounded-2xl shadow-lg bg-card hover:border-primary/50"
        >
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-base font-medium text-card-foreground">
              {item.title} {item.organization && `@ ${item.organization}`}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(index)}
              className="hover:bg-destructive/10 text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            {item.organization && (
              <p className="text-muted-foreground">{item.organization}</p>
            )}
            <p className="text-muted-foreground">
              {item.current
                ? `${item.startDate} - Present`
                : `${item.startDate} - ${item.endDate}`}
            </p>
            <p className="mt-2 whitespace-pre-wrap text-card-foreground">
              {item.description}
            </p>
          </CardContent>
        </motion.div>
      ))}

      {/* Add New Entry Form */}
      {isAdding ? (
        <motion.div layout>
          <Card className="transition-all duration-300 backdrop-blur-lg border rounded-2xl shadow-lg bg-card hover:border-primary/50">
            <CardHeader>
              <CardTitle className="text-card-foreground">Add {type}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder={
                    type === "Profile" ? "Full Name" : "Title / Position"
                  }
                  {...register("title")}
                />
                {type !== "Profile" && (
                  <Input
                    placeholder="Organization / Company"
                    {...register("organization")}
                  />
                )}
              </div>

              {type !== "Profile" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="month" {...register("startDate")} />
                    <Input
                      type="month"
                      {...register("endDate")}
                      disabled={current}
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
                      className="accent-primary"
                    />
                    <span className="text-sm text-card-foreground">Current {type}</span>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-card-foreground">Description</label>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handleImproveDescription}
                    disabled={isImproving || !description}
                    className="text-primary hover:text-primary/80"
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
                  className="h-32"
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
            className="w-full hover:bg-accent"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add {type}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}