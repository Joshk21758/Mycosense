import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import {
  BrandHeader,
  FormField,
  InlineNotice,
  PageIntro,
  PrimaryButton,
  ScreenFrame,
} from "../components/PublicUi";

export default function NewPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeTone, setNoticeTone] = useState("info");

  const updatePassword = () => {
    if (!password || !confirmPassword) {
      setNoticeTone("error");
      setNotice("Enter and confirm your new password.");
      return;
    }

    if (password.length < 8) {
      setNoticeTone("error");
      setNotice("Choose a password with at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setNoticeTone("error");
      setNotice("Those passwords don’t match yet.");
      return;
    }

    setNoticeTone("info");
    setNotice(
      "Password updates are not connected yet. Your password has not changed.",
    );
  };

  return (
    <ScreenFrame maxWidth={500}>
      <BrandHeader
        actionLabel="Sign in"
        onActionPress={() => router.push("/(auth)/login")}
      />

      <View style={styles.iconWrap}>
        <Ionicons name="lock-closed-outline" size={21} color="#52734F" />
      </View>
      <PageIntro
        eyebrow="MAKE IT SECURE"
        title="Choose a new password."
        description="Create a strong password you haven’t used before to keep your account protected."
      />

      <View style={styles.formCard}>
        <FormField
          label="New password"
          icon="lock-closed-outline"
          value={password}
          onChangeText={setPassword}
          placeholder="At least 8 characters"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
        />
        <FormField
          label="Confirm new password"
          icon="checkmark-circle-outline"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Enter it one more time"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
        />
        <View style={styles.passwordTip}>
          <Ionicons name="sparkles-outline" size={15} color="#71866A" />
          <Text style={styles.passwordTipText}>
            A longer phrase is easier to remember and harder to guess.
          </Text>
        </View>
        <PrimaryButton
          label="Update password"
          icon="checkmark"
          onPress={updatePassword}
        />
        {notice ? <InlineNotice tone={noticeTone}>{notice}</InlineNotice> : null}
      </View>
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
  passwordTip: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: -1,
    marginBottom: 11,
  },
  passwordTipText: {
    flex: 1,
    color: "#839080",
    fontSize: 11,
    lineHeight: 16,
    fontFamily: "GoogleSans-Regular",
    marginLeft: 7,
  },
});