import BaseDB from "./BaseDatabase";

export class LikePostDatabase extends BaseDB {
  private static TABLE_NAME = "Like_Post";

  public async getLikePostInfo(userId: string, postId: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(LikePostDatabase.TABLE_NAME)
      .where({ post_id: postId, user_id: userId });
    this.destroyConnection();
    return result[0];
  }

  public async likePost(userId: string, postId: string): Promise<void> {
    await this.getConnection()
      .insert({
        post_id: postId,
        user_id: userId,
        post_status: "TRUE",
      })
      .into(LikePostDatabase.TABLE_NAME);
    this.destroyConnection();
  }

  public async dislikePost(userId: string, postId: string): Promise<void> {
    await this.getConnection()
      .del("*")
      .from(LikePostDatabase.TABLE_NAME)
      .where({
        post_id: postId,
        user_id: userId,
        post_status: "TRUE",
      });
    this.destroyConnection();
  }
}
