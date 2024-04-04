/** We type this all the time in typescript, so we save a lot of time by having it here. */
export type Setter<Type> = (value:Type)=>void|Promise<void>;