import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tweet } from "react-tweet";
import { type Post, type Tag } from "@shared/schema";

interface SocialCardProps {
  post: Post;
  tags: Tag[];
}

export function SocialCard({ post, tags }: SocialCardProps) {
  const postTags = tags.filter(tag => post.tags.includes(tag.id));

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        {post.type === 'twitter' ? (
          <Tweet id={post.embedId} />
        ) : (
          <iframe
            src={`https://www.linkedin.com/embed/feed/update/${post.embedId}`}
            width="100%"
            height="400"
            frameBorder="0"
            allowFullScreen
          />
        )}
        <div className="flex gap-2 mt-4">
          {postTags.map(tag => (
            <Badge key={tag.id} variant="secondary">
              {tag.label}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
