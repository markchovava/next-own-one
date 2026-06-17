"use client"
import IconDefault from '@/_components/icons/IconDefault'
import { motion } from 'motion/react'



interface PropInterface {
    name: string
    status?: boolean
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
    css?: string
}

export default function Button({
    name,
    type = 'button',
    onClick,
    status,
    css = 'py-3 px-8'
}: PropInterface) {
    return (
        <motion.button
            onClick={onClick}
            type={type}
            disabled={status}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className={`${css} group relative flex items-center justify-center gap-1 cursor-pointer bg-linear-to-br 
          from-amber-400 to-amber-600 rounded-full overflow-hidden transition-all duration-300 hover:to-amber-700`}>
            {/* The Text: Shifts slightly to the left to make room for the icon */}
            <span className="translate-x-2 group-hover:-translate-x-1 transition-transform duration-300 ease-in-out font-normal text-white">
                {name}
            </span>
            {/* The Icon: Starts invisible and shifted, then slides into view */}
            <IconDefault
                type="right"
                css="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out text-white"
            />
        </motion.button>
    )
}
