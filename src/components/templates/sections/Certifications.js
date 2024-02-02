import { Text, View } from "@react-pdf/renderer";

export function Certifications({ data, styles }) {
  if (!data.certifications || data.certifications.length === 0)
    return <View></View>;
  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.sectionTitle}>Certifications</Text>
      <View
        id="certifications"
        style={{ ...styles.sectionContent, ...styles.options }}
      >
        {data.certifications.map((cert) => (
          <View key={cert.title}>
            <Text style={styles.optionTitle}>{cert.title}</Text>
            <Text style={styles.optionDesc}>
              {cert.issuer}{" "}
              {(cert.month || cert.year) && `${cert.month} / ${cert.year}`}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
