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
}
