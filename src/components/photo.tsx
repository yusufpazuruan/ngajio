"use client";

import Image from "next/image";
import { useState } from "react";
import PhotoModal from "@/components/photo-modal";

export default function Photo({ src, alt, width, height }: any) {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <div
        style={{ width, height }}
        className="relative shadow-md border border-white border-opacity-80 rounded-lg overflow-hidden cursor-pointer"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
            className="object-fill object-center cursor-pointer"
          onClick={() => setShowModal(true)}
        />
      </div>
      {showModal && <PhotoModal src={src} alt={alt} onClose={toggleModal} />}
    </>
  );
}
