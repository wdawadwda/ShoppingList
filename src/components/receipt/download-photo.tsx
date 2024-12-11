import { Button, MessForm } from "@/components";
import { Theme } from "@/store";
import { Image, StyleSheet, Text, View } from "react-native";
import { colorDark, fontsStyles, globalStyles } from "@/styles";
import { t } from "i18next";
import { AddGallerySvgComponent, XSvgComponent } from "@/assets";
import { usePhotoHandler } from "./usePhotoHandler";
import GoodsList from "./goods-list/goods-list";
import { Loader } from "../ui/loader/loader";

export function DownloadPhoto({ userId, theme }: { userId: string | null | undefined; theme: Theme }) {
  const { capturedPhoto, pickImage, sendImage, resetPhoto, goods, loading, error, setError } = usePhotoHandler(userId);

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
            <Button
              onPress={() => {
                resetPhoto();
                setError(null);
              }}
              style={styles.button}
              theme={theme}
            >
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
          <Button theme={theme} style={styles.defaultMarginBottom} onPress={pickImage}>
            <AddGallerySvgComponent color={colorDark.textColor} width={35} height={35} />
          </Button>
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
  defaultMarginBottom: {
    marginBottom: 10,
  },
  defaultMarginTop: {
    marginBottom: 10,
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

export default DownloadPhoto;
