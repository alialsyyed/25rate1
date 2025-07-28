import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFeedbackResponseSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Submit feedback response
  app.post("/api/feedback", async (req, res) => {
    try {
      const validatedData = insertFeedbackResponseSchema.parse(req.body);
      const feedback = await storage.createFeedbackResponse(validatedData);
      res.json(feedback);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid feedback data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save feedback" });
      }
    }
  });

  // Get all feedback responses
  app.get("/api/feedback", async (req, res) => {
    try {
      const feedbackResponses = await storage.getAllFeedbackResponses();
      res.json(feedbackResponses);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve feedback" });
    }
  });

  // Export feedback responses as CSV
  app.get("/api/feedback/export", async (req, res) => {
    try {
      const feedbackResponses = await storage.getAllFeedbackResponses();
      
      // Generate CSV content
      const csvHeader = "ID,Rating,Source,Comments,Created At\n";
      const csvRows = feedbackResponses.map(feedback => {
        const escapedComments = (feedback.comments || "").replace(/"/g, '""');
        const escapedSource = (feedback.source || "").replace(/"/g, '""');
        return `"${feedback.id}","${feedback.rating}","${escapedSource}","${escapedComments}","${feedback.createdAt.toISOString()}"`;
      }).join("\n");
      
      const csvContent = csvHeader + csvRows;
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="feedback_responses.csv"');
      res.send(csvContent);
    } catch (error) {
      res.status(500).json({ message: "Failed to export feedback data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
