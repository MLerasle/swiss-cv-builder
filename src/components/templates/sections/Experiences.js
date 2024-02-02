import { Text, View } from "@react-pdf/renderer";

import { formatRichText } from "@/lib/pdf";

export function Experiences({ experiences, styles, template, mainColor }) {
  if (!experiences || experiences.length === 0) return <View></View>;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Expérience professionnelle</Text>
      <View id="experiences" style={styles.sectionContent}>
        {experiences.map((exp, index) => (
          <View key={exp.company} id="experience" wrap={false}>
            {template === "template3" && (
              <View
                style={[styles.block, { marginTop: index > 0 ? "12px" : "" }]}
              ></View>
            )}
            {index > 0 ? (
              <Text style={[styles.achievementTitle, { marginTop: "12px" }]}>
                {exp.title}
              </Text>
            ) : (
              <Text style={styles.achievementTitle}>{exp.title}</Text>
            )}
            <Text style={styles.achievementPlace}>{exp.company}</Text>
            <Text style={styles.achievementPlaceDesc}>{exp.companyDesc}</Text>
            <View style={styles.achievementDetails}>
              {(exp.fromMonth ||
                exp.fromYear ||
                exp.toMonth ||
                exp.toYear ||
                exp.current) && (
                <Text>
                  {exp.fromMonth}/{exp.fromYear} -
                  {exp.current
                    ? " Maintenant"
                    : ` ${exp.toMonth}/${exp.toYear}`}
                </Text>
              )}
              {exp.city && exp.country ? (
                <Text>
                  {exp.city ? `${exp.city}, ` : ""}
                  {exp.country}
                </Text>
              ) : exp.city && !exp.country ? (
                <Text>{exp.city}</Text>
              ) : !exp.city && exp.country ? (
                <Text>{exp.country}</Text>
              ) : null}
            </View>
            <View style={styles.achievementDescView}>
              {formatRichText(exp.description, mainColor)}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
