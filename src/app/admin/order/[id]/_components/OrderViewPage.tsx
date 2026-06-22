"use client"

import SpacerDefault from '@/_components/spacers/SpacerDefault'
import SpacerPrimary from '@/_components/spacers/SpacerPrimary'
import { useOrderStore } from '../../../_data/store/useOrderStore'
import HeadingDefault from '@/app/admin/_components/headings/HeadingDefault'
import ButtonAdmin from '@/app/admin/_components/buttons/ButtonAdmin'
import RecordDefault from '@/app/admin/_components/records/RecordDefault'
import { useEffect } from 'react'
import { valueWithFallback } from '@/_utils/StringManipulation'
import { formatDate } from '@/_utils/formatDate'
import LoaderPrimary from '@/app/admin/_components/loaders/LoaderPrimary'
import StickerDefault from '@/app/admin/_components/stickers/StickerDefault'

const title = "View Order"

interface Props {
    id: string | number
    dbData: any
}

export default function OrderViewPage({ dbData, id }: Props) {
    const {
        setData,
        toggleModal,
        setToggleModal,
    } = useOrderStore()

    useEffect(() => {
        if (dbData?.data) {
            // Normalize fields that the API may return as objects (e.g. { id, name })
            // so only plain strings reach the store and the React tree.
            const raw = dbData.data
            const normalized = {
                ...raw,
                status:
                    raw.status && typeof raw.status === 'object'
                        ? (raw.status as { id?: string; name?: string }).name ??
                        (raw.status as { id?: string }).id ??
                        ''
                        : raw.status ?? '',
                priority:
                    raw.priority && typeof raw.priority === 'object'
                        ? (raw.priority as { id?: string; name?: string }).name ??
                        (raw.priority as { id?: string }).id ??
                        ''
                        : raw.priority ?? '',
            }
            setData(normalized)
        }
    }, [dbData?.data, setData])

    const handleToggleModal = () => {
        setToggleModal(!toggleModal)
    }

    return (
        <>
            <SpacerDefault />
            <HeadingDefault title={title} />
            <SpacerPrimary />

            <section className='container__primary flex items-center justify-end'>
                <ButtonAdmin
                    type='button'
                    name='Edit'
                    onClick={handleToggleModal}
                    css='py-2 px-6' />
            </section>

            <MainDataSection />
            <SpacerDefault />
        </>
    )
}

function MainDataSection() {
    const {
        preData,
        isLoading,
    } = useOrderStore()

    const updated = preData.updatedAt ? formatDate(preData.updatedAt) : 'Not Added yet.'

    // isLoading starts as `true` in the store, so this covers the first render
    if (isLoading) return <LoaderPrimary />

    return (
        <section className='container__primary bg-white drop-shadow-lg rounded-lg p-6 space-y-4'>
            <RecordDefault label='Order Ref' value={valueWithFallback(preData.orderRef)} />
            <RecordDefault label='Car Name' value={valueWithFallback(preData.carName)} />
            <RecordDefault label='Car Price' value={preData.carPrice ? `$${preData.carPrice.toLocaleString()}` : '—'} />
            <hr className="border-gray-200 my-2" />
            <RecordDefault label='Customer Name' value={valueWithFallback(preData.customerName)} />
            <RecordDefault label='Customer Email' value={valueWithFallback(preData.customerEmail)} />
            <RecordDefault label='Customer Phone' value={valueWithFallback(preData.customerPhone)} />
            <RecordDefault
                label='Status'
                value={<StickerDefault label={valueWithFallback(preData.status)} css='px-1.5 py-0.5' />}
            />
            <RecordDefault label='Notes' value={valueWithFallback(preData.notes)} />
            <RecordDefault label='Updated At' value={updated} />
            <SpacerPrimary />
        </section>
    )
}