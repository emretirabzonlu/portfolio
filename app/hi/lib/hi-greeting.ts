export interface GreetingData {
  message: string;
  emoji: string;
  subtitle: string;
}

export function getContextualGreeting(): GreetingData {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  const isWeekend = day === 0 || day === 6;

  if (hour >= 5 && hour < 12) {
    return {
      message: "Günaydın",
      emoji: "🌅",
      subtitle: isWeekend
        ? "Hafta sonu sabahı tanıştığımıza memnun oldum"
        : "Verimli bir güne başlangıç dilerim",
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      message: "İyi günler",
      emoji: "☀️",
      subtitle: isWeekend
        ? "Güzel bir hafta sonu geçirmen dileğiyle"
        : "Yoğun günün ortasında ayırdığın vakit için teşekkürler",
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      message: "İyi akşamlar",
      emoji: "🌆",
      subtitle: "Akşamın huzurunda buluşmak güzel",
    };
  }

  if (hour >= 21 && hour < 24) {
    return {
      message: "İyi akşamlar",
      emoji: "🌙",
      subtitle: "Akşam saatinde değerli vaktini ayırdığın için sağ ol",
    };
  }

  return {
    message: "Merhaba gece kuşu",
    emoji: "🌃",
    subtitle: "Geç saatte de olsa tanıştığımıza memnun oldum",
  };
}
