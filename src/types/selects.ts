export interface ISelect {
  label: string;
  name: string;
  value: string;
  setValue: (value: string) => void;
  id: string;
  options: string[];
}
