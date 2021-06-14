/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryCentroHospitalar
// ====================================================

export interface QueryCentroHospitalar_centroHospitalars_avatar {
  __typename: "UploadFile";
  url: string;
}

export interface QueryCentroHospitalar_centroHospitalars {
  __typename: "CentroHospitalar";
  id: string;
  name: string;
  avatar: QueryCentroHospitalar_centroHospitalars_avatar | null;
}

export interface QueryCentroHospitalar {
  centroHospitalars: QueryCentroHospitalar_centroHospitalars[];
}
