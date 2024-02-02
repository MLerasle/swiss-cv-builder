import { Text, View } from "@react-pdf/renderer";

import { formatRichText } from "@/lib/pdf";

export function Education({ education, styles, template, mainColor }) {
  if (!education || education.length === 0) return <View></View>;
  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.sectionTitle}>Formation</Text>
      <View id="education" style={styles.sectionContent}>
        {education.map((ed, index) => (
          <View key={ed.degree} wrap={false}>
            {template === "template3" && (
              <View
                style={[styles.block, { marginTop: index > 0 ? "12px" : "" }]}
              ></View>
            )}
            {index > 0 ? (
              <Text style={[styles.achievementTitle, { marginTop: "12px" }]}>
                {ed.degree} {ed.field}
              </Text>
            ) : (
              <Text style={styles.achievementTitle}>
                {ed.degree} {ed.field}
              </Text>
            )}
            <Text style={styles.achievementPlace}>{ed.school}</Text>
            <View style={styles.achievementDetails}>
              {(ed.fromMonth || ed.fromYear || ed.toMonth || ed.toYear) && (
                <Text>
                  {ed.fromMonth}/{ed.fromYear} - {ed.toMonth}/{ed.toYear}
                </Text>
              )}
              {ed.city && ed.country ? (
                <Text>
                  {ed.city ? `${ed.city}, ` : ""}
                  {ed.country}
                </Text>
              ) : ed.city && !ed.country ? (
                <Text>{ed.city}</Text>
              ) : !ed.city && ed.country ? (
                <Text>{ed.country}</Text>
              ) : null}
            </View>
            <View style={styles.achievementDescView}>
              {formatRichText(ed.description, mainColor)}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
