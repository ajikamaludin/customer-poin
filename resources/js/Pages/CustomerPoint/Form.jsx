import React from 'react'
import { Head, useForm } from '@inertiajs/react'

import { useModalState } from '@/hooks'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Button from '@/Components/Button'
import CustomerSelectionModal from './CustomerSelectionModal'
import FormInput from '@/Components/FormInput'
import { HiXCircle } from 'react-icons/hi2'

export default function Setting(props) {
    const { data, setData, post, processing, errors } = useForm({
        items: [],
    })

    const customerSelectionModal = useModalState()

    const addItem = (customer) => {
        const isExists = data.items.find((i) => i.customer.id === customer.id)
        if (!isExists) {
            let items = data.items.concat({
                customer: customer,
                customer_id: customer.id,
                point: 0,
                description: '',
            })
            setData('items', items)
        }
    }

    const removeItem = (index) => {
        let items = data.items.filter((_, i) => i !== index)
        setData('items', items)
    }

    const handleChangeValue = (name, value, index) => {
        setData(
            'items',
            data.items.map((item, i) => {
                if (i === index) {
                    item[name] = value
                }
                return item
            })
        )
    }

    const handleSubmit = () => {
        post(route('customer-point.store'))
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            flash={props.flash}
            page={'Point'}
            action={'Form'}
        >
            <Head title="Point" />

            <div>
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden p-4 shadow-sm sm:rounded-lg bg-white dark:bg-gray-800 flex flex-col">
                        <div className="text-xl font-bold mb-4">Point</div>
                        <div className="border rounded-md p-2">
                            <Button
                                size="sm"
                                onClick={customerSelectionModal.toggle}
                            >
                                Tambah
                            </Button>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="py-3 px-6">
                                            Customer
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Point
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Description
                                        </th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.items.map((item, index) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={index}
                                        >
                                            <td
                                                scope="row"
                                                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {item.customer.name} ({' '}
                                                {item.customer.code} )
                                            </td>
                                            <td className="py-4 px-6">
                                                <FormInput
                                                    type="number"
                                                    value={item.point}
                                                    onChange={(e) =>
                                                        handleChangeValue(
                                                            'point',
                                                            e.target.value,
                                                            index
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="py-4 px-6">
                                                <FormInput
                                                    value={item.description}
                                                    onChange={(e) =>
                                                        handleChangeValue(
                                                            'description',
                                                            e.target.value,
                                                            index
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="py-4 px-6">
                                                <HiXCircle
                                                    className="w-5 h-5 text-red-600"
                                                    onClick={() =>
                                                        removeItem(index)
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-2">
                            <Button
                                onClick={handleSubmit}
                                processing={processing}
                            >
                                Simpan
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <CustomerSelectionModal
                onItemSelected={addItem}
                modalState={customerSelectionModal}
            />
        </AuthenticatedLayout>
    )
}
