import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";

const initialProducts = [
  {
    id: 1,
    categoryName: "Мясо",
    products: [
      { id: 1, name: "Колбаса", isPushed: false },
      { id: 2, name: "Курица", isPushed: false },
    ],
  },
  {
    id: 2,
    categoryName: "Молочные продукты",
    products: [
      { id: 1, name: "Молоко", isPushed: false },
      { id: 2, name: "Сыр", isPushed: true },
    ],
  },
  {
    id: 3,
    categoryName: "Другое",
    products: [{ id: 1, name: "Пластырь", isPushed: false }],
  },
];

export default function App() {
  const [products, setProducts] = useState(initialProducts);

  const handleProductClick = (categoryId, productId) => {
    setProducts((prevProducts) => {
      return prevProducts.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            products: category.products.map((product) => {
              if (product.id === productId) {
                return {
                  ...product,
                  isPushed: !product.isPushed,
                };
              }
              return product;
            }),
          };
        }
        return category;
      });
    });
  };

  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Medium": require("./assets/fonts/Lato-Medium.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ color: "red" }}>Доступные товары:</Text>
        {products.map(
          (category) =>
            category.products.some((product) => !product.isPushed) && (
              <View key={category.id}>
                <Text style={{ color: "green" }}>{category.categoryName}</Text>
                {category.products
                  .filter((product) => !product.isPushed)
                  .map((product) => (
                    <TouchableOpacity key={product.id} onPress={() => handleProductClick(category.id, product.id)}>
                      <Text>{product.name}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            ),
        )}
        <Text style={{ color: "red" }}>Купленные товары:</Text>
        {products.map(
          (category) =>
            category.products.some((product) => product.isPushed) && (
              <View key={category.id}>
                <Text style={{ color: "green" }}>{category.categoryName}</Text>
                {category.products
                  .filter((product) => product.isPushed)
                  .map((product) => (
                    <TouchableOpacity key={product.id} onPress={() => handleProductClick(category.id, product.id)}>
                      <Text>{product.name}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            ),
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const fontsStyles = StyleSheet.create({
  // svg: {
  //   color: "red",
  //   width: 50,
  //   height: 50,
  // },
  title: {
    fontSize: 35,
    textAlign: "center",
    marginBottom: 25,
    textTransform: "uppercase",
    fontFamily: "Montserrat-Bold",
  },
  subtitle: {
    fontSize: 25,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 15,
    fontFamily: "Montserrat-SemiBold",
  },
  text: {
    fontSize: 18,
    fontFamily: "Lato-Medium",
  },
  text2: {
    fontSize: 14,
    fontFamily: "Lato-Medium",
  },
});
