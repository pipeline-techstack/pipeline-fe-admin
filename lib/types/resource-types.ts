export type Permission = {
    resource: String,
    permission: String
}
export interface PostUserResourcesPyaload {
    email:string,
    permissions: Permission[]
}

export type User = {
  _id: string;
  permissions?: Permission[];
  [key: string]: any;
};
