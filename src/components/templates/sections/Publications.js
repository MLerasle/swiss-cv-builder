import { Text, View } from "@react-pdf/renderer";

import { formatRichText } from "@/lib/pdf";

export function Publications({ data, styles }) {
  if (!data.publications || data.publications.length === 0)
    return <View></View>;
  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.sectionTitle}>Publications</Text>
      <View
        id="publications"
        style={{ ...styles.sectionContent, ...styles.options }}
      >
        {data.publications.map((pub) => (
          <View key={pub.title}>
            <Text style={styles.achievementTitle}>{pub.title}</Text>
            <Text style={styles.achievementPlace}>{pub.editor}</Text>
            <Text style={styles.achievementPlaceDesc}>{pub.link}</Text>
            <Text style={styles.achievementDetails}>
              {(pub.month || pub.year) && `${pub.month} / ${pub.year}`}
            </Text>
            <View style={styles.achievementDescView}>
              {formatRichText(pub.description, data.template.color)}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
