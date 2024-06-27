import React, { useState, useEffect } from 'react';
import { Typography, Space, Row, Col, Button, Modal, message } from 'antd';
import { DollarOutlined, UpCircleOutlined, DownCircleOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import TransactionCard from './TransactionCard';
import AddTransactionForm from './addtransactionform';
import './Dashboard.css';

const Dashboard = ({ user }) => {
    const [transactions, setTransactions] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState(null); // State to hold data for modal content
    const apiUrl = 'https://v1.nocodeapi.com/izmir123456/google_sheets/AEYbdWLtNngNVUkY?tabId=Sheet1';

    useEffect(() => {
        fetchData();
    }, []);

    const handleOk = async () => {
        try {
            // Example of sending email or any other action on OK click
            // Replace with your actual logic
            console.log('Mail sent');
            setIsModalVisible(false);
            message.success('Mail successfully sent');
        } catch (error) {
            console.error('Error sending mail', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(apiUrl);
            const money = response.data.data;

            const userTransactions = money.filter(item => item.id === user.id);

            const transactionsData = userTransactions.map(transaction => ({
                title: transaction.title,
                amount: parseFloat(transaction.amount),
                type: transaction.type,
                date: transaction.date,
            }));

            setTransactions(transactionsData);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleAddTransaction = (title, amount, type, date) => {
        const newTransaction = {
            title,
            amount: parseFloat(amount),
            type,
            date,
        };
        setTransactions([...transactions, newTransaction]);
    };

    const submit = async (values) => {
        const { title, amount, type, date } = values;
        if (title && amount && type) {
            try {
                const data = [
                    [
                        user.username,
                        user.password,
                        user.age,
                        user.phone,
                        user.email,
                        user.ev,
                        title,
                        parseFloat(amount),
                        type,
                        date,
                        user.id
                    ],
                ];

                await axios.post(apiUrl, data);
                handleAddTransaction(title, amount, type, date);
            } catch (error) {
                console.error('Error submitting data', error);
            }
        }
    };

    const calculateBalance = (transactions) => {
        const totalIncome = calculateIncome(transactions);
        const totalExpense = calculateExpense(transactions);
        return totalIncome - totalExpense;
    };

    const calculateIncome = (transactions) => {
        return transactions
            .filter(transaction => transaction.type === 'income')
            .reduce((acc, transaction) => acc + transaction.amount, 0);
    };

    const calculateExpense = (transactions) => {
        return transactions
            .filter(transaction => transaction.type === 'expense')
            .reduce((acc, transaction) => acc + transaction.amount, 0);
    };

    const calculateBalanceProgress = (transactions) => {
        const totalIncome = calculateIncome(transactions);
        const totalExpense = calculateExpense(transactions);
        const balance = totalIncome - totalExpense;

        if (totalIncome === 0) {
            return 0;
        }

        return Math.round((balance / totalIncome) * 100);
    };

    const calculateExpenseProgress = (transactions) => {
        const totalIncome = calculateIncome(transactions);
        const totalExpense = calculateExpense(transactions);

        if (totalIncome === 0) {
            return 0;
        }

        return Math.round((totalExpense / totalIncome) * 100);
    };

    const showModal = async () => {
        // Example of fetching modal content, you can customize as per your needs
        try {
            const response = await axios.get(apiUrl);
            const modalData = response.data.data; // Assuming this is what you want to display
            setModalData(modalData);
            setIsModalVisible(true);
        } catch (error) {
            console.error('Error fetching modal data', error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setModalData(null); // Clear modal data on close
    };

    return (
        <div className="dashboard-container">
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Row gutter={[16, 16]}>
                <Col span={18}>
                    <Space direction="horizontal" size={30}>
                        <div className="balance-card">
                            <TransactionCard
                                icon={<DollarOutlined style={{ backgroundColor: 'rgba(255, 255, 0, 0.9)', borderRadius: 25, fontSize: 25, padding: 8 }} />}
                                title="Balance"
                                value={calculateBalance(transactions)}
                                progress={calculateBalanceProgress(transactions)}
                            />
                        </div>
                        <div className="income-card">
                            <TransactionCard
                                icon={<UpCircleOutlined style={{ backgroundColor: 'lightgreen', borderRadius: 20, fontSize: 25, padding: 8 }} />}
                                title="Income"
                                value={calculateIncome(transactions)}
                                progress={100}
                            />
                        </div>
                        <div className="expenses-card">
                            <TransactionCard
                                icon={<DownCircleOutlined style={{ backgroundColor: 'rgba(255, 0, 0, 0.50)', borderRadius: 20, fontSize: 25, padding: 8 }} />}
                                title="Expenses"
                                value={calculateExpense(transactions)}
                                progress={calculateExpenseProgress(transactions)}
                            />
                        </div>
                    </Space>
                    <Typography.Title level={4} style={{ marginTop: 20 }}>Transactions</Typography.Title>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        {transactions.map((transaction, index) => (
                            <TransactionCard
                                key={index}
                                title={transaction.title}
                                value={transaction.amount}
                                type={transaction.type === 'income' ? 'Income' : 'Expense'}
                                color={transaction.type === 'income' ? 'lightgreen' : 'rgba(255, 0, 0, 0.50)'}
                            />
                        ))}
                    </div>
                </Col>
                <Col span={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <AddTransactionForm onAddTransaction={submit} />
                    <Button icon={<MailOutlined />} type="primary" onClick={showModal} style={{ marginTop: 1 }}>Get Report</Button>
                </Col>
            </Row>

            <Modal
                title="Transaction Details"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="ok" type="primary" onClick={handleOk}>
                        Send Mail
                    </Button>,
                ]}
            >
                {modalData && (
                    <div>
                        {/* Example of displaying data in modal */}
                        <ul>
                            {modalData.map((item, index) => (
                                <li key={index}>
                                    {item.title} - ${item.amount} - {item.date}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {!modalData && (
                    <p>Loading...</p>
                )}
            </Modal>

        </div>
    );
};

export default Dashboard;
