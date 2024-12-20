import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


const IndexShowall = () => {
  const location = useLocation();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu payment từ state được truyền qua react-router
    const state = location.state || {};
    if (state.payments) {
      setPayments(state.payments);
    }
  }, [location.state]);

  return (
    <div className="payment-container">
      <h1>Danh sách thanh toán</h1>
      {payments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã đơn hàng</th>
              <th>Tên gói</th>
              <th>Số tiền</th>
              <th>Phương thức thanh toán</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.order_id}</td>
                <td>{payment.packageId?.package_name || "N/A"}</td>
                <td>{payment.amount}</td>
                <td>{payment.method}</td>
                <td>{payment.status}</td>
                <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Không có dữ liệu thanh toán.</p>
      )}
    </div>
  );
};

export default IndexShowall;
