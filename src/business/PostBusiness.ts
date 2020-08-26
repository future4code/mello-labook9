import PostsDB from "../database/PostDatabase"
import { toUserType } from "../models/Post"

export default class PostBusiness {

  async getPostByType (type: string) {
    const postType = await new PostsDB().getFeedType(toUserType(type));
    return postType
  }

  async getFeed (id: string) {
    return await new PostsDB().getFeed(id)
  }
}