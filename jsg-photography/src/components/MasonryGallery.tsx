import React from 'react';
import Image from 'next/image';
import type { CloudinaryImage } from '../lib/cloudinary';

export default function MasonryGallery({ images }: { images: CloudinaryImage[] }) {
  return (
    <div className="p-6">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {images.map((img) => (
          <figure key={img.asset_id} className="mb-4 break-inside-avoid rounded overflow-hidden">
            <Image
              src={img.secure_url}
              alt={img.context?.alt || img.public_id}
              width={img.width}
              height={img.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto object-cover transition-transform duration-200 hover:scale-105"
            />
            {img.context?.caption && (
              <figcaption className="text-xs text-gray-500 mt-2">{img.context.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
