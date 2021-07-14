class MemoryCache {
  constructor() {
    this.memory = {};
  }

  save(type, data) {
    this.memory[type] = data;
  }

  get(type) {
    return this.memory[type];
  }
}

export default MemoryCache;