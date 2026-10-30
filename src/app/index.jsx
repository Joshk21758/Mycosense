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

const features = [
  {
    icon: "thermometer-outline",
    title: "Climate in balance",
    description: "Keep temperature and humidity in their ideal ranges.",
  },
  {
    icon: "analytics-outline",
    title: "A clearer picture",
    description: "See the conditions in your grow room at a glance.",
  },
  {
    icon: "leaf-outline",
    title: "Thoughtful automation",
    description: "Let your chamber respond when conditions change.",
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
        <View style={styles.brandRow}>
          <View style={styles.brandMark}>
            <Ionicons name="leaf" size={20} color="#F8F7F1" />
          </View>
          <Text style={styles.brandName}>Mycosense</Text>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroOrbLarge} />
          <View style={styles.heroOrbSmall} />
          <View style={styles.heroEyebrow}>
            <Ionicons name="sunny-outline" size={15} color="#D8E7C5" />
            <Text style={styles.heroEyebrowText}>
              YOUR HARVEST IS IN GOOD HANDS
            </Text>
          </View>
          <Text style={styles.heroTitle}>
            A healthier{"\n"}home for your{"\n"}
            <Text style={styles.heroTitleAccent}>harvest.</Text>
          </Text>
          <Text style={styles.heroDescription}>
            A convinient way to care for your growing environment. See what your
            chamber needs, all in one place.
          </Text>
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => router.replace("/(tabs)/dashboard")}
          >
            <Text style={styles.primaryButtonText}>Get started</Text>
            <View style={styles.buttonIcon}>
              <Ionicons name="arrow-forward" size={17} color="#244B36" />
            </View>
          </TouchableOpacity>
          <View style={styles.heroFootnote}>
            <Ionicons name="leaf-outline" size={15} color="#D8E7C5" />
            <Text style={styles.heroFootnoteText}>
              Better conditions. More room to grow.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionEyebrow}>MADE FOR HEALTHIER GROWTH</Text>
          <Text style={styles.sectionTitle}>Everything in its element.</Text>
        </View>

        <View style={styles.featureList}>
          {features.map((feature, index) => (
            <View key={feature.title} style={styles.featureCard}>
              <View
                style={[
                  styles.featureIcon,
                  index === 1 && styles.featureIconBlue,
                  index === 2 && styles.featureIconGold,
                ]}
              >
                <Ionicons
                  name={feature.icon}
                  size={21}
                  color={
                    index === 1
                      ? "#51829A"
                      : index === 2
                        ? "#A07936"
                        : "#477454"
                  }
                />
              </View>
              <View style={styles.featureCopy}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerDescription}>
            GROW BETTER WITH MYCOSENSE
          </Text>
          <View style={styles.footerDivider} />
          <View style={styles.footerLinks}>
            <Pressable
              onPress={() => router.push("/about")}
              accessibilityRole="button"
            >
              <Text style={styles.footerLink}>About</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/contact")}
              accessibilityRole="button"
            >
              <Text style={styles.footerLink}>Contact Us</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/(auth)/register")}
              accessibilityRole="button"
            >
              <Text style={styles.footerLink}>Sign Up</Text>
            </Pressable>
          </View>
          <Text style={styles.footerCopyright}>Mycosense · Beta</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7F2",
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 32,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  brandMark: {
    width: 36,
    height: 36,
    borderRadius: 13,
    backgroundColor: "#2F6044",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },
  brandName: {
    color: "#24362A",
    fontSize: 16,
    fontFamily: "Pliant-Bold",
    letterSpacing: 0.6,
  },
  brandPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9EEE3",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: "auto",
  },
  brandDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#648C55",
    marginRight: 6,
  },
  brandPillText: {
    color: "#55704B",
    fontSize: 9,
    fontFamily: "Pliant-Regular",
  },
  heroCard: {
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#28563D",
    borderRadius: 26,
    paddingHorizontal: 23,
    paddingTop: 25,
    paddingBottom: 20,
    marginBottom: 30,
  },
  heroOrbLarge: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "rgba(255,255,255,0.045)",
    right: -100,
    top: 50,
  },
  heroOrbSmall: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    right: -26,
    top: 88,
  },
  heroEyebrow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  heroEyebrowText: {
    color: "#D8E7C5",
    fontSize: 10,
    fontFamily: "GoogleSans-SemiBold",
    marginTop: 5,
    letterSpacing: 1.15,
    marginLeft: 3,
  },
  heroTitle: {
    color: "#FAF9F3",
    fontSize: 30,
    lineHeight: 40,
    fontFamily: "Pliant-Bold",
    letterSpacing: -1.5,
    marginBottom: 13,
  },
  heroTitleAccent: {
    color: "#72c307",
  },
  heroDescription: {
    color: "#D1DFD1",
    fontSize: 13,
    fontFamily: "Pliant-Regular",
    lineHeight: 15,
    marginBottom: 21,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    minHeight: 50,
    backgroundColor: "#F7F7F2",
    borderRadius: 16,
    paddingTop: 4,
    paddingLeft: 17,
    paddingRight: 7,
    marginBottom: 19,
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
    marginTop: -4,
    borderRadius: 12,
    backgroundColor: "#daf2c3",
    alignItems: "center",
    justifyContent: "center",
  },
  heroFootnote: {
    flexDirection: "row",
    alignItems: "center",
  },
  heroFootnoteText: {
    color: "#D1DFD1",
    fontSize: 11,
    fontFamily: "Pliant-Regular",
    marginLeft: 7,
  },
  sectionHeading: {
    marginBottom: 14,
  },
  sectionEyebrow: {
    color: "#75856F",
    fontSize: 9,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 1.2,
  },
  sectionTitle: {
    color: "#27392D",
    fontSize: 21,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.6,
  },
  featureList: {
    gap: 10,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECEDE6",
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 14,
  },
  featureIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EDF3E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  featureIconBlue: {
    backgroundColor: "#EBF2F4",
  },
  featureIconGold: {
    backgroundColor: "#F5F0E4",
  },
  featureCopy: {
    flex: 1,
    paddingRight: 8,
  },
  featureTitle: {
    color: "#2D3C31",
    fontSize: 12,
    fontFamily: "Pliant-Bold",
  },
  featureDescription: {
    color: "#7D887D",
    fontSize: 11,
    fontFamily: "Pliant-Regular",
    lineHeight: 16,
  },
  footerText: {
    color: "#9BA394",
    fontSize: 9,
    fontFamily: "Pliant-Regular",
    letterSpacing: 1.2,
    textAlign: "center",
    marginTop: 23,
  },
  footer: {
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 25,
  },
  footerDescription: {
    color: "#75827a",
    fontFamily: "GoogleSans-SemiBold",
    fontSize: 10,
    marginTop: 9,
  },
  footerDivider: {
    backgroundColor: "#e2e8e2",
    height: 1,
    marginVertical: 18,
    width: "100%",
  },
  footerLinks: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 22,
    justifyContent: "center",
  },
  footerLink: {
    color: "#385343",
    fontFamily: "GoogleSans-SemiBold",
    fontSize: 11,
  },
  footerCopyright: {
    color: "#98a39c",
    fontFamily: "GoogleSans-Regular",
    fontSize: 9,
    letterSpacing: 1.8,
    marginTop: 18,
  },
});
