'use client'
import Image from "next/image"
import { useState } from "react"

export default function Picture({ src }: { src: string }) {

    const [srcImage, setSrcImage] = useState<string>(src)
    return (
        <div className="relative w-44 h-[500px] mb-4 break-inside-auto transition-all">
            {src ? <Image
                src={src ?? srcImage}
                alt="Med Blog"
                fill
                className="rounded-2xl object-cover"
                onError={() => setSrcImage(`https://avatar.vercel.sh/5`)}
            />
                :
                <Image
                    src={`https://avatar.vercel.sh/5`}
                    alt="Med Blog"
                    fill
                    className="rounded-2xl object-cover"
                />
            }
        </div>
    )
}
