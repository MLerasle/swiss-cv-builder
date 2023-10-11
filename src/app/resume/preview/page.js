"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

import useFormStore from "@/store/useFormStore";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default function Preview() {
  const data = useFormStore((state) => state);
  console.log("Data in preview", data);

  return (
    // Alternative: style={{ position: 'absolute', border: 0, height: '100%', width: '100%' }}
    <PDFViewer showToolbar width="100%" height={window.innerHeight}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
          <Text>{data.name}</Text>
          <Text>{data.title}</Text>
          <Text>{data.email}</Text>
          <Text>{data.tel}</Text>
          <Text>{data.nationality}</Text>
          <Text>{data.permit}</Text>
        </Page>
      </Document>
    </PDFViewer>
  );
}
