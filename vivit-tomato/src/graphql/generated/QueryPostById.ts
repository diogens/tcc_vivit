/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryPostById
// ====================================================

export interface QueryPostById_posts_centro_avatar {
  __typename: "UploadFile";
  url: string;
}

export interface QueryPostById_posts_centro {
  __typename: "CentroHospitalar";
  name: string;
  avatar: QueryPostById_posts_centro_avatar | null;
}

export interface QueryPostById_posts_cover {
  __typename: "UploadFile";
  name: string;
  url: string;
}

export interface QueryPostById_posts {
  __typename: "Posts";
  id: string;
  title: string;
  subtitle: string | null;
  date: any;
  description: string;
  centro: QueryPostById_posts_centro | null;
  cover: QueryPostById_posts_cover | null;
}

export interface QueryPostById {
  posts: QueryPostById_posts[];
}

export interface QueryPostByIdVariables {
  id: string;
}
