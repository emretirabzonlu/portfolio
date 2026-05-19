"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Hakkımda", href: "#hakkimda" },
  { label: "Yetenekler", href: "#yetenekler" },
  { label: "Projeler", href: "#projeler" },
  { label: "Deneyim", href: "#deneyim" },
  { label: "İletişim", href: "#iletisim" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center text-white hover:text-accent transition-colors">
          <Logo size={36} />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Menüyü aç"
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu size={22} />
          </SheetTrigger>
          <SheetContent side="right" className="bg-card border-border w-72">
            <SheetHeader>
              <SheetTitle className="text-left text-foreground">
                Emre Tırabzonlu
              </SheetTitle>
            </SheetHeader>
            <ul className="mt-8 flex flex-col gap-6 px-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
