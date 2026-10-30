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

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeTone, setNoticeTone] = useState("info");

  const signIn = () => {
    if (!email.trim() || !password) {
      setNoticeTone("error");
      setNotice("Enter your email and password to continue.");
      return;
    }

    setNoticeTone("info");
    setNotice(
      "Sign-in is not connected yet. Your details have not been sent.",
    );
  };

  return (
    <ScreenFrame maxWidth={500}>
      <BrandHeader
        actionLabel="About Ecosense"
        onActionPress={() => router.push("/about")}
      />

      <View style={styles.welcomeIcon}>
        <Ionicons name="leaf-outline" size={22} color="#52734F" />
      </View>
      <PageIntro
        eyebrow="WELCOME BACK"
        title="Your grow space, at a glance."
        description="Sign in to pick up where you left off and see how your chamber is doing."
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
        <FormField
          label="Password"
          icon="lock-closed-outline"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
        />
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => router.push("/resetPassword")}
          style={styles.forgotLinkButton}
        >
          <Text style={styles.forgotLink}>Forgot password?</Text>
        </TouchableOpacity>
        <PrimaryButton label="Sign in" onPress={signIn} />
        {notice ? <InlineNotice tone={noticeTone}>{notice}</InlineNotice> : null}
      </View>

      <View style={styles.signUpPrompt}>
        <Text style={styles.promptText}>New to Ecosense?</Text>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => router.push("/(auth)/register")}
        >
          <Text style={styles.promptLink}>Create an account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.trustNote}>
        <Ionicons name="shield-checkmark-outline" size={15} color="#7B8D77" />
        <Text style={styles.trustText}>
          Your grow data stays yours, always.
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
  forgotLinkButton: {
    alignSelf: "flex-end",
    paddingVertical: 5,
    marginTop: -8,
    marginBottom: 8,
  },
  passwordLabel: {
    color: "#48564A",
    fontSize: 12,
    fontFamily: "GoogleSans-SemiBold",
  },
  forgotLink: {
    color: "#52734F",
    fontSize: 12,
    fontFamily: "GoogleSans-SemiBold",
  },
  signUpPrompt: {
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
  trustNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 27,
  },
  trustText: {
    color: "#879286",
    fontSize: 11,
    fontFamily: "GoogleSans-Regular",
    marginLeft: 6,
  },
});