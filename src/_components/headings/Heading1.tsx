"use client"


interface Props {
    name: string
    color?: string
}

export default function Heading1({
    name,
    color = 'text-gray-800'
}: Props) {
    return (
        <p className={`text-4xl font-bold ${color}`}>
            {name}
        </p>
    )
}
