export interface LoginResponse {
  user: {
    id: string;
    email: string;
    isAuth: boolean;
    st_access_token: string;
  };
}

export interface AuthProps {
  email: string;
  password: string;
}
