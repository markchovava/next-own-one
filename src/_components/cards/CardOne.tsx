"use client"
import { ComfortaaBold } from '@/_assets/fonts/comfortaa/ComfortaaFont'
import IconDefault from '../icons/IconDefault'
import Button from '../buttons/Button'
import Link from 'next/link'
import { CarInterface } from '@/_data/entity/CarEntity'
import { NoImageData } from '@/_data/sample/NoImage'
import LabelOne from '../labels/LabelOne'


interface Props {
    data: CarInterface
    href?: string
}


export default function CardOne({
    data,
    href = '#'
}: Props) {
    const { image, name, price, condition, fuel, engineCapacity, transmission, mileage } = data

    return (
        <>
            <div className="w-full hover:drop-shadow-lg rounded-lg overflow-hidden bg-white drop-shadow">
                <div className="group w-full h-70 overflow-hidden flex items-center justify-center">
                    <img
                        src={NoImageData}
                        className='w-auto h-full object-fit group-hover:scale-110 transition-transform duration-300 ease-in-out'
                        alt={name} />
                </div>
                <div className="px-4 pt-3 pb-4">
                    <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-2 mb-3">
                        <p className={`${ComfortaaBold.className} text-lg`}>
                            {price}
                        </p>
                        {condition &&
                            <LabelOne name={condition} />
                        }
                    </div>
                    <div className='border-b flex border-gray-200 pb-2 mb-3 text-gray-700 text-lg'>
                        <span className='cursor-pointer hover:underline text-gray-800'>
                            {name}
                        </span>
                    </div>
                    <div className='grid grid-cols-2 gap-4 border-b border-gray-200 pb-2 mb-3'>
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
                    </div>
                    <div className="flex items-center justify-end">
                        <Link href={href}>
                            <Button
                                name="More Info"
                                css="text-sm py-2 px-4 text-white"
                            />
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}
