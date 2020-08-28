import { LikePostDatabase } from "../database/LikePostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import PostDatabase from "../database/PostDatabase";

export default class LikePostBusiness {
  async likePost(userId: string, postId: string) {
    const user = await new UserDatabase().getUserById(userId);
    const post = await new PostDatabase().getPostById(postId);

    if (!user || !post) {
      throw new Error("Usuário ou post não encontrado");
    }

    const postLikeInfo = await new LikePostDatabase().getLikePostInfo(
      userId,
      postId
    );

    const likeNewPost = await new LikePostDatabase().likePost(userId, postId);

    return likeNewPost;
  }

  async dislikePost(userId: string, postId: string) {
    const user = await new UserDatabase().getUserById(userId);
    const post = await new PostDatabase().getPostById(postId);

    if (!user || !post) {
      throw new Error("Usuário ou post não encontrado");
    }

    await new LikePostDatabase().dislikePost(userId, postId);
  }
}
