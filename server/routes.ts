import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get('/api/posts', async (_req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.get('/api/tags', async (_req, res) => {
    const tags = await storage.getTags();
    res.json(tags);
  });

  const httpServer = createServer(app);
  return httpServer;
}
