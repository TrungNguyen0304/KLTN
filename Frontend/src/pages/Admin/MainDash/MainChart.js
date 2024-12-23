import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MyChart = ({ payments, userCount }) => {
  // Chuẩn bị dữ liệu
  const paymentDates = payments.map((payment) => payment.date); // Ngày thanh toán
  const totalIncome = payments.map((payment) => payment.amount); // Tổng thu nhập
  const userCounts = new Array(payments.length).fill(userCount); // Số lượng người dùng cố định cho mỗi ngày

  const data = paymentDates.map((date, index) => ({
    date,
    totalIncome: totalIncome[index],
    userCount: userCounts[index],
  }));

  return (
    <div className="chart-container" style={{ height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalIncome" stroke="#82ca9d" name="Tổng thu nhập" /> {/* Đổi tên thành "Tổng thu nhập" */}
          <Line type="monotone" dataKey="userCount" stroke="#ff6f61" name="Số người dùng" /> {/* Đổi tên thành "Số người dùng" */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyChart;
