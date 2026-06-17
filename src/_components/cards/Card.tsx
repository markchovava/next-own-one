"use client"

import { NoImageData } from "@/_data/sample/NoImage"
import IconDefault from "../icons/IconDefault"
import { ComfortaaBold } from "@/_assets/fonts/comfortaa/ComfortaaFont"
import Link from "next/link"


interface Props {
    image?: string
    name: string
    year: string
    fuel?: string
    href?: string
    transmission?: string
    price: string
    imageCss?: string
}



export default function Card({
    image = NoImageData,
    name,
    year,
    fuel,
    transmission,
    href = '#',
    price,
    imageCss = 'h-90'
}: Props) {
    return (
        <>
            <div className={`cursor-pointer group w-full bg-white rounded-lg drop-shadow overflow-hidden 
                hover:drop-shadow-lg transition-shadow duration-300 ease-in-out`}>
                <div className={`overflow-hidden w-full ${imageCss} border-b border-gray-200 flex items-center justify-center `}>
                    <img
                        src={image}
                        className='w-auto h-full object-fit group-hover:scale-110 transition-transform duration-300 ease-in-out'
                        alt={name} />
                </div>
                <div className='px-4 pt-3 pb-4 bg-slate-900 text-white'>
                    <div className="text-xl pb-2 mb-3 border-b border-gray-200">
                        <Link href={href}>
                            <span className="border-b-2 border-transparent ease-in-out transition-all hover:border-b-gray-100 hover:border-b-2">
                                {name}
                            </span>
                        </Link>
                    </div>
                    <div className='flex lg:items-center justify-between gap-4 lg:flex-row flex-col'>
                        <div className='flex justify-start lg:items-center lg:flex-row flex-col gap-2'>
                            <span className='px-3 pt-1 pb-0.5 bg-gray-200 text-slate-900 rounded-md text-center'>
                                {year}
                            </span>
                            <span className='flex lg:justify-start item-center gap-1'>
                                <IconDefault type="gas-station" css='text-xl text-gray-100' />
                                {fuel}
                            </span>
                        </div>
                        <div>
                            <p className={`${ComfortaaBold.className} lg:text-2xl text-lg text-end`}>
                                {price}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
