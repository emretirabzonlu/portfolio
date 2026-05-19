export default function HeroSceneFallback() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-full">
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/20 blur-3xl animate-pulse"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent/10 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </div>
  );
}
