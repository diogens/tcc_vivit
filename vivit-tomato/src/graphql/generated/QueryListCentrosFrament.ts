/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: QueryListCentrosFrament
// ====================================================

export interface QueryListCentrosFrament_avatar {
  __typename: "UploadFile";
  url: string;
}

export interface QueryListCentrosFrament {
  __typename: "CentroHospitalar";
  id: string;
  name: string;
  avatar: QueryListCentrosFrament_avatar | null;
}
