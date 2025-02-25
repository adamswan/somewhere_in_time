// 添加空格
export function formatPhone(phone: string): string {
  let trim: string = phone.replace(/\s+/g, "");

  // 分别截取, 然后添加空格
  let arr: string[] = [trim.slice(0, 3), trim.slice(3, 7), trim.slice(7, 11)];

  arr = arr.filter((item) => {
    return item !== undefined && item !== "";
  });

  return arr.join(" ");
}

// 去除空格
export function replaceBlank(phone: string): string {
  return phone ? phone.replace(/\s+/g, "") : "";
}
