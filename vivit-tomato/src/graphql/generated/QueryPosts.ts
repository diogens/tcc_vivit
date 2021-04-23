/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryPosts
// ====================================================

export interface QueryPosts_posts_centro_avatar {
  __typename: "UploadFile";
  url: string;
}

export interface QueryPosts_posts_centro {
  __typename: "CentroHospitalar";
  name: string;
  avatar: QueryPosts_posts_centro_avatar | null;
}

export interface QueryPosts_posts_cover {
  __typename: "UploadFile";
  name: string;
  url: string;
}

export interface QueryPosts_posts {
  __typename: "Posts";
  id: string;
  title: string;
  subtitle: string | null;
  date: any;
  description: string;
  centro: QueryPosts_posts_centro | null;
  cover: QueryPosts_posts_cover | null;
}

export interface QueryPosts {
  posts: QueryPosts_posts[];
}
