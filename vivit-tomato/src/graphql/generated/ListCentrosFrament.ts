/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ListCentrosFrament
// ====================================================

export interface ListCentrosFrament_avatar {
  __typename: "UploadFile";
  url: string;
}

export interface ListCentrosFrament {
  __typename: "CentroHospitalar";
  id: string;
  name: string;
  avatar: ListCentrosFrament_avatar | null;
}
