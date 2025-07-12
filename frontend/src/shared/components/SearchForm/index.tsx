"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "../Button";

interface SearchFormProps {
  readonly placeholder: string;
}

export function SearchForm({ placeholder }: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialSearch = searchParams.get("search") || "";
    if (inputRef.current) {
      inputRef.current.value = initialSearch;
    }

    setIsLoading(false);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const search = inputRef.current?.value || "";
    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }
    params.set("page", "1");

    const currentPath = window.location.pathname;

    setIsLoading(true);
    router.push(`${currentPath}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mx-auto flex max-w-md gap-2">
        <input
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          type="text"
          placeholder={placeholder}
          ref={inputRef}
          disabled={isLoading}
        />
        <Button disabled={isLoading}>
          {isLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-t-2 border-gray-600" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>
    </form>
  );
}
