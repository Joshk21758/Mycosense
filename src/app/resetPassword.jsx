import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  BrandHeader,
  FormField,
  InlineNotice,
  PageIntro,
  PrimaryButton,
  ScreenFrame,
} from "../components/PublicUi";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeTone, setNoticeTone] = useState("info");

  const requestReset = () => {
    if (!email.trim()) {
      setNoticeTone("error");
      setNotice("Enter your email address to continue.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setNoticeTone("error");
      setNotice("Enter a valid email address.");
      return;
    }

    setNoticeTone("info");
    setNotice(
      "Password reset is not connected yet. No reset email has been sent.",
    );
  };

  return (
    <ScreenFrame maxWidth={500}>
      <BrandHeader
        actionLabel="Sign in"
        onActionPress={() => router.push("/(auth)/login")}
      />

      <View style={styles.iconWrap}>
        <Ionicons name="key-outline" size={22} color="#52734F" />
      </View>
      <PageIntro
        eyebrow="ACCOUNT RECOVERY"
        title="A fresh start is just around the corner."
        description="Enter the email address linked to your account and we’ll help you get back in."
      />

      <View style={styles.formCard}>
        <FormField
          label="Email address"
          icon="mail-outline"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
        />
        <PrimaryButton
          label="Send reset link"
          icon="paper-plane-outline"
          onPress={requestReset}
        />
        {notice ? (
          <InlineNotice tone={noticeTone}>{notice}</InlineNotice>
        ) : null}
      </View>

      <View style={styles.helpCard}>
        <View style={styles.helpIcon}>
          <Ionicons name="shield-checkmark-outline" size={17} color="#5C7B5D" />
        </View>
        <Text style={styles.helpText}>
          For your security, reset links should only be used by the account
          owner.
        </Text>
      </View>

      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => router.push("/newPassword")}
        style={styles.linkButton}
      >
        <Text style={styles.linkText}>Have a reset link already?</Text>
        <Ionicons name="arrow-forward" size={15} color="#52734F" />
      </TouchableOpacity>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#E8EEE3",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECEDE6",
    borderRadius: 22,
    padding: 18,
  },
  helpCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#EEF1E9",
    borderRadius: 16,
    padding: 14,
    marginTop: 17,
  },
  helpIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#E0E9D9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  helpText: {
    flex: 1,
    color: "#687668",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "GoogleSans-Regular",
    paddingTop: 2,
  },
  linkButton: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingVertical: 21,
  },
  linkText: {
    color: "#52734F",
    fontSize: 12,
    fontFamily: "GoogleSans-SemiBold",
  },
});
