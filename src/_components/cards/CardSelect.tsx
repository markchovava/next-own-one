"use client"

import { useState } from "react"
import SelectInputOne from "../forms/selects/SelectInputOne"
import IconDefault from "../icons/IconDefault"
import { AnimatePresence, motion } from "motion/react"


interface Props {
    name: string
    css: string
}

export default function CardSelect({
    name,
    css
}: Props) {
    const [toggle, setToggle] = useState<boolean>(true)


    return (
        <div className={`${css} relative p-4 bg-white drop-shadow rounded-xl`}>
            <button className='cursor-pointer w-full mb-3 
                 flex items-center justify-between'>
                <span>{name}</span>
            </button>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className='grid grid-cols-2 gap-3'>
                <SelectInputOne />
                <SelectInputOne />
            </motion.div>

        </div>
    )
}
