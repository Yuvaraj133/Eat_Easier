import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Store } from '../Store';

const PaymentComponent = () => {
  const { state } = useContext(Store); // Moved inside the component
  const {
    orderItems,
    itemsCount,
    totalPrice,
    taxPrice,
    orderType,
  } = state.order;
  const history = useHistory();

  useEffect(() => {
    const options = {
      key: 'rzp_test_L4E29UVXmsVxyw', // Replace with your Razorpay key
      amount: totalPrice* 100, // Amount in paise (100 paise = ₹1)
      currency: 'INR',
      name: 'Foodiesgram',
      description: 'This is the paymnet for the food',
      prefill: {
        name: 'Test User',
        email: 'test@example.com',
        contact: '9999999999'
      },
      handler: function (response) {
        console.log(response);
        // Redirect to /complete route after successful payment
        history.push('/complete');
      },
      theme: {
        color: '#3399cc' // Brand color
      }
    };

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [history, totalPrice]); // Added totalPrice to dependency array

  return <></>;
};

export default PaymentComponent;
