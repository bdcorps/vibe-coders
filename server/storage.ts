import { posts, type Post, type InsertPost, type Tag } from "@shared/schema";
import { parseSocialUrls } from "@shared/social-url-parser";

export interface IStorage {
  getPosts(): Promise<Post[]>;
  getTags(): Promise<Tag[]>;
}

export class MemStorage implements IStorage {
  private posts: Post[];
  private tags: Tag[];

  constructor() {
    this.tags = [
      { id: 'replit', label: 'Replit', category: 'technology' },
      { id: 'v0', label: 'V0', category: 'technology' },
      { id: 'lovable', label: 'Lovable', category: 'technology' },
      { id: 'saas', label: 'SaaS', category: 'industry' },
      { id: 'ecommerce', label: 'E-commerce', category: 'industry' },
      { id: 'education', label: 'Education', category: 'industry' },
      { id: 'cursor', label: 'Cursor', category: 'technology' },
      { id: 'chatgpt', label: 'ChatGPT', category: 'technology' }
    ];

    // Parse the example URLs
    const urls = [
      'https://www.linkedin.com/posts/joettaylor_built-an-seo-platform-in-7-minutes-using-activity-7300834521128525826-OVb0',
      'https://x.com/IndieJayCodes/status/1896232105711173819'
    ];

    const parsedPosts = parseSocialUrls(urls);

    this.posts = parsedPosts.map((post, index) => ({
      id: index + 1,
      type: post.platform,
      embedId: post.embedId,
      tags: index === 0 
        ? ['v0', 'saas'] // Tags for the LinkedIn post about SEO platform
        : ['replit', 'education'] // Tags for the Twitter post
    }));
  }

  async getPosts(): Promise<Post[]> {
    return this.posts;
  }

  async getTags(): Promise<Tag[]> {
    return this.tags;
  }
}

export const storage = new MemStorage();