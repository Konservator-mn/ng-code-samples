import { concat } from 'rxjs';
import { ITyperConfig } from '../model/typer-config.interface';
import { createStringTyper } from './create-string-typer';
import { createStringRemover } from './create-string-remover';
import { finalize } from 'rxjs/operators';

export const createStringTyperWithRemover = (
  text: string,
  config: ITyperConfig,
) => {
  const { startDelay, typingSpeedMs, removerDelayMs, removerSpeedMs } = config;
  return concat(
    createStringTyper(text, startDelay, typingSpeedMs),
    createStringRemover(text, removerDelayMs, removerSpeedMs),
  );
};
