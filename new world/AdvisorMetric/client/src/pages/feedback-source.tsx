import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Share2, Globe, Users, Megaphone, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FeedbackSource() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [comments, setComments] = useState("");
  const { toast } = useToast();

  const sources = [
    { value: "social_media", icon: Share2, label: t("socialMedia"), subtitle: t("socialMediaSubtitle") },
    { value: "website", icon: Globe, label: t("website"), subtitle: t("websiteSubtitle") },
    { value: "referral", icon: Users, label: t("referral"), subtitle: t("referralSubtitle") },
    { value: "advertisement", icon: Megaphone, label: t("advertisement"), subtitle: t("advertisementSubtitle") },
    { value: "other", icon: MoreHorizontal, label: t("other"), subtitle: t("otherSubtitle") }
  ];

  const submitFeedbackMutation = useMutation({
    mutationFn: async (data: { rating: number; source?: string; comments?: string }) => {
      const response = await apiRequest("POST", "/api/feedback", data);
      return response.json();
    },
    onSuccess: () => {
      setLocation("/feedback/success");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    const rating = parseInt(sessionStorage.getItem("feedbackRating") || "0");
    if (rating > 0) {
      submitFeedbackMutation.mutate({
        rating,
        source: selectedSource || undefined,
        comments: comments.trim() || undefined
      });
    }
  };

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 ${language === "ar" ? "font-arabic" : ""}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <LanguageToggle />
      
      <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0">
        <CardContent className="p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {t("howDidYouHear")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("howDidYouHearSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {sources.map((source) => {
              const Icon = source.icon;
              return (
                <button
                  key={source.value}
                  onClick={() => setSelectedSource(source.value)}
                  className={cn(
                    "p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 text-left",
                    selectedSource === source.value
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {source.label}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {source.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-900 dark:text-white mb-3">
              {t("additionalComments")}
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {t("additionalCommentsSubtitle")}
            </p>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder={language === "ar" ? "اكتب تعليقاتك هنا..." : "Write your comments here..."}
              className="min-h-24"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setLocation("/feedback/rating")}
              className="flex items-center space-x-2"
              disabled={submitFeedbackMutation.isPending}
            >
              {language === "ar" ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
              <span>{t("back")}</span>
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={submitFeedbackMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
            >
              <span>{submitFeedbackMutation.isPending ? "..." : t("submit")}</span>
              {!submitFeedbackMutation.isPending && (
                language === "ar" ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
