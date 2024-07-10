import { ProductsListData } from "@/constants";
import { MainNavigationProp } from "@/navigation";
import { Theme } from "@/store";
import { ProductsListsDataApi } from "@/store/lists-products";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AddButton, Button } from "../ui";
import { colorDark, fontsStyles } from "@/styles";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftComponent } from "@/assets";

type SortedListsProps = {
  listData: ProductsListsDataApi | null;
  theme: Theme;
};

export const SortedLists = ({ listData, theme }: SortedListsProps) => {
  const navigate = useNavigation<MainNavigationProp>();

  const [sortAscending, setSortAscending] = useState(false);

  const sortedLists = useMemo(() => {
    if (!listData) return { owner: [], shared: [] };

    const sortByDate = (a: ProductsListData, b: ProductsListData) => {
      const dateA = a.updated_at || a.created_at;
      const dateB = b.updated_at || b.created_at;
      return sortAscending
        ? new Date(dateA).getTime() - new Date(dateB).getTime()
        : new Date(dateB).getTime() - new Date(dateA).getTime();
    };

    return {
      owner: [...listData.owner].sort(sortByDate),
      shared: [...listData.shared].sort(sortByDate),
    };
  }, [listData, sortAscending]);

  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
  };

  const arrowStyle = StyleSheet.create({
    arrow: {
      transform: [{ rotate: sortAscending ? "-90deg" : "90deg" }],
    },
  });

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <AddButton onPress={() => navigate.navigate("List")} theme={theme} />
        <TouchableOpacity onPress={toggleSortOrder}>
          <View style={arrowStyle.arrow}>
            <ArrowLeftComponent width={20} height={20} color={colorDark.textColor} />
          </View>
        </TouchableOpacity>
      </View>

      <Text style={[fontsStyles.subtitle, { color: colorDark.textColor }]}>Ваши списки</Text>
      {sortedLists.owner.length > 0 && (
        <View>
          {sortedLists.owner.map((listItem) => (
            <View key={`owner-${listItem.id}`}>
              <Button
                theme={theme}
                style={{ marginTop: 10 }}
                onPress={() => navigate.navigate("List", { listId: String(listItem.id), listName: listItem.name })}
              >
                {listItem.name}
              </Button>
            </View>
          ))}
        </View>
      )}
      {sortedLists.shared.length > 0 && (
        <View>
          <Text style={[fontsStyles.subtitle, { color: colorDark.textColor }]}>Переданные списки</Text>
          {sortedLists.shared.map((listItem) => (
            <View key={`shared-${listItem.id}`}>
              <Button
                theme={theme}
                style={{ marginTop: 10 }}
                onPress={() => navigate.navigate("List", { listId: String(listItem.id), listName: listItem.name })}
              >
                {listItem.name}
              </Button>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
