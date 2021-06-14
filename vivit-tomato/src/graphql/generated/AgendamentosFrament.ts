/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_AGENDAMENTOS_TIPOSANGUE } from "./globalTypes";

// ====================================================
// GraphQL fragment: AgendamentosFrament
// ====================================================

export interface AgendamentosFrament_users_permissions_user {
  __typename: "UsersPermissionsUser";
  id: string;
  email: string;
  username: string;
}

export interface AgendamentosFrament_centro_avatar {
  __typename: "UploadFile";
  name: string;
  url: string;
}

export interface AgendamentosFrament_centro {
  __typename: "CentroHospitalar";
  name: string;
  avatar: AgendamentosFrament_centro_avatar | null;
  street: string | null;
  number: string | null;
  telephone1: string | null;
  telephone2: string | null;
  state: string;
}

export interface AgendamentosFrament {
  __typename: "Agendamentos";
  id: string;
  date: any;
  nome: string;
  published_at: any | null;
  users_permissions_user: AgendamentosFrament_users_permissions_user | null;
  centro: AgendamentosFrament_centro | null;
  tipoSangue: ENUM_AGENDAMENTOS_TIPOSANGUE;
  status: boolean;
  cpf: string;
}
