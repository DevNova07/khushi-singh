import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Moon, Crown, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';

interface PromiseItem {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  hindiQuote: string;
  detail: string;
  color: string;
}

const PROMISES: PromiseItem[] = [
  {
    id: 1,
    icon: Shield,
    title: "Hamesha Aapka Safe Space",
    hindiQuote: "Chahe duniya kitni bhi bheed ho, meri bahein aapka sukoon rahengi.",
    detail: "Jab bhi aap low feel karo ya thak jao, bina kisi judgement ke sirf sununga aur aapko gale lagaunga.",
    color: "from-rose-500 to-pink-500",
  },
  {
    id: 2,
    icon: Moon,
    title: "Raat Ko Bina Baat Kiye Kabhi Nahi Soyenge",
    hindiQuote: "Gussa chahe 100 baar ho, par manana pehle meri zimmedari hai.",
    detail: "Chahe kitni bhi behes ho, din khatam hone se pehle aapse 'I love you' bolkar manana mera pakka wada hai.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 3,
    icon: Crown,
    title: "Aapke Sapno Me Sabse Bada Supporter",
    hindiQuote: "Aapki har ek udaan me aapka sabse mazboot sahara banunga.",
    detail: "Aap jo bhi achieve karna chahti ho, meri taraf se hamesha 100% encouragement aur bharosa milega.",
    color: "from-amber-500 to-yellow-500",
  },
  {
    id: 4,
    icon: Sparkles,
    title: "Aapki Smile Ko Kabhi Kam Nahi Hone Dunga",
    hindiQuote: "Ye contageous smile meri zindagi ki sabse badi daulat hai.",
    detail: "Har wo chhoti koshish karunga jisse aapke chehre par ye bachpan jaisi innocent smile hamesha khili rahe.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 5,
    icon: Heart,
    title: "Aakhri Saans Tak Sirf Aur Sirf Khushi",
    hindiQuote: "Pyaar sirf bolne ke liye nahi, har ek din nibhaane ke liye hai.",
    detail: "Waqt chahe kitna bhi badle, mere dil me aapki jagah koi nahi le sakta. Aaj, kal aur hamesha.",
    color: "from-red-500 to-rose-600",
  },
];

export const BirthdayPromises: React.FC = () => {
  const [sealedPromises, setSealedPromises] = useState<number[]>([1, 2, 3, 4, 5]);

  const toggleSeal = (id: number) => {
    romanticAudio.playStamp();
    if (sealedPromises.includes(id)) {
      setSealedPromises((prev) => prev.filter((p) => p !== id));
    } else {
      setSealedPromises((prev) => [...prev, id]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-10 p-5 sm:p-8 rounded-[2.5rem] bg-gradient-to-b from-[#FFF5F8] via-white to-[#FFF5F8] border-2 border-pink-200/80 shadow-2xl relative overflow-hidden">
      {/* Decorative ambient aura */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-[#C2185B] font-mono text-xs font-bold uppercase tracking-widest shadow-xs">
          <Crown className="w-3.5 h-3.5 text-[#D6A85F]" />
          <span>Ramzan's Sacred Vows</span>
          <Crown className="w-3.5 h-3.5 text-[#D6A85F]" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#291820]">
          Khushi Ke Liye 5 Birthday Promises 💍
        </h3>
        <p className="text-xs sm:text-sm font-serif-luxury text-[#8A6875] italic max-w-md mx-auto">
          "Ye sirf baatein nahi hain, ye wo waade hain jo mere dil par hamesha ke liye likhe hain."
        </p>
      </div>

      {/* Promises Cards List */}
      <div className="space-y-4">
        {PROMISES.map((item, index) => {
          const Icon = item.icon;
          const isSealed = sealedPromises.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleSeal(item.id)}
              className={`group relative p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                isSealed
                  ? 'bg-white/95 border-pink-300 shadow-md hover:shadow-lg'
                  : 'bg-white/60 border-pink-100 opacity-80'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white flex-shrink-0 shadow-sm mt-0.5 sm:mt-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#E91E63]">Wada #{index + 1}</span>
                      <h4 className="font-serif-luxury font-bold text-base sm:text-lg text-[#291820]">
                        {item.title}
                      </h4>
                    </div>
                    <p className="font-serif-luxury italic text-xs sm:text-sm text-[#C2185B] mt-0.5">
                      "{item.hindiQuote}"
                    </p>
                    <p className="font-serif-luxury text-xs text-[#8A6875] mt-1 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>

                {/* Sealed Stamp Badge */}
                <div className="self-end sm:self-center flex-shrink-0 pt-2 sm:pt-0">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all shadow-xs ${
                    isSealed
                      ? 'bg-gradient-to-r from-[#D6A85F] to-[#FFE082] text-[#5D4037] border border-[#D6A85F]/50 shadow-amber-200/50'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5D4037]" />
                    <span>{isSealed ? 'SEALED FOREVER' : 'Tap to Seal'}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
