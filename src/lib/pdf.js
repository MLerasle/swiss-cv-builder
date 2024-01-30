import { View, Text, StyleSheet } from "@react-pdf/renderer";

const getFormat = (id) => {
  switch (id) {
    case 1:
      return "bold";
    case 2:
      return "italic";
    case 3:
      return "bolditalic";
    case 4:
      return "strikethrough";
    case 8:
      return "underline";
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  italic: {
    fontFamily: "Helvetica-Oblique",
  },
  bolditalic: {
    fontFamily: "Helvetica-BoldOblique",
  },
  underline: {
    textDecoration: "underline",
  },
  strikethrough: {
    textDecoration: "line-through",
  },
  list: {
    margin: "4px 0",
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "1px 0",
  },
  bulletCircle: {
    display: "block",
    height: "4px",
    width: "4px",
    borderRadius: "9999px",
    marginRight: "6px",
  },
});

export function formatRichText(content, themeColor) {
  if (!content) return;
  const description = JSON.parse(content);
  const descriptionParts = description.root.children;
  const pdfParts = [];

  descriptionParts.forEach((node, id) => {
    if (node.type === "list") {
      const listItems = node.children.map((listItem) => {
        const content = listItem.children.map((child) => {
          return {
            text: child.text,
            format: getFormat(child.format),
          };
        });

        return { content };
      });

      pdfParts.push(
        <View key={id} style={styles.list}>
          {listItems.map((item, idx) => (
            <View key={idx} style={styles.listItem}>
              <View
                style={[styles.bulletCircle, { backgroundColor: themeColor }]}
              ></View>
              <Text style={{ flexDirection: "row" }}>
                {Object.values(item).map((item) =>
                  item.map((content) => (
                    <Text key={content.text} style={styles[content.format]}>
                      {content.text}
                    </Text>
                  ))
                )}
              </Text>
            </View>
          ))}
        </View>
      );
    } else if (node.type === "paragraph" && node.children?.length > 0) {
      const paragraphContent = node.children.map((content) => {
        return {
          text: content.text,
          format: getFormat(content.format),
        };
      });

      pdfParts.push(
        <View key={id} style={{ flexDirection: "row" }}>
          {paragraphContent.map((p, idx) => (
            <Text key={idx} style={styles[p.format]}>
              {p.text}
            </Text>
          ))}
        </View>
      );
    }
  });

  return pdfParts;
}
