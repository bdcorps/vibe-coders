import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { TwitterEmbed, LinkedInEmbed } from 'react-social-media-embed';
import { type Post, type Tag } from "@shared/schema";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <div className="p-4">
          <div className="mb-4">
            {post.type === 'twitter' ? (
              <TwitterEmbed url={sourceUrl} />
            ) : (
              <LinkedInEmbed url={sourceUrl} />
            )}
          </div>
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
    </motion.div>
  );
}