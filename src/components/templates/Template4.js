import { createElement } from "react";
import { Page, View, Document, StyleSheet } from "@react-pdf/renderer";

import { Headline } from "@/components/templates/sections/Headline";
import { Contact } from "@/components/templates/sections/Contact";
import { useResume } from "@/hooks/useResume";

const colors = {
  lightGray: "#94a3b8",
  darkGray: "#475569",
};

export function Template4({ data, defaultColor }) {
  const { fonts, pdfSections } = useResume();
  const mainColor = data.template.color || defaultColor;
  const iconColors = { fill: mainColor, stroke: "white" };
  const defaultFont = data.template.font || "Helvetica";
  const font = fonts.find((f) => f.family === defaultFont);

  const styles = StyleSheet.create({
    page: {
      flexDirection: "col",
      backgroundColor: "white",
      fontFamily: font.styles.normal,
      padding: "16px 0",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "0 24px",
      marginBottom: "16px",
    },
    headerMain: {
      maxWidth: "60%",
    },
    title: {
      color: mainColor,
      fontSize: "14px",
      marginTop: "2px",
    },
    summary: {
      fontSize: "8px",
      marginTop: "10px",
      lineHeight: "1.2px",
    },
    contact: {
      fontSize: "8px",
      flexDirection: "col",
      justifyContent: "space-around",
    },
    contactDetail: {
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "flex-start",
      columnGap: "4px",
      marginTop: "4px",
    },

    main: {
      padding: "0 24px",
      flexDirection: "row",
      columnGap: "24px",
    },
    leftColumn: {
      width: "30%",
    },
    rightColumn: {
      width: "70%",
    },
    section: {
      padding: "16px 0",
    },
    sectionTitle: {
      fontFamily: font.styles.bold,
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
      backgroundColor: mainColor,
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
      flexDirection: "col",
      fontSize: "8px",
      rowGap: "8px",
    },
    optionTitle: {
      fontSize: "10px",
    },
    optionDesc: {
      fontFamily: font.styles.italic,
      color: colors.darkGray,
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
          <View id="leftColumn" style={styles.leftColumn}>
            {data.template.sections.left.map((section) =>
              createElement(
                pdfSections.find((s) => s.key === section).template,
                { data, styles }
              )
            )}
          </View>

          <View id="rightColumn" style={styles.rightColumn}>
            {data.template.sections.right.map((section) =>
              createElement(
                pdfSections.find((s) => s.key === section).template,
                { data, styles }
              )
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
