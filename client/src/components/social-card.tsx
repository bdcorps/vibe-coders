import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Tweet } from "react-tweet";
import { type Post, type Tag } from "@shared/schema";

interface SocialCardProps {
  post: Post;
  tags: Tag[];
}

export function SocialCard({ post, tags }: SocialCardProps) {
  const postTags = tags.filter(tag => post.tags.includes(tag.id));

  const sourceUrl = post.type === 'twitter' 
    ? `https://twitter.com/x/status/${post.embedId}`
    : `https://www.linkedin.com/feed/update/urn:li:activity:${post.embedId}`;

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
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex gap-2">
            {postTags.map(tag => (
              <Badge key={tag.id} variant="secondary">
                {tag.label}
              </Badge>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => window.open(sourceUrl, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Original Post
          </Button>
        </div>
      </div>
    </Card>
  );
}