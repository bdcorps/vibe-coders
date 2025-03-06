import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="max-w-6xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4 font-inter">
        Find MCP servers
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Discover and search for custom MCP tools to extend the Agent in Cursor's Composer feature.
      </p>
      <div className="flex justify-center gap-4">
        <Button variant="default" size="lg">
          Learn More
        </Button>
        <Button variant="outline" size="lg">
          Get Started
        </Button>
      </div>
    </header>
  );
}