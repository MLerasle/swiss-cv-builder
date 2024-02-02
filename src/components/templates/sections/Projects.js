import { Text, View } from "@react-pdf/renderer";

import { formatRichText } from "@/lib/pdf";

export function Projects({ data, styles }) {
  if (!data.projects || data.projects.length === 0) return <View></View>;
  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.sectionTitle}>Projets Personnels</Text>
      <View id="projects" style={styles.sectionContent}>
        {data.projects.map((proj, index) => (
          <View key={proj.company} id="project" wrap={false}>
            {index > 0 ? (
              <Text style={[styles.achievementTitle, { marginTop: "12px" }]}>
                {proj.title}
              </Text>
            ) : (
              <Text style={styles.achievementTitle}>{proj.title}</Text>
            )}
            <Text style={styles.achievementPlaceDesc}>{proj.link}</Text>
            <View style={styles.achievementDetails}>
              {(proj.fromMonth ||
                proj.fromYear ||
                proj.toMonth ||
                proj.toYear ||
                proj.current) && (
                <Text>
                  {proj.fromMonth}/{proj.fromYear} -
                  {proj.current
                    ? " Maintenant"
                    : ` ${proj.toMonth}/${proj.toYear}`}
                </Text>
              )}
            </View>
            <View style={styles.achievementDescView}>
              {formatRichText(proj.description, data.template.color)}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
