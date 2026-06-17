"use client"
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IconDefault from '@/_components/icons/IconDefault'
import { usePackageStore } from '@/app/(main)/package/_data/store/usePackageStore'

export default function TravellerInput() {
  const { data, setInputValue } = usePackageStore()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const travellerTotals = () => {
    const adults = Number(data.adults)
    const children = Number(data.children)
    const infants = Number(data.infants)
    return adults + children + infants
  }

  // Close on outside click (desktop only — on mobile it's inline so this is fine too)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const fields = ['adults', 'children', 'infants', 'rooms'] as const

  const panel = (
    <motion.ul
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={(e) => e.stopPropagation()}
      className="w-full space-y-1 border border-gray-300 bg-white drop-shadow-md rounded-xl px-4 py-3"
    >
      {fields.map((field, i) => (
        <li key={field} className={i < fields.length - 1 ? 'border-b border-gray-200' : ''}>
          <NumberInput
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={data[field]}
            placeholder="0"
            onChange={setInputValue}
          />
        </li>
      ))}
    </motion.ul>
  )

  return (
    <div className="w-full" ref={containerRef}>
      <p className="text-gray-700 text-xs font-medium mb-1">Travellers</p>

      {/* Trigger */}
      <div
        className="relative border cursor-pointer border-gray-300 rounded-full flex items-center justify-start h-12 px-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IconDefault type="user" css="text-lg text-gray-700" />
        <span className="px-3 text-sm">
          {travellerTotals()} Travellers, {data.rooms} Room
        </span>

        {/* Chevron indicator */}
        <span className="ml-auto text-gray-400 text-sm">
          {
            isOpen ? 
            <IconDefault type='up' /> : 
            <IconDefault type='down' />
          }
        </span>

        {/* Desktop: absolute floating dropdown */}
        <AnimatePresence>
          {isOpen && (
            <div className="hidden lg:block absolute z-50 top-[110%] right-0 w-full min-w-[240px] origin-top-right">
              {panel}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile: inline slide-down below the input */}
      <AnimatePresence>
        {isOpen && (
          <div className="block lg:hidden mt-2">
            {panel}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}


interface pInterface {
  label?: string
  name: string
  value: string | number
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function NumberInput({ label, name, value, placeholder, onChange }: pInterface) {
  return (
    <div className="w-full flex items-center justify-between px-2 py-2">
      <p className="w-[60%] text-sm text-gray-700">{label}</p>
      <input
        type="number"
        name={name}
        min={0}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border w-[40%] border-gray-200 outline-none rounded-lg p-1 text-sm text-center"
      />
    </div>
  )
}