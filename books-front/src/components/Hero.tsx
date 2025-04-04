import { useEffect, useState } from "react";

export default function HeroWithVideo() {
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/library.webp"
          alt="Library background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10"></div>

      <div
        className="absolute inset-0 z-10 box-border"
        style={{
          boxShadow: "inset 0 0 100px 20px rgba(0,0,0,0.6)",
        }}
      ></div>

      <div className="relative z-20 flex flex-col justify-center items-center h-full w-full">
        <div
          className={`w-20 h-px bg-white/60 mb-6 
          ${isTextVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"} 
          transition-all duration-1500 ease-out delay-500`}
        ></div>

        <h1
          className={`text-[15vw] md:text-[15vw] font-normal text-white leading-none tracking-tighter
          ${
            isTextVisible
              ? "opacity-100 scale-100 blur-[2px] animate-text-glow"
              : "opacity-0 scale-95 blur-[10px]"
          } 
          transition-all duration-2000 ease-in-out`}
          style={{
            textShadow: isTextVisible
              ? "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 90px rgba(255, 255, 255, 0.2)"
              : "none",
          }}
        >
          Orchid
        </h1>

        <p
          className={`text-white/80 text-lg mt-4 tracking-wide
          ${
            isTextVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }
          transition-all duration-1000 ease-out delay-1000`}
        >
          Biblioteca Digital
        </p>

        <button
          className="absolute bottom-[10%] px-8 py-3 bg-white/90 text-black rounded-full 
          text-sm tracking-widest font-medium backdrop-blur-sm
          cursor-pointer flex items-center gap-3 transition-all duration-300 
          hover:bg-white hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]
          opacity-0 translate-y-5 animate-fade-in-up group"
          style={{ animationDelay: "2.5s", animationFillMode: "forwards" }}
        >
          EXPLORAR
          <span className="text-xs group-hover:translate-x-1 transition-transform duration-300">
            ▶
          </span>
        </button>
      </div>
    </div>
  );
}
