/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CentroHospitalarBy
// ====================================================

export interface CentroHospitalarBy_centroHospitalars_avatar {
  __typename: "UploadFile";
  url: string;
}

export interface CentroHospitalarBy_centroHospitalars {
  __typename: "CentroHospitalar";
  id: string;
  name: string;
  avatar: CentroHospitalarBy_centroHospitalars_avatar | null;
}

export interface CentroHospitalarBy {
  centroHospitalars: CentroHospitalarBy_centroHospitalars[];
}
