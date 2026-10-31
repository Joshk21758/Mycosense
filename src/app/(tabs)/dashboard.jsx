import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";

const initialSensorData = {
  temperature: 23.5,
  humidity: 88,
  co2: 750,
  moisture: 72,
  fanStatus: true,
  humidifierStatus: false,
};

const metrics = [
  {
    key: "temperature",
    label: "Temperature",
    icon: "thermometer-outline",
    tint: "#B7654F",
    iconBackground: "#F8EDE8",
    value: (telemetry) => telemetry.temperature.toFixed(1),
    unit: "°C",
    target: "22–25°C",
    isInRange: (telemetry) =>
      telemetry.temperature >= 22 && telemetry.temperature <= 25,
  },
  {
    key: "humidity",
    label: "Humidity",
    icon: "water-outline",
    tint: "#51829A",
    iconBackground: "#EAF2F4",
    value: (telemetry) => `${telemetry.humidity}`,
    unit: "%",
    target: "85–95%",
    isInRange: (telemetry) =>
      telemetry.humidity >= 85 && telemetry.humidity <= 95,
  },
  {
    key: "co2",
    label: "Air quality",
    icon: "cloud-outline",
    tint: "#8873A0",
    iconBackground: "#F0EDF5",
    value: (telemetry) => `${telemetry.co2}`,
    unit: "ppm",
    target: "Below 800 ppm",
    isInRange: (telemetry) => telemetry.co2 < 800,
  },
  {
    key: "moisture",
    label: "Growing base",
    icon: "leaf-outline",
    tint: "#628353",
    iconBackground: "#EDF2E9",
    value: (telemetry) => `${telemetry.moisture}`,
    unit: "%",
    target: "65–75%",
    isInRange: (telemetry) =>
      telemetry.moisture >= 65 && telemetry.moisture <= 75,
  },
];

