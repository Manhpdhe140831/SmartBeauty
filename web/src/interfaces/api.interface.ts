/**
 * TODO: verify with team backend.
 * Standard error response.
 */
export interface IErrorResponse {
  path: string;
  error: string;
  message: string;
  status: number;
}

export interface ILoginResponse {
  accessToken: string;
}
