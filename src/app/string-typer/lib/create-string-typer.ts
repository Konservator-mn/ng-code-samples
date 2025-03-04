import { timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

const isArrayAndHasItems = (_: unknown) => Array.isArray(_) && _.length > 0;

const execTag = (inText: string, fromIndex: number) => {
  const exec = /^<[\w\d]+\/>/.exec(inText.slice(fromIndex));
  return isArrayAndHasItems(exec) ? exec ? exec : [0] : null;
};
export const createStringTyper = (
  text: string,
  startDelay: number,
  intervalMs: number,
) => {
  let index = 0;
  return timer(startDelay, intervalMs).pipe(
    takeWhile(() => index <= text.length),
    map(() => {
      const nextTag = execTag(text, index);
      if (nextTag) {
        index += nextTag.length;
      }
      return text.slice(0, index++);
    }),
  );
};
