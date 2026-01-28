import Maybe from "../maybe/maybe.js";

export default class Result<T, E> {
  private ok: Maybe<T>;
  private err: Maybe<E>;

  private constructor(ok: T | null, err: E | null) {
    if (ok === null && err === null) {
      throw Error(`both \`Ok\` and \'Err\' can't be null at the same time`);
    }
    if (ok !== null && err !== null) {
      throw Error(
        `both \`Ok\` and \'Err\' can't be other than null at the same time`,
      );
    }
    this.ok = new Maybe<T>(ok);
    this.err = new Maybe<E>(err);
  }

  //public interface to construct an instance
  public static Ok<T, E>(val: T): Result<T, E> {
    return new Result<T, E>(val, null);
  }
  public static Err<T, E>(err: E): Result<T, E> {
    return new Result<T, E>(null, err);
  }
  //useful methods
  public is_ok(): boolean {
    return this.ok.is_value();
  }
  public is_error(): boolean {
    return this.err.is_value();
  }
  public ok_value(): Maybe<T> {
    return this.ok;
  }
  public err_value(): Maybe<E> {
    return this.err;
  }
  public map<U, Q>(
    ok_mapper: (val: T) => U,
    err_mapper: (err: E) => Q,
  ): Result<U, Q> {
    if (this.is_ok()) {
      return Result.Ok<U, Q>(ok_mapper(this.ok_value().unwrap()));
    } else {
      return Result.Err<U, Q>(err_mapper(this.err_value().unwrap()));
    }
  }
  public map_ok<U>(fn: (val: T) => U): Result<U, E> {
    return this.map<U, E>(fn, (err) => err);
  }
  public map_err<Q>(fn: (val: E) => Q): Result<T, Q> {
    return this.map<T, Q>((v) => v, fn);
  }
  public transform<To>(fn: (from: typeof this) => To): To {
    return fn(this);
  }
}
