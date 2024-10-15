import { useState } from "react";
import { DefaultTheme } from "react-native-paper";
import { useSelector } from "react-redux";

const useTheme = () => {
  const mode = useSelector((state) => state.themeMode.mode);

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
      thirdBright: "#414141", //'--
      thirdTernary: "#9f9fa0", //'--
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
      inputBg: "#FFFFFF",
      inputText: "#fff",
      whiteTitle: "#fff",
      paymentCardBg: "#FFFFFF",
    },
    borderRadius: 10,
  };

  const lightMode = {
    ...DefaultTheme,
    colors: {
      mode: "lightMode",
      ...DefaultTheme.colors,
      primaryDark: "#dc5902", //' done {same}
      primaryBright: "#FF6500", //' done {same}
      colorTextBlue: "#FF6500", //' done {same}
      secondaryDark: "#fff", //' done
      secondaryGray: "#243642", //' done
      secondaryBright: "#414141", //' done {same}
      paymentCardBg: "#243642",
      thirdBright: "#B7B7B7", //' done
      thirdTernary: "#000", //' done
      ternaryDark: "#9f9fa0", //' done {same}
      ternaryLight: "#e1e1e1", //' done {same}
      primary: "#dc5902", //' done {same}
      secondary: "#000",
      background: "#000",
      surface: "#000",
      tertiary: "#9f9fa0",
      warning: "#FFE234", //' done {same}
      danger: "#d31212", //' done {same}
      success: "#019437", //' done {same}
      white: "#000",
      inputBg: "#B7B7B7", //' done
      inputText: "#fff", //' done {same}
      whiteTitle: "#fff", //' done {same}
    },
    borderRadius: 10,
  };

  return mode == "dark" ? darkMode : lightMode;
};

export default useTheme;
