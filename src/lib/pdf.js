import { View, Text, StyleSheet } from "@react-pdf/renderer";

const getFormat = (id) => {
  switch (id) {
    case 1:
      return "bold";
    case 2:
      return "italic";
    case 3:
      return "underline";
    case 4:
      return "strikethrough";
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

export function formatDescription(content, themeColor) {
  if (!content) return;
  const description = JSON.parse(content);
  const descriptionParts = description.root.children;
  const pdfParts = [];

  descriptionParts.forEach((node) => {
    if (node.type === "list") {
      const listItems = node.children.map((listItem) => {
        return {
          text: listItem.children[0].text,
          format: getFormat(listItem.children[0].format),
        };
      });

      pdfParts.push(
        <View style={styles.list}>
          {listItems.map((item) => (
            <View key={item.text} style={styles.listItem}>
              <Text
                style={[styles.bulletCircle, { backgroundColor: themeColor }]}
              ></Text>
              <Text>{item.text}</Text>
            </View>
          ))}
        </View>
      );
    } else if (node.type === "paragraph" && node.children?.length > 0) {
      const paragraph = {
        text: node.children[0].text,
        format: getFormat(node.children[0].format),
      };

      pdfParts.push(
        <Text style={styles[paragraph.format]}>{paragraph.text}</Text>
      );
    }
  });

  return pdfParts;
}
