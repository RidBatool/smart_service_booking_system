import React from "react";

const BookingsTable = ({ bookings }) => {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Vehicle</th>
            <th>Date</th>
            <th>Service</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>
                {booking.customerFirstName} {booking.customerLastName}
              </td>
              <td>{booking.customerContactNumber}</td>
              <td>{booking.customerEmail}</td>
              <td>
                {booking.vehicleMake} {booking.vehicleModel} (
                {booking.vehicleReg})
              </td>
              <td>{booking.bookingDate}</td>
              <td>{booking.serviceOption}</td>
              <td>
                <span className="admin-status">{booking.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
