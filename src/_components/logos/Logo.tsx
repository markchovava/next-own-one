"use client"
import Link from 'next/link'
import { motion } from 'motion/react'
import { BillCorpNarBold } from '@/_assets/fonts/BillCorpNar/BillCorpNarFont'


interface Props {
    textCss?: string
    iconCss?: string
}

export default function Logo({ textCss = 'text-4xl', iconCss = 'h-20' }: Props) {
    return (
        <Link href='/'>
            <motion.div
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.85 }}
                className='flex items-center gap-2'>
                <img src='/assets/images/logos/logo.png' alt='Logo' className={`${iconCss} w-auto`} />
                <p className={`${textCss} ${BillCorpNarBold.className} font-bold uppercase`}>
                    Own <span className='text-amber-500'>One</span>
                </p>
            </motion.div>
        </Link>
    )
}
