import { svgScheme } from "@/constants";
import { globalStyles } from "@/styles";
import { getFirstLetter } from "@/utils";
import { Text, View } from "react-native";

export const ListContent = ({ productList, language, theme }) => {
  const categories = productList.reduce((acc, product) => {
    const category = product.category[language.toLowerCase()];
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <View style={globalStyles.container}>
      {Object.keys(categories).length > 0 ? (
        Object.keys(categories).map((category, index) => (
          <View key={`${category}-${index}`}>
            <Text>{category}</Text>
            {categories[category].map((product, prodIndex) => (
              <View key={`${product.name.en}-${prodIndex}`}>
                {svgScheme[product.svgKey] || (
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>{getFirstLetter(product.name, language)}</Text>
                )}
                <Text>{product.name[language.toLowerCase()]}</Text>
                <Text>{product.quantity}</Text>
              </View>
            ))}
          </View>
        ))
      ) : (
        <Text>Список пока пуст</Text>
      )}
    </View>
  );
};

export default ListContent;
