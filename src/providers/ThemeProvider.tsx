import { createContext, FC, useState } from 'react';

export const ThemeContext = createContext({
  isDarkTheme: false,
  setIsDarkTheme: (isDarkTheme: boolean) => {},
});

const ThemeProvider: FC = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
