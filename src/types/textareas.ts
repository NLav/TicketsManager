export interface ITextArea {
  label: string;
  name: string;
  value: string;
  setValue: (value: string) => void;
  id: string;
  placeholder: string;
  rows: number;
  required?: boolean;
}
