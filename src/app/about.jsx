import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  BrandHeader,
  PageIntro,
  PrimaryButton,
  ScreenFrame,
} from "../components/PublicUi";

const principles = [
  {
    icon: "eye-outline",
    title: "Understand your space",
    description:
      "See the conditions that matter, without getting lost in a wall of numbers.",
    color: "#517D62",
    background: "#EDF3E9",
  },
  {
    icon: "options-outline",
    title: "Make thoughtful changes",
    description:
      "Keep a closer eye on temperature, humidity, and the details in between.",
    color: "#51829A",
    background: "#EAF2F4",
  },
  {
    icon: "leaf-outline",
    title: "Grow with confidence",
    description:
      "Build a steady routine around a healthier, more balanced grow space.",
    color: "#A07936",
    background: "#F5F0E4",
  },
];

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ScreenFrame maxWidth={680}>
      <BrandHeader
        actionLabel="Get in touch"
        onActionPress={() => router.push("/contact")}
      />

      <View style={styles.hero}>
        <View style={styles.heroOrbLarge} />
        <View style={styles.heroOrbSmall} />
        <View style={styles.heroBadge}>
          <Ionicons
            name="sunny-outline"
            size={14}
            style={{ marginTop: -5 }}
            color="#D8E7C5"
          />
          <Text style={styles.heroBadgeText}>A SMARTER WAY TO GROW</Text>
        </View>
        <Text style={styles.heroTitle}>
          Good growing{"\n"}starts with{"\n"}
          <Text style={styles.heroAccent}>understanding.</Text>
        </Text>
        <Text style={styles.heroDescription}>
          Mycosense brings your grow environment into focus, so caring for it
          feels a little more natural.
        </Text>
      </View>

      <PageIntro
        eyebrow="WHY MYCOSENSE"
        title="A little more in tune with nature."
        description="A healthy grow space is all about balance. Mycosense makes it easier to understand what is happening and know where to start."
      />

      <View style={styles.principleList}>
        {principles.map((principle) => (
          <View key={principle.title} style={styles.principleCard}>
            <View
              style={[
                styles.principleIcon,
                { backgroundColor: principle.background },
              ]}
            >
              <Ionicons
                name={principle.icon}
                size={21}
                color={principle.color}
              />
            </View>
            <View style={styles.principleCopy}>
              <Text style={styles.principleTitle}>{principle.title}</Text>
              <Text style={styles.principleDescription}>
                {principle.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.closingCard}>
        <View style={styles.closingIcon}>
          <Ionicons name="sparkles-outline" size={19} color="#5F8158" />
        </View>
        <Text style={styles.closingTitle}>Small signals. Better growing.</Text>
        <Text style={styles.closingCopy}>
          Whether you are just getting started or refining your routine,
          mycosense is here to make the process feel clearer.
        </Text>
        <PrimaryButton
          label="Get started"
          onPress={() => router.push("/(tabs)/dashboard")}
        />
      </View>

      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => router.push("/contact")}
        style={styles.footerLink}
      >
        <Text style={styles.footerLinkText}>Have a question? We are here</Text>
        <Ionicons name="arrow-forward" size={15} color="#52734F" />
      </TouchableOpacity>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: "#28563D",
    borderRadius: 26,
    overflow: "hidden",
    paddingHorizontal: 23,
    paddingTop: 24,
    paddingBottom: 24,
    marginBottom: 31,
  },
  heroOrbLarge: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "rgba(255,255,255,0.045)",
    right: -105,
    top: 45,
  },
  heroOrbSmall: {
    position: "absolute",
    width: 136,
    height: 136,
    borderRadius: 68,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    right: -29,
    top: 87,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  heroBadgeText: {
    color: "#D8E7C5",
    fontSize: 10,
    fontFamily: "GoogleSans-Bold",
    letterSpacing: 1,
    marginLeft: 7,
  },
  heroTitle: {
    color: "#FAF9F3",
    fontSize: 29,
    lineHeight: 40,
    fontFamily: "Pliant-Bold",
    letterSpacing: -1.3,
    marginBottom: 13,
  },
  heroAccent: {
    color: "#D8E7C5",
  },
  heroDescription: {
    maxWidth: 360,
    color: "#D1DFD1",
    fontSize: 13,
    lineHeight: 21,
    fontFamily: "Pliant-Regular",
  },
  principleList: {
    gap: 10,
    marginTop: -7,
    marginBottom: 25,
  },
  principleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECEDE6",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 15,
  },
  principleIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  principleCopy: {
    flex: 1,
  },
  principleTitle: {
    color: "#2D3C31",
    fontSize: 12,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  principleDescription: {
    color: "#7D887D",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Pliant-Regular",
  },
  closingCard: {
    backgroundColor: "#EEF1E9",
    borderRadius: 22,
    padding: 19,
  },
  closingIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "#E0E9D9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  closingTitle: {
    color: "#2D3C31",
    fontSize: 18,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  closingCopy: {
    color: "#748071",
    fontSize: 13,
    lineHeight: 19,
    fontFamily: "Pliant-Regular",
    marginBottom: 8,
  },
  footerLink: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingVertical: 19,
  },
  footerLinkText: {
    color: "#52734F",
    fontSize: 12,
    fontFamily: "Pliant-Regular",
  },
});
