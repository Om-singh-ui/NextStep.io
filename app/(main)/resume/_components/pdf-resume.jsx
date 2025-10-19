import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 15,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  }
});

const PDFResume = ({ content }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Professional Resume</Text>
        {/* Add your resume content here */}
        <Text style={styles.text}>{content}</Text>
      </View>
    </Page>
  </Document>
);

export const generateResumePDF = async (content) => {
  const blob = await pdf(<PDFResume content={content} />).toBlob();
  return blob;
};