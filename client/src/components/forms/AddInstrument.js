import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { Form, Input, Button } from 'antd'

import { v4 as uuidv4 } from 'uuid'

import { ADD_INSTRUMENT, GET_INSTRUMENTS } from '../../queries'

const AddInstrument = () => {
    const [id] = useState(uuidv4())
    const [addInstrument] = useMutation(ADD_INSTRUMENT)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {
        const { year, brand, type, price, artistId } = values

        addInstrument({
            variables: {
                id,
                year,
                brand,
                type,
                price,
                artistId,
            },
            optimisticResponse: {
                __typename: 'Mutation',
                addInstrument: {
                    __typename: 'Instrument',
                    id,
                    year,
                    brand,
                    type,
                    price,
                    artistId
                }
            },
            update: (proxy, { data: { addInstrument } }) => {
                const data = proxy.readQuery({ query: GET_INSTRUMENTS })
                proxy.writeQuery({
                    query: GET_INSTRUMENTS,
                    data: {
                        ...data,
                        instruments: [...data.instruments, addInstrument]
                    }
                })
            }
        })
    }

    return (
        <Form
            form={form}
            name='add-instrument-form'
            layout='inline'
            onFinish={onFinish}
            size='large'
            style={{ marginBottom: '40px' }}
        >
            <Form.Item
                name='year'
                rules={[{ required: true, message: 'Please input the year!' }]}
            >
                <Input placeholder='i.e. 2020' />
            </Form.Item>
            <Form.Item
                name='brand'
                rules={[{ required: true, message: 'Please input the brand!' }]}
            >
                <Input placeholder='i.e. Yamaha' />
            </Form.Item>
            <Form.Item
                name='type'
                rules={[{ required: true, message: 'Please input the type!' }]}
            >
                <Input placeholder='i.e. Guitar' />
            </Form.Item>
            <Form.Item
                name='price'
                rules={[{ required: true, message: 'Please input the price!' }]}
            >
                <Input placeholder='i.e. 1234' />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Add instrument
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default AddInstrument
