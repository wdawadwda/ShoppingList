import { Button, MessForm } from "@/components";
import { Theme } from "@/store";
import { Image, StyleSheet, View } from "react-native";
import { colorDark, globalStyles } from "@/styles";
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
        {capturedPhoto && <Image source={{ uri: capturedPhoto }} style={{ flex: 1, height: 500, marginBottom: 10 }} />}
      </>
    );
  }

  if (loading) {
    return (
      <View style={[globalStyles.container, { marginTop: 10 }]}>
        <Loader theme={theme} size={50} />
      </View>
    );
  }

  return (
    <View style={[globalStyles.container, { marginTop: 10 }]}>
      {error && <MessForm message={{ defaultAxios: error }} status={"error"} />}
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
          <Button theme={theme} style={{ marginBottom: 10 }} onPress={pickImage}>
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
  photoButton: {
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
});

export default DownloadPhoto;
