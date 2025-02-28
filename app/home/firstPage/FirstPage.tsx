import {
  Text,
  View,
  Button,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useCallback } from "react";
import { useLocalStore } from "mobx-react";
import HomeStore from "../../../stores/HomeStore";
import { observer } from "mobx-react";
import FlowList from "../../../components/flowlist/FlowList";
import DynamicHeightImage from "../../../components/DynamicHeightImage/DynamicHeightImage";
import Praise from "../../../components/Praise/Praise";
import TitleBar from "../../../components/TitleBar/TitleBar";
import CategoryList from "../../../components/CategoryList/CategoryList";
import { useRouter } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const FirstPage: React.FC = observer(() => {
  const store = useLocalStore(() => new HomeStore());
  const categoryList = store.categoryList.filter((i) => i.isAdd);

  useEffect(() => {
    store.requestHomeList();
    store.getCategoryList();
  }, []);

  // 下拉刷新
  const refreshNewData = () => {
    // 先重置页码为第一页
    store.resetPage();
    // 再请求新数据
    store.requestHomeList();
  };

  // 上拉加载
  const loadMoreData = () => {
    store.requestHomeList();
  };

  // 点赞传来的值：是否点赞了
  const onValChange = (val: boolean) => {
    console.log("字组件", val);
  };

  const router = useRouter();

  // 点击瀑布流的item, 跳转到详情页
  const handlePressBox = useCallback((id: number) => {
    console.log("点击了item");
    router.push(`/home/articleDetail/articleDetail?id=${id}`);
  }, []);

  const Footer = () => {
    return <Text style={styles.footerTxt}>没有更多数据</Text>;
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ArticleSimple;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => handlePressBox(item.id)}
      >
        <DynamicHeightImage uri={item.image} />
        <Text style={styles.titleTxt}>{item.title}</Text>
        <View style={styles.nameLayout}>
          <Image
            style={styles.avatarImg}
            source={{ uri: item.avatarUrl }}
          ></Image>
          <Text style={styles.nameTxt}>{item.userName}</Text>
          <Praise
            isFavorite={item.isFavorite}
            onValChange={onValChange}
          ></Praise>
          <Text style={styles.countTxt}>{item.favoriteCount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.root}>
        <TitleBar
          tab={1}
          onTabChanged={(tab: number) => {
            console.log(`tab=${tab}`);
          }}
        />
        <FlowList
          keyExtractor={(item: ArticleSimple) => `${item.id}`}
          style={styles.flatList}
          data={store.homeList}
          contentContainerStyle={styles.container}
          numColumns={2}
          renderItem={renderItem}
          refreshing={store.refreshing}
          onRefresh={refreshNewData}
          onEndReachedThreshold={0.1}
          onEndReached={loadMoreData}
          ListFooterComponent={<Footer />}
          ListHeaderComponent={
            <CategoryList
              categoryList={categoryList}
              allCategoryList={store.categoryList}
              onCategoryChange={(category: Category) => {
                console.log(JSON.stringify(category));
              }}
            />
          }
        ></FlowList>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  flatList: {
    width: "100%",
    height: "100%",
  },
  container: {
    // paddingTop: 6,
  },
  item: {
    width: (SCREEN_WIDTH - 18) / 2,
    backgroundColor: "white",
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: "hidden",
  },
  titleTxt: {
    fontSize: 14,
    color: "#333",
    marginHorizontal: 10,
    marginVertical: 4,
  },
  nameLayout: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: "cover",
    borderRadius: 10,
  },
  nameTxt: {
    fontSize: 12,
    color: "#999",
    marginLeft: 6,
    flex: 1,
  },
  countTxt: {
    fontSize: 14,
    color: "#999",
    marginLeft: 4,
  },
  footerTxt: {
    width: "100%",
    fontSize: 14,
    color: "#999",
    marginVertical: 16,
    textAlign: "center",
    textAlignVertical: "center",
  },

  itemImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
});

export default FirstPage;
