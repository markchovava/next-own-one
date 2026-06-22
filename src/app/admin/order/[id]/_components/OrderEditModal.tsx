"use client"

import React from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useOrderStore } from '../../../_data/store/useOrderStore';
import ButtonAdminClose from '@/app/admin/_components/buttons/ButtonAdminClose';
import HeadingSecondary from '@/app/admin/_components/headings/HeadingSecondary';
import SpacerPrimary from '@/_components/spacers/SpacerPrimary';
import TextInputDefault from '@/app/admin/_components/forms/inputs/TextInputDefault';
import SelectAdminDefault from '@/app/admin/_components/forms/selects/SelectAdminDefault';
import { ButtonAdminSubmit } from '@/app/admin/_components/buttons/ButtonAdminSubmit';
import { toast } from 'react-toastify';
import TextAreaInputDefault from '@/app/admin/_components/forms/textareas/TextAreaInputDefault';
import { _orderUpdateAction } from '../../../_data/actions/OrderActions';
import { OrderStatusData } from '@/app/admin/_data/sample/OrderData';

const title = "Edit Order"

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



interface PropInterface {
    id: string | number
}

export default function OrderEditModal({ id }: PropInterface) {
    const {
        data,
        errors,
        toggleModal,
        isSubmitting,
        getData,
        setInputValue,
        setToggleModal,
        clearErrors,
        setIsSubmitting,
        validateForm,
    } = useOrderStore()

    const handleToggleModal = () => {
        setToggleModal(!toggleModal)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        clearErrors();
        e.preventDefault();

        // Validate form fields through Zustand store configurations
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
            status: data.status,
            notes: data.notes,
            priority: data.priority,
        }

        try {
            const res = await _orderUpdateAction(id, formData);
            const { status, message } = res;
            switch (status) {
                case 1:
                    toast.success(message);
                    await getData(id);
                    clearErrors();
                    setIsSubmitting(false);
                    setToggleModal(false)
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

                                <TextInputDefault
                                    label='Customer Name'
                                    name='customerName'
                                    type="text"
                                    value={data.customerName}
                                    placeholder='Enter Customer Name.'
                                    onChange={setInputValue}
                                    error={errors.customerName}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Customer Phone'
                                    name='customerPhone'
                                    type="text"
                                    value={data.customerPhone}
                                    placeholder='Enter Customer Phone.'
                                    onChange={setInputValue}
                                    error={errors.customerPhone}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Customer Email'
                                    name='customerEmail'
                                    type="text"
                                    value={data.customerEmail}
                                    placeholder='Enter Customer Email Address...'
                                    onChange={setInputValue}
                                    error={errors.customerEmail}
                                />
                                <SpacerPrimary />

                                <SelectAdminDefault
                                    label='Status'
                                    name='status'
                                    data={OrderStatusData}
                                    value={data.status}
                                    onChange={setInputValue}
                                />
                                <SpacerPrimary />

                                <TextAreaInputDefault
                                    label='Notes'
                                    name='notes'
                                    value={data.notes || ''}
                                    placeholder='Enter structural order notes...'
                                    onChange={setInputValue}
                                    error={errors.notes}
                                />
                                <SpacerPrimary />

                                <div className='flex items-center justify-center'>
                                    <ButtonAdminSubmit
                                        title='Update Order'
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