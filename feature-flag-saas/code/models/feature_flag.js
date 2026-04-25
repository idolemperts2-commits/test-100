// FeatureFlag model for Node.js
const { v4: uuidv4 } = require('uuid');

class FeatureFlag {
  constructor({ key, name, description = '', projectId, type = 'boolean', defaultValue = false }) {
    this.id = uuidv4();
    this.key = key;
    this.name = name;
    this.description = description;
    this.projectId = projectId;
    this.type = type;
    this.defaultValue = defaultValue;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.variants = [];
    this.rules = [];
  }

  update(updateData) {
    Object.assign(this, updateData);
    this.updatedAt = new Date();
  }
}

module.exports = FeatureFlag;
