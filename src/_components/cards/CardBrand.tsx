"use client"

import Link from 'next/link'
import { NoImageData } from '@/_data/sample/NoImage'
import { BrandInterface } from '@/_data/entity/BrandEntity'
import ImageTwo from '../images/ImageTwo'




interface Props {
    href?: string
    data: BrandInterface
    image: string
}

export default function CardBrand({
    href = '#',
    image = NoImageData,
    data
}: Props) {
    const { name } = data

    return (
        <>
            <Link href={href}>
                <div className={`w-full bg-white ease-in-out transition-all 
                    hover:drop-shadow-lg drop-shadow rounded-lg flex items-center justify-center h-20 aspect-5/3 group overflow-hidden`}>
                    <ImageTwo image={image ?? NoImageData}
                        name={name}
                    />
                </div>
            </Link>
        </>
    )
}
