import Link from "next/link";
import { Button } from "@/shared/components/Button";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h2 className="mb-4 text-4xl font-bold text-foreground">Welcome to CineVault</h2>
        <p className="mb-8 text-xl text-secondary-foreground">Discover and explore your favorite movies and actors</p>
        <div className="flex justify-center space-x-4">
          <Link href="/movies">
            <Button>Browse Movies</Button>
          </Link>
          <Link href="/actors">
            <Button>Browse Actors</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
