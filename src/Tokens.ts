import * as tokensJson from "../tokens.json";
import {
  BoxShadows,
  BoxShadow,
  Font,
  Fonts,
  Typography,
  FontSize,
  FontWeight,
  FontFamily,
  Spacings,
  BorderRadius,
  LineHeight,
  Color,
} from "./TokensType";

const parseShadow = (value: any): BoxShadow | void => {
  if (typeof value !== "string")
    return {
      color: value.color,
      type: value.type,
      x: value.x,
      y: value.y,
      blur: value.blur,
      spread: value.spread,
    };
};

const parseAliasShadow =
  (shadow: BoxShadows) =>
  (value: any): BoxShadow | void => {
    if (typeof value === "string") {
      const key = value.replace(/\D/g, "");
      return shadow[key as keyof BoxShadows];
    }
  };

const parseTypography =
  (font: Fonts) =>
  (value: any): Font => {
    return {
      fontWeight:
        font.fontWeight[
          value["fontWeight"]
            .replace("}", "")
            .split(".")
            .slice(-1)[0] as keyof FontWeight
        ],
      fontSize:
        font.fontSize[
          value["fontSize"]
            .replace("}", "")
            .split(".")
            .slice(-1)[0] as keyof FontSize
        ],
      fontFamily:
        font.fontFamily[
          value["fontFamily"]
            .replace("{", "")
            .replace("}", "") as keyof FontFamily
        ],
    };
  };

const parseString = (value: string) => value;

const getValueToken = <T, R>(
  tokenValue: any,
  parseMethod: (value: any) => R
): T => {
  let values = {};
  const value = tokenValue;
  Object.keys(value).forEach((key) => {
    const parsedValue = parseMethod(value[key].value);
    if (parsedValue) {
      (values as Record<string, R>)[key] = parsedValue;
    }
  });
  return values as T;
};

const getTokens = () => {
  const shadows = getValueToken<BoxShadows, BoxShadow | void>(
    tokensJson.global.shadow,
    parseShadow
  );
  const fontSize = getValueToken<FontSize, number>(
    tokensJson.global["font-size"],
    parseInt
  );
  const fontWeight = getValueToken<FontWeight, number>(
    tokensJson.global["font-weight"],
    parseInt
  );
  const fontFamily: FontFamily = {
    "public-sans": "Public Sans",
    "noto-sans": "Noto Sans",
  };
  const font: Fonts = { fontWeight, fontSize, fontFamily };

  return {
    spacing: getValueToken<Spacings, number>(
      tokensJson.global.spacing,
      parseInt
    ),
    boxShadow: {
      ...shadows,
      ...getValueToken<BoxShadows, BoxShadow | void>(
        tokensJson.global.shadow,
        parseAliasShadow(shadows)
      ),
    },
    borderRadius: getValueToken<BorderRadius, number>(
      tokensJson.global["border-radius"],
      parseInt
    ),
    fontWeight: fontWeight,
    lineHeight: getValueToken<LineHeight, string>(
      tokensJson.global["line-height"],
      parseString
    ),
    color: {
      primary: getValueToken<Color, string>(
        tokensJson.global.primary,
        parseString
      ),
      secondary: getValueToken<Color, string>(
        tokensJson.global.secondary,
        parseString
      ),
      info: getValueToken<Color, string>(tokensJson.global.info, parseString),
      success: getValueToken<Color, string>(
        tokensJson.global.success,
        parseString
      ),
      warning: getValueToken<Color, string>(
        tokensJson.global.warning,
        parseString
      ),
      error: getValueToken<Color, string>(tokensJson.global.error, parseString),
      neutral: getValueToken<Color, string>(
        tokensJson.global.neutral,
        parseString
      ),
    },
    fontSize: fontSize,
    fontFamily: fontFamily,
    typography: {
      headline: getValueToken<Typography, Font>(
        tokensJson.global.headline,
        parseTypography(font)
      ),
      body: getValueToken<Typography, Font>(
        tokensJson.global.body,
        parseTypography(font)
      ),
      label: getValueToken<Typography, Font>(
        tokensJson.global.label,
        parseTypography(font)
      ),
      button: getValueToken<Typography, Font>(
        tokensJson.global.button,
        parseTypography(font)
      ),
    },
  };
};

const tokens = getTokens();
export default tokens;
