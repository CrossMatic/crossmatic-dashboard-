export default function Loading() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-2xl border border-white/10 h-48 animate-pulse"
          style={{ backgroundColor: "#0d1118" }} />
      ))}
    </div>
  );
}
