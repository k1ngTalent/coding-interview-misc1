export namespace DeepCopy {

    /**
     * Create a deep copy of a dictionary such that all of the origina keys are maintained
     * and copied into a new dictionary.
     *
     * This is used when we have to create a copy of a dictionary to prevent concurrent mutation
     * or when we need to copy it and then make changes to the new dictionary.
     *
     * The values in the map could be arrays, other dictionaries, sets, maps, strings, arrays, etc.
     *
     * Make sure to handle all cases.
     *
     * This needs to be fully recursive including dictionaries contain other dictionaries
     * and arrays.
     *
     * HINTS
     *
     * - To test if a variable is an object:
     *
     * typeof val === 'object'
     *
     * - To test if a variable is an array:
     *
     * Array.isArray(object)
     *
     * - To get all the keys of an object you can call Object.keys(dict)
     *
     * - If you are given an array as input it should return an array as output.
     *
     * - If you are given an object as input it should return an object as output.
     *
     */
    export function deepCopy<T extends any>(source: T): T {

        //null case
        if (source === null) {
            return source;
          }

          //array case
          if (source instanceof Array) {
            const copy = [] as any[];
            (source as any[]).forEach((arrElement) => {
                copy.push(arrElement);
            });
            return copy.map((val: any) => deepCopy<any>(val)) as any;
          }
          
          //other cases
          if (typeof source === "object" && source !== {}) {
            const copy = { ...(source as { [key: string]: any }) } as {
              [key: string]: any;
            };
            Object.keys(copy).forEach((key) => {
                copy[key] = deepCopy<any>(copy[key]);
            });
            return copy as T;
          }
          return source;
    }

}
