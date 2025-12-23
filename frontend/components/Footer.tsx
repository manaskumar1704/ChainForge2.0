import Link from "next/link";
import { Mail, Github, Linkedin, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 flex justify-center">
      <div className="flex items-center gap-6 text-neutral-500">

        <Link
          href="mailto:manaskumar1704@email.com"
          className="hover:text-blue-400 transition"
          aria-label="Email"
        >
          <Mail className="h-5 w-5" />
        </Link>

        <Link
          href="https://github.com/manaskumar1704"
          target="_blank"
          className="hover:text-blue-400 transition"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </Link>

        <Link
          href="https://www.linkedin.com/in/manas-kumar-372193322/"
          target="_blank"
          className="hover:text-blue-400 transition"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </Link>

        <Link
          href="https://your-resume-site.com"
          target="_blank"
          className="hover:text-blue-400 transition"
          aria-label="Resume"
        >
          <FileText className="h-5 w-5" />
        </Link>

      </div>
    </footer>
  );
}
