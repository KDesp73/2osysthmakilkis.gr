export default function Banner({ title }: { title: string }) {
  return (
    <div className="relative mb-8 md:mb-10 w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl ring-1 ring-border/60 aspect-[21/7] min-h-[11rem] max-h-[15rem]">
      <img
        src="/banner.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/65 to-primary/40" />
      <div className="absolute inset-0 pattern-dots opacity-40" aria-hidden />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary" aria-hidden />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <h1 className="font-display text-2xl md:text-4xl font-bold text-white text-center drop-shadow-md">
          {title}
        </h1>
      </div>
    </div>
  );
}
