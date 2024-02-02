import { Text, View } from "@react-pdf/renderer";

export function Languages({ languages, styles }) {
  if (!languages || languages.length === 0) return <View></View>;
  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.sectionTitle}>Langues</Text>
      <View
        id="languages"
        style={{ ...styles.sectionContent, ...styles.options }}
      >
        {languages.map((l) => (
          <View key={l.language}>
            <Text style={styles.optionTitle}>{l.language}</Text>
            <Text style={styles.optionDesc}>{l.level}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
