import {
  Page,
  Text,
  View,
  Svg,
  Path,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "col",
    backgroundColor: "white",
    fontFamily: "Helvetica",
    padding: "16px 0",
  },
  headerMain: {
    padding: "0 24px",
  },
  name: {
    color: "#0284c7",
  },
  title: {
    color: "#475569",
    fontSize: "14px",
    marginTop: "2px",
  },
  summary: {
    fontSize: "8px",
    marginTop: "10px",
    lineHeight: "1.2px",
  },
  contact: {
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: "8px",
    marginTop: "16px",
    padding: "8px 0",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
  },
  contactDetail: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: "4px",
  },
  main: {
    padding: "0 24px",
    flexDirection: "row",
    columnGap: "24px",
  },
  leftColumn: {
    width: "67%",
  },
  rightColumn: {
    width: "33%",
  },
  section: {
    padding: "16px 0",
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#0284c7",
    textTransform: "uppercase",
    fontSize: "14px",
  },
  sectionContent: {
    marginTop: "10px",
  },
  skills: {
    flexDirection: "row",
    rowGap: "5px",
    columnGap: "5px",
    flexWrap: "wrap",
    fontSize: "8px",
  },
  skill: {
    backgroundColor: "#0284c7",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
  },
  hobby: {
    border: "1px solid #94a3b8",
    padding: "4px 8px",
    borderRadius: "4px",
  },
  achievementTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: "12px",
  },
  achievementPlace: {
    fontSize: "12px",
    marginTop: "1px",
  },
  achievementDetails: {
    fontFamily: "Helvetica-Oblique",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: "8px",
    color: "#475569",
    marginTop: "4px",
  },
  achievementPlaceDesc: {
    fontFamily: "Helvetica-Oblique",
    fontSize: "8px",
    color: "#475569",
    marginTop: "2px",
  },
  achievementDescView: {
    marginTop: "4px",
  },
  achievementDesc: {
    fontSize: "8px",
  },
  options: {
    marginTop: "10px",
    flexDirection: "col",
    fontSize: "8px",
    rowGap: "8px",
  },
  optionTitle: {
    fontSize: "10px",
  },
  optionDesc: {
    fontFamily: "Helvetica-Oblique",
    color: "#475569",
    marginTop: "2px",
  },
  circle: {
    display: "block",
    height: "4px",
    width: "4px",
    backgroundColor: "#0284c7",
    borderRadius: "9999px",
    marginRight: "6px",
  },
});

const iconColors = { fill: "#0284c7", stroke: "white" };

