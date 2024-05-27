import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    role : any;
    id : string;
    dateTimePickerValue?: Date; 
  }
  interface Session {
    user : User & {
        role : any;
        id : string;
        dateTimePickerValue?: Date; 
     }
    token : {
        role : any;
        id : string;
        dateTimePickerValue?: Date; 
    }
  }
}