export class UserDTO {
  username: string;

  password: string;

  name: string;

  email: string;

  userType: "administrator" | "default" = "default";
}
