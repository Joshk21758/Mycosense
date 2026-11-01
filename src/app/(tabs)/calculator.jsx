import { useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const initialInputs = {
  substrate: "10",
  efficiency: "75",
  price: "8",
  costs: "22",
};

function parseAmount(value) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatNumber(value, digits = 1) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : digits,
    maximumFractionDigits: digits,
  });
}

function formatCurrency(value) {
  const formatted = Math.abs(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return value < 0 ? `−K${formatted}` : `K${formatted}`;
}

export default function CalculatorScreen() {
  const [inputs, setInputs] = useState(initialInputs);

  const results = useMemo(() => {
    const substrate = parseAmount(inputs.substrate);
    const efficiency = parseAmount(inputs.efficiency);
    const price = parseAmount(inputs.price);
    const costs = parseAmount(inputs.costs);
    const yieldKg = substrate * (efficiency / 100);
    const revenue = yieldKg * price;
    const profit = revenue - costs;

    return {
      yieldKg,
      revenue,
      costs,
      profit,
      returnPercent: costs > 0 ? (profit / costs) * 100 : null,
    };
  }, [inputs]);

  const updateInput = (key, value) => {
    setInputs((previous) => ({ ...previous, [key]: value }));
  };

  const isProfitable = results.profit >= 0;
  const profitStatus =
    results.profit > 0 ? "PROFIT" : results.profit < 0 ? "LOSS" : "BREAK EVEN";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heading}>
          <View style={styles.eyebrowWrap}>
            <Ionicons name="leaf-outline" size={13} color="#648256" />
            <Text style={styles.eyebrow}>CROP PLANNER</Text>
          </View>
          <Text style={styles.pageTitle}>Plan your next batch.</Text>
          <Text style={styles.pageSubtitle}>
            A simple estimate of what your grow could produce and earn.
          </Text>
        </View>

        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View>
              <Text style={styles.resultLabel}>ESTIMATED PROFIT</Text>
              <Text
                style={[
                  styles.profitValue,
                  !isProfitable && styles.profitValueLoss,
                ]}
              >
                {formatCurrency(results.profit)}
              </Text>
            </View>
            <View
              style={[
                styles.statusPill,
                !isProfitable && styles.statusPillLoss,
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  !isProfitable && styles.statusDotLoss,
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  !isProfitable && styles.statusTextLoss,
                ]}
              >
                {profitStatus}
              </Text>
            </View>
          </View>
          <Text style={styles.resultHint}>
            After {formatCurrency(results.costs)} in growing costs
          </Text>
          <View style={styles.resultDivider} />
          <View style={styles.quickResults}>
            <View style={styles.quickResult}>
              <View style={styles.quickResultIcon}>
                <Ionicons name="leaf-outline" size={16} color="#D9E7C8" />
              </View>
              <View style={styles.quickResultCopy}>
                <Text style={styles.quickResultLabel}>ESTIMATED HARVEST</Text>
                <Text style={styles.quickResultValue}>
                  {formatNumber(results.yieldKg)} kg
                </Text>
              </View>
            </View>
            <View style={styles.quickResultDivider} />
            <View style={styles.quickResult}>
              <View style={styles.quickResultIcon}>
                <Ionicons name="cash-outline" size={16} color="#D9E7C8" />
              </View>
              <View style={styles.quickResultCopy}>
                <Text style={styles.quickResultLabel}>POSSIBLE INCOME</Text>
                <Text style={styles.quickResultValue}>
                  {formatCurrency(results.revenue)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.resultOrb} />
        </View>

        <View style={styles.sectionHeading}>
          <View style={styles.sectionIcon}>
            <Ionicons name="options-outline" size={17} color="#648256" />
          </View>
          <View style={styles.sectionHeadingCopy}>
            <Text style={styles.sectionTitle}>Your batch info</Text>
            <Text style={styles.sectionCaption}>
              Update any number to see a new estimate
            </Text>
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Reset calculator values"
            onPress={() => setInputs(initialInputs)}
            style={styles.resetButton}
          >
            <Ionicons name="refresh-outline" size={14} color="#648256" />
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formCard}>
          <CalculatorField
            icon="layers-outline"
            iconColor="#648256"
            label="Growing material"
            description="How much growing material you have"
            value={inputs.substrate}
            onChangeText={(value) => updateInput("substrate", value)}
            unit="kg"
            accessibilityLabel="Growing material amount in kilograms"
          />
          <View style={styles.formDivider} />
          <CalculatorField
            icon="sparkles-outline"
            iconColor="#A17B42"
            label="Growing efficiency"
            description="How much mushroom yield you expect from this material"
            value={inputs.efficiency}
            onChangeText={(value) => updateInput("efficiency", value)}
            unit="%"
            accessibilityLabel="Growing efficiency percentage"
          />
          <View style={styles.formDivider} />
          <CalculatorField
            icon="pricetag-outline"
            iconColor="#51829A"
            label="Sale price"
            description="How much you sell each kilogram for"
            value={inputs.price}
            onChangeText={(value) => updateInput("price", value)}
            unit="K/kg"
            accessibilityLabel="Sale price per kilogram in kwacha"
          />
          <View style={styles.formDivider} />
          <CalculatorField
            icon="receipt-outline"
            iconColor="#8873A0"
            label="Total growing costs"
            description="Growing material, supplies, power, and other costs"
            value={inputs.costs}
            onChangeText={(value) => updateInput("costs", value)}
            unit="K"
            accessibilityLabel="Total growing costs in kwacha"
          />
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryHeading}>
            <View style={styles.summaryIcon}>
              <Ionicons name="analytics-outline" size={16} color="#648256" />
            </View>
            <View>
              <Text style={styles.summaryTitle}>Money breakdown</Text>
              <Text style={styles.summaryCaption}>
                Based on your numbers
              </Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Possible income</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(results.revenue)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Growing cost</Text>
            <Text style={styles.summaryValue}>
              − {formatCurrency(results.costs)}
            </Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Estimated profit</Text>
            <Text
              style={[
                styles.summaryTotalValue,
                !isProfitable && styles.lossText,
              ]}
            >
              {formatCurrency(results.profit)}
            </Text>
          </View>
          <View style={styles.returnPill}>
            <Ionicons
              name="trending-up-outline"
              size={14}
              color="#5F7955"
            />
            <Text style={styles.returnText}>
              {results.returnPercent === null
                ? "Add your growing costs to see your return"
                : `${formatNumber(results.returnPercent)}% return from your costs`}
            </Text>
          </View>
        </View>

        <View style={styles.disclaimer}>
          <Ionicons
            name="information-circle-outline"
            size={16}
            color="#889184"
          />
          <Text style={styles.disclaimerText}>
            This is only an estimate. Your actual harvest and income can change
            based on room conditions, crop quality, and market prices.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CalculatorField({
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
    <View style={styles.fieldRow}>
      <View style={styles.fieldIcon}>
        <Ionicons name={icon} size={17} color={iconColor} />
      </View>
      <View style={styles.fieldCopy}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldDescription}>{description}</Text>
      </View>
      <View style={styles.inputWrap}>
        <TextInput
          accessibilityLabel={accessibilityLabel}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType="decimal-pad"
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
    backgroundColor: "#F5F6F1",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 13,
    paddingBottom: 30,
  },
  heading: {
    marginBottom: 17,
  },
  eyebrowWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  eyebrow: {
    color: "#798A71",
    fontSize: 11,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 1.1,
    marginLeft: 5,
  },
  pageTitle: {
    color: "#26382C",
    fontSize: 25,
    lineHeight: 31,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.8,
    maxWidth: 310,
  },
  pageSubtitle: {
    color: "#778275",
    fontSize: 13,
    lineHeight: 19,
    fontFamily: "Pliant-Regular",
    marginTop: 5,
  },
  resultCard: {
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#315F42",
    borderRadius: 22,
    padding: 17,
    marginBottom: 22,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  resultLabel: {
    color: "#D9E7D1",
    fontSize: 10,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 0.9,
    marginBottom: 5,
  },
  profitValue: {
    color: "#FFFFFF",
    fontSize: 35,
    fontFamily: "Pliant-Bold",
    letterSpacing: -1,
  },
  profitValueLoss: {
    color: "#FFE3DC",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "rgba(222,242,205,0.14)",
  },
  statusPillLoss: {
    backgroundColor: "rgba(255,226,217,0.16)",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C9E49B",
    marginRight: 5,
  },
  statusDotLoss: {
    backgroundColor: "#FFD1C6",
  },
  statusText: {
    color: "#E5F0DC",
    fontSize: 10,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 0.5,
  },
  statusTextLoss: {
    color: "#FFE3DC",
  },
  resultHint: {
    color: "#D2DFD1",
    fontSize: 12,
    fontFamily: "Pliant-Regular",
    marginTop: 3,
  },
  resultDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.19)",
    marginVertical: 14,
  },
  quickResults: {
    flexDirection: "row",
    alignItems: "center",
  },
  quickResult: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },
  quickResultIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },
  quickResultCopy: {
    flex: 1,
    minWidth: 0,
  },
  quickResultLabel: {
    color: "#D1DFCE",
    fontSize: 9,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 0.4,
    marginBottom: 3,
  },
  quickResultValue: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "GoogleSans-Bold",
  },
  quickResultDivider: {
    width: 1,
    height: 31,
    backgroundColor: "rgba(255,255,255,0.19)",
    marginHorizontal: 9,
  },
  resultOrb: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    right: -100,
    top: -85,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionIcon: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: "#E8F0E7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },
  sectionHeadingCopy: {
    flex: 1,
  },
  sectionTitle: {
    color: "#304034",
    fontSize: 15,
    fontFamily: "Pliant-Bold",
  },
  sectionCaption: {
    color: "#899286",
    fontSize: 11,
    fontFamily: "Pliant-Regular",
    marginTop: 3,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 10,
    backgroundColor: "#E8F0E7",
  },
  resetText: {
    color: "#648256",
    fontSize: 11,
    fontFamily: "GoogleSans-SemiBold",
    marginLeft: 4,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E9EBE4",
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  fieldRow: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
  },
  fieldIcon: {
    width: 33,
    height: 33,
    borderRadius: 11,
    backgroundColor: "#F1F4EE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },
  fieldCopy: {
    flex: 1,
    paddingRight: 5,
  },
  fieldLabel: {
    color: "#334237",
    fontSize: 12,
    fontFamily: "GoogleSans-SemiBold",
    marginBottom: 3,
  },
  fieldDescription: {
    color: "#899286",
    fontSize: 10,
    lineHeight: 14,
    fontFamily: "Pliant-Regular",
  },
  inputWrap: {
    height: 37,
    minWidth: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#F5F7F3",
    borderWidth: 1,
    borderColor: "#E9EDE5",
    borderRadius: 11,
    paddingHorizontal: 7,
  },
  input: {
    minWidth: 30,
    maxWidth: 55,
    color: "#304034",
    fontSize: 14,
    fontFamily: "GoogleSans-SemiBold",
    textAlign: "right",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  unitText: {
    color: "#899286",
    fontSize: 11,
    fontFamily: "GoogleSans-Regular",
    marginLeft: 4,
  },
  formDivider: {
    height: 1,
    backgroundColor: "#EFF1EC",
    marginLeft: 42,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E9EBE4",
    padding: 14,
    marginBottom: 12,
  },
  summaryHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },
  summaryIcon: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: "#E8F0E7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  summaryTitle: {
    color: "#304034",
    fontSize: 13,
    fontFamily: "Pliant-Bold",
  },
  summaryCaption: {
    color: "#899286",
    fontSize: 10,
    fontFamily: "Pliant-Regular",
    marginTop: 2,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    color: "#778275",
    fontSize: 12,
    fontFamily: "Pliant-Regular",
  },
  summaryValue: {
    color: "#4E5E52",
    fontSize: 12,
    fontFamily: "GoogleSans-SemiBold",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#EFF1EC",
    marginTop: 1,
    marginBottom: 11,
  },
  summaryTotalLabel: {
    color: "#304034",
    fontSize: 13,
    fontFamily: "GoogleSans-SemiBold",
  },
  summaryTotalValue: {
    color: "#315F42",
    fontSize: 16,
    fontFamily: "GoogleSans-Bold",
  },
  lossText: {
    color: "#B5483E",
  },
  returnPill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDF3E9",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginTop: 2,
  },
  returnText: {
    color: "#5F7955",
    fontSize: 10,
    fontFamily: "GoogleSans-SemiBold",
    marginLeft: 5,
  },
  disclaimer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 2,
  },
  disclaimerText: {
    flex: 1,
    color: "#889184",
    fontSize: 10,
    lineHeight: 15,
    fontFamily: "Pliant-Regular",
    marginLeft: 6,
  },
});
