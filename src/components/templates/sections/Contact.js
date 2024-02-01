import { Text, View } from "@react-pdf/renderer";

import { EmailIcon } from "@/components/templates/icons/EmailIcon";
import { MobileIcon } from "@/components/templates/icons/MobileIcon";
import { MapIcon } from "@/components/templates/icons/MapIcon";
import { GlobeIcon } from "@/components/templates/icons/GlobeIcon";
import { LinkedinIcon } from "@/components/templates/icons/LinkedinIcon";

export function Contact(props) {
  return (
    <View style={props.styles.contact}>
      {props.email && (
        <View style={props.styles.contactDetail}>
          <EmailIcon
            stroke={props.iconColors.stroke}
            fill={props.iconColors.fill}
          />
          <Text>{props.email}</Text>
        </View>
      )}
      {props.tel && (
        <View style={props.styles.contactDetail}>
          <MobileIcon
            stroke={props.iconColors.stroke}
            fill={props.iconColors.fill}
          />
          <Text>{props.tel}</Text>
        </View>
      )}
      {(props.city || props.country) && (
        <View style={props.styles.contactDetail}>
          <MapIcon fill={props.iconColors.fill} />
          <Text>
            {props.city && props.country
              ? `${props.city}, ${props.country}`
              : props.city && !props.country
              ? `${props.city}`
              : !props.city && props.country
              ? `${props.country}`
              : null}
          </Text>
        </View>
      )}
      {(props.nationality || props.permit) &&
        props.permit !== "Aucun Permis" && (
          <View style={props.styles.contactDetail}>
            <GlobeIcon fill={props.iconColors.fill} />
            <Text>
              {props.nationality}
              {props.permit ? `, ${props.permit}` : null}
              {props.age ? `, ${props.age} ans` : null}
            </Text>
          </View>
        )}
      {props.linkedinUrl && (
        <View style={props.styles.contactDetail}>
          <LinkedinIcon fill={props.iconColors.fill} />
          <Text>{props.linkedinUrl}</Text>
        </View>
      )}
    </View>
  );
}
