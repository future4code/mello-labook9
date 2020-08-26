export enum PostType {
  NORMAL = "normal",
  EVENTO = "evento",
};

export const toUserType = (value: string): PostType => {
  switch(value) {
    case "normal":
      return PostType.NORMAL
    case "evento":
      return PostType.EVENTO
    default:
      return PostType.NORMAL
  }
};

export default class Post {

  constructor(
    private id: string,
    private photo: string,
    private description: Text,
    private createdAt: number | string,
    private type: PostType,
    private userId: string
  ) {}

  public getId(): string {
    return this.id
  }

  public getPhoto(): string {
    return this.photo
  }

  public getDescription(): Text {
    return this.description
  }

  public getCreatedAt(): number | string {
    return this.createdAt
  }

  public getType(): PostType {
    return this.type
  }

  public getUserId(): string {
    return this.userId
  }

}