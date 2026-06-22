"use client"

import React, { useEffect, useMemo } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useCarStore } from '../../_data/store/useCarStore';
import { toast } from 'react-toastify';
import ButtonAdminClose from '../../_components/buttons/ButtonAdminClose';
import SpacerPrimary from '@/_components/spacers/SpacerPrimary';
import HeadingSecondary from '../../_components/headings/HeadingSecondary';
import TextInputDefault from '../../_components/forms/inputs/TextInputDefault';
import { ButtonAdminSubmit } from '../../_components/buttons/ButtonAdminSubmit';
import SelectAdminDefault from '../../_components/forms/selects/SelectAdminDefault';
import ImageInputDefault from '../../_components/forms/image/ImageInputDefault';
import { _carStoreAction } from '../../_data/actions/CarActions';
import { PriorityData } from '../../_data/sample/PriorityData';
import { ConditionData, FuelData, TransmissionData } from '../../_data/sample/CarData';
import SelectAdminTwo from '../../_components/forms/selects/SelectAdminTwo';
import TextAreaInputDefault from '../../_components/forms/textareas/TextAreaInputDefault';
import { getPastNumberedYears } from '@/_utils/formatDate';
import IconDefault from '@/_components/icons/IconDefault';

const title = "Add Car"

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

// Define the structure of a single Brand item
interface BrandItem {
    id: string | number;
    name: string;
    [key: string]: any; // Allows other dynamic properties if they exist
}

interface Props {
    brandData: {
        data: BrandItem[];
    }
}

