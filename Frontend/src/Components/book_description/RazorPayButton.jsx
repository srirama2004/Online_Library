import { useState } from "react";

const RazorpayButton = ({ amount, user, bookId }) => {
  const [loading, setLoading] = useState(false);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const pay = async () => {
    setLoading(true);
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load.");
      setLoading(false);
      return;
    }

    
    const result = await fetch("http://localhost:5000/rzpay/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        userId: user?.id,
        bookId,
      }),
    });

    const data = await result.json();
    if (!data || !data.orderId) {
      alert("Server error. Please try again later.");
      setLoading(false);
      return;
    }

    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      name: user?.name || "Book Purchase",
      description: "Payment for Book",
      
      order_id: data.orderId,
      handler: async function (response) {
        const verifyRes = await fetch("http://localhost:5000/rzpay/success", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            userId: user?.id,
          }),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.message === "Payment successful") {
       
       window.location.reload();
        } else {
          alert("❌ Payment verification failed.");
        }
      },
      prefill: {
        
        
        
      },
      notes: {
        address: "India",
      },
      theme: {
        color: "#d85a5e",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

  return (
    <button onClick={pay} disabled={loading} className="button_pay">
      {loading ? "Processing..." : `Buy for ₹${amount}`}
    </button>
  );
};

export default RazorpayButton;
