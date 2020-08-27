import { FriendshipDatabase } from "../database/FriendshipDatabase";
import { UserDatabase } from "../database/UserDatabase";

export default class FriendshipBusiness {
  async makeFriendship(userId: string, userToFollowId: string) {
    const user = await new UserDatabase().getUserById(userId);
    const friend = await new UserDatabase().getUserById(userToFollowId);

    if (!user || !friend) {
      throw new Error("Usuário não encontrado");
    }

    const friendship = await new FriendshipDatabase().makeFriendship(
      userId,
      userToFollowId
    );

    return friendship;
  }

  async undoFriendship(userId: string, userToFollowId: string) {
    const user = await new UserDatabase().getUserById(userId);
    const friend = await new UserDatabase().getUserById(userToFollowId);

    if (!user || !friend) {
      throw new Error("Usuário não encontrado");
    }

    await new FriendshipDatabase().undoFriendship(userId, userToFollowId);
  }
}
