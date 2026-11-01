import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import sampleTelemetry from "../../data/sampleTelemetry.json";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

const initialSensorData = {
  ...sampleTelemetry[0],
  co2: 650,
  moisture: 45,
  fanStatus: false,
  humidifierStatus: false,
};
const telemetryApiUrl = (
  process.env.EXPO_PUBLIC_API_URL || "http://10.15.251.40:5000"
).replace(/\/+$/, "");

const metrics = [
  {
    key: "temperature",
    label: "Temperature",
    icon: "thermometer-outline",
    tint: "#B7654F",
    iconBackground: "#F8EDE8",
    value: (telemetry) => telemetry.temperature.toFixed(1),
    unit: "°C",
    target: "18–24°C",
    isInRange: (telemetry) =>
      telemetry.temperature >= 20 && telemetry.temperature <= 25,
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
    target: "Below 700 ppm",
    isInRange: (telemetry) => telemetry.co2 < 700,
  },
];

function getTelemetryAlerts(telemetry) {
  return metrics.flatMap((metric) => {
    if (metric.isInRange(telemetry)) return [];

    const metricKey = metric.key.toLowerCase();
    const isEmergency =
      (metricKey === "temperature" && telemetry.temperature > 24) ||
      (metricKey === "humidity" &&
        telemetry.humidity < 85 &&
        telemetry.humidity > 95) ||
      (metricKey === "co2" && telemetry.co2 > 900);
    const reading = `${metric.value(telemetry)} ${metric.unit}`;
    const label = metricKey === "humidity" ? "Humidity" : metric.label;
    let actions;

    switch (metricKey) {
      case "temperature":
        actions = isEmergency
          ? [
              "Move the chamber to a shaded, well-ventilated area.",
              "Check for nearby heat sources and improve airflow.",
              "Recheck the temperature in a few minutes.",
            ]
          : [
              "Check chamber ventilation and nearby heat sources.",
              "If the temperature keeps rising, move the chamber to a cooler, shaded area.",
            ];
        break;
      case "humidity":
        actions =
          telemetry.humidity < 85
            ? [
                "Check the humidifier reservoir and refill it if needed.",
                "Inspect the misting nozzle for a blockage or mineral buildup.",
                "Recheck humidity after the humidifier has run.",
              ]
            : telemetry.humidity < 90
              ? [
                  "Check the humidifier reservoir and confirm it is operating.",
                  "Inspect the misting nozzle, then recheck humidity in a few minutes.",
                ]
              : [
                  "Reduce or pause humidifier output.",
                  "Check for condensation on the sensor and confirm the reading.",
                ];
        break;
      case "co2":
        actions =
          telemetry.co2 > 900
            ? [
                "Check that the exhaust fan is operating.",
                "Run a fresh-air exchange for about 3 minutes.",
                "Recheck CO₂ after the air has circulated.",
              ]
            : [
                "Check the exhaust fan and make sure air vents are not blocked.",
                "Run a brief fresh-air exchange, then recheck CO₂.",
              ];
        break;
      default:
        actions = ["Check the sensor and recheck the reading."];
    }

    return [
      {
        id: `${metricKey}-${isEmergency ? "emergency" : "warning"}`,
        severity: isEmergency ? "emergency" : "warning",
        title: isEmergency ? `${label} emergency` : `${label} needs attention`,
        summary: `Reading: ${reading} (goal: ${metric.target}).`,
        actions,
      },
    ];
  });
}

export default function DashboardScreen() {
  const [telemetry, setTelemetry] = useState(initialSensorData);
  const [telemetrySource, setTelemetrySource] = useState(
    telemetryApiUrl ? "Connecting to ESP on COM3" : "Sample telemetry",
  );
  const isBalanced = metrics.every((metric) => metric.isInRange(telemetry));
  const alerts = getTelemetryAlerts(telemetry);
  const [expandedAlertIds, setExpandedAlertIds] = useState(() => new Set());
  const previousAlertIds = useRef(new Set());
  const telemetryIndex = useRef(0);

  useEffect(() => {
    if (telemetryApiUrl) {
      let isMounted = true;

      const fetchLatestTelemetry = async () => {
        try {
          const response = await fetch(
            `${telemetryApiUrl}/api/telemetry/latest`,
          );
          if (response.status === 404) {
            if (isMounted) setTelemetrySource("Waiting for ESP readings");
            return;
          }
          if (!response.ok) {
            throw new Error(`Telemetry request failed (${response.status}).`);
          }

          const result = await response.json();
          const { temperature, humidity } = result.data || {};
          if (
            !result.success ||
            !Number.isFinite(temperature) ||
            !Number.isFinite(humidity)
          ) {
            throw new Error("Backend returned invalid ESP telemetry.");
          }

          if (isMounted) {
            setTelemetry((previous) => ({
              ...previous,
              temperature,
              humidity,
            }));
            setTelemetrySource("Live ESP readings");
          }
        } catch (error) {
          console.error("Unable to read ESP telemetry:", error);
          if (isMounted) setTelemetrySource("Backend unavailable");
        }
      };

      fetchLatestTelemetry();
      const interval = setInterval(fetchLatestTelemetry, 2000);

      return () => {
        isMounted = false;
        clearInterval(interval);
      };
    }

    const interval = setInterval(() => {
      telemetryIndex.current =
        (telemetryIndex.current + 1) % sampleTelemetry.length;
      const sample = sampleTelemetry[telemetryIndex.current];

      setTelemetry((previous) => ({
        ...previous,
        temperature: sample.temperature,
        humidity: sample.humidity,
        co2: Math.floor(previous.co2 + (Math.random() * 20 - 10)),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const activeAlertIds = new Set(alerts.map((alert) => alert.id));
    const newAlerts = alerts.filter(
      (alert) => !previousAlertIds.current.has(alert.id),
    );
    previousAlertIds.current = activeAlertIds;

    if (newAlerts.length === 0) return;
  }, [alerts]);

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
            <Text style={styles.brandEyebrow}>Dashboard</Text>
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
            <Text style={styles.sectionCaption}>{telemetrySource}</Text>
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
                  <Text style={styles.metricTarget}>Goal: {metric.target}</Text>
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
            <Text style={styles.sectionTitle}>Emergency alerts</Text>
            <Text style={styles.sectionCaption}>
              Notifications from sensor readings
            </Text>
          </View>
          <View
            style={[
              styles.alertCount,
              alerts.some((alert) => alert.severity === "emergency") &&
                styles.alertCountEmergency,
            ]}
          >
            <Text
              style={[
                styles.alertCountText,
                alerts.some((alert) => alert.severity === "emergency") &&
                  styles.alertCountTextEmergency,
              ]}
            >
              {alerts.length}
            </Text>
          </View>
        </View>

        <View style={styles.alertList}>
          {alerts.length === 0 ? (
            <View style={styles.noAlerts}>
              <Ionicons
                name="checkmark-circle-outline"
                size={19}
                color="#628353"
              />
              <Text style={styles.noAlertsText}>
                No active alerts. Live reading look good.
              </Text>
            </View>
          ) : (
            alerts.map((alert) => {
              const isEmergency = alert.severity === "emergency";
              const isExpanded = expandedAlertIds.has(alert.id);
              return (
                <View
                  key={alert.id}
                  style={[
                    styles.alertRow,
                    isEmergency && styles.alertRowEmergency,
                  ]}
                >
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${alert.title} details`}
                    accessibilityState={{ expanded: isExpanded }}
                    onPress={() =>
                      setExpandedAlertIds((previous) => {
                        const next = new Set(previous);
                        if (next.has(alert.id)) {
                          next.delete(alert.id);
                        } else {
                          next.add(alert.id);
                        }
                        return next;
                      })
                    }
                    style={styles.alertHeader}
                  >
                    <Ionicons
                      name={isEmergency ? "warning" : "alert-circle-outline"}
                      size={19}
                      color={isEmergency ? "#B34D3D" : "#A96742"}
                    />
                    <View style={styles.alertCopy}>
                      <Text
                        style={[
                          styles.alertTitle,
                          isEmergency && styles.alertTitleEmergency,
                        ]}
                      >
                        {alert.title}
                      </Text>
                    </View>
                    <Ionicons
                      name={isExpanded ? "chevron-up" : "chevron-down"}
                      size={18}
                      color={isEmergency ? "#B34D3D" : "#A96742"}
                    />
                  </Pressable>
                  {isExpanded && (
                    <View style={styles.alertDetails}>
                      <Text style={styles.alertMessage}>{alert.summary}</Text>
                      <Text style={styles.alertActionHeading}>
                        Recommended steps
                      </Text>
                      {alert.actions.map((action, index) => (
                        <Text
                          key={`${alert.id}-step-${index}`}
                          style={styles.alertAction}
                        >
                          {index + 1}. {action}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              );
            })
          )}
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Room control options</Text>
            <Text style={styles.sectionCaption}>Quick controls</Text>
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
            The above controls are for Automation preview purposes only.
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
    fontSize: 10,
    fontFamily: "Pliant-Bold",
    letterSpacing: 1.4,
    marginBottom: 4,
  },
  brandTitle: {
    color: "rgb(41, 57, 46)",
    fontSize: 24,
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
    fontSize: 10,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 0.7,
    marginBottom: 2,
  },
  roomName: {
    color: "#425744",
    fontSize: 12,
    fontFamily: "GoogleSans-SemiBold",
  },
  statusCard: {
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#315F42",
    borderRadius: 22,
    padding: 17,
    marginBottom: 50,
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
    fontSize: 12,
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
    fontSize: 22,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  statusDescription: {
    color: "#D3E0D0",
    fontSize: 13,
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
    fontSize: 12,
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
    fontSize: 20,
    marginBottom: 5,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.2,
  },
  sectionCaption: {
    color: "#899286",
    fontSize: 14,
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
    marginBottom: 50,
  },
  alertCount: {
    minWidth: 30,
    height: 30,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "#E9EEE5",
    alignItems: "center",
    justifyContent: "center",
  },
  alertCountEmergency: {
    backgroundColor: "#F8E8E4",
  },
  alertCountText: {
    color: "#628353",
    fontSize: 13,
    fontFamily: "GoogleSans-SemiBold",
  },
  alertCountTextEmergency: {
    color: "#B34D3D",
  },
  alertList: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E9EBE4",
    borderRadius: 18,
    paddingHorizontal: 13,
    marginBottom: 40,
  },
  noAlerts: {
    minHeight: 65,
    flexDirection: "row",
    alignItems: "center",
  },
  noAlertsText: {
    flex: 1,
    color: "#71866B",
    fontSize: 13,
    lineHeight: 15,
    fontFamily: "Pliant-Regular",
    marginLeft: 9,
  },
  alertRow: {
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF0EA",
  },
  alertRowEmergency: {
    backgroundColor: "#FFFBFA",
  },
  alertHeader: {
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  alertCopy: {
    flex: 1,
    marginLeft: 9,
  },
  alertTitle: {
    color: "#A96742",
    fontSize: 14,
    fontFamily: "Pliant-Bold",
    marginBottom: 0,
  },
  alertTitleEmergency: {
    color: "#B34D3D",
  },
  alertDetails: {
    marginLeft: 28,
    marginTop: 8,
  },
  alertMessage: {
    color: "#7C8879",
    fontSize: 14,
    lineHeight: 14,
    marginBottom: 6,
    fontFamily: "Pliant-Regular",
  },
  alertActionHeading: {
    color: "#52634F",
    fontSize: 12,
    lineHeight: 14,
    fontFamily: "Pliant-Bold",
    marginTop: 6,
  },
  alertAction: {
    color: "#667263",
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "Pliant-Regular",
    marginTop: 2,
    marginBottom: 7,
  },
  alertDemo: {
    paddingTop: 11,
    paddingBottom: 12,
  },
  alertDemoTitle: {
    color: "#899286",
    fontSize: 13,
    fontFamily: "Pliant-Bold",
    marginBottom: 8,
  },
  alertDemoActions: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 7,
  },
  alertDemoButton: {
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#F5EEE8",
  },
  alertDemoButtonEmergency: {
    backgroundColor: "#F8E8E4",
  },
  alertDemoButtonPressed: {
    opacity: 0.7,
  },
  alertDemoButtonText: {
    color: "#A96742",
    fontSize: 13,
    fontFamily: "Pliant-Bold",
  },
  alertDemoButtonTextEmergency: {
    color: "#B34D3D",
  },
  alertResetButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  alertResetButtonText: {
    color: "#7C8879",
    fontSize: 13,
    fontFamily: "Pliant-Bold",
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
    fontSize: 13,
    fontFamily: "GoogleSans-SemiBold",
    marginBottom: 4,
  },
  metricTarget: {
    color: "#929A8F",
    fontSize: 12,
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
    fontSize: 19,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.4,
  },
  metricUnit: {
    color: "#778275",
    fontSize: 14,
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
