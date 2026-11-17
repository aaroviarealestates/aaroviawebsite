export default function HeroPoster({ src = "/images/page-header-bg.webp" }: { src?: string }) {
  return (
    <div className="hero-bg-video" aria-hidden="true">
      <img
        src={src}
        alt=""
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}
