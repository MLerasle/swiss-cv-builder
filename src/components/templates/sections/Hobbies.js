import { Text, View } from "@react-pdf/renderer";

export function Hobbies({ data, styles }) {
  if (!data.hobbies || data.hobbies.length === 0) return <View></View>;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Centres d'intérêts</Text>
      <View id="hobbies" style={{ ...styles.sectionContent, ...styles.skills }}>
        {data.hobbies.map((h) => (
          <Text key={h.hobby} style={styles.hobby}>
            {h.hobby}
          </Text>
        ))}
      </View>
    </View>
  );
}
