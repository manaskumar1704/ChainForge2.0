import Link from "next/link";
import { Button } from "../components/ui/button";
import { Hammer } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen relative z-10 flex items-center justify-center px-4">
      <div className="max-w-xl text-center space-y-6">

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-400">
          ChainForge <span className="text-blue-400">2.0</span>
        </h1>

        <p className="text-neutral-400 text-base md:text-lg">
          Cryptographically prove the existence of digital files by hashing
          locally and minting immutable proofs on Ethereum.
        </p>

        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
          >
            <Link href="/connect">
              <Hammer className="h-4 w-4" />
              Get Started
            </Link>
          </Button>
        </div>

      </div>
    </main>
  );
}
