/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_AGENDAMENTOS_TIPOSANGUE } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryAgendamentos
// ====================================================

export interface QueryAgendamentos_agendamentos_users_permissions_user {
  __typename: "UsersPermissionsUser";
  id: string;
  email: string;
  username: string;
}

export interface QueryAgendamentos_agendamentos_centro_avatar {
  __typename: "UploadFile";
  name: string;
  url: string;
}

export interface QueryAgendamentos_agendamentos_centro {
  __typename: "CentroHospitalar";
  name: string;
  avatar: QueryAgendamentos_agendamentos_centro_avatar | null;
  street: string | null;
  number: string | null;
  telephone1: string | null;
  telephone2: string | null;
  state: string;
}

export interface QueryAgendamentos_agendamentos {
  __typename: "Agendamentos";
  id: string;
  date: any;
  nome: string;
  published_at: any | null;
  users_permissions_user: QueryAgendamentos_agendamentos_users_permissions_user | null;
  centro: QueryAgendamentos_agendamentos_centro | null;
  tipoSangue: ENUM_AGENDAMENTOS_TIPOSANGUE;
  status: boolean;
  cpf: string;
}

export interface QueryAgendamentos {
  agendamentos: QueryAgendamentos_agendamentos[];
}
