import { posts, type Post, type InsertPost, type Tag } from "@shared/schema";

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
      { id: 'education', label: 'Education', category: 'industry' }
    ];

    this.posts = [
      {
        id: 1,
        type: 'twitter',
        embedId: '1767643562486153616',
        tags: ['replit', 'education']
      },
      {
        id: 2,
        type: 'twitter',
        embedId: '1767548473359192276',
        tags: ['v0', 'saas']
      },
      {
        id: 3,
        type: 'linkedin',
        embedId: '7172573389931028480',
        tags: ['lovable', 'ecommerce']
      }
    ];
  }

  async getPosts(): Promise<Post[]> {
    return this.posts;
  }

  async getTags(): Promise<Tag[]> {
    return this.tags;
  }
}

export const storage = new MemStorage();
