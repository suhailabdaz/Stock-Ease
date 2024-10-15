export type User = {
  userData:UserData | null
  user_IsAuthenticated : boolean
  email:string | null
}

export interface UserData  {
  _id:string,
  name:string,
  email:string,
}
