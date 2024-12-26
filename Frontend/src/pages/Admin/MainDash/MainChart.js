import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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
    <div className="chart-containeradmin" style={{ height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          {/* Thang đo Y đầu tiên cho tổng thu nhập */}
          <YAxis
            yAxisId="left"
            tickFormatter={(value) => `${value / 1000}k`} // Hiển thị đơn vị ngàn
            domain={[0, 'auto']} // Tự động điều chỉnh phạm vi
            label={{ value: 'Tổng thu nhập (VNĐ)', angle: -90, position: 'insideLeft' }}
          />
          {/* Thang đo Y thứ hai cho số người dùng */}
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, Math.max(...userCounts) + 5]} // Đặt phạm vi tùy chỉnh
            tickFormatter={(value) => `${value}`} // Hiển thị giá trị trực tiếp
            label={{ value: 'Số người dùng', angle: -90, position: 'insideRight' }}
          />
          <Tooltip />
          <Legend />
          {/* Đường biểu diễn tổng thu nhập */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="totalIncome"
            stroke="#82ca9d"
            name="Tổng thu nhập"
          />
          {/* Đường biểu diễn số người dùng */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="userCount"
            stroke="#ff6f61"
            name="Số người dùng"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyChart;
