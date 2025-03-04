import { timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
const isArrayAndHasItems = (_: unknown) => Array.isArray(_) && _.length > 0;

const execTag = (inText: string, fromIndex: number) => {
  const exec = /<[\w\d]+\/>$/.exec(inText.slice(0, fromIndex + 1));
  // @ts-ignore
  return isArrayAndHasItems(exec) ? exec[0] : null;
};

export const createStringRemover = (
  text: string,
  delayMs: number,
  intervalMs: number,
) => {
  let index = text.length;
  return timer(delayMs, intervalMs).pipe(
    takeWhile(() => index >= 0),
    map(() => {
      const nextTag = execTag(text, index);
      if (nextTag) {
        index = index - nextTag.length + 1;
      }
      return text.slice(0, index--);
    }),
  );
};
