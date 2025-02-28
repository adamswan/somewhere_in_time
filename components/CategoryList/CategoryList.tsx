import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import CategoryModal, {
  CategoryModalRef,
} from "../CategoryModal/CategoryModal";

type Props = {
  categoryList: Category[];
  allCategoryList: Category[];
  onCategoryChange: (category: Category) => void;
};

import icon_arrow from "../../assets/icon_arrow.png";

function CategoryList(props: Props) {
  const categoryList = props.categoryList;
  const allCategoryList = props.allCategoryList;
  const onCategoryChange = props.onCategoryChange;

  const modalRef = useRef<CategoryModalRef>(null);

  const [category, setCategory] = useState<Category>();

  // 初始化
  useEffect(() => {
    setCategory(categoryList.find((i) => i.name === "推荐"));
  }, []);

  //  点击分类的回调
  const onCategoryPress = (category: Category) => {
    setCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <View style={styles.container}>
      {/* 横向滚动组件 */}
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {categoryList.map((item: Category, index: number) => {
          const isSelected = item.name === category?.name;

          return (
            <TouchableOpacity
              key={`${item.name}`}
              style={styles.tabItem}
              onPress={() => onCategoryPress(item)}
            >
              <Text
                style={
                  isSelected ? styles.tabItemTxtSelected : styles.tabItemTxt
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 最右边的箭头 */}
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          // 显示模态框
          modalRef.current?.show();
        }}
      >
        <Image style={styles.openImg} source={icon_arrow} />
      </TouchableOpacity>

      {/* 编辑频道的模态框 */}
      <CategoryModal ref={modalRef} categoryList={allCategoryList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 36,
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 6,
  },
  scrollView: {
    flex: 1,
    height: "100%",
  },
  openButton: {
    width: 40,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  openImg: {
    width: 18,
    height: 18,
    transform: [{ rotate: "-90deg" }],
  },
  tabItem: {
    width: 64,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabItemTxt: {
    fontSize: 16,
    color: "#999",
  },
  tabItemTxtSelected: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
});

export default CategoryList;
