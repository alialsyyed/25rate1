import { type FeedbackResponse, type InsertFeedbackResponse, feedbackResponses } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { desc, gte, lte, and } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  createFeedbackResponse(feedback: InsertFeedbackResponse): Promise<FeedbackResponse>;
  getAllFeedbackResponses(): Promise<FeedbackResponse[]>;
  getFeedbackResponsesByDateRange(startDate: Date, endDate: Date): Promise<FeedbackResponse[]>;
}

// Initialize database connection
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export class PostgreSQLStorage implements IStorage {
  async createFeedbackResponse(insertFeedback: InsertFeedbackResponse): Promise<FeedbackResponse> {
    const [feedback] = await db
      .insert(feedbackResponses)
      .values(insertFeedback)
      .returning();
    return feedback;
  }

  async getAllFeedbackResponses(): Promise<FeedbackResponse[]> {
    return await db
      .select()
      .from(feedbackResponses)
      .orderBy(desc(feedbackResponses.createdAt));
  }

  async getFeedbackResponsesByDateRange(startDate: Date, endDate: Date): Promise<FeedbackResponse[]> {
    return await db
      .select()
      .from(feedbackResponses)
      .where(
        and(
          gte(feedbackResponses.createdAt, startDate),
          lte(feedbackResponses.createdAt, endDate)
        )
      )
      .orderBy(desc(feedbackResponses.createdAt));
  }
}

export class MemStorage implements IStorage {
  private feedbackResponses: Map<string, FeedbackResponse>;

  constructor() {
    this.feedbackResponses = new Map();
  }

  async createFeedbackResponse(insertFeedback: InsertFeedbackResponse): Promise<FeedbackResponse> {
    const id = randomUUID();
    const feedback: FeedbackResponse = {
      ...insertFeedback,
      id,
      createdAt: new Date(),
    };
    this.feedbackResponses.set(id, feedback);
    return feedback;
  }

  async getAllFeedbackResponses(): Promise<FeedbackResponse[]> {
    return Array.from(this.feedbackResponses.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getFeedbackResponsesByDateRange(startDate: Date, endDate: Date): Promise<FeedbackResponse[]> {
    return Array.from(this.feedbackResponses.values())
      .filter(feedback => feedback.createdAt >= startDate && feedback.createdAt <= endDate)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

// Use PostgreSQL storage in production, memory storage for development
export const storage = process.env.NODE_ENV === 'production' 
  ? new PostgreSQLStorage() 
  : new PostgreSQLStorage(); // Always use PostgreSQL now that we have a database
