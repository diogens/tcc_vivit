/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UsersPermissionsLoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutationLogin
// ====================================================

export interface MutationLogin_login_user {
  __typename: "UsersPermissionsMe";
  username: string;
  email: string;
  id: string;
}

export interface MutationLogin_login {
  __typename: "UsersPermissionsLoginPayload";
  jwt: string | null;
  user: MutationLogin_login_user;
}

export interface MutationLogin {
  login: MutationLogin_login;
}

export interface MutationLoginVariables {
  input: UsersPermissionsLoginInput;
}
