"use client"

import Link from 'next/link'
import { motion } from 'motion/react'
import { BillCorpNarBold, BillCorpNarRegular } from '@/_assets/fonts/BillCorpNar/BillCorpNarFont'


interface Props {
    name: string
    href: string
}

export default function NavItem({ name, href }: Props) {
    return (
        <>
            <Link href={href}>
                <motion.li
                    className={`${BillCorpNarRegular.className} 
                    ease-in-out duration-200 cursor-pointer font-bold
                    uppercase text-md text-gray-700 hover:text-amber-500 pt-2 pb-2
                    border-b-3 border-transparent hover:border-amber-500 hover:border-b-3`}>
                    {name}
                </motion.li>
            </Link>
        </>
    )
}
