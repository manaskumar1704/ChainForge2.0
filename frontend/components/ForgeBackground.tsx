"use client";

export function ForgeBackground() {
  return (
    <>
      {/* Forge image */}
      <div
        className="fixed inset-0 -z-30 bg-cover bg-center"
        style={{ backgroundImage: "url('/forge-bg.png')" }}
      />

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 -z-20 bg-black/70" />

      {/* Subtle warm glow from furnace */}
      <div className="fixed bottom-[-30%] left-1/2 -translate-x-1/2 w-[140%] h-[60%] bg-orange-600/20 blur-[140px] -z-10" />
    </>
  );
}
