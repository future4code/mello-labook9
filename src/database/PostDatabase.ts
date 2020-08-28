import BaseDB from "./BaseDatabase";
import moment from "moment";
import Post, { PostType } from "../model/Post";

export default class PostsDB extends BaseDB {
  private static TABLE_NAME = "Post_Labook";

  private toModel(dbResult?: any): Post | undefined {
    return (
      dbResult &&
      new Post(
        dbResult.id,
        dbResult.photo,
        dbResult.description,
        moment(dbResult.created_at).format("DD/MM/YYYY"),
        dbResult.type,
        dbResult.user_id
      )
    );
  }

  public async getFeed(id: string): Promise<Post[]> {
    const result = await this.getConnection().raw(
      `SELECT * FROM Post_Labook p
      JOIN Relation_Labook rl ON rl.id_user_followed = p.user_id
      WHERE rl.id_user_following = "${id}"
      ORDER BY p.created_at DESC`
    );

    this.destroyConnection();
    return result[0].map((post: any) => {
      return this.toModel(post);
    }) as Post[];
  }

  public async getFeedType(type: PostType): Promise<Post[]> {
    const result = await this.getConnection()
      .select("*")
      .from(PostsDB.TABLE_NAME)
      .where({ type })
      .orderBy("created_at", "desc");

    this.destroyConnection();
    return result.map((post) => {
      return this.toModel(post);
    }) as Post[];
  }

  public async createPost(post: Post): Promise<void> {
    await this.getConnection()
      .insert({
        id: post.getId(),
        photo: post.getPhoto(),
        description: post.getDescription(),
        created_at: post.getCreatedAt(),
        type: post.getType(),
        user_id: post.getUserId(),
      })
      .into(PostsDB.TABLE_NAME);
    this.destroyConnection();
  }

  public async getPostById(postId: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(PostsDB.TABLE_NAME)
      .where({ id: postId });

    this.destroyConnection();
    return result[0];
  }
}
