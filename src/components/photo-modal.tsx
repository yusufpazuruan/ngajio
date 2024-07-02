'use client'

import Image from "next/image";

export default function PhotoModal({src, alt, onClose}: any){
    if (!src) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-primary/10 p-4 rounded-lg relative border border-primary border-dashed">
            <button onClick={onClose} className="text-secondary-foreground hover:opacity-80 mb-2">Close</button>
            <div className="relative w-[80vw] h-[80vh]">
                <Image 
                    src={src} 
                    alt={alt}
                    fill={true}
                    style={{objectFit: 'cover', objectPosition: 'center'}}
                    className="rounded-lg" 
                />
            </div>
            </div>
        </div>
    )
}