'use client'

import Image from "next/image"
import { useState } from "react"

export default function Picture({ src }: { src: string }) {

    const [srcImage, setSrcImage] = useState<string>(src)

    return (
        <>
            {srcImage ? <Image
                src={srcImage}
                alt="Med Blog"
                className="object-cover"
                onError={() => setSrcImage(`https://avatar.vercel.sh/${Math.random() * 100}`)}
                fill
            />
                :
                <Image
                    src={`https://avatar.vercel.sh/${Math.random() * 100}`}
                    alt="Med Blog"
                    className="object-cover"
                    fill
                />
            }
        </>
    )
}
