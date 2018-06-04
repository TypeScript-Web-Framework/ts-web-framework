"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataTypes {
    static is(value) {
        return !(value instanceof DataTypes === false || typeof value !== 'string');
    }
    static infer(value) {
        switch (value) {
            case String: return DataTypes.TEXT;
            case Number:
            case Boolean: return DataTypes.INTEGER;
            case Date: return DataTypes.DATE;
            default: return void 0;
        }
    }
}
DataTypes.INTEGER = 'INTEGER';
DataTypes.REAL = 'REAL';
DataTypes.TEXT = 'TEXT';
DataTypes.BLOB = 'NONE';
DataTypes.NUMERIC = 'NUMERIC';
DataTypes.NONE = 'NONE';
DataTypes.NULL = 'NONE';
DataTypes.INT = 'INTEGER';
DataTypes.TINYINT = 'INTEGER';
DataTypes.SMALLINT = 'INTEGER';
DataTypes.MEDIUMINT = 'INTEGER';
DataTypes.BIGINT = 'INTEGER';
DataTypes.UNSIGNED_BIGINT = 'INTEGER';
DataTypes.INT2 = 'INTEGER';
DataTypes.INT8 = 'INTEGER';
DataTypes.CHARACTER = 'TEXT';
DataTypes.VARCHAR = 'TEXT';
DataTypes.VARYING_CHARACTER = 'TEXT';
DataTypes.NCHAR = 'TEXT';
DataTypes.NATIVE_CHARACTER = 'TEXT';
DataTypes.NVARCHAR = 'TEXT';
DataTypes.CLOB = 'TEXT';
DataTypes.DOUBLE = 'REAL';
DataTypes.DOUBLE_PRESITION = 'REAL';
DataTypes.FLOAT = 'REAL';
DataTypes.DECIMAL = 'NUMERIC';
DataTypes.BOOLEAN = 'NUMERIC';
DataTypes.DATE = 'NUMERIC';
DataTypes.DATETIME = 'NUMERIC';
DataTypes.TIME = 'NUMERIC';
exports.DataTypes = DataTypes;
