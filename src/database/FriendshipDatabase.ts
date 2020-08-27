import BaseDB from "./BaseDatabase";

export class FriendshipDatabase extends BaseDB {
  private static TABLE_NAME = "Relation_Labook";

  public async makeFriendship(
    userId: string,
    userToFollowId: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id_user_following: userId,
        id_user_followed: userToFollowId,
      })
      .into(FriendshipDatabase.TABLE_NAME);
    this.destroyConnection();
  }

  public async undoFriendship(
    userId: string,
    userToFollowId: string
  ): Promise<void> {
    await this.getConnection()
      .del("*")
      .from(FriendshipDatabase.TABLE_NAME)
      .where({
        id_user_following: userId,
        id_user_followed: userToFollowId,
      })
      .orWhere({
        id_user_following: userToFollowId,
        id_user_followed: userId,
      });
    this.destroyConnection();
  }
}
