import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { useLocation } from "wouter";
import { Star, MessageCircle, BarChart3 } from "lucide-react";
import logoPath from "@assets/logo_25_1753675354587.png";

export default function FeedbackHome() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();

  return (
    <div 
      className={cn(
        "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4",
        language === "ar" ? "font-arabic" : ""
      )}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <LanguageToggle />
      
      {/* Stats Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLocation("/analytics")}
        className="absolute top-4 left-4 z-10 p-3 hover:bg-blue-100 dark:hover:bg-blue-900/20"
        title={t("analytics")}
      >
        <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      </Button>
      
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0">
        <CardContent className="p-12 text-center">
          <div className="mb-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img 
                src={logoPath} 
                alt="Logo" 
                className="h-24 w-auto object-contain"
              />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {t("welcome")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t("welcomeSubtitle")}
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-300 mb-2">
                {t("feedbackTitle")}
              </h2>
              <p className="text-blue-700 dark:text-blue-400">
                {t("feedbackSubtitle")}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setLocation("/feedback/rating")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Star className="h-6 w-6 mr-3" />
            <div className="flex flex-col items-start">
              <span className="font-semibold">{t("startFeedback")}</span>
              <span className="text-sm opacity-90">{t("startFeedbackSubtitle")}</span>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
