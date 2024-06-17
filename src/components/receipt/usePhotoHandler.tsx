import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { CameraPictureOptions } from "expo-camera";

import { sendBillPhoto } from "@/store/api";
import { type Good } from "./receipt.type";
import { t } from "i18next";

export const usePhotoHandler = (userId: string | null | undefined) => {
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [assetsState, setAssets] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [goods, setGoods] = useState<Good[] | null>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const pickImage = async () => {
    try {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!canceled && assets && assets.length > 0 && userId) {
        const uri = assets[0].uri;
        setAssets(assets[0]);
        setCapturedPhoto(uri);
      }
    } catch (error) {
      console.error("Ошибка при выборе фото:", error);
    }
  };

  const handleCapture = async (cameraRef: any) => {
    if (!cameraRef.current) {
      return;
    }

    try {
      const options: CameraPictureOptions = { quality: 0.5 };
      const photoData = await cameraRef.current.takePictureAsync(options);

      if (photoData?.uri) {
        setCapturedPhoto(photoData.uri);
      }
    } catch (error) {
      console.error("Ошибка при съемке фото", error);
    }
  };

  const sendImage = async () => {
    try {
      setGoods(null);
      setError(null);
      setLoading(true);
      if (capturedPhoto && userId) {
        const uri = capturedPhoto;

        const uriComponents = uri.split("/");
        const fileName = uriComponents[uriComponents.length - 1];

        const formData = new FormData();
        formData.append("bill", {
          uri,
          type: assetsState?.mimeType || "image/jpeg",
          name: fileName,
        } as any);

        formData.append("user", userId);

        const billResponse = await sendBillPhoto(formData);
        if (billResponse?.goods) {
          setGoods(billResponse.goods);
        } else {
          setError(t("defaultMessage.defaultError"));
        }
      }
    } catch (error) {
      setError(t("defaultMessage.defaultError"));
    } finally {
      setLoading(false);
    }
  };

  const resetPhoto = () => {
    setCapturedPhoto(null);
    setAssets(null);
  };

  return {
    capturedPhoto,
    pickImage,
    handleCapture,
    sendImage,
    resetPhoto,
    goods,
    error,
    setError,
    loading,
  };
};
