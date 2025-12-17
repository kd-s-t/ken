import Link from "next/link";
import { Button } from "@/modules/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <Button asChild>
          <Link href="/" className="text-primary hover:text-primary/90">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

