import { type Post } from "@shared/schema";

export function filterPostsByTags(posts: Post[], selectedTags: string[]): Post[] {
  if (selectedTags.length === 0) return posts;
  return posts.filter(post => 
    selectedTags.some(tag => post.tags.includes(tag))
  );
}
