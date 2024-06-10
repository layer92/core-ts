/**
 * This is simlar to node's assert function. It's not called Assert, because that may imply that it might be disabled in some (eg production) environments.
 * Use this function just like you might use assert - use to sanity check during functions, use to check data in a Box's constructor, etc...
 * @throws {Error}
 * If the value is false, will throw an Error with name "ExpectationFailed". If you provide a onFail callback, the callback will be called before throwing the error
 *
 * You can provide a string as fail message OR a callback that makes the string (for optimization purposes)
 *
 * Example, in a constructor::
 * `Expect(data.includes(":"),()=>`data: missing ":": ${data}`,onValidationFail);`
 * */
export declare function Expect(value: any, failMessage_or_makeFailMessage?: string | (() => string), onFail?: (message?: string) => void | Promise<void>): asserts value;
