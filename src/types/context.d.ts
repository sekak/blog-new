export interface PropsTheme {
  mode: dark | light;
  setMode: React.Dispatch<SetStateAction<string>>;
}

export interface ProviderProps {
  children: React.ReactNode;
}
