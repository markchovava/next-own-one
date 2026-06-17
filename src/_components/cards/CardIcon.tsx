"use client"
import IconDefault from '../icons/IconDefault'


interface Props {
    iconType: string
    name: string
}

export default function CardIcon({ iconType, name }: Props) {
    return (
        <div className="w-full flex items-center justify-start gap-2">
            <IconDefault type={iconType} css="text-lg" />
            <p>{name}</p>
        </div>
    )
}
