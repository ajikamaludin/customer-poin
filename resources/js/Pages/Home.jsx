import React, { useEffect } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/Components/Defaults/InputError'
import { Head, Link, useForm } from '@inertiajs/react'
import { Button, TextInput, Label, Checkbox, Spinner } from 'flowbite-react'

export default function Login({ app_name, customer, point }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        customer_code: '',
    })

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        )
    }

    const handleKeyDown = (e) => {
        if (e.code === 'Enter') {
            post(route('home'))
        }
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('home'))
    }

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <Head title="Check Point" />
            <div className="w-full max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                <div className="w-full text-center mt-5 mb-10 h-20 fill-current text-gray-500 text-5xl font-bold">
                    {app_name}
                </div>

                <form onSubmit={submit}>
                    <div>
                        <TextInput
                            type="text"
                            name="customer_code"
                            value={data.customer_code}
                            autoFocus={true}
                            onChange={onHandleChange}
                            placeholder="Customer Code"
                            onKeyDown={handleKeyDown}
                        />

                        <InputError
                            message={errors.customer_code}
                            className="mt-5"
                        />
                    </div>
                    {customer !== null && (
                        <div
                            className="p-4 my-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                            role="alert"
                        >
                            <div className="text-lg">
                                Customer:{' '}
                                <span className="font-bold">{customer}</span>
                            </div>
                            <div className="text-lg">
                                Point:{' '}
                                <span className="font-bold">{point}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-end mt-4">
                        <Button onClick={submit} disabled={processing}>
                            {processing ? <Spinner /> : 'Check'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
