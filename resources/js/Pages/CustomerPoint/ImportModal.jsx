import React, { useEffect, useRef } from 'react'
import { useForm } from '@inertiajs/react'
import Modal from '@/Components/Modal'
import Button from '@/Components/Button'
export default function ImportModal(props) {
    const { modalState } = props

    const { data, setData, post, progress, processing, errors, clearErrors } =
        useForm({
            file: null,
        })

    const inputFileImport = useRef()

    const handleReset = () => {
        setData({ file: null })
        inputFileImport.current.value = ''
        clearErrors()
    }

    const handleCancel = () => {
        modalState.toggle()
        handleReset()
    }

    const handleClose = () => {
        handleReset()
        modalState.toggle()
    }

    function handleSubmit(e) {
        e.preventDefault()
        post(route('customer-point.import'), {
            forceFormData: false,
            onSuccess: () => Promise.all([handleReset(), modalState.toggle()]),
        })
        return
    }

    return (
        <Modal
            isOpen={modalState.isOpen}
            toggle={handleClose}
            title={'Import Point'}
        >
            <div
                className={`flex flex-row items-center gap-2 border rounded-md ${
                    errors.file && 'border-red-600'
                }`}
                onClick={() => {
                    console.log(inputFileImport.current.click())
                }}
            >
                <div className="px-2 py-1 bg-gray-200 hover:bg-gray-400 font-bold rounded-l-md">
                    Pilih File:{' '}
                </div>
                <div>{data.file ? data.file.name : 'Pilih File'}</div>
            </div>
            <div className="text-sm text-red-600">{errors.file}</div>
            <input
                ref={inputFileImport}
                type="file"
                className="hidden"
                onChange={(e) => setData('file', e.target.files[0])}
            />
            {progress && (
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                        style={{ width: progress.percentage + '%' }}
                    >
                        {' '}
                        {progress.percentage}%
                    </div>
                </div>
            )}

            <p className="text-sm text-gray-500">
                Unduh format file import{' '}
                <a
                    className="underline text-blue-500"
                    href="/point.csv"
                    download="point.csv"
                >
                    disini
                </a>
            </p>
            <div className="flex justify-between mt-4 space-x-4">
                <Button onClick={handleSubmit} processing={processing}>
                    Upload
                </Button>
                <Button
                    type="secondary"
                    onClick={handleCancel}
                    processing={processing}
                >
                    Batal
                </Button>
            </div>
        </Modal>
    )
}
