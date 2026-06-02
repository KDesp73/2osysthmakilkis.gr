"use client";

import Image from "next/image";
import { useState } from "react";
import PageTitle from "./PageTitle";
import EmptyState from "./EmptyState";

interface MetadataImage {
  path: string;
  index: number;
}

interface MetadataFolder {
  name: string;
  date: string;
  images: MetadataImage[];
}

interface Props {
  collections: MetadataFolder[];
}

export default function Gallery({ collections }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const hasImages = collections.some((folder) => folder.images.length > 0);

  if (!hasImages) {
    return (
      <>
        <PageTitle title="Εικόνες" />
        <EmptyState
          title="Δεν υπάρχουν εικόνες"
          description="Δεν υπάρχουν διαθέσιμες εικόνες αυτή τη στιγμή."
        />
      </>
    );
  }

  return (
    <>
      <PageTitle
        title="Εικόνες"
        subtitle="Στιγμές από τις δράσεις και τις συγκεντρώσεις μας."
      />
      {collections.map(({ name, date, images }) => (
          <section key={name + date} className="mb-12">
            <h2 className="text-2xl font-semibold mb-1">{name}</h2>
            <p className="text-sm text-muted-foreground mb-4">{date}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {images
                .sort((a, b) => a.index - b.index)
                .map((img) => (
                  <div
                    key={img.index}
                    className="overflow-hidden rounded-xl ring-1 ring-border shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer aspect-square relative"
                    onClick={() => setSelectedImage(img.path)}
                  >
                    <Image
                      src={img.path}
                      alt={`${name} - ${img.index}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>
          </section>
        ))}

      {/* Modal / Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal
        >
          <Image
            src={selectedImage}
            alt="Expanded Image"
            width={1200}
            height={1200}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </>
  );
}
