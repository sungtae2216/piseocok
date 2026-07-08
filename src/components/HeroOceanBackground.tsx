export function HeroOceanBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-white">
      <div className="absolute top-4 right-8 h-20 w-20 rounded-full bg-amber-200/70 blur-md" />
      <div className="absolute top-10 left-10 h-10 w-24 rounded-full bg-white/70 blur-sm" />
      <div className="absolute top-16 left-32 h-8 w-16 rounded-full bg-white/60 blur-sm" />

      <svg
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
        className="absolute right-0 bottom-0 left-0 h-2/3 w-full"
      >
        <path
          d="M0,120 C80,160 160,80 240,110 C320,140 360,90 400,110 L400,200 L0,200 Z"
          fill="#bae6fd"
        />
        <path
          d="M0,145 C90,105 180,175 270,135 C330,110 370,155 400,135 L400,200 L0,200 Z"
          fill="#7dd3fc"
        />
        <path
          d="M0,170 C100,145 200,195 300,155 C340,140 370,170 400,160 L400,200 L0,200 Z"
          fill="#38bdf8"
        />
      </svg>
    </div>
  )
}
