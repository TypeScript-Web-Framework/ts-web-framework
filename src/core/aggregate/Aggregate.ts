export interface IAggregation{
    [key : string] : IAggregation | any;
    $exists?: boolean;
    $ne?: any;
    $gte?: any;
    $gt?: any;
    $lt?: any;
    $lte?: any;
    $in?: any[];
    $max?: any;
    $min?: any;
    $arrayToObject?: any;
    $map?: any;
    $cond?: any;
}


export class Aggregate {
    private aggregation : object[] = [];
    public constructor () {
    }

    public getAggregation () {
        return this.aggregation;
    }

    public addMatch (match : IAggregation) {
        this.aggregation.push({
            $match : match
        });
        return this;
    }

    public addGroup (group: IAggregation) {
        this.aggregation.push({
            $group : group
        });
        return this;
    }
    public addProject (project : IAggregation) {
        this.aggregation.push({
            $project : project
        });
        return this;
    }
    public addFilter (filter:  IAggregation) {
        this.aggregation.push({
            $filter : filter
        });
        return this;
    }

    public toString () {
        return JSON.stringify(this.aggregation);
    }
    public toObject ()  {
        return this.aggregation;
    }
    public toJson () {
        return this.toString()
    }
}
