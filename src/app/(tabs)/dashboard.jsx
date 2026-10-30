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
    value: (telemetry) => `${telemetry.temperature}°`,
    unit: "C",
    target: "Ideal 22–25°C",
  },
  {
    key: "humidity",
    label: "Humidity",
    icon: "water-outline",
    tint: "#51829A",
    iconBackground: "#EAF2F4",
    value: (telemetry) => `${telemetry.humidity}%`,
    target: "Ideal 85–95%",
  },
  {
    key: "co2",
    label: "CO₂ level",
    icon: "cloud-outline",
    tint: "#8873A0",
    iconBackground: "#F0EDF5",
    value: (telemetry) => `${telemetry.co2}`,
    unit: "ppm",
    target: "Ideal below 800 ppm",
  },
  {
    key: "moisture",
    label: "Substrate",
    icon: "leaf-outline",
    tint: "#628353",
    iconBackground: "#EDF2E9",
    value: (telemetry) => `${telemetry.moisture}%`,
    target: "Ideal 65–75%",
  },
];

export default function DashboardScreen() {
  const [telemetry, setTelemetry] = useState(initialSensorData);
  const isBalanced =
    telemetry.temperature >= 22 &&
    telemetry.temperature <= 25 &&
    telemetry.humidity >= 85 &&
    telemetry.humidity <= 95 &&
    telemetry.co2 < 800 &&
    telemetry.moisture >= 65 &&
    telemetry.moisture <= 75;

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
          <View style={styles.brandLockup}>
            <View style={styles.brandMark}>
              <Ionicons name="leaf" size={18} color="#F8F7F1" />
            </View>
            <Text style={styles.brandName}>Mycosense</Text>
          </View>
          <View style={styles.chamberBadge}>
            <Ionicons name="home-outline" size={14} color="#60775B" />
            <Text style={styles.chamberBadgeText}>ROOM 1</Text>
          </View>
        </View>

        <View style={styles.pageHeading}>
          <Text style={styles.eyebrow}>YOUR GROW SPACE</Text>
          <Text style={styles.pageTitle}>Looking good in here.</Text>
          <Text style={styles.pageSubtitle}>
            Oyster mushroom <Text style={styles.subtitleDot}>·</Text> Fruiting
            phase
          </Text>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Ionicons name="leaf" size={21} color="#D8E7C5" />
          </View>
          <View style={styles.statusCopy}>
            <Text style={styles.statusTitle}>
              {isBalanced
                ? "Your chamber is in balance"
                : "Conditions need a look"}
            </Text>
            <Text style={styles.statusDescription}>
              {isBalanced
                ? "Conditions are within their target ranges."
                : "Some readings are outside their target range."}
            </Text>
          </View>
          <View style={styles.liveTag}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Room conditions</Text>
          </View>
          <View style={styles.updatedIcon}>
            <Ionicons name="pulse-outline" size={18} color="#5C7B5D" />
          </View>
        </View>

        <View style={styles.metricGrid}>
          {metrics.map((metric) => (
            <View key={metric.key} style={styles.metricCard}>
              <View style={styles.metricTop}>
                <View
                  style={[
                    styles.metricIcon,
                    { backgroundColor: metric.iconBackground },
                  ]}
                >
                  <Ionicons name={metric.icon} size={18} color={metric.tint} />
                </View>
                <Ionicons
                  name="ellipsis-horizontal"
                  size={17}
                  color="#B1B8AC"
                />
              </View>
              <Text style={styles.metricLabel}>{metric.label}</Text>
              <View style={styles.valueRow}>
                <Text style={styles.metricValue}>
                  {metric.value(telemetry)}
                </Text>
                {metric.unit ? (
                  <Text style={styles.metricUnit}>{metric.unit}</Text>
                ) : null}
              </View>
              <View style={styles.targetRow}>
                <View style={styles.targetDot} />
                <Text style={styles.metricTarget}>{metric.target}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Equipment</Text>
            <Text style={styles.sectionCaption}>Manage chamber devices</Text>
          </View>
          <Ionicons name="options-outline" size={19} color="#788675" />
        </View>

        <View style={styles.equipmentCard}>
          <ActuatorRow
            icon="sync-outline"
            title="Fresh air fan"
            description={
              telemetry.fanStatus ? "Running · Automatic" : "Standby"
            }
            color="#4F8060"
            iconBackground="#EDF3E9"
            value={telemetry.fanStatus}
            onValueChange={(value) => toggleActuator("fanStatus", value)}
          />
          <View style={styles.divider} />
          <ActuatorRow
            icon="water-outline"
            title="Ultrasonic humidifier"
            description={telemetry.humidifierStatus ? "Running" : "Standby"}
            color="#51829A"
            iconBackground="#EAF2F4"
            value={telemetry.humidifierStatus}
            onValueChange={(value) => toggleActuator("humidifierStatus", value)}
          />
        </View>
        <Text style={styles.bottomNote}>SMALL ADJUSTMENTS, HAPPIER GROWTH</Text>
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
    backgroundColor: "#F7F7F2",
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
    fontSize: 16,
    fontFamily: "Pliant-Bold",
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
    fontFamily: "Pliant-Regular",
    letterSpacing: 0.8,
    marginLeft: 5,
  },
  pageHeading: {
    marginBottom: 19,
  },
  eyebrow: {
    color: "#798A71",
    fontSize: 10,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 1.3,
    marginBottom: 7,
  },
  pageTitle: {
    color: "#26382C",
    fontSize: 24,
    fontFamily: "Pliant-Bold",
    letterSpacing: -1,
  },
  pageSubtitle: {
    color: "#778275",
    fontSize: 13,
    fontFamily: "Pliant-Regular",
    marginTop: 6,
  },
  subtitleDot: {
    color: "#99A494",
  },
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2F6044",
    borderRadius: 19,
    paddingHorizontal: 14,
    paddingVertical: 15,
    marginBottom: 25,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  statusCopy: {
    flex: 1,
    paddingRight: 5,
  },
  statusTitle: {
    color: "#F7F7F2",
    fontSize: 12,
    fontFamily: "Pliant-Bold",
    marginBottom: 4,
  },
  statusDescription: {
    color: "#D4E1D2",
    fontSize: 10,
    fontFamily: "Pliant-Regular",
    lineHeight: 14,
  },
  liveTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D8E7C5",
    marginRight: 5,
  },
  liveText: {
    color: "#F1F4E9",
    fontSize: 9,
    fontFamily: "Pliant-Regular",
    letterSpacing: 0.7,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },
  sectionTitle: {
    color: "#2D3C31",
    fontSize: 14,
    marginLeft: 10,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.3,
  },
  sectionCaption: {
    color: "#899286",
    fontSize: 11,
    marginLeft: 10,
    fontFamily: "Pliant-Regular",
    marginTop: 4,
  },
  updatedIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#E9EEE5",
    alignItems: "center",
    justifyContent: "center",
  },
  metricGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 11,
  },
  metricCard: {
    width: "48.3%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ECEDE6",
    padding: 14,
    marginBottom: 11,
  },
  metricTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  metricIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  metricLabel: {
    color: "#060606",
    fontSize: 11,
    fontFamily: "Pliant-Regular",
    marginBottom: 4,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  metricValue: {
    color: "#293A2F",
    fontSize: 23,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.9,
  },
  metricUnit: {
    color: "#778275",
    fontSize: 11,
    fontFamily: "Pliant-Regular",
    marginLeft: 4,
  },
  targetRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  targetDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#82A477",
    marginRight: 5,
  },
  metricTarget: {
    color: "#899286",
    fontSize: 9,
    fontFamily: "Pliant-Regular",
  },
  equipmentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#ECEDE6",
    paddingHorizontal: 13,
    marginBottom: 18,
  },
  actuatorRow: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
  },
  actuatorIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  actuatorCopy: {
    flex: 1,
  },
  actuatorTitle: {
    color: "#334237",
    fontSize: 12,
    fontFamily: "Pliant-Regular",
    marginBottom: 4,
  },
  actuatorDescription: {
    color: "#899286",
    fontSize: 10,
    fontFamily: "Pliant-Regular",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEF0EA",
    marginLeft: 48,
  },
  bottomNote: {
    color: "#9BA394",
    fontSize: 9,
    fontFamily: "Pliant-Regular",
    letterSpacing: 1.15,
    textAlign: "center",
    marginTop: 2,
  },
});