export default function CarAddModal({ brandData }: Props) {
    const {
        data,
        errors,
        toggleModal,
        isSubmitting,
        imagesList,
        properties,
        getDataList,
        resetData,
        setInputValue,
        setToggleModal,
        clearErrors,
        setIsSubmitting,
        validateForm,
    } = useCarStore()


    const brandsList = useMemo(() => {
        if (!brandData?.data) return [];
        return brandData.data
            .filter((item: BrandItem) => item.id)
            .map((item: BrandItem) => ({ ...item, value: item.id }));
    }, [brandData]);


    useEffect(() => {
        resetData()
    }, [])

    const handleToggleModal = () => {
        setToggleModal(!toggleModal)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        clearErrors();
        e.preventDefault();

        // Validate form using store
        const validation = validateForm();
        if (!validation.isValid) {
            const errorMessages = Object.values(validation.errors).filter(Boolean);
            if (errorMessages.length > 0) {
                toast.warn(errorMessages[0] as string);
            }
            return;
        }
        setIsSubmitting(true);

        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('price', data.price ? data.price.toString() : '0')
        formData.append('mileage', data.mileage ? data.mileage.toString() : '0')
        formData.append('engineCapacity', data.engineCapacity || '')
        formData.append('condition', data.condition)
        formData.append('transmission', data.transmission)
        formData.append('fuel', data.fuel)
        formData.append('year', data.year ? data.year.toString() : '')
        formData.append('priority', data.priority ? data.priority.toString() : '0')
        formData.append('description', data.description || '')
        formData.append('brandId', data.brandId.toString() || '')

        // 1. Appending Images as a true array format
        imagesList.forEach((img) => {
            if (img?.imageFile) {
                // Adding [] tells PHP to treat this as an array of files
                formData.append('images[]', img.imageFile);
            }
        });

        // 2. Appending dynamic properties array structurally
        if (properties && properties.length > 0) {
            properties.forEach((prop, index) => {
                if (prop.name || prop.value) {
                    formData.append(`properties[${index}][name]`, String(prop.name || ''));
                    formData.append(`properties[${index}][value]`, String(prop.value !== null && prop.value !== undefined ? prop.value : ''));
                }
            });
        }

        console.log('data:: ', data)
        console.log('properties:: ', properties)
        console.log('IAMGES:: ', imagesList)
        console.log("Form Data Object:", Object.fromEntries(formData.entries()));


        try {
            const res = await _carStoreAction(formData);
            console.log('res USER', res)
            const { status, message } = res;
            switch (status) {
                case 1:
                    await getDataList();
                    clearErrors();
                    resetData();
                    setIsSubmitting(false);
                    setToggleModal(false)
                    toast.success(message || 'Car added successfully!');
                    return
                case 0:
                    setIsSubmitting(false);
                    toast.warn(message || 'Failed to add car.')
                    return
                default:
                    toast.error('Something went wrong, please try again.');
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
                    className="w-screen h-screen fixed top-0 left-0 z-200 overflow-y-auto">
                    <div className='absolute z-0 top-0 left-0 w-full h-full bg-black opacity-40' onClick={handleToggleModal}></div>
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
                                    label='Name'
                                    name='name'
                                    type="text"
                                    value={data.name}
                                    placeholder='Enter your Name...'
                                    onChange={setInputValue}
                                    error={errors.name ? String(errors.name) : undefined}
                                />
                                <SpacerPrimary />

                                <div className='grid grid-cols-2 gap-4'>
                                    <TextInputDefault
                                        label='Price'
                                        name='price'
                                        type="number"
                                        value={data.price}
                                        placeholder='Enter your Price...'
                                        onChange={setInputValue}
                                        error={errors.price ? String(errors.price) : undefined}
                                    />
                                    <TextInputDefault
                                        label='Mileage'
                                        name='mileage'
                                        type="number"
                                        value={data.mileage}
                                        placeholder='Enter your Mileage...'
                                        onChange={setInputValue}
                                        error={errors.mileage ? String(errors.mileage) : undefined}
                                    />

                                    <TextInputDefault
                                        label='Engine Capacity'
                                        name='engineCapacity'
                                        type="text"
                                        value={data.engineCapacity}
                                        placeholder='Enter your Engine Capacity...'
                                        onChange={setInputValue}
                                        error={errors.engineCapacity ? String(errors.engineCapacity) : undefined}
                                    />

                                    <SelectAdminDefault
                                        label='Condition'
                                        name='condition'
                                        data={ConditionData}
                                        value={data.condition}
                                        onChange={setInputValue}
                                        error={errors.condition ? String(errors.condition) : undefined}
                                    />
                                    <SelectAdminDefault
                                        label='Transmission'
                                        name='transmission'
                                        data={TransmissionData}
                                        value={data.transmission}
                                        onChange={setInputValue}
                                        error={errors.transmission ? String(errors.transmission) : undefined}
                                    />
                                    <SelectAdminDefault
                                        label='Fuel'
                                        name='fuel'
                                        data={FuelData}
                                        value={data.fuel}
                                        onChange={setInputValue}
                                        error={errors.fuel ? String(errors.fuel) : undefined}
                                    />

                                    <SelectAdminDefault
                                        label='Year'
                                        name='year'
                                        data={getPastNumberedYears(20)}
                                        value={data.year}
                                        onChange={setInputValue}
                                        error={errors.year ? String(errors.year) : undefined}
                                    />

                                    <SelectAdminDefault
                                        label='Priority'
                                        name='priority'
                                        data={PriorityData}
                                        value={data.priority}
                                        onChange={setInputValue}
                                        error={errors.priority ? String(errors.priority) : undefined}
                                    />
                                </div>

                                <SpacerPrimary />
                                <SelectAdminTwo
                                    label='Brand'
                                    name='brandId'
                                    data={brandsList}
                                    value={data.brandId}
                                    onChange={setInputValue}
                                    error={errors.brandId ? String(errors.brandId) : undefined}
                                />

                                <SpacerPrimary />
                                <TextAreaInputDefault
                                    label='Description'
                                    name='description'
                                    value={data.description}
                                    placeholder='Enter your Description...'
                                    onChange={setInputValue}
                                    error={errors.description ? String(errors.description) : undefined}
                                />
                                <SpacerPrimary />

                                <PropertySection />
                                <SpacerPrimary />

                                <ImagesSection />
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



function PropertySection() {
    const { currentProperty, addCurrentProperty, setProperty, removeProperty, properties } = useCarStore()

    const handleAdd = () => {
        setProperty(currentProperty)
    }

    const handleRemove = (id: string | number) => {
        removeProperty(id)
    }

    return (
        <>
            <div className='font-light text-xl'>
                Property Info
            </div>
            <div className='grid grid-cols-7 gap-4 border-y border-gray-300 py-3'>
                <div className='col-span-3'>
                    <TextInputDefault
                        name='name'
                        type="text"
                        value={currentProperty.name}
                        placeholder='Enter your Name...'
                        onChange={(e) => addCurrentProperty('name', e.target.value)}
                    />
                </div>
                <div className='col-span-3'>
                    <TextInputDefault
                        name='value'
                        type="text"
                        value={currentProperty.value}
                        placeholder='Enter your Value...'
                        onChange={(e) => addCurrentProperty('value', e.target.value)}
                    />
                </div>
                <div className='col-span-1 w-full h-full flex items-center justify-center'>
                    <motion.button
                        className='cursor-pointer'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleAdd}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        type='button'>
                        <IconDefault type='add' css='text-3xl text-blue-600' />
                    </motion.button>
                </div>
            </div>

            {properties.length > 0 && (
                <div className='border-b border-gray-300 py-3'>
                    {properties.map((i) => (
                        <div key={i.id} className='grid grid-cols-7 gap-4 border border-gray-200 mb-2 last:mb-0'>
                            <div className='col-span-3 py-1 px-3 border-r border-gray-300'>
                                {i.name}
                            </div>
                            <div className='col-span-3 py-1 px-3 border-r border-gray-300'>
                                {i.value}
                            </div>
                            <div className='col-span-1 w-full h-full flex items-center justify-center'>
                                <motion.button
                                    onClick={() => handleRemove(i.id)}
                                    className='cursor-pointer'
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    type='button'>
                                    <IconDefault type='remove' css='text-2xl text-red-600' />
                                </motion.button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}


function ImagesSection() {
    const {
        imagesList,
        setImage,
    } = useCarStore()
    return (
        <>
            <div className='col-span-2 font-light text-xl'>
                Images
            </div>
            <div className='w-full grid grid-cols-2 gap-6'>
                <ImageInputDefault
                    label='Image 1'
                    name='image1'
                    value={imagesList[0]?.image || ''}
                    onChange={(e) => setImage(e, 1)}
                />
                <ImageInputDefault
                    label='Image 2'
                    name='image2'
                    value={imagesList[1]?.image || ''}
                    onChange={(e) => setImage(e, 2)}
                />
                <ImageInputDefault
                    label='Image 3'
                    name='image3'
                    value={imagesList[2]?.image || ''}
                    onChange={(e) => setImage(e, 3)}
                />
                <ImageInputDefault
                    label='Image 4'
                    name='image4'
                    value={imagesList[3]?.image || ''}
                    onChange={(e) => setImage(e, 4)}
                />
            </div>
        </>
    )
}