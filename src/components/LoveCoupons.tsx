import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Sparkles, Check, MessageCircle, Heart } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';

interface Coupon {
  id: number;
  iconEmoji: string;
  title: string;
  tag: string;
  terms: string;
  color: string;
}

const COUPONS: Coupon[] = [
  {
    id: 1,
    iconEmoji: "🍦",
    title: "Late Night Ice Cream & Long Drive Pass",
    tag: "Valid: 24/7 Any Time",
    terms: "Jab bhi Khushi ka mann kare, chahe raat ke 2 baje ho. Ramzan turant tayyar hoga!",
    color: "from-pink-500/20 via-rose-100/40 to-pink-500/10 border-pink-300",
  },
  {
    id: 2,
    iconEmoji: "👑",
    title: "One Full Day of 'Sirf Khushi Ka Raaj'",
    tag: "Zero Arguments Guarantee",
    terms: "Poore ek din ke liye Ramzan bina kisi behes ke sirf 'Haan ji, jo aap kaho' bolega.",
    color: "from-amber-500/20 via-yellow-100/40 to-amber-500/10 border-amber-300",
  },
  {
    id: 3,
    iconEmoji: "🫂",
    title: "Unlimited Hugs & Pampering Pass",
    tag: "Lifetime Validity • Zero Expiry",
    terms: "Jab bhi stress ho, thakaan ho ya bas pyaar chahiye ho—unlimited hugs & forehead kisses.",
    color: "from-purple-500/20 via-pink-100/40 to-purple-500/10 border-purple-300",
  },
  {
    id: 4,
    iconEmoji: "🍕",
    title: "Khushi's Choice Special Food Date",
    tag: "100% Her Choice",
    terms: "Restaurant Khushi ka, food order Khushi ka, aur bill Ramzan ka!",
    color: "from-rose-500/20 via-red-100/40 to-rose-500/10 border-rose-300",
  },
  {
    id: 5,
    iconEmoji: "🍫",
    title: "Emergency 'Gussa Dur Karo' Treat",
    tag: "Instant Peace Maker",
    terms: "Jab bhi Khushi gussa ho, favourite chocolate + sorry hug on demand bina kisi shart ke.",
    color: "from-emerald-500/20 via-teal-100/40 to-emerald-500/10 border-emerald-300",
  },
];

export const LoveCoupons: React.FC = () => {
  const [redeemed, setRedeemed] = useState<number[]>([]);

  const handleRedeem = (coupon: Coupon) => {
    romanticAudio.playStamp();
    import('../utils/confetti').then((m) => m.triggerCelebrationConfetti());
    if (!redeemed.includes(coupon.id)) {
      setRedeemed((prev) => [...prev, coupon.id]);
    }
  };

  const getWhatsAppLink = (coupon: Coupon) => {
    const text = encodeURIComponent(
      `Hey Ramzan! ❤️ Maine aapki website se ye birthday voucher redeem kiya hai:\n\n🎟️ *${coupon.title}*\n"${coupon.terms}"\n\nAb jaldi se mera ye voucher fulfill karo! 🥰🎂✨`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-10 p-5 sm:p-8 rounded-[2.5rem] bg-gradient-to-b from-white via-[#FFF8FA] to-white border-2 border-pink-200/90 shadow-2xl relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-10 left-1/3 w-64 h-64 bg-rose-200/25 rounded-full blur-3xl pointer-events-none" />

      {/* Title */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-[#C2185B] font-mono text-xs font-bold uppercase tracking-widest shadow-xs">
          <Ticket className="w-3.5 h-3.5 text-[#E91E63]" />
          <span>Exclusive Digital Vouchers</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D6A85F]" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#291820]">
          Khushi's Birthday Love Coupons 🎟️
        </h3>
        <p className="text-xs sm:text-sm font-serif-luxury text-[#8A6875] italic max-w-md mx-auto">
          "Aapke birthday par meri taraf se 5 official vouchers. Tap karke claim karo aur jab chaho redeem karo!"
        </p>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COUPONS.map((coupon, idx) => {
          const isRedeemed = redeemed.includes(coupon.id);

          return (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`relative p-4 sm:p-5 rounded-2xl border-2 bg-gradient-to-br ${coupon.color} backdrop-blur-sm shadow-md flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-lg`}
            >
              {/* Ticket Cutout Notches */}
              <div className="absolute top-1/2 -left-3 w-5 h-5 bg-[#FFF8FA] border-r-2 border-pink-200 rounded-full transform -translate-y-1/2" />
              <div className="absolute top-1/2 -right-3 w-5 h-5 bg-[#FFF8FA] border-l-2 border-pink-200 rounded-full transform -translate-y-1/2" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-2xl">{coupon.iconEmoji}</span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 text-[#8A6875] border border-pink-100">
                    {coupon.tag}
                  </span>
                </div>

                <h4 className="font-serif-luxury font-bold text-base sm:text-lg text-[#291820] leading-snug">
                  {coupon.title}
                </h4>
                <p className="font-serif-luxury text-xs text-[#6D4C59] mt-1.5 leading-relaxed">
                  {coupon.terms}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-pink-200/50 flex flex-wrap items-center justify-between gap-2">
                {!isRedeemed ? (
                  <button
                    type="button"
                    onClick={() => handleRedeem(coupon)}
                    className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white font-sans font-bold text-xs shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FFE082]" />
                    <span>Redeem Voucher</span>
                  </button>
                ) : (
                  <div className="w-full space-y-2">
                    <div className="w-full py-1.5 px-3 rounded-xl bg-green-500/15 border border-green-500/30 text-green-700 font-mono font-bold text-xs flex items-center justify-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>CLAIMED WITH LOVE ❤️</span>
                    </div>

                    <a
                      href={getWhatsAppLink(coupon)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-1.5 px-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-sans font-bold text-xs shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 text-center cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Ramzan Ko WhatsApp Pe Claim Bhejo 📲</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <span className="text-[11px] font-mono text-[#8A6875] flex items-center justify-center gap-1">
          <Heart className="w-3 h-3 text-[#E91E63] fill-current" />
          <span>Valid forever • Guaranteed by Ramzan with all his heart</span>
        </span>
      </div>
    </div>
  );
};
