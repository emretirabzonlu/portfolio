"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Calendar, Mail, UserPlus } from "lucide-react";
import { hapticLight, hapticSuccess, playTapSound } from "../lib/hi-haptic";
import { toast } from "sonner";

const PHONE = "+905423921602";
const PHONE_WA = "905423921602";
const EMAIL = "emretirabzonlu@gmail.com";
const CALENDAR_LINK =
  "https://calendar.google.com/calendar/u/0/r/eventedit?text=Emre+ile+G%C3%B6r%C3%BC%C5%9Fme&details=NFC+karttan+olu%C5%9Fturuldu";

const VCARD = `BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Emre Tırabzonlu\r\nN:Tırabzonlu;Emre;;;\r\nTITLE:Full Stack Developer\r\nEMAIL:${EMAIL}\r\nTEL;TYPE=CELL:${PHONE}\r\nURL:https://emretirabzonlu.dev\r\nADR;TYPE=WORK:;;Kocaeli;;;;Türkiye\r\nNOTE:.NET & React Full Stack Developer\r\nEND:VCARD`;

function downloadVCard() {
  const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "emre-tirabzonlu.vcf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <motion.button
      onClick={() => {
        hapticLight();
        playTapSound();
        onClick();
      }}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-border bg-card hover:border-accent transition-all"
    >
      <div className="text-accent">{icon}</div>
      <span className="text-xs font-medium text-center leading-tight">{label}</span>
    </motion.button>
  );
}

export function HiSmartActions() {
  return (
    <div className="w-full space-y-3">
      <motion.button
        onClick={() => {
          hapticSuccess();
          playTapSound();
          downloadVCard();
          toast.success("Rehbere eklendi! 📇", { duration: 2000 });
        }}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.01 }}
        className="w-full flex items-center justify-center gap-3 p-4 bg-accent text-white rounded-2xl font-medium shadow-lg shadow-accent/20"
      >
        <UserPlus size={20} />
        <span>Rehbere Ekle</span>
      </motion.button>

      <div className="grid grid-cols-2 gap-3">
        <ActionButton
          icon={<Phone size={20} />}
          label="Ara"
          onClick={() => { window.location.href = `tel:${PHONE}`; }}
        />
        <ActionButton
          icon={<MessageCircle size={20} />}
          label="WhatsApp"
          onClick={() => { window.open(`https://wa.me/${PHONE_WA}`, "_blank"); }}
        />
        <ActionButton
          icon={<Calendar size={20} />}
          label="Toplantı"
          onClick={() => { window.open(CALENDAR_LINK, "_blank"); }}
        />
        <ActionButton
          icon={<Mail size={20} />}
          label="E-posta"
          onClick={() => { window.location.href = `mailto:${EMAIL}?subject=NFC%20Karttan%20Geliyorum`; }}
        />
      </div>
    </div>
  );
}
