import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const highlights = [
  {
    icon: "pulse-outline",
    title: "See how your mushrooms are doing",
    description:
      "Check the heat, moisture, and fresh air in your farm room to monitor live sensor readings.",
    color: "#447858",
    background: "#E8F0E7",
  },
  {
    icon: "calculator-outline",
    title: "Calculate your profits and crop yield",
    description: "Estimate your harvest, cash flow, costs.",
    color: "#A47C3D",
    background: "#F5EFE2",
  },
  {
    icon: "scan-outline",
    title: "Check for infections in your mushrooms",
    description:
      "Use your camera to take photos of your plants and get the best remedies.",
    color: "#557C91",
    background: "#E9F0F2",
  },
];

export default function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View style={styles.brandLockup}>
            <View style={styles.brandMark}>
              <Ionicons name="leaf" size={18} color="#F8F7F1" />
            </View>
            <Text style={styles.brandName}>MycoSense</Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroGlow} />
          <View style={styles.heroTopline}></View>
          <Text style={styles.heroTitle}>
            Grow your mushrooms{"\n"}with{"\n"}
            <Text style={styles.heroAccent}>ease and control.</Text>
          </Text>
          <Text style={styles.heroDescription}>
            We as Myconsense help our mushroom growing farmers make better
            decisions and actionable steps to prevent crop loss & damage. With
            the help of environmental sensors to monitor your crops efficiently.
          </Text>
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.85}
            style={styles.primaryButton}
            onPress={() => router.push("/(tabs)/dashboard")}
          >
            <Text style={styles.primaryButtonText}>Get started</Text>
            <View style={styles.buttonIcon}>
              <Ionicons name="arrow-forward" size={17} color="#244B36" />
            </View>
          </TouchableOpacity>
          <View style={styles.heroNote}>
            <Ionicons
              name="checkmark-circle-outline"
              size={15}
              color="#DCE8CA"
            />
            <Text style={styles.heroNoteText}>
              Read the information to below to help you get started.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionEyebrow}>HOW THE APP WORKS</Text>
          </View>
        </View>

        <View style={styles.featureList}>
          {highlights.map((feature, index) => (
            <View key={feature.title} style={styles.featureCard}>
              <View
                style={[
                  styles.featureIcon,
                  { backgroundColor: feature.background },
                ]}
              >
                <Ionicons name={feature.icon} size={19} color={feature.color} />
              </View>
              <View style={styles.featureCopy}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#AAB3A7" />
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.footerBrand}>
            <Text style={styles.footerBrandText}>
              Let us help you improve your harvest
            </Text>
          </View>
          <View style={styles.footerLinks}>
            <Pressable
              onPress={() => router.push("/about")}
              accessibilityRole="button"
            >
              <Text style={styles.footerLink}>About Us</Text>
            </Pressable>
            <View style={styles.footerDot} />
            <Pressable
              onPress={() => router.push("/contact")}
              accessibilityRole="button"
            >
              <Text style={styles.footerLink}>Contact Us</Text>
            </Pressable>
            <View style={styles.footerDot} />
            <Pressable
              onPress={() => router.push("/(auth)/register")}
              accessibilityRole="button"
            >
              <Text style={styles.footerLink}>Sign Up</Text>
            </Pressable>
          </View>
          <Text style={styles.footerCopyright}>MYCOSENSE · BETA</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F6F1",
  },
  content: {
    paddingHorizontal: 21,
    paddingTop: 12,
    paddingBottom: 28,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 19,
  },
  brandLockup: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandMark: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: "#315F42",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },
  brandName: {
    color: "#26382C",
    fontSize: 16,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.3,
  },
  signInButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
    paddingVertical: 8,
    backgroundColor: "#E8EFE5",
    borderRadius: 12,
  },
  signInText: {
    color: "#40674B",
    fontSize: 11,
    fontFamily: "GoogleSans-SemiBold",
    marginRight: 6,
  },
  heroCard: {
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#284F39",
    borderRadius: 25,
    padding: 21,
    marginBottom: 27,
  },
  heroGlow: {
    position: "absolute",
    width: 245,
    height: 245,
    right: -100,
    top: 38,
    borderRadius: 123,
    backgroundColor: "rgba(255,255,255,0.055)",
  },
  heroTopline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 19,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  heroBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D3E5A7",
    marginRight: 7,
  },
  heroBadgeText: {
    color: "#E0E9D4",
    fontSize: 8,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 0.8,
  },
  heroLeaf: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  heroTitle: {
    color: "#FAF9F3",
    fontSize: 27,
    lineHeight: 38,
    fontFamily: "Pliant-Bold",
    letterSpacing: -1.1,
    marginBottom: 10,
  },
  heroAccent: {
    color: "#D5E6A7",
  },
  heroDescription: {
    maxWidth: 305,
    color: "#D4DED1",
    fontSize: 12,
    fontFamily: "Pliant-Regular",
    lineHeight: 18,
    marginBottom: 17,
  },
  primaryButton: {
    minHeight: 49,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F6F7F0",
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 6,
    marginBottom: 15,
  },
  primaryButtonText: {
    color: "#294B35",
    fontSize: 11,
    fontFamily: "GoogleSans-SemiBold",
    marginRight: 16,
  },
  buttonIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#E1EBD3",
    alignItems: "center",
    justifyContent: "center",
  },
  heroNote: {
    flexDirection: "row",
    alignItems: "center",
  },
  heroNoteText: {
    color: "#D2DFCE",
    fontSize: 10,
    fontFamily: "Pliant-Regular",
    marginLeft: 6,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },
  sectionEyebrow: {
    color: "#7A8B72",
    fontSize: 9,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 1.1,
    marginBottom: 5,
  },
  sectionTitle: {
    color: "#28392E",
    fontSize: 18,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.5,
  },
  sectionMark: {
    width: 33,
    height: 33,
    borderRadius: 11,
    backgroundColor: "#E8EFE5",
    alignItems: "center",
    justifyContent: "center",
  },
  featureList: {
    gap: 9,
  },
  featureCard: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E9EBE4",
    borderRadius: 17,
    paddingHorizontal: 11,
    paddingVertical: 11,
  },
  featureNumber: {
    width: 26,
    height: 26,
    borderRadius: 9,
    backgroundColor: "#E8F0E7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  featureNumberGold: {
    backgroundColor: "#F5EFE2",
  },
  featureNumberBlue: {
    backgroundColor: "#E9F0F2",
  },
  featureNumberText: {
    color: "#698166",
    fontSize: 8,
    fontFamily: "GoogleSans-SemiBold",
  },
  featureIcon: {
    width: 37,
    height: 37,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  featureCopy: {
    flex: 1,
    paddingRight: 5,
  },
  featureTitle: {
    color: "#2D3C31",
    fontSize: 11,
    fontFamily: "GoogleSans-SemiBold",
    marginBottom: 3,
  },
  featureDescription: {
    color: "#7D887D",
    fontSize: 10,
    fontFamily: "Pliant-Regular",
    lineHeight: 14,
  },
  footer: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 5,
  },
  footerBrand: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  footerMark: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: "#315F42",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },
  footerBrandText: {
    color: "#536454",
    fontSize: 10,
    fontFamily: "GoogleSans-SemiBold",
  },
  footerLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  footerLink: {
    color: "#55705B",
    fontFamily: "GoogleSans-SemiBold",
    fontSize: 10,
  },
  footerDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#AAB4A7",
  },
  footerCopyright: {
    color: "#98A39C",
    fontFamily: "GoogleSans-Regular",
    fontSize: 8,
    letterSpacing: 1.3,
    marginTop: 14,
  },
});
