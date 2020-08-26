import BaseDB from './BaseDatabase';
import moment from 'moment';
import Post, { PostType } from '../models/Post';

export default class PostsDB extends BaseDB {
  private static TABLE_NAME = "Post_Labook"

  private toModel(dbResult?: any): Post | undefined {
    return (
      dbResult &&
      new Post(
        dbResult.id,
        dbResult.photo,
        dbResult.description,
        moment.unix(dbResult.created_at).format("DD/MM/YYYY"),
        dbResult.type,
        dbResult.user_id
      )
    )
  }

  public async getFeed (id: string): Promise<Post []> {
    const result = await this.getConnection().raw(
      `SELECT * FROM Post_Labook p
      JOIN Friends f on xxxx = p.user_id
      WHERE xxxx = "${id}"
      ORDER BY p.created_at DESC`
    );
    return result[0].map((post: any) => {
      return this.toModel(post)
    }) as Post[]
  }

  public async getFeedType (type: PostType): Promise<Post[]> {
    const result = await this.getConnection()
    .select('*')
    .from(PostsDB.TABLE_NAME)
    .where({type})
    .orderBy("created_at", "desc")

    return result.map((post) => {
      return this.toModel(post)
    }) as Post[]
  }
}