import {Injectable} from '@angular/core';
import {combineLatest, fromEvent, merge} from 'rxjs';
import {debounceTime, map, startWith, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  private readonly _BREAKPOINTS = {
    DESKTOP: 1280,
    MEDIUM: 940,
    SMALL: 768
  } as const;

  readonly resize$ = merge(
    fromEvent(window, 'resize'),
    fromEvent(window, 'orientationchange'),
  )
    .pipe(
      map(() => window.innerWidth),
      debounceTime(500),
      startWith(window.innerWidth),
    );

  readonly isDesktop$ = this.resize$.pipe(
    map((_) => _ >= this._BREAKPOINTS.DESKTOP),
  );

  readonly isNotDesktopScreen$ = this.resize$.pipe(
    map((_) => _ < this._BREAKPOINTS.DESKTOP),
  );

  readonly isMedium$ = this.resize$.pipe(
    map((_) => _ < this._BREAKPOINTS.DESKTOP && _ >= this._BREAKPOINTS.MEDIUM),
  );
  readonly isMediumMaxWidth$ = this.resize$.pipe(
    map((_) => _ <= this._BREAKPOINTS.MEDIUM)
  );
  readonly isSmall$ = this.resize$.pipe(
    map((_) => _ < this._BREAKPOINTS.MEDIUM && _ >= this._BREAKPOINTS.SMALL),
  );

  readonly isNotSmall$ = this.resize$.pipe(
    map((_) => _ >= this._BREAKPOINTS.MEDIUM),
  );

  readonly isSmallest$ = this.resize$.pipe(
    map((_) => _ < this._BREAKPOINTS.SMALL),
  );

  readonly sizeOfDevice$ = combineLatest([
    this.isDesktop$,
    this.isMedium$,
    this.isSmall$,
  ]).pipe(
    map(([isLarge, isMedium, isSmall]) => ({isLarge, isMedium, isSmall})),
  );
}
