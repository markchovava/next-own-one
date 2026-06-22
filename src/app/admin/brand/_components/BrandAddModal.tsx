"use client"

import React from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useBrandStore } from '../../_data/store/useBrandStore';
import { toast } from 'react-toastify';
import ButtonAdminClose from '../../_components/buttons/ButtonAdminClose';
import SpacerPrimary from '@/_components/spacers/SpacerPrimary';
import HeadingSecondary from '../../_components/headings/HeadingSecondary';
import TextInputDefault from '../../_components/forms/inputs/TextInputDefault';
import { ButtonAdminSubmit } from '../../_components/buttons/ButtonAdminSubmit';
import SelectAdminDefault from '../../_components/forms/selects/SelectAdminDefault';
import ImageInputDefault from '../../_components/forms/image/ImageInputDefault';
import { _brandStoreAction } from '../../_data/actions/BrandActions';



const title = "Add Brand"


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


export default function PartnerAddModal() {
    const {
        data,
        errors,
        toggleModal,
        isSubmitting,
        getDataList,
        resetData,
        setImage,
        setInputValue,
        setToggleModal,
        clearErrors,
        setIsSubmitting,
        validateForm,
    } = useBrandStore()

    const handleToggleModal = () => {
        setToggleModal(!toggleModal)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        clearErrors();
        e.preventDefault();
        // Validate form using store
        const validation = validateForm();
        if (!validation.isValid) {
            // Show the first error as toast
            const firstError = validation.errors.name;
            toast.warn(firstError);
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('priority', data.priority.toString())
        if (data.imageUpload) {
            formData.append('image', data.imageUpload)
        }

        try {
            const res = await _brandStoreAction(formData);
            console.log('res USER', res)
            const { status, message } = res;
            switch (status) {
                case 1:
                    await getDataList();
                    clearErrors();
                    resetData();
                    setIsSubmitting(false);
                    setToggleModal(false)
                    toast.success(message);
                    return
                case 0:
                    setIsSubmitting(false);
                    toast.warn(message)
                    return
                default:
                    toast.success('Something went wrong, please try again.');
                    setIsSubmitting(false);
                    return
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setIsSubmitting(false);
            toast.error('Failed to save data. Please try again.');
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

                                <ImageInputDefault
                                    label='Image'
                                    name='image'
                                    value={data.image}
                                    onChange={(e) => setImage(e)}
                                    error={errors.name}
                                />
                                <SpacerPrimary />

                                <TextInputDefault
                                    label='Name:'
                                    name='name'
                                    type="text"
                                    value={data.name}
                                    placeholder='Enter your Name...'
                                    onChange={setInputValue}
                                    error={errors.name}
                                />
                                <SpacerPrimary />

                                <SelectAdminDefault
                                    label='Priority'
                                    name='priority'
                                    data={Array.from({ length: 4 }, (v, i) => i + 1)}
                                    value={data.priority}
                                    onChange={setInputValue}
                                    error={errors.priority.toString()}
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