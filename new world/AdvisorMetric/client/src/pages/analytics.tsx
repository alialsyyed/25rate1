import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Users, TrendingUp, MessageSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FeedbackResponse } from "@shared/schema";

export default function Analytics() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();

  const { data: feedbackData = [], isLoading } = useQuery<FeedbackResponse[]>({
    queryKey: ['/api/feedback'],
  });

  // Calculate statistics
  const totalFeedback = feedbackData.length;
  
  const satisfactionCounts = {
    1: feedbackData.filter(f => f.rating === 1).length, // Very Poor
    2: feedbackData.filter(f => f.rating === 2).length, // Poor  
    3: feedbackData.filter(f => f.rating === 3).length, // Fair
    4: feedbackData.filter(f => f.rating === 4).length, // Good
    5: feedbackData.filter(f => f.rating === 5).length, // Excellent
  };

  const satisfactionData = [
    { name: t("veryPoor"), value: satisfactionCounts[1], rating: 1, color: "#ef4444" },
    { name: t("poor"), value: satisfactionCounts[2], rating: 2, color: "#f97316" },
    { name: t("fair"), value: satisfactionCounts[3], rating: 3, color: "#eab308" },
    { name: t("good"), value: satisfactionCounts[4], rating: 4, color: "#22c55e" },
    { name: t("excellent"), value: satisfactionCounts[5], rating: 5, color: "#059669" },
  ].filter(item => item.value > 0);

  // Calculate source statistics
  const sourceCounts = feedbackData.reduce((acc: Record<string, number>, feedback) => {
    if (feedback.source) {
      acc[feedback.source] = (acc[feedback.source] || 0) + 1;
    }
    return acc;
  }, {});

  const sourceLabels: Record<string, string> = {
    'social_media': t("socialMediaFull"),
    'website': t("websiteFull"),
    'referral': t("referralFull"),
    'advertisement': t("advertisementFull"),
    'other': t("otherFull")
  };

  const sourceData = Object.entries(sourceCounts).map(([key, value]) => ({
    name: sourceLabels[key] || key,
    value: value,
    color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
  }));

  const barChartData = satisfactionData.map(item => ({
    name: item.name,
    count: item.value,
    percentage: totalFeedback > 0 ? Math.round((item.value / totalFeedback) * 100) : 0
  }));

  if (isLoading) {
    return (
      <div 
        className={`min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 ${language === "ar" ? "font-arabic" : ""}`}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4",
        language === "ar" ? "font-arabic" : ""
      )}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          onClick={() => setLocation("/")}
          className="flex items-center space-x-2"
        >
          {language === "ar" ? <ArrowLeft className="h-4 w-4 rotate-180" /> : <ArrowLeft className="h-4 w-4" />}
          <span>{t("back")}</span>
        </Button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("analytics")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t("analyticsSubtitle")}
          </p>
        </div>
        
        <div className="w-24"></div> {/* Spacer */}
      </div>

      {totalFeedback === 0 ? (
        <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0">
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t("noFeedbackYet")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t("noFeedbackYetSubtitle")}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("totalFeedback")}
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalFeedback}</div>
                <p className="text-xs text-muted-foreground">
                  {t("totalFeedbackSubtitle")}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("excellent")}
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {satisfactionCounts[5]}
                </div>
                <p className="text-xs text-muted-foreground">
                  {totalFeedback > 0 ? Math.round((satisfactionCounts[5] / totalFeedback) * 100) : 0}% of total
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Rating
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalFeedback > 0 ? 
                    (feedbackData.reduce((acc, f) => acc + f.rating, 0) / totalFeedback).toFixed(1) 
                    : '0.0'
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  Out of 5.0
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Satisfaction Bar Chart */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>{t("satisfactionBreakdown")}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t("satisfactionBreakdownSubtitle")}
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Source Pie Chart */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>{t("sourceBreakdown")}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t("sourceBreakdownSubtitle")}
                </p>
              </CardHeader>
              <CardContent>
                {sourceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-gray-500">
                    No source data available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Detailed Table */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="grid gap-4">
                  {feedbackData.slice(0, 10).map((feedback) => (
                    <div key={feedback.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={cn(
                          "w-3 h-3 rounded-full",
                          feedback.rating === 5 ? "bg-green-500" :
                          feedback.rating === 4 ? "bg-lime-500" :
                          feedback.rating === 3 ? "bg-yellow-500" :
                          feedback.rating === 2 ? "bg-orange-500" : "bg-red-500"
                        )}></div>
                        <div>
                          <p className="font-medium">
                            Rating: {feedback.rating}/5
                          </p>
                          {feedback.source && (
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Source: {sourceLabels[feedback.source] || feedback.source}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}