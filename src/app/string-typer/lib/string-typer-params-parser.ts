import {
  ComponentInputData,
  IParsedStringToType,
  ITyperConfig,
  ITyperConfigWithText,
} from '../model/typer-config.interface';

const isArrayAndHasItems = (_: []) => Array.isArray(_) && _.length > 0;

const parseFromString = (
  stringsToType: string,
  defaultConfig: ITyperConfig,
): IParsedStringToType => {
  return { text: stringsToType, config: defaultConfig };
};

const parseFromDefinedConfig = (
  stringsToType: string,
  definedConfig: Partial<ITyperConfig>,
  defaultConfig: ITyperConfig,
): IParsedStringToType => {
  const mergedConfig = { ...defaultConfig };
  for (const [key, value] of Object.entries(definedConfig)) {
    if (mergedConfig.hasOwnProperty(key)) {
      // @ts-ignore
      mergedConfig[key] = value;
    }
  }
  return { text: stringsToType, config: mergedConfig };
};

export const parseStringTyperParams = (
  stringsToType: ComponentInputData,
  defaultConfig: ITyperConfig,
): IParsedStringToType[] => {
  const parsedStrings: IParsedStringToType[] = [];
  if (typeof stringsToType === 'string') {
    parsedStrings.push(parseFromString(stringsToType, defaultConfig));
  } else { // @ts-ignore
    if (isArrayAndHasItems(stringsToType as unknown[])) {
        (stringsToType as (string | ITyperConfigWithText)[]).forEach((_) => {
          if (typeof _ === 'string') {
            parsedStrings.push(parseFromString(_, defaultConfig));
          } else if (typeof _?.text === 'string') {
            parsedStrings.push(parseFromDefinedConfig(_.text, _, defaultConfig));
          } else { // @ts-ignore
            if (isArrayAndHasItems(_.text)) {
                        _.text.forEach((text) => {
                          parsedStrings.push(parseFromDefinedConfig(text, _, defaultConfig));
                        });
                      }
          }
        });
      }
  }
  return parsedStrings;
};
