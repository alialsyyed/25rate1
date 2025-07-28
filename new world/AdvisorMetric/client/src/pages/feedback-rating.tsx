import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { RatingFaces } from "@/components/rating-faces";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function FeedbackRating() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const [rating, setRating] = useState<number | null>(null);

  const ratingLabels = [
    t("terrible"),
    t("bad"), 
    t("okay"),
    t("good"),
    t("great")
  ];

  const handleNext = () => {
    if (rating) {
      // Store rating in session storage for next page
      sessionStorage.setItem("feedbackRating", rating.toString());
      // Add a slight delay for better UX
      setTimeout(() => {
        setLocation("/feedback/source");
      }, 500);
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
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {t("howWasExperience")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("howWasExperienceSubtitle")}
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <RatingFaces 
              rating={rating}
              onRatingChange={setRating}
              labels={ratingLabels}
            />
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setLocation("/")}
              className="flex items-center space-x-2"
            >
              {language === "ar" ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
              <span>{t("back")}</span>
            </Button>

            <Button
              onClick={handleNext}
              disabled={!rating}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
            >
              <span>{t("next")}</span>
              {language === "ar" ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
