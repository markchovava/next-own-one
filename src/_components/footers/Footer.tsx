"use client"

import Logo from "../logos/Logo"
import { AppInfoData } from "@/_data/sample/AppinfoData"
import IconLink from "../icons/IconLink"
import Heading2 from "../headings/Heading2"
import { NavData, OtherLinksData } from "@/_data/sample/NavData"
import ListItemLink from "../lists/items/ListItemLink"



export default function Footer() {
    return (
        <>
            <section className="w-full bg-slate-900 text-gray-100 py-28">
                <div className="container__primary grid lg:grid-cols-3 grid-cols-1 gap-8">
                    <div className="space-y-8">
                        <div className="flex">
                            <div className="bg-white text-slate-900 px-3 py-1 rounded-lg">
                                <Logo />
                            </div>
                        </div>
                        <div className="flex items-center justify-start gap-3">
                            {AppInfoData.socials.map((i, key) => (
                                <IconLink
                                    key={key}
                                    href={i.href}
                                    iconType={i.name} />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <Heading2
                            name="Navigation"
                            color="text-white" />
                        <ul className="flex flex-col gap-4 text-sm">
                            {NavData.map((i, key) => (
                                <ListItemLink
                                    key={key}
                                    name={i.name}
                                    href={i.href} />
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <Heading2
                            name="Important Links"
                            color="text-white" />
                        <ul className="flex flex-col gap-4 text-sm">
                            {OtherLinksData.map((i, key) => (
                                <ListItemLink
                                    key={key}
                                    name={i.name}
                                    href={i.href} />
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="container__primary border-t border-gray-700 mt-16 pt-2 flex items-center justify-end text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Developed and Maintained by FL Designers.</p>
                </div>
            </section>
        </>
    )
}
