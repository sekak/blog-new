import { useState } from "react"


interface TruncatedTextProps {
    content: string;
    charLimit: number;
    className?: string;

}

export const TruncatedText = (props: TruncatedTextProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const truncateText = (text: string, limit: number) =>
        text.length > limit ? `${text.substring(0, limit)}...` : text

    const toggleText = () => setIsExpanded(!isExpanded)

    return (
        <p className={props.className}>
            {isExpanded ? props.content : truncateText(props.content, props.charLimit)}
            {props.content.length > props.charLimit && (
                <button
                    onClick={toggleText}
                    className="text-blue-500 hover:underline ml-2 text-base"
                >
                    {!isExpanded && 'more'}
                </button>
            )}
        </p>
    )
}