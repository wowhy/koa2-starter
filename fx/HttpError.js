export default class HttpError extends Error {
  constructor(code = 500, type = 'UnhandledError', message = '') {
    super(message)
    this.code = code
    this.type = type
  }
}
