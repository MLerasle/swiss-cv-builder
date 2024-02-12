import { Text, View } from "@react-pdf/renderer";

export function Skills({ data, styles }) {
  if (!data.skills || data.skills.length === 0) return <View></View>;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Compétences</Text>
      <View id="skills" style={{ ...styles.sectionContent, ...styles.skills }}>
        {data.skills.map((s, index) => (
          <Text key={index} style={styles.skill}>
            {s.skill}
          </Text>
        ))}
      </View>
    </View>
  );
}
