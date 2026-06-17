import Link from 'next/link'
import React from 'react'
import ImageOne from '../images/ImageOne'
import { NoImageData } from '@/_data/sample/NoImage'
import { BrandInterface } from '@/_data/entity/BrandEntity'

interface Props {
    href?: string
    data: BrandInterface
}

export default function CardBrand({
    href = '#',
    data
}: Props) {
    const { name, image } = data

    return (
        <>
            <Link href={href}>
                <div className={`w-full bg-white ease-in-out transition-all 
                    hover:drop-shadow-lg drop-shadow rounded-lg flex items-center justify-center h-20 group overflow-hidden`}>
                    <ImageOne image={NoImageData}
                        name={name}
                    />
                </div>
            </Link>
        </>
    )
}
