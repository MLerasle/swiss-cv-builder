import { Text, View } from "@react-pdf/renderer";

export function Skills({ skills, styles }) {
  if (!skills || skills.length === 0) return <View></View>;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Compétences</Text>
      <View id="skills" style={{ ...styles.sectionContent, ...styles.skills }}>
        {skills.map((s) => (
          <Text key={s.skill} style={styles.skill}>
            {s.skill}
          </Text>
        ))}
      </View>
    </View>
  );
}
