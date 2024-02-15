import { Text, View } from "@react-pdf/renderer";

import { formatRichText } from "@/lib/pdf";

export function Volunteers({ data, styles }) {
  if (!data.volunteers || data.volunteers.length === 0) return <View></View>;
  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.sectionTitle}>Bénévolat</Text>
      <View id="volunteers" style={styles.sectionContent}>
        {data.volunteers.map((vol, index) => (
          <View key={vol.organisation} id="volunteer" wrap={false}>
            {index > 0 ? (
              <Text style={[styles.achievementTitle, { marginTop: "12px" }]}>
                {vol.role}
              </Text>
            ) : (
              <Text style={styles.achievementTitle}>{vol.role}</Text>
            )}
            <Text style={styles.achievementPlace}>{vol.organisation}</Text>

            <View style={styles.achievementDetails}>
              {(vol.fromMonth ||
                vol.fromYear ||
                vol.toMonth ||
                vol.toYear ||
                vol.current) && (
                <Text>
                  {vol.fromMonth}/{vol.fromYear} -
                  {vol.current
                    ? " Maintenant"
                    : ` ${vol.toMonth}/${vol.toYear}`}
                </Text>
              )}
            </View>
            <View style={styles.achievementDescView}>
              {formatRichText(vol.description, data.template.color)}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
