import { IParsedStringToType } from '../model/typer-config.interface';
import { createStringTyperWithRemover } from './create-removable-string-typer';
import { concat } from 'rxjs';

export const convertParsedStringsIntoObservable = (
  parsedStrings: IParsedStringToType[],
) => {
  const observables = parsedStrings.map(({ text, config }) =>
    createStringTyperWithRemover(text, config),
  );
  return concat(...observables);
};
