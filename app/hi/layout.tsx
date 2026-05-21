import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Merhaba! | Emre Tırabzonlu",
  description: "Emre Tırabzonlu — Full Stack Developer. Bağlantıya geç!",
};

export default function HiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="top-center" theme="dark" />
    </>
  );
}
