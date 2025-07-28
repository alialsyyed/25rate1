import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
      className="absolute top-4 right-4 z-10"
    >
      <Languages className="h-4 w-4 mr-2" />
      {language === "ar" ? "EN" : "عر"}
    </Button>
  );
}
