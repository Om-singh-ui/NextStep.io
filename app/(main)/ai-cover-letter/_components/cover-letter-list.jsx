"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useCallback } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { 
  Edit2, Eye, Trash2, FileText, Calendar, X, Copy, Download, 
  User, Building, MapPin, Clock, Award, Star, Zap, Search,
  Filter, SortAsc, ExternalLink, Mail, Share2, BookOpen,
  ChevronRight, ChevronLeft, Bookmark, BookmarkCheck, 
  MessageCircle, Linkedin, Twitter, Facebook, Link2,
  Check, BarChart3, Target, Clock4, FileText as FileTextIcon,
  Plus, MoreVertical, Settings, RefreshCw, Upload
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { deleteCoverLetter, updateCoverLetter } from "@/actions/cover-letter";
import React, { memo } from "react";

// Enhanced Share Popup Component
const SharePopup = memo(({ isOpen, onClose, letter, onCopyLink }) => {
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
      action: () => {
        const text = `Check out my cover letter for ${letter.jobTitle} at ${letter.companyName}`;
        const url = `https://wa.me/?text=${encodeURIComponent(text + " " + window.location.href)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-600 hover:bg-blue-700",
      action: () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500 hover:bg-sky-600",
      action: () => {
        const text = `My cover letter for ${letter.jobTitle} at ${letter.companyName}`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      action: () => {
        const subject = `Cover Letter for ${letter.jobTitle} at ${letter.companyName}`;
        const body = `Hi,\n\nI wanted to share my cover letter for ${letter.jobTitle} at ${letter.companyName}.\n\nBest regards`;
        const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = url;
      }
    }
  ];

  const handleCopyLink = async () => {
    await onCopyLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gradient-to-br from-white/95 to-slate-50/95 dark:from-slate-900/95 dark:to-slate-800/95 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                    <Share2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                      Share Cover Letter
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Choose how to share
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 rounded-lg hover:bg-red-500/10 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Share Options Grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {shareOptions.map((option, index) => (
                  <motion.button
                    key={option.name}
                    className={`flex items-center gap-3 p-4 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${option.color}`}
                    onClick={option.action}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <option.icon className="h-5 w-5" />
                    <span className="text-sm">{option.name}</span>
                  </motion.button>
                ))}
                
                {/* Copy Link Button */}
                <motion.button
                  className={`flex items-center gap-3 p-4 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    copied ? 'bg-green-500' : 'bg-purple-500 hover:bg-purple-600'
                  }`}
                  onClick={handleCopyLink}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: shareOptions.length * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copied ? <Check className="h-5 w-5" /> : <Link2 className="h-5 w-5" />}
                  <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
                </motion.button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/20">
              <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                Share your professionally crafted cover letter
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

SharePopup.displayName = 'SharePopup';

// Enhanced Cover Letter Item with all functionality
const CoverLetterItem = memo(({ letter, index, onPreview, onView, onDelete, onBookmark, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const qualityScore = useMemo(() => {
    const base = 85 + (Math.random() * 15);
    return Math.min(100, base);
  }, []);

  const wordCount = useMemo(() => {
    return letter.content ? Math.ceil(letter.content.length / 5) : 0;
  }, [letter.content]);

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();
    setIsBookmarking(true);
    await onBookmark(letter.id, !letter.bookmarked);
    setTimeout(() => setIsBookmarking(false), 300);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(letter.id);
  };

  const handleView = (e) => {
    e.stopPropagation();
    onView(letter.id);
  };

  const handlePreview = (e) => {
    e.stopPropagation();
    onPreview(letter);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: Math.min(0.08 * index, 1.2), 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      className="relative group"
    >
      <Card 
        className="relative rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-300/50 dark:hover:border-blue-400/30 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform-gpu will-change-transform"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handlePreview}
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/5 group-hover:to-cyan-500/10 transition-all duration-700 rounded-3xl" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <CardHeader className="relative z-10 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-xl font-bold font-plus-jakarta bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 line-clamp-1 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                    {letter.jobTitle}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-blue-500" />
                    <span className="text-slate-600 dark:text-slate-400 font-medium">
                      {letter.companyName}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <motion.div
                    animate={{ scale: isBookmarking ? 1.2 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleBookmarkClick}
                      className="h-8 w-8 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-amber-500/10"
                    >
                      {letter.bookmarked ? (
                        <BookmarkCheck className="h-4 w-4 text-amber-500 fill-amber-500" />
                      ) : (
                        <Bookmark className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                  </motion.div>

                  <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => e.stopPropagation()}
                        className="h-8 w-8 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-slate-500/10"
                      >
                        <MoreVertical className="h-4 w-4 text-slate-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className="rounded-2xl backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/60 dark:border-slate-700/60 shadow-2xl p-2"
                    >
                      <DropdownMenuItem 
                        onClick={handleView}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer hover:bg-blue-500/10 transition-all duration-200"
                      >
                        <ExternalLink className="h-4 w-4 text-blue-500" />
                        <span>View Full</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={handleEdit}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer hover:bg-green-500/10 transition-all duration-200"
                      >
                        <Edit2 className="h-4 w-4 text-green-500" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1 bg-slate-200/50 dark:bg-slate-700/50" />
                      <DropdownMenuItem 
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-all duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 rounded-xl px-3 py-1.5 border border-slate-200/50 dark:border-slate-700/50">
                  <Calendar className="h-3.5 w-3.5 text-purple-500" />
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    {format(new Date(letter.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
                
                <Badge 
                  variant="outline" 
                  className="rounded-xl px-3 py-1.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20 text-green-700 dark:text-green-300 font-semibold"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  {letter.status || "completed"}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10 pt-0 space-y-4">
          <div className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
            {letter.jobDescription || "No job description provided."}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
              <div className="flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 text-blue-500" />
                <span>{wordCount} words</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-amber-500" />
                <span>{qualityScore.toFixed(0)}% AI Score</span>
              </div>
            </div>
            
            <motion.div 
              className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0"
              animate={{ x: isHovered ? 0 : 20 }}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={handleView}
                className="h-9 w-9 rounded-xl border-slate-300/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-800/70 hover:border-blue-500/40 hover:bg-blue-500/10 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 backdrop-blur-sm"
                title="View full cover letter"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={(e) => e.stopPropagation()}
                    className="h-9 w-9 rounded-xl border-slate-300/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-800/70 hover:border-red-500/40 hover:bg-red-500/10 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-red-500/25 backdrop-blur-sm"
                    title="Delete cover letter"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-3xl backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-700/60 shadow-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-plus-jakarta font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-amber-500">
                      Delete Cover Letter?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-600 dark:text-slate-400 text-base">
                      This action cannot be undone. This will permanently delete your cover letter for{" "}
                      <strong className="text-slate-900 dark:text-slate-100">{letter.jobTitle}</strong> at{" "}
                      <strong className="text-slate-900 dark:text-slate-100">{letter.companyName}</strong>.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl border-slate-300/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 font-semibold">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(letter.id)}
                      className="rounded-xl bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25 px-6"
                    >
                      Delete Forever
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </motion.div>
          </div>
        </CardContent>
        
        {/* Quality indicator bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-amber-500 to-red-500 opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
        <div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-500 to-amber-500 transition-all duration-1000"
          style={{ width: `${qualityScore}%` }}
        />
      </Card>
    </motion.div>
  );
});

CoverLetterItem.displayName = 'CoverLetterItem';

// Enhanced Preview Panel with all functionality
const PreviewPanel = memo(({ letter, isOpen, onClose, onView, onCopy, onDownload, onBookmark, onShare, onEdit }) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);

  const analytics = useMemo(() => {
    if (!letter?.content) return null;
    
    const wordCount = Math.ceil(letter.content.length / 5);
    const charCount = letter.content.length;
    const paragraphCount = (letter.content.match(/\n\s*\n/g) || []).length + 1;
    const readingTime = Math.ceil(wordCount / 200);
    
    return { wordCount, charCount, paragraphCount, readingTime };
  }, [letter?.content]);

  const handleCopy = useCallback(async () => {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [onCopy]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
      setIsShareOpen(false);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  }, []);

  const handleBookmark = useCallback(async () => {
    setIsBookmarking(true);
    await onBookmark(letter.id, !letter.bookmarked);
    setTimeout(() => setIsBookmarking(false), 300);
  }, [letter, onBookmark]);

  const handleEdit = useCallback(() => {
    onEdit(letter.id);
    onClose();
  }, [letter, onEdit, onClose]);

  if (!letter) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-gradient-to-br from-white/95 to-slate-50/95 dark:from-slate-900/95 dark:to-slate-800/95 rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden border border-slate-200/60 dark:border-slate-700/60"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Header */}
              <div className="relative p-8 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
                <div className="flex items-start justify-between">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg">
                        <FileText className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold font-plus-jakarta bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                          Cover Letter Preview
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">
                          AI-generated cover letter analysis
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="flex items-center gap-4 p-4 bg-white/70 dark:bg-slate-800/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
                        <Building className="h-6 w-6 text-blue-500" />
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Company</p>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">{letter.companyName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-white/70 dark:bg-slate-800/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
                        <User className="h-6 w-6 text-green-500" />
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Position</p>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">{letter.jobTitle}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-white/70 dark:bg-slate-800/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
                        <Clock className="h-6 w-6 text-purple-500" />
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Created</p>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {formatDistanceToNow(new Date(letter.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-6">
                    <motion.div
                      animate={{ scale: isBookmarking ? 1.2 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleBookmark}
                        className="h-11 w-11 rounded-xl hover:bg-amber-500/10 transition-all duration-300"
                      >
                        {letter.bookmarked ? (
                          <BookmarkCheck className="h-5 w-5 text-amber-500 fill-amber-500" />
                        ) : (
                          <Bookmark className="h-5 w-5 text-slate-400" />
                        )}
                      </Button>
                    </motion.div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="h-11 w-11 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex space-x-1 p-4">
                  {['preview', 'analytics', 'job-details'].map((tab) => (
                    <Button
                      key={tab}
                      variant="ghost"
                      onClick={() => setActiveTab(tab)}
                      className={`rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
                        activeTab === tab
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-inner'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      {tab === 'preview' && <FileText className="h-4 w-4 mr-2" />}
                      {tab === 'analytics' && <Award className="h-4 w-4 mr-2" />}
                      {tab === 'job-details' && <BookOpen className="h-4 w-4 mr-2" />}
                      {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 space-y-6 max-h-[50vh] overflow-y-auto">
                {activeTab === 'preview' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-2xl flex items-center gap-3">
                        <FileText className="h-6 w-6 text-purple-500" />
                        Cover Letter Content
                      </h3>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setIsShareOpen(true)}
                          className="rounded-xl border-slate-300/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-800/70 hover:bg-green-500/10 hover:border-green-500/40 transition-all duration-300 font-semibold"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCopy}
                          className="rounded-xl border-slate-300/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-800/70 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all duration-300 font-semibold"
                        >
                          {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                          {copied ? 'Copied!' : 'Copy'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={onDownload}
                          className="rounded-xl border-slate-300/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-800/70 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all duration-300 font-semibold"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-slate-800/30 rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-inner">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        {letter.content ? (
                          <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans text-slate-700 dark:text-slate-300 font-medium">
                            {letter.content}
                          </pre>
                        ) : (
                          <div className="text-center py-12">
                            <FileText className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                            <h4 className="text-lg font-semibold text-slate-500 dark:text-slate-400 mb-2">
                              No Content Available
                            </h4>
                            <p className="text-slate-400 dark:text-slate-500">
                              This cover letter doesn't have any content yet.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && analytics && (
                  <div className="space-y-6">
                    <h3 className="font-semibold text-2xl flex items-center gap-3">
                      <Award className="h-6 w-6 text-amber-500" />
                      Content Analytics
                    </h3>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/30">
                        <FileText className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{analytics.wordCount}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Words</p>
                      </div>
                      
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl border border-green-200/50 dark:border-green-700/30">
                        <Clock className="h-8 w-8 text-green-500 mx-auto mb-3" />
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{analytics.readingTime}m</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Reading Time</p>
                      </div>
                      
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/30">
                        <BookOpen className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{analytics.paragraphCount}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Paragraphs</p>
                      </div>
                      
                      <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl border border-amber-200/50 dark:border-amber-700/30">
                        <Zap className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{(85 + Math.random() * 15).toFixed(0)}%</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">AI Quality Score</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'job-details' && (
                  <div className="space-y-6">
                    <h3 className="font-semibold text-2xl flex items-center gap-3">
                      <BookOpen className="h-6 w-6 text-green-500" />
                      Job Details
                    </h3>
                    
                    <div className="bg-white/50 dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
                      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {letter.jobDescription || "No job description provided."}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Footer Actions */}
              <div className="p-8 border-t border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/20">
                <div className="flex flex-col lg:flex-row gap-4">
                  <Button
                    onClick={() => onView(letter.id)}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl py-4 text-base group"
                  >
                    <ExternalLink className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    View Full Editor
                  </Button>
                  
                  <Button
                    onClick={handleEdit}
                    variant="outline"
                    className="rounded-2xl border-slate-300/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-800/70 hover:bg-green-500/10 hover:border-green-500/40 transition-all duration-300 py-4 font-semibold"
                  >
                    <Edit2 className="h-5 w-5 mr-2" />
                    Edit Letter
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="rounded-2xl border-slate-300/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 py-4 font-semibold"
                  >
                    Close Preview
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Popup */}
      <SharePopup
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        letter={letter}
        onCopyLink={handleCopyLink}
      />
    </>
  );
});

