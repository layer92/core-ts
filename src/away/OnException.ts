/** a callback used just before an error is thrown - represents an erraneous or exceptional situation. Doesn't contain the actual error that's about to be thrown. If you want that, you'll need to use try/catch, but we recommend you avoid working with the internal error, as it could be considered a leaky abstraction to do so. */
export type OnException = () => void;
