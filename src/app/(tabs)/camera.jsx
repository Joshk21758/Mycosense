import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CameraScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPickingImage, setIsPickingImage] = useState(false);

  const pickImage = async (source) => {
    setIsPickingImage(true);
    try {
      const options = {
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.85,
      };
      const result =
        source === "camera"
          ? await ImagePicker.launchCameraAsync(options)
          : await ImagePicker.launchImageLibraryAsync(options);

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0]);
      }
    } catch (error) {
      Alert.alert(
        source === "camera" ? "Camera unavailable" : "Photo unavailable",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setIsPickingImage(false);
    }
  };

  const showAnalysisStatus = () => {
    Alert.alert(
      "Check coming soon",
      "Your photo is ready, but this health check is not connected yet. No report has been created.",
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View style={styles.brandMark}>
            <Ionicons name="leaf" size={17} color="#F1F4E9" />
          </View>
          <Text style={styles.brandName}>MycoSense</Text>
        </View>

        <View style={styles.heading}>
          <Text style={styles.eyebrow}>CROP HEALTH</Text>
          <Text style={styles.title}>A quick check on your crop.</Text>
          <Text style={styles.subtitle}>
            Take a photo of your mushrooms to look for signs of stress or
            missing nutrients.
          </Text>
        </View>

        <View style={styles.scanCard}>
          <View style={styles.scanCardHeader}>
            <View style={styles.scanCardTitleWrap}>
              <View style={styles.scanIcon}>
                <Ionicons name="scan-outline" size={18} color="#39704D" />
              </View>
              <View>
                <Text style={styles.scanCardTitle}>
                  {selectedImage ? "Photo ready" : "Start a new check"}
                </Text>
                <Text style={styles.scanCardCaption}>
                  {selectedImage
                    ? "Look over your photo before continuing"
                    : "Mushroom crop · ready to check"}
                </Text>
              </View>
            </View>
            <Ionicons name="ellipsis-horizontal" size={19} color="#A1AA9D" />
          </View>

          <View style={styles.previewFrame}>
            {selectedImage ? (
              <>
                <Image
                  accessibilityLabel="Selected mushroom photo"
                  source={{ uri: selectedImage.uri }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel="Remove selected photo"
                  onPress={() => setSelectedImage(null)}
                  style={styles.removePhotoButton}
                >
                  <Ionicons name="close" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.emptyPreview}>
                <View style={styles.previewGlow} />
                <View style={styles.mushroomIllustration}>
                  <Ionicons name="leaf" size={48} color="#E6EBD8" />
                  <View style={styles.mushroomBase} />
                </View>
                <Text style={styles.previewTitle}>
                  Place the mushroom in focus
                </Text>
                <Text style={styles.previewDescription}>
                  Add a photo to start a quick check
                </Text>
                <View style={styles.frameCornerTopLeft} />
                <View style={styles.frameCornerTopRight} />
                <View style={styles.frameCornerBottomLeft} />
                <View style={styles.frameCornerBottomRight} />
              </View>
            )}
          </View>

          {selectedImage ? (
            <View style={styles.photoDetails}>
              <View style={styles.photoDetailsIcon}>
                <Ionicons name="image-outline" size={16} color="#477455" />
              </View>
              <View style={styles.photoDetailsCopy}>
                <Text numberOfLines={1} style={styles.photoName}>
                  {selectedImage.fileName || "Mushroom photo"}
                </Text>
                <Text style={styles.photoSize}>
                  {selectedImage.width} × {selectedImage.height} px
                </Text>
              </View>
              <View style={styles.readyBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#3B7951" />
                <Text style={styles.readyText}>READY</Text>
              </View>
            </View>
          ) : null}

          <View style={styles.actionButtons}>
            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.85}
              disabled={isPickingImage}
              onPress={() => pickImage("camera")}
              style={[styles.cameraButton, isPickingImage && styles.disabled]}
            >
              {isPickingImage ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Ionicons
                  name="camera-outline"
                  style={{ marginTop: -6 }}
                  size={19}
                  color="#FFFFFF"
                />
              )}
              <Text style={styles.cameraButtonText}>
                {isPickingImage ? "Opening…" : "Capture"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.85}
              disabled={isPickingImage}
              onPress={() => pickImage("library")}
              style={[styles.uploadButton, isPickingImage && styles.disabled]}
            >
              <Ionicons
                name="images-outline"
                style={{ marginTop: -6 }}
                size={19}
                color="#3D6B4A"
              />
              <Text style={styles.uploadButtonText}>Choose a photo</Text>
            </TouchableOpacity>
          </View>

          {selectedImage ? (
            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.85}
              onPress={showAnalysisStatus}
              style={styles.analyzeButton}
            >
              <Ionicons name="sparkles-outline" size={18} color="#FFFFFF" />
              <Text style={styles.analyzeButtonText}>Check this photo</Text>
              <Ionicons name="arrow-forward" size={17} color="#D8E7C5" />
            </TouchableOpacity>
          ) : null}

          <View style={styles.privacyNote}>
            <Ionicons name="lock-closed-outline" size={13} color="#758475" />
            <Text style={styles.privacyText}>
              Your photo stays on this device until the check feature is ready.
            </Text>
          </View>
        </View>

        <View style={styles.tipsHeading}>
          <View style={styles.tipsHeadingIcon}>
            <Ionicons name="sunny-outline" size={17} color="#9B7742" />
          </View>
          <View>
            <Text style={styles.tipsTitle}>Get the best photo</Text>
            <Text style={styles.tipsCaption}>
              A clear photo makes it easier to spot problems
            </Text>
          </View>
        </View>

        <View style={styles.tipsCard}>
          <TipRow
            icon="sunny-outline"
            title="Use soft, natural light"
            description="Avoid flash, shadows, and strong color filters."
            color="#A47C3D"
            background="#F7F0E3"
          />
          <View style={styles.tipDivider} />
          <TipRow
            icon="scan-outline"
            title="Get the whole mushroom in view"
            description="Make sure the cap and stem are clear and easy to see."
            color="#5A7890"
            background="#EAF0F2"
          />
          <View style={styles.tipDivider} />
          <TipRow
            icon="images-outline"
            title="Take it from a straight angle"
            description="Keep the crop sharp and avoid clutter in the photo."
            color="#5F8057"
            background="#EDF2E8"
          />
        </View>

        <View style={styles.disclaimer}>
          <Ionicons
            name="information-circle-outline"
            size={17}
            color="#71816C"
          />
          <Text style={styles.disclaimerText}>
            Photos can show signs of stress, but many things can cause them.
            This check is only a guide, not a diagnosis.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TipRow({ icon, title, description, color, background }) {
  return (
    <View style={styles.tipRow}>
      <View style={[styles.tipIcon, { backgroundColor: background }]}>
        <Ionicons name={icon} size={17} color={color} />
      </View>
      <View style={styles.tipCopy}>
        <Text style={styles.tipTitle}>{title}</Text>
        <Text style={styles.tipDescription}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#B5BCAF" />
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
    marginBottom: 26,
  },
  brandMark: {
    width: 31,
    height: 31,
    borderRadius: 11,
    backgroundColor: "#2F6044",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  brandName: {
    color: "#283A2E",
    fontSize: 15,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.3,
    flex: 1,
  },
  comingSoonBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#E9EEE5",
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#77966B",
    marginRight: 6,
  },
  badgeText: {
    color: "#66775F",
    fontSize: 9,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 0.7,
  },
  heading: {
    marginBottom: 19,
  },
  eyebrow: {
    color: "#798A71",
    fontSize: 10,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 1.3,
    marginBottom: 7,
  },
  title: {
    color: "#26382C",
    fontSize: 25,
    lineHeight: 31,
    fontFamily: "Pliant-Bold",
    letterSpacing: -0.9,
    maxWidth: 300,
  },
  subtitle: {
    color: "#778275",
    fontSize: 13,
    lineHeight: 19,
    fontFamily: "Pliant-Regular",
    marginTop: 7,
  },
  scanCard: {
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E8EAE2",
    backgroundColor: "#FFFFFF",
    marginBottom: 23,
  },
  scanCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },
  scanCardTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  scanIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#EAF1E7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  scanCardTitle: {
    color: "#2C3E30",
    fontSize: 13,
    fontFamily: "Pliant-Bold",
  },
  scanCardCaption: {
    color: "#839080",
    fontSize: 10,
    fontFamily: "Pliant-Regular",
    marginTop: 3,
  },
  previewFrame: {
    height: 218,
    overflow: "hidden",
    borderRadius: 15,
    backgroundColor: "#334E3A",
    position: "relative",
  },
  emptyPreview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A5943",
  },
  previewGlow: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "rgba(224, 232, 203, 0.07)",
  },
  mushroomIllustration: {
    width: 94,
    height: 94,
    borderRadius: 32,
    backgroundColor: "rgba(247, 247, 232, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  mushroomBase: {
    position: "absolute",
    bottom: 20,
    width: 36,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#D8E0C8",
    opacity: 0.8,
  },
  previewTitle: {
    color: "#F3F4E9",
    fontSize: 14,
    fontFamily: "Pliant-Bold",
  },
  previewDescription: {
    color: "#D0D9C9",
    fontSize: 10,
    fontFamily: "Pliant-Regular",
    marginTop: 5,
  },
  frameCornerTopLeft: {
    position: "absolute",
    top: 13,
    left: 13,
    width: 20,
    height: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: "rgba(240, 244, 225, 0.7)",
    borderTopLeftRadius: 5,
  },
  frameCornerTopRight: {
    position: "absolute",
    top: 13,
    right: 13,
    width: 20,
    height: 20,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: "rgba(240, 244, 225, 0.7)",
    borderTopRightRadius: 5,
  },
  frameCornerBottomLeft: {
    position: "absolute",
    bottom: 13,
    left: 13,
    width: 20,
    height: 20,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: "rgba(240, 244, 225, 0.7)",
    borderBottomLeftRadius: 5,
  },
  frameCornerBottomRight: {
    position: "absolute",
    bottom: 13,
    right: 13,
    width: 20,
    height: 20,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "rgba(240, 244, 225, 0.7)",
    borderBottomRightRadius: 5,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  removePhotoButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(28, 42, 32, 0.72)",
  },
  photoDetails: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
  },
  photoDetailsIcon: {
    width: 31,
    height: 31,
    borderRadius: 10,
    backgroundColor: "#EAF1E7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },
  photoDetailsCopy: {
    flex: 1,
  },
  photoName: {
    color: "#344536",
    fontSize: 11,
    fontFamily: "Pliant-Bold",
  },
  photoSize: {
    color: "#899387",
    fontSize: 9,
    fontFamily: "Pliant-Regular",
    marginTop: 2,
  },
  readyBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "#EAF3E8",
  },
  readyText: {
    color: "#477455",
    fontSize: 8,
    fontFamily: "GoogleSans-SemiBold",
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 13,
  },
  cameraButton: {
    flex: 1,
    height: 47,
    borderRadius: 13,
    backgroundColor: "#315F42",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  cameraButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "GoogleSans-SemiBold",
    marginLeft: 7,
  },
  uploadButton: {
    height: 47,
    minWidth: 104,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#DCE5D9",
    backgroundColor: "#F8FAF6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  uploadButtonText: {
    color: "#3D6B4A",
    fontSize: 12,
    fontFamily: "GoogleSans-SemiBold",
    marginLeft: 7,
  },
  disabled: {
    opacity: 0.6,
  },
  analyzeButton: {
    height: 46,
    borderRadius: 13,
    backgroundColor: "#315F42",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginTop: 10,
  },
  analyzeButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "GoogleSans-SemiBold",
    flex: 1,
    marginLeft: 9,
  },
  privacyNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  privacyText: {
    color: "#7A8878",
    fontSize: 9,
    fontFamily: "Pliant-Regular",
    marginLeft: 5,
  },
  tipsHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tipsHeadingIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#F4EDDF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  tipsTitle: {
    color: "#344335",
    fontSize: 13,
    fontFamily: "Pliant-Bold",
  },
  tipsCaption: {
    color: "#839080",
    fontSize: 10,
    fontFamily: "Pliant-Regular",
    marginTop: 3,
  },
  tipsCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EAE2",
    borderRadius: 17,
    paddingHorizontal: 13,
    marginBottom: 15,
  },
  tipRow: {
    minHeight: 65,
    flexDirection: "row",
    alignItems: "center",
  },
  tipIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  tipCopy: {
    flex: 1,
    paddingRight: 8,
  },
  tipTitle: {
    color: "#39483A",
    fontSize: 11,
    fontFamily: "Pliant-Bold",
  },
  tipDescription: {
    color: "#7A8679",
    fontSize: 9,
    lineHeight: 13,
    fontFamily: "Pliant-Regular",
    marginTop: 3,
  },
  tipDivider: {
    height: 1,
    backgroundColor: "#EEF0EA",
    marginLeft: 44,
  },
  disclaimer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 3,
    marginBottom: 4,
  },
  disclaimerText: {
    color: "#7C8879",
    flex: 1,
    fontSize: 9,
    lineHeight: 14,
    fontFamily: "Pliant-Regular",
    marginLeft: 7,
  },
});
