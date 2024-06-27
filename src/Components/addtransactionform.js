import React from 'react';
import { Form, Input, Button, Select, Typography, DatePicker,Modal } from 'antd';

const { Option } = Select;

const AddTransactionForm = ({ onAddTransaction }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        // Add the date value to the values object before passing to onAddTransaction
        values.date = values.date ? values.date.format('YYYY-MM-DD') : null;
        onAddTransaction(values);
        form.resetFields();
    };

    
    return (
        <div>
            <Typography.Title level={4} style={{textAlign:'center'}}>Add Transaction</Typography.Title>
            <Form
                form={form}
                onFinish={handleFinish}
                className="add-transaction-form"
                layout="vertical"
            >
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: 'Please enter the title' }]}
                >
                    <Input placeholder="Title" style={{ width: 310 }} />
                </Form.Item>
                <Form.Item
                    name="amount"
                    rules={[{ required: true, message: 'Please enter the amount' }]}
                >
                    <Input type="number" placeholder="Amount" style={{ width: 310 }} />
                </Form.Item>
                <Form.Item
                    name="type"
                    rules={[{ required: true, message: 'Please select the type' }]}
                >
                    <Select placeholder="Type" style={{ width: 310 }}>
                        <Option value="income">Income</Option>
                        <Option value="expense">Expense</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="date"
                    rules={[{ required: true, message: 'Please select the date' }]}
                >
                    <DatePicker style={{ width: 310 }} />
                </Form.Item>
                <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" htmlType="submit">Add Transaction</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddTransactionForm;
