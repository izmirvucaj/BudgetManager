import React, { useState, useEffect } from 'react';
import { Calendar, Badge } from 'antd';
import axios from 'axios';
import './Calendar.css';

const Cal = ({ user }) => {
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
            console.log(transactionsData);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const getListData = (value) => {
        const dateStr = value.format('YYYY-MM-DD');
        return transactions.filter(transaction => transaction.date === dateStr).map(transaction => ({
            type: transaction.type === 'income' ? 'success' : 'error',
            content: `${transaction.title} - $${transaction.amount}`,
        }));
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <div className="events">
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </div>
        );
    };

    return (
        <div className='calendar-wrapper'>
            <div className='calendar-container'>
                <Calendar dateCellRender={dateCellRender} />
            </div>
        </div>
    );
};

export default Cal;
