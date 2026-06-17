"use client"

import { NoImageData } from "@/_data/sample/NoImage"
import ImageOne from "../images/ImageOne"
import { ComfortaaBold } from "@/_assets/fonts/comfortaa/ComfortaaFont"
import IconDefault from "../icons/IconDefault"
import Link from "next/link"
import Button from "../buttons/Button"
import LabelOne from "../labels/LabelOne"
import { CarInterface } from "@/_data/entity/CarEntity"



interface Props {
    image?: string
    href?: string
    data: CarInterface
}

export default function CardTwo({
    data,
    href = '#',
    image = NoImageData
}: Props) {
    const {
        name,
        price,
        fuel,
        transmission,
        engineCapacity,
        mileage,
        year,
        condition
    } = data

    return (
        <div className='hover:drop-shadow-xl grid md:grid-cols-3 grid-cols-1 bg-white rounded-lg overflow-hidden drop-shadow'>
            <div className='col-span-1'>
                <div className='group cursor-pointer w-full lg:h-70 h-80 bg-gray-200'>
                    <ImageOne image={image} />
                </div>
            </div>
            <div className='md:col-span-2 col-span-1 h-full p-4 flex flex-col justify-between items-start '>
                <div className='w-full flex items-center justify-between'>
                    <p className={`text-lg ${ComfortaaBold.className} `}>
                        {name}
                    </p>
                    <p className={`text-xl text-slate-700 ${ComfortaaBold.className}`}>
                        {price}
                    </p>
                </div>
                <div className='w-full grid grid-cols-2 gap-4 border-y border-gray-200 py-3 my-3'>
                    <div className='flex items-center justify-start gap-1'>
                        <IconDefault type="gas-station" css='text-2xl text-gray-700' />
                        {fuel}
                    </div>
                    <div className='flex items-center justify-start gap-1'>
                        <IconDefault type="gearbox" css='text-2xl text-gray-700' />
                        {transmission}
                    </div>
                    <div className='flex items-center justify-start gap-1'>
                        <IconDefault type="engine" css='text-2xl text-gray-700' />
                        {engineCapacity}
                    </div>
                    <div className='flex items-center justify-start gap-1'>
                        <IconDefault type="dashboard" css='text-2xl text-gray-700' />
                        {mileage}
                    </div>
                    <div className='flex items-center justify-start gap-1'>
                        <IconDefault type="calendar" css='text-2xl text-gray-700' />
                        {year}
                    </div>
                    <div className='flex items-center justify-start gap-1'>
                        <LabelOne name={condition} />
                    </div>
                </div>
                <div className="w-full flex items-center justify-end">
                    <Link href={href}>
                        <Button
                            name="More Info"
                            css="text-sm py-2 px-4 text-white"
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}
