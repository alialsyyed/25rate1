import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { useLocation } from "wouter";
import { CheckCircle } from "lucide-react";

export default function FeedbackSuccess() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setLocation("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setLocation]);

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 ${language === "ar" ? "font-arabic" : ""}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <LanguageToggle />
      
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0">
        <CardContent className="p-12 text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full animate-pulse">
                <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {t("thankYou")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t("thankYouSubtitle")}
            </p>
            
            <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-green-900 dark:text-green-300 mb-2">
                {t("feedbackReceived")}
              </h2>
              <p className="text-green-700 dark:text-green-400">
                {t("feedbackReceivedSubtitle")}
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4">
              <p className="text-blue-900 dark:text-blue-300 font-medium">
                {t("returningToHome")} {countdown} {t("seconds")}
              </p>
              <p className="text-blue-700 dark:text-blue-400 text-sm mt-1">
                {t("returningToHomeSubtitle")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
