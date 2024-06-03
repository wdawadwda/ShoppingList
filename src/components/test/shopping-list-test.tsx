import { ScrollView, Text, TouchableOpacity, View, Animated } from "react-native";
import { useRef, useState } from "react";

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

export function ShoppingListTest() {
  const [products, setProducts] = useState(initialProducts);
  const animatedValues = useRef(
    products.reduce((acc, category) => {
      acc[category.id] = new Animated.Value(1);
      category.products.forEach((product) => {
        acc[`${category.id}-${product.id}`] = new Animated.Value(1);
      });
      return acc;
    }, {}),
  ).current;

  const handleProductClick = (categoryId, productId) => {
    const productKey = `${categoryId}-${productId}`;
    Animated.timing(animatedValues[productKey], {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
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
      Animated.timing(animatedValues[productKey], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ color: "red" }}>Доступные товары:</Text>
        {products.map(
          (category) =>
            category.products.some((product) => !product.isPushed) && (
              <Animated.View
                key={category.id}
                style={{
                  opacity: animatedValues[category.id],
                  transform: [
                    {
                      scale: animatedValues[category.id],
                    },
                  ],
                }}
              >
                <Text style={{ color: "green" }}>{category.categoryName}</Text>
                {category.products
                  .filter((product) => !product.isPushed)
                  .map((product) => (
                    <Animated.View
                      key={product.id}
                      style={{
                        opacity: animatedValues[`${category.id}-${product.id}`],
                        transform: [
                          {
                            scale: animatedValues[`${category.id}-${product.id}`],
                          },
                        ],
                      }}
                    >
                      <TouchableOpacity
                        style={{ backgroundColor: "red" }}
                        onPress={() => handleProductClick(category.id, product.id)}
                      >
                        <Text>{product.name}</Text>
                      </TouchableOpacity>
                    </Animated.View>
                  ))}
              </Animated.View>
            ),
        )}
        <Text style={{ color: "red" }}>Купленные товары:</Text>
        {products.map(
          (category) =>
            category.products.some((product) => product.isPushed) && (
              <Animated.View
                key={category.id}
                style={{
                  opacity: animatedValues[category.id],
                  transform: [
                    {
                      scale: animatedValues[category.id],
                    },
                  ],
                }}
              >
                <Text style={{ color: "green" }}>{category.categoryName}</Text>
                {category.products
                  .filter((product) => product.isPushed)
                  .map((product) => (
                    <Animated.View
                      key={product.id}
                      style={{
                        opacity: animatedValues[`${category.id}-${product.id}`],
                        transform: [
                          {
                            scale: animatedValues[`${category.id}-${product.id}`],
                          },
                        ],
                      }}
                    >
                      <TouchableOpacity onPress={() => handleProductClick(category.id, product.id)}>
                        <Text>{product.name}</Text>
                      </TouchableOpacity>
                    </Animated.View>
                  ))}
              </Animated.View>
            ),
        )}
      </ScrollView>
    </View>
  );
}
export default ShoppingListTest;
