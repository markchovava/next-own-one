"use client"

import { NavData } from "@/_data/sample/NavData"
import Logo from "../logos/Logo"
import NavItem from "../navs/NavItem"
import HeaderResponsive from "./HeaderResponsive"



export default function Header() {
    return (
        <>
            <header className='lg:block hidden w-full bg-white drop-shadow-md border-b border-gray-200'>
                <section className='container__primary flex items-center justify-between py-3'>
                    <Logo />
                    <nav>
                        <ul className='flex items-center gap-6'>
                            {NavData.map((i, key) => (
                                <NavItem
                                    key={key}
                                    name={i.name}
                                    href={i.href} />
                            ))}
                        </ul>
                    </nav>
                </section>
            </header>

            <HeaderResponsive />

        </>
    )
}
