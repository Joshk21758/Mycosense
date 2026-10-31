import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const [targetHumidity, setTargetHumidity] = useState("90");
  const [targetTemp, setTargetTemp] = useState("24");
  const [autoControl, setAutoControl] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeading}>
          <Text style={styles.pageTitle}>Chamber settings</Text>
          <Text style={styles.pageSubtitle}>
            Fine-tune your settings for better analysis.
          </Text>
        </View>

        <View style={styles.sectionHeading}>
          <View style={styles.sectionIcon}>
            <Ionicons name="sparkles-outline" size={17} color="#648256" />
          </View>
          <View>
            <Text style={styles.sectionTitle}>Automation</Text>
            <Text style={styles.sectionCaption}>
              Let your chamber make small adjustments
            </Text>
          </View>
        </View>
        <View style={styles.automationCard}>
          <View style={styles.automationCopy}>
            <Text style={styles.cardTitle}>Automatic control</Text>
            <Text style={styles.cardDescription}>
              Keep your environment close to its target conditions.
            </Text>
            <View
              style={[styles.modePill, !autoControl && styles.modePillPaused]}
            >
              <View
                style={[styles.modeDot, !autoControl && styles.modeDotPaused]}
              />
              <Text
                style={[styles.modeText, !autoControl && styles.modeTextPaused]}
              >
                {autoControl ? "AUTOMATION ON" : "MANUAL CONTROL"}
              </Text>
            </View>
          </View>
          <Switch
            accessibilityLabel="Enable automatic control"
            value={autoControl}
            onValueChange={setAutoControl}
            trackColor={{ false: "#D9DED5", true: "#A8C19D" }}
            thumbColor={autoControl ? "#3F704C" : "#FFFFFF"}
            ios_backgroundColor="#D9DED5"
          />
        </View>

        <View style={styles.sectionHeading}>
          <View style={[styles.sectionIcon, styles.sectionIconBlue]}>
            <Ionicons name="options-outline" size={17} color="#51829A" />
          </View>
          <View>
            <Text style={styles.sectionTitle}>Target conditions</Text>
            <Text style={styles.sectionCaption}>
              Set the range for your room
            </Text>
          </View>
        </View>
        <View style={styles.formCard}>
          <SettingInput
            icon="water-outline"
            iconColor="#51829A"
            label="Relative humidity"
            description="A comfortable level for moisture"
            value={targetHumidity}
            onChangeText={setTargetHumidity}
            unit="%"
            accessibilityLabel="Target relative humidity"
          />
          <View style={styles.formDivider} />
          <SettingInput
            icon="thermometer-outline"
            iconColor="#B7654F"
            label="Temperature"
            description="Keep the room moderate and steady"
            value={targetTemp}
            onChangeText={setTargetTemp}
            unit="°C"
            accessibilityLabel="Target temperature"
          />
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.85}
          style={styles.saveButton}
        >
          <Ionicons name="checkmark-circle-outline" size={19} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Save settings</Text>
          <Ionicons name="arrow-forward" size={17}  color="#D8E7C5" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingInput({
  icon,
  iconColor,
  label,
  description,
  value,
  onChangeText,
  unit,
  accessibilityLabel,
}) {
  return (
    <View style={styles.settingInputRow}>
      <View
        style={[
          styles.settingInputIcon,
          iconColor === "#51829A"
            ? styles.settingInputIconBlue
            : styles.settingInputIconWarm,
        ]}
      >
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View style={styles.settingInputCopy}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldDescription}>{description}</Text>
      </View>
      <View style={styles.numberInputWrap}>
        <TextInput
          accessibilityLabel={accessibilityLabel}
          style={styles.numberInput}
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          returnKeyType="done"
          selectTextOnFocus
        />
        <Text style={styles.unitText}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7F2",
    paddingTop: 10,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 26,
  },
  brandLockup: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandMark: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: "#2F6044",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  brandName: {
    color: "#283A2E",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  chamberBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#E9EEE5",
  },
  chamberBadgeText: {
    color: "#64755F",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginLeft: 5,
  },
  pageHeading: {
    marginBottom: 25,
  },
  eyebrow: {
    color: "#798A71",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.3,
    marginBottom: 7,
  },
  pageTitle: {
    color: "#26382C",
    fontSize: 21,
    fontFamily: "Pliant-Bold",
    letterSpacing: -1,
  },
  pageSubtitle: {
    color: "#778275",
    fontSize: 12,
    fontFamily: "Pliant-Regular",
    marginTop: 6,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 5,
  },
  sectionIcon: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: "#EDF3E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  sectionIconBlue: {
    backgroundColor: "#EAF2F4",
  },
  sectionIconGold: {
    backgroundColor: "#F5F0E4",
  },
  sectionTitle: {
    color: "#304034",
    fontSize: 14,
    fontFamily: "Pliant-Bold",
  },
  sectionCaption: {
    color: "#899286",
    fontSize: 10,
    fontFamily: "Pliant-Regular",
    marginTop: 3,
  },
  automationCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#ECEDE6",
    padding: 16,
    marginBottom: 21,
  },
  automationCopy: {
    flex: 1,
    paddingRight: 12,
  },
  cardTitle: {
    color: "#334237",
    fontSize: 12,
    fontFamily: "GoogleSans-SemiBold",
    lineHeight: 13,
    marginBottom: 5,
  },
  cardDescription: {
    color: "#899286",
    fontSize: 11,
    lineHeight: 16,
    fontFamily: "Pliant-Regular",
    maxWidth: 235,
  },
  modePill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#EDF3E9",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  modePillPaused: {
    backgroundColor: "#F1F0EC",
  },
  modeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: -4,
    backgroundColor: "#69915B",
    marginRight: 6,
  },
  modeDotPaused: {
    backgroundColor: "#97998F",
  },
  modeText: {
    color: "#5F7955",
    fontSize: 8,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 0.7,
  },
  modeTextPaused: {
    color: "#777A72",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#ECEDE6",
    paddingHorizontal: 14,
    marginBottom: 21,
  },
  settingInputRow: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
  },
  settingInputIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  settingInputIconBlue: {
    backgroundColor: "#EAF2F4",
  },
  settingInputIconWarm: {
    backgroundColor: "#F8EDE8",
  },
  settingInputCopy: {
    flex: 1,
    paddingRight: 5,
  },
  fieldLabel: {
    color: "#666666",
    fontSize: 11,
    fontFamily: "Pliant-Bold",
    marginBottom: 4,
  },
  fieldDescription: {
    color: "#929A8F",
    fontSize: 9,
    fontFamily: "Pliant-Regular",
    lineHeight: 13,
  },
  numberInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 73,
    height: 40,
    backgroundColor: "#F7F8F4",
    borderWidth: 1,
    borderColor: "#ECEFE8",
    borderRadius: 12,
    paddingHorizontal: 7,
  },
  numberInput: {
    minWidth: 33,
    color: "#344638",
    fontSize: 14,
    fontFamily: "Pliant-Bold",
    textAlign: "right",
    paddingVertical: 0,
    paddingHorizontal: 2,
  },
  unitText: {
    color: "#818A7F",
    fontSize: 11,
    fontFamily: "Pliant-Regular",
    marginLeft: 3,
  },
  formDivider: {
    height: 1,
    backgroundColor: "#EEF0EA",
    marginLeft: 48,
  },
  connectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#ECEDE6",
    padding: 15,
    marginBottom: 19,
  },
  addressInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8F4",
    borderWidth: 1,
    borderColor: "#ECEFE8",
    borderRadius: 12,
    marginTop: 8,
    paddingHorizontal: 11,
  },
  textInput: {
    flex: 1,
    color: "#656765",
    fontSize: 12,
    fontFamily: "Pliant-Regular",
    paddingVertical: 12,
    paddingHorizontal: 9,
  },
  inputHint: {
    color: "#929A8F",
    fontSize: 8,
    fontFamily: "Pliant-Regular",
    lineHeight: 15,
    marginTop: 8,
  },
  saveButton: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2F6044",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginTop: 1,
  },
  saveButtonText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Pliant-Bold",
    marginLeft: 10,
  },
  footerText: {
    color: "#9BA394",
    fontSize: 9,
    fontFamily: "Pliant-Regular",
    letterSpacing: 1.15,
    textAlign: "center",
    marginTop: 19,
  },
});
