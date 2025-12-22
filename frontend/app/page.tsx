import Link from "next/link";
import { Button } from "../components/ui/button";
import {
  Hammer,
  ShieldCheck,
  Fingerprint,
  Link2,
  HelpCircle,
  Clock,
  Workflow,
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen relative z-10 flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl w-full text-center space-y-14">

        {/* Top CTA */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-300">
            ChainForge <span className="text-blue-400">2.0</span>
          </h1>

          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto">
            Cryptographically prove the existence of digital files using
            client-side hashing and immutable Ethereum-backed verification.
          </p>

          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              className="px-8 py-6 text-lg flex items-center gap-3 bg-orange-600 hover:bg-orange-700"
            >
              <Link href="/connect">
                <Hammer className="h-5 w-5" />
                Get Started
              </Link>
            </Button>
          </div>
        </div>

        {/* Core guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: Fingerprint,
              title: "Client-side hashing",
              desc: "Files are hashed locally in your browser. Raw data never leaves your device.",
            },
            {
              icon: ShieldCheck,
              title: "Privacy-first",
              desc: "Only cryptographic fingerprints are stored. No uploads, no exposure.",
            },
            {
              icon: Link2,
              title: "On-chain proof",
              desc: "Immutable, timestamped proof anchored on Ethereum for lifetime verification.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border border-neutral-800 bg-neutral-900/60 backdrop-blur p-5 space-y-3"
            >
              <Icon className="h-5 w-5 text-blue-400 mx-auto" />
              <h3 className="font-medium text-neutral-300">{title}</h3>
              <p className="text-sm text-neutral-400">{desc}</p>
            </div>
          ))}
        </div>

        {/* Why / When / How cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* WHY */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 backdrop-blur p-6 space-y-3">
            <div className="flex items-center gap-2 text-neutral-300">
              <HelpCircle className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold">Why</h3>
            </div>
            <p className="text-sm text-neutral-400">
              Digital files are easy to copy and dispute. ChainForge gives you
              tamper-proof, timestamped proof of existence without relying on
              centralized authorities.
            </p>
          </div>

          {/* WHEN */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 backdrop-blur p-6 space-y-3">
            <div className="flex items-center gap-2 text-neutral-300">
              <Clock className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold">When</h3>
            </div>
            <ul className="text-sm text-neutral-400 space-y-1">
              <li>• Protect creative or intellectual work</li>
              <li>• Prove document originality</li>
              <li>• Establish trust without intermediaries</li>
              <li>• Verify data integrity anytime</li>
            </ul>
          </div>

          {/* HOW */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 backdrop-blur p-6 space-y-3">
            <div className="flex items-center gap-2 text-neutral-300">
              <Workflow className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold">How</h3>
            </div>
            <ul className="text-sm text-neutral-400 space-y-1">
              <li>1. Hash your file locally</li>
              <li>2. Mint cryptographic proof</li>
              <li>3. Verify on Ethereum</li>
            </ul>
          </div>
        </div>

        {/* Bottom reassurance */}
        <p className="text-xs text-neutral-500">
          Your files never leave your device. Only cryptographic proof is stored on-chain.
        </p>
      </div>
    </main>
  );
}
