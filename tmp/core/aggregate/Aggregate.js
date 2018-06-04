"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Aggregate {
    constructor() {
        this.aggregation = [];
    }
    getAggregation() {
        return this.aggregation;
    }
    addMatch(match) {
        this.aggregation.push({
            $match: match
        });
        return this;
    }
    addGroup(group) {
        this.aggregation.push({
            $group: group
        });
        return this;
    }
    addProject(project) {
        this.aggregation.push({
            $project: project
        });
        return this;
    }
    addFilter(filter) {
        this.aggregation.push({
            $filter: filter
        });
        return this;
    }
    toString() {
        return JSON.stringify(this.aggregation);
    }
    toObject() {
        return this.aggregation;
    }
    toJson() {
        return this.toString();
    }
}
exports.Aggregate = Aggregate;
