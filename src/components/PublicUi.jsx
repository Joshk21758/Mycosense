import { useState } from "react";
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

const colors = {
  background: "#F7F7F2",
  ink: "#26372C",
  muted: "#788477",
  green: "#2F6044",
  paleGreen: "#E8EEE3",
  border: "#E8EAE3",
  white: "#FFFFFF",
};

export function ScreenFrame({ children, maxWidth = 560 }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.content, { maxWidth }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function BrandHeader({ actionLabel, onActionPress }) {
  return (
    <View style={styles.header}>
      <View style={styles.brandLockup}>
        <View style={styles.brandMark}>
          <Ionicons name="leaf" size={18} color="#F8F7F1" />
        </View>
        <Text style={styles.brandName}>Mycosense</Text>
      </View>
      {actionLabel ? (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={onActionPress}
          style={styles.headerAction}
          activeOpacity={0.75}
        >
          <Text style={styles.headerActionText}>{actionLabel}</Text>
          <Ionicons
            name="arrow-forward"
            size={15}
            color={colors.green}
            style={{ marginTop: 3 }}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export function PageIntro({ eyebrow, title, description }) {
  return (
    <View style={styles.pageIntro}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.pageTitle}>{title}</Text>
      {description ? (
        <Text style={styles.pageDescription}>{description}</Text>
      ) : null}
    </View>
  );
}

export function FormField({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoCorrect = true,
  multiline = false,
  textContentType,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.inputShell, multiline && styles.multilineShell]}>
        {icon ? (
          <Ionicons
            name={icon}
            size={18}
            color="#8C978A"
            style={[styles.fieldIcon, multiline && styles.multilineIcon]}
          />
        ) : null}
        <TextInput
          accessibilityLabel={label}
          style={[styles.textInput, multiline && styles.multilineInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A6ADA2"
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          multiline={multiline}
          textAlignVertical={multiline ? "top" : "center"}
          textContentType={textContentType}
        />
        {secureTextEntry ? (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={
              isPasswordVisible ? "Hide password" : "Show password"
            }
            onPress={() => setIsPasswordVisible((visible) => !visible)}
            style={styles.visibilityButton}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={18}
              color="#879286"
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  icon = "arrow-forward",
  disabled = false,
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      style={[styles.primaryButton, disabled && styles.buttonDisabled]}
    >
      <Text style={styles.primaryButtonText}>{label}</Text>
      <View style={styles.buttonIcon}>
        <Ionicons name={icon} size={17} color={colors.green} />
      </View>
    </TouchableOpacity>
  );
}

export function InlineNotice({ children, tone = "info" }) {
  const isError = tone === "error";
  return (
    <View style={[styles.notice, isError && styles.errorNotice]}>
      <Ionicons
        name={isError ? "alert-circle-outline" : "information-circle-outline"}
        size={18}
        color={isError ? "#A35C37" : colors.green}
      />
      <Text style={[styles.noticeText, isError && styles.errorNoticeText]}>
        {children}
      </Text>
    </View>
  );
}

export function DividerLabel({ children }) {
  return (
    <View style={styles.dividerLabel}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>{children}</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    width: "100%",
    alignSelf: "center",
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 34,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  brandLockup: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandMark: {
    width: 36,
    height: 36,
    borderRadius: 13,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },
  brandName: {
    color: colors.ink,
    fontSize: 16,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.5,
  },
  headerAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 8,
  },
  headerActionText: {
    color: colors.green,
    fontSize: 13,
    fontFamily: "Pliant-Regular",
  },
  pageIntro: {
    marginBottom: 22,
  },
  eyebrow: {
    color: "#75856F",
    fontSize: 10,
    fontFamily: "GoogleSans-Bold",
    letterSpacing: 1.15,
    marginBottom: 8,
  },
  pageTitle: {
    color: colors.ink,
    fontSize: 28,
    lineHeight: 37,
    fontFamily: "Pliant-Bold",
    letterSpacing: -1,
    marginBottom: 8,
  },
  pageDescription: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 22,
    fontFamily: "Pliant-Regular",
  },
  field: {
    marginBottom: 15,
  },
  fieldLabel: {
    color: "#48564A",
    fontSize: 12,
    fontFamily: "GoogleSans-SemiBold",
    marginBottom: 7,
  },
  inputShell: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    paddingHorizontal: 14,
  },
  fieldIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    minHeight: 50,
    paddingVertical: 0,
    color: colors.ink,
    fontSize: 12,
    fontFamily: "Pliant-Regular",
  },
  visibilityButton: {
    padding: 5,
    marginLeft: 6,
  },
  multilineShell: {
    minHeight: 128,
    alignItems: "flex-start",
    paddingTop: 13,
  },
  multilineIcon: {
    marginTop: 2,
  },
  multilineInput: {
    minHeight: 105,
    paddingTop: 0,
    paddingBottom: 8,
  },
  primaryButton: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.green,
    borderRadius: 16,
    paddingTop: 5,
    paddingLeft: 18,
    paddingRight: 8,
    marginTop: 7,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: "GoogleSans-SemiBold",
  },
  buttonIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#E5EDDF",
    alignItems: "center",
    marginTop: -4,
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.paleGreen,
    borderRadius: 13,
    padding: 12,
    marginTop: 14,
  },
  noticeText: {
    flex: 1,
    color: "#48624A",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "GoogleSans-Regular",
    marginLeft: 8,
  },
  errorNotice: {
    backgroundColor: "#F8EEE7",
  },
  errorNoticeText: {
    color: "#875138",
  },
  dividerLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 19,
  },
  dividerLine: {
    height: 1,
    flex: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: "#96A093",
    fontSize: 10,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 0.7,
    marginHorizontal: 12,
  },
});
