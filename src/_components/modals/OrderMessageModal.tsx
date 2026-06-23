"use client"

import React, { useEffect } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { toast } from 'react-toastify';
import { useOrderStore } from '@/app/admin/_data/store/useOrderStore';
import { orderStoreAction } from '@/app/admin/_data/actions/OrderActions';
import ButtonAdminClose from '@/app/admin/_components/buttons/ButtonAdminClose';
import HeadingSecondary from '@/app/admin/_components/headings/HeadingSecondary';
import SpacerPrimary from '../spacers/SpacerPrimary';
import TextInputDefault from '@/app/admin/_components/forms/inputs/TextInputDefault';
import { ButtonAdminSubmit } from '@/app/admin/_components/buttons/ButtonAdminSubmit';
import TextAreaInputDefault from '@/app/admin/_components/forms/textareas/TextAreaInputDefault';
import { useCarStore } from '@/_store/useCarStore';
import { ComfortaaBold } from '@/_assets/fonts/comfortaa/ComfortaaFont';


const title = "Motor Request"





const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            type: 'spring',
            duration: 1,
        }
    },
}

export default function OrderMessageModal() {
    const { data: carData, } = useCarStore()
    const {
        data,
        toggleModal,
        isSubmitting,
        errors,
        resetData,
        clearErrors,
        setInputValue,
        setToggleModal,
        setIsSubmitting,
        validateForm,
        getDataList,
    } = useOrderStore()

    useEffect(() => {
        resetData()
    }, [resetData])

    const handleToggleModal = () => {
        setToggleModal(!toggleModal)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        clearErrors();
        e.preventDefault();

        // Validate form using store validation logic
        const validation = validateForm();
        if (!validation.isValid) {
            const firstError = validation.errors.customerName ||
                validation.errors.customerPhone ||
                validation.errors.customerEmail
            toast.warn(firstError);
            return;
        }

        setIsSubmitting(true);
        const formData = {
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            customerEmail: data.customerEmail,
            carName: carData.name,
            carId: carData.id,
            carPrice: carData.price,
            notes: data.notes,
            status: 'Pending', // Default status placeholder
        }

        try {
            // Note: Update this server action name if yours is named differently
            const res = await orderStoreAction(formData);
            console.log('res', res)
            const { status, message } = res;
            switch (status) {
                case 1:
                    clearErrors();
                    await getDataList();
                    setIsSubmitting(false);
                    setToggleModal(false)
                    toast.success(message);
                    resetData();
                    return
                default:
                    toast.success('Something went wrong, please try again.');
                    setIsSubmitting(false);
                    return
            }
        } catch (error) {
            toast.error('Failed to save data. Please try again.');
            console.error('Form submission error:', error);
            setIsSubmitting(false);
        }
    }

    return (
        <AnimatePresence>
            {toggleModal && (
                <motion.section
                    variants={variants}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    className={`w-screen h-screen fixed top-0 left-0 z-200 overflow-y-auto`}>
                    <div className='absolute z-0 top-0 left-0 w-full h-full bg-black opacity-40'></div>
                    <div className='w-full h-full absolute z-10 overflow-auto scroll__width py-24'>
                        <section className='mx-auto lg:w-[60%] w-[90%] bg-white text-black p-6 rounded-2xl'>
                            <div className='flex items-center justify-end'>
                                <ButtonAdminClose onClick={handleToggleModal} />
                            </div>

                            <form onSubmit={handleSubmit}>
                                <HeadingSecondary title={title} css='text-center' />
                                <SpacerPrimary />
                                <hr className="w-full border-b border-gray-100" />
                                <SpacerPrimary />

                                <div className='bg-gray-50 mb-4 text-lg p-3 grid gap-4 lg:grid-cols-2'>
                                    <p className={`text-amber-600 ${ComfortaaBold.className}`}>Car Name: {carData.name}</p>
                                    <p>Car Price: {carData.price ? '$' + carData.price : 'Not Added'}</p>

                                </div>

                                <TextInputDefault
                                    label='Customer Name'
                                    name='customerName'
                                    type="text"
                                    value={data.customerName || ''}
                                    placeholder='Enter Customer Name.'
                                    onChange={setInputValue}
                                    error={errors.customerName}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Customer Phone'
                                    name='customerPhone'
                                    type="text"
                                    value={data.customerPhone || ''}
                                    placeholder='Enter Customer Phone Number.'
                                    onChange={setInputValue}
                                    error={errors.customerPhone}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Customer Email'
                                    name='customerEmail'
                                    type="text"
                                    value={data.customerEmail || ''}
                                    placeholder='Enter Customer Email Address.'
                                    onChange={setInputValue}
                                    error={errors.customerEmail}
                                />
                                <SpacerPrimary />

                                <TextAreaInputDefault
                                    label='Notes'
                                    name='notes'
                                    value={data.notes || ''}
                                    placeholder='Enter any additional details or notes...'
                                    onChange={setInputValue}
                                    error={errors.notes}
                                />
                                <SpacerPrimary />

                                <div className='flex items-center justify-center'>
                                    <ButtonAdminSubmit
                                        title='Submit'
                                        css='px-12 text-white py-4'
                                        status={isSubmitting}
                                    />
                                </div>
                                <SpacerPrimary />
                            </form>
                        </section>
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}