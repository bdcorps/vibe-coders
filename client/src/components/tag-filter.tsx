import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { type Tag } from "@shared/schema";

interface TagFilterProps {
  tags: Tag[];
  selectedTags: string[];
  onTagSelect: (tagId: string) => void;
}

export function TagFilter({ tags, selectedTags, onTagSelect }: TagFilterProps) {
  return (
    <ScrollArea className="w-full mb-8">
      <div className="flex gap-2 p-4">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant={selectedTags.includes(tag.id) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90 transition-colors"
            onClick={() => onTagSelect(tag.id)}
          >
            {tag.label}
          </Badge>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}