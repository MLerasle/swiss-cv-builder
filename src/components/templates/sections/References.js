import { Text, View } from "@react-pdf/renderer";

export function References({ references, styles }) {
  if (!references || references.length === 0) return;
  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.sectionTitle}>Références</Text>
      <View
        id="references"
        style={{ ...styles.sectionContent, ...styles.options }}
      >
        {references.map((ref) => (
          <View key={ref.name}>
            <Text style={styles.optionTitle}>{ref.name}</Text>
            <Text style={styles.optionDesc}>
              {ref.position} {ref.company ? `chez ${ref.company}` : null}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
