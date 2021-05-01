/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PostFrament
// ====================================================

export interface PostFrament_centro_avatar {
  __typename: "UploadFile";
  url: string;
}

export interface PostFrament_centro {
  __typename: "CentroHospitalar";
  name: string;
  avatar: PostFrament_centro_avatar | null;
}

export interface PostFrament_cover {
  __typename: "UploadFile";
  name: string;
  url: string;
}

export interface PostFrament {
  __typename: "Posts";
  id: string;
  title: string;
  subtitle: string | null;
  date: any;
  description: string;
  centro: PostFrament_centro | null;
  cover: PostFrament_cover | null;
}
