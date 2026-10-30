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

export default function ContactScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeTone, setNoticeTone] = useState("info");

  const submitMessage = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setNoticeTone("error");
      setNotice("Add your name, email, and a message to continue.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setNoticeTone("error");
      setNotice("Enter a valid email address so we know how to reach you.");
      return;
    }

    setNoticeTone("info");
    setNotice(
      "Message delivery is not connected yet. Your message has not been sent.",
    );
  };

  return (
    <ScreenFrame>
      <BrandHeader
        actionLabel="About us"
        onActionPress={() => router.push("/about")}
      />
      <PageIntro
        eyebrow="LET US CONNECT"
        title="How can we help you grow smarter?"
        description="Questions about the app or getting started? Leave us a note and we will point you in the right direction."
      />

      <View style={styles.supportCard}>
        <View style={styles.supportIcon}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={20}
            color="#52734F"
          />
        </View>
        <View style={styles.supportCopy}>
          <Text style={styles.supportDescription}>
            Feel free to Reach out to us
          </Text>
        </View>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Send us a feedback</Text>
        <Text style={styles.formDescription}>
          Fields marked below are needed to get back to you.
        </Text>
        <FormField
          label="Full name"
          icon="person-outline"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          textContentType="name"
        />
        <FormField
          label="Email address"
          icon="mail-outline"
          value={email}
          onChangeText={setEmail}
          placeholder="youremail@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
        />
        <FormField
          label="Message"
          icon="create-outline"
          value={message}
          onChangeText={setMessage}
          placeholder="Share a little detail so we can help..."
          multiline
        />
        <PrimaryButton
          label="Send message"
          icon="paper-plane-outline"
          onPress={submitMessage}
        />
        {notice ? (
          <InlineNotice tone={noticeTone}>{notice}</InlineNotice>
        ) : null}
      </View>

      <View style={styles.privacyNote}>
        <Ionicons
          name="lock-closed-outline"
          size={16}
          style={{ marginTop: -2 }}
          color="#899588"
        />
        <Text style={styles.privacyText}>
          Your details are only for helping with your request.
        </Text>
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  supportCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF1E9",
    borderRadius: 18,
    padding: 15,
    marginBottom: 17,
  },
  supportIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#E0E9D9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  supportCopy: {
    flex: 1,
  },
  supportTitle: {
    color: "#344638",
    fontSize: 13,
    fontFamily: "GoogleSans-SemiBold",
    marginBottom: 4,
  },
  supportDescription: {
    color: "#788477",
    fontSize: 12,
    lineHeight: 17,
    fontFamily: "Pliant-Regular",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECEDE6",
    borderRadius: 22,
    padding: 18,
  },
  formTitle: {
    color: "#2D3C31",
    fontSize: 18,
    fontFamily: "Pliant-Bold",
    letterSpacing: 0.4,
    marginBottom: 9,
  },
  formDescription: {
    color: "#899286",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Pliant-Regular",
    marginBottom: 17,
  },
  privacyNote: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  privacyText: {
    color: "#899286",
    fontSize: 11,
    fontFamily: "Pliant-Regular",
    marginLeft: 6,
  },
});
