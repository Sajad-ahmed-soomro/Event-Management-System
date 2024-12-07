import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomeStyle.css";

const SponsorshipDashboard = () => {
  const [sponsorships, setSponsorships] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState({
    pendingPayments: [],
    refunds: [],
  });

  useEffect(() => {
    fetchSponsorshipRequests();
    fetchPaymentStatus();
  }, []);

  const fetchSponsorshipRequests = async () => {
    try {
      const response = await axios.get("/api/sponsor/requests", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSponsorships(response.data);
    } catch (error) {
      console.error("Error fetching sponsorship requests:", error);
    }
  };

  const fetchPaymentStatus = async () => {
    try {
      const response = await axios.get("/api/sponsor/payment-status", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPaymentStatus(response.data);
    } catch (error) {
      console.error("Error fetching payment status:", error);
    }
  };

  const handlePayment = async (eventId, amount) => {
    try {
      await axios.post(
        "/api/sponsor/make-payment",
        { eventId, contributionAmount: amount },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Payment successful!");
      fetchSponsorshipRequests();
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  return (
    <div className="content">
      <h1>Sponsorship Dashboard</h1>
      <section className="sponsorship-requests">
        <h2>Pending Sponsorship Requests</h2>
        <ul>
          {sponsorships.map((s) => (
            <li key={s.eventId}>
              <p>Event ID: {s.eventId}</p>
              <p>Contribution: ${s.contributionAmount || 0}</p>
              <p>Status: {s.status}</p>
              {s.status === "Pending" && (
                <button
                  className="btn learn-more"
                  onClick={() =>
                    handlePayment(s.eventId, prompt("Enter payment amount:"))
                  }
                >
                  Make Payment
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section className="payment-status">
        <h2>Payment Status</h2>
        <h3>Pending Payments</h3>
        <ul>
          {paymentStatus.pendingPayments.map((p) => (
            <li key={p.eventId}>{p.eventId}</li>
          ))}
        </ul>
        <h3>Refunds</h3>
        <ul>
          {paymentStatus.refunds.map((r) => (
            <li key={r.eventId}>{r.eventId}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SponsorshipDashboard;
