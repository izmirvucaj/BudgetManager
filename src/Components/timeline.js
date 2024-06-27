import React, { useState, useEffect } from 'react';
import { Timeline, Typography } from 'antd';
import axios from 'axios';
import './timeline.css'; // CSS dosyasını import ediyoruz

const Time = ({ user }) => {
    const [transactions, setTransactions] = useState([]);
    const apiUrl = 'https://v1.nocodeapi.com/izmir123456/google_sheets/AEYbdWLtNngNVUkY?tabId=Sheet1';

    useEffect(() => {
        fetchData();
    }, []);

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

    const renderTimelineItems = () => {
        return transactions.map((transaction, index) => (
            <Timeline.Item key={index} color={transaction.type === 'income' ? 'green' : 'red'}>
                {transaction.date} - {transaction.title}: ${transaction.amount}
            </Timeline.Item>
        ));
    };

    return (
        <div className='timeline-wrapper'>
            <Typography.Title level={4}>Transaction Timeline</Typography.Title>
            <Timeline>
                {renderTimelineItems()}
            </Timeline>
        </div>
    );
};

export default Time;
