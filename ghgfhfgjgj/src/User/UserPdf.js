import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import '../CSS/UserPdf.css';

const COMPANY_NAME = 'Cleen Car Wash';
const COMPANY_LOGO_URL = 'https://example.com/logo.png'; // Replace with the actual logo URL
const COMPANY_DESCRIPTION = 'Keep Your Car Wash Cleen. We provide professional car wash services to keep your vehicle spotless and shining. Our team of experts ensures top-notch cleaning with attention to detail. Experience the difference with Cleen Car Wash today.';

function UserPdf() {
  const [bookingData, setBookingData] = useState(null);
  const userId = localStorage.getItem('userId');
  const bookingId = localStorage.getItem('bookingId');

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(`http://localhost:8181/user/AllBooking/${userId}`);
      setBookingData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cancelBooking = async () => {
    try {
      await axios.delete(`http://localhost:8181/user/CancelBooking/${bookingId}`);
      console.log('Booking canceled successfully');
      fetchBookingData();
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };

  const generatePdf = () => {
    if (!bookingData) return null;

    return (
      <Document>
       <Page style={styles.page}>
          <View style={styles.header}>
            <View className="logo">
              <a className="navbar-brand" href="/">
                <span style={styles.logoYellow}>C</span>
                <span style={styles.logoBlack}>leen</span>
              </a>
            </View>
            <View style={styles.companyLogoContainer}>
              <img style={styles.companyLogo} src={COMPANY_LOGO_URL} alt="Cleen Car Wash Logo" />
            </View>
            <Text style={styles.companyName}>{COMPANY_NAME}</Text>
            <Text style={styles.companyDescription}>{COMPANY_DESCRIPTION}</Text>
            <Text style={styles.invoiceTitle}>Invoice</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Booking ID:</Text>
            <Text style={styles.value}>{bookingData.bookingId}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{bookingData.name}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{bookingData.phone}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{bookingData.email}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{bookingData.date}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>{bookingData.time}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>WashPacks:</Text>
            <Text style={styles.value}>{bookingData.washPacks}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Car Name:</Text>
            <Text style={styles.value}>{bookingData.carName}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{bookingData.location}</Text>
          </View>
        </Page>
      </Document>
    );
  };

  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 12,
      paddingTop: 30,
      paddingLeft: 60,
      paddingRight: 60,
      paddingBottom: 30,
    },
    header: {
      marginBottom: 20,
      textAlign: 'center',
    },
    companyLogoContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    companyLogo: {
      width: 100,
      height: 100,
    },
    companyName: {
      fontSize: 18,
      marginBottom: 5,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    companyDescription: {
      fontSize: 10,
      marginBottom: 10,
      textAlign: 'justify',
    },
    invoiceTitle: {
      fontSize: 24,
      marginBottom: 30,
    },
    section: {
      marginBottom: 10,
    },
    label: {
      fontWeight: 'bold',
    },
    value: {},

    logoYellow: {
      color: 'yellow',
    },

    logoBlack: {
      color: 'black',
    },
  });

  if (bookingData === null) {
    return <div>Loading...</div>;
  }

  if (!bookingData) {
    return <div>No booking available</div>;
  }

  return (
    <div className="user-pdf-container">
      <div className="logo">
        <a className="navbar-brand" href="/">
          <span>C</span>leen
        </a>
      </div>

      <h1>Booking</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Date</th>
            <th>Time</th>
            <th>WashPacks</th>
            <th>Car Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{bookingData.name}</td>
            <td>{bookingData.phone}</td>
            <td>{bookingData.email}</td>
            <td>{bookingData.date}</td>
            <td>{bookingData.time}</td>
            <td>{bookingData.washPacks}</td>
            <td>{bookingData.carName}</td>
            <td>{bookingData.location}</td>
            <td>
              <PDFDownloadLink document={generatePdf()} fileName={`invoice-${bookingData.bookingId}.pdf`}>
                {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
              </PDFDownloadLink>
              {/* <button onClick={cancelBooking}>Cancel Booking</button> */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserPdf;
