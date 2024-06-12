export interface FormField {
  name: string;
  placeholder: string;
  label: string;
  keyboardType: "default" | "email-address";
  secureTextEntry?: boolean;
}

export interface Data {
  username: string;
  email: string;
  password: string;
}