export function Template2({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View id="header" style={styles.header}>
          <View style={styles.headerMain}>
            <Text style={styles.name}>{data.personalData.name}</Text>
            <Text style={styles.title}>{data.personalData.title}</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
          <View style={styles.contact}>
            {data.personalData.email && (
              <View style={styles.contactDetail}>
                <Svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={iconColors.stroke}
                  stroke-width="1.5"
                  width="12"
                  height="12"
                >
                  <Path
                    fill={iconColors.fill}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </Svg>
                <Text>{data.personalData.email}</Text>
              </View>
            )}
            {data.personalData.tel && (
              <View style={styles.contactDetail}>
                <Svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={iconColors.stroke}
                  stroke-width="1.5"
                  width="12"
                  height="12"
                >
                  <Path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill={iconColors.fill}
                    d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </Svg>

                <Text>{data.personalData.tel}</Text>
              </View>
            )}
            {(data.personalData.city || data.personalData.country) && (
              <View style={styles.contactDetail}>
                <Svg
                  fill={iconColors.fill}
                  viewBox="0 0 1024 1024"
                  width="12"
                  height="12"
                >
                  <Path d="M512 327c-29.9 0-58 11.6-79.2 32.8A111.6 111.6 0 0 0 400 439c0 29.9 11.7 58 32.8 79.2A111.6 111.6 0 0 0 512 551c29.9 0 58-11.7 79.2-32.8C612.4 497 624 468.9 624 439c0-29.9-11.6-58-32.8-79.2S541.9 327 512 327zm342.6-37.9a362.49 362.49 0 0 0-79.9-115.7 370.83 370.83 0 0 0-118.2-77.8C610.7 76.6 562.1 67 512 67c-50.1 0-98.7 9.6-144.5 28.5-44.3 18.3-84 44.5-118.2 77.8A363.6 363.6 0 0 0 169.4 289c-19.5 45-29.4 92.8-29.4 142 0 70.6 16.9 140.9 50.1 208.7 26.7 54.5 64 107.6 111 158.1 80.3 86.2 164.5 138.9 188.4 153a43.9 43.9 0 0 0 22.4 6.1c7.8 0 15.5-2 22.4-6.1 23.9-14.1 108.1-66.8 188.4-153 47-50.4 84.3-103.6 111-158.1C867.1 572 884 501.8 884 431.1c0-49.2-9.9-97-29.4-142zM512 615c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
                </Svg>
                <Text>
                  {data.personalData.city && data.personalData.country
                    ? `${data.personalData.city}, ${data.personalData.country}`
                    : `${data.personalData.city}`
                    ? `${data.personalData.city}`
                    : `${data.personalData.country}`
                    ? `${data.personalData.country}`
                    : ``}
                </Text>
              </View>
            )}
            {(data.personalData.nationality || data.personalData.permit) &&
              data.personalData.permit !== "Aucun Permis" && (
                <View style={styles.contactDetail}>
                  <Svg
                    fill={iconColors.fill}
                    viewBox="0 0 1024 1024"
                    width="12"
                    height="12"
                  >
                    <Path d="M854.4 800.9c.2-.3.5-.6.7-.9C920.6 722.1 960 621.7 960 512s-39.4-210.1-104.8-288c-.2-.3-.5-.5-.7-.8-1.1-1.3-2.1-2.5-3.2-3.7-.4-.5-.8-.9-1.2-1.4l-4.1-4.7-.1-.1c-1.5-1.7-3.1-3.4-4.6-5.1l-.1-.1c-3.2-3.4-6.4-6.8-9.7-10.1l-.1-.1-4.8-4.8-.3-.3c-1.5-1.5-3-2.9-4.5-4.3-.5-.5-1-1-1.6-1.5-1-1-2-1.9-3-2.8-.3-.3-.7-.6-1-1C736.4 109.2 629.5 64 512 64s-224.4 45.2-304.3 119.2c-.3.3-.7.6-1 1-1 .9-2 1.9-3 2.9-.5.5-1 1-1.6 1.5-1.5 1.4-3 2.9-4.5 4.3l-.3.3-4.8 4.8-.1.1c-3.3 3.3-6.5 6.7-9.7 10.1l-.1.1c-1.6 1.7-3.1 3.4-4.6 5.1l-.1.1c-1.4 1.5-2.8 3.1-4.1 4.7-.4.5-.8.9-1.2 1.4-1.1 1.2-2.1 2.5-3.2 3.7-.2.3-.5.5-.7.8C103.4 301.9 64 402.3 64 512s39.4 210.1 104.8 288c.2.3.5.6.7.9l3.1 3.7c.4.5.8.9 1.2 1.4l4.1 4.7c0 .1.1.1.1.2 1.5 1.7 3 3.4 4.6 5l.1.1c3.2 3.4 6.4 6.8 9.6 10.1l.1.1c1.6 1.6 3.1 3.2 4.7 4.7l.3.3c3.3 3.3 6.7 6.5 10.1 9.6 80.1 74 187 119.2 304.5 119.2s224.4-45.2 304.3-119.2a300 300 0 0 0 10-9.6l.3-.3c1.6-1.6 3.2-3.1 4.7-4.7l.1-.1c3.3-3.3 6.5-6.7 9.6-10.1l.1-.1c1.5-1.7 3.1-3.3 4.6-5 0-.1.1-.1.1-.2 1.4-1.5 2.8-3.1 4.1-4.7.4-.5.8-.9 1.2-1.4a99 99 0 0 0 3.3-3.7zm4.1-142.6c-13.8 32.6-32 62.8-54.2 90.2a444.07 444.07 0 0 0-81.5-55.9c11.6-46.9 18.8-98.4 20.7-152.6H887c-3 40.9-12.6 80.6-28.5 118.3zM887 484H743.5c-1.9-54.2-9.1-105.7-20.7-152.6 29.3-15.6 56.6-34.4 81.5-55.9A373.86 373.86 0 0 1 887 484zM658.3 165.5c39.7 16.8 75.8 40 107.6 69.2a394.72 394.72 0 0 1-59.4 41.8c-15.7-45-35.8-84.1-59.2-115.4 3.7 1.4 7.4 2.9 11 4.4zm-90.6 700.6c-9.2 7.2-18.4 12.7-27.7 16.4V697a389.1 389.1 0 0 1 115.7 26.2c-8.3 24.6-17.9 47.3-29 67.8-17.4 32.4-37.8 58.3-59 75.1zm59-633.1c11 20.6 20.7 43.3 29 67.8A389.1 389.1 0 0 1 540 327V141.6c9.2 3.7 18.5 9.1 27.7 16.4 21.2 16.7 41.6 42.6 59 75zM540 640.9V540h147.5c-1.6 44.2-7.1 87.1-16.3 127.8l-.3 1.2A445.02 445.02 0 0 0 540 640.9zm0-156.9V383.1c45.8-2.8 89.8-12.5 130.9-28.1l.3 1.2c9.2 40.7 14.7 83.5 16.3 127.8H540zm-56 56v100.9c-45.8 2.8-89.8 12.5-130.9 28.1l-.3-1.2c-9.2-40.7-14.7-83.5-16.3-127.8H484zm-147.5-56c1.6-44.2 7.1-87.1 16.3-127.8l.3-1.2c41.1 15.6 85 25.3 130.9 28.1V484H336.5zM484 697v185.4c-9.2-3.7-18.5-9.1-27.7-16.4-21.2-16.7-41.7-42.7-59.1-75.1-11-20.6-20.7-43.3-29-67.8 37.2-14.6 75.9-23.3 115.8-26.1zm0-370a389.1 389.1 0 0 1-115.7-26.2c8.3-24.6 17.9-47.3 29-67.8 17.4-32.4 37.8-58.4 59.1-75.1 9.2-7.2 18.4-12.7 27.7-16.4V327zM365.7 165.5c3.7-1.5 7.3-3 11-4.4-23.4 31.3-43.5 70.4-59.2 115.4-21-12-40.9-26-59.4-41.8 31.8-29.2 67.9-52.4 107.6-69.2zM165.5 365.7c13.8-32.6 32-62.8 54.2-90.2 24.9 21.5 52.2 40.3 81.5 55.9-11.6 46.9-18.8 98.4-20.7 152.6H137c3-40.9 12.6-80.6 28.5-118.3zM137 540h143.5c1.9 54.2 9.1 105.7 20.7 152.6a444.07 444.07 0 0 0-81.5 55.9A373.86 373.86 0 0 1 137 540zm228.7 318.5c-39.7-16.8-75.8-40-107.6-69.2 18.5-15.8 38.4-29.7 59.4-41.8 15.7 45 35.8 84.1 59.2 115.4-3.7-1.4-7.4-2.9-11-4.4zm292.6 0c-3.7 1.5-7.3 3-11 4.4 23.4-31.3 43.5-70.4 59.2-115.4 21 12 40.9 26 59.4 41.8a373.81 373.81 0 0 1-107.6 69.2z" />
                  </Svg>
                  <Text>
                    {data.personalData.nationality}
                    {data.personalData.permit
                      ? `, ${data.personalData.permit}`
                      : ""}
                    {data.personalData.age
                      ? `, ${data.personalData.age} ans`
                      : ""}
                  </Text>
                </View>
              )}
            {data.personalData.linkedinUrl && (
              <View style={styles.contactDetail}>
                <Svg
                  fill={iconColors.fill}
                  viewBox="0 0 1024 1024"
                  width="12"
                  height="12"
                >
                  <Path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1 1 68.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z" />
                </Svg>
                <Text>{data.personalData.linkedinUrl}</Text>
              </View>
            )}
          </View>
        </View>

        <View id="main" style={styles.main}>
          <View id="leftColumn" style={styles.leftColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Compétences</Text>
              <View
                id="skills"
                style={{ ...styles.sectionContent, ...styles.skills }}
              >
                {data.skills.map((s) => (
                  <Text key={s.skill} style={styles.skill}>
                    {s.skill}
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Expérience professionnelle
              </Text>
              <View id="experiences" style={styles.sectionContent}>
                {data.experiences.map((exp, index) => (
                  <View key={exp.company} id="experience" wrap={false}>
                    {index > 0 ? (
                      <Text
                        style={[styles.achievementTitle, { marginTop: "12px" }]}
                      >
                        {exp.title}
                      </Text>
                    ) : (
                      <Text style={styles.achievementTitle}>{exp.title}</Text>
                    )}
                    <Text style={styles.achievementPlace}>{exp.company}</Text>
                    <Text style={styles.achievementPlaceDesc}>
                      {exp.companyDesc}
                    </Text>
                    <View style={styles.achievementDetails}>
                      <Text>
                        {exp.fromMonth}/{exp.fromYear} -
                        {exp.current
                          ? " Maintenant"
                          : ` ${exp.toMonth}/${exp.toYear}`}
                      </Text>
                      <Text>
                        {exp.city ? `${exp.city}, ` : ""}
                        {exp.country}
                      </Text>
                    </View>
                    <View style={styles.achievementDescView}>
                      {exp.description.map((desc) => (
                        <View
                          key={desc.task}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: "4px",
                          }}
                        >
                          <Text style={styles.circle}></Text>
                          <Text style={styles.achievementDesc}>
                            {desc.task}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Formation</Text>
              <View id="education" style={styles.sectionContent}>
                {data.education.map((ed, index) => (
                  <View key={ed.degree} wrap={false}>
                    {index > 0 ? (
                      <Text
                        style={[styles.achievementTitle, { marginTop: "12px" }]}
                      >
                        {ed.degree} {ed.field}
                      </Text>
                    ) : (
                      <Text style={styles.achievementTitle}>
                        {ed.degree} {ed.field}
                      </Text>
                    )}
                    <Text style={styles.achievementPlace}>{ed.school}</Text>
                    <View style={styles.achievementDetails}>
                      <Text>
                        {ed.fromMonth}/{ed.fromYear} - {ed.toMonth}/{ed.toYear}
                      </Text>
                      <Text>
                        {ed.city ? `${ed.city}, ` : ""}
                        {ed.country}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View id="rightColumn" style={styles.rightColumn}>
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              <View
                id="certifications"
                style={{ ...styles.sectionContent, ...styles.options }}
              >
                {data.certifications.map((cert, index) => (
                  <View key={cert.title}>
                    <Text style={styles.optionTitle}>{cert.title}</Text>
                    <Text style={styles.optionDesc}>
                      {cert.issuer} ({cert.month}/{cert.year})
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>Projets Personnels</Text>
              <View id="projects" style={styles.sectionContent}>
                {data.projects.map((proj, index) => (
                  <View key={proj.company} id="experience" wrap={false}>
                    {index > 0 ? (
                      <Text
                        style={[styles.achievementTitle, { marginTop: "12px" }]}
                      >
                        {proj.title}
                      </Text>
                    ) : (
                      <Text style={styles.achievementTitle}>{proj.title}</Text>
                    )}
                    <Text style={styles.achievementPlaceDesc}>{proj.link}</Text>
                    <View style={styles.achievementDetails}>
                      <Text>
                        {proj.fromMonth}/{proj.fromYear} -
                        {proj.current
                          ? " Maintenant"
                          : ` ${proj.toMonth}/${proj.toYear}`}
                      </Text>
                    </View>
                    <View style={styles.achievementDescView}>
                      <Text style={styles.achievementDesc}>
                        {proj.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>Langues</Text>
              <View
                id="languages"
                style={{ ...styles.sectionContent, ...styles.options }}
              >
                {data.languages.map((l) => (
                  <View key={l.language}>
                    <Text style={styles.optionTitle}>{l.language}</Text>
                    <Text style={styles.optionDesc}>{l.level}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>Références</Text>
              <View
                id="references"
                style={{ ...styles.sectionContent, ...styles.options }}
              >
                {data.references.map((ref) => (
                  <View key={ref.name}>
                    <Text style={styles.optionTitle}>{ref.name}</Text>
                    <Text style={styles.optionDesc}>
                      {ref.position} chez {ref.company}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Centres d'intérêts</Text>
              <View
                id="hobbies"
                style={{ ...styles.sectionContent, ...styles.skills }}
              >
                {data.hobbies.map((h) => (
                  <Text key={h.hobby} style={styles.hobby}>
                    {h.hobby}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
