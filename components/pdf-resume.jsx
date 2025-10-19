"use client";

import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    borderBottom: '2pt solid #2c5282',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    color: '#666',
    marginBottom: 3,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 8,
    borderBottom: '1pt solid #e2e8f0',
    paddingBottom: 3,
  },
  content: {
    fontSize: 10,
    lineHeight: 1.4,
    textAlign: 'justify',
  },
  entry: {
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  entryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  entryDate: {
    fontSize: 10,
    color: '#666',
  },
  entryOrg: {
    fontSize: 10,
    color: '#444',
    marginBottom: 3,
  }
});

// PDF Document component
const PDFResume = ({ content }) => {
  // Simple content display - you can enhance this later
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>Professional Resume</Text>
        </View>

        {/* Content Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resume Content</Text>
          <Text style={styles.content}>
            {content || 'No content available'}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// Function to generate PDF
export const generateResumePDF = async (content) => {
  try {
    console.log('Generating PDF with content length:', content?.length);
    
    // Generate PDF blob
    const blob = await pdf(<PDFResume content={content} />).toBlob();
    console.log('PDF blob created, size:', blob.size);
    
    return blob;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export default PDFResume;