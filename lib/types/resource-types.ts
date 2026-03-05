export type Permission = {
    resource: string,
    permission: string
}
export interface PostUserResourcesPyaload {
    email:string,
    permissions: Permission[]
}

export type User = {
  _id: string;
  email: string;
  permissions?: Permission[];
};

