export interface IInput {
  label: string;
  type: string;
  name: string;
  value: string;
  setValue: (value: string) => void;
  id: string;
  placeholder: string;
  required?: boolean;
}
