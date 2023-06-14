import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { formatIDR } from '@/utils'

export default function Dashboard(props) {
    const { customer_count } = props
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            flash={props.flash}
            page={'Dashboard'}
            action={''}
        >
            <Head title="Dashboard" />

            <div>
                <div className="mx-auto sm:px-6 lg:px-8 ">
                    <div className="">
                        <div className="grid grid-cols-4 gap-1">
                            <div className="px-3 py-2 flex flex-col rounded-md bg-white shadow-md">
                                <div className="text-2xl">Total Customer</div>
                                <div className="text-3xl font-bold">
                                    {formatIDR(customer_count)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
