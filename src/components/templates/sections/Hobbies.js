import { Text, View } from "@react-pdf/renderer";

export function Hobbies({ hobbies, styles }) {
  if (!hobbies || hobbies.length === 0) return;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Centres d'intérêts</Text>
      <View id="hobbies" style={{ ...styles.sectionContent, ...styles.skills }}>
        {hobbies.map((h) => (
          <Text key={h.hobby} style={styles.hobby}>
            {h.hobby}
          </Text>
        ))}
      </View>
    </View>
  );
}
