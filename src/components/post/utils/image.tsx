'use client'
import { useState } from "react"

export default function Picture({ src }: { src: string }) {

    const [srcImage, setSrcImage] = useState<string>(src)
    return (
        <>
            {src ? <img
                src={src ?? srcImage}
                alt="Med Blog"
                className="rounded-2xl object-cover h-auto w-full max-h-[500px] min-h-[250px]"
                onError={() => setSrcImage(`https://avatar.vercel.sh/5`)}
            />
                :
                <img
                    src={`https://avatar.vercel.sh/5`}
                    alt="Med Blog"
                    className="rounded-2xl object-cover h-auto w-full max-h-[500px] min-h-[250px]"
                />
            }
        </>
    )
}
