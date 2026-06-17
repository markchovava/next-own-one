"use client"
import { BillCorpNarRegular } from '@/_assets/fonts/BillCorpNar/BillCorpNarFont'
import Button from '../buttons/Button'



export default function Banner() {
    return (
        <section className="w-full h-150 bg-gray-200">
            <div className="container__primary flex items-center justify-start h-full">
                <div className="lg:w-[45%] w-[80%]">
                    <h1 className={`${BillCorpNarRegular.className} text-6xl text-gray-800 leading-none mb-4`}>
                        Welcome to Own One
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="flex items-center justify-start gap-4">
                        <Button
                            name="Buy A Car"
                            css="text-lg py-3 px-9 text-white"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
