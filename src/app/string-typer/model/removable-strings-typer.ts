import { Observable, Observer, Subject, Subscription } from 'rxjs';

class RepeatableStringsEmitter extends Subject<string> {
  private _stringTyperSubscription: Subscription | null = null;

  constructor(
    private readonly _createStringsEmitter: () => Observable<string>,
  ) {
    super();
  }

  // @ts-ignore
  override subscribe(
    observerOrNext?: Partial<Observer<string>> | ((value: string) => void),
  ): Subscription {
    const result = super.subscribe(observerOrNext);
    if (!this._stringTyperSubscription) {
      this._setStringsEmitter();
    }
    return result;
  }

  override unsubscribe() {
    super.unsubscribe();
    if (!this.observed) {
      this._removeStringTyper();
    }
  }

  private _removeStringTyper(): void {
    if (this._stringTyperSubscription) {
      this._stringTyperSubscription.unsubscribe();
      this._stringTyperSubscription = null;
    }
  }

  private _subscribeNextStringTyper(): void {
    this._removeStringTyper();
    if (this.observed) {
      this._setStringsEmitter();
    }
  }

  private _setStringsEmitter() {
    this._stringTyperSubscription = this._createStringsEmitter().subscribe({
      next: (_) => this.next(_),
      complete: () => this._subscribeNextStringTyper(),
    });
  }
}

export const createRepeatableStringsEmitter = (
  createTyper: () => Observable<string>,
) => {
  return new RepeatableStringsEmitter(createTyper).asObservable();
};
