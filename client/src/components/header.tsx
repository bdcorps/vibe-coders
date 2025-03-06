import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="max-w-6xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">
        there's a new way to build software... with{" "}
        <span className="inline-block animate-bounce text-primary">vibes</span>
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        A handpicked gallery of outstanding no-code projects, curated daily.
      </p>
      <div className="flex justify-center gap-4">
        <Button variant="default" size="lg">
          Get Updates
        </Button>
        <Button variant="outline" size="lg">
          Submit Your Build
        </Button>
      </div>
    </header>
  );
}