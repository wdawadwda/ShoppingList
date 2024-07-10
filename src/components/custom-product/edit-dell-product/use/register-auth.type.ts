export interface FormField {
  name: string;
  placeholder: string;
  label: string;
  keyboardType: "default";
  maxLength: number;
}

export interface Data {
  username: string;
  email: string;
  password: string;
}
