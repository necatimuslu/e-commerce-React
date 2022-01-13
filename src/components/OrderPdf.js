import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableBody,
  TableCell,
  DataTableCell,
  TableHeader,
} from "@david.kucsai/react-pdf-table";

const OrderPdf = ({ order }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header}> ~ {new Date().toLocaleString()} ~ </Text>
        <Text style={styles.title}>Siparis gecmisi</Text>
        <Text style={styles.author}>E-ticaret</Text>
        <Text style={styles.subtitle}>Siparis Özeti </Text>

        <Table>
          <TableHeader>
            <TableCell>Urun adi</TableCell>
            <TableCell>Fiyat</TableCell>
            <TableCell>Adet</TableCell>
            <TableCell>Marka</TableCell>
            <TableCell>Renk</TableCell>
          </TableHeader>
        </Table>
        <Table data={order.products}>
          <TableBody>
            <DataTableCell getContent={(o) => o.product.title} />
            <DataTableCell getContent={(o) => `${o.product.price} TL`} />
            <DataTableCell getContent={(o) => o.product.quantity} />
            <DataTableCell getContent={(o) => o.product.brand.name} />
            <DataTableCell getContent={(o) => o.product.color.name} />
          </TableBody>
        </Table>
        <Text style={styles.text}>
          <Text>
            {" "}
            Tarih :
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}{" "}
          </Text>
          <Text> Siparis no : {order.paymentIntent.id} </Text> <br />
          <Text> Toplam Tutar : {order.paymentIntent.amount} TL</Text>
          <br />
        </Text>
        <Text style={styles.footer}>
          ~ Bizden alisveris yaptiginiz icin Tesekkür ederiz ~{" "}
        </Text>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default OrderPdf;