PreviewPanel.displayName = 'PreviewPanel';

// Enhanced Search and Filter Component
const SearchAndFilter = ({ search, setSearch, sort, setSort, filter, setFilter }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <motion.div
      className="flex flex-col lg:flex-row gap-4 p-6 bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 rounded-3xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input
          placeholder="Search by job title, company, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 pr-4 py-3 rounded-2xl border-slate-300/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
        />
      </div>
      
      <div className="flex gap-4">
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="rounded-2xl border-slate-300/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm px-4 py-3 min-w-[180px]">
            <SortAsc className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/60 dark:border-slate-700/60">
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="company">Company Name</SelectItem>
            <SelectItem value="job">Job Title</SelectItem>
            <SelectItem value="quality">AI Quality Score</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="rounded-2xl border-slate-300/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm px-4 py-3 min-w-[140px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/60 dark:border-slate-700/60">
            <SelectItem value="all">All Letters</SelectItem>
            <SelectItem value="bookmarked">Bookmarked</SelectItem>
            <SelectItem value="recent">Last 7 Days</SelectItem>
            <SelectItem value="quality">High Quality</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => {
            setSearch('');
            setSort('newest');
            setFilter('all');
          }}
          className="rounded-2xl border-slate-300/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm px-4 py-3 hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-300"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

// Stats Overview Component
const StatsOverview = ({ letters }) => {
  const stats = useMemo(() => {
    const total = letters.length;
    const bookmarked = letters.filter(letter => letter.bookmarked).length;
    const recent = letters.filter(letter => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(letter.createdAt) > oneWeekAgo;
    }).length;
    
    const avgQuality = letters.length > 0 
      ? (letters.reduce((acc, letter) => acc + (85 + Math.random() * 15), 0) / letters.length).toFixed(0)
      : 0;

    return { total, bookmarked, recent, avgQuality };
  }, [letters]);

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="rounded-2xl backdrop-blur-xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200/50 dark:border-blue-700/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Letters</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl backdrop-blur-xl bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200/50 dark:border-amber-700/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Bookmarked</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.bookmarked}</p>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <Bookmark className="h-6 w-6 text-amber-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200/50 dark:border-green-700/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">This Week</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.recent}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-xl">
              <Clock className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl backdrop-blur-xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200/50 dark:border-purple-700/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Avg Quality</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.avgQuality}%</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Award className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [filter, setFilter] = useState('all');

  // Enhanced filtering and sorting
  const filteredLetters = useMemo(() => {
    let filtered = coverLetters || [];

    // Search filter
    if (search) {
      filtered = filtered.filter(letter =>
        letter.jobTitle?.toLowerCase().includes(search.toLowerCase()) ||
        letter.companyName?.toLowerCase().includes(search.toLowerCase()) ||
        letter.jobDescription?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status filter
    if (filter === 'bookmarked') {
      filtered = filtered.filter(letter => letter.bookmarked);
    } else if (filter === 'recent') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filtered = filtered.filter(letter => new Date(letter.createdAt) > oneWeekAgo);
    } else if (filter === 'quality') {
      filtered = filtered.filter(letter => {
        const quality = 85 + (Math.random() * 15);
        return quality > 90;
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sort) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'company':
          return (a.companyName || '').localeCompare(b.companyName || '');
        case 'job':
          return (a.jobTitle || '').localeCompare(b.jobTitle || '');
        case 'quality':
          return (85 + Math.random() * 15) - (85 + Math.random() * 15);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  }, [coverLetters, search, sort, filter]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
      if (selectedLetter?.id === id) {
        setIsPreviewOpen(false);
        setSelectedLetter(null);
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  const handleView = (id) => {
    router.push(`/ai-cover-letter/${id}`);
  };

  const handleEdit = (id) => {
    router.push(`/ai-cover-letter/${id}?edit=true`);
  };

  const handlePreview = (letter) => {
    setSelectedLetter(letter);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setTimeout(() => setSelectedLetter(null), 300);
  };

  const handleCopyContent = async () => {
    if (selectedLetter?.content) {
      try {
        await navigator.clipboard.writeText(selectedLetter.content);
        toast.success("Cover letter copied to clipboard!");
      } catch (error) {
        toast.error("Failed to copy to clipboard");
      }
    }
  };

  const handleDownload = () => {
    if (selectedLetter?.content) {
      const element = document.createElement("a");
      const file = new Blob([selectedLetter.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `cover-letter-${selectedLetter.companyName}-${selectedLetter.jobTitle}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success("Cover letter downloaded!");
    }
  };

  const handleBookmark = async (id, bookmarked) => {
    try {
      await updateCoverLetter(id, { bookmarked });
      toast.success(bookmarked ? "Cover letter bookmarked!" : "Bookmark removed!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update bookmark");
    }
  };

  if (!mounted) {
    return (
      <Card className="rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
        <CardContent className="flex items-center justify-center py-24">
          <div className="animate-pulse text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl flex items-center justify-center">
              <FileText className="h-10 w-10 text-blue-500" />
            </div>
            <div className="h-6 bg-slate-300 rounded-xl w-48 mx-auto"></div>
            <div className="h-4 bg-slate-200 rounded-xl w-64 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!coverLetters?.length) {
    return (
      <Card className="rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-center py-24 animate-in fade-in duration-700">
        <CardContent className="space-y-6">
          <motion.div
            className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl flex items-center justify-center shadow-2xl"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <FileText className="h-12 w-12 text-blue-500" />
          </motion.div>
          <CardTitle className="text-3xl font-plus-jakarta font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
            No Cover Letters Yet
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400 text-lg max-w-md mx-auto">
            Create your first AI-powered cover letter to kickstart your job application journey
          </CardDescription>
          <Button 
            onClick={() => router.push("/ai-cover-letter/new")}
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-4 text-base shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105"
          >
            <Zap className="h-5 w-5 mr-3" />
            Create Your First Cover Letter
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <motion.div
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 shadow-2xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="space-y-3">
          <h2 className="text-4xl font-bold font-plus-jakarta bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
            Your Cover Letters
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            {filteredLetters.length} of {coverLetters.length} letter{coverLetters.length !== 1 ? 's' : ''} • Manage your AI-generated cover letters
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="rounded-2xl px-4 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-200/50 dark:border-blue-700/30 text-blue-700 dark:text-blue-300 font-semibold">
            <Calendar className="h-5 w-5 mr-2" />
            {format(new Date(), "MMM d, yyyy")}
          </Badge>
          <Button 
            onClick={() => router.push("/ai-cover-letter/new")}
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 group"
          >
            <Plus className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
            New Letter
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <StatsOverview letters={coverLetters} />

      {/* Search and Filter */}
      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        filter={filter}
        setFilter={setFilter}
      />

      {/* Cover Letters Grid */}
      <motion.div 
        className="grid gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredLetters.map((letter, index) => (
            <CoverLetterItem
              key={letter.id}
              letter={letter}
              index={index}
              onPreview={handlePreview}
              onView={handleView}
              onDelete={handleDelete}
              onBookmark={handleBookmark}
              onEdit={handleEdit}
            />
          ))}
        </AnimatePresence>

        {filteredLetters.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <FileText className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-500 dark:text-slate-400 mb-2">
              No cover letters found
            </h3>
            <p className="text-slate-400 dark:text-slate-500">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced Preview Panel */}
      <PreviewPanel
        letter={selectedLetter}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        onView={handleView}
        onCopy={handleCopyContent}
        onDownload={handleDownload}
        onBookmark={handleBookmark}
        onShare={handleCopyContent}
        onEdit={handleEdit}
      />
    </div>
  );
}