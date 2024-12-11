import React, { useRef } from "react";
import { Button, Loader, MessForm } from "@/components";
import { Theme } from "@/store";
import { colorDark, fontsStyles, globalStyles } from "@/styles";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { t } from "i18next";

import { CameraView } from "expo-camera";
import { AddPhotoSvgComponent, XSvgComponent } from "@/assets";
import { usePhotoHandler } from "./usePhotoHandler";
import { GoodsList } from "./goods-list/goods-list";

export function TakePhoto({ userId, theme }: { userId: string | null | undefined; theme: Theme }) {
  const { capturedPhoto, handleCapture, sendImage, resetPhoto, goods, loading, error } = usePhotoHandler(userId);
  const cameraRef = useRef(null);

  if (goods && goods.length > 0) {
    return (
      <>
        <GoodsList userId={userId} theme={theme} goods={goods} />
        {capturedPhoto && <Image source={{ uri: capturedPhoto }} style={styles.capturedPhotoStyles} />}
      </>
    );
  }

  if (loading) {
    return (
      <View style={[globalStyles.container, styles.defaultMarginTop]}>
        <Loader theme={theme} size={50} />
        <View style={styles.mainContainer}>
          <Text style={[fontsStyles.text, fontsStyles.defaultColor, { textAlign: "center" }]}>
            {t("defaultMessage.longProcess")}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[globalStyles.container, styles.mainContainer]}>
      {error && (
        <View style={{ marginBottom: 10 }}>
          <MessForm message={{ defaultAxios: error }} status={"error"} />
        </View>
      )}
      {capturedPhoto ? (
        <>
          <View style={[globalStyles.container, styles.buttonsContainer]}>
            <Button onPress={resetPhoto} style={styles.button} theme={theme}>
              <XSvgComponent color={colorDark.textColor} width={18} height={18} />
            </Button>
            <Button style={styles.button} theme={theme} onPress={sendImage}>
              {t("buttonLabels.reviseReceipt.send")}
            </Button>
          </View>
          <Image source={{ uri: capturedPhoto }} style={styles.image} />
        </>
      ) : (
        <>
          <Button style={styles.photoButton} theme={theme} onPress={() => handleCapture(cameraRef)}>
            <AddPhotoSvgComponent color={colorDark.textColor} width={35} height={35} />
          </Button>
          <TouchableOpacity onPress={() => handleCapture(cameraRef)}>
            <CameraView style={styles.camera} ref={cameraRef}></CameraView>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    width: "49%",
  },
  photoButton: {
    marginBottom: 10,
  },
  defaultMarginTop: {
    marginTop: 10,
  },
  camera: {
    flex: 1,
    height: 500,
    justifyContent: "center",
  },
  image: {
    height: 500,
  },
  capturedPhotoStyles: { flex: 1, height: 500, marginBottom: 10 },
});

export default TakePhoto;
