"use client";

interface ErrorPageProps {
  readonly error: Error;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  console.error(error);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 text-center">
      <h2 className="text-3xl font-bold text-red-600">Something went wrong</h2>
      <p className="mt-4 text-gray-700">{"We couldn't load the data. Please try again later."}</p>
    </div>
  );
}
