/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ENUM_AGENDAMENTOS_TIPOSANGUE {
  tipoA1 = "tipoA1",
  tipoA2 = "tipoA2",
  tipoAB1 = "tipoAB1",
  tipoAB2 = "tipoAB2",
  tipoB1 = "tipoB1",
  tipoB2 = "tipoB2",
  tipoO1 = "tipoO1",
  tipoO2 = "tipoO2",
}

export interface AgendamentoInput {
  date: any;
  centro?: string | null;
  status?: boolean | null;
  nome: string;
  cpf: string;
  tipoSangue: ENUM_AGENDAMENTOS_TIPOSANGUE;
  users_permissions_user?: string | null;
  published_at?: any | null;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface UsersPermissionsLoginInput {
  identifier: string;
  password: string;
  provider?: string | null;
}

export interface UsersPermissionsRegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface createAgendamentoInput {
  data?: AgendamentoInput | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
