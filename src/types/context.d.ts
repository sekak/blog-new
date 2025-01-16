export interface PropsTheme {
  mode: dark | light;
  setMode: React.Dispatch<SetStateAction<string>>;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}