export default function DashboardScreen() {
  const [telemetry, setTelemetry] = useState(initialSensorData);
  const isBalanced = metrics.every((metric) => metric.isInRange(telemetry));

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((previous) => ({
        ...previous,
        temperature: +(
          previous.temperature +
          (Math.random() * 0.4 - 0.2)
        ).toFixed(1),
        humidity: Math.min(
          99,
          Math.max(60, Math.floor(previous.humidity + (Math.random() * 2 - 1))),
        ),
        co2: Math.floor(previous.co2 + (Math.random() * 20 - 10)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleActuator = (key, value) => {
    setTelemetry((previous) => ({ ...previous, [key]: value }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View>
            <Text style={styles.brandEyebrow}>MYCOSENSE</Text>
            <Text style={styles.brandTitle}>Your room</Text>
          </View>
          <View style={styles.roomBadge}>
            <View style={styles.roomIcon}>
              <Ionicons name="home-outline" size={15} color="#477052" />
            </View>
            <View>
              <Text style={styles.roomLabel}>GROW SPACE</Text>
              <Text style={styles.roomName}>Room 1</Text>
            </View>
          </View>
        </View>

        <View
          style={[styles.statusCard, !isBalanced && styles.statusCardAlert]}
        >
          <View style={styles.statusTop}>
            <View style={styles.statusIcon}>
              <Ionicons
                name={isBalanced ? "leaf" : "alert-circle"}
                size={20}
                color="#E5EDDA"
              />
            </View>
            <View
              style={[
                styles.sampleBadge,
                !isBalanced && styles.sampleBadgeAlert,
              ]}
            >
              <View
                style={[styles.sampleDot, !isBalanced && styles.sampleDotAlert]}
              />
              <Text
                style={[
                  styles.sampleText,
                  !isBalanced && styles.sampleTextAlert,
                ]}
              >
                LIVE
              </Text>
            </View>
          </View>
          <Text style={styles.statusEyebrow}>ROOM STATUS</Text>
          <Text style={styles.statusTitle}>
            {isBalanced ? "Everything looks good." : "Needs a quick check."}
          </Text>
          <Text style={styles.statusDescription}>
            {isBalanced
              ? "Your room is in a healthy range."
              : "One or more readings are a bit off."}
          </Text>
          <View style={styles.statusFooter}>
            <Ionicons
              name="leaf-outline"
              size={14}
              color="rgba(241,246,232,0.8)"
            />
            <Text style={styles.statusFooterText}>
              Oyster mushrooms <Text style={styles.statusSeparator}>·</Text>{" "}
              Fruiting phase
            </Text>
          </View>
          <View style={styles.statusOrb} />
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Room conditions</Text>
            <Text style={styles.sectionCaption}>
              Live readings · updates every few seconds
            </Text>
          </View>
          <View style={styles.sectionAction}>
            <Ionicons name="pulse-outline" size={17} color="#55795A" />
          </View>
        </View>

        <View style={styles.metricList}>
          {metrics.map((metric, index) => {
            const inRange = metric.isInRange(telemetry);
            return (
              <View
                key={metric.key}
                style={[
                  styles.metricCard,
                  index === 0 && styles.metricCardFirst,
                ]}
              >
                <View
                  style={[
                    styles.metricIcon,
                    { backgroundColor: metric.iconBackground },
                  ]}
                >
                  <Ionicons name={metric.icon} size={19} color={metric.tint} />
                </View>
                <View style={styles.metricCopy}>
                  <Text style={styles.metricLabel}>{metric.label}</Text>
                  <Text style={styles.metricTarget}>
                  Goal: {metric.target}
                  </Text>
                </View>
                <View style={styles.metricReading}>
                  <View style={styles.valueRow}>
                    <Text style={styles.metricValue}>
                      {metric.value(telemetry)}
                    </Text>
                    <Text style={styles.metricUnit}>{metric.unit}</Text>
                  </View>
                  <View
                    style={[
                      styles.rangeBadge,
                      !inRange && styles.rangeBadgeAlert,
                    ]}
                  >
                    <View
                      style={[
                        styles.rangeDot,
                        !inRange && styles.rangeDotAlert,
                      ]}
                    />
                    <Text
                      style={[
                        styles.rangeText,
                        !inRange && styles.rangeTextAlert,
                      ]}
                    >
                      {inRange ? "Healthy" : "Check"}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Room tools</Text>
            <Text style={styles.sectionCaption}>Quick controls</Text>
          </View>
          <View style={styles.equipmentCount}>
            <Text style={styles.equipmentCountText}>02</Text>
          </View>
        </View>

        <View style={styles.equipmentCard}>
          <ActuatorRow
            icon="sync-outline"
            title="Air fan"
            description={telemetry.fanStatus ? "On · auto" : "Off"}
            color="#4F8060"
            iconBackground="#EDF3E9"
            value={telemetry.fanStatus}
            onValueChange={(value) => toggleActuator("fanStatus", value)}
          />
          <View style={styles.divider} />
          <ActuatorRow
            icon="water-outline"
            title="Humidifier"
            description={telemetry.humidifierStatus ? "On" : "Off"}
            color="#51829A"
            iconBackground="#EAF2F4"
            value={telemetry.humidifierStatus}
            onValueChange={(value) => toggleActuator("humidifierStatus", value)}
          />
        </View>
        <View style={styles.previewNote}>
          <Ionicons
            name="information-circle-outline"
            size={15}
            color="#7C8879"
          />
          <Text style={styles.previewNoteText}>
            These readings and controls are a preview only and are not connected
            to your room equipment yet.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ActuatorRow({
  icon,
  title,
  description,
  color,
  iconBackground,
  value,
  onValueChange,
}) {
  return (
    <View style={styles.actuatorRow}>
      <View style={[styles.actuatorIcon, { backgroundColor: iconBackground }]}>
        <Ionicons name={icon} size={19} color={color} />
      </View>
      <View style={styles.actuatorCopy}>
        <Text style={styles.actuatorTitle}>{title}</Text>
        <Text style={styles.actuatorDescription}>{description}</Text>
      </View>
      <Switch
        accessibilityLabel={`Toggle ${title}`}
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#D9DED5", true: "#A8C19D" }}
        thumbColor={value ? "#3F704C" : "#FFFFFF"}
        ios_backgroundColor="#D9DED5"
      />
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
    paddingBottom: 28,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 17,
  },
  brandEyebrow: {
    color: "#7D8D75",
    fontSize: 8,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 1.4,
    marginBottom: 4,
  },
  brandTitle: {
    color: "#29392E",
    fontSize: 21,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.5,
  },
  roomBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 13,
    backgroundColor: "#E9EEE5",
  },
  roomIcon: {
    width: 29,
    height: 29,
    borderRadius: 10,
    backgroundColor: "#F7F8F3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },
  roomLabel: {
    color: "#84917D",
    fontSize: 7,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 0.7,
    marginBottom: 2,
  },
  roomName: {
    color: "#425744",
    fontSize: 10,
    fontFamily: "GoogleSans-SemiBold",
  },
  statusCard: {
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#315F42",
    borderRadius: 22,
    padding: 17,
    marginBottom: 22,
  },
  statusCardAlert: {
    backgroundColor: "#74533B",
  },
  statusTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },
  statusIcon: {
    width: 37,
    height: 37,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.13)",
    alignItems: "center",
    justifyContent: "center",
  },
  sampleBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.13)",
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  sampleBadgeAlert: {
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  sampleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D9E7C5",
    marginRight: 6,
  },
  sampleDotAlert: {
    backgroundColor: "#F3D0A2",
  },
  sampleText: {
    color: "#F0F3E9",
    fontSize: 8,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 0.9,
  },
  sampleTextAlert: {
    color: "#FFF1DC",
  },
  statusEyebrow: {
    color: "#CEDDC9",
    fontSize: 8,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 1.1,
    marginBottom: 5,
  },
  statusTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  statusDescription: {
    color: "#D3E0D0",
    fontSize: 10,
    lineHeight: 15,
    fontFamily: "Pliant-Regular",
  },
  statusFooter: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.15)",
    marginTop: 14,
    paddingTop: 11,
  },
  statusFooterText: {
    color: "#E0E9D9",
    fontSize: 9,
    fontFamily: "Pliant-Regular",
    marginLeft: 6,
  },
  statusSeparator: {
    color: "#ACC2A5",
  },
  statusOrb: {
    position: "absolute",
    right: -72,
    top: 55,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "rgba(255,255,255,0.035)",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 11,
  },
  sectionTitle: {
    color: "#2D3C31",
    fontSize: 14,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.2,
  },
  sectionCaption: {
    color: "#899286",
    fontSize: 9,
    fontFamily: "Pliant-Regular",
    marginTop: 3,
  },
  sectionAction: {
    width: 33,
    height: 33,
    borderRadius: 11,
    backgroundColor: "#E7EEE4",
    alignItems: "center",
    justifyContent: "center",
  },
  metricList: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E9EBE4",
    borderRadius: 18,
    paddingHorizontal: 12,
    marginBottom: 21,
  },
  metricCard: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EEF0EA",
  },
  metricCardFirst: {
    borderTopWidth: 0,
  },
  metricIcon: {
    width: 37,
    height: 37,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  metricCopy: {
    flex: 1,
  },
  metricLabel: {
    color: "#334237",
    fontSize: 11,
    fontFamily: "GoogleSans-SemiBold",
    marginBottom: 4,
  },
  metricTarget: {
    color: "#929A8F",
    fontSize: 9,
    fontFamily: "Pliant-Regular",
  },
  metricReading: {
    minWidth: 72,
    alignItems: "flex-end",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 3,
  },
  metricValue: {
    color: "#293A2F",
    fontSize: 17,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.4,
  },
  metricUnit: {
    color: "#778275",
    fontSize: 9,
    fontFamily: "Pliant-Regular",
    marginLeft: 3,
  },
  rangeBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  rangeBadgeAlert: {
    opacity: 0.95,
  },
  rangeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#82A477",
    marginRight: 4,
  },
  rangeDotAlert: {
    backgroundColor: "#C17B4E",
  },
  rangeText: {
    color: "#71866B",
    fontSize: 8,
    fontFamily: "GoogleSans-SemiBold",
  },
  rangeTextAlert: {
    color: "#A96742",
  },
  equipmentCount: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: "#E9EEE5",
    alignItems: "center",
    justifyContent: "center",
  },
  equipmentCountText: {
    color: "#6A7C63",
    fontSize: 9,
    fontFamily: "GoogleSans-SemiBold",
  },
  equipmentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E9EBE4",
    paddingHorizontal: 13,
    marginBottom: 11,
  },
  actuatorRow: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
  },
  actuatorIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  actuatorCopy: {
    flex: 1,
  },
  actuatorTitle: {
    color: "#334237",
    fontSize: 11,
    fontFamily: "GoogleSans-SemiBold",
    marginBottom: 4,
  },
  actuatorDescription: {
    color: "#899286",
    fontSize: 9,
    fontFamily: "Pliant-Regular",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEF0EA",
    marginLeft: 46,
  },
  previewNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 2,
    marginBottom: 5,
  },
  previewNoteText: {
    flex: 1,
    color: "#7C8879",
    fontSize: 9,
    lineHeight: 14,
    fontFamily: "Pliant-Regular",
    marginLeft: 6,
  },
});
