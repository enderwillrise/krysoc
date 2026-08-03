import Image from "next/image";

/**
 * Photo slot for the concept demos.
 *
 * `output: 'export'` means no image optimisation server, so `images.unoptimized`
 * is set in next.config and these are served as-is — the files are already
 * resized and WebP-compressed at generation time.
 *
 * The `tint` class is the demo's gradient placeholder (rst-photo / hwk-photo).
 * It sits *behind* the image so the slot still reads as designed while the
 * photo decodes, and so a missing file degrades to the old look rather than to
 * a broken-image icon.
 *
 * These are AI-generated stand-ins that carry the right mood. For a real client
 * the whole point is their own photos — swap the file, keep everything else.
 */
export function Photo({
  src,
  alt,
  tint = "",
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: {
  src: string;
  alt: string;
  tint?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${tint} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
