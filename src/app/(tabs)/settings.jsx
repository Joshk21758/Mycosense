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
  const [targetHumidity, setTargetHumidity] = useState("");
  const [targetTemp, setTargetTemp] = useState("");
  const [autoControl, setAutoControl] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const updateHumidity = (value) => {
    setTargetHumidity(value);
    setIsSaved(false);
  };

  const updateTemperature = (value) => {
    setTargetTemp(value);
    setIsSaved(false);
  };

  const updateAutoControl = (value) => {
    setAutoControl(value);
    setIsSaved(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View style={styles.topIcon}>
            <Ionicons name="options-outline" size={18} color="#477052" />
          </View>
          <View style={styles.topCopy}>
            <Text style={styles.topEyebrow}>SET YOUR GROW ROOM</Text>
            <Text style={styles.topTitle}>Room settings</Text>
          </View>
        </View>

        <View style={styles.introCard}>
          <View style={styles.introCopy}>
            <Text style={styles.introEyebrow}>YOUR GROW ROOM</Text>
            <Text style={styles.introTitle}>
              Set a comfortable space for your crop.
            </Text>
            <Text style={styles.introDescription}>
              Choose the room conditions you want to aim for.
            </Text>
          </View>
          <View style={styles.introIcon}>
            <Ionicons name="leaf-outline" size={25} color="#DCE8CA" />
          </View>
          <View style={styles.introOrb} />
        </View>

        <View style={styles.sectionHeading}>
          <View style={styles.sectionNumber}>
            <Text style={styles.sectionNumberText}>01</Text>
          </View>
          <View>
            <Text style={styles.sectionTitle}>Auto care</Text>
            <Text style={styles.sectionCaption}>
              Choose how you want your room managed
            </Text>
          </View>
        </View>

        <View style={styles.automationCard}>
          <View style={styles.automationTop}>
            <View
              style={[
                styles.automationIcon,
                !autoControl && styles.automationIconPaused,
              ]}
            >
              <Ionicons
                name="flash-outline"
                size={18}
                color={autoControl ? "#4F7955" : "#82877D"}
              />
            </View>
            <View style={styles.automationStatus}>
              <View
                style={[
                  styles.automationDot,
                  !autoControl && styles.automationDotPaused,
                ]}
              />
              <Text
                style={[
                  styles.automationStatusText,
                  !autoControl && styles.automationStatusTextPaused,
                ]}
              >
                {autoControl ? "ON" : "OFF"}
              </Text>
            </View>
          </View>
          <View style={styles.automationBody}>
            <View style={styles.automationCopy}>
              <Text style={styles.cardTitle}>Auto care</Text>
              <Text style={styles.cardDescription}>
                Keep your room close to the comfort levels you want.
              </Text>
            </View>
            <Switch
              accessibilityLabel="Enable automatic control preference"
              value={autoControl}
              onValueChange={updateAutoControl}
              trackColor={{ false: "#D9DED5", true: "#A8C19D" }}
              thumbColor={autoControl ? "#3F704C" : "#FFFFFF"}
              ios_backgroundColor="#D9DED5"
            />
          </View>
          <View style={styles.automationDivider} />
          <View style={styles.automationFoot}>
            <Ionicons
              name="information-circle-outline"
              size={14}
              color="#889184"
            />
            <Text style={styles.automationFootText}>
              This setting is not connected to your room equipment yet.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <View style={[styles.sectionNumber, styles.sectionNumberBlue]}>
            <Text
              style={[styles.sectionNumberText, styles.sectionNumberBlueText]}
            >
              02
            </Text>
          </View>
          <View>
            <Text style={styles.sectionTitle}>Comfort targets</Text>
            <Text style={styles.sectionCaption}>
              Choose the room comfort levels you want
            </Text>
          </View>
        </View>

        <View style={styles.targetCards}>
          <SettingInput
            icon="water-outline"
            iconColor="#51829A"
            label="Humidity"
            description="How moist you want the room to feel"
            value={targetHumidity}
            onChangeText={updateHumidity}
            unit="%"
            range="Good range · 85–95%"
            accessibilityLabel="Target humidity"
          />
          <SettingInput
            icon="thermometer-outline"
            iconColor="#B7654F"
            label="Temperature"
            description="Keep the room comfortable and steady"
            value={targetTemp}
            onChangeText={updateTemperature}
            unit="°C"
            range="Good range · 22–25°C"
            accessibilityLabel="Target temperature"
          />
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.85}
          onPress={() => setIsSaved(true)}
          style={[styles.saveButton, isSaved && styles.saveButtonSaved]}
        >
          <View style={styles.saveIcon}>
            <Ionicons
              name={isSaved ? "checkmark" : "checkmark-circle-outline"}
              size={18}
              color="#FFFFFF"
            />
          </View>
          <Text style={styles.saveButtonText}>
            {isSaved ? "Saved for now" : "Save changes"}
          </Text>
          {!isSaved ? (
            <Ionicons name="arrow-forward" size={17} color="#D8E7C5" />
          ) : null}
        </TouchableOpacity>
        <View style={styles.note}>
          <Ionicons
            name="information-circle-outline"
            size={15}
            color="#7C8879"
          />
          <Text style={styles.noteText}>
            These changes are saved only for this session. Your room equipment
            isn’t connected yet.
          </Text>
        </View>
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
  range,
  accessibilityLabel,
}) {
  return (
    <View style={styles.targetCard}>
      <View style={styles.targetCardTop}>
        <View
          style={[
            styles.settingInputIcon,
            iconColor === "#51829A"
              ? styles.settingInputIconBlue
              : styles.settingInputIconWarm,
          ]}
        >
          <Ionicons name={icon} size={19} color={iconColor} />
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
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldDescription}>{description}</Text>
      <View style={styles.rangePill}>
        <Ionicons name="leaf-outline" size={12} color="#72866B" />
        <Text style={styles.rangeText}>{range}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F6F1",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17,
  },
  topIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "#E8F0E7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  topCopy: {
    flex: 1,
  },
  topEyebrow: {
    color: "#7D8D75",
    fontSize: 8,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 1.1,
    marginBottom: 3,
  },
  topTitle: {
    color: "#29392E",
    fontSize: 19,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.5,
  },
  roomBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9EEE5",
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 11,
  },
  roomBadgeText: {
    color: "#64755F",
    fontSize: 8,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 0.6,
    marginLeft: 5,
  },
  introCard: {
    overflow: "hidden",
    position: "relative",
    flexDirection: "row",
    backgroundColor: "#315F42",
    borderRadius: 21,
    padding: 16,
    marginBottom: 21,
  },
  introCopy: {
    flex: 1,
    paddingRight: 5,
  },
  introEyebrow: {
    color: "#D1DFCE",
    fontSize: 8,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 0.9,
    marginBottom: 6,
  },
  introTitle: {
    maxWidth: 240,
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.3,
  },
  introDescription: {
    color: "#D2DFD1",
    fontSize: 9,
    lineHeight: 14,
    fontFamily: "Pliant-Regular",
    marginTop: 5,
  },
  introIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  introOrb: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    right: -66,
    bottom: -72,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionNumber: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: "#E8F0E7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },
  sectionNumberBlue: {
    backgroundColor: "#EAF2F4",
  },
  sectionNumberText: {
    color: "#648256",
    fontSize: 8,
    fontFamily: "GoogleSans-SemiBold",
  },
  sectionNumberBlueText: {
    color: "#51829A",
  },
  sectionTitle: {
    color: "#304034",
    fontSize: 13,
    fontFamily: "Pliant-Bold",
  },
  sectionCaption: {
    color: "#899286",
    fontSize: 9,
    fontFamily: "Pliant-Regular",
    marginTop: 3,
  },
  automationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E9EBE4",
    padding: 13,
    marginBottom: 21,
  },
  automationTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  automationIcon: {
    width: 33,
    height: 33,
    borderRadius: 11,
    backgroundColor: "#EAF1E7",
    alignItems: "center",
    justifyContent: "center",
  },
  automationIconPaused: {
    backgroundColor: "#F1F0EC",
  },
  automationStatus: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 9,
    backgroundColor: "#EDF3E9",
  },
  automationDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#69915B",
    marginRight: 5,
  },
  automationDotPaused: {
    backgroundColor: "#97998F",
  },
  automationStatusText: {
    color: "#5F7955",
    fontSize: 7,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 0.6,
  },
  automationStatusTextPaused: {
    color: "#777A72",
  },
  automationBody: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  automationCopy: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    color: "#334237",
    fontSize: 11,
    fontFamily: "GoogleSans-SemiBold",
    marginBottom: 4,
  },
  cardDescription: {
    color: "#899286",
    fontSize: 9,
    lineHeight: 14,
    fontFamily: "Pliant-Regular",
  },
  automationDivider: {
    height: 1,
    backgroundColor: "#EEF0EA",
    marginVertical: 11,
  },
  automationFoot: {
    flexDirection: "row",
    alignItems: "center",
  },
  automationFootText: {
    color: "#7F8A7E",
    fontSize: 8,
    fontFamily: "Pliant-Regular",
    marginLeft: 5,
  },
  targetCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 17,
  },
  targetCard: {
    width: "48.5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E9EBE4",
    padding: 12,
  },
  targetCardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },
  settingInputIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  settingInputIconBlue: {
    backgroundColor: "#EAF2F4",
  },
  settingInputIconWarm: {
    backgroundColor: "#F8EDE8",
  },
  numberInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 59,
    height: 34,
    backgroundColor: "#F7F8F4",
    borderWidth: 1,
    borderColor: "#ECEFE8",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  numberInput: {
    minWidth: 26,
    maxWidth: 37,
    color: "#344638",
    fontSize: 12,
    fontFamily: "Pliant-Bold",
    textAlign: "right",
    paddingVertical: 0,
    paddingHorizontal: 1,
  },
  unitText: {
    color: "#818A7F",
    fontSize: 9,
    fontFamily: "Pliant-Regular",
    marginLeft: 2,
  },
  fieldLabel: {
    color: "#334237",
    fontSize: 10,
    fontFamily: "GoogleSans-SemiBold",
    marginBottom: 4,
  },
  fieldDescription: {
    color: "#929A8F",
    fontSize: 8,
    fontFamily: "Pliant-Regular",
    lineHeight: 12,
    minHeight: 24,
  },
  rangePill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDF3E9",
    borderRadius: 9,
    paddingHorizontal: 6,
    paddingVertical: 5,
    marginTop: 10,
  },
  rangeText: {
    color: "#64795E",
    fontSize: 7,
    fontFamily: "GoogleSans-SemiBold",
    marginLeft: 4,
  },
  saveButton: {
    minHeight: 49,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2F6044",
    borderRadius: 15,
    paddingHorizontal: 14,
    marginBottom: 11,
  },
  saveButtonSaved: {
    backgroundColor: "#476C4B",
  },
  saveIcon: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },
  saveButtonText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "GoogleSans-SemiBold",
  },
  note: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 2,
  },
  noteText: {
    flex: 1,
    color: "#7C8879",
    fontSize: 8,
    lineHeight: 13,
    fontFamily: "Pliant-Regular",
    marginLeft: 6,
  },
});
