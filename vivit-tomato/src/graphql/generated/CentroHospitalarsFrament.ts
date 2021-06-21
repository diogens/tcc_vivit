/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CentroHospitalarsFrament
// ====================================================

export interface CentroHospitalarsFrament_avatar {
  __typename: "UploadFile";
  url: string;
}

export interface CentroHospitalarsFrament_gallery {
  __typename: "UploadFile";
  id: string;
  url: string;
}

export interface CentroHospitalarsFrament_posts_cover {
  __typename: "UploadFile";
  url: string;
}

export interface CentroHospitalarsFrament_posts {
  __typename: "Posts";
  id: string;
  title: string;
  cover: CentroHospitalarsFrament_posts_cover | null;
}

export interface CentroHospitalarsFrament {
  __typename: "CentroHospitalar";
  id: string;
  name: string;
  avatar: CentroHospitalarsFrament_avatar | null;
  description: string | null;
  street: string | null;
  number: string | null;
  telephone1: string | null;
  telephone2: string | null;
  state: string;
  latitude: number;
  longitude: number | null;
  gallery: CentroHospitalarsFrament_gallery[];
  posts: CentroHospitalarsFrament_posts[];
}
