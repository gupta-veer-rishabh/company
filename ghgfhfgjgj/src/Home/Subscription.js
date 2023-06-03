import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Subscription.css';

function Subscription() {
  const [subscriptionType, setSubscriptionType] = useState('Monthly');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [subscriptionStartDate, setSubscriptionStartDate] = useState(null);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);
  const [usedWashes, setUsedWashes] = useState(0); // New state variable to track used washes
  const [redirectToPayment, setRedirectToPayment] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentDate = new Date();
    setSubscriptionStartDate(currentDate.toLocaleDateString());

    let allowedWashes;
    let endDate;

    if (subscriptionType === 'Monthly') {
      allowedWashes = 4;
      endDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    } else if (subscriptionType === 'Quarterly') {
      allowedWashes = 12;
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, 0);
    }

    setSubscriptionEndDate(endDate.toLocaleDateString());

    // Perform validation
    if (usedWashes >= allowedWashes) {
      alert(`You have reached the maximum number of allowed washes for the ${subscriptionType} subscription.`);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8181/user/addSubscription', {
        subscriptionType,
        name,
        email,
        phone,
      });
      console.log(response.data);
      setUsedWashes(usedWashes + 1); // Increment used washes count
      setRedirectToPayment(true);
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  const getDescription = (type) => {
    if (type === 'Monthly') {
      const remainingWashes = 4 - usedWashes;
      return `Monthly subscription includes a basic car wash in a month. You can wash up to 4 times in a month. Remaining washes: ${remainingWashes}`;
    } else if (type === 'Quarterly') {
      const remainingWashes = 12 - usedWashes;
      return `Quarterly subscription includes a deluxe car wash in every three months. You can wash up to 12 times in a quarter. Remaining washes: ${remainingWashes}`;
    } else {
      return '';
    }
  };

  const handleConfirm = () => {
    setSubmitted(true);
    setPaymentConfirmed(true);
    alert('Thank you for confirming your subscription!');
  };

  if (redirectToPayment) {
    window.location.href = 'http://localhost:3000/AfterLogin/SubscriptionPayment';
  }

  return (
    <div className="container">
      <h1 className="heading">On-Demand Car Wash Subscription</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="card">
            <h2 className="section-heading">Select a Subscription Type:</h2>
            <label>
              <input
                type="radio"
                name="subscription-type"
                value="Monthly"
                checked={subscriptionType === 'Monthly'}
                onChange={() => setSubscriptionType('Monthly')}
              />
              Monthly Subscription
            </label>
            <p className="subscription-description">{getDescription('Monthly')}</p>
            <label>
              <input
                type="radio"
                name="subscription-type"
                value="Quarterly"
                checked={subscriptionType === 'Quarterly'}
                onChange={() => setSubscriptionType('Quarterly')}
              />
              Quarterly Subscription
            </label>
            <p className="subscription-description">{getDescription('Quarterly')}</p>
          </div>

          <div className="card">
            <h2 className="section-heading">Enter Your Contact Information:</h2>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          <input type="submit" value="Subscribe" className="submit-button" />
        </form>
      ) : (
        <div className="submitted-data">
          <h3 id="thank-you-message">Thank you for subscribing!</h3>
          <p>Subscription Type: {subscriptionType}</p>
          <p>{getDescription(subscriptionType)}</p>
          {subscriptionStartDate && <p>Subscription Start Date: {subscriptionStartDate}</p>}
          {subscriptionEndDate && <p>Subscription End Date: {subscriptionEndDate}</p>}
          {!paymentConfirmed && <button onClick={handleConfirm}>Confirm</button>}
        </div>
      )}
    </div>
  );
}

export default Subscription;
