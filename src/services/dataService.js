class DataService {
  constructor(apiClient, database) {
    this.apiClient = apiClient;
    this.database = database;
  }

  async fetchAndStore(userId) {
    const rawData = await this.apiClient.getData(userId);
    const processed = this.processData(rawData);
    await this.database.save("data_table", processed);
  }

  processData(rawData) {
    const transformed = [];
    for (let i = 0; i < rawData.length; i++) {
      const item = rawData[i];
      transformed.push({
        id: item.id,
        value: item.value || null,
        timestamp: Date.now(),
      });
    }
    return transformed;
  }

  async cleanupOldRecords() {
    const rows = await this.database.query(
      "SELECT id, created_at FROM data_table",
    );
    const stale = rows.filter(
      (row) =>
        Date.now() - new Date(row.created_at).getTime() >
        7 * 24 * 60 * 60 * 1000,
    );
    for (const row of stale) {
      await this.database.delete("data_table", row.id);
    }
  }

  async getStatus() {
    const count = await this.database.count("data_table");
    return {
      count,
      healthy: count >= 0,
    };
  }
}

module.exports = DataService;
