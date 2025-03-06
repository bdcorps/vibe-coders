import { Header } from "@/components/header";
import { SocialCard } from "@/components/social-card";
import { TagFilter } from "@/components/tag-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { filterPostsByTags } from "@/lib/posts";
import { type Post, type Tag } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from 'react-masonry-css';

const POSTS_PER_PAGE = 9;

const breakpointColumns = {
  default: 2,
  1100: 2,
  700: 1
};

export default function Home() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);

  const { data: posts = [], isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const { data: tags = [], isLoading: tagsLoading } = useQuery<Tag[]>({
    queryKey: ["/api/tags"],
  });

  const filteredPosts = useMemo(() =>
    filterPostsByTags(posts, selectedTags),
    [posts, selectedTags]
  );

  useEffect(() => {
    const slicedPosts = filteredPosts.slice(0, page * POSTS_PER_PAGE);
    setVisiblePosts(slicedPosts);
  }, [filteredPosts, page]);

  const handleTagSelect = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
    setPage(1);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (postsLoading || tagsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-6xl mx-auto px-4">
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex gap-6 -ml-6"
            columnClassName="pl-6"
          >
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-[400px] w-full mb-6" />
              ))}
          </Masonry>
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
          className="w-full"
        >
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex gap-6 -ml-6"
            columnClassName="pl-6"
          >
            {visiblePosts.map((post) => (
              <div key={post.id} className="mb-6 rounded-lg">
                <SocialCard post={post} tags={tags} />
              </div>
            ))}
          </Masonry>
        </InfiniteScroll>
      </main>
    </div>
  );
}
