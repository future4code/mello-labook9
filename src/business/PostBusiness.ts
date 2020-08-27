import PostsDB from "../database/PostDatabase";
import Post, { toUserType } from "../model/Post";

export default class PostBusiness {
  async getPostByType(type: string) {
    const postType = await new PostsDB().getFeedType(toUserType(type));
    return postType;
  }

  async getFeed(id: string) {
    return await new PostsDB().getFeed(id);
  }

  async createPost(
    id: string,
    photo: string,
    description: Text,
    createdAt: string,
    type: string,
    userId: string
  ) {
    if (!photo || !description || !type) {
      throw new Error("Preencha todos os campos");
    }
    const post = new Post(
      id,
      photo,
      description,
      createdAt,
      toUserType(type),
      userId
    );
    await new PostsDB().createPost(post);
  }
}
