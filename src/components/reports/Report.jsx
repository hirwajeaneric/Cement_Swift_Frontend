/* eslint-disable react/prop-types */
import { Fragment } from 'react'
import { Image, Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';
import logo from './Logo.png'

const Report = ({ 
    // reportPeriod, 
    stats, 
    // monthlyProductData 
}) => {
    // const [reportPeriodValue, setReportPeriodValue] = useState("");
    // const [productDataByMonth, setProductDataByMonth] = useState({month: 0, totalData: [
    //     { productName: 'Premium 42,5', totalQuantity: 0 },
    //     { productName: 'Surebuild', totalQuantity: 0 },
    //     { productName: 'Surecem', totalQuantity: 0 },
    //     { productName: 'Sureroad', totalQuantity: 0 },
    //     { productName: 'Surewall', totalQuantity: 0 }
    //   ]});
    // const [productDataByYear, setProductDataByYear] = useState([
    //     { productName: 'Premium 42,5', totalQuantity: 0 },
    //     { productName: 'Surebuild', totalQuantity: 0 },
    //     { productName: 'Surecem', totalQuantity: 0 },
    //     { productName: 'Sureroad', totalQuantity: 0 },
    //     { productName: 'Surewall', totalQuantity: 0 }
    //   ]);

    // useEffect(() => {
    //     console.log(monthlyProductData);
    //     let monthlyData = monthlyProductData;

    //     if (reportPeriod === 'Month') {
    //         setReportPeriodValue(getMonthName(new Date().getMonth()));
    //         if (monthlyProductData) {
    //             const { month, totalData } = monthlyProductData[new Date().getMonth()-1];   
    //             console.log(totalData);
    //             // console.log(month);
    //             // setProductDataByMonth(monthlyData);
    //         }
    //     } else if (reportPeriod === 'Year') {
    //         setReportPeriodValue(new Date().getFullYear().toString());
    //     }
        // setProductDataByMonth([
        //     { productType: "Premium 42,5", total: monthlyProductData["Premium 42,5"] },
        //     { productType: "Surecem", total: monthlyProductData.Surecem },
        //     { productType: "Surebuild", total: monthlyProductData.Surebuild },
        //     { productType: "Sureroad", total: monthlyProductData.Sureroad },
        //     { productType: "Surewall", total: monthlyProductData.Surewall },
        // ]);

    // }, [reportPeriod, stats, monthlyProductData]);

    // const getMonthName = (monthIndex) => {
    //     const monthNames = [
    //         "January", "February", "March", "April", "May", "June",
    //         "July", "August", "September", "October", "November", "December"
    //     ];
    //     return monthNames[monthIndex];
    // };

    const styles = StyleSheet.create({
        titles: { marginTop: 10, fontStyle: 'bold'},
        page: { fontSize: 11, paddingTop: 20, paddingLeft: 40, paddingRight: 40, lineHeight: 1.5, flexDirection: 'column' },
        spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: "#3E3E3E" },
        titleContainer: { flexDirection: 'row', marginTop: 24 },
        logo: { width: 250 },
        reportTitle: { fontSize: 16, textAlign: 'center' },
        addressTitle: { fontSize: 11, fontStyle: 'bold' },
        invoice: { fontWeight: 'bold', fontSize: 20 },
        invoiceNumber: { fontSize: 11, fontWeight: 'bold' },
        address: { fontWeight: 400, fontSize: 10 },
        theader: { marginTop: 5, fontSize: 10, fontStyle: 'bold', paddingTop: 4, paddingLeft: 7, flex: 1, height: 20, backgroundColor: '#DEDEDE', borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },
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
                    {/* <Text style={styles.invoice}>Orders Report for {reportPeriodValue}</Text> */}
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
        <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={[styles.theader]}>
                <Text>Stat</Text>
            </View>
            <View style={styles.theader}>
                <Text>Number</Text>
            </View>
        </View>
    );
    
    const TableHead2 = () => (
        <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={[styles.theader]}>
                <Text>Cement type</Text>
            </View>
            <View style={styles.theader}>
                <Text>Total amount of bags</Text>
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
    
    // const TableBody2 = () => (
    //     productDataByMonth.totalData.map((stat, index) => (
    //         <Fragment key={index}>
    //             <View style={{ width: '100%', flexDirection: 'row' }}>
    //                 <View style={[styles.tbody]}>
    //                     <Text>{stat.title}</Text>
    //                 </View>
    //                 <View style={styles.tbody}>
    //                     <Text>{stat.value}</Text>
    //                 </View>
    //             </View>
    //         </Fragment>
    //     ))
    // );

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <InvoiceTitle />
                <Address />
                <UserAddress />
                <Fragment>
                    <Text style={styles.titles}>Orders</Text>
                </Fragment>
                <TableHead />
                <TableBody />
                <Fragment>
                    {/* <Text style={styles.titles}>Product types sold in {reportPeriodValue}</Text> */}
                </Fragment>
                <TableHead2 />
                {/* <TableBody2 /> */}
            </Page>
        </Document>

    )
}

export default Report