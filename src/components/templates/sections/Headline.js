import { Text, View } from "@react-pdf/renderer";

import { formatRichText } from "@/lib/pdf";

export function Headline({ name, title, summary, styles, mainColor }) {
  return (
    <View style={styles.headerMain}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.summary}>{formatRichText(summary, mainColor)}</View>
    </View>
  );
}
