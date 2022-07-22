export interface IButton {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  children?: React.ReactNode;
  color: 'default' | 'green' | 'red' | 'yellow';
}
