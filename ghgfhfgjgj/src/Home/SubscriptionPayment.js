import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import '../CSS/Subscription.css';

function SubscriptionPayment() {
  const [subscriptionType, setSubscriptionType] = useState('Monthly','Quarterly');
  const [username, setUsername] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('MM');
  const [expirationYear, setExpirationYear] = useState('YY');
  const [cvv, setCVV] = useState('');
  const [message, setMessage] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [subscriptionStartDate, setSubscriptionStartDate] = useState(null);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);
 

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpirationMonthChange = (event) => {
    setExpirationMonth(event.target.value);
  };

  const handleExpirationYearChange = (event) => {
    setExpirationYear(event.target.value);
  };

  const handleCVVChange = (event) => {
    setCVV(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !cardNumber || expirationMonth === 'MM' || expirationYear === 'YY' || !cvv) {
      setMessage('Please fill in all the required fields.');
      return;
    }

    const currentDate = new Date();
    setSubscriptionStartDate(currentDate.toLocaleDateString());

    let endDate;
    if (subscriptionType === 'Monthly') {
      endDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    } else if (subscriptionType === 'Quarterly') {
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, 0);
    }
    setSubscriptionEndDate(endDate.toLocaleDateString());

    try {
      const response = await axios.post('http://localhost:9003/payment', {
        subscriptionType,
        username,
        cardNumber,
        expirationMonth,
        expirationYear,
        cvv,
      });
      console.log(response.data);
      setPaymentConfirmed(true);
    } catch (error) {
      console.error(error);
      setMessage('Payment failed. Please try again.');
    }
  };

  const getDescription = (type) => {
    if (type === 'Monthly') {
      return 'Monthly subscription includes a basic car wash in a month.';
    } else if (type === 'Quarterly') {
      return 'Quarterly subscription includes a deluxe car wash in every three months.';
    } else {
      return '';
    }
  };

  const handleConfirm = () => {
    setPaymentConfirmed(true);
    setMessage('');
  
    // if (subscriptionType === 'Monthly') {
    //   getDescription('Monthly');
    // } else if (subscriptionType === 'Quarterly') {
    //   getDescription('Quarterly');
    // }

    const description = getDescription(subscriptionType);
    setDescription(description);

  };
  const [description, setDescription] = useState('');

  return (
    <div className="container">
      <h1 className="heading">Subscription Payment</h1>
      <div className="subscription-payment" style={{ marginTop: '20px' }}>
        {!paymentConfirmed ? (
          <>
            <article className="card-body mx-auto" style={{ maxWidth: '400px' }}>
              <h4 className="card-title mt-3 text-center">Payment Information</h4>
              <p className="text-center">Complete the form to confirm your subscription.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cardNumber"
                    placeholder="Enter card number"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-sm-8">
                    <div className="form-group">
                      <label>Expiration Date</label>
                      <div className="row">
                        <div className="col">
                          <select
                            className="form-control"
                            value={expirationMonth}
                            onChange={handleExpirationMonthChange}
                            required
                          >
                            <option>MM</option>
                          <option>01 - January</option>
                          <option>02 - February</option>
                          <option>03 - March</option>
                          <option>04 - April</option>
                          <option>05 - May</option>
                          <option>06 - June</option>
                          <option>07 - July</option>
                          <option>08 - August</option>
                          <option>09 - September</option>
                          <option>10 - October</option>
                          <option>11 - November</option>
                          <option>12 - December</option>
                          </select>
                        </div>
                        <div className="col">
                          <select
                            className="form-control"
                            value={expirationYear}
                            onChange={handleExpirationYearChange}
                            required
                          >
                          <option>YY</option>
                          <option>2022</option>
                          <option>2023</option>
                          <option>2024</option>
                          <option>2025</option>
                          <option>2023</option>
                          <option>2027</option>
                          <option>2028</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cvv"
                        placeholder="CVV"
                        value={cvv}
                        onChange={handleCVVChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Confirm Payment
                  </button>
                </div>
                {message && <p className="text-center text-danger">{message}</p>}
              </form>
            </article>
          </>
        ) : (
          <>
            <h3 id="thank-you-message" style={{ marginLeft: '20px', marginBottom: '10px' }}>Thank you for confirming your subscription!</h3>
            <button onClick={handleConfirm} style={{ marginTop: '10px' }}>
  <Link to="/">Confirm</Link>
</button>



          </>
        )}
      </div>
      <div className="submitted-data">

      <p>Subscription Type: {subscriptionType}</p>
          <p>{getDescription(subscriptionType)}</p>
        {subscriptionStartDate && <p>Subscription Start Date: {subscriptionStartDate}</p>}
        {subscriptionEndDate && <p>Subscription End Date: {subscriptionEndDate}</p>}
      </div>
    </div>
  );
}

export default SubscriptionPayment;
