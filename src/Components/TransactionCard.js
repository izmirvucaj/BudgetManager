import React from 'react';
import { Card, Space, Statistic, Progress } from 'antd';
import { DollarOutlined, UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';

const TransactionCard = ({ title, value, icon, progress, type }) => {
    let cardIcon;
    let cardColor;

    // transaction tip cekimi ve renk belirtme yeri.
    
    if (type === 'income') {
        cardIcon = <UpCircleOutlined style={{ color: 'lightgreen', fontSize: 25 }} />;
        cardColor = 'lightgreen';
    } else if (type === 'expense') {
        cardIcon = <DownCircleOutlined style={{ color: 'yellow', fontSize: 25 }} />;
        cardColor = 'rgba(255, 0, 0, 0.10)';
    } else {
        cardIcon = <DollarOutlined style={{ color: 'rgba(255, 255, 0, 0.9)', fontSize: 25 }} />;
        cardColor = 'rgba(255, 255, 0, 0.1)';
    }

    return (
        <Card style={{ width: 300, textAlign: 'center', backgroundColor: cardColor }}>
            <Space direction="horizontal" align="center">
                {icon ? icon : cardIcon}
                <Statistic title={title} value={value} />
                {progress !== undefined && (
                    <Progress type="circle" percent={progress} width={50} />
                )}
            </Space>
        </Card>
    );
};

export default TransactionCard;
