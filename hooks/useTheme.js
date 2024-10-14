import { useState } from "react";
import { DefaultTheme } from "react-native-paper";
import { useSelector } from "react-redux";

const useTheme = () => {
  const mode = useSelector((state) => state.themeMode.mode);
  //   const [themeMode, setThemeMode] = useState(mode);

  const darkMode = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      mode: "darkMode",
      primaryDark: "#dc5902",
      primaryBright: "#FF6500",
      colorTextBlue: "#FF6500",
      secondaryDark: "#000000",
      secondaryGray: "#272727",
      secondaryBright: "#414141",
      ternaryDark: "#9f9fa0",
      ternaryLight: "#e1e1e1",
      primary: "#dc5902",
      secondary: "#414141",
      background: "#0a0a0b",
      surface: "#0a0a0b",
      tertiary: "#9f9fa0",
      warning: "#FFE234",
      danger: "#d31212",
      success: "#019437",
      white: "#FFFFFF",
      inputBg: "#393939",
    },
    borderRadius: 10,
  };
  const lightMode = {
    ...DefaultTheme,
    colors: {
      mode: "lightMode",
      ...DefaultTheme.colors,
      primaryDark: "#dc5902",
      primaryBright: "#FF6500",
      colorTextBlue: "#FF6500",
      secondaryDark: "#ffff",
      secondaryGray: "#272725",
      secondaryBright: "#E0E0E0",
      ternaryDark: "#C0C0C0",
      ternaryLight: "#0000",
      primary: "#FF8C33",
      secondary: "#E0E0E0",
      background: "#FFFFFF",
      surface: "#F2F2F2",
      tertiary: "#C0C0C0",
      warning: "#FFC107",
      danger: "#E57373",
      success: "#4CAF50",
      white: "#000",
      inputBg: "#F0F0F0",
    },
    borderRadius: 10,
  };

  return mode == "dark" ? darkMode : lightMode;
};

export default useTheme;
