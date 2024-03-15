export interface IPostsResponse {
    id:        string;
    title:     string;
    content:   string;
    imageUrl:  null;
    authorId:  string;
    createdAt: Date;
    author:    Author;
}

export interface Author {
    avatarUrl: string;
    username:  string;
}
