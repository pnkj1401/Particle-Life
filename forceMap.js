/** @template T */
export default class ForceMap {

    /** @type {Map<T, Map<T, number>>} */
    #map = new Map;
  
    /** @param {T[]} keys */
    constructor(keys) {
      this.#createForces(keys);
    }
  
    /** @param {T[]} keys */
    #createForces(keys) {
      for (const keyA of keys) {
        for (const keyB of keys) {
          let force = (Math.random() * 2 - 1) / 3;
          this.#set(keyA, keyB, force);
        }
      }
    }
  
    /**
     * @param {T} keyA
     * @param {T} keyB
     * @param {number} force
     */
    #set(keyA, keyB, force) {
      if (!this.#map.has(keyA)) {
        this.#map.set(keyA, new Map);
      }
      this.#map.get(keyA).set(keyB, force);
    }
  
    /**
     * @param {T} keyA
     * @param {T} keyB
     */
    get(keyA, keyB) {
      return this.#map.get(keyA)?.get(keyB);
    }
  
    /**
     * @template T
     * @param {Iterable<readonly [ T, readonly [T, number][] ]>} entries
     */
    static fromEntries(entries) {
      /** @type {ForceMap<T>} */
      const instance = new ForceMap([]);
      for (const [keyA, entry] of entries) {
        for(const [keyB, value] of entry) {
          instance.#set(keyA, keyB, value);
        }
      }
      return instance;
    }
  
  };