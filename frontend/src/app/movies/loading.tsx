export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="space-y-6">
        <div className="h-8 w-32 animate-pulse rounded bg-gray-200"></div>
        <div className="h-10 animate-pulse rounded bg-gray-200"></div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded bg-gray-200"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
