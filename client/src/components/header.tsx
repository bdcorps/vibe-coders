import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="max-w-6xl mx-auto px-4 py-12 text-center h-80 flex flex-col justify-center">
      <h1 className="text-5xl font-medium mb-4 font-inter">
        Discover the coolest vibe-coded projects
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        A handpicked collection of remarkable projects built using vibes. Curated everyday.
      </p>
      <div className="flex justify-center gap-4">
        <Button variant="default" size="lg" onClick={() => {
          window.open("https://vibe-coders.beehiiv.com/subscribe", "_blank");
        }}>
          Get updates
        </Button>
        {/* <Button variant="outline" size="lg" onClick={() => {
          window.open("https://vibecoders.substack.com", "_blank");
        }}>
          Submit yours <ArrowRight className="w-4 h-4" />
        </Button> */}
      </div>
    </header>
  );
}
