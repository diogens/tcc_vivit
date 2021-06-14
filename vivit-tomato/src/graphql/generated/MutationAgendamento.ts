/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { createAgendamentoInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutationAgendamento
// ====================================================

export interface MutationAgendamento_createAgendamento_agendamento_centro {
  __typename: "CentroHospitalar";
  name: string;
}

export interface MutationAgendamento_createAgendamento_agendamento {
  __typename: "Agendamentos";
  date: any;
  status: boolean;
  nome: string;
  cpf: string;
  centro: MutationAgendamento_createAgendamento_agendamento_centro | null;
}

export interface MutationAgendamento_createAgendamento {
  __typename: "createAgendamentoPayload";
  agendamento: MutationAgendamento_createAgendamento_agendamento | null;
}

export interface MutationAgendamento {
  createAgendamento: MutationAgendamento_createAgendamento | null;
}

export interface MutationAgendamentoVariables {
  input: createAgendamentoInput;
}
