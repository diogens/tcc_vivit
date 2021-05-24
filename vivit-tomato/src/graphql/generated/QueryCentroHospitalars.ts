/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryCentroHospitalars
// ====================================================

export interface QueryCentroHospitalars_centroHospitalars_avatar {
  __typename: "UploadFile";
  url: string;
}

export interface QueryCentroHospitalars_centroHospitalars {
  __typename: "CentroHospitalar";
  id: string;
  name: string;
  avatar: QueryCentroHospitalars_centroHospitalars_avatar | null;
  description: string | null;
  street: string | null;
  number: string | null;
  telephone1: string | null;
  telephone2: string | null;
  state: string;
  latitude: number;
  longitude: number | null;
}

export interface QueryCentroHospitalars {
  centroHospitalars: QueryCentroHospitalars_centroHospitalars[];
}
