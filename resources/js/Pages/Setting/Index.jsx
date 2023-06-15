import React from 'react'
import { Head, useForm, router } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import { useModalState } from '@/hooks'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FormInput from '@/Components/FormInput'
import Button from '@/Components/Button'
import ModalConfirm from '@/Components/ModalConfirm'

const extractValue = (set, key) => {
    const find = set.find((s) => s.key === key)
    if (isEmpty(find) === false) {
        if (find.type === 'image') {
            return find?.url
        }
        return find?.value
    }
    return ''
}

export default function Setting(props) {
    const { setting } = props

    const { data, setData, post, processing, errors } = useForm({
        app_name: extractValue(setting, 'app_name'),
    })

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                    ? 1
                    : 0
                : event.target.value
        )
    }

    const handleSubmit = () => {
        post(route('setting.update'))
    }

    const confirmModal = useModalState()

    const onReset = () => {
        router.post(route('setting.reset'))
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            flash={props.flash}
            page={'Setting'}
            action={''}
        >
            <Head title="Setting" />

            <div>
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden p-4 shadow-sm sm:rounded-lg bg-white dark:bg-gray-800 flex flex-col">
                        <div className="text-xl font-bold mb-4">Setting</div>
                        <FormInput
                            name="app_name"
                            value={data.app_name}
                            onChange={handleOnChange}
                            label="App Name"
                            error={errors.app_name}
                        />
                        <div className="mt-2">
                            <Button
                                onClick={handleSubmit}
                                processing={processing}
                            >
                                Simpan
                            </Button>
                        </div>
                        <div className="mt-5 border rounded-md p-4 flex flex-col">
                            <label className="font-bold mb-2">
                                Reset All Data
                            </label>
                            <div>
                                <Button
                                    type="danger"
                                    onClick={confirmModal.toggle}
                                >
                                    Reset
                                </Button>
                            </div>
                            <ModalConfirm
                                modalState={confirmModal}
                                onConfirm={onReset}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
