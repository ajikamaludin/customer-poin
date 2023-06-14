import React, { useEffect, useState } from 'react'
import { router, Link } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { Head } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { useModalState } from '@/hooks'

import { hasPermission } from '@/utils'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Pagination from '@/Components/Pagination'
import SearchInput from '@/Components/SearchInput'
import ImportModal from './ImportModal'
import CustomerSelectionInput from '../Customer/SelectionInput'

export default function Customer(props) {
    const {
        query: { links, data },
        auth,
    } = props

    const [search, setSearch] = useState('')
    const [customer_id, setCustomerId] = useState(null)
    const preValue = usePrevious(`${search}-${customer_id}`)

    const importModal = useModalState()

    const toggleImportModal = () => {
        importModal.toggle()
    }

    const params = { q: search, customer_id: customer_id }
    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                { q: search, customer_id: customer_id },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search, customer_id])

    const canCreate = hasPermission(auth, 'create-customer-point')

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            flash={props.flash}
            page={'Point'}
            action={'List'}
        >
            <Head title="Point" />

            <div>
                <div className="mx-auto sm:px-6 lg:px-8 ">
                    <div className="p-6 overflow-hidden shadow-sm sm:rounded-lg bg-gray-200 dark:bg-gray-800 space-y-4">
                        <div className="flex flex-col md:flex-row justify-between gap-2">
                            {canCreate && (
                                <div className="flex flex-row gap-2 mt-1.5">
                                    <Link
                                        href={route('customer-point.create')}
                                        className="text-white bg-blue-700 border border-transparent hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:hover:bg-blue-600 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"
                                    >
                                        <span className="flex items-center rounded-md text-sm px-3 py-1.5">
                                            Create
                                        </span>
                                    </Link>
                                    <Button
                                        size="sm"
                                        outline
                                        onClick={() => toggleImportModal()}
                                    >
                                        Import
                                    </Button>
                                </div>
                            )}
                            <div className="flex flex-col md:flex-row gap-1 items-center">
                                <div className="mt-1.5 w-full">
                                    <CustomerSelectionInput
                                        itemSelected={customer_id}
                                        onItemSelected={(id) =>
                                            setCustomerId(id)
                                        }
                                        placeholder="filter customer"
                                    />
                                </div>
                                <div className="w-full">
                                    <SearchInput
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        value={search}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="overflow-auto">
                            <div>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Customer
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Point
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Description
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((point) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={point.id}
                                            >
                                                <td
                                                    scope="row"
                                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {point.customer.name} ({' '}
                                                    {point.customer.code} )
                                                </td>
                                                <td className="py-4 px-6">
                                                    {point.point}
                                                </td>
                                                <td className="py-4 px-6">
                                                    {point.description}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-full flex items-center justify-center">
                                <Pagination links={links} params={params} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ImportModal modalState={importModal} />
        </AuthenticatedLayout>
    )
}
