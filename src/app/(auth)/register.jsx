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
} from "../../components/PublicUi";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeTone, setNoticeTone] = useState("info");

  const createAccount = () => {
    if (!name.trim() || !email.trim() || !password) {
      setNoticeTone("error");
      setNotice("Fill in each field to create your account.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setNoticeTone("error");
      setNotice("Enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setNoticeTone("error");
      setNotice("Choose a password with at least 8 characters.");
      return;
    }

    setNoticeTone("info");
    setNotice(
      "Account creation is not connected yet. Your details have not been sent.",
    );
  };

  return (
    <ScreenFrame maxWidth={500}>
      <BrandHeader
        actionLabel="Sign in"
        onActionPress={() => router.push("/(auth)/login")}
      />

      <View style={styles.welcomeIcon}>
        <Ionicons name="sparkles-outline" size={21} color="#52734F" />
      </View>
      <PageIntro
        eyebrow="START GROWING WITH ECOSENSE"
        title="Make room for better growing."
        description="Create your account and bring a little more clarity to your grow space."
      />

      <View style={styles.formCard}>
        <FormField
          label="Your name"
          icon="person-outline"
          value={name}
          onChangeText={setName}
          placeholder="e.g. Alex Green"
          textContentType="name"
        />
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
        <FormField
          label="Create a password"
          icon="lock-closed-outline"
          value={password}
          onChangeText={setPassword}
          placeholder="At least 8 characters"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
        />
        <Text style={styles.passwordHint}>
          Use at least 8 characters for a stronger password.
        </Text>
        <PrimaryButton
          label="Create account"
          icon="arrow-forward"
          onPress={createAccount}
        />
        {notice ? <InlineNotice tone={noticeTone}>{notice}</InlineNotice> : null}
      </View>

      <View style={styles.signInPrompt}>
        <Text style={styles.promptText}>Already have an account?</Text>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.promptLink}>Sign in</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.privacyNote}>
        <Ionicons name="leaf-outline" size={14} color="#7B8D77" />
        <Text style={styles.privacyText}>
          Simple tools for a more thoughtful grow.
        </Text>
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  welcomeIcon: {
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
    marginTop: 2,
  },
  passwordHint: {
    color: "#899286",
    fontSize: 11,
    fontFamily: "GoogleSans-Regular",
    marginTop: -7,
    marginBottom: 10,
  },
  signInPrompt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 23,
  },
  promptText: {
    color: "#7D887D",
    fontSize: 13,
    fontFamily: "GoogleSans-Regular",
    marginRight: 5,
  },
  promptLink: {
    color: "#426B49",
    fontSize: 13,
    fontFamily: "GoogleSans-SemiBold",
  },
  privacyNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 27,
  },
  privacyText: {
    color: "#879286",
    fontSize: 11,
    fontFamily: "GoogleSans-Regular",
    marginLeft: 6,
  },
});