import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const COMPANY_NAME = 'Cleen Car Wash';
const COMPANY_DESCRIPTION =
  'Keep Your Car Wash Cleen. We provide professional car wash services to keep your vehicle spotless and shining. Our team of experts ensures top-notch cleaning with attention to detail. Experience the difference with Cleen Car Wash today.';

function InvoiceDocument({ userSubscription, styles }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          
          <Text style={styles.companyName}>{COMPANY_NAME}</Text>
          <Text style={styles.companyDescription}>{COMPANY_DESCRIPTION}</Text>
        </View>

        <Text style={styles.title}>Invoice</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text style={styles.tableCellHeader}>Subscription Type</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.tableCellHeader}>Name</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.tableCellHeader}>Email</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.tableCellHeader}>Phone</Text>
            </View>
          </View>

          <View style={styles.tableRow} key={userSubscription.id}>
            <View style={styles.tableCell}>
              <Text>{userSubscription.subscriptionType}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{userSubscription.name}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{userSubscription.email}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{userSubscription.phone}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

function SubscriptionList() {
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const userId = localStorage.getItem('userId');

  // Fetch all subscriptions
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get(`http://localhost:8181/user/allSubscription/${userId}`);
      setUserSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const cancelSubscription = async (subscriptionId) => {
    try {
      const response = await axios.delete(`http://localhost:8181/subscription/CancelSubscription/${subscriptionId}`);
      if (response.status === 200) {
        fetchSubscriptions(); // Fetch updated subscriptions after cancellation
      }
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
    }
  };

  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 12,
      padding: 30,
    },
    header: {
      marginBottom: 20,
    },
    logo: {
      width: 50,
      height: 50,
    },
    companyName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
    companyDescription: {
      fontSize: 10,
      marginTop: 5,
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    table: {
      display: 'table',
      width: '100%',
      marginBottom: 10,
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableCell: {
      width: '25%',
      padding: 5,
    },
    tableCellHeader: {
      fontWeight: 'bold',
    },
    actionBar: {
      marginTop: 20,
      display: 'flex',
      justifyContent: 'center',
    },
    downloadButton: {
      padding: '10px 20px',
      background: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: 5,
      textDecoration: 'none',
      cursor: 'pointer',
      fontSize: 16,
    },
  });
  return (
    <div>
      <h1>Subscriptions</h1>
      {userSubscriptions && userSubscriptions.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subscription Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         
            <tr key={userSubscriptions.id}>
              <td>{userSubscriptions.name}</td>
              <td>{userSubscriptions.email}</td>
              <td>{userSubscriptions.phone}</td>
              <td>{userSubscriptions.subscriptionType}</td>
              <td>
                <div className="action-bar" style={styles.actionBar}>
                  <PDFDownloadLink
                    document={<InvoiceDocument userSubscription={userSubscriptions} styles={styles} />}
                    fileName="invoice.pdf"
                  >
                    {({ loading }) => (loading ? 'Generating Invoice...' : 'Download Invoice')}
                  </PDFDownloadLink>
                  {/* <button onClick={() => cancelSubscription(userSubscriptions.id)}>Cancel</button> */}
                </div>
              </td>
            </tr>
         
        </tbody>
      </table>
      ) : (
        <p>You don't have any subscriptions.</p>
      )}
    </div>
  );
}

export default SubscriptionList;
