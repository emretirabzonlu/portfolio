import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merhaba! | Emre Tırabzonlu",
  description: "Emre Tırabzonlu — Full Stack Developer. Bağlantıya geç!",
};

export default function HiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
