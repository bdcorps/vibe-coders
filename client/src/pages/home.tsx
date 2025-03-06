import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { TagFilter } from "@/components/tag-filter";
import { SocialCard } from "@/components/social-card";
import { filterPostsByTags } from "@/lib/posts";
import { type Post, type Tag } from "@shared/schema";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "@/components/ui/skeleton";

const POSTS_PER_PAGE = 9;

export default function Home() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);

  const { data: posts = [], isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ['/api/posts']
  });

  const { data: tags = [], isLoading: tagsLoading } = useQuery<Tag[]>({
    queryKey: ['/api/tags']
  });

  const filteredPosts = filterPostsByTags(posts, selectedTags);

  useEffect(() => {
    setVisiblePosts(filteredPosts.slice(0, page * POSTS_PER_PAGE));
  }, [filteredPosts, page]);

  const handleTagSelect = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
    setPage(1);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (postsLoading || tagsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[400px] w-full" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-4">
        <TagFilter
          tags={tags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
        />
        <InfiniteScroll
          dataLength={visiblePosts.length}
          next={loadMore}
          hasMore={visiblePosts.length < filteredPosts.length}
          loader={<h4>Loading...</h4>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visiblePosts.map(post => (
            <SocialCard key={post.id} post={post} tags={tags} />
          ))}
        </InfiniteScroll>
      </main>
    </div>
  );
}
