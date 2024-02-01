import { Page, View, Document, StyleSheet } from "@react-pdf/renderer";

import { Headline } from "@/components/templates/sections/Headline";
import { Contact } from "@/components/templates/sections/Contact";
import { Skills } from "@/components/templates/sections/Skills";
import { Experiences } from "@/components/templates/sections/Experiences";
import { Education } from "@/components/templates/sections/Education";
import { Certifications } from "@/components/templates/sections/Certifications";
import { Projects } from "@/components/templates/sections/Projects";
import { Languages } from "@/components/templates/sections/Languages";
import { References } from "@/components/templates/sections/References";
import { Hobbies } from "@/components/templates/sections/Hobbies";
import { useResume } from "@/hooks/useResume";

const colors = {
  lightGray: "#94a3b8",
  darkGray: "#475569",
};

export function Template1({ data, defaultColor }) {
  const { fonts } = useResume();
  const mainColor = data.template.color || defaultColor;
  const iconColors = { fill: "white", stroke: mainColor };
  const defaultFont = data.template.font || "Helvetica";
  const font = fonts.find((f) => f.family === defaultFont);

  const styles = StyleSheet.create({
    page: {
      flexDirection: "col",
      backgroundColor: "white",
      fontFamily: font.styles.normal,
      padding: "16px 24px",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    headerMain: {
      maxWidth: "60%",
    },
    title: {
      color: colors.darkGray,
      fontSize: "14px",
      marginTop: "2px",
    },
    summary: {
      fontSize: "8px",
      marginTop: "10px",
      lineHeight: "1.2px",
    },
    contact: {
      backgroundColor: mainColor,
      fontSize: "8px",
      flexDirection: "col",
      justifyContent: "space-around",
      padding: "8px",
      borderRadius: "4px",
      color: "white",
      maxWidth: "35%",
    },
    contactDetail: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: "4px",
      marginTop: "4px",
    },
    section: {
      padding: "16px 0",
    },
    sectionTitle: {
      fontFamily: font.styles.bold,
      color: mainColor,
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
      backgroundColor: colors.lightGray,
      color: "white",
      padding: "4px 8px",
      borderRadius: "4px",
    },
    hobby: {
      border: `1px solid ${colors.lightGray}`,
      padding: "4px 8px",
      borderRadius: "4px",
    },
    achievementTitle: {
      fontFamily: font.styles.bold,
      fontSize: "12px",
    },
    achievementPlace: {
      fontSize: "12px",
      marginTop: "1px",
    },
    achievementDetails: {
      fontFamily: font.styles.italic,
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: "8px",
      color: mainColor,
      marginTop: "4px",
    },
    achievementPlaceDesc: {
      fontFamily: font.styles.italic,
      fontSize: "8px",
      color: colors.darkGray,
      marginTop: "2px",
    },
    achievementDescView: {
      marginTop: "4px",
      fontSize: "8px",
    },
    options: {
      marginTop: "10px",
      flexDirection: "row",
      fontSize: "8px",
      columnGap: "40px",
    },
    optionTitle: {
      fontSize: "10px",
    },
    optionDesc: {
      fontFamily: font.styles.italic,
      color: mainColor,
      marginTop: "2px",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View id="header" style={styles.header}>
          <Headline
            name={data.personalData.name}
            title={data.personalData.title}
            summary={data.summary}
            styles={styles}
            mainColor={mainColor}
          />
          <Contact
            email={data.personalData.email}
            tel={data.personalData.tel}
            city={data.personalData.city}
            country={data.personalData.country}
            nationality={data.personalData.nationality}
            permit={data.personalData.permit}
            linkedinUrl={data.personalData.linkedinUrl}
            iconColors={iconColors}
            styles={styles}
          />
        </View>

        <View id="main" style={styles.main}>
          <Skills skills={data.skills} styles={styles} />
          <Experiences
            experiences={data.experiences}
            styles={styles}
            template="template1"
            mainColor={mainColor}
          />
          <Education
            education={data.education}
            styles={styles}
            template="template1"
            mainColor={mainColor}
          />
          <Certifications
            certifications={data.certifications}
            styles={styles}
          />
          <Projects
            projects={data.projects}
            styles={styles}
            mainColor={mainColor}
          />
          <Languages languages={data.languages} styles={styles} />
          <References references={data.references} styles={styles} />
          <Hobbies hobbies={data.hobbies} styles={styles} />
        </View>
      </Page>
    </Document>
  );
}
