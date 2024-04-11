export interface IPostsResponse {
    id:        string;
    title:     string;
    content:   string;
    imageUrl:  string | undefined;
    authorId:  string;
    createdAt: string;
    author:    Author;
}

export interface Author {
    avatarUrl: string;
    username:  string;
}
