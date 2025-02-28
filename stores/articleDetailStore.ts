import { observable } from "mobx";
import { request } from "../utils/request";

export default class ArticleDetailStore {
  @observable detail: Article = {} as Article;

  requestArticleDetail = async (id: number) => {
    try {
      const params = {
        id: id,
      };
      const { data } = await request("articleDetail", params);
      this.detail = data || {};
      console.log("this.detail", this.detail);
    } catch (error) {
      console.log(error);
    }
  };
}
