import AsyncStorage from "@react-native-async-storage/async-storage";

// 存
export async function save(key: string, value: string) {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
}

// 取
export async function load(key: string) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
}

// 删
export async function remove(key: string) {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
}

// 清空
export async function clear() {
  try {
    return await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
}
