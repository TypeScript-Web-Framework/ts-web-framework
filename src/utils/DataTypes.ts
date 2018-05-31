export class DataTypes {
    static readonly INTEGER     :string= 'INTEGER';
    static readonly REAL        :string= 'REAL';
    static readonly TEXT        :string= 'TEXT';
    static readonly BLOB        :string= 'NONE';
    static readonly NUMERIC     :string= 'NUMERIC';
    static readonly NONE        :string= 'NONE';
    static readonly NULL        :string= 'NONE';
    static readonly INT         :string= 'INTEGER';
    static readonly TINYINT     :string= 'INTEGER';
    static readonly SMALLINT    :string= 'INTEGER';
    static readonly MEDIUMINT   :string= 'INTEGER';
    static readonly BIGINT      :string= 'INTEGER';
    static readonly UNSIGNED_BIGINT :string= 'INTEGER';
    static readonly INT2        :string= 'INTEGER';
    static readonly INT8        :string= 'INTEGER';
    static readonly CHARACTER   :string= 'TEXT';
    static readonly VARCHAR     :string= 'TEXT';
    static readonly VARYING_CHARACTER :string= 'TEXT';
    static readonly NCHAR      :string = 'TEXT';
    static readonly NATIVE_CHARACTER :string= 'TEXT';
    static readonly NVARCHAR    :string= 'TEXT';
    static readonly CLOB        :string= 'TEXT';
    static readonly DOUBLE      :string= 'REAL';
    static readonly DOUBLE_PRESITION :string= 'REAL';
    static readonly FLOAT       :string= 'REAL';
    static readonly DECIMAL     :string= 'NUMERIC';
    static readonly BOOLEAN     :string= 'NUMERIC';
    static readonly DATE        :string= 'NUMERIC';
    static readonly DATETIME    :string= 'NUMERIC';
    static readonly TIME        :string= 'NUMERIC';
    public static is(value:any):boolean {
        return !(value instanceof DataTypes === false || typeof value !== 'string');
    }
    public static infer (value:any):string {
        switch (value) {
            case String:return DataTypes.TEXT;
            case Number:
            case Boolean:return DataTypes.INTEGER;
            case Date:return DataTypes.DATE;
            default:return void 0;
        }
    }
}
