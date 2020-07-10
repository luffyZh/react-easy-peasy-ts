type FetchErrorProps = {
  url: string | undefined;
  _traceId: string;
  token?: string;
};

class FetchError extends Error {
  // @ts-ignore
  private url: string | undefined;
  // @ts-ignore
  private date: Date;
  // @ts-ignore
  private _traceId?: string;
  // @ts-ignore
  private token?: string;

  constructor(message: string = 'fetch error message', props: FetchErrorProps) {
    super(message);
    const { url, _traceId, token } = props;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = 'FetchError';
    // Custom debugging information
    this.url = url;
    this.message = message;
    this.date = new Date();
    _traceId && (this._traceId = _traceId);
    token && (this.token = token);
  }
}

export default FetchError;
