/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from 'react'
import { Image, Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';
import logo from './Logo.png'

const Report = ({ reportPeriod, stats }) => {
    const [reportPeriodValue, setReportPeriodValue] = useState("");

    useEffect(() => {
        if (reportPeriod === 'Month') {
            setReportPeriodValue(getMonthName(new Date().getMonth()));
        } else if (reportPeriod === 'Year') {
            setReportPeriodValue(new Date().getFullYear().toString());
        }
    }, [reportPeriod, stats]);

    const getMonthName = (monthIndex) => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[monthIndex];
    };

    const styles = StyleSheet.create({
        page: { fontSize: 11, paddingTop: 20, paddingLeft: 40, paddingRight: 40, lineHeight: 1.5, flexDirection: 'column' },
        spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: "#3E3E3E" },
        titleContainer: { flexDirection: 'row', marginTop: 24 },
        logo: { width: 250 },
        reportTitle: { fontSize: 16, textAlign: 'center' },
        addressTitle: { fontSize: 11, fontStyle: 'bold' },
        invoice: { fontWeight: 'bold', fontSize: 20 },
        invoiceNumber: { fontSize: 11, fontWeight: 'bold' },
        address: { fontWeight: 400, fontSize: 10 },
        theader: { marginTop: 20, fontSize: 10, fontStyle: 'bold', paddingTop: 4, paddingLeft: 7, flex: 1, height: 20, backgroundColor: '#DEDEDE', borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },
        theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },
        tbody: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1, borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },
        total: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1.5, borderColor: 'whitesmoke', borderBottomWidth: 1 },
        tbody2: { flex: 2, borderRightWidth: 1, }
    });

    const InvoiceTitle = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <Image style={styles.logo} src={logo} />
                <Text style={styles.reportTitle}>Cimerwa PLC</Text>
            </View>
        </View>
    );

    const Address = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View>
                    <Text style={styles.invoice}>Orders Report for {reportPeriodValue}</Text>
                </View>
                <View>
                    <Text style={styles.addressTitle}>Rusizi Office </Text>
                    <Text style={styles.addressTitle}>P.O Box 21, Rusizi-Rwanda</Text>
                    <Text style={styles.addressTitle}>sales@cimerwa.rw</Text>
                    <Text style={styles.addressTitle}>info@cimerwa.rw</Text>
                </View>
            </View>
        </View>
    );

    const UserAddress = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View style={{ maxWidth: 200 }}>
                    <Text style={styles.addressTitle}>Report by {JSON.parse(localStorage.getItem('admin')).fullName} </Text>
                    <Text style={styles.address}>
                        Rusizi District
                    </Text>
                </View>
                <Text style={styles.addressTitle}>{new Date().toDateString()}</Text>
            </View>
        </View>
    );


    const TableHead = () => (
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            <View style={[styles.theader]}>
                <Text>Stat</Text>
            </View>
            <View style={styles.theader}>
                <Text>Number</Text>
            </View>
        </View>
    );


    const TableBody = () => (
        stats.map((stat, index) => (
            <Fragment key={index}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={[styles.tbody]}>
                        <Text>{stat.title}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{stat.value}</Text>
                    </View>
                </View>
            </Fragment>
        ))
    );

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <InvoiceTitle />
                <Address />
                <UserAddress />
                <TableHead />
                <TableBody />
            </Page>
        </Document>

    )
}

export default Report