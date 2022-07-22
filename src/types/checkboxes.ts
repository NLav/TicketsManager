export interface ICheckbox {
  label: string;
  name: string;
  checked: boolean;
  setValue: (value: boolean) => void;
  id: string;
}
