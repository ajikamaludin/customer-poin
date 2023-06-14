import React, { useEffect } from 'react'
import Modal from '@/Components/Modal'
import { useForm } from '@inertiajs/react'
import Button from '@/Components/Button'
import FormInput from '@/Components/FormInput'
import { isEmpty } from 'lodash'

export default function FormModal(props) {
    const { modalState } = props
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            code: '',
            name: '',
            point: 0,
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

    const handleReset = () => {
        modalState.setData(null)
        reset()
        clearErrors()
    }

    const handleClose = () => {
        handleReset()
        modalState.toggle()
    }

    const handleSubmit = () => {
        const customer = modalState.data
        if (customer !== null) {
            put(route('customer.update', customer), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('customer.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const customer = modalState.data
        if (isEmpty(customer) === false) {
            setData({
                name: customer.name,
                code: customer.code,
                point: customer.last_point,
            })
            return
        }
    }, [modalState])

    return (
        <Modal
            isOpen={modalState.isOpen}
            toggle={handleClose}
            title={'Customer'}
        >
            <FormInput
                name="code"
                value={data.code}
                onChange={handleOnChange}
                label="Code"
                error={errors.code}
            />
            <FormInput
                name="name"
                value={data.name}
                onChange={handleOnChange}
                label="Name"
                error={errors.name}
            />
            <FormInput
                type="number"
                name="point"
                value={data.point}
                onChange={handleOnChange}
                label="Point"
                error={errors.point}
            />
            <div className="flex items-center">
                <Button onClick={handleSubmit} processing={processing}>
                    Simpan
                </Button>
                <Button onClick={handleClose} type="secondary">
                    Batal
                </Button>
            </div>
        </Modal>
    )
}
