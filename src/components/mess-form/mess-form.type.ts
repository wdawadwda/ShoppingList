export interface MessFormProperties {
  status: "success" | "error";
  message: {
    defaultAxios?: string;
    username?: string;
    email?: string;
    password?: string;
    successMessage?: string;
    detail?: string;
  };
}
