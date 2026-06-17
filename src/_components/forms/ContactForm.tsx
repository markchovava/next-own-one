"use client"

import { useContactStore } from "@/_store/useContactStore"
import Heading2 from "../headings/Heading2"
import TextInput from "./inputs/TextInput"
import TextArea from "./textareas/TextArea"
import Button from "../buttons/Button"


export default function ContactForm() {
    const { data, errors, isSubmitting, setInputValue } = useContactStore()

    const handleSubmit = async () => { }

    return (
        <div>
            <Heading2 name="Talk to us" />
            <form onSubmit={handleSubmit} className="border-t border-gray-200 my-4 py-4 space-y-4">
                <TextInput
                    name="name"
                    value={data.name}
                    label='Name'
                    type='text'
                    placeholder='Enter Name here.'
                    onChange={setInputValue}
                    error={errors.name}
                />
                <TextInput
                    name="email"
                    value={data.email}
                    label='Email'
                    type='text'
                    placeholder='Enter Email here.'
                    onChange={setInputValue}
                    error={errors.email}
                />
                <TextArea
                    name="message"
                    value={data.message}
                    label='Message'
                    placeholder='Enter Message here.'
                    onChange={setInputValue}
                    error={errors.message}
                />
                <Button
                    name="Submit"
                    status={isSubmitting}
                    css='text-lg py-3 px-9 text-white'
                />

            </form>
        </div>
    )
}
