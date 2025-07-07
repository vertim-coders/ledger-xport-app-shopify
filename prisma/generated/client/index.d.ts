
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Shop
 * 
 */
export type Shop = $Result.DefaultSelection<Prisma.$ShopPayload>
/**
 * Model FiscalConfiguration
 * 
 */
export type FiscalConfiguration = $Result.DefaultSelection<Prisma.$FiscalConfigurationPayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>
/**
 * Model ScheduledTask
 * 
 */
export type ScheduledTask = $Result.DefaultSelection<Prisma.$ScheduledTaskPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model GeneralSettings
 * 
 */
export type GeneralSettings = $Result.DefaultSelection<Prisma.$GeneralSettingsPayload>
/**
 * Model FtpConfig
 * 
 */
export type FtpConfig = $Result.DefaultSelection<Prisma.$FtpConfigPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ReportStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  COMPLETED_WITH_EMPTY_DATA: 'COMPLETED_WITH_EMPTY_DATA',
  ERROR: 'ERROR'
};

export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus]


export const Protocol: {
  FTP: 'FTP',
  SFTP: 'SFTP'
};

export type Protocol = (typeof Protocol)[keyof typeof Protocol]


export const FtpDeliveryStatus: {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

export type FtpDeliveryStatus = (typeof FtpDeliveryStatus)[keyof typeof FtpDeliveryStatus]


export const UserRole: {
  ADMIN: 'ADMIN',
  USER: 'USER',
  ACCOUNTANT: 'ACCOUNTANT'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const ExportFormat: {
  CSV: 'CSV',
  JSON: 'JSON',
  PDF: 'PDF',
  XML: 'XML',
  TXT: 'TXT',
  XLSX: 'XLSX'
};

export type ExportFormat = (typeof ExportFormat)[keyof typeof ExportFormat]

}

export type ReportStatus = $Enums.ReportStatus

export const ReportStatus: typeof $Enums.ReportStatus

export type Protocol = $Enums.Protocol

export const Protocol: typeof $Enums.Protocol

export type FtpDeliveryStatus = $Enums.FtpDeliveryStatus

export const FtpDeliveryStatus: typeof $Enums.FtpDeliveryStatus

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type ExportFormat = $Enums.ExportFormat

export const ExportFormat: typeof $Enums.ExportFormat

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Sessions
 * const sessions = await prisma.session.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shop`: Exposes CRUD operations for the **Shop** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shops
    * const shops = await prisma.shop.findMany()
    * ```
    */
  get shop(): Prisma.ShopDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fiscalConfiguration`: Exposes CRUD operations for the **FiscalConfiguration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FiscalConfigurations
    * const fiscalConfigurations = await prisma.fiscalConfiguration.findMany()
    * ```
    */
  get fiscalConfiguration(): Prisma.FiscalConfigurationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scheduledTask`: Exposes CRUD operations for the **ScheduledTask** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScheduledTasks
    * const scheduledTasks = await prisma.scheduledTask.findMany()
    * ```
    */
  get scheduledTask(): Prisma.ScheduledTaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.generalSettings`: Exposes CRUD operations for the **GeneralSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GeneralSettings
    * const generalSettings = await prisma.generalSettings.findMany()
    * ```
    */
  get generalSettings(): Prisma.GeneralSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ftpConfig`: Exposes CRUD operations for the **FtpConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FtpConfigs
    * const ftpConfigs = await prisma.ftpConfig.findMany()
    * ```
    */
  get ftpConfig(): Prisma.FtpConfigDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Session: 'Session',
    Shop: 'Shop',
    FiscalConfiguration: 'FiscalConfiguration',
    Report: 'Report',
    ScheduledTask: 'ScheduledTask',
    Task: 'Task',
    GeneralSettings: 'GeneralSettings',
    FtpConfig: 'FtpConfig'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "session" | "shop" | "fiscalConfiguration" | "report" | "scheduledTask" | "task" | "generalSettings" | "ftpConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Shop: {
        payload: Prisma.$ShopPayload<ExtArgs>
        fields: Prisma.ShopFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShopFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShopFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          findFirst: {
            args: Prisma.ShopFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShopFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          findMany: {
            args: Prisma.ShopFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>[]
          }
          create: {
            args: Prisma.ShopCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          createMany: {
            args: Prisma.ShopCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShopCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>[]
          }
          delete: {
            args: Prisma.ShopDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          update: {
            args: Prisma.ShopUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          deleteMany: {
            args: Prisma.ShopDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShopUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShopUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>[]
          }
          upsert: {
            args: Prisma.ShopUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          aggregate: {
            args: Prisma.ShopAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShop>
          }
          groupBy: {
            args: Prisma.ShopGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShopGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShopCountArgs<ExtArgs>
            result: $Utils.Optional<ShopCountAggregateOutputType> | number
          }
        }
      }
      FiscalConfiguration: {
        payload: Prisma.$FiscalConfigurationPayload<ExtArgs>
        fields: Prisma.FiscalConfigurationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FiscalConfigurationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalConfigurationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FiscalConfigurationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalConfigurationPayload>
          }
          findFirst: {
            args: Prisma.FiscalConfigurationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalConfigurationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FiscalConfigurationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalConfigurationPayload>
          }
          findMany: {
            args: Prisma.FiscalConfigurationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalConfigurationPayload>[]
          }
          create: {
            args: Prisma.FiscalConfigurationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalConfigurationPayload>
          }
          createMany: {
            args: Prisma.FiscalConfigurationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FiscalConfigurationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalConfigurationPayload>[]
          }
          delete: {
            args: Prisma.FiscalConfigurationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalConfigurationPayload>
          }
          update: {
            args: Prisma.FiscalConfigurationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalConfigurationPayload>
          }
          deleteMany: {
            args: Prisma.FiscalConfigurationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FiscalConfigurationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FiscalConfigurationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalConfigurationPayload>[]
          }
          upsert: {
            args: Prisma.FiscalConfigurationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FiscalConfigurationPayload>
          }
          aggregate: {
            args: Prisma.FiscalConfigurationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFiscalConfiguration>
          }
          groupBy: {
            args: Prisma.FiscalConfigurationGroupByArgs<ExtArgs>
            result: $Utils.Optional<FiscalConfigurationGroupByOutputType>[]
          }
          count: {
            args: Prisma.FiscalConfigurationCountArgs<ExtArgs>
            result: $Utils.Optional<FiscalConfigurationCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      ScheduledTask: {
        payload: Prisma.$ScheduledTaskPayload<ExtArgs>
        fields: Prisma.ScheduledTaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScheduledTaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledTaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScheduledTaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledTaskPayload>
          }
          findFirst: {
            args: Prisma.ScheduledTaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledTaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScheduledTaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledTaskPayload>
          }
          findMany: {
            args: Prisma.ScheduledTaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledTaskPayload>[]
          }
          create: {
            args: Prisma.ScheduledTaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledTaskPayload>
          }
          createMany: {
            args: Prisma.ScheduledTaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScheduledTaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledTaskPayload>[]
          }
          delete: {
            args: Prisma.ScheduledTaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledTaskPayload>
          }
          update: {
            args: Prisma.ScheduledTaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledTaskPayload>
          }
          deleteMany: {
            args: Prisma.ScheduledTaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScheduledTaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScheduledTaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledTaskPayload>[]
          }
          upsert: {
            args: Prisma.ScheduledTaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledTaskPayload>
          }
          aggregate: {
            args: Prisma.ScheduledTaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScheduledTask>
          }
          groupBy: {
            args: Prisma.ScheduledTaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScheduledTaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScheduledTaskCountArgs<ExtArgs>
            result: $Utils.Optional<ScheduledTaskCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      GeneralSettings: {
        payload: Prisma.$GeneralSettingsPayload<ExtArgs>
        fields: Prisma.GeneralSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GeneralSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GeneralSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralSettingsPayload>
          }
          findFirst: {
            args: Prisma.GeneralSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GeneralSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralSettingsPayload>
          }
          findMany: {
            args: Prisma.GeneralSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralSettingsPayload>[]
          }
          create: {
            args: Prisma.GeneralSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralSettingsPayload>
          }
          createMany: {
            args: Prisma.GeneralSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GeneralSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralSettingsPayload>[]
          }
          delete: {
            args: Prisma.GeneralSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralSettingsPayload>
          }
          update: {
            args: Prisma.GeneralSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralSettingsPayload>
          }
          deleteMany: {
            args: Prisma.GeneralSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GeneralSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GeneralSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralSettingsPayload>[]
          }
          upsert: {
            args: Prisma.GeneralSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeneralSettingsPayload>
          }
          aggregate: {
            args: Prisma.GeneralSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGeneralSettings>
          }
          groupBy: {
            args: Prisma.GeneralSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<GeneralSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.GeneralSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<GeneralSettingsCountAggregateOutputType> | number
          }
        }
      }
      FtpConfig: {
        payload: Prisma.$FtpConfigPayload<ExtArgs>
        fields: Prisma.FtpConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FtpConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FtpConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FtpConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FtpConfigPayload>
          }
          findFirst: {
            args: Prisma.FtpConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FtpConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FtpConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FtpConfigPayload>
          }
          findMany: {
            args: Prisma.FtpConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FtpConfigPayload>[]
          }
          create: {
            args: Prisma.FtpConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FtpConfigPayload>
          }
          createMany: {
            args: Prisma.FtpConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FtpConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FtpConfigPayload>[]
          }
          delete: {
            args: Prisma.FtpConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FtpConfigPayload>
          }
          update: {
            args: Prisma.FtpConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FtpConfigPayload>
          }
          deleteMany: {
            args: Prisma.FtpConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FtpConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FtpConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FtpConfigPayload>[]
          }
          upsert: {
            args: Prisma.FtpConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FtpConfigPayload>
          }
          aggregate: {
            args: Prisma.FtpConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFtpConfig>
          }
          groupBy: {
            args: Prisma.FtpConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<FtpConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.FtpConfigCountArgs<ExtArgs>
            result: $Utils.Optional<FtpConfigCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    session?: SessionOmit
    shop?: ShopOmit
    fiscalConfiguration?: FiscalConfigurationOmit
    report?: ReportOmit
    scheduledTask?: ScheduledTaskOmit
    task?: TaskOmit
    generalSettings?: GeneralSettingsOmit
    ftpConfig?: FtpConfigOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ShopCountOutputType
   */

  export type ShopCountOutputType = {
    reports: number
    scheduledTasks: number
    tasks: number
  }

  export type ShopCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reports?: boolean | ShopCountOutputTypeCountReportsArgs
    scheduledTasks?: boolean | ShopCountOutputTypeCountScheduledTasksArgs
    tasks?: boolean | ShopCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * ShopCountOutputType without action
   */
  export type ShopCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopCountOutputType
     */
    select?: ShopCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ShopCountOutputType without action
   */
  export type ShopCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }

  /**
   * ShopCountOutputType without action
   */
  export type ShopCountOutputTypeCountScheduledTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduledTaskWhereInput
  }

  /**
   * ShopCountOutputType without action
   */
  export type ShopCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type ReportCountOutputType
   */

  export type ReportCountOutputType = {
    scheduledTasks: number
    tasks: number
  }

  export type ReportCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scheduledTasks?: boolean | ReportCountOutputTypeCountScheduledTasksArgs
    tasks?: boolean | ReportCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportCountOutputType
     */
    select?: ReportCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountScheduledTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduledTaskWhereInput
  }

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type ScheduledTaskCountOutputType
   */

  export type ScheduledTaskCountOutputType = {
    tasks: number
  }

  export type ScheduledTaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | ScheduledTaskCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * ScheduledTaskCountOutputType without action
   */
  export type ScheduledTaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledTaskCountOutputType
     */
    select?: ScheduledTaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ScheduledTaskCountOutputType without action
   */
  export type ScheduledTaskCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    userId: number | null
  }

  export type SessionSumAggregateOutputType = {
    userId: bigint | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    shop: string | null
    state: string | null
    isOnline: boolean | null
    scope: string | null
    expires: Date | null
    accessToken: string | null
    userId: bigint | null
    firstName: string | null
    lastName: string | null
    email: string | null
    accountOwner: boolean | null
    locale: string | null
    collaborator: boolean | null
    emailVerified: boolean | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    shop: string | null
    state: string | null
    isOnline: boolean | null
    scope: string | null
    expires: Date | null
    accessToken: string | null
    userId: bigint | null
    firstName: string | null
    lastName: string | null
    email: string | null
    accountOwner: boolean | null
    locale: string | null
    collaborator: boolean | null
    emailVerified: boolean | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    shop: number
    state: number
    isOnline: number
    scope: number
    expires: number
    accessToken: number
    userId: number
    firstName: number
    lastName: number
    email: number
    accountOwner: number
    locale: number
    collaborator: number
    emailVerified: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    userId?: true
  }

  export type SessionSumAggregateInputType = {
    userId?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    shop?: true
    state?: true
    isOnline?: true
    scope?: true
    expires?: true
    accessToken?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    accountOwner?: true
    locale?: true
    collaborator?: true
    emailVerified?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    shop?: true
    state?: true
    isOnline?: true
    scope?: true
    expires?: true
    accessToken?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    accountOwner?: true
    locale?: true
    collaborator?: true
    emailVerified?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    shop?: true
    state?: true
    isOnline?: true
    scope?: true
    expires?: true
    accessToken?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    accountOwner?: true
    locale?: true
    collaborator?: true
    emailVerified?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    shop: string
    state: string
    isOnline: boolean
    scope: string | null
    expires: Date | null
    accessToken: string
    userId: bigint | null
    firstName: string | null
    lastName: string | null
    email: string | null
    accountOwner: boolean
    locale: string | null
    collaborator: boolean | null
    emailVerified: boolean | null
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    state?: boolean
    isOnline?: boolean
    scope?: boolean
    expires?: boolean
    accessToken?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    accountOwner?: boolean
    locale?: boolean
    collaborator?: boolean
    emailVerified?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    state?: boolean
    isOnline?: boolean
    scope?: boolean
    expires?: boolean
    accessToken?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    accountOwner?: boolean
    locale?: boolean
    collaborator?: boolean
    emailVerified?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    state?: boolean
    isOnline?: boolean
    scope?: boolean
    expires?: boolean
    accessToken?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    accountOwner?: boolean
    locale?: boolean
    collaborator?: boolean
    emailVerified?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    shop?: boolean
    state?: boolean
    isOnline?: boolean
    scope?: boolean
    expires?: boolean
    accessToken?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    accountOwner?: boolean
    locale?: boolean
    collaborator?: boolean
    emailVerified?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shop" | "state" | "isOnline" | "scope" | "expires" | "accessToken" | "userId" | "firstName" | "lastName" | "email" | "accountOwner" | "locale" | "collaborator" | "emailVerified", ExtArgs["result"]["session"]>

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shop: string
      state: string
      isOnline: boolean
      scope: string | null
      expires: Date | null
      accessToken: string
      userId: bigint | null
      firstName: string | null
      lastName: string | null
      email: string | null
      accountOwner: boolean
      locale: string | null
      collaborator: boolean | null
      emailVerified: boolean | null
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly shop: FieldRef<"Session", 'String'>
    readonly state: FieldRef<"Session", 'String'>
    readonly isOnline: FieldRef<"Session", 'Boolean'>
    readonly scope: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
    readonly accessToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'BigInt'>
    readonly firstName: FieldRef<"Session", 'String'>
    readonly lastName: FieldRef<"Session", 'String'>
    readonly email: FieldRef<"Session", 'String'>
    readonly accountOwner: FieldRef<"Session", 'Boolean'>
    readonly locale: FieldRef<"Session", 'String'>
    readonly collaborator: FieldRef<"Session", 'Boolean'>
    readonly emailVerified: FieldRef<"Session", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
  }


  /**
   * Model Shop
   */

  export type AggregateShop = {
    _count: ShopCountAggregateOutputType | null
    _min: ShopMinAggregateOutputType | null
    _max: ShopMaxAggregateOutputType | null
  }

  export type ShopMinAggregateOutputType = {
    id: string | null
    shopifyDomain: string | null
    accessToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopMaxAggregateOutputType = {
    id: string | null
    shopifyDomain: string | null
    accessToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopCountAggregateOutputType = {
    id: number
    shopifyDomain: number
    accessToken: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ShopMinAggregateInputType = {
    id?: true
    shopifyDomain?: true
    accessToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopMaxAggregateInputType = {
    id?: true
    shopifyDomain?: true
    accessToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopCountAggregateInputType = {
    id?: true
    shopifyDomain?: true
    accessToken?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShopAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shop to aggregate.
     */
    where?: ShopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shops to fetch.
     */
    orderBy?: ShopOrderByWithRelationInput | ShopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Shops
    **/
    _count?: true | ShopCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShopMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShopMaxAggregateInputType
  }

  export type GetShopAggregateType<T extends ShopAggregateArgs> = {
        [P in keyof T & keyof AggregateShop]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShop[P]>
      : GetScalarType<T[P], AggregateShop[P]>
  }




  export type ShopGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopWhereInput
    orderBy?: ShopOrderByWithAggregationInput | ShopOrderByWithAggregationInput[]
    by: ShopScalarFieldEnum[] | ShopScalarFieldEnum
    having?: ShopScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShopCountAggregateInputType | true
    _min?: ShopMinAggregateInputType
    _max?: ShopMaxAggregateInputType
  }

  export type ShopGroupByOutputType = {
    id: string
    shopifyDomain: string
    accessToken: string
    createdAt: Date
    updatedAt: Date
    _count: ShopCountAggregateOutputType | null
    _min: ShopMinAggregateOutputType | null
    _max: ShopMaxAggregateOutputType | null
  }

  type GetShopGroupByPayload<T extends ShopGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShopGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShopGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShopGroupByOutputType[P]>
            : GetScalarType<T[P], ShopGroupByOutputType[P]>
        }
      >
    >


  export type ShopSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopifyDomain?: boolean
    accessToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fiscalConfig?: boolean | Shop$fiscalConfigArgs<ExtArgs>
    reports?: boolean | Shop$reportsArgs<ExtArgs>
    generalSettings?: boolean | Shop$generalSettingsArgs<ExtArgs>
    ftpConfig?: boolean | Shop$ftpConfigArgs<ExtArgs>
    scheduledTasks?: boolean | Shop$scheduledTasksArgs<ExtArgs>
    tasks?: boolean | Shop$tasksArgs<ExtArgs>
    _count?: boolean | ShopCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shop"]>

  export type ShopSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopifyDomain?: boolean
    accessToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shop"]>

  export type ShopSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopifyDomain?: boolean
    accessToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shop"]>

  export type ShopSelectScalar = {
    id?: boolean
    shopifyDomain?: boolean
    accessToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ShopOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopifyDomain" | "accessToken" | "createdAt" | "updatedAt", ExtArgs["result"]["shop"]>
  export type ShopInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fiscalConfig?: boolean | Shop$fiscalConfigArgs<ExtArgs>
    reports?: boolean | Shop$reportsArgs<ExtArgs>
    generalSettings?: boolean | Shop$generalSettingsArgs<ExtArgs>
    ftpConfig?: boolean | Shop$ftpConfigArgs<ExtArgs>
    scheduledTasks?: boolean | Shop$scheduledTasksArgs<ExtArgs>
    tasks?: boolean | Shop$tasksArgs<ExtArgs>
    _count?: boolean | ShopCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ShopIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ShopIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ShopPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Shop"
    objects: {
      fiscalConfig: Prisma.$FiscalConfigurationPayload<ExtArgs> | null
      reports: Prisma.$ReportPayload<ExtArgs>[]
      generalSettings: Prisma.$GeneralSettingsPayload<ExtArgs> | null
      ftpConfig: Prisma.$FtpConfigPayload<ExtArgs> | null
      scheduledTasks: Prisma.$ScheduledTaskPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopifyDomain: string
      accessToken: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shop"]>
    composites: {}
  }

  type ShopGetPayload<S extends boolean | null | undefined | ShopDefaultArgs> = $Result.GetResult<Prisma.$ShopPayload, S>

  type ShopCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShopFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShopCountAggregateInputType | true
    }

  export interface ShopDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Shop'], meta: { name: 'Shop' } }
    /**
     * Find zero or one Shop that matches the filter.
     * @param {ShopFindUniqueArgs} args - Arguments to find a Shop
     * @example
     * // Get one Shop
     * const shop = await prisma.shop.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShopFindUniqueArgs>(args: SelectSubset<T, ShopFindUniqueArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Shop that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShopFindUniqueOrThrowArgs} args - Arguments to find a Shop
     * @example
     * // Get one Shop
     * const shop = await prisma.shop.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShopFindUniqueOrThrowArgs>(args: SelectSubset<T, ShopFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shop that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopFindFirstArgs} args - Arguments to find a Shop
     * @example
     * // Get one Shop
     * const shop = await prisma.shop.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShopFindFirstArgs>(args?: SelectSubset<T, ShopFindFirstArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shop that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopFindFirstOrThrowArgs} args - Arguments to find a Shop
     * @example
     * // Get one Shop
     * const shop = await prisma.shop.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShopFindFirstOrThrowArgs>(args?: SelectSubset<T, ShopFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Shops that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shops
     * const shops = await prisma.shop.findMany()
     * 
     * // Get first 10 Shops
     * const shops = await prisma.shop.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shopWithIdOnly = await prisma.shop.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShopFindManyArgs>(args?: SelectSubset<T, ShopFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Shop.
     * @param {ShopCreateArgs} args - Arguments to create a Shop.
     * @example
     * // Create one Shop
     * const Shop = await prisma.shop.create({
     *   data: {
     *     // ... data to create a Shop
     *   }
     * })
     * 
     */
    create<T extends ShopCreateArgs>(args: SelectSubset<T, ShopCreateArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Shops.
     * @param {ShopCreateManyArgs} args - Arguments to create many Shops.
     * @example
     * // Create many Shops
     * const shop = await prisma.shop.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShopCreateManyArgs>(args?: SelectSubset<T, ShopCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Shops and returns the data saved in the database.
     * @param {ShopCreateManyAndReturnArgs} args - Arguments to create many Shops.
     * @example
     * // Create many Shops
     * const shop = await prisma.shop.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Shops and only return the `id`
     * const shopWithIdOnly = await prisma.shop.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShopCreateManyAndReturnArgs>(args?: SelectSubset<T, ShopCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Shop.
     * @param {ShopDeleteArgs} args - Arguments to delete one Shop.
     * @example
     * // Delete one Shop
     * const Shop = await prisma.shop.delete({
     *   where: {
     *     // ... filter to delete one Shop
     *   }
     * })
     * 
     */
    delete<T extends ShopDeleteArgs>(args: SelectSubset<T, ShopDeleteArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Shop.
     * @param {ShopUpdateArgs} args - Arguments to update one Shop.
     * @example
     * // Update one Shop
     * const shop = await prisma.shop.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShopUpdateArgs>(args: SelectSubset<T, ShopUpdateArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Shops.
     * @param {ShopDeleteManyArgs} args - Arguments to filter Shops to delete.
     * @example
     * // Delete a few Shops
     * const { count } = await prisma.shop.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShopDeleteManyArgs>(args?: SelectSubset<T, ShopDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shops
     * const shop = await prisma.shop.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShopUpdateManyArgs>(args: SelectSubset<T, ShopUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shops and returns the data updated in the database.
     * @param {ShopUpdateManyAndReturnArgs} args - Arguments to update many Shops.
     * @example
     * // Update many Shops
     * const shop = await prisma.shop.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Shops and only return the `id`
     * const shopWithIdOnly = await prisma.shop.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ShopUpdateManyAndReturnArgs>(args: SelectSubset<T, ShopUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Shop.
     * @param {ShopUpsertArgs} args - Arguments to update or create a Shop.
     * @example
     * // Update or create a Shop
     * const shop = await prisma.shop.upsert({
     *   create: {
     *     // ... data to create a Shop
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shop we want to update
     *   }
     * })
     */
    upsert<T extends ShopUpsertArgs>(args: SelectSubset<T, ShopUpsertArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Shops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopCountArgs} args - Arguments to filter Shops to count.
     * @example
     * // Count the number of Shops
     * const count = await prisma.shop.count({
     *   where: {
     *     // ... the filter for the Shops we want to count
     *   }
     * })
    **/
    count<T extends ShopCountArgs>(
      args?: Subset<T, ShopCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShopCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShopAggregateArgs>(args: Subset<T, ShopAggregateArgs>): Prisma.PrismaPromise<GetShopAggregateType<T>>

    /**
     * Group by Shop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShopGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShopGroupByArgs['orderBy'] }
        : { orderBy?: ShopGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShopGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShopGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Shop model
   */
  readonly fields: ShopFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Shop.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShopClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fiscalConfig<T extends Shop$fiscalConfigArgs<ExtArgs> = {}>(args?: Subset<T, Shop$fiscalConfigArgs<ExtArgs>>): Prisma__FiscalConfigurationClient<$Result.GetResult<Prisma.$FiscalConfigurationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    reports<T extends Shop$reportsArgs<ExtArgs> = {}>(args?: Subset<T, Shop$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    generalSettings<T extends Shop$generalSettingsArgs<ExtArgs> = {}>(args?: Subset<T, Shop$generalSettingsArgs<ExtArgs>>): Prisma__GeneralSettingsClient<$Result.GetResult<Prisma.$GeneralSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ftpConfig<T extends Shop$ftpConfigArgs<ExtArgs> = {}>(args?: Subset<T, Shop$ftpConfigArgs<ExtArgs>>): Prisma__FtpConfigClient<$Result.GetResult<Prisma.$FtpConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    scheduledTasks<T extends Shop$scheduledTasksArgs<ExtArgs> = {}>(args?: Subset<T, Shop$scheduledTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduledTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends Shop$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Shop$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Shop model
   */
  interface ShopFieldRefs {
    readonly id: FieldRef<"Shop", 'String'>
    readonly shopifyDomain: FieldRef<"Shop", 'String'>
    readonly accessToken: FieldRef<"Shop", 'String'>
    readonly createdAt: FieldRef<"Shop", 'DateTime'>
    readonly updatedAt: FieldRef<"Shop", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Shop findUnique
   */
  export type ShopFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter, which Shop to fetch.
     */
    where: ShopWhereUniqueInput
  }

  /**
   * Shop findUniqueOrThrow
   */
  export type ShopFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter, which Shop to fetch.
     */
    where: ShopWhereUniqueInput
  }

  /**
   * Shop findFirst
   */
  export type ShopFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter, which Shop to fetch.
     */
    where?: ShopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shops to fetch.
     */
    orderBy?: ShopOrderByWithRelationInput | ShopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shops.
     */
    cursor?: ShopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shops.
     */
    distinct?: ShopScalarFieldEnum | ShopScalarFieldEnum[]
  }

  /**
   * Shop findFirstOrThrow
   */
  export type ShopFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter, which Shop to fetch.
     */
    where?: ShopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shops to fetch.
     */
    orderBy?: ShopOrderByWithRelationInput | ShopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shops.
     */
    cursor?: ShopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shops.
     */
    distinct?: ShopScalarFieldEnum | ShopScalarFieldEnum[]
  }

  /**
   * Shop findMany
   */
  export type ShopFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter, which Shops to fetch.
     */
    where?: ShopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shops to fetch.
     */
    orderBy?: ShopOrderByWithRelationInput | ShopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Shops.
     */
    cursor?: ShopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shops.
     */
    skip?: number
    distinct?: ShopScalarFieldEnum | ShopScalarFieldEnum[]
  }

  /**
   * Shop create
   */
  export type ShopCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * The data needed to create a Shop.
     */
    data: XOR<ShopCreateInput, ShopUncheckedCreateInput>
  }

  /**
   * Shop createMany
   */
  export type ShopCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Shops.
     */
    data: ShopCreateManyInput | ShopCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shop createManyAndReturn
   */
  export type ShopCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * The data used to create many Shops.
     */
    data: ShopCreateManyInput | ShopCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shop update
   */
  export type ShopUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * The data needed to update a Shop.
     */
    data: XOR<ShopUpdateInput, ShopUncheckedUpdateInput>
    /**
     * Choose, which Shop to update.
     */
    where: ShopWhereUniqueInput
  }

  /**
   * Shop updateMany
   */
  export type ShopUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Shops.
     */
    data: XOR<ShopUpdateManyMutationInput, ShopUncheckedUpdateManyInput>
    /**
     * Filter which Shops to update
     */
    where?: ShopWhereInput
    /**
     * Limit how many Shops to update.
     */
    limit?: number
  }

  /**
   * Shop updateManyAndReturn
   */
  export type ShopUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * The data used to update Shops.
     */
    data: XOR<ShopUpdateManyMutationInput, ShopUncheckedUpdateManyInput>
    /**
     * Filter which Shops to update
     */
    where?: ShopWhereInput
    /**
     * Limit how many Shops to update.
     */
    limit?: number
  }

  /**
   * Shop upsert
   */
  export type ShopUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * The filter to search for the Shop to update in case it exists.
     */
    where: ShopWhereUniqueInput
    /**
     * In case the Shop found by the `where` argument doesn't exist, create a new Shop with this data.
     */
    create: XOR<ShopCreateInput, ShopUncheckedCreateInput>
    /**
     * In case the Shop was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShopUpdateInput, ShopUncheckedUpdateInput>
  }

  /**
   * Shop delete
   */
  export type ShopDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter which Shop to delete.
     */
    where: ShopWhereUniqueInput
  }

  /**
   * Shop deleteMany
   */
  export type ShopDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shops to delete
     */
    where?: ShopWhereInput
    /**
     * Limit how many Shops to delete.
     */
    limit?: number
  }

  /**
   * Shop.fiscalConfig
   */
  export type Shop$fiscalConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalConfiguration
     */
    select?: FiscalConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FiscalConfiguration
     */
    omit?: FiscalConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalConfigurationInclude<ExtArgs> | null
    where?: FiscalConfigurationWhereInput
  }

  /**
   * Shop.reports
   */
  export type Shop$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Shop.generalSettings
   */
  export type Shop$generalSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralSettings
     */
    select?: GeneralSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralSettings
     */
    omit?: GeneralSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneralSettingsInclude<ExtArgs> | null
    where?: GeneralSettingsWhereInput
  }

  /**
   * Shop.ftpConfig
   */
  export type Shop$ftpConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FtpConfig
     */
    select?: FtpConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FtpConfig
     */
    omit?: FtpConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FtpConfigInclude<ExtArgs> | null
    where?: FtpConfigWhereInput
  }

  /**
   * Shop.scheduledTasks
   */
  export type Shop$scheduledTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledTask
     */
    select?: ScheduledTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledTask
     */
    omit?: ScheduledTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledTaskInclude<ExtArgs> | null
    where?: ScheduledTaskWhereInput
    orderBy?: ScheduledTaskOrderByWithRelationInput | ScheduledTaskOrderByWithRelationInput[]
    cursor?: ScheduledTaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduledTaskScalarFieldEnum | ScheduledTaskScalarFieldEnum[]
  }

  /**
   * Shop.tasks
   */
  export type Shop$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Shop without action
   */
  export type ShopDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
  }


  /**
   * Model FiscalConfiguration
   */

  export type AggregateFiscalConfiguration = {
    _count: FiscalConfigurationCountAggregateOutputType | null
    _avg: FiscalConfigurationAvgAggregateOutputType | null
    _sum: FiscalConfigurationSumAggregateOutputType | null
    _min: FiscalConfigurationMinAggregateOutputType | null
    _max: FiscalConfigurationMaxAggregateOutputType | null
  }

  export type FiscalConfigurationAvgAggregateOutputType = {
    vatRate: number | null
  }

  export type FiscalConfigurationSumAggregateOutputType = {
    vatRate: number | null
  }

  export type FiscalConfigurationMinAggregateOutputType = {
    id: string | null
    shopId: string | null
    code: string | null
    name: string | null
    description: string | null
    currency: string | null
    fileFormat: string | null
    encoding: string | null
    separator: string | null
    notes: string | null
    companyName: string | null
    country: string | null
    vatRate: number | null
    defaultFormat: $Enums.ExportFormat | null
    salesAccount: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FiscalConfigurationMaxAggregateOutputType = {
    id: string | null
    shopId: string | null
    code: string | null
    name: string | null
    description: string | null
    currency: string | null
    fileFormat: string | null
    encoding: string | null
    separator: string | null
    notes: string | null
    companyName: string | null
    country: string | null
    vatRate: number | null
    defaultFormat: $Enums.ExportFormat | null
    salesAccount: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FiscalConfigurationCountAggregateOutputType = {
    id: number
    shopId: number
    code: number
    name: number
    description: number
    countries: number
    currency: number
    fileFormat: number
    encoding: number
    separator: number
    requiredColumns: number
    taxRates: number
    compatibleSoftware: number
    exportFormats: number
    notes: number
    companyName: number
    country: number
    vatRate: number
    defaultFormat: number
    salesAccount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FiscalConfigurationAvgAggregateInputType = {
    vatRate?: true
  }

  export type FiscalConfigurationSumAggregateInputType = {
    vatRate?: true
  }

  export type FiscalConfigurationMinAggregateInputType = {
    id?: true
    shopId?: true
    code?: true
    name?: true
    description?: true
    currency?: true
    fileFormat?: true
    encoding?: true
    separator?: true
    notes?: true
    companyName?: true
    country?: true
    vatRate?: true
    defaultFormat?: true
    salesAccount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FiscalConfigurationMaxAggregateInputType = {
    id?: true
    shopId?: true
    code?: true
    name?: true
    description?: true
    currency?: true
    fileFormat?: true
    encoding?: true
    separator?: true
    notes?: true
    companyName?: true
    country?: true
    vatRate?: true
    defaultFormat?: true
    salesAccount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FiscalConfigurationCountAggregateInputType = {
    id?: true
    shopId?: true
    code?: true
    name?: true
    description?: true
    countries?: true
    currency?: true
    fileFormat?: true
    encoding?: true
    separator?: true
    requiredColumns?: true
    taxRates?: true
    compatibleSoftware?: true
    exportFormats?: true
    notes?: true
    companyName?: true
    country?: true
    vatRate?: true
    defaultFormat?: true
    salesAccount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FiscalConfigurationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FiscalConfiguration to aggregate.
     */
    where?: FiscalConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FiscalConfigurations to fetch.
     */
    orderBy?: FiscalConfigurationOrderByWithRelationInput | FiscalConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FiscalConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FiscalConfigurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FiscalConfigurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FiscalConfigurations
    **/
    _count?: true | FiscalConfigurationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FiscalConfigurationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FiscalConfigurationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FiscalConfigurationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FiscalConfigurationMaxAggregateInputType
  }

  export type GetFiscalConfigurationAggregateType<T extends FiscalConfigurationAggregateArgs> = {
        [P in keyof T & keyof AggregateFiscalConfiguration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFiscalConfiguration[P]>
      : GetScalarType<T[P], AggregateFiscalConfiguration[P]>
  }




  export type FiscalConfigurationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FiscalConfigurationWhereInput
    orderBy?: FiscalConfigurationOrderByWithAggregationInput | FiscalConfigurationOrderByWithAggregationInput[]
    by: FiscalConfigurationScalarFieldEnum[] | FiscalConfigurationScalarFieldEnum
    having?: FiscalConfigurationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FiscalConfigurationCountAggregateInputType | true
    _avg?: FiscalConfigurationAvgAggregateInputType
    _sum?: FiscalConfigurationSumAggregateInputType
    _min?: FiscalConfigurationMinAggregateInputType
    _max?: FiscalConfigurationMaxAggregateInputType
  }

  export type FiscalConfigurationGroupByOutputType = {
    id: string
    shopId: string
    code: string
    name: string
    description: string
    countries: string[]
    currency: string
    fileFormat: string
    encoding: string
    separator: string
    requiredColumns: string[]
    taxRates: JsonValue
    compatibleSoftware: string[]
    exportFormats: string[]
    notes: string
    companyName: string | null
    country: string | null
    vatRate: number | null
    defaultFormat: $Enums.ExportFormat | null
    salesAccount: string
    createdAt: Date
    updatedAt: Date
    _count: FiscalConfigurationCountAggregateOutputType | null
    _avg: FiscalConfigurationAvgAggregateOutputType | null
    _sum: FiscalConfigurationSumAggregateOutputType | null
    _min: FiscalConfigurationMinAggregateOutputType | null
    _max: FiscalConfigurationMaxAggregateOutputType | null
  }

  type GetFiscalConfigurationGroupByPayload<T extends FiscalConfigurationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FiscalConfigurationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FiscalConfigurationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FiscalConfigurationGroupByOutputType[P]>
            : GetScalarType<T[P], FiscalConfigurationGroupByOutputType[P]>
        }
      >
    >


  export type FiscalConfigurationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    countries?: boolean
    currency?: boolean
    fileFormat?: boolean
    encoding?: boolean
    separator?: boolean
    requiredColumns?: boolean
    taxRates?: boolean
    compatibleSoftware?: boolean
    exportFormats?: boolean
    notes?: boolean
    companyName?: boolean
    country?: boolean
    vatRate?: boolean
    defaultFormat?: boolean
    salesAccount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fiscalConfiguration"]>

  export type FiscalConfigurationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    countries?: boolean
    currency?: boolean
    fileFormat?: boolean
    encoding?: boolean
    separator?: boolean
    requiredColumns?: boolean
    taxRates?: boolean
    compatibleSoftware?: boolean
    exportFormats?: boolean
    notes?: boolean
    companyName?: boolean
    country?: boolean
    vatRate?: boolean
    defaultFormat?: boolean
    salesAccount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fiscalConfiguration"]>

  export type FiscalConfigurationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    countries?: boolean
    currency?: boolean
    fileFormat?: boolean
    encoding?: boolean
    separator?: boolean
    requiredColumns?: boolean
    taxRates?: boolean
    compatibleSoftware?: boolean
    exportFormats?: boolean
    notes?: boolean
    companyName?: boolean
    country?: boolean
    vatRate?: boolean
    defaultFormat?: boolean
    salesAccount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fiscalConfiguration"]>

  export type FiscalConfigurationSelectScalar = {
    id?: boolean
    shopId?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    countries?: boolean
    currency?: boolean
    fileFormat?: boolean
    encoding?: boolean
    separator?: boolean
    requiredColumns?: boolean
    taxRates?: boolean
    compatibleSoftware?: boolean
    exportFormats?: boolean
    notes?: boolean
    companyName?: boolean
    country?: boolean
    vatRate?: boolean
    defaultFormat?: boolean
    salesAccount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FiscalConfigurationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopId" | "code" | "name" | "description" | "countries" | "currency" | "fileFormat" | "encoding" | "separator" | "requiredColumns" | "taxRates" | "compatibleSoftware" | "exportFormats" | "notes" | "companyName" | "country" | "vatRate" | "defaultFormat" | "salesAccount" | "createdAt" | "updatedAt", ExtArgs["result"]["fiscalConfiguration"]>
  export type FiscalConfigurationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }
  export type FiscalConfigurationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }
  export type FiscalConfigurationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }

  export type $FiscalConfigurationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FiscalConfiguration"
    objects: {
      shop: Prisma.$ShopPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopId: string
      code: string
      name: string
      description: string
      countries: string[]
      currency: string
      fileFormat: string
      encoding: string
      separator: string
      requiredColumns: string[]
      taxRates: Prisma.JsonValue
      compatibleSoftware: string[]
      exportFormats: string[]
      notes: string
      companyName: string | null
      country: string | null
      vatRate: number | null
      defaultFormat: $Enums.ExportFormat | null
      salesAccount: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["fiscalConfiguration"]>
    composites: {}
  }

  type FiscalConfigurationGetPayload<S extends boolean | null | undefined | FiscalConfigurationDefaultArgs> = $Result.GetResult<Prisma.$FiscalConfigurationPayload, S>

  type FiscalConfigurationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FiscalConfigurationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FiscalConfigurationCountAggregateInputType | true
    }

  export interface FiscalConfigurationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FiscalConfiguration'], meta: { name: 'FiscalConfiguration' } }
    /**
     * Find zero or one FiscalConfiguration that matches the filter.
     * @param {FiscalConfigurationFindUniqueArgs} args - Arguments to find a FiscalConfiguration
     * @example
     * // Get one FiscalConfiguration
     * const fiscalConfiguration = await prisma.fiscalConfiguration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FiscalConfigurationFindUniqueArgs>(args: SelectSubset<T, FiscalConfigurationFindUniqueArgs<ExtArgs>>): Prisma__FiscalConfigurationClient<$Result.GetResult<Prisma.$FiscalConfigurationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FiscalConfiguration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FiscalConfigurationFindUniqueOrThrowArgs} args - Arguments to find a FiscalConfiguration
     * @example
     * // Get one FiscalConfiguration
     * const fiscalConfiguration = await prisma.fiscalConfiguration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FiscalConfigurationFindUniqueOrThrowArgs>(args: SelectSubset<T, FiscalConfigurationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FiscalConfigurationClient<$Result.GetResult<Prisma.$FiscalConfigurationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FiscalConfiguration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FiscalConfigurationFindFirstArgs} args - Arguments to find a FiscalConfiguration
     * @example
     * // Get one FiscalConfiguration
     * const fiscalConfiguration = await prisma.fiscalConfiguration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FiscalConfigurationFindFirstArgs>(args?: SelectSubset<T, FiscalConfigurationFindFirstArgs<ExtArgs>>): Prisma__FiscalConfigurationClient<$Result.GetResult<Prisma.$FiscalConfigurationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FiscalConfiguration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FiscalConfigurationFindFirstOrThrowArgs} args - Arguments to find a FiscalConfiguration
     * @example
     * // Get one FiscalConfiguration
     * const fiscalConfiguration = await prisma.fiscalConfiguration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FiscalConfigurationFindFirstOrThrowArgs>(args?: SelectSubset<T, FiscalConfigurationFindFirstOrThrowArgs<ExtArgs>>): Prisma__FiscalConfigurationClient<$Result.GetResult<Prisma.$FiscalConfigurationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FiscalConfigurations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FiscalConfigurationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FiscalConfigurations
     * const fiscalConfigurations = await prisma.fiscalConfiguration.findMany()
     * 
     * // Get first 10 FiscalConfigurations
     * const fiscalConfigurations = await prisma.fiscalConfiguration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fiscalConfigurationWithIdOnly = await prisma.fiscalConfiguration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FiscalConfigurationFindManyArgs>(args?: SelectSubset<T, FiscalConfigurationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FiscalConfigurationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FiscalConfiguration.
     * @param {FiscalConfigurationCreateArgs} args - Arguments to create a FiscalConfiguration.
     * @example
     * // Create one FiscalConfiguration
     * const FiscalConfiguration = await prisma.fiscalConfiguration.create({
     *   data: {
     *     // ... data to create a FiscalConfiguration
     *   }
     * })
     * 
     */
    create<T extends FiscalConfigurationCreateArgs>(args: SelectSubset<T, FiscalConfigurationCreateArgs<ExtArgs>>): Prisma__FiscalConfigurationClient<$Result.GetResult<Prisma.$FiscalConfigurationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FiscalConfigurations.
     * @param {FiscalConfigurationCreateManyArgs} args - Arguments to create many FiscalConfigurations.
     * @example
     * // Create many FiscalConfigurations
     * const fiscalConfiguration = await prisma.fiscalConfiguration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FiscalConfigurationCreateManyArgs>(args?: SelectSubset<T, FiscalConfigurationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FiscalConfigurations and returns the data saved in the database.
     * @param {FiscalConfigurationCreateManyAndReturnArgs} args - Arguments to create many FiscalConfigurations.
     * @example
     * // Create many FiscalConfigurations
     * const fiscalConfiguration = await prisma.fiscalConfiguration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FiscalConfigurations and only return the `id`
     * const fiscalConfigurationWithIdOnly = await prisma.fiscalConfiguration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FiscalConfigurationCreateManyAndReturnArgs>(args?: SelectSubset<T, FiscalConfigurationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FiscalConfigurationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FiscalConfiguration.
     * @param {FiscalConfigurationDeleteArgs} args - Arguments to delete one FiscalConfiguration.
     * @example
     * // Delete one FiscalConfiguration
     * const FiscalConfiguration = await prisma.fiscalConfiguration.delete({
     *   where: {
     *     // ... filter to delete one FiscalConfiguration
     *   }
     * })
     * 
     */
    delete<T extends FiscalConfigurationDeleteArgs>(args: SelectSubset<T, FiscalConfigurationDeleteArgs<ExtArgs>>): Prisma__FiscalConfigurationClient<$Result.GetResult<Prisma.$FiscalConfigurationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FiscalConfiguration.
     * @param {FiscalConfigurationUpdateArgs} args - Arguments to update one FiscalConfiguration.
     * @example
     * // Update one FiscalConfiguration
     * const fiscalConfiguration = await prisma.fiscalConfiguration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FiscalConfigurationUpdateArgs>(args: SelectSubset<T, FiscalConfigurationUpdateArgs<ExtArgs>>): Prisma__FiscalConfigurationClient<$Result.GetResult<Prisma.$FiscalConfigurationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FiscalConfigurations.
     * @param {FiscalConfigurationDeleteManyArgs} args - Arguments to filter FiscalConfigurations to delete.
     * @example
     * // Delete a few FiscalConfigurations
     * const { count } = await prisma.fiscalConfiguration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FiscalConfigurationDeleteManyArgs>(args?: SelectSubset<T, FiscalConfigurationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FiscalConfigurations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FiscalConfigurationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FiscalConfigurations
     * const fiscalConfiguration = await prisma.fiscalConfiguration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FiscalConfigurationUpdateManyArgs>(args: SelectSubset<T, FiscalConfigurationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FiscalConfigurations and returns the data updated in the database.
     * @param {FiscalConfigurationUpdateManyAndReturnArgs} args - Arguments to update many FiscalConfigurations.
     * @example
     * // Update many FiscalConfigurations
     * const fiscalConfiguration = await prisma.fiscalConfiguration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FiscalConfigurations and only return the `id`
     * const fiscalConfigurationWithIdOnly = await prisma.fiscalConfiguration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FiscalConfigurationUpdateManyAndReturnArgs>(args: SelectSubset<T, FiscalConfigurationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FiscalConfigurationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FiscalConfiguration.
     * @param {FiscalConfigurationUpsertArgs} args - Arguments to update or create a FiscalConfiguration.
     * @example
     * // Update or create a FiscalConfiguration
     * const fiscalConfiguration = await prisma.fiscalConfiguration.upsert({
     *   create: {
     *     // ... data to create a FiscalConfiguration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FiscalConfiguration we want to update
     *   }
     * })
     */
    upsert<T extends FiscalConfigurationUpsertArgs>(args: SelectSubset<T, FiscalConfigurationUpsertArgs<ExtArgs>>): Prisma__FiscalConfigurationClient<$Result.GetResult<Prisma.$FiscalConfigurationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FiscalConfigurations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FiscalConfigurationCountArgs} args - Arguments to filter FiscalConfigurations to count.
     * @example
     * // Count the number of FiscalConfigurations
     * const count = await prisma.fiscalConfiguration.count({
     *   where: {
     *     // ... the filter for the FiscalConfigurations we want to count
     *   }
     * })
    **/
    count<T extends FiscalConfigurationCountArgs>(
      args?: Subset<T, FiscalConfigurationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FiscalConfigurationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FiscalConfiguration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FiscalConfigurationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FiscalConfigurationAggregateArgs>(args: Subset<T, FiscalConfigurationAggregateArgs>): Prisma.PrismaPromise<GetFiscalConfigurationAggregateType<T>>

    /**
     * Group by FiscalConfiguration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FiscalConfigurationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FiscalConfigurationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FiscalConfigurationGroupByArgs['orderBy'] }
        : { orderBy?: FiscalConfigurationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FiscalConfigurationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFiscalConfigurationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FiscalConfiguration model
   */
  readonly fields: FiscalConfigurationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FiscalConfiguration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FiscalConfigurationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shop<T extends ShopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopDefaultArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FiscalConfiguration model
   */
  interface FiscalConfigurationFieldRefs {
    readonly id: FieldRef<"FiscalConfiguration", 'String'>
    readonly shopId: FieldRef<"FiscalConfiguration", 'String'>
    readonly code: FieldRef<"FiscalConfiguration", 'String'>
    readonly name: FieldRef<"FiscalConfiguration", 'String'>
    readonly description: FieldRef<"FiscalConfiguration", 'String'>
    readonly countries: FieldRef<"FiscalConfiguration", 'String[]'>
    readonly currency: FieldRef<"FiscalConfiguration", 'String'>
    readonly fileFormat: FieldRef<"FiscalConfiguration", 'String'>
    readonly encoding: FieldRef<"FiscalConfiguration", 'String'>
    readonly separator: FieldRef<"FiscalConfiguration", 'String'>
    readonly requiredColumns: FieldRef<"FiscalConfiguration", 'String[]'>
    readonly taxRates: FieldRef<"FiscalConfiguration", 'Json'>
    readonly compatibleSoftware: FieldRef<"FiscalConfiguration", 'String[]'>
    readonly exportFormats: FieldRef<"FiscalConfiguration", 'String[]'>
    readonly notes: FieldRef<"FiscalConfiguration", 'String'>
    readonly companyName: FieldRef<"FiscalConfiguration", 'String'>
    readonly country: FieldRef<"FiscalConfiguration", 'String'>
    readonly vatRate: FieldRef<"FiscalConfiguration", 'Float'>
    readonly defaultFormat: FieldRef<"FiscalConfiguration", 'ExportFormat'>
    readonly salesAccount: FieldRef<"FiscalConfiguration", 'String'>
    readonly createdAt: FieldRef<"FiscalConfiguration", 'DateTime'>
    readonly updatedAt: FieldRef<"FiscalConfiguration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FiscalConfiguration findUnique
   */
  export type FiscalConfigurationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalConfiguration
     */
    select?: FiscalConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FiscalConfiguration
     */
    omit?: FiscalConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalConfigurationInclude<ExtArgs> | null
    /**
     * Filter, which FiscalConfiguration to fetch.
     */
    where: FiscalConfigurationWhereUniqueInput
  }

  /**
   * FiscalConfiguration findUniqueOrThrow
   */
  export type FiscalConfigurationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalConfiguration
     */
    select?: FiscalConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FiscalConfiguration
     */
    omit?: FiscalConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalConfigurationInclude<ExtArgs> | null
    /**
     * Filter, which FiscalConfiguration to fetch.
     */
    where: FiscalConfigurationWhereUniqueInput
  }

  /**
   * FiscalConfiguration findFirst
   */
  export type FiscalConfigurationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalConfiguration
     */
    select?: FiscalConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FiscalConfiguration
     */
    omit?: FiscalConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalConfigurationInclude<ExtArgs> | null
    /**
     * Filter, which FiscalConfiguration to fetch.
     */
    where?: FiscalConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FiscalConfigurations to fetch.
     */
    orderBy?: FiscalConfigurationOrderByWithRelationInput | FiscalConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FiscalConfigurations.
     */
    cursor?: FiscalConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FiscalConfigurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FiscalConfigurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FiscalConfigurations.
     */
    distinct?: FiscalConfigurationScalarFieldEnum | FiscalConfigurationScalarFieldEnum[]
  }

  /**
   * FiscalConfiguration findFirstOrThrow
   */
  export type FiscalConfigurationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalConfiguration
     */
    select?: FiscalConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FiscalConfiguration
     */
    omit?: FiscalConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalConfigurationInclude<ExtArgs> | null
    /**
     * Filter, which FiscalConfiguration to fetch.
     */
    where?: FiscalConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FiscalConfigurations to fetch.
     */
    orderBy?: FiscalConfigurationOrderByWithRelationInput | FiscalConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FiscalConfigurations.
     */
    cursor?: FiscalConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FiscalConfigurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FiscalConfigurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FiscalConfigurations.
     */
    distinct?: FiscalConfigurationScalarFieldEnum | FiscalConfigurationScalarFieldEnum[]
  }

  /**
   * FiscalConfiguration findMany
   */
  export type FiscalConfigurationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalConfiguration
     */
    select?: FiscalConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FiscalConfiguration
     */
    omit?: FiscalConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalConfigurationInclude<ExtArgs> | null
    /**
     * Filter, which FiscalConfigurations to fetch.
     */
    where?: FiscalConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FiscalConfigurations to fetch.
     */
    orderBy?: FiscalConfigurationOrderByWithRelationInput | FiscalConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FiscalConfigurations.
     */
    cursor?: FiscalConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FiscalConfigurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FiscalConfigurations.
     */
    skip?: number
    distinct?: FiscalConfigurationScalarFieldEnum | FiscalConfigurationScalarFieldEnum[]
  }

  /**
   * FiscalConfiguration create
   */
  export type FiscalConfigurationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalConfiguration
     */
    select?: FiscalConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FiscalConfiguration
     */
    omit?: FiscalConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalConfigurationInclude<ExtArgs> | null
    /**
     * The data needed to create a FiscalConfiguration.
     */
    data: XOR<FiscalConfigurationCreateInput, FiscalConfigurationUncheckedCreateInput>
  }

  /**
   * FiscalConfiguration createMany
   */
  export type FiscalConfigurationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FiscalConfigurations.
     */
    data: FiscalConfigurationCreateManyInput | FiscalConfigurationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FiscalConfiguration createManyAndReturn
   */
  export type FiscalConfigurationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalConfiguration
     */
    select?: FiscalConfigurationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FiscalConfiguration
     */
    omit?: FiscalConfigurationOmit<ExtArgs> | null
    /**
     * The data used to create many FiscalConfigurations.
     */
    data: FiscalConfigurationCreateManyInput | FiscalConfigurationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalConfigurationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FiscalConfiguration update
   */
  export type FiscalConfigurationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalConfiguration
     */
    select?: FiscalConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FiscalConfiguration
     */
    omit?: FiscalConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalConfigurationInclude<ExtArgs> | null
    /**
     * The data needed to update a FiscalConfiguration.
     */
    data: XOR<FiscalConfigurationUpdateInput, FiscalConfigurationUncheckedUpdateInput>
    /**
     * Choose, which FiscalConfiguration to update.
     */
    where: FiscalConfigurationWhereUniqueInput
  }

  /**
   * FiscalConfiguration updateMany
   */
  export type FiscalConfigurationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FiscalConfigurations.
     */
    data: XOR<FiscalConfigurationUpdateManyMutationInput, FiscalConfigurationUncheckedUpdateManyInput>
    /**
     * Filter which FiscalConfigurations to update
     */
    where?: FiscalConfigurationWhereInput
    /**
     * Limit how many FiscalConfigurations to update.
     */
    limit?: number
  }

  /**
   * FiscalConfiguration updateManyAndReturn
   */
  export type FiscalConfigurationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalConfiguration
     */
    select?: FiscalConfigurationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FiscalConfiguration
     */
    omit?: FiscalConfigurationOmit<ExtArgs> | null
    /**
     * The data used to update FiscalConfigurations.
     */
    data: XOR<FiscalConfigurationUpdateManyMutationInput, FiscalConfigurationUncheckedUpdateManyInput>
    /**
     * Filter which FiscalConfigurations to update
     */
    where?: FiscalConfigurationWhereInput
    /**
     * Limit how many FiscalConfigurations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalConfigurationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FiscalConfiguration upsert
   */
  export type FiscalConfigurationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalConfiguration
     */
    select?: FiscalConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FiscalConfiguration
     */
    omit?: FiscalConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalConfigurationInclude<ExtArgs> | null
    /**
     * The filter to search for the FiscalConfiguration to update in case it exists.
     */
    where: FiscalConfigurationWhereUniqueInput
    /**
     * In case the FiscalConfiguration found by the `where` argument doesn't exist, create a new FiscalConfiguration with this data.
     */
    create: XOR<FiscalConfigurationCreateInput, FiscalConfigurationUncheckedCreateInput>
    /**
     * In case the FiscalConfiguration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FiscalConfigurationUpdateInput, FiscalConfigurationUncheckedUpdateInput>
  }

  /**
   * FiscalConfiguration delete
   */
  export type FiscalConfigurationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalConfiguration
     */
    select?: FiscalConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FiscalConfiguration
     */
    omit?: FiscalConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalConfigurationInclude<ExtArgs> | null
    /**
     * Filter which FiscalConfiguration to delete.
     */
    where: FiscalConfigurationWhereUniqueInput
  }

  /**
   * FiscalConfiguration deleteMany
   */
  export type FiscalConfigurationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FiscalConfigurations to delete
     */
    where?: FiscalConfigurationWhereInput
    /**
     * Limit how many FiscalConfigurations to delete.
     */
    limit?: number
  }

  /**
   * FiscalConfiguration without action
   */
  export type FiscalConfigurationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FiscalConfiguration
     */
    select?: FiscalConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FiscalConfiguration
     */
    omit?: FiscalConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FiscalConfigurationInclude<ExtArgs> | null
  }


  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type ReportSumAggregateOutputType = {
    fileSize: number | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    type: string | null
    dataType: string | null
    status: $Enums.ReportStatus | null
    format: $Enums.ExportFormat | null
    startDate: Date | null
    endDate: Date | null
    shopId: string | null
    fileSize: number | null
    fileName: string | null
    filePath: string | null
    errorMessage: string | null
    deliveryMethod: string | null
    ftpDeliveryStatus: $Enums.FtpDeliveryStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    type: string | null
    dataType: string | null
    status: $Enums.ReportStatus | null
    format: $Enums.ExportFormat | null
    startDate: Date | null
    endDate: Date | null
    shopId: string | null
    fileSize: number | null
    fileName: string | null
    filePath: string | null
    errorMessage: string | null
    deliveryMethod: string | null
    ftpDeliveryStatus: $Enums.FtpDeliveryStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    type: number
    dataType: number
    status: number
    format: number
    startDate: number
    endDate: number
    shopId: number
    fileSize: number
    fileName: number
    filePath: number
    errorMessage: number
    deliveryMethod: number
    ftpDeliveryStatus: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReportAvgAggregateInputType = {
    fileSize?: true
  }

  export type ReportSumAggregateInputType = {
    fileSize?: true
  }

  export type ReportMinAggregateInputType = {
    id?: true
    type?: true
    dataType?: true
    status?: true
    format?: true
    startDate?: true
    endDate?: true
    shopId?: true
    fileSize?: true
    fileName?: true
    filePath?: true
    errorMessage?: true
    deliveryMethod?: true
    ftpDeliveryStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    type?: true
    dataType?: true
    status?: true
    format?: true
    startDate?: true
    endDate?: true
    shopId?: true
    fileSize?: true
    fileName?: true
    filePath?: true
    errorMessage?: true
    deliveryMethod?: true
    ftpDeliveryStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    type?: true
    dataType?: true
    status?: true
    format?: true
    startDate?: true
    endDate?: true
    shopId?: true
    fileSize?: true
    fileName?: true
    filePath?: true
    errorMessage?: true
    deliveryMethod?: true
    ftpDeliveryStatus?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _avg?: ReportAvgAggregateInputType
    _sum?: ReportSumAggregateInputType
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    id: string
    type: string
    dataType: string
    status: $Enums.ReportStatus
    format: $Enums.ExportFormat
    startDate: Date | null
    endDate: Date | null
    shopId: string
    fileSize: number
    fileName: string
    filePath: string | null
    errorMessage: string | null
    deliveryMethod: string
    ftpDeliveryStatus: $Enums.FtpDeliveryStatus | null
    createdAt: Date
    updatedAt: Date
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    dataType?: boolean
    status?: boolean
    format?: boolean
    startDate?: boolean
    endDate?: boolean
    shopId?: boolean
    fileSize?: boolean
    fileName?: boolean
    filePath?: boolean
    errorMessage?: boolean
    deliveryMethod?: boolean
    ftpDeliveryStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    scheduledTasks?: boolean | Report$scheduledTasksArgs<ExtArgs>
    tasks?: boolean | Report$tasksArgs<ExtArgs>
    _count?: boolean | ReportCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    dataType?: boolean
    status?: boolean
    format?: boolean
    startDate?: boolean
    endDate?: boolean
    shopId?: boolean
    fileSize?: boolean
    fileName?: boolean
    filePath?: boolean
    errorMessage?: boolean
    deliveryMethod?: boolean
    ftpDeliveryStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    dataType?: boolean
    status?: boolean
    format?: boolean
    startDate?: boolean
    endDate?: boolean
    shopId?: boolean
    fileSize?: boolean
    fileName?: boolean
    filePath?: boolean
    errorMessage?: boolean
    deliveryMethod?: boolean
    ftpDeliveryStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    type?: boolean
    dataType?: boolean
    status?: boolean
    format?: boolean
    startDate?: boolean
    endDate?: boolean
    shopId?: boolean
    fileSize?: boolean
    fileName?: boolean
    filePath?: boolean
    errorMessage?: boolean
    deliveryMethod?: boolean
    ftpDeliveryStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "dataType" | "status" | "format" | "startDate" | "endDate" | "shopId" | "fileSize" | "fileName" | "filePath" | "errorMessage" | "deliveryMethod" | "ftpDeliveryStatus" | "createdAt" | "updatedAt", ExtArgs["result"]["report"]>
  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    scheduledTasks?: boolean | Report$scheduledTasksArgs<ExtArgs>
    tasks?: boolean | Report$tasksArgs<ExtArgs>
    _count?: boolean | ReportCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }
  export type ReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      shop: Prisma.$ShopPayload<ExtArgs>
      scheduledTasks: Prisma.$ScheduledTaskPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      dataType: string
      status: $Enums.ReportStatus
      format: $Enums.ExportFormat
      startDate: Date | null
      endDate: Date | null
      shopId: string
      fileSize: number
      fileName: string
      filePath: string | null
      errorMessage: string | null
      deliveryMethod: string
      ftpDeliveryStatus: $Enums.FtpDeliveryStatus | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reports and returns the data saved in the database.
     * @param {ReportCreateManyAndReturnArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports and returns the data updated in the database.
     * @param {ReportUpdateManyAndReturnArgs} args - Arguments to update many Reports.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReportUpdateManyAndReturnArgs>(args: SelectSubset<T, ReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shop<T extends ShopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopDefaultArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    scheduledTasks<T extends Report$scheduledTasksArgs<ExtArgs> = {}>(args?: Subset<T, Report$scheduledTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduledTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends Report$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Report$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Report model
   */
  interface ReportFieldRefs {
    readonly id: FieldRef<"Report", 'String'>
    readonly type: FieldRef<"Report", 'String'>
    readonly dataType: FieldRef<"Report", 'String'>
    readonly status: FieldRef<"Report", 'ReportStatus'>
    readonly format: FieldRef<"Report", 'ExportFormat'>
    readonly startDate: FieldRef<"Report", 'DateTime'>
    readonly endDate: FieldRef<"Report", 'DateTime'>
    readonly shopId: FieldRef<"Report", 'String'>
    readonly fileSize: FieldRef<"Report", 'Int'>
    readonly fileName: FieldRef<"Report", 'String'>
    readonly filePath: FieldRef<"Report", 'String'>
    readonly errorMessage: FieldRef<"Report", 'String'>
    readonly deliveryMethod: FieldRef<"Report", 'String'>
    readonly ftpDeliveryStatus: FieldRef<"Report", 'FtpDeliveryStatus'>
    readonly createdAt: FieldRef<"Report", 'DateTime'>
    readonly updatedAt: FieldRef<"Report", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Report createManyAndReturn
   */
  export type ReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
  }

  /**
   * Report updateManyAndReturn
   */
  export type ReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to delete.
     */
    limit?: number
  }

  /**
   * Report.scheduledTasks
   */
  export type Report$scheduledTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledTask
     */
    select?: ScheduledTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledTask
     */
    omit?: ScheduledTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledTaskInclude<ExtArgs> | null
    where?: ScheduledTaskWhereInput
    orderBy?: ScheduledTaskOrderByWithRelationInput | ScheduledTaskOrderByWithRelationInput[]
    cursor?: ScheduledTaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduledTaskScalarFieldEnum | ScheduledTaskScalarFieldEnum[]
  }

  /**
   * Report.tasks
   */
  export type Report$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Model ScheduledTask
   */

  export type AggregateScheduledTask = {
    _count: ScheduledTaskCountAggregateOutputType | null
    _avg: ScheduledTaskAvgAggregateOutputType | null
    _sum: ScheduledTaskSumAggregateOutputType | null
    _min: ScheduledTaskMinAggregateOutputType | null
    _max: ScheduledTaskMaxAggregateOutputType | null
  }

  export type ScheduledTaskAvgAggregateOutputType = {
    executionDay: number | null
  }

  export type ScheduledTaskSumAggregateOutputType = {
    executionDay: number | null
  }

  export type ScheduledTaskMinAggregateOutputType = {
    id: string | null
    reportId: string | null
    shopId: string | null
    frequency: string | null
    executionDay: number | null
    executionTime: string | null
    emailConfig: string | null
    lastRun: Date | null
    nextRun: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ScheduledTaskMaxAggregateOutputType = {
    id: string | null
    reportId: string | null
    shopId: string | null
    frequency: string | null
    executionDay: number | null
    executionTime: string | null
    emailConfig: string | null
    lastRun: Date | null
    nextRun: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ScheduledTaskCountAggregateOutputType = {
    id: number
    reportId: number
    shopId: number
    frequency: number
    executionDay: number
    executionTime: number
    emailConfig: number
    lastRun: number
    nextRun: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ScheduledTaskAvgAggregateInputType = {
    executionDay?: true
  }

  export type ScheduledTaskSumAggregateInputType = {
    executionDay?: true
  }

  export type ScheduledTaskMinAggregateInputType = {
    id?: true
    reportId?: true
    shopId?: true
    frequency?: true
    executionDay?: true
    executionTime?: true
    emailConfig?: true
    lastRun?: true
    nextRun?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ScheduledTaskMaxAggregateInputType = {
    id?: true
    reportId?: true
    shopId?: true
    frequency?: true
    executionDay?: true
    executionTime?: true
    emailConfig?: true
    lastRun?: true
    nextRun?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ScheduledTaskCountAggregateInputType = {
    id?: true
    reportId?: true
    shopId?: true
    frequency?: true
    executionDay?: true
    executionTime?: true
    emailConfig?: true
    lastRun?: true
    nextRun?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ScheduledTaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScheduledTask to aggregate.
     */
    where?: ScheduledTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduledTasks to fetch.
     */
    orderBy?: ScheduledTaskOrderByWithRelationInput | ScheduledTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScheduledTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduledTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduledTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScheduledTasks
    **/
    _count?: true | ScheduledTaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScheduledTaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScheduledTaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScheduledTaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScheduledTaskMaxAggregateInputType
  }

  export type GetScheduledTaskAggregateType<T extends ScheduledTaskAggregateArgs> = {
        [P in keyof T & keyof AggregateScheduledTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScheduledTask[P]>
      : GetScalarType<T[P], AggregateScheduledTask[P]>
  }




  export type ScheduledTaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduledTaskWhereInput
    orderBy?: ScheduledTaskOrderByWithAggregationInput | ScheduledTaskOrderByWithAggregationInput[]
    by: ScheduledTaskScalarFieldEnum[] | ScheduledTaskScalarFieldEnum
    having?: ScheduledTaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScheduledTaskCountAggregateInputType | true
    _avg?: ScheduledTaskAvgAggregateInputType
    _sum?: ScheduledTaskSumAggregateInputType
    _min?: ScheduledTaskMinAggregateInputType
    _max?: ScheduledTaskMaxAggregateInputType
  }

  export type ScheduledTaskGroupByOutputType = {
    id: string
    reportId: string
    shopId: string
    frequency: string
    executionDay: number
    executionTime: string
    emailConfig: string
    lastRun: Date | null
    nextRun: Date
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ScheduledTaskCountAggregateOutputType | null
    _avg: ScheduledTaskAvgAggregateOutputType | null
    _sum: ScheduledTaskSumAggregateOutputType | null
    _min: ScheduledTaskMinAggregateOutputType | null
    _max: ScheduledTaskMaxAggregateOutputType | null
  }

  type GetScheduledTaskGroupByPayload<T extends ScheduledTaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScheduledTaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScheduledTaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScheduledTaskGroupByOutputType[P]>
            : GetScalarType<T[P], ScheduledTaskGroupByOutputType[P]>
        }
      >
    >


  export type ScheduledTaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    shopId?: boolean
    frequency?: boolean
    executionDay?: boolean
    executionTime?: boolean
    emailConfig?: boolean
    lastRun?: boolean
    nextRun?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    tasks?: boolean | ScheduledTask$tasksArgs<ExtArgs>
    _count?: boolean | ScheduledTaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scheduledTask"]>

  export type ScheduledTaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    shopId?: boolean
    frequency?: boolean
    executionDay?: boolean
    executionTime?: boolean
    emailConfig?: boolean
    lastRun?: boolean
    nextRun?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scheduledTask"]>

  export type ScheduledTaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    shopId?: boolean
    frequency?: boolean
    executionDay?: boolean
    executionTime?: boolean
    emailConfig?: boolean
    lastRun?: boolean
    nextRun?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scheduledTask"]>

  export type ScheduledTaskSelectScalar = {
    id?: boolean
    reportId?: boolean
    shopId?: boolean
    frequency?: boolean
    executionDay?: boolean
    executionTime?: boolean
    emailConfig?: boolean
    lastRun?: boolean
    nextRun?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ScheduledTaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reportId" | "shopId" | "frequency" | "executionDay" | "executionTime" | "emailConfig" | "lastRun" | "nextRun" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["scheduledTask"]>
  export type ScheduledTaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    tasks?: boolean | ScheduledTask$tasksArgs<ExtArgs>
    _count?: boolean | ScheduledTaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ScheduledTaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }
  export type ScheduledTaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }

  export type $ScheduledTaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScheduledTask"
    objects: {
      report: Prisma.$ReportPayload<ExtArgs>
      shop: Prisma.$ShopPayload<ExtArgs>
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reportId: string
      shopId: string
      frequency: string
      executionDay: number
      executionTime: string
      emailConfig: string
      lastRun: Date | null
      nextRun: Date
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["scheduledTask"]>
    composites: {}
  }

  type ScheduledTaskGetPayload<S extends boolean | null | undefined | ScheduledTaskDefaultArgs> = $Result.GetResult<Prisma.$ScheduledTaskPayload, S>

  type ScheduledTaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScheduledTaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScheduledTaskCountAggregateInputType | true
    }

  export interface ScheduledTaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScheduledTask'], meta: { name: 'ScheduledTask' } }
    /**
     * Find zero or one ScheduledTask that matches the filter.
     * @param {ScheduledTaskFindUniqueArgs} args - Arguments to find a ScheduledTask
     * @example
     * // Get one ScheduledTask
     * const scheduledTask = await prisma.scheduledTask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScheduledTaskFindUniqueArgs>(args: SelectSubset<T, ScheduledTaskFindUniqueArgs<ExtArgs>>): Prisma__ScheduledTaskClient<$Result.GetResult<Prisma.$ScheduledTaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ScheduledTask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScheduledTaskFindUniqueOrThrowArgs} args - Arguments to find a ScheduledTask
     * @example
     * // Get one ScheduledTask
     * const scheduledTask = await prisma.scheduledTask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScheduledTaskFindUniqueOrThrowArgs>(args: SelectSubset<T, ScheduledTaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScheduledTaskClient<$Result.GetResult<Prisma.$ScheduledTaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScheduledTask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledTaskFindFirstArgs} args - Arguments to find a ScheduledTask
     * @example
     * // Get one ScheduledTask
     * const scheduledTask = await prisma.scheduledTask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScheduledTaskFindFirstArgs>(args?: SelectSubset<T, ScheduledTaskFindFirstArgs<ExtArgs>>): Prisma__ScheduledTaskClient<$Result.GetResult<Prisma.$ScheduledTaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScheduledTask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledTaskFindFirstOrThrowArgs} args - Arguments to find a ScheduledTask
     * @example
     * // Get one ScheduledTask
     * const scheduledTask = await prisma.scheduledTask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScheduledTaskFindFirstOrThrowArgs>(args?: SelectSubset<T, ScheduledTaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScheduledTaskClient<$Result.GetResult<Prisma.$ScheduledTaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ScheduledTasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledTaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScheduledTasks
     * const scheduledTasks = await prisma.scheduledTask.findMany()
     * 
     * // Get first 10 ScheduledTasks
     * const scheduledTasks = await prisma.scheduledTask.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scheduledTaskWithIdOnly = await prisma.scheduledTask.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScheduledTaskFindManyArgs>(args?: SelectSubset<T, ScheduledTaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduledTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ScheduledTask.
     * @param {ScheduledTaskCreateArgs} args - Arguments to create a ScheduledTask.
     * @example
     * // Create one ScheduledTask
     * const ScheduledTask = await prisma.scheduledTask.create({
     *   data: {
     *     // ... data to create a ScheduledTask
     *   }
     * })
     * 
     */
    create<T extends ScheduledTaskCreateArgs>(args: SelectSubset<T, ScheduledTaskCreateArgs<ExtArgs>>): Prisma__ScheduledTaskClient<$Result.GetResult<Prisma.$ScheduledTaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ScheduledTasks.
     * @param {ScheduledTaskCreateManyArgs} args - Arguments to create many ScheduledTasks.
     * @example
     * // Create many ScheduledTasks
     * const scheduledTask = await prisma.scheduledTask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScheduledTaskCreateManyArgs>(args?: SelectSubset<T, ScheduledTaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScheduledTasks and returns the data saved in the database.
     * @param {ScheduledTaskCreateManyAndReturnArgs} args - Arguments to create many ScheduledTasks.
     * @example
     * // Create many ScheduledTasks
     * const scheduledTask = await prisma.scheduledTask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScheduledTasks and only return the `id`
     * const scheduledTaskWithIdOnly = await prisma.scheduledTask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScheduledTaskCreateManyAndReturnArgs>(args?: SelectSubset<T, ScheduledTaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduledTaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ScheduledTask.
     * @param {ScheduledTaskDeleteArgs} args - Arguments to delete one ScheduledTask.
     * @example
     * // Delete one ScheduledTask
     * const ScheduledTask = await prisma.scheduledTask.delete({
     *   where: {
     *     // ... filter to delete one ScheduledTask
     *   }
     * })
     * 
     */
    delete<T extends ScheduledTaskDeleteArgs>(args: SelectSubset<T, ScheduledTaskDeleteArgs<ExtArgs>>): Prisma__ScheduledTaskClient<$Result.GetResult<Prisma.$ScheduledTaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ScheduledTask.
     * @param {ScheduledTaskUpdateArgs} args - Arguments to update one ScheduledTask.
     * @example
     * // Update one ScheduledTask
     * const scheduledTask = await prisma.scheduledTask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScheduledTaskUpdateArgs>(args: SelectSubset<T, ScheduledTaskUpdateArgs<ExtArgs>>): Prisma__ScheduledTaskClient<$Result.GetResult<Prisma.$ScheduledTaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ScheduledTasks.
     * @param {ScheduledTaskDeleteManyArgs} args - Arguments to filter ScheduledTasks to delete.
     * @example
     * // Delete a few ScheduledTasks
     * const { count } = await prisma.scheduledTask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScheduledTaskDeleteManyArgs>(args?: SelectSubset<T, ScheduledTaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScheduledTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledTaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScheduledTasks
     * const scheduledTask = await prisma.scheduledTask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScheduledTaskUpdateManyArgs>(args: SelectSubset<T, ScheduledTaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScheduledTasks and returns the data updated in the database.
     * @param {ScheduledTaskUpdateManyAndReturnArgs} args - Arguments to update many ScheduledTasks.
     * @example
     * // Update many ScheduledTasks
     * const scheduledTask = await prisma.scheduledTask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ScheduledTasks and only return the `id`
     * const scheduledTaskWithIdOnly = await prisma.scheduledTask.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScheduledTaskUpdateManyAndReturnArgs>(args: SelectSubset<T, ScheduledTaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduledTaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ScheduledTask.
     * @param {ScheduledTaskUpsertArgs} args - Arguments to update or create a ScheduledTask.
     * @example
     * // Update or create a ScheduledTask
     * const scheduledTask = await prisma.scheduledTask.upsert({
     *   create: {
     *     // ... data to create a ScheduledTask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScheduledTask we want to update
     *   }
     * })
     */
    upsert<T extends ScheduledTaskUpsertArgs>(args: SelectSubset<T, ScheduledTaskUpsertArgs<ExtArgs>>): Prisma__ScheduledTaskClient<$Result.GetResult<Prisma.$ScheduledTaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ScheduledTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledTaskCountArgs} args - Arguments to filter ScheduledTasks to count.
     * @example
     * // Count the number of ScheduledTasks
     * const count = await prisma.scheduledTask.count({
     *   where: {
     *     // ... the filter for the ScheduledTasks we want to count
     *   }
     * })
    **/
    count<T extends ScheduledTaskCountArgs>(
      args?: Subset<T, ScheduledTaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScheduledTaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScheduledTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledTaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScheduledTaskAggregateArgs>(args: Subset<T, ScheduledTaskAggregateArgs>): Prisma.PrismaPromise<GetScheduledTaskAggregateType<T>>

    /**
     * Group by ScheduledTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledTaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScheduledTaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScheduledTaskGroupByArgs['orderBy'] }
        : { orderBy?: ScheduledTaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScheduledTaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScheduledTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScheduledTask model
   */
  readonly fields: ScheduledTaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScheduledTask.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScheduledTaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    report<T extends ReportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReportDefaultArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    shop<T extends ShopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopDefaultArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tasks<T extends ScheduledTask$tasksArgs<ExtArgs> = {}>(args?: Subset<T, ScheduledTask$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScheduledTask model
   */
  interface ScheduledTaskFieldRefs {
    readonly id: FieldRef<"ScheduledTask", 'String'>
    readonly reportId: FieldRef<"ScheduledTask", 'String'>
    readonly shopId: FieldRef<"ScheduledTask", 'String'>
    readonly frequency: FieldRef<"ScheduledTask", 'String'>
    readonly executionDay: FieldRef<"ScheduledTask", 'Int'>
    readonly executionTime: FieldRef<"ScheduledTask", 'String'>
    readonly emailConfig: FieldRef<"ScheduledTask", 'String'>
    readonly lastRun: FieldRef<"ScheduledTask", 'DateTime'>
    readonly nextRun: FieldRef<"ScheduledTask", 'DateTime'>
    readonly status: FieldRef<"ScheduledTask", 'String'>
    readonly createdAt: FieldRef<"ScheduledTask", 'DateTime'>
    readonly updatedAt: FieldRef<"ScheduledTask", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ScheduledTask findUnique
   */
  export type ScheduledTaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledTask
     */
    select?: ScheduledTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledTask
     */
    omit?: ScheduledTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledTaskInclude<ExtArgs> | null
    /**
     * Filter, which ScheduledTask to fetch.
     */
    where: ScheduledTaskWhereUniqueInput
  }

  /**
   * ScheduledTask findUniqueOrThrow
   */
  export type ScheduledTaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledTask
     */
    select?: ScheduledTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledTask
     */
    omit?: ScheduledTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledTaskInclude<ExtArgs> | null
    /**
     * Filter, which ScheduledTask to fetch.
     */
    where: ScheduledTaskWhereUniqueInput
  }

  /**
   * ScheduledTask findFirst
   */
  export type ScheduledTaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledTask
     */
    select?: ScheduledTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledTask
     */
    omit?: ScheduledTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledTaskInclude<ExtArgs> | null
    /**
     * Filter, which ScheduledTask to fetch.
     */
    where?: ScheduledTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduledTasks to fetch.
     */
    orderBy?: ScheduledTaskOrderByWithRelationInput | ScheduledTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScheduledTasks.
     */
    cursor?: ScheduledTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduledTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduledTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScheduledTasks.
     */
    distinct?: ScheduledTaskScalarFieldEnum | ScheduledTaskScalarFieldEnum[]
  }

  /**
   * ScheduledTask findFirstOrThrow
   */
  export type ScheduledTaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledTask
     */
    select?: ScheduledTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledTask
     */
    omit?: ScheduledTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledTaskInclude<ExtArgs> | null
    /**
     * Filter, which ScheduledTask to fetch.
     */
    where?: ScheduledTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduledTasks to fetch.
     */
    orderBy?: ScheduledTaskOrderByWithRelationInput | ScheduledTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScheduledTasks.
     */
    cursor?: ScheduledTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduledTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduledTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScheduledTasks.
     */
    distinct?: ScheduledTaskScalarFieldEnum | ScheduledTaskScalarFieldEnum[]
  }

  /**
   * ScheduledTask findMany
   */
  export type ScheduledTaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledTask
     */
    select?: ScheduledTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledTask
     */
    omit?: ScheduledTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledTaskInclude<ExtArgs> | null
    /**
     * Filter, which ScheduledTasks to fetch.
     */
    where?: ScheduledTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduledTasks to fetch.
     */
    orderBy?: ScheduledTaskOrderByWithRelationInput | ScheduledTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScheduledTasks.
     */
    cursor?: ScheduledTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduledTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduledTasks.
     */
    skip?: number
    distinct?: ScheduledTaskScalarFieldEnum | ScheduledTaskScalarFieldEnum[]
  }

  /**
   * ScheduledTask create
   */
  export type ScheduledTaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledTask
     */
    select?: ScheduledTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledTask
     */
    omit?: ScheduledTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledTaskInclude<ExtArgs> | null
    /**
     * The data needed to create a ScheduledTask.
     */
    data: XOR<ScheduledTaskCreateInput, ScheduledTaskUncheckedCreateInput>
  }

  /**
   * ScheduledTask createMany
   */
  export type ScheduledTaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScheduledTasks.
     */
    data: ScheduledTaskCreateManyInput | ScheduledTaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScheduledTask createManyAndReturn
   */
  export type ScheduledTaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledTask
     */
    select?: ScheduledTaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledTask
     */
    omit?: ScheduledTaskOmit<ExtArgs> | null
    /**
     * The data used to create many ScheduledTasks.
     */
    data: ScheduledTaskCreateManyInput | ScheduledTaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledTaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScheduledTask update
   */
  export type ScheduledTaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledTask
     */
    select?: ScheduledTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledTask
     */
    omit?: ScheduledTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledTaskInclude<ExtArgs> | null
    /**
     * The data needed to update a ScheduledTask.
     */
    data: XOR<ScheduledTaskUpdateInput, ScheduledTaskUncheckedUpdateInput>
    /**
     * Choose, which ScheduledTask to update.
     */
    where: ScheduledTaskWhereUniqueInput
  }

  /**
   * ScheduledTask updateMany
   */
  export type ScheduledTaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScheduledTasks.
     */
    data: XOR<ScheduledTaskUpdateManyMutationInput, ScheduledTaskUncheckedUpdateManyInput>
    /**
     * Filter which ScheduledTasks to update
     */
    where?: ScheduledTaskWhereInput
    /**
     * Limit how many ScheduledTasks to update.
     */
    limit?: number
  }

  /**
   * ScheduledTask updateManyAndReturn
   */
  export type ScheduledTaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledTask
     */
    select?: ScheduledTaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledTask
     */
    omit?: ScheduledTaskOmit<ExtArgs> | null
    /**
     * The data used to update ScheduledTasks.
     */
    data: XOR<ScheduledTaskUpdateManyMutationInput, ScheduledTaskUncheckedUpdateManyInput>
    /**
     * Filter which ScheduledTasks to update
     */
    where?: ScheduledTaskWhereInput
    /**
     * Limit how many ScheduledTasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledTaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScheduledTask upsert
   */
  export type ScheduledTaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledTask
     */
    select?: ScheduledTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledTask
     */
    omit?: ScheduledTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledTaskInclude<ExtArgs> | null
    /**
     * The filter to search for the ScheduledTask to update in case it exists.
     */
    where: ScheduledTaskWhereUniqueInput
    /**
     * In case the ScheduledTask found by the `where` argument doesn't exist, create a new ScheduledTask with this data.
     */
    create: XOR<ScheduledTaskCreateInput, ScheduledTaskUncheckedCreateInput>
    /**
     * In case the ScheduledTask was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScheduledTaskUpdateInput, ScheduledTaskUncheckedUpdateInput>
  }

  /**
   * ScheduledTask delete
   */
  export type ScheduledTaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledTask
     */
    select?: ScheduledTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledTask
     */
    omit?: ScheduledTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledTaskInclude<ExtArgs> | null
    /**
     * Filter which ScheduledTask to delete.
     */
    where: ScheduledTaskWhereUniqueInput
  }

  /**
   * ScheduledTask deleteMany
   */
  export type ScheduledTaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScheduledTasks to delete
     */
    where?: ScheduledTaskWhereInput
    /**
     * Limit how many ScheduledTasks to delete.
     */
    limit?: number
  }

  /**
   * ScheduledTask.tasks
   */
  export type ScheduledTask$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * ScheduledTask without action
   */
  export type ScheduledTaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledTask
     */
    select?: ScheduledTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledTask
     */
    omit?: ScheduledTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledTaskInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    scheduledTaskId: string | null
    shopId: string | null
    reportId: string | null
    status: string | null
    scheduledFor: Date | null
    startedAt: Date | null
    completedAt: Date | null
    emailConfig: string | null
    errorMessage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    scheduledTaskId: string | null
    shopId: string | null
    reportId: string | null
    status: string | null
    scheduledFor: Date | null
    startedAt: Date | null
    completedAt: Date | null
    emailConfig: string | null
    errorMessage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    scheduledTaskId: number
    shopId: number
    reportId: number
    status: number
    scheduledFor: number
    startedAt: number
    completedAt: number
    emailConfig: number
    errorMessage: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskMinAggregateInputType = {
    id?: true
    scheduledTaskId?: true
    shopId?: true
    reportId?: true
    status?: true
    scheduledFor?: true
    startedAt?: true
    completedAt?: true
    emailConfig?: true
    errorMessage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    scheduledTaskId?: true
    shopId?: true
    reportId?: true
    status?: true
    scheduledFor?: true
    startedAt?: true
    completedAt?: true
    emailConfig?: true
    errorMessage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    scheduledTaskId?: true
    shopId?: true
    reportId?: true
    status?: true
    scheduledFor?: true
    startedAt?: true
    completedAt?: true
    emailConfig?: true
    errorMessage?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    scheduledTaskId: string
    shopId: string
    reportId: string
    status: string
    scheduledFor: Date
    startedAt: Date | null
    completedAt: Date | null
    emailConfig: string
    errorMessage: string | null
    createdAt: Date
    updatedAt: Date
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    scheduledTaskId?: boolean
    shopId?: boolean
    reportId?: boolean
    status?: boolean
    scheduledFor?: boolean
    startedAt?: boolean
    completedAt?: boolean
    emailConfig?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    scheduledTask?: boolean | ScheduledTaskDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    report?: boolean | ReportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    scheduledTaskId?: boolean
    shopId?: boolean
    reportId?: boolean
    status?: boolean
    scheduledFor?: boolean
    startedAt?: boolean
    completedAt?: boolean
    emailConfig?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    scheduledTask?: boolean | ScheduledTaskDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    report?: boolean | ReportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    scheduledTaskId?: boolean
    shopId?: boolean
    reportId?: boolean
    status?: boolean
    scheduledFor?: boolean
    startedAt?: boolean
    completedAt?: boolean
    emailConfig?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    scheduledTask?: boolean | ScheduledTaskDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    report?: boolean | ReportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    scheduledTaskId?: boolean
    shopId?: boolean
    reportId?: boolean
    status?: boolean
    scheduledFor?: boolean
    startedAt?: boolean
    completedAt?: boolean
    emailConfig?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "scheduledTaskId" | "shopId" | "reportId" | "status" | "scheduledFor" | "startedAt" | "completedAt" | "emailConfig" | "errorMessage" | "createdAt" | "updatedAt", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scheduledTask?: boolean | ScheduledTaskDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    report?: boolean | ReportDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scheduledTask?: boolean | ScheduledTaskDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    report?: boolean | ReportDefaultArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scheduledTask?: boolean | ScheduledTaskDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    report?: boolean | ReportDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      scheduledTask: Prisma.$ScheduledTaskPayload<ExtArgs>
      shop: Prisma.$ShopPayload<ExtArgs>
      report: Prisma.$ReportPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      scheduledTaskId: string
      shopId: string
      reportId: string
      status: string
      scheduledFor: Date
      startedAt: Date | null
      completedAt: Date | null
      emailConfig: string
      errorMessage: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    scheduledTask<T extends ScheduledTaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ScheduledTaskDefaultArgs<ExtArgs>>): Prisma__ScheduledTaskClient<$Result.GetResult<Prisma.$ScheduledTaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    shop<T extends ShopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopDefaultArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    report<T extends ReportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReportDefaultArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly scheduledTaskId: FieldRef<"Task", 'String'>
    readonly shopId: FieldRef<"Task", 'String'>
    readonly reportId: FieldRef<"Task", 'String'>
    readonly status: FieldRef<"Task", 'String'>
    readonly scheduledFor: FieldRef<"Task", 'DateTime'>
    readonly startedAt: FieldRef<"Task", 'DateTime'>
    readonly completedAt: FieldRef<"Task", 'DateTime'>
    readonly emailConfig: FieldRef<"Task", 'String'>
    readonly errorMessage: FieldRef<"Task", 'String'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model GeneralSettings
   */

  export type AggregateGeneralSettings = {
    _count: GeneralSettingsCountAggregateOutputType | null
    _min: GeneralSettingsMinAggregateOutputType | null
    _max: GeneralSettingsMaxAggregateOutputType | null
  }

  export type GeneralSettingsMinAggregateOutputType = {
    id: string | null
    shopId: string | null
    timezone: string | null
    language: string | null
    salesAccount: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GeneralSettingsMaxAggregateOutputType = {
    id: string | null
    shopId: string | null
    timezone: string | null
    language: string | null
    salesAccount: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GeneralSettingsCountAggregateOutputType = {
    id: number
    shopId: number
    timezone: number
    language: number
    salesAccount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GeneralSettingsMinAggregateInputType = {
    id?: true
    shopId?: true
    timezone?: true
    language?: true
    salesAccount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GeneralSettingsMaxAggregateInputType = {
    id?: true
    shopId?: true
    timezone?: true
    language?: true
    salesAccount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GeneralSettingsCountAggregateInputType = {
    id?: true
    shopId?: true
    timezone?: true
    language?: true
    salesAccount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GeneralSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeneralSettings to aggregate.
     */
    where?: GeneralSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneralSettings to fetch.
     */
    orderBy?: GeneralSettingsOrderByWithRelationInput | GeneralSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GeneralSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneralSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneralSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GeneralSettings
    **/
    _count?: true | GeneralSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GeneralSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GeneralSettingsMaxAggregateInputType
  }

  export type GetGeneralSettingsAggregateType<T extends GeneralSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateGeneralSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGeneralSettings[P]>
      : GetScalarType<T[P], AggregateGeneralSettings[P]>
  }




  export type GeneralSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GeneralSettingsWhereInput
    orderBy?: GeneralSettingsOrderByWithAggregationInput | GeneralSettingsOrderByWithAggregationInput[]
    by: GeneralSettingsScalarFieldEnum[] | GeneralSettingsScalarFieldEnum
    having?: GeneralSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GeneralSettingsCountAggregateInputType | true
    _min?: GeneralSettingsMinAggregateInputType
    _max?: GeneralSettingsMaxAggregateInputType
  }

  export type GeneralSettingsGroupByOutputType = {
    id: string
    shopId: string
    timezone: string
    language: string
    salesAccount: string
    createdAt: Date
    updatedAt: Date
    _count: GeneralSettingsCountAggregateOutputType | null
    _min: GeneralSettingsMinAggregateOutputType | null
    _max: GeneralSettingsMaxAggregateOutputType | null
  }

  type GetGeneralSettingsGroupByPayload<T extends GeneralSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GeneralSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GeneralSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GeneralSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], GeneralSettingsGroupByOutputType[P]>
        }
      >
    >


  export type GeneralSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    timezone?: boolean
    language?: boolean
    salesAccount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["generalSettings"]>

  export type GeneralSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    timezone?: boolean
    language?: boolean
    salesAccount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["generalSettings"]>

  export type GeneralSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    timezone?: boolean
    language?: boolean
    salesAccount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["generalSettings"]>

  export type GeneralSettingsSelectScalar = {
    id?: boolean
    shopId?: boolean
    timezone?: boolean
    language?: boolean
    salesAccount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GeneralSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopId" | "timezone" | "language" | "salesAccount" | "createdAt" | "updatedAt", ExtArgs["result"]["generalSettings"]>
  export type GeneralSettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }
  export type GeneralSettingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }
  export type GeneralSettingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }

  export type $GeneralSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GeneralSettings"
    objects: {
      shop: Prisma.$ShopPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopId: string
      timezone: string
      language: string
      salesAccount: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["generalSettings"]>
    composites: {}
  }

  type GeneralSettingsGetPayload<S extends boolean | null | undefined | GeneralSettingsDefaultArgs> = $Result.GetResult<Prisma.$GeneralSettingsPayload, S>

  type GeneralSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GeneralSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GeneralSettingsCountAggregateInputType | true
    }

  export interface GeneralSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GeneralSettings'], meta: { name: 'GeneralSettings' } }
    /**
     * Find zero or one GeneralSettings that matches the filter.
     * @param {GeneralSettingsFindUniqueArgs} args - Arguments to find a GeneralSettings
     * @example
     * // Get one GeneralSettings
     * const generalSettings = await prisma.generalSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GeneralSettingsFindUniqueArgs>(args: SelectSubset<T, GeneralSettingsFindUniqueArgs<ExtArgs>>): Prisma__GeneralSettingsClient<$Result.GetResult<Prisma.$GeneralSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GeneralSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GeneralSettingsFindUniqueOrThrowArgs} args - Arguments to find a GeneralSettings
     * @example
     * // Get one GeneralSettings
     * const generalSettings = await prisma.generalSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GeneralSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, GeneralSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GeneralSettingsClient<$Result.GetResult<Prisma.$GeneralSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeneralSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralSettingsFindFirstArgs} args - Arguments to find a GeneralSettings
     * @example
     * // Get one GeneralSettings
     * const generalSettings = await prisma.generalSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GeneralSettingsFindFirstArgs>(args?: SelectSubset<T, GeneralSettingsFindFirstArgs<ExtArgs>>): Prisma__GeneralSettingsClient<$Result.GetResult<Prisma.$GeneralSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GeneralSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralSettingsFindFirstOrThrowArgs} args - Arguments to find a GeneralSettings
     * @example
     * // Get one GeneralSettings
     * const generalSettings = await prisma.generalSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GeneralSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, GeneralSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__GeneralSettingsClient<$Result.GetResult<Prisma.$GeneralSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GeneralSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GeneralSettings
     * const generalSettings = await prisma.generalSettings.findMany()
     * 
     * // Get first 10 GeneralSettings
     * const generalSettings = await prisma.generalSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const generalSettingsWithIdOnly = await prisma.generalSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GeneralSettingsFindManyArgs>(args?: SelectSubset<T, GeneralSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneralSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GeneralSettings.
     * @param {GeneralSettingsCreateArgs} args - Arguments to create a GeneralSettings.
     * @example
     * // Create one GeneralSettings
     * const GeneralSettings = await prisma.generalSettings.create({
     *   data: {
     *     // ... data to create a GeneralSettings
     *   }
     * })
     * 
     */
    create<T extends GeneralSettingsCreateArgs>(args: SelectSubset<T, GeneralSettingsCreateArgs<ExtArgs>>): Prisma__GeneralSettingsClient<$Result.GetResult<Prisma.$GeneralSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GeneralSettings.
     * @param {GeneralSettingsCreateManyArgs} args - Arguments to create many GeneralSettings.
     * @example
     * // Create many GeneralSettings
     * const generalSettings = await prisma.generalSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GeneralSettingsCreateManyArgs>(args?: SelectSubset<T, GeneralSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GeneralSettings and returns the data saved in the database.
     * @param {GeneralSettingsCreateManyAndReturnArgs} args - Arguments to create many GeneralSettings.
     * @example
     * // Create many GeneralSettings
     * const generalSettings = await prisma.generalSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GeneralSettings and only return the `id`
     * const generalSettingsWithIdOnly = await prisma.generalSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GeneralSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, GeneralSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneralSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GeneralSettings.
     * @param {GeneralSettingsDeleteArgs} args - Arguments to delete one GeneralSettings.
     * @example
     * // Delete one GeneralSettings
     * const GeneralSettings = await prisma.generalSettings.delete({
     *   where: {
     *     // ... filter to delete one GeneralSettings
     *   }
     * })
     * 
     */
    delete<T extends GeneralSettingsDeleteArgs>(args: SelectSubset<T, GeneralSettingsDeleteArgs<ExtArgs>>): Prisma__GeneralSettingsClient<$Result.GetResult<Prisma.$GeneralSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GeneralSettings.
     * @param {GeneralSettingsUpdateArgs} args - Arguments to update one GeneralSettings.
     * @example
     * // Update one GeneralSettings
     * const generalSettings = await prisma.generalSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GeneralSettingsUpdateArgs>(args: SelectSubset<T, GeneralSettingsUpdateArgs<ExtArgs>>): Prisma__GeneralSettingsClient<$Result.GetResult<Prisma.$GeneralSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GeneralSettings.
     * @param {GeneralSettingsDeleteManyArgs} args - Arguments to filter GeneralSettings to delete.
     * @example
     * // Delete a few GeneralSettings
     * const { count } = await prisma.generalSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GeneralSettingsDeleteManyArgs>(args?: SelectSubset<T, GeneralSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeneralSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GeneralSettings
     * const generalSettings = await prisma.generalSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GeneralSettingsUpdateManyArgs>(args: SelectSubset<T, GeneralSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeneralSettings and returns the data updated in the database.
     * @param {GeneralSettingsUpdateManyAndReturnArgs} args - Arguments to update many GeneralSettings.
     * @example
     * // Update many GeneralSettings
     * const generalSettings = await prisma.generalSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GeneralSettings and only return the `id`
     * const generalSettingsWithIdOnly = await prisma.generalSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GeneralSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, GeneralSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeneralSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GeneralSettings.
     * @param {GeneralSettingsUpsertArgs} args - Arguments to update or create a GeneralSettings.
     * @example
     * // Update or create a GeneralSettings
     * const generalSettings = await prisma.generalSettings.upsert({
     *   create: {
     *     // ... data to create a GeneralSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GeneralSettings we want to update
     *   }
     * })
     */
    upsert<T extends GeneralSettingsUpsertArgs>(args: SelectSubset<T, GeneralSettingsUpsertArgs<ExtArgs>>): Prisma__GeneralSettingsClient<$Result.GetResult<Prisma.$GeneralSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GeneralSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralSettingsCountArgs} args - Arguments to filter GeneralSettings to count.
     * @example
     * // Count the number of GeneralSettings
     * const count = await prisma.generalSettings.count({
     *   where: {
     *     // ... the filter for the GeneralSettings we want to count
     *   }
     * })
    **/
    count<T extends GeneralSettingsCountArgs>(
      args?: Subset<T, GeneralSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GeneralSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GeneralSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GeneralSettingsAggregateArgs>(args: Subset<T, GeneralSettingsAggregateArgs>): Prisma.PrismaPromise<GetGeneralSettingsAggregateType<T>>

    /**
     * Group by GeneralSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeneralSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GeneralSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GeneralSettingsGroupByArgs['orderBy'] }
        : { orderBy?: GeneralSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GeneralSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGeneralSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GeneralSettings model
   */
  readonly fields: GeneralSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GeneralSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GeneralSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shop<T extends ShopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopDefaultArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GeneralSettings model
   */
  interface GeneralSettingsFieldRefs {
    readonly id: FieldRef<"GeneralSettings", 'String'>
    readonly shopId: FieldRef<"GeneralSettings", 'String'>
    readonly timezone: FieldRef<"GeneralSettings", 'String'>
    readonly language: FieldRef<"GeneralSettings", 'String'>
    readonly salesAccount: FieldRef<"GeneralSettings", 'String'>
    readonly createdAt: FieldRef<"GeneralSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"GeneralSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GeneralSettings findUnique
   */
  export type GeneralSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralSettings
     */
    select?: GeneralSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralSettings
     */
    omit?: GeneralSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneralSettingsInclude<ExtArgs> | null
    /**
     * Filter, which GeneralSettings to fetch.
     */
    where: GeneralSettingsWhereUniqueInput
  }

  /**
   * GeneralSettings findUniqueOrThrow
   */
  export type GeneralSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralSettings
     */
    select?: GeneralSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralSettings
     */
    omit?: GeneralSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneralSettingsInclude<ExtArgs> | null
    /**
     * Filter, which GeneralSettings to fetch.
     */
    where: GeneralSettingsWhereUniqueInput
  }

  /**
   * GeneralSettings findFirst
   */
  export type GeneralSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralSettings
     */
    select?: GeneralSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralSettings
     */
    omit?: GeneralSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneralSettingsInclude<ExtArgs> | null
    /**
     * Filter, which GeneralSettings to fetch.
     */
    where?: GeneralSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneralSettings to fetch.
     */
    orderBy?: GeneralSettingsOrderByWithRelationInput | GeneralSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeneralSettings.
     */
    cursor?: GeneralSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneralSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneralSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneralSettings.
     */
    distinct?: GeneralSettingsScalarFieldEnum | GeneralSettingsScalarFieldEnum[]
  }

  /**
   * GeneralSettings findFirstOrThrow
   */
  export type GeneralSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralSettings
     */
    select?: GeneralSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralSettings
     */
    omit?: GeneralSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneralSettingsInclude<ExtArgs> | null
    /**
     * Filter, which GeneralSettings to fetch.
     */
    where?: GeneralSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneralSettings to fetch.
     */
    orderBy?: GeneralSettingsOrderByWithRelationInput | GeneralSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeneralSettings.
     */
    cursor?: GeneralSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneralSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneralSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeneralSettings.
     */
    distinct?: GeneralSettingsScalarFieldEnum | GeneralSettingsScalarFieldEnum[]
  }

  /**
   * GeneralSettings findMany
   */
  export type GeneralSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralSettings
     */
    select?: GeneralSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralSettings
     */
    omit?: GeneralSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneralSettingsInclude<ExtArgs> | null
    /**
     * Filter, which GeneralSettings to fetch.
     */
    where?: GeneralSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeneralSettings to fetch.
     */
    orderBy?: GeneralSettingsOrderByWithRelationInput | GeneralSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GeneralSettings.
     */
    cursor?: GeneralSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeneralSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeneralSettings.
     */
    skip?: number
    distinct?: GeneralSettingsScalarFieldEnum | GeneralSettingsScalarFieldEnum[]
  }

  /**
   * GeneralSettings create
   */
  export type GeneralSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralSettings
     */
    select?: GeneralSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralSettings
     */
    omit?: GeneralSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneralSettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a GeneralSettings.
     */
    data: XOR<GeneralSettingsCreateInput, GeneralSettingsUncheckedCreateInput>
  }

  /**
   * GeneralSettings createMany
   */
  export type GeneralSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GeneralSettings.
     */
    data: GeneralSettingsCreateManyInput | GeneralSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GeneralSettings createManyAndReturn
   */
  export type GeneralSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralSettings
     */
    select?: GeneralSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralSettings
     */
    omit?: GeneralSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many GeneralSettings.
     */
    data: GeneralSettingsCreateManyInput | GeneralSettingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneralSettingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GeneralSettings update
   */
  export type GeneralSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralSettings
     */
    select?: GeneralSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralSettings
     */
    omit?: GeneralSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneralSettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a GeneralSettings.
     */
    data: XOR<GeneralSettingsUpdateInput, GeneralSettingsUncheckedUpdateInput>
    /**
     * Choose, which GeneralSettings to update.
     */
    where: GeneralSettingsWhereUniqueInput
  }

  /**
   * GeneralSettings updateMany
   */
  export type GeneralSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GeneralSettings.
     */
    data: XOR<GeneralSettingsUpdateManyMutationInput, GeneralSettingsUncheckedUpdateManyInput>
    /**
     * Filter which GeneralSettings to update
     */
    where?: GeneralSettingsWhereInput
    /**
     * Limit how many GeneralSettings to update.
     */
    limit?: number
  }

  /**
   * GeneralSettings updateManyAndReturn
   */
  export type GeneralSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralSettings
     */
    select?: GeneralSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralSettings
     */
    omit?: GeneralSettingsOmit<ExtArgs> | null
    /**
     * The data used to update GeneralSettings.
     */
    data: XOR<GeneralSettingsUpdateManyMutationInput, GeneralSettingsUncheckedUpdateManyInput>
    /**
     * Filter which GeneralSettings to update
     */
    where?: GeneralSettingsWhereInput
    /**
     * Limit how many GeneralSettings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneralSettingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GeneralSettings upsert
   */
  export type GeneralSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralSettings
     */
    select?: GeneralSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralSettings
     */
    omit?: GeneralSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneralSettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the GeneralSettings to update in case it exists.
     */
    where: GeneralSettingsWhereUniqueInput
    /**
     * In case the GeneralSettings found by the `where` argument doesn't exist, create a new GeneralSettings with this data.
     */
    create: XOR<GeneralSettingsCreateInput, GeneralSettingsUncheckedCreateInput>
    /**
     * In case the GeneralSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GeneralSettingsUpdateInput, GeneralSettingsUncheckedUpdateInput>
  }

  /**
   * GeneralSettings delete
   */
  export type GeneralSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralSettings
     */
    select?: GeneralSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralSettings
     */
    omit?: GeneralSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneralSettingsInclude<ExtArgs> | null
    /**
     * Filter which GeneralSettings to delete.
     */
    where: GeneralSettingsWhereUniqueInput
  }

  /**
   * GeneralSettings deleteMany
   */
  export type GeneralSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeneralSettings to delete
     */
    where?: GeneralSettingsWhereInput
    /**
     * Limit how many GeneralSettings to delete.
     */
    limit?: number
  }

  /**
   * GeneralSettings without action
   */
  export type GeneralSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeneralSettings
     */
    select?: GeneralSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeneralSettings
     */
    omit?: GeneralSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GeneralSettingsInclude<ExtArgs> | null
  }


  /**
   * Model FtpConfig
   */

  export type AggregateFtpConfig = {
    _count: FtpConfigCountAggregateOutputType | null
    _avg: FtpConfigAvgAggregateOutputType | null
    _sum: FtpConfigSumAggregateOutputType | null
    _min: FtpConfigMinAggregateOutputType | null
    _max: FtpConfigMaxAggregateOutputType | null
  }

  export type FtpConfigAvgAggregateOutputType = {
    port: number | null
    retryDelay: number | null
  }

  export type FtpConfigSumAggregateOutputType = {
    port: number | null
    retryDelay: number | null
  }

  export type FtpConfigMinAggregateOutputType = {
    id: string | null
    shopId: string | null
    host: string | null
    port: number | null
    protocol: $Enums.Protocol | null
    username: string | null
    password: string | null
    directory: string | null
    passiveMode: boolean | null
    retryDelay: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FtpConfigMaxAggregateOutputType = {
    id: string | null
    shopId: string | null
    host: string | null
    port: number | null
    protocol: $Enums.Protocol | null
    username: string | null
    password: string | null
    directory: string | null
    passiveMode: boolean | null
    retryDelay: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FtpConfigCountAggregateOutputType = {
    id: number
    shopId: number
    host: number
    port: number
    protocol: number
    username: number
    password: number
    directory: number
    passiveMode: number
    retryDelay: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FtpConfigAvgAggregateInputType = {
    port?: true
    retryDelay?: true
  }

  export type FtpConfigSumAggregateInputType = {
    port?: true
    retryDelay?: true
  }

  export type FtpConfigMinAggregateInputType = {
    id?: true
    shopId?: true
    host?: true
    port?: true
    protocol?: true
    username?: true
    password?: true
    directory?: true
    passiveMode?: true
    retryDelay?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FtpConfigMaxAggregateInputType = {
    id?: true
    shopId?: true
    host?: true
    port?: true
    protocol?: true
    username?: true
    password?: true
    directory?: true
    passiveMode?: true
    retryDelay?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FtpConfigCountAggregateInputType = {
    id?: true
    shopId?: true
    host?: true
    port?: true
    protocol?: true
    username?: true
    password?: true
    directory?: true
    passiveMode?: true
    retryDelay?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FtpConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FtpConfig to aggregate.
     */
    where?: FtpConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FtpConfigs to fetch.
     */
    orderBy?: FtpConfigOrderByWithRelationInput | FtpConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FtpConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FtpConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FtpConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FtpConfigs
    **/
    _count?: true | FtpConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FtpConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FtpConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FtpConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FtpConfigMaxAggregateInputType
  }

  export type GetFtpConfigAggregateType<T extends FtpConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateFtpConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFtpConfig[P]>
      : GetScalarType<T[P], AggregateFtpConfig[P]>
  }




  export type FtpConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FtpConfigWhereInput
    orderBy?: FtpConfigOrderByWithAggregationInput | FtpConfigOrderByWithAggregationInput[]
    by: FtpConfigScalarFieldEnum[] | FtpConfigScalarFieldEnum
    having?: FtpConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FtpConfigCountAggregateInputType | true
    _avg?: FtpConfigAvgAggregateInputType
    _sum?: FtpConfigSumAggregateInputType
    _min?: FtpConfigMinAggregateInputType
    _max?: FtpConfigMaxAggregateInputType
  }

  export type FtpConfigGroupByOutputType = {
    id: string
    shopId: string
    host: string
    port: number
    protocol: $Enums.Protocol
    username: string
    password: string
    directory: string
    passiveMode: boolean
    retryDelay: number | null
    createdAt: Date
    updatedAt: Date
    _count: FtpConfigCountAggregateOutputType | null
    _avg: FtpConfigAvgAggregateOutputType | null
    _sum: FtpConfigSumAggregateOutputType | null
    _min: FtpConfigMinAggregateOutputType | null
    _max: FtpConfigMaxAggregateOutputType | null
  }

  type GetFtpConfigGroupByPayload<T extends FtpConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FtpConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FtpConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FtpConfigGroupByOutputType[P]>
            : GetScalarType<T[P], FtpConfigGroupByOutputType[P]>
        }
      >
    >


  export type FtpConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    host?: boolean
    port?: boolean
    protocol?: boolean
    username?: boolean
    password?: boolean
    directory?: boolean
    passiveMode?: boolean
    retryDelay?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ftpConfig"]>

  export type FtpConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    host?: boolean
    port?: boolean
    protocol?: boolean
    username?: boolean
    password?: boolean
    directory?: boolean
    passiveMode?: boolean
    retryDelay?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ftpConfig"]>

  export type FtpConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopId?: boolean
    host?: boolean
    port?: boolean
    protocol?: boolean
    username?: boolean
    password?: boolean
    directory?: boolean
    passiveMode?: boolean
    retryDelay?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ftpConfig"]>

  export type FtpConfigSelectScalar = {
    id?: boolean
    shopId?: boolean
    host?: boolean
    port?: boolean
    protocol?: boolean
    username?: boolean
    password?: boolean
    directory?: boolean
    passiveMode?: boolean
    retryDelay?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FtpConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shopId" | "host" | "port" | "protocol" | "username" | "password" | "directory" | "passiveMode" | "retryDelay" | "createdAt" | "updatedAt", ExtArgs["result"]["ftpConfig"]>
  export type FtpConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }
  export type FtpConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }
  export type FtpConfigIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }

  export type $FtpConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FtpConfig"
    objects: {
      shop: Prisma.$ShopPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopId: string
      host: string
      port: number
      protocol: $Enums.Protocol
      username: string
      password: string
      directory: string
      passiveMode: boolean
      retryDelay: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ftpConfig"]>
    composites: {}
  }

  type FtpConfigGetPayload<S extends boolean | null | undefined | FtpConfigDefaultArgs> = $Result.GetResult<Prisma.$FtpConfigPayload, S>

  type FtpConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FtpConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FtpConfigCountAggregateInputType | true
    }

  export interface FtpConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FtpConfig'], meta: { name: 'FtpConfig' } }
    /**
     * Find zero or one FtpConfig that matches the filter.
     * @param {FtpConfigFindUniqueArgs} args - Arguments to find a FtpConfig
     * @example
     * // Get one FtpConfig
     * const ftpConfig = await prisma.ftpConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FtpConfigFindUniqueArgs>(args: SelectSubset<T, FtpConfigFindUniqueArgs<ExtArgs>>): Prisma__FtpConfigClient<$Result.GetResult<Prisma.$FtpConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FtpConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FtpConfigFindUniqueOrThrowArgs} args - Arguments to find a FtpConfig
     * @example
     * // Get one FtpConfig
     * const ftpConfig = await prisma.ftpConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FtpConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, FtpConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FtpConfigClient<$Result.GetResult<Prisma.$FtpConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FtpConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FtpConfigFindFirstArgs} args - Arguments to find a FtpConfig
     * @example
     * // Get one FtpConfig
     * const ftpConfig = await prisma.ftpConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FtpConfigFindFirstArgs>(args?: SelectSubset<T, FtpConfigFindFirstArgs<ExtArgs>>): Prisma__FtpConfigClient<$Result.GetResult<Prisma.$FtpConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FtpConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FtpConfigFindFirstOrThrowArgs} args - Arguments to find a FtpConfig
     * @example
     * // Get one FtpConfig
     * const ftpConfig = await prisma.ftpConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FtpConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, FtpConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__FtpConfigClient<$Result.GetResult<Prisma.$FtpConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FtpConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FtpConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FtpConfigs
     * const ftpConfigs = await prisma.ftpConfig.findMany()
     * 
     * // Get first 10 FtpConfigs
     * const ftpConfigs = await prisma.ftpConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ftpConfigWithIdOnly = await prisma.ftpConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FtpConfigFindManyArgs>(args?: SelectSubset<T, FtpConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FtpConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FtpConfig.
     * @param {FtpConfigCreateArgs} args - Arguments to create a FtpConfig.
     * @example
     * // Create one FtpConfig
     * const FtpConfig = await prisma.ftpConfig.create({
     *   data: {
     *     // ... data to create a FtpConfig
     *   }
     * })
     * 
     */
    create<T extends FtpConfigCreateArgs>(args: SelectSubset<T, FtpConfigCreateArgs<ExtArgs>>): Prisma__FtpConfigClient<$Result.GetResult<Prisma.$FtpConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FtpConfigs.
     * @param {FtpConfigCreateManyArgs} args - Arguments to create many FtpConfigs.
     * @example
     * // Create many FtpConfigs
     * const ftpConfig = await prisma.ftpConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FtpConfigCreateManyArgs>(args?: SelectSubset<T, FtpConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FtpConfigs and returns the data saved in the database.
     * @param {FtpConfigCreateManyAndReturnArgs} args - Arguments to create many FtpConfigs.
     * @example
     * // Create many FtpConfigs
     * const ftpConfig = await prisma.ftpConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FtpConfigs and only return the `id`
     * const ftpConfigWithIdOnly = await prisma.ftpConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FtpConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, FtpConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FtpConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FtpConfig.
     * @param {FtpConfigDeleteArgs} args - Arguments to delete one FtpConfig.
     * @example
     * // Delete one FtpConfig
     * const FtpConfig = await prisma.ftpConfig.delete({
     *   where: {
     *     // ... filter to delete one FtpConfig
     *   }
     * })
     * 
     */
    delete<T extends FtpConfigDeleteArgs>(args: SelectSubset<T, FtpConfigDeleteArgs<ExtArgs>>): Prisma__FtpConfigClient<$Result.GetResult<Prisma.$FtpConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FtpConfig.
     * @param {FtpConfigUpdateArgs} args - Arguments to update one FtpConfig.
     * @example
     * // Update one FtpConfig
     * const ftpConfig = await prisma.ftpConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FtpConfigUpdateArgs>(args: SelectSubset<T, FtpConfigUpdateArgs<ExtArgs>>): Prisma__FtpConfigClient<$Result.GetResult<Prisma.$FtpConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FtpConfigs.
     * @param {FtpConfigDeleteManyArgs} args - Arguments to filter FtpConfigs to delete.
     * @example
     * // Delete a few FtpConfigs
     * const { count } = await prisma.ftpConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FtpConfigDeleteManyArgs>(args?: SelectSubset<T, FtpConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FtpConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FtpConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FtpConfigs
     * const ftpConfig = await prisma.ftpConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FtpConfigUpdateManyArgs>(args: SelectSubset<T, FtpConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FtpConfigs and returns the data updated in the database.
     * @param {FtpConfigUpdateManyAndReturnArgs} args - Arguments to update many FtpConfigs.
     * @example
     * // Update many FtpConfigs
     * const ftpConfig = await prisma.ftpConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FtpConfigs and only return the `id`
     * const ftpConfigWithIdOnly = await prisma.ftpConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FtpConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, FtpConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FtpConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FtpConfig.
     * @param {FtpConfigUpsertArgs} args - Arguments to update or create a FtpConfig.
     * @example
     * // Update or create a FtpConfig
     * const ftpConfig = await prisma.ftpConfig.upsert({
     *   create: {
     *     // ... data to create a FtpConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FtpConfig we want to update
     *   }
     * })
     */
    upsert<T extends FtpConfigUpsertArgs>(args: SelectSubset<T, FtpConfigUpsertArgs<ExtArgs>>): Prisma__FtpConfigClient<$Result.GetResult<Prisma.$FtpConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FtpConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FtpConfigCountArgs} args - Arguments to filter FtpConfigs to count.
     * @example
     * // Count the number of FtpConfigs
     * const count = await prisma.ftpConfig.count({
     *   where: {
     *     // ... the filter for the FtpConfigs we want to count
     *   }
     * })
    **/
    count<T extends FtpConfigCountArgs>(
      args?: Subset<T, FtpConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FtpConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FtpConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FtpConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FtpConfigAggregateArgs>(args: Subset<T, FtpConfigAggregateArgs>): Prisma.PrismaPromise<GetFtpConfigAggregateType<T>>

    /**
     * Group by FtpConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FtpConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FtpConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FtpConfigGroupByArgs['orderBy'] }
        : { orderBy?: FtpConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FtpConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFtpConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FtpConfig model
   */
  readonly fields: FtpConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FtpConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FtpConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shop<T extends ShopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopDefaultArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FtpConfig model
   */
  interface FtpConfigFieldRefs {
    readonly id: FieldRef<"FtpConfig", 'String'>
    readonly shopId: FieldRef<"FtpConfig", 'String'>
    readonly host: FieldRef<"FtpConfig", 'String'>
    readonly port: FieldRef<"FtpConfig", 'Int'>
    readonly protocol: FieldRef<"FtpConfig", 'Protocol'>
    readonly username: FieldRef<"FtpConfig", 'String'>
    readonly password: FieldRef<"FtpConfig", 'String'>
    readonly directory: FieldRef<"FtpConfig", 'String'>
    readonly passiveMode: FieldRef<"FtpConfig", 'Boolean'>
    readonly retryDelay: FieldRef<"FtpConfig", 'Int'>
    readonly createdAt: FieldRef<"FtpConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"FtpConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FtpConfig findUnique
   */
  export type FtpConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FtpConfig
     */
    select?: FtpConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FtpConfig
     */
    omit?: FtpConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FtpConfigInclude<ExtArgs> | null
    /**
     * Filter, which FtpConfig to fetch.
     */
    where: FtpConfigWhereUniqueInput
  }

  /**
   * FtpConfig findUniqueOrThrow
   */
  export type FtpConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FtpConfig
     */
    select?: FtpConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FtpConfig
     */
    omit?: FtpConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FtpConfigInclude<ExtArgs> | null
    /**
     * Filter, which FtpConfig to fetch.
     */
    where: FtpConfigWhereUniqueInput
  }

  /**
   * FtpConfig findFirst
   */
  export type FtpConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FtpConfig
     */
    select?: FtpConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FtpConfig
     */
    omit?: FtpConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FtpConfigInclude<ExtArgs> | null
    /**
     * Filter, which FtpConfig to fetch.
     */
    where?: FtpConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FtpConfigs to fetch.
     */
    orderBy?: FtpConfigOrderByWithRelationInput | FtpConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FtpConfigs.
     */
    cursor?: FtpConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FtpConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FtpConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FtpConfigs.
     */
    distinct?: FtpConfigScalarFieldEnum | FtpConfigScalarFieldEnum[]
  }

  /**
   * FtpConfig findFirstOrThrow
   */
  export type FtpConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FtpConfig
     */
    select?: FtpConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FtpConfig
     */
    omit?: FtpConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FtpConfigInclude<ExtArgs> | null
    /**
     * Filter, which FtpConfig to fetch.
     */
    where?: FtpConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FtpConfigs to fetch.
     */
    orderBy?: FtpConfigOrderByWithRelationInput | FtpConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FtpConfigs.
     */
    cursor?: FtpConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FtpConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FtpConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FtpConfigs.
     */
    distinct?: FtpConfigScalarFieldEnum | FtpConfigScalarFieldEnum[]
  }

  /**
   * FtpConfig findMany
   */
  export type FtpConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FtpConfig
     */
    select?: FtpConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FtpConfig
     */
    omit?: FtpConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FtpConfigInclude<ExtArgs> | null
    /**
     * Filter, which FtpConfigs to fetch.
     */
    where?: FtpConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FtpConfigs to fetch.
     */
    orderBy?: FtpConfigOrderByWithRelationInput | FtpConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FtpConfigs.
     */
    cursor?: FtpConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FtpConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FtpConfigs.
     */
    skip?: number
    distinct?: FtpConfigScalarFieldEnum | FtpConfigScalarFieldEnum[]
  }

  /**
   * FtpConfig create
   */
  export type FtpConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FtpConfig
     */
    select?: FtpConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FtpConfig
     */
    omit?: FtpConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FtpConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a FtpConfig.
     */
    data: XOR<FtpConfigCreateInput, FtpConfigUncheckedCreateInput>
  }

  /**
   * FtpConfig createMany
   */
  export type FtpConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FtpConfigs.
     */
    data: FtpConfigCreateManyInput | FtpConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FtpConfig createManyAndReturn
   */
  export type FtpConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FtpConfig
     */
    select?: FtpConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FtpConfig
     */
    omit?: FtpConfigOmit<ExtArgs> | null
    /**
     * The data used to create many FtpConfigs.
     */
    data: FtpConfigCreateManyInput | FtpConfigCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FtpConfigIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FtpConfig update
   */
  export type FtpConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FtpConfig
     */
    select?: FtpConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FtpConfig
     */
    omit?: FtpConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FtpConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a FtpConfig.
     */
    data: XOR<FtpConfigUpdateInput, FtpConfigUncheckedUpdateInput>
    /**
     * Choose, which FtpConfig to update.
     */
    where: FtpConfigWhereUniqueInput
  }

  /**
   * FtpConfig updateMany
   */
  export type FtpConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FtpConfigs.
     */
    data: XOR<FtpConfigUpdateManyMutationInput, FtpConfigUncheckedUpdateManyInput>
    /**
     * Filter which FtpConfigs to update
     */
    where?: FtpConfigWhereInput
    /**
     * Limit how many FtpConfigs to update.
     */
    limit?: number
  }

  /**
   * FtpConfig updateManyAndReturn
   */
  export type FtpConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FtpConfig
     */
    select?: FtpConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FtpConfig
     */
    omit?: FtpConfigOmit<ExtArgs> | null
    /**
     * The data used to update FtpConfigs.
     */
    data: XOR<FtpConfigUpdateManyMutationInput, FtpConfigUncheckedUpdateManyInput>
    /**
     * Filter which FtpConfigs to update
     */
    where?: FtpConfigWhereInput
    /**
     * Limit how many FtpConfigs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FtpConfigIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FtpConfig upsert
   */
  export type FtpConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FtpConfig
     */
    select?: FtpConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FtpConfig
     */
    omit?: FtpConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FtpConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the FtpConfig to update in case it exists.
     */
    where: FtpConfigWhereUniqueInput
    /**
     * In case the FtpConfig found by the `where` argument doesn't exist, create a new FtpConfig with this data.
     */
    create: XOR<FtpConfigCreateInput, FtpConfigUncheckedCreateInput>
    /**
     * In case the FtpConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FtpConfigUpdateInput, FtpConfigUncheckedUpdateInput>
  }

  /**
   * FtpConfig delete
   */
  export type FtpConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FtpConfig
     */
    select?: FtpConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FtpConfig
     */
    omit?: FtpConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FtpConfigInclude<ExtArgs> | null
    /**
     * Filter which FtpConfig to delete.
     */
    where: FtpConfigWhereUniqueInput
  }

  /**
   * FtpConfig deleteMany
   */
  export type FtpConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FtpConfigs to delete
     */
    where?: FtpConfigWhereInput
    /**
     * Limit how many FtpConfigs to delete.
     */
    limit?: number
  }

  /**
   * FtpConfig without action
   */
  export type FtpConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FtpConfig
     */
    select?: FtpConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FtpConfig
     */
    omit?: FtpConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FtpConfigInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SessionScalarFieldEnum: {
    id: 'id',
    shop: 'shop',
    state: 'state',
    isOnline: 'isOnline',
    scope: 'scope',
    expires: 'expires',
    accessToken: 'accessToken',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    accountOwner: 'accountOwner',
    locale: 'locale',
    collaborator: 'collaborator',
    emailVerified: 'emailVerified'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const ShopScalarFieldEnum: {
    id: 'id',
    shopifyDomain: 'shopifyDomain',
    accessToken: 'accessToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ShopScalarFieldEnum = (typeof ShopScalarFieldEnum)[keyof typeof ShopScalarFieldEnum]


  export const FiscalConfigurationScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    code: 'code',
    name: 'name',
    description: 'description',
    countries: 'countries',
    currency: 'currency',
    fileFormat: 'fileFormat',
    encoding: 'encoding',
    separator: 'separator',
    requiredColumns: 'requiredColumns',
    taxRates: 'taxRates',
    compatibleSoftware: 'compatibleSoftware',
    exportFormats: 'exportFormats',
    notes: 'notes',
    companyName: 'companyName',
    country: 'country',
    vatRate: 'vatRate',
    defaultFormat: 'defaultFormat',
    salesAccount: 'salesAccount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FiscalConfigurationScalarFieldEnum = (typeof FiscalConfigurationScalarFieldEnum)[keyof typeof FiscalConfigurationScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    type: 'type',
    dataType: 'dataType',
    status: 'status',
    format: 'format',
    startDate: 'startDate',
    endDate: 'endDate',
    shopId: 'shopId',
    fileSize: 'fileSize',
    fileName: 'fileName',
    filePath: 'filePath',
    errorMessage: 'errorMessage',
    deliveryMethod: 'deliveryMethod',
    ftpDeliveryStatus: 'ftpDeliveryStatus',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const ScheduledTaskScalarFieldEnum: {
    id: 'id',
    reportId: 'reportId',
    shopId: 'shopId',
    frequency: 'frequency',
    executionDay: 'executionDay',
    executionTime: 'executionTime',
    emailConfig: 'emailConfig',
    lastRun: 'lastRun',
    nextRun: 'nextRun',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ScheduledTaskScalarFieldEnum = (typeof ScheduledTaskScalarFieldEnum)[keyof typeof ScheduledTaskScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    scheduledTaskId: 'scheduledTaskId',
    shopId: 'shopId',
    reportId: 'reportId',
    status: 'status',
    scheduledFor: 'scheduledFor',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    emailConfig: 'emailConfig',
    errorMessage: 'errorMessage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const GeneralSettingsScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    timezone: 'timezone',
    language: 'language',
    salesAccount: 'salesAccount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GeneralSettingsScalarFieldEnum = (typeof GeneralSettingsScalarFieldEnum)[keyof typeof GeneralSettingsScalarFieldEnum]


  export const FtpConfigScalarFieldEnum: {
    id: 'id',
    shopId: 'shopId',
    host: 'host',
    port: 'port',
    protocol: 'protocol',
    username: 'username',
    password: 'password',
    directory: 'directory',
    passiveMode: 'passiveMode',
    retryDelay: 'retryDelay',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FtpConfigScalarFieldEnum = (typeof FtpConfigScalarFieldEnum)[keyof typeof FtpConfigScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'ExportFormat'
   */
  export type EnumExportFormatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExportFormat'>
    


  /**
   * Reference to a field of type 'ExportFormat[]'
   */
  export type ListEnumExportFormatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExportFormat[]'>
    


  /**
   * Reference to a field of type 'ReportStatus'
   */
  export type EnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus'>
    


  /**
   * Reference to a field of type 'ReportStatus[]'
   */
  export type ListEnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'FtpDeliveryStatus'
   */
  export type EnumFtpDeliveryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FtpDeliveryStatus'>
    


  /**
   * Reference to a field of type 'FtpDeliveryStatus[]'
   */
  export type ListEnumFtpDeliveryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FtpDeliveryStatus[]'>
    


  /**
   * Reference to a field of type 'Protocol'
   */
  export type EnumProtocolFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Protocol'>
    


  /**
   * Reference to a field of type 'Protocol[]'
   */
  export type ListEnumProtocolFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Protocol[]'>
    
  /**
   * Deep Input Types
   */


  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    shop?: StringFilter<"Session"> | string
    state?: StringFilter<"Session"> | string
    isOnline?: BoolFilter<"Session"> | boolean
    scope?: StringNullableFilter<"Session"> | string | null
    expires?: DateTimeNullableFilter<"Session"> | Date | string | null
    accessToken?: StringFilter<"Session"> | string
    userId?: BigIntNullableFilter<"Session"> | bigint | number | null
    firstName?: StringNullableFilter<"Session"> | string | null
    lastName?: StringNullableFilter<"Session"> | string | null
    email?: StringNullableFilter<"Session"> | string | null
    accountOwner?: BoolFilter<"Session"> | boolean
    locale?: StringNullableFilter<"Session"> | string | null
    collaborator?: BoolNullableFilter<"Session"> | boolean | null
    emailVerified?: BoolNullableFilter<"Session"> | boolean | null
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrderInput | SortOrder
    expires?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    userId?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    accountOwner?: SortOrder
    locale?: SortOrderInput | SortOrder
    collaborator?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    shop?: StringFilter<"Session"> | string
    state?: StringFilter<"Session"> | string
    isOnline?: BoolFilter<"Session"> | boolean
    scope?: StringNullableFilter<"Session"> | string | null
    expires?: DateTimeNullableFilter<"Session"> | Date | string | null
    accessToken?: StringFilter<"Session"> | string
    userId?: BigIntNullableFilter<"Session"> | bigint | number | null
    firstName?: StringNullableFilter<"Session"> | string | null
    lastName?: StringNullableFilter<"Session"> | string | null
    email?: StringNullableFilter<"Session"> | string | null
    accountOwner?: BoolFilter<"Session"> | boolean
    locale?: StringNullableFilter<"Session"> | string | null
    collaborator?: BoolNullableFilter<"Session"> | boolean | null
    emailVerified?: BoolNullableFilter<"Session"> | boolean | null
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrderInput | SortOrder
    expires?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    userId?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    accountOwner?: SortOrder
    locale?: SortOrderInput | SortOrder
    collaborator?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    shop?: StringWithAggregatesFilter<"Session"> | string
    state?: StringWithAggregatesFilter<"Session"> | string
    isOnline?: BoolWithAggregatesFilter<"Session"> | boolean
    scope?: StringNullableWithAggregatesFilter<"Session"> | string | null
    expires?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    accessToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: BigIntNullableWithAggregatesFilter<"Session"> | bigint | number | null
    firstName?: StringNullableWithAggregatesFilter<"Session"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"Session"> | string | null
    email?: StringNullableWithAggregatesFilter<"Session"> | string | null
    accountOwner?: BoolWithAggregatesFilter<"Session"> | boolean
    locale?: StringNullableWithAggregatesFilter<"Session"> | string | null
    collaborator?: BoolNullableWithAggregatesFilter<"Session"> | boolean | null
    emailVerified?: BoolNullableWithAggregatesFilter<"Session"> | boolean | null
  }

  export type ShopWhereInput = {
    AND?: ShopWhereInput | ShopWhereInput[]
    OR?: ShopWhereInput[]
    NOT?: ShopWhereInput | ShopWhereInput[]
    id?: StringFilter<"Shop"> | string
    shopifyDomain?: StringFilter<"Shop"> | string
    accessToken?: StringFilter<"Shop"> | string
    createdAt?: DateTimeFilter<"Shop"> | Date | string
    updatedAt?: DateTimeFilter<"Shop"> | Date | string
    fiscalConfig?: XOR<FiscalConfigurationNullableScalarRelationFilter, FiscalConfigurationWhereInput> | null
    reports?: ReportListRelationFilter
    generalSettings?: XOR<GeneralSettingsNullableScalarRelationFilter, GeneralSettingsWhereInput> | null
    ftpConfig?: XOR<FtpConfigNullableScalarRelationFilter, FtpConfigWhereInput> | null
    scheduledTasks?: ScheduledTaskListRelationFilter
    tasks?: TaskListRelationFilter
  }

  export type ShopOrderByWithRelationInput = {
    id?: SortOrder
    shopifyDomain?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fiscalConfig?: FiscalConfigurationOrderByWithRelationInput
    reports?: ReportOrderByRelationAggregateInput
    generalSettings?: GeneralSettingsOrderByWithRelationInput
    ftpConfig?: FtpConfigOrderByWithRelationInput
    scheduledTasks?: ScheduledTaskOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
  }

  export type ShopWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shopifyDomain?: string
    AND?: ShopWhereInput | ShopWhereInput[]
    OR?: ShopWhereInput[]
    NOT?: ShopWhereInput | ShopWhereInput[]
    accessToken?: StringFilter<"Shop"> | string
    createdAt?: DateTimeFilter<"Shop"> | Date | string
    updatedAt?: DateTimeFilter<"Shop"> | Date | string
    fiscalConfig?: XOR<FiscalConfigurationNullableScalarRelationFilter, FiscalConfigurationWhereInput> | null
    reports?: ReportListRelationFilter
    generalSettings?: XOR<GeneralSettingsNullableScalarRelationFilter, GeneralSettingsWhereInput> | null
    ftpConfig?: XOR<FtpConfigNullableScalarRelationFilter, FtpConfigWhereInput> | null
    scheduledTasks?: ScheduledTaskListRelationFilter
    tasks?: TaskListRelationFilter
  }, "id" | "shopifyDomain">

  export type ShopOrderByWithAggregationInput = {
    id?: SortOrder
    shopifyDomain?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShopCountOrderByAggregateInput
    _max?: ShopMaxOrderByAggregateInput
    _min?: ShopMinOrderByAggregateInput
  }

  export type ShopScalarWhereWithAggregatesInput = {
    AND?: ShopScalarWhereWithAggregatesInput | ShopScalarWhereWithAggregatesInput[]
    OR?: ShopScalarWhereWithAggregatesInput[]
    NOT?: ShopScalarWhereWithAggregatesInput | ShopScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Shop"> | string
    shopifyDomain?: StringWithAggregatesFilter<"Shop"> | string
    accessToken?: StringWithAggregatesFilter<"Shop"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Shop"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Shop"> | Date | string
  }

  export type FiscalConfigurationWhereInput = {
    AND?: FiscalConfigurationWhereInput | FiscalConfigurationWhereInput[]
    OR?: FiscalConfigurationWhereInput[]
    NOT?: FiscalConfigurationWhereInput | FiscalConfigurationWhereInput[]
    id?: StringFilter<"FiscalConfiguration"> | string
    shopId?: StringFilter<"FiscalConfiguration"> | string
    code?: StringFilter<"FiscalConfiguration"> | string
    name?: StringFilter<"FiscalConfiguration"> | string
    description?: StringFilter<"FiscalConfiguration"> | string
    countries?: StringNullableListFilter<"FiscalConfiguration">
    currency?: StringFilter<"FiscalConfiguration"> | string
    fileFormat?: StringFilter<"FiscalConfiguration"> | string
    encoding?: StringFilter<"FiscalConfiguration"> | string
    separator?: StringFilter<"FiscalConfiguration"> | string
    requiredColumns?: StringNullableListFilter<"FiscalConfiguration">
    taxRates?: JsonFilter<"FiscalConfiguration">
    compatibleSoftware?: StringNullableListFilter<"FiscalConfiguration">
    exportFormats?: StringNullableListFilter<"FiscalConfiguration">
    notes?: StringFilter<"FiscalConfiguration"> | string
    companyName?: StringNullableFilter<"FiscalConfiguration"> | string | null
    country?: StringNullableFilter<"FiscalConfiguration"> | string | null
    vatRate?: FloatNullableFilter<"FiscalConfiguration"> | number | null
    defaultFormat?: EnumExportFormatNullableFilter<"FiscalConfiguration"> | $Enums.ExportFormat | null
    salesAccount?: StringFilter<"FiscalConfiguration"> | string
    createdAt?: DateTimeFilter<"FiscalConfiguration"> | Date | string
    updatedAt?: DateTimeFilter<"FiscalConfiguration"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
  }

  export type FiscalConfigurationOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    countries?: SortOrder
    currency?: SortOrder
    fileFormat?: SortOrder
    encoding?: SortOrder
    separator?: SortOrder
    requiredColumns?: SortOrder
    taxRates?: SortOrder
    compatibleSoftware?: SortOrder
    exportFormats?: SortOrder
    notes?: SortOrder
    companyName?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    vatRate?: SortOrderInput | SortOrder
    defaultFormat?: SortOrderInput | SortOrder
    salesAccount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shop?: ShopOrderByWithRelationInput
  }

  export type FiscalConfigurationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shopId?: string
    AND?: FiscalConfigurationWhereInput | FiscalConfigurationWhereInput[]
    OR?: FiscalConfigurationWhereInput[]
    NOT?: FiscalConfigurationWhereInput | FiscalConfigurationWhereInput[]
    code?: StringFilter<"FiscalConfiguration"> | string
    name?: StringFilter<"FiscalConfiguration"> | string
    description?: StringFilter<"FiscalConfiguration"> | string
    countries?: StringNullableListFilter<"FiscalConfiguration">
    currency?: StringFilter<"FiscalConfiguration"> | string
    fileFormat?: StringFilter<"FiscalConfiguration"> | string
    encoding?: StringFilter<"FiscalConfiguration"> | string
    separator?: StringFilter<"FiscalConfiguration"> | string
    requiredColumns?: StringNullableListFilter<"FiscalConfiguration">
    taxRates?: JsonFilter<"FiscalConfiguration">
    compatibleSoftware?: StringNullableListFilter<"FiscalConfiguration">
    exportFormats?: StringNullableListFilter<"FiscalConfiguration">
    notes?: StringFilter<"FiscalConfiguration"> | string
    companyName?: StringNullableFilter<"FiscalConfiguration"> | string | null
    country?: StringNullableFilter<"FiscalConfiguration"> | string | null
    vatRate?: FloatNullableFilter<"FiscalConfiguration"> | number | null
    defaultFormat?: EnumExportFormatNullableFilter<"FiscalConfiguration"> | $Enums.ExportFormat | null
    salesAccount?: StringFilter<"FiscalConfiguration"> | string
    createdAt?: DateTimeFilter<"FiscalConfiguration"> | Date | string
    updatedAt?: DateTimeFilter<"FiscalConfiguration"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
  }, "id" | "shopId">

  export type FiscalConfigurationOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    countries?: SortOrder
    currency?: SortOrder
    fileFormat?: SortOrder
    encoding?: SortOrder
    separator?: SortOrder
    requiredColumns?: SortOrder
    taxRates?: SortOrder
    compatibleSoftware?: SortOrder
    exportFormats?: SortOrder
    notes?: SortOrder
    companyName?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    vatRate?: SortOrderInput | SortOrder
    defaultFormat?: SortOrderInput | SortOrder
    salesAccount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FiscalConfigurationCountOrderByAggregateInput
    _avg?: FiscalConfigurationAvgOrderByAggregateInput
    _max?: FiscalConfigurationMaxOrderByAggregateInput
    _min?: FiscalConfigurationMinOrderByAggregateInput
    _sum?: FiscalConfigurationSumOrderByAggregateInput
  }

  export type FiscalConfigurationScalarWhereWithAggregatesInput = {
    AND?: FiscalConfigurationScalarWhereWithAggregatesInput | FiscalConfigurationScalarWhereWithAggregatesInput[]
    OR?: FiscalConfigurationScalarWhereWithAggregatesInput[]
    NOT?: FiscalConfigurationScalarWhereWithAggregatesInput | FiscalConfigurationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FiscalConfiguration"> | string
    shopId?: StringWithAggregatesFilter<"FiscalConfiguration"> | string
    code?: StringWithAggregatesFilter<"FiscalConfiguration"> | string
    name?: StringWithAggregatesFilter<"FiscalConfiguration"> | string
    description?: StringWithAggregatesFilter<"FiscalConfiguration"> | string
    countries?: StringNullableListFilter<"FiscalConfiguration">
    currency?: StringWithAggregatesFilter<"FiscalConfiguration"> | string
    fileFormat?: StringWithAggregatesFilter<"FiscalConfiguration"> | string
    encoding?: StringWithAggregatesFilter<"FiscalConfiguration"> | string
    separator?: StringWithAggregatesFilter<"FiscalConfiguration"> | string
    requiredColumns?: StringNullableListFilter<"FiscalConfiguration">
    taxRates?: JsonWithAggregatesFilter<"FiscalConfiguration">
    compatibleSoftware?: StringNullableListFilter<"FiscalConfiguration">
    exportFormats?: StringNullableListFilter<"FiscalConfiguration">
    notes?: StringWithAggregatesFilter<"FiscalConfiguration"> | string
    companyName?: StringNullableWithAggregatesFilter<"FiscalConfiguration"> | string | null
    country?: StringNullableWithAggregatesFilter<"FiscalConfiguration"> | string | null
    vatRate?: FloatNullableWithAggregatesFilter<"FiscalConfiguration"> | number | null
    defaultFormat?: EnumExportFormatNullableWithAggregatesFilter<"FiscalConfiguration"> | $Enums.ExportFormat | null
    salesAccount?: StringWithAggregatesFilter<"FiscalConfiguration"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FiscalConfiguration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FiscalConfiguration"> | Date | string
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    id?: StringFilter<"Report"> | string
    type?: StringFilter<"Report"> | string
    dataType?: StringFilter<"Report"> | string
    status?: EnumReportStatusFilter<"Report"> | $Enums.ReportStatus
    format?: EnumExportFormatFilter<"Report"> | $Enums.ExportFormat
    startDate?: DateTimeNullableFilter<"Report"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Report"> | Date | string | null
    shopId?: StringFilter<"Report"> | string
    fileSize?: IntFilter<"Report"> | number
    fileName?: StringFilter<"Report"> | string
    filePath?: StringNullableFilter<"Report"> | string | null
    errorMessage?: StringNullableFilter<"Report"> | string | null
    deliveryMethod?: StringFilter<"Report"> | string
    ftpDeliveryStatus?: EnumFtpDeliveryStatusNullableFilter<"Report"> | $Enums.FtpDeliveryStatus | null
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    scheduledTasks?: ScheduledTaskListRelationFilter
    tasks?: TaskListRelationFilter
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    dataType?: SortOrder
    status?: SortOrder
    format?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    shopId?: SortOrder
    fileSize?: SortOrder
    fileName?: SortOrder
    filePath?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    deliveryMethod?: SortOrder
    ftpDeliveryStatus?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shop?: ShopOrderByWithRelationInput
    scheduledTasks?: ScheduledTaskOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    type?: StringFilter<"Report"> | string
    dataType?: StringFilter<"Report"> | string
    status?: EnumReportStatusFilter<"Report"> | $Enums.ReportStatus
    format?: EnumExportFormatFilter<"Report"> | $Enums.ExportFormat
    startDate?: DateTimeNullableFilter<"Report"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Report"> | Date | string | null
    shopId?: StringFilter<"Report"> | string
    fileSize?: IntFilter<"Report"> | number
    fileName?: StringFilter<"Report"> | string
    filePath?: StringNullableFilter<"Report"> | string | null
    errorMessage?: StringNullableFilter<"Report"> | string | null
    deliveryMethod?: StringFilter<"Report"> | string
    ftpDeliveryStatus?: EnumFtpDeliveryStatusNullableFilter<"Report"> | $Enums.FtpDeliveryStatus | null
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    scheduledTasks?: ScheduledTaskListRelationFilter
    tasks?: TaskListRelationFilter
  }, "id">

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    dataType?: SortOrder
    status?: SortOrder
    format?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    shopId?: SortOrder
    fileSize?: SortOrder
    fileName?: SortOrder
    filePath?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    deliveryMethod?: SortOrder
    ftpDeliveryStatus?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _avg?: ReportAvgOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
    _sum?: ReportSumOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Report"> | string
    type?: StringWithAggregatesFilter<"Report"> | string
    dataType?: StringWithAggregatesFilter<"Report"> | string
    status?: EnumReportStatusWithAggregatesFilter<"Report"> | $Enums.ReportStatus
    format?: EnumExportFormatWithAggregatesFilter<"Report"> | $Enums.ExportFormat
    startDate?: DateTimeNullableWithAggregatesFilter<"Report"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"Report"> | Date | string | null
    shopId?: StringWithAggregatesFilter<"Report"> | string
    fileSize?: IntWithAggregatesFilter<"Report"> | number
    fileName?: StringWithAggregatesFilter<"Report"> | string
    filePath?: StringNullableWithAggregatesFilter<"Report"> | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"Report"> | string | null
    deliveryMethod?: StringWithAggregatesFilter<"Report"> | string
    ftpDeliveryStatus?: EnumFtpDeliveryStatusNullableWithAggregatesFilter<"Report"> | $Enums.FtpDeliveryStatus | null
    createdAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
  }

  export type ScheduledTaskWhereInput = {
    AND?: ScheduledTaskWhereInput | ScheduledTaskWhereInput[]
    OR?: ScheduledTaskWhereInput[]
    NOT?: ScheduledTaskWhereInput | ScheduledTaskWhereInput[]
    id?: StringFilter<"ScheduledTask"> | string
    reportId?: StringFilter<"ScheduledTask"> | string
    shopId?: StringFilter<"ScheduledTask"> | string
    frequency?: StringFilter<"ScheduledTask"> | string
    executionDay?: IntFilter<"ScheduledTask"> | number
    executionTime?: StringFilter<"ScheduledTask"> | string
    emailConfig?: StringFilter<"ScheduledTask"> | string
    lastRun?: DateTimeNullableFilter<"ScheduledTask"> | Date | string | null
    nextRun?: DateTimeFilter<"ScheduledTask"> | Date | string
    status?: StringFilter<"ScheduledTask"> | string
    createdAt?: DateTimeFilter<"ScheduledTask"> | Date | string
    updatedAt?: DateTimeFilter<"ScheduledTask"> | Date | string
    report?: XOR<ReportScalarRelationFilter, ReportWhereInput>
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    tasks?: TaskListRelationFilter
  }

  export type ScheduledTaskOrderByWithRelationInput = {
    id?: SortOrder
    reportId?: SortOrder
    shopId?: SortOrder
    frequency?: SortOrder
    executionDay?: SortOrder
    executionTime?: SortOrder
    emailConfig?: SortOrder
    lastRun?: SortOrderInput | SortOrder
    nextRun?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    report?: ReportOrderByWithRelationInput
    shop?: ShopOrderByWithRelationInput
    tasks?: TaskOrderByRelationAggregateInput
  }

  export type ScheduledTaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScheduledTaskWhereInput | ScheduledTaskWhereInput[]
    OR?: ScheduledTaskWhereInput[]
    NOT?: ScheduledTaskWhereInput | ScheduledTaskWhereInput[]
    reportId?: StringFilter<"ScheduledTask"> | string
    shopId?: StringFilter<"ScheduledTask"> | string
    frequency?: StringFilter<"ScheduledTask"> | string
    executionDay?: IntFilter<"ScheduledTask"> | number
    executionTime?: StringFilter<"ScheduledTask"> | string
    emailConfig?: StringFilter<"ScheduledTask"> | string
    lastRun?: DateTimeNullableFilter<"ScheduledTask"> | Date | string | null
    nextRun?: DateTimeFilter<"ScheduledTask"> | Date | string
    status?: StringFilter<"ScheduledTask"> | string
    createdAt?: DateTimeFilter<"ScheduledTask"> | Date | string
    updatedAt?: DateTimeFilter<"ScheduledTask"> | Date | string
    report?: XOR<ReportScalarRelationFilter, ReportWhereInput>
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    tasks?: TaskListRelationFilter
  }, "id">

  export type ScheduledTaskOrderByWithAggregationInput = {
    id?: SortOrder
    reportId?: SortOrder
    shopId?: SortOrder
    frequency?: SortOrder
    executionDay?: SortOrder
    executionTime?: SortOrder
    emailConfig?: SortOrder
    lastRun?: SortOrderInput | SortOrder
    nextRun?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ScheduledTaskCountOrderByAggregateInput
    _avg?: ScheduledTaskAvgOrderByAggregateInput
    _max?: ScheduledTaskMaxOrderByAggregateInput
    _min?: ScheduledTaskMinOrderByAggregateInput
    _sum?: ScheduledTaskSumOrderByAggregateInput
  }

  export type ScheduledTaskScalarWhereWithAggregatesInput = {
    AND?: ScheduledTaskScalarWhereWithAggregatesInput | ScheduledTaskScalarWhereWithAggregatesInput[]
    OR?: ScheduledTaskScalarWhereWithAggregatesInput[]
    NOT?: ScheduledTaskScalarWhereWithAggregatesInput | ScheduledTaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ScheduledTask"> | string
    reportId?: StringWithAggregatesFilter<"ScheduledTask"> | string
    shopId?: StringWithAggregatesFilter<"ScheduledTask"> | string
    frequency?: StringWithAggregatesFilter<"ScheduledTask"> | string
    executionDay?: IntWithAggregatesFilter<"ScheduledTask"> | number
    executionTime?: StringWithAggregatesFilter<"ScheduledTask"> | string
    emailConfig?: StringWithAggregatesFilter<"ScheduledTask"> | string
    lastRun?: DateTimeNullableWithAggregatesFilter<"ScheduledTask"> | Date | string | null
    nextRun?: DateTimeWithAggregatesFilter<"ScheduledTask"> | Date | string
    status?: StringWithAggregatesFilter<"ScheduledTask"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ScheduledTask"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ScheduledTask"> | Date | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    scheduledTaskId?: StringFilter<"Task"> | string
    shopId?: StringFilter<"Task"> | string
    reportId?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    scheduledFor?: DateTimeFilter<"Task"> | Date | string
    startedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    emailConfig?: StringFilter<"Task"> | string
    errorMessage?: StringNullableFilter<"Task"> | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    scheduledTask?: XOR<ScheduledTaskScalarRelationFilter, ScheduledTaskWhereInput>
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    report?: XOR<ReportScalarRelationFilter, ReportWhereInput>
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    scheduledTaskId?: SortOrder
    shopId?: SortOrder
    reportId?: SortOrder
    status?: SortOrder
    scheduledFor?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    emailConfig?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    scheduledTask?: ScheduledTaskOrderByWithRelationInput
    shop?: ShopOrderByWithRelationInput
    report?: ReportOrderByWithRelationInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    scheduledTaskId?: StringFilter<"Task"> | string
    shopId?: StringFilter<"Task"> | string
    reportId?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    scheduledFor?: DateTimeFilter<"Task"> | Date | string
    startedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    emailConfig?: StringFilter<"Task"> | string
    errorMessage?: StringNullableFilter<"Task"> | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    scheduledTask?: XOR<ScheduledTaskScalarRelationFilter, ScheduledTaskWhereInput>
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    report?: XOR<ReportScalarRelationFilter, ReportWhereInput>
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    scheduledTaskId?: SortOrder
    shopId?: SortOrder
    reportId?: SortOrder
    status?: SortOrder
    scheduledFor?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    emailConfig?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    scheduledTaskId?: StringWithAggregatesFilter<"Task"> | string
    shopId?: StringWithAggregatesFilter<"Task"> | string
    reportId?: StringWithAggregatesFilter<"Task"> | string
    status?: StringWithAggregatesFilter<"Task"> | string
    scheduledFor?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    startedAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    emailConfig?: StringWithAggregatesFilter<"Task"> | string
    errorMessage?: StringNullableWithAggregatesFilter<"Task"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
  }

  export type GeneralSettingsWhereInput = {
    AND?: GeneralSettingsWhereInput | GeneralSettingsWhereInput[]
    OR?: GeneralSettingsWhereInput[]
    NOT?: GeneralSettingsWhereInput | GeneralSettingsWhereInput[]
    id?: StringFilter<"GeneralSettings"> | string
    shopId?: StringFilter<"GeneralSettings"> | string
    timezone?: StringFilter<"GeneralSettings"> | string
    language?: StringFilter<"GeneralSettings"> | string
    salesAccount?: StringFilter<"GeneralSettings"> | string
    createdAt?: DateTimeFilter<"GeneralSettings"> | Date | string
    updatedAt?: DateTimeFilter<"GeneralSettings"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
  }

  export type GeneralSettingsOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrder
    timezone?: SortOrder
    language?: SortOrder
    salesAccount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shop?: ShopOrderByWithRelationInput
  }

  export type GeneralSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shopId?: string
    AND?: GeneralSettingsWhereInput | GeneralSettingsWhereInput[]
    OR?: GeneralSettingsWhereInput[]
    NOT?: GeneralSettingsWhereInput | GeneralSettingsWhereInput[]
    timezone?: StringFilter<"GeneralSettings"> | string
    language?: StringFilter<"GeneralSettings"> | string
    salesAccount?: StringFilter<"GeneralSettings"> | string
    createdAt?: DateTimeFilter<"GeneralSettings"> | Date | string
    updatedAt?: DateTimeFilter<"GeneralSettings"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
  }, "id" | "shopId">

  export type GeneralSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrder
    timezone?: SortOrder
    language?: SortOrder
    salesAccount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GeneralSettingsCountOrderByAggregateInput
    _max?: GeneralSettingsMaxOrderByAggregateInput
    _min?: GeneralSettingsMinOrderByAggregateInput
  }

  export type GeneralSettingsScalarWhereWithAggregatesInput = {
    AND?: GeneralSettingsScalarWhereWithAggregatesInput | GeneralSettingsScalarWhereWithAggregatesInput[]
    OR?: GeneralSettingsScalarWhereWithAggregatesInput[]
    NOT?: GeneralSettingsScalarWhereWithAggregatesInput | GeneralSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GeneralSettings"> | string
    shopId?: StringWithAggregatesFilter<"GeneralSettings"> | string
    timezone?: StringWithAggregatesFilter<"GeneralSettings"> | string
    language?: StringWithAggregatesFilter<"GeneralSettings"> | string
    salesAccount?: StringWithAggregatesFilter<"GeneralSettings"> | string
    createdAt?: DateTimeWithAggregatesFilter<"GeneralSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GeneralSettings"> | Date | string
  }

  export type FtpConfigWhereInput = {
    AND?: FtpConfigWhereInput | FtpConfigWhereInput[]
    OR?: FtpConfigWhereInput[]
    NOT?: FtpConfigWhereInput | FtpConfigWhereInput[]
    id?: StringFilter<"FtpConfig"> | string
    shopId?: StringFilter<"FtpConfig"> | string
    host?: StringFilter<"FtpConfig"> | string
    port?: IntFilter<"FtpConfig"> | number
    protocol?: EnumProtocolFilter<"FtpConfig"> | $Enums.Protocol
    username?: StringFilter<"FtpConfig"> | string
    password?: StringFilter<"FtpConfig"> | string
    directory?: StringFilter<"FtpConfig"> | string
    passiveMode?: BoolFilter<"FtpConfig"> | boolean
    retryDelay?: IntNullableFilter<"FtpConfig"> | number | null
    createdAt?: DateTimeFilter<"FtpConfig"> | Date | string
    updatedAt?: DateTimeFilter<"FtpConfig"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
  }

  export type FtpConfigOrderByWithRelationInput = {
    id?: SortOrder
    shopId?: SortOrder
    host?: SortOrder
    port?: SortOrder
    protocol?: SortOrder
    username?: SortOrder
    password?: SortOrder
    directory?: SortOrder
    passiveMode?: SortOrder
    retryDelay?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shop?: ShopOrderByWithRelationInput
  }

  export type FtpConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shopId?: string
    AND?: FtpConfigWhereInput | FtpConfigWhereInput[]
    OR?: FtpConfigWhereInput[]
    NOT?: FtpConfigWhereInput | FtpConfigWhereInput[]
    host?: StringFilter<"FtpConfig"> | string
    port?: IntFilter<"FtpConfig"> | number
    protocol?: EnumProtocolFilter<"FtpConfig"> | $Enums.Protocol
    username?: StringFilter<"FtpConfig"> | string
    password?: StringFilter<"FtpConfig"> | string
    directory?: StringFilter<"FtpConfig"> | string
    passiveMode?: BoolFilter<"FtpConfig"> | boolean
    retryDelay?: IntNullableFilter<"FtpConfig"> | number | null
    createdAt?: DateTimeFilter<"FtpConfig"> | Date | string
    updatedAt?: DateTimeFilter<"FtpConfig"> | Date | string
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
  }, "id" | "shopId">

  export type FtpConfigOrderByWithAggregationInput = {
    id?: SortOrder
    shopId?: SortOrder
    host?: SortOrder
    port?: SortOrder
    protocol?: SortOrder
    username?: SortOrder
    password?: SortOrder
    directory?: SortOrder
    passiveMode?: SortOrder
    retryDelay?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FtpConfigCountOrderByAggregateInput
    _avg?: FtpConfigAvgOrderByAggregateInput
    _max?: FtpConfigMaxOrderByAggregateInput
    _min?: FtpConfigMinOrderByAggregateInput
    _sum?: FtpConfigSumOrderByAggregateInput
  }

  export type FtpConfigScalarWhereWithAggregatesInput = {
    AND?: FtpConfigScalarWhereWithAggregatesInput | FtpConfigScalarWhereWithAggregatesInput[]
    OR?: FtpConfigScalarWhereWithAggregatesInput[]
    NOT?: FtpConfigScalarWhereWithAggregatesInput | FtpConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FtpConfig"> | string
    shopId?: StringWithAggregatesFilter<"FtpConfig"> | string
    host?: StringWithAggregatesFilter<"FtpConfig"> | string
    port?: IntWithAggregatesFilter<"FtpConfig"> | number
    protocol?: EnumProtocolWithAggregatesFilter<"FtpConfig"> | $Enums.Protocol
    username?: StringWithAggregatesFilter<"FtpConfig"> | string
    password?: StringWithAggregatesFilter<"FtpConfig"> | string
    directory?: StringWithAggregatesFilter<"FtpConfig"> | string
    passiveMode?: BoolWithAggregatesFilter<"FtpConfig"> | boolean
    retryDelay?: IntNullableWithAggregatesFilter<"FtpConfig"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"FtpConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FtpConfig"> | Date | string
  }

  export type SessionCreateInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number | null
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
  }

  export type SessionUncheckedCreateInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number | null
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type SessionCreateManyInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number | null
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type ShopCreateInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fiscalConfig?: FiscalConfigurationCreateNestedOneWithoutShopInput
    reports?: ReportCreateNestedManyWithoutShopInput
    generalSettings?: GeneralSettingsCreateNestedOneWithoutShopInput
    ftpConfig?: FtpConfigCreateNestedOneWithoutShopInput
    scheduledTasks?: ScheduledTaskCreateNestedManyWithoutShopInput
    tasks?: TaskCreateNestedManyWithoutShopInput
  }

  export type ShopUncheckedCreateInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fiscalConfig?: FiscalConfigurationUncheckedCreateNestedOneWithoutShopInput
    reports?: ReportUncheckedCreateNestedManyWithoutShopInput
    generalSettings?: GeneralSettingsUncheckedCreateNestedOneWithoutShopInput
    ftpConfig?: FtpConfigUncheckedCreateNestedOneWithoutShopInput
    scheduledTasks?: ScheduledTaskUncheckedCreateNestedManyWithoutShopInput
    tasks?: TaskUncheckedCreateNestedManyWithoutShopInput
  }

  export type ShopUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalConfig?: FiscalConfigurationUpdateOneWithoutShopNestedInput
    reports?: ReportUpdateManyWithoutShopNestedInput
    generalSettings?: GeneralSettingsUpdateOneWithoutShopNestedInput
    ftpConfig?: FtpConfigUpdateOneWithoutShopNestedInput
    scheduledTasks?: ScheduledTaskUpdateManyWithoutShopNestedInput
    tasks?: TaskUpdateManyWithoutShopNestedInput
  }

  export type ShopUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalConfig?: FiscalConfigurationUncheckedUpdateOneWithoutShopNestedInput
    reports?: ReportUncheckedUpdateManyWithoutShopNestedInput
    generalSettings?: GeneralSettingsUncheckedUpdateOneWithoutShopNestedInput
    ftpConfig?: FtpConfigUncheckedUpdateOneWithoutShopNestedInput
    scheduledTasks?: ScheduledTaskUncheckedUpdateManyWithoutShopNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutShopNestedInput
  }

  export type ShopCreateManyInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FiscalConfigurationCreateInput = {
    id?: string
    code: string
    name: string
    description: string
    countries?: FiscalConfigurationCreatecountriesInput | string[]
    currency: string
    fileFormat: string
    encoding: string
    separator: string
    requiredColumns?: FiscalConfigurationCreaterequiredColumnsInput | string[]
    taxRates: JsonNullValueInput | InputJsonValue
    compatibleSoftware?: FiscalConfigurationCreatecompatibleSoftwareInput | string[]
    exportFormats?: FiscalConfigurationCreateexportFormatsInput | string[]
    notes: string
    companyName?: string | null
    country?: string | null
    vatRate?: number | null
    defaultFormat?: $Enums.ExportFormat | null
    salesAccount?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutFiscalConfigInput
  }

  export type FiscalConfigurationUncheckedCreateInput = {
    id?: string
    shopId: string
    code: string
    name: string
    description: string
    countries?: FiscalConfigurationCreatecountriesInput | string[]
    currency: string
    fileFormat: string
    encoding: string
    separator: string
    requiredColumns?: FiscalConfigurationCreaterequiredColumnsInput | string[]
    taxRates: JsonNullValueInput | InputJsonValue
    compatibleSoftware?: FiscalConfigurationCreatecompatibleSoftwareInput | string[]
    exportFormats?: FiscalConfigurationCreateexportFormatsInput | string[]
    notes: string
    companyName?: string | null
    country?: string | null
    vatRate?: number | null
    defaultFormat?: $Enums.ExportFormat | null
    salesAccount?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FiscalConfigurationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    countries?: FiscalConfigurationUpdatecountriesInput | string[]
    currency?: StringFieldUpdateOperationsInput | string
    fileFormat?: StringFieldUpdateOperationsInput | string
    encoding?: StringFieldUpdateOperationsInput | string
    separator?: StringFieldUpdateOperationsInput | string
    requiredColumns?: FiscalConfigurationUpdaterequiredColumnsInput | string[]
    taxRates?: JsonNullValueInput | InputJsonValue
    compatibleSoftware?: FiscalConfigurationUpdatecompatibleSoftwareInput | string[]
    exportFormats?: FiscalConfigurationUpdateexportFormatsInput | string[]
    notes?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    vatRate?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultFormat?: NullableEnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat | null
    salesAccount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutFiscalConfigNestedInput
  }

  export type FiscalConfigurationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    countries?: FiscalConfigurationUpdatecountriesInput | string[]
    currency?: StringFieldUpdateOperationsInput | string
    fileFormat?: StringFieldUpdateOperationsInput | string
    encoding?: StringFieldUpdateOperationsInput | string
    separator?: StringFieldUpdateOperationsInput | string
    requiredColumns?: FiscalConfigurationUpdaterequiredColumnsInput | string[]
    taxRates?: JsonNullValueInput | InputJsonValue
    compatibleSoftware?: FiscalConfigurationUpdatecompatibleSoftwareInput | string[]
    exportFormats?: FiscalConfigurationUpdateexportFormatsInput | string[]
    notes?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    vatRate?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultFormat?: NullableEnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat | null
    salesAccount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FiscalConfigurationCreateManyInput = {
    id?: string
    shopId: string
    code: string
    name: string
    description: string
    countries?: FiscalConfigurationCreatecountriesInput | string[]
    currency: string
    fileFormat: string
    encoding: string
    separator: string
    requiredColumns?: FiscalConfigurationCreaterequiredColumnsInput | string[]
    taxRates: JsonNullValueInput | InputJsonValue
    compatibleSoftware?: FiscalConfigurationCreatecompatibleSoftwareInput | string[]
    exportFormats?: FiscalConfigurationCreateexportFormatsInput | string[]
    notes: string
    companyName?: string | null
    country?: string | null
    vatRate?: number | null
    defaultFormat?: $Enums.ExportFormat | null
    salesAccount?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FiscalConfigurationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    countries?: FiscalConfigurationUpdatecountriesInput | string[]
    currency?: StringFieldUpdateOperationsInput | string
    fileFormat?: StringFieldUpdateOperationsInput | string
    encoding?: StringFieldUpdateOperationsInput | string
    separator?: StringFieldUpdateOperationsInput | string
    requiredColumns?: FiscalConfigurationUpdaterequiredColumnsInput | string[]
    taxRates?: JsonNullValueInput | InputJsonValue
    compatibleSoftware?: FiscalConfigurationUpdatecompatibleSoftwareInput | string[]
    exportFormats?: FiscalConfigurationUpdateexportFormatsInput | string[]
    notes?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    vatRate?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultFormat?: NullableEnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat | null
    salesAccount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FiscalConfigurationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    countries?: FiscalConfigurationUpdatecountriesInput | string[]
    currency?: StringFieldUpdateOperationsInput | string
    fileFormat?: StringFieldUpdateOperationsInput | string
    encoding?: StringFieldUpdateOperationsInput | string
    separator?: StringFieldUpdateOperationsInput | string
    requiredColumns?: FiscalConfigurationUpdaterequiredColumnsInput | string[]
    taxRates?: JsonNullValueInput | InputJsonValue
    compatibleSoftware?: FiscalConfigurationUpdatecompatibleSoftwareInput | string[]
    exportFormats?: FiscalConfigurationUpdateexportFormatsInput | string[]
    notes?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    vatRate?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultFormat?: NullableEnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat | null
    salesAccount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateInput = {
    id?: string
    type: string
    dataType: string
    status: $Enums.ReportStatus
    format: $Enums.ExportFormat
    startDate?: Date | string | null
    endDate?: Date | string | null
    fileSize: number
    fileName: string
    filePath?: string | null
    errorMessage?: string | null
    deliveryMethod?: string
    ftpDeliveryStatus?: $Enums.FtpDeliveryStatus | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutReportsInput
    scheduledTasks?: ScheduledTaskCreateNestedManyWithoutReportInput
    tasks?: TaskCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateInput = {
    id?: string
    type: string
    dataType: string
    status: $Enums.ReportStatus
    format: $Enums.ExportFormat
    startDate?: Date | string | null
    endDate?: Date | string | null
    shopId: string
    fileSize: number
    fileName: string
    filePath?: string | null
    errorMessage?: string | null
    deliveryMethod?: string
    ftpDeliveryStatus?: $Enums.FtpDeliveryStatus | null
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduledTasks?: ScheduledTaskUncheckedCreateNestedManyWithoutReportInput
    tasks?: TaskUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dataType?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    format?: EnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fileSize?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryMethod?: StringFieldUpdateOperationsInput | string
    ftpDeliveryStatus?: NullableEnumFtpDeliveryStatusFieldUpdateOperationsInput | $Enums.FtpDeliveryStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutReportsNestedInput
    scheduledTasks?: ScheduledTaskUpdateManyWithoutReportNestedInput
    tasks?: TaskUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dataType?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    format?: EnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shopId?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryMethod?: StringFieldUpdateOperationsInput | string
    ftpDeliveryStatus?: NullableEnumFtpDeliveryStatusFieldUpdateOperationsInput | $Enums.FtpDeliveryStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTasks?: ScheduledTaskUncheckedUpdateManyWithoutReportNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportCreateManyInput = {
    id?: string
    type: string
    dataType: string
    status: $Enums.ReportStatus
    format: $Enums.ExportFormat
    startDate?: Date | string | null
    endDate?: Date | string | null
    shopId: string
    fileSize: number
    fileName: string
    filePath?: string | null
    errorMessage?: string | null
    deliveryMethod?: string
    ftpDeliveryStatus?: $Enums.FtpDeliveryStatus | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dataType?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    format?: EnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fileSize?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryMethod?: StringFieldUpdateOperationsInput | string
    ftpDeliveryStatus?: NullableEnumFtpDeliveryStatusFieldUpdateOperationsInput | $Enums.FtpDeliveryStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dataType?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    format?: EnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shopId?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryMethod?: StringFieldUpdateOperationsInput | string
    ftpDeliveryStatus?: NullableEnumFtpDeliveryStatusFieldUpdateOperationsInput | $Enums.FtpDeliveryStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledTaskCreateInput = {
    id?: string
    frequency: string
    executionDay: number
    executionTime: string
    emailConfig: string
    lastRun?: Date | string | null
    nextRun: Date | string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    report: ReportCreateNestedOneWithoutScheduledTasksInput
    shop: ShopCreateNestedOneWithoutScheduledTasksInput
    tasks?: TaskCreateNestedManyWithoutScheduledTaskInput
  }

  export type ScheduledTaskUncheckedCreateInput = {
    id?: string
    reportId: string
    shopId: string
    frequency: string
    executionDay: number
    executionTime: string
    emailConfig: string
    lastRun?: Date | string | null
    nextRun: Date | string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutScheduledTaskInput
  }

  export type ScheduledTaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    executionDay?: IntFieldUpdateOperationsInput | number
    executionTime?: StringFieldUpdateOperationsInput | string
    emailConfig?: StringFieldUpdateOperationsInput | string
    lastRun?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRun?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    report?: ReportUpdateOneRequiredWithoutScheduledTasksNestedInput
    shop?: ShopUpdateOneRequiredWithoutScheduledTasksNestedInput
    tasks?: TaskUpdateManyWithoutScheduledTaskNestedInput
  }

  export type ScheduledTaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    executionDay?: IntFieldUpdateOperationsInput | number
    executionTime?: StringFieldUpdateOperationsInput | string
    emailConfig?: StringFieldUpdateOperationsInput | string
    lastRun?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRun?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutScheduledTaskNestedInput
  }

  export type ScheduledTaskCreateManyInput = {
    id?: string
    reportId: string
    shopId: string
    frequency: string
    executionDay: number
    executionTime: string
    emailConfig: string
    lastRun?: Date | string | null
    nextRun: Date | string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduledTaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    executionDay?: IntFieldUpdateOperationsInput | number
    executionTime?: StringFieldUpdateOperationsInput | string
    emailConfig?: StringFieldUpdateOperationsInput | string
    lastRun?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRun?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledTaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    executionDay?: IntFieldUpdateOperationsInput | number
    executionTime?: StringFieldUpdateOperationsInput | string
    emailConfig?: StringFieldUpdateOperationsInput | string
    lastRun?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRun?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateInput = {
    id?: string
    status: string
    scheduledFor: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    emailConfig: string
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduledTask: ScheduledTaskCreateNestedOneWithoutTasksInput
    shop: ShopCreateNestedOneWithoutTasksInput
    report: ReportCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    scheduledTaskId: string
    shopId: string
    reportId: string
    status: string
    scheduledFor: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    emailConfig: string
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailConfig?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTask?: ScheduledTaskUpdateOneRequiredWithoutTasksNestedInput
    shop?: ShopUpdateOneRequiredWithoutTasksNestedInput
    report?: ReportUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledTaskId?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailConfig?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyInput = {
    id?: string
    scheduledTaskId: string
    shopId: string
    reportId: string
    status: string
    scheduledFor: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    emailConfig: string
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailConfig?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledTaskId?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailConfig?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneralSettingsCreateInput = {
    id?: string
    timezone?: string
    language?: string
    salesAccount?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutGeneralSettingsInput
  }

  export type GeneralSettingsUncheckedCreateInput = {
    id?: string
    shopId: string
    timezone?: string
    language?: string
    salesAccount?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GeneralSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    salesAccount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutGeneralSettingsNestedInput
  }

  export type GeneralSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    salesAccount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneralSettingsCreateManyInput = {
    id?: string
    shopId: string
    timezone?: string
    language?: string
    salesAccount?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GeneralSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    salesAccount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneralSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    salesAccount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FtpConfigCreateInput = {
    id?: string
    host: string
    port?: number
    protocol?: $Enums.Protocol
    username: string
    password: string
    directory?: string
    passiveMode?: boolean
    retryDelay?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutFtpConfigInput
  }

  export type FtpConfigUncheckedCreateInput = {
    id?: string
    shopId: string
    host: string
    port?: number
    protocol?: $Enums.Protocol
    username: string
    password: string
    directory?: string
    passiveMode?: boolean
    retryDelay?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FtpConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    protocol?: EnumProtocolFieldUpdateOperationsInput | $Enums.Protocol
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    directory?: StringFieldUpdateOperationsInput | string
    passiveMode?: BoolFieldUpdateOperationsInput | boolean
    retryDelay?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutFtpConfigNestedInput
  }

  export type FtpConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    protocol?: EnumProtocolFieldUpdateOperationsInput | $Enums.Protocol
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    directory?: StringFieldUpdateOperationsInput | string
    passiveMode?: BoolFieldUpdateOperationsInput | boolean
    retryDelay?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FtpConfigCreateManyInput = {
    id?: string
    shopId: string
    host: string
    port?: number
    protocol?: $Enums.Protocol
    username: string
    password: string
    directory?: string
    passiveMode?: boolean
    retryDelay?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FtpConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    protocol?: EnumProtocolFieldUpdateOperationsInput | $Enums.Protocol
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    directory?: StringFieldUpdateOperationsInput | string
    passiveMode?: BoolFieldUpdateOperationsInput | boolean
    retryDelay?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FtpConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    protocol?: EnumProtocolFieldUpdateOperationsInput | $Enums.Protocol
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    directory?: StringFieldUpdateOperationsInput | string
    passiveMode?: BoolFieldUpdateOperationsInput | boolean
    retryDelay?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FiscalConfigurationNullableScalarRelationFilter = {
    is?: FiscalConfigurationWhereInput | null
    isNot?: FiscalConfigurationWhereInput | null
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type GeneralSettingsNullableScalarRelationFilter = {
    is?: GeneralSettingsWhereInput | null
    isNot?: GeneralSettingsWhereInput | null
  }

  export type FtpConfigNullableScalarRelationFilter = {
    is?: FtpConfigWhereInput | null
    isNot?: FtpConfigWhereInput | null
  }

  export type ScheduledTaskListRelationFilter = {
    every?: ScheduledTaskWhereInput
    some?: ScheduledTaskWhereInput
    none?: ScheduledTaskWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScheduledTaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ShopCountOrderByAggregateInput = {
    id?: SortOrder
    shopifyDomain?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopMaxOrderByAggregateInput = {
    id?: SortOrder
    shopifyDomain?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopMinOrderByAggregateInput = {
    id?: SortOrder
    shopifyDomain?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumExportFormatNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ExportFormat | EnumExportFormatFieldRefInput<$PrismaModel> | null
    in?: $Enums.ExportFormat[] | ListEnumExportFormatFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ExportFormat[] | ListEnumExportFormatFieldRefInput<$PrismaModel> | null
    not?: NestedEnumExportFormatNullableFilter<$PrismaModel> | $Enums.ExportFormat | null
  }

  export type ShopScalarRelationFilter = {
    is?: ShopWhereInput
    isNot?: ShopWhereInput
  }

  export type FiscalConfigurationCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    countries?: SortOrder
    currency?: SortOrder
    fileFormat?: SortOrder
    encoding?: SortOrder
    separator?: SortOrder
    requiredColumns?: SortOrder
    taxRates?: SortOrder
    compatibleSoftware?: SortOrder
    exportFormats?: SortOrder
    notes?: SortOrder
    companyName?: SortOrder
    country?: SortOrder
    vatRate?: SortOrder
    defaultFormat?: SortOrder
    salesAccount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FiscalConfigurationAvgOrderByAggregateInput = {
    vatRate?: SortOrder
  }

  export type FiscalConfigurationMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    currency?: SortOrder
    fileFormat?: SortOrder
    encoding?: SortOrder
    separator?: SortOrder
    notes?: SortOrder
    companyName?: SortOrder
    country?: SortOrder
    vatRate?: SortOrder
    defaultFormat?: SortOrder
    salesAccount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FiscalConfigurationMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    currency?: SortOrder
    fileFormat?: SortOrder
    encoding?: SortOrder
    separator?: SortOrder
    notes?: SortOrder
    companyName?: SortOrder
    country?: SortOrder
    vatRate?: SortOrder
    defaultFormat?: SortOrder
    salesAccount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FiscalConfigurationSumOrderByAggregateInput = {
    vatRate?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumExportFormatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExportFormat | EnumExportFormatFieldRefInput<$PrismaModel> | null
    in?: $Enums.ExportFormat[] | ListEnumExportFormatFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ExportFormat[] | ListEnumExportFormatFieldRefInput<$PrismaModel> | null
    not?: NestedEnumExportFormatNullableWithAggregatesFilter<$PrismaModel> | $Enums.ExportFormat | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumExportFormatNullableFilter<$PrismaModel>
    _max?: NestedEnumExportFormatNullableFilter<$PrismaModel>
  }

  export type EnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus
  }

  export type EnumExportFormatFilter<$PrismaModel = never> = {
    equals?: $Enums.ExportFormat | EnumExportFormatFieldRefInput<$PrismaModel>
    in?: $Enums.ExportFormat[] | ListEnumExportFormatFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExportFormat[] | ListEnumExportFormatFieldRefInput<$PrismaModel>
    not?: NestedEnumExportFormatFilter<$PrismaModel> | $Enums.ExportFormat
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumFtpDeliveryStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.FtpDeliveryStatus | EnumFtpDeliveryStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.FtpDeliveryStatus[] | ListEnumFtpDeliveryStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.FtpDeliveryStatus[] | ListEnumFtpDeliveryStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumFtpDeliveryStatusNullableFilter<$PrismaModel> | $Enums.FtpDeliveryStatus | null
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    dataType?: SortOrder
    status?: SortOrder
    format?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    shopId?: SortOrder
    fileSize?: SortOrder
    fileName?: SortOrder
    filePath?: SortOrder
    errorMessage?: SortOrder
    deliveryMethod?: SortOrder
    ftpDeliveryStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    dataType?: SortOrder
    status?: SortOrder
    format?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    shopId?: SortOrder
    fileSize?: SortOrder
    fileName?: SortOrder
    filePath?: SortOrder
    errorMessage?: SortOrder
    deliveryMethod?: SortOrder
    ftpDeliveryStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    dataType?: SortOrder
    status?: SortOrder
    format?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    shopId?: SortOrder
    fileSize?: SortOrder
    fileName?: SortOrder
    filePath?: SortOrder
    errorMessage?: SortOrder
    deliveryMethod?: SortOrder
    ftpDeliveryStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type EnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportStatusFilter<$PrismaModel>
    _max?: NestedEnumReportStatusFilter<$PrismaModel>
  }

  export type EnumExportFormatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExportFormat | EnumExportFormatFieldRefInput<$PrismaModel>
    in?: $Enums.ExportFormat[] | ListEnumExportFormatFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExportFormat[] | ListEnumExportFormatFieldRefInput<$PrismaModel>
    not?: NestedEnumExportFormatWithAggregatesFilter<$PrismaModel> | $Enums.ExportFormat
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExportFormatFilter<$PrismaModel>
    _max?: NestedEnumExportFormatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumFtpDeliveryStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FtpDeliveryStatus | EnumFtpDeliveryStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.FtpDeliveryStatus[] | ListEnumFtpDeliveryStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.FtpDeliveryStatus[] | ListEnumFtpDeliveryStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumFtpDeliveryStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.FtpDeliveryStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumFtpDeliveryStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumFtpDeliveryStatusNullableFilter<$PrismaModel>
  }

  export type ReportScalarRelationFilter = {
    is?: ReportWhereInput
    isNot?: ReportWhereInput
  }

  export type ScheduledTaskCountOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    shopId?: SortOrder
    frequency?: SortOrder
    executionDay?: SortOrder
    executionTime?: SortOrder
    emailConfig?: SortOrder
    lastRun?: SortOrder
    nextRun?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduledTaskAvgOrderByAggregateInput = {
    executionDay?: SortOrder
  }

  export type ScheduledTaskMaxOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    shopId?: SortOrder
    frequency?: SortOrder
    executionDay?: SortOrder
    executionTime?: SortOrder
    emailConfig?: SortOrder
    lastRun?: SortOrder
    nextRun?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduledTaskMinOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    shopId?: SortOrder
    frequency?: SortOrder
    executionDay?: SortOrder
    executionTime?: SortOrder
    emailConfig?: SortOrder
    lastRun?: SortOrder
    nextRun?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduledTaskSumOrderByAggregateInput = {
    executionDay?: SortOrder
  }

  export type ScheduledTaskScalarRelationFilter = {
    is?: ScheduledTaskWhereInput
    isNot?: ScheduledTaskWhereInput
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    scheduledTaskId?: SortOrder
    shopId?: SortOrder
    reportId?: SortOrder
    status?: SortOrder
    scheduledFor?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    emailConfig?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    scheduledTaskId?: SortOrder
    shopId?: SortOrder
    reportId?: SortOrder
    status?: SortOrder
    scheduledFor?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    emailConfig?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    scheduledTaskId?: SortOrder
    shopId?: SortOrder
    reportId?: SortOrder
    status?: SortOrder
    scheduledFor?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    emailConfig?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GeneralSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    timezone?: SortOrder
    language?: SortOrder
    salesAccount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GeneralSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    timezone?: SortOrder
    language?: SortOrder
    salesAccount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GeneralSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    timezone?: SortOrder
    language?: SortOrder
    salesAccount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumProtocolFilter<$PrismaModel = never> = {
    equals?: $Enums.Protocol | EnumProtocolFieldRefInput<$PrismaModel>
    in?: $Enums.Protocol[] | ListEnumProtocolFieldRefInput<$PrismaModel>
    notIn?: $Enums.Protocol[] | ListEnumProtocolFieldRefInput<$PrismaModel>
    not?: NestedEnumProtocolFilter<$PrismaModel> | $Enums.Protocol
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FtpConfigCountOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    host?: SortOrder
    port?: SortOrder
    protocol?: SortOrder
    username?: SortOrder
    password?: SortOrder
    directory?: SortOrder
    passiveMode?: SortOrder
    retryDelay?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FtpConfigAvgOrderByAggregateInput = {
    port?: SortOrder
    retryDelay?: SortOrder
  }

  export type FtpConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    host?: SortOrder
    port?: SortOrder
    protocol?: SortOrder
    username?: SortOrder
    password?: SortOrder
    directory?: SortOrder
    passiveMode?: SortOrder
    retryDelay?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FtpConfigMinOrderByAggregateInput = {
    id?: SortOrder
    shopId?: SortOrder
    host?: SortOrder
    port?: SortOrder
    protocol?: SortOrder
    username?: SortOrder
    password?: SortOrder
    directory?: SortOrder
    passiveMode?: SortOrder
    retryDelay?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FtpConfigSumOrderByAggregateInput = {
    port?: SortOrder
    retryDelay?: SortOrder
  }

  export type EnumProtocolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Protocol | EnumProtocolFieldRefInput<$PrismaModel>
    in?: $Enums.Protocol[] | ListEnumProtocolFieldRefInput<$PrismaModel>
    notIn?: $Enums.Protocol[] | ListEnumProtocolFieldRefInput<$PrismaModel>
    not?: NestedEnumProtocolWithAggregatesFilter<$PrismaModel> | $Enums.Protocol
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProtocolFilter<$PrismaModel>
    _max?: NestedEnumProtocolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type FiscalConfigurationCreateNestedOneWithoutShopInput = {
    create?: XOR<FiscalConfigurationCreateWithoutShopInput, FiscalConfigurationUncheckedCreateWithoutShopInput>
    connectOrCreate?: FiscalConfigurationCreateOrConnectWithoutShopInput
    connect?: FiscalConfigurationWhereUniqueInput
  }

  export type ReportCreateNestedManyWithoutShopInput = {
    create?: XOR<ReportCreateWithoutShopInput, ReportUncheckedCreateWithoutShopInput> | ReportCreateWithoutShopInput[] | ReportUncheckedCreateWithoutShopInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutShopInput | ReportCreateOrConnectWithoutShopInput[]
    createMany?: ReportCreateManyShopInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type GeneralSettingsCreateNestedOneWithoutShopInput = {
    create?: XOR<GeneralSettingsCreateWithoutShopInput, GeneralSettingsUncheckedCreateWithoutShopInput>
    connectOrCreate?: GeneralSettingsCreateOrConnectWithoutShopInput
    connect?: GeneralSettingsWhereUniqueInput
  }

  export type FtpConfigCreateNestedOneWithoutShopInput = {
    create?: XOR<FtpConfigCreateWithoutShopInput, FtpConfigUncheckedCreateWithoutShopInput>
    connectOrCreate?: FtpConfigCreateOrConnectWithoutShopInput
    connect?: FtpConfigWhereUniqueInput
  }

  export type ScheduledTaskCreateNestedManyWithoutShopInput = {
    create?: XOR<ScheduledTaskCreateWithoutShopInput, ScheduledTaskUncheckedCreateWithoutShopInput> | ScheduledTaskCreateWithoutShopInput[] | ScheduledTaskUncheckedCreateWithoutShopInput[]
    connectOrCreate?: ScheduledTaskCreateOrConnectWithoutShopInput | ScheduledTaskCreateOrConnectWithoutShopInput[]
    createMany?: ScheduledTaskCreateManyShopInputEnvelope
    connect?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutShopInput = {
    create?: XOR<TaskCreateWithoutShopInput, TaskUncheckedCreateWithoutShopInput> | TaskCreateWithoutShopInput[] | TaskUncheckedCreateWithoutShopInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutShopInput | TaskCreateOrConnectWithoutShopInput[]
    createMany?: TaskCreateManyShopInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type FiscalConfigurationUncheckedCreateNestedOneWithoutShopInput = {
    create?: XOR<FiscalConfigurationCreateWithoutShopInput, FiscalConfigurationUncheckedCreateWithoutShopInput>
    connectOrCreate?: FiscalConfigurationCreateOrConnectWithoutShopInput
    connect?: FiscalConfigurationWhereUniqueInput
  }

  export type ReportUncheckedCreateNestedManyWithoutShopInput = {
    create?: XOR<ReportCreateWithoutShopInput, ReportUncheckedCreateWithoutShopInput> | ReportCreateWithoutShopInput[] | ReportUncheckedCreateWithoutShopInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutShopInput | ReportCreateOrConnectWithoutShopInput[]
    createMany?: ReportCreateManyShopInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type GeneralSettingsUncheckedCreateNestedOneWithoutShopInput = {
    create?: XOR<GeneralSettingsCreateWithoutShopInput, GeneralSettingsUncheckedCreateWithoutShopInput>
    connectOrCreate?: GeneralSettingsCreateOrConnectWithoutShopInput
    connect?: GeneralSettingsWhereUniqueInput
  }

  export type FtpConfigUncheckedCreateNestedOneWithoutShopInput = {
    create?: XOR<FtpConfigCreateWithoutShopInput, FtpConfigUncheckedCreateWithoutShopInput>
    connectOrCreate?: FtpConfigCreateOrConnectWithoutShopInput
    connect?: FtpConfigWhereUniqueInput
  }

  export type ScheduledTaskUncheckedCreateNestedManyWithoutShopInput = {
    create?: XOR<ScheduledTaskCreateWithoutShopInput, ScheduledTaskUncheckedCreateWithoutShopInput> | ScheduledTaskCreateWithoutShopInput[] | ScheduledTaskUncheckedCreateWithoutShopInput[]
    connectOrCreate?: ScheduledTaskCreateOrConnectWithoutShopInput | ScheduledTaskCreateOrConnectWithoutShopInput[]
    createMany?: ScheduledTaskCreateManyShopInputEnvelope
    connect?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutShopInput = {
    create?: XOR<TaskCreateWithoutShopInput, TaskUncheckedCreateWithoutShopInput> | TaskCreateWithoutShopInput[] | TaskUncheckedCreateWithoutShopInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutShopInput | TaskCreateOrConnectWithoutShopInput[]
    createMany?: TaskCreateManyShopInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FiscalConfigurationUpdateOneWithoutShopNestedInput = {
    create?: XOR<FiscalConfigurationCreateWithoutShopInput, FiscalConfigurationUncheckedCreateWithoutShopInput>
    connectOrCreate?: FiscalConfigurationCreateOrConnectWithoutShopInput
    upsert?: FiscalConfigurationUpsertWithoutShopInput
    disconnect?: FiscalConfigurationWhereInput | boolean
    delete?: FiscalConfigurationWhereInput | boolean
    connect?: FiscalConfigurationWhereUniqueInput
    update?: XOR<XOR<FiscalConfigurationUpdateToOneWithWhereWithoutShopInput, FiscalConfigurationUpdateWithoutShopInput>, FiscalConfigurationUncheckedUpdateWithoutShopInput>
  }

  export type ReportUpdateManyWithoutShopNestedInput = {
    create?: XOR<ReportCreateWithoutShopInput, ReportUncheckedCreateWithoutShopInput> | ReportCreateWithoutShopInput[] | ReportUncheckedCreateWithoutShopInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutShopInput | ReportCreateOrConnectWithoutShopInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutShopInput | ReportUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: ReportCreateManyShopInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutShopInput | ReportUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutShopInput | ReportUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type GeneralSettingsUpdateOneWithoutShopNestedInput = {
    create?: XOR<GeneralSettingsCreateWithoutShopInput, GeneralSettingsUncheckedCreateWithoutShopInput>
    connectOrCreate?: GeneralSettingsCreateOrConnectWithoutShopInput
    upsert?: GeneralSettingsUpsertWithoutShopInput
    disconnect?: GeneralSettingsWhereInput | boolean
    delete?: GeneralSettingsWhereInput | boolean
    connect?: GeneralSettingsWhereUniqueInput
    update?: XOR<XOR<GeneralSettingsUpdateToOneWithWhereWithoutShopInput, GeneralSettingsUpdateWithoutShopInput>, GeneralSettingsUncheckedUpdateWithoutShopInput>
  }

  export type FtpConfigUpdateOneWithoutShopNestedInput = {
    create?: XOR<FtpConfigCreateWithoutShopInput, FtpConfigUncheckedCreateWithoutShopInput>
    connectOrCreate?: FtpConfigCreateOrConnectWithoutShopInput
    upsert?: FtpConfigUpsertWithoutShopInput
    disconnect?: FtpConfigWhereInput | boolean
    delete?: FtpConfigWhereInput | boolean
    connect?: FtpConfigWhereUniqueInput
    update?: XOR<XOR<FtpConfigUpdateToOneWithWhereWithoutShopInput, FtpConfigUpdateWithoutShopInput>, FtpConfigUncheckedUpdateWithoutShopInput>
  }

  export type ScheduledTaskUpdateManyWithoutShopNestedInput = {
    create?: XOR<ScheduledTaskCreateWithoutShopInput, ScheduledTaskUncheckedCreateWithoutShopInput> | ScheduledTaskCreateWithoutShopInput[] | ScheduledTaskUncheckedCreateWithoutShopInput[]
    connectOrCreate?: ScheduledTaskCreateOrConnectWithoutShopInput | ScheduledTaskCreateOrConnectWithoutShopInput[]
    upsert?: ScheduledTaskUpsertWithWhereUniqueWithoutShopInput | ScheduledTaskUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: ScheduledTaskCreateManyShopInputEnvelope
    set?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
    disconnect?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
    delete?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
    connect?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
    update?: ScheduledTaskUpdateWithWhereUniqueWithoutShopInput | ScheduledTaskUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: ScheduledTaskUpdateManyWithWhereWithoutShopInput | ScheduledTaskUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: ScheduledTaskScalarWhereInput | ScheduledTaskScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutShopNestedInput = {
    create?: XOR<TaskCreateWithoutShopInput, TaskUncheckedCreateWithoutShopInput> | TaskCreateWithoutShopInput[] | TaskUncheckedCreateWithoutShopInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutShopInput | TaskCreateOrConnectWithoutShopInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutShopInput | TaskUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: TaskCreateManyShopInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutShopInput | TaskUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutShopInput | TaskUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type FiscalConfigurationUncheckedUpdateOneWithoutShopNestedInput = {
    create?: XOR<FiscalConfigurationCreateWithoutShopInput, FiscalConfigurationUncheckedCreateWithoutShopInput>
    connectOrCreate?: FiscalConfigurationCreateOrConnectWithoutShopInput
    upsert?: FiscalConfigurationUpsertWithoutShopInput
    disconnect?: FiscalConfigurationWhereInput | boolean
    delete?: FiscalConfigurationWhereInput | boolean
    connect?: FiscalConfigurationWhereUniqueInput
    update?: XOR<XOR<FiscalConfigurationUpdateToOneWithWhereWithoutShopInput, FiscalConfigurationUpdateWithoutShopInput>, FiscalConfigurationUncheckedUpdateWithoutShopInput>
  }

  export type ReportUncheckedUpdateManyWithoutShopNestedInput = {
    create?: XOR<ReportCreateWithoutShopInput, ReportUncheckedCreateWithoutShopInput> | ReportCreateWithoutShopInput[] | ReportUncheckedCreateWithoutShopInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutShopInput | ReportCreateOrConnectWithoutShopInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutShopInput | ReportUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: ReportCreateManyShopInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutShopInput | ReportUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutShopInput | ReportUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type GeneralSettingsUncheckedUpdateOneWithoutShopNestedInput = {
    create?: XOR<GeneralSettingsCreateWithoutShopInput, GeneralSettingsUncheckedCreateWithoutShopInput>
    connectOrCreate?: GeneralSettingsCreateOrConnectWithoutShopInput
    upsert?: GeneralSettingsUpsertWithoutShopInput
    disconnect?: GeneralSettingsWhereInput | boolean
    delete?: GeneralSettingsWhereInput | boolean
    connect?: GeneralSettingsWhereUniqueInput
    update?: XOR<XOR<GeneralSettingsUpdateToOneWithWhereWithoutShopInput, GeneralSettingsUpdateWithoutShopInput>, GeneralSettingsUncheckedUpdateWithoutShopInput>
  }

  export type FtpConfigUncheckedUpdateOneWithoutShopNestedInput = {
    create?: XOR<FtpConfigCreateWithoutShopInput, FtpConfigUncheckedCreateWithoutShopInput>
    connectOrCreate?: FtpConfigCreateOrConnectWithoutShopInput
    upsert?: FtpConfigUpsertWithoutShopInput
    disconnect?: FtpConfigWhereInput | boolean
    delete?: FtpConfigWhereInput | boolean
    connect?: FtpConfigWhereUniqueInput
    update?: XOR<XOR<FtpConfigUpdateToOneWithWhereWithoutShopInput, FtpConfigUpdateWithoutShopInput>, FtpConfigUncheckedUpdateWithoutShopInput>
  }

  export type ScheduledTaskUncheckedUpdateManyWithoutShopNestedInput = {
    create?: XOR<ScheduledTaskCreateWithoutShopInput, ScheduledTaskUncheckedCreateWithoutShopInput> | ScheduledTaskCreateWithoutShopInput[] | ScheduledTaskUncheckedCreateWithoutShopInput[]
    connectOrCreate?: ScheduledTaskCreateOrConnectWithoutShopInput | ScheduledTaskCreateOrConnectWithoutShopInput[]
    upsert?: ScheduledTaskUpsertWithWhereUniqueWithoutShopInput | ScheduledTaskUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: ScheduledTaskCreateManyShopInputEnvelope
    set?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
    disconnect?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
    delete?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
    connect?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
    update?: ScheduledTaskUpdateWithWhereUniqueWithoutShopInput | ScheduledTaskUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: ScheduledTaskUpdateManyWithWhereWithoutShopInput | ScheduledTaskUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: ScheduledTaskScalarWhereInput | ScheduledTaskScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutShopNestedInput = {
    create?: XOR<TaskCreateWithoutShopInput, TaskUncheckedCreateWithoutShopInput> | TaskCreateWithoutShopInput[] | TaskUncheckedCreateWithoutShopInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutShopInput | TaskCreateOrConnectWithoutShopInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutShopInput | TaskUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: TaskCreateManyShopInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutShopInput | TaskUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutShopInput | TaskUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type FiscalConfigurationCreatecountriesInput = {
    set: string[]
  }

  export type FiscalConfigurationCreaterequiredColumnsInput = {
    set: string[]
  }

  export type FiscalConfigurationCreatecompatibleSoftwareInput = {
    set: string[]
  }

  export type FiscalConfigurationCreateexportFormatsInput = {
    set: string[]
  }

  export type ShopCreateNestedOneWithoutFiscalConfigInput = {
    create?: XOR<ShopCreateWithoutFiscalConfigInput, ShopUncheckedCreateWithoutFiscalConfigInput>
    connectOrCreate?: ShopCreateOrConnectWithoutFiscalConfigInput
    connect?: ShopWhereUniqueInput
  }

  export type FiscalConfigurationUpdatecountriesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FiscalConfigurationUpdaterequiredColumnsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FiscalConfigurationUpdatecompatibleSoftwareInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FiscalConfigurationUpdateexportFormatsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumExportFormatFieldUpdateOperationsInput = {
    set?: $Enums.ExportFormat | null
  }

  export type ShopUpdateOneRequiredWithoutFiscalConfigNestedInput = {
    create?: XOR<ShopCreateWithoutFiscalConfigInput, ShopUncheckedCreateWithoutFiscalConfigInput>
    connectOrCreate?: ShopCreateOrConnectWithoutFiscalConfigInput
    upsert?: ShopUpsertWithoutFiscalConfigInput
    connect?: ShopWhereUniqueInput
    update?: XOR<XOR<ShopUpdateToOneWithWhereWithoutFiscalConfigInput, ShopUpdateWithoutFiscalConfigInput>, ShopUncheckedUpdateWithoutFiscalConfigInput>
  }

  export type ShopCreateNestedOneWithoutReportsInput = {
    create?: XOR<ShopCreateWithoutReportsInput, ShopUncheckedCreateWithoutReportsInput>
    connectOrCreate?: ShopCreateOrConnectWithoutReportsInput
    connect?: ShopWhereUniqueInput
  }

  export type ScheduledTaskCreateNestedManyWithoutReportInput = {
    create?: XOR<ScheduledTaskCreateWithoutReportInput, ScheduledTaskUncheckedCreateWithoutReportInput> | ScheduledTaskCreateWithoutReportInput[] | ScheduledTaskUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ScheduledTaskCreateOrConnectWithoutReportInput | ScheduledTaskCreateOrConnectWithoutReportInput[]
    createMany?: ScheduledTaskCreateManyReportInputEnvelope
    connect?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutReportInput = {
    create?: XOR<TaskCreateWithoutReportInput, TaskUncheckedCreateWithoutReportInput> | TaskCreateWithoutReportInput[] | TaskUncheckedCreateWithoutReportInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutReportInput | TaskCreateOrConnectWithoutReportInput[]
    createMany?: TaskCreateManyReportInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ScheduledTaskUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<ScheduledTaskCreateWithoutReportInput, ScheduledTaskUncheckedCreateWithoutReportInput> | ScheduledTaskCreateWithoutReportInput[] | ScheduledTaskUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ScheduledTaskCreateOrConnectWithoutReportInput | ScheduledTaskCreateOrConnectWithoutReportInput[]
    createMany?: ScheduledTaskCreateManyReportInputEnvelope
    connect?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<TaskCreateWithoutReportInput, TaskUncheckedCreateWithoutReportInput> | TaskCreateWithoutReportInput[] | TaskUncheckedCreateWithoutReportInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutReportInput | TaskCreateOrConnectWithoutReportInput[]
    createMany?: TaskCreateManyReportInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type EnumReportStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReportStatus
  }

  export type EnumExportFormatFieldUpdateOperationsInput = {
    set?: $Enums.ExportFormat
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumFtpDeliveryStatusFieldUpdateOperationsInput = {
    set?: $Enums.FtpDeliveryStatus | null
  }

  export type ShopUpdateOneRequiredWithoutReportsNestedInput = {
    create?: XOR<ShopCreateWithoutReportsInput, ShopUncheckedCreateWithoutReportsInput>
    connectOrCreate?: ShopCreateOrConnectWithoutReportsInput
    upsert?: ShopUpsertWithoutReportsInput
    connect?: ShopWhereUniqueInput
    update?: XOR<XOR<ShopUpdateToOneWithWhereWithoutReportsInput, ShopUpdateWithoutReportsInput>, ShopUncheckedUpdateWithoutReportsInput>
  }

  export type ScheduledTaskUpdateManyWithoutReportNestedInput = {
    create?: XOR<ScheduledTaskCreateWithoutReportInput, ScheduledTaskUncheckedCreateWithoutReportInput> | ScheduledTaskCreateWithoutReportInput[] | ScheduledTaskUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ScheduledTaskCreateOrConnectWithoutReportInput | ScheduledTaskCreateOrConnectWithoutReportInput[]
    upsert?: ScheduledTaskUpsertWithWhereUniqueWithoutReportInput | ScheduledTaskUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: ScheduledTaskCreateManyReportInputEnvelope
    set?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
    disconnect?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
    delete?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
    connect?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
    update?: ScheduledTaskUpdateWithWhereUniqueWithoutReportInput | ScheduledTaskUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: ScheduledTaskUpdateManyWithWhereWithoutReportInput | ScheduledTaskUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: ScheduledTaskScalarWhereInput | ScheduledTaskScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutReportNestedInput = {
    create?: XOR<TaskCreateWithoutReportInput, TaskUncheckedCreateWithoutReportInput> | TaskCreateWithoutReportInput[] | TaskUncheckedCreateWithoutReportInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutReportInput | TaskCreateOrConnectWithoutReportInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutReportInput | TaskUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: TaskCreateManyReportInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutReportInput | TaskUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutReportInput | TaskUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ScheduledTaskUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<ScheduledTaskCreateWithoutReportInput, ScheduledTaskUncheckedCreateWithoutReportInput> | ScheduledTaskCreateWithoutReportInput[] | ScheduledTaskUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ScheduledTaskCreateOrConnectWithoutReportInput | ScheduledTaskCreateOrConnectWithoutReportInput[]
    upsert?: ScheduledTaskUpsertWithWhereUniqueWithoutReportInput | ScheduledTaskUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: ScheduledTaskCreateManyReportInputEnvelope
    set?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
    disconnect?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
    delete?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
    connect?: ScheduledTaskWhereUniqueInput | ScheduledTaskWhereUniqueInput[]
    update?: ScheduledTaskUpdateWithWhereUniqueWithoutReportInput | ScheduledTaskUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: ScheduledTaskUpdateManyWithWhereWithoutReportInput | ScheduledTaskUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: ScheduledTaskScalarWhereInput | ScheduledTaskScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<TaskCreateWithoutReportInput, TaskUncheckedCreateWithoutReportInput> | TaskCreateWithoutReportInput[] | TaskUncheckedCreateWithoutReportInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutReportInput | TaskCreateOrConnectWithoutReportInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutReportInput | TaskUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: TaskCreateManyReportInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutReportInput | TaskUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutReportInput | TaskUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ReportCreateNestedOneWithoutScheduledTasksInput = {
    create?: XOR<ReportCreateWithoutScheduledTasksInput, ReportUncheckedCreateWithoutScheduledTasksInput>
    connectOrCreate?: ReportCreateOrConnectWithoutScheduledTasksInput
    connect?: ReportWhereUniqueInput
  }

  export type ShopCreateNestedOneWithoutScheduledTasksInput = {
    create?: XOR<ShopCreateWithoutScheduledTasksInput, ShopUncheckedCreateWithoutScheduledTasksInput>
    connectOrCreate?: ShopCreateOrConnectWithoutScheduledTasksInput
    connect?: ShopWhereUniqueInput
  }

  export type TaskCreateNestedManyWithoutScheduledTaskInput = {
    create?: XOR<TaskCreateWithoutScheduledTaskInput, TaskUncheckedCreateWithoutScheduledTaskInput> | TaskCreateWithoutScheduledTaskInput[] | TaskUncheckedCreateWithoutScheduledTaskInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutScheduledTaskInput | TaskCreateOrConnectWithoutScheduledTaskInput[]
    createMany?: TaskCreateManyScheduledTaskInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutScheduledTaskInput = {
    create?: XOR<TaskCreateWithoutScheduledTaskInput, TaskUncheckedCreateWithoutScheduledTaskInput> | TaskCreateWithoutScheduledTaskInput[] | TaskUncheckedCreateWithoutScheduledTaskInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutScheduledTaskInput | TaskCreateOrConnectWithoutScheduledTaskInput[]
    createMany?: TaskCreateManyScheduledTaskInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ReportUpdateOneRequiredWithoutScheduledTasksNestedInput = {
    create?: XOR<ReportCreateWithoutScheduledTasksInput, ReportUncheckedCreateWithoutScheduledTasksInput>
    connectOrCreate?: ReportCreateOrConnectWithoutScheduledTasksInput
    upsert?: ReportUpsertWithoutScheduledTasksInput
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutScheduledTasksInput, ReportUpdateWithoutScheduledTasksInput>, ReportUncheckedUpdateWithoutScheduledTasksInput>
  }

  export type ShopUpdateOneRequiredWithoutScheduledTasksNestedInput = {
    create?: XOR<ShopCreateWithoutScheduledTasksInput, ShopUncheckedCreateWithoutScheduledTasksInput>
    connectOrCreate?: ShopCreateOrConnectWithoutScheduledTasksInput
    upsert?: ShopUpsertWithoutScheduledTasksInput
    connect?: ShopWhereUniqueInput
    update?: XOR<XOR<ShopUpdateToOneWithWhereWithoutScheduledTasksInput, ShopUpdateWithoutScheduledTasksInput>, ShopUncheckedUpdateWithoutScheduledTasksInput>
  }

  export type TaskUpdateManyWithoutScheduledTaskNestedInput = {
    create?: XOR<TaskCreateWithoutScheduledTaskInput, TaskUncheckedCreateWithoutScheduledTaskInput> | TaskCreateWithoutScheduledTaskInput[] | TaskUncheckedCreateWithoutScheduledTaskInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutScheduledTaskInput | TaskCreateOrConnectWithoutScheduledTaskInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutScheduledTaskInput | TaskUpsertWithWhereUniqueWithoutScheduledTaskInput[]
    createMany?: TaskCreateManyScheduledTaskInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutScheduledTaskInput | TaskUpdateWithWhereUniqueWithoutScheduledTaskInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutScheduledTaskInput | TaskUpdateManyWithWhereWithoutScheduledTaskInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutScheduledTaskNestedInput = {
    create?: XOR<TaskCreateWithoutScheduledTaskInput, TaskUncheckedCreateWithoutScheduledTaskInput> | TaskCreateWithoutScheduledTaskInput[] | TaskUncheckedCreateWithoutScheduledTaskInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutScheduledTaskInput | TaskCreateOrConnectWithoutScheduledTaskInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutScheduledTaskInput | TaskUpsertWithWhereUniqueWithoutScheduledTaskInput[]
    createMany?: TaskCreateManyScheduledTaskInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutScheduledTaskInput | TaskUpdateWithWhereUniqueWithoutScheduledTaskInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutScheduledTaskInput | TaskUpdateManyWithWhereWithoutScheduledTaskInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ScheduledTaskCreateNestedOneWithoutTasksInput = {
    create?: XOR<ScheduledTaskCreateWithoutTasksInput, ScheduledTaskUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ScheduledTaskCreateOrConnectWithoutTasksInput
    connect?: ScheduledTaskWhereUniqueInput
  }

  export type ShopCreateNestedOneWithoutTasksInput = {
    create?: XOR<ShopCreateWithoutTasksInput, ShopUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ShopCreateOrConnectWithoutTasksInput
    connect?: ShopWhereUniqueInput
  }

  export type ReportCreateNestedOneWithoutTasksInput = {
    create?: XOR<ReportCreateWithoutTasksInput, ReportUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ReportCreateOrConnectWithoutTasksInput
    connect?: ReportWhereUniqueInput
  }

  export type ScheduledTaskUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<ScheduledTaskCreateWithoutTasksInput, ScheduledTaskUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ScheduledTaskCreateOrConnectWithoutTasksInput
    upsert?: ScheduledTaskUpsertWithoutTasksInput
    connect?: ScheduledTaskWhereUniqueInput
    update?: XOR<XOR<ScheduledTaskUpdateToOneWithWhereWithoutTasksInput, ScheduledTaskUpdateWithoutTasksInput>, ScheduledTaskUncheckedUpdateWithoutTasksInput>
  }

  export type ShopUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<ShopCreateWithoutTasksInput, ShopUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ShopCreateOrConnectWithoutTasksInput
    upsert?: ShopUpsertWithoutTasksInput
    connect?: ShopWhereUniqueInput
    update?: XOR<XOR<ShopUpdateToOneWithWhereWithoutTasksInput, ShopUpdateWithoutTasksInput>, ShopUncheckedUpdateWithoutTasksInput>
  }

  export type ReportUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<ReportCreateWithoutTasksInput, ReportUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ReportCreateOrConnectWithoutTasksInput
    upsert?: ReportUpsertWithoutTasksInput
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutTasksInput, ReportUpdateWithoutTasksInput>, ReportUncheckedUpdateWithoutTasksInput>
  }

  export type ShopCreateNestedOneWithoutGeneralSettingsInput = {
    create?: XOR<ShopCreateWithoutGeneralSettingsInput, ShopUncheckedCreateWithoutGeneralSettingsInput>
    connectOrCreate?: ShopCreateOrConnectWithoutGeneralSettingsInput
    connect?: ShopWhereUniqueInput
  }

  export type ShopUpdateOneRequiredWithoutGeneralSettingsNestedInput = {
    create?: XOR<ShopCreateWithoutGeneralSettingsInput, ShopUncheckedCreateWithoutGeneralSettingsInput>
    connectOrCreate?: ShopCreateOrConnectWithoutGeneralSettingsInput
    upsert?: ShopUpsertWithoutGeneralSettingsInput
    connect?: ShopWhereUniqueInput
    update?: XOR<XOR<ShopUpdateToOneWithWhereWithoutGeneralSettingsInput, ShopUpdateWithoutGeneralSettingsInput>, ShopUncheckedUpdateWithoutGeneralSettingsInput>
  }

  export type ShopCreateNestedOneWithoutFtpConfigInput = {
    create?: XOR<ShopCreateWithoutFtpConfigInput, ShopUncheckedCreateWithoutFtpConfigInput>
    connectOrCreate?: ShopCreateOrConnectWithoutFtpConfigInput
    connect?: ShopWhereUniqueInput
  }

  export type EnumProtocolFieldUpdateOperationsInput = {
    set?: $Enums.Protocol
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ShopUpdateOneRequiredWithoutFtpConfigNestedInput = {
    create?: XOR<ShopCreateWithoutFtpConfigInput, ShopUncheckedCreateWithoutFtpConfigInput>
    connectOrCreate?: ShopCreateOrConnectWithoutFtpConfigInput
    upsert?: ShopUpsertWithoutFtpConfigInput
    connect?: ShopWhereUniqueInput
    update?: XOR<XOR<ShopUpdateToOneWithWhereWithoutFtpConfigInput, ShopUpdateWithoutFtpConfigInput>, ShopUncheckedUpdateWithoutFtpConfigInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumExportFormatNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ExportFormat | EnumExportFormatFieldRefInput<$PrismaModel> | null
    in?: $Enums.ExportFormat[] | ListEnumExportFormatFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ExportFormat[] | ListEnumExportFormatFieldRefInput<$PrismaModel> | null
    not?: NestedEnumExportFormatNullableFilter<$PrismaModel> | $Enums.ExportFormat | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumExportFormatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExportFormat | EnumExportFormatFieldRefInput<$PrismaModel> | null
    in?: $Enums.ExportFormat[] | ListEnumExportFormatFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ExportFormat[] | ListEnumExportFormatFieldRefInput<$PrismaModel> | null
    not?: NestedEnumExportFormatNullableWithAggregatesFilter<$PrismaModel> | $Enums.ExportFormat | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumExportFormatNullableFilter<$PrismaModel>
    _max?: NestedEnumExportFormatNullableFilter<$PrismaModel>
  }

  export type NestedEnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus
  }

  export type NestedEnumExportFormatFilter<$PrismaModel = never> = {
    equals?: $Enums.ExportFormat | EnumExportFormatFieldRefInput<$PrismaModel>
    in?: $Enums.ExportFormat[] | ListEnumExportFormatFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExportFormat[] | ListEnumExportFormatFieldRefInput<$PrismaModel>
    not?: NestedEnumExportFormatFilter<$PrismaModel> | $Enums.ExportFormat
  }

  export type NestedEnumFtpDeliveryStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.FtpDeliveryStatus | EnumFtpDeliveryStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.FtpDeliveryStatus[] | ListEnumFtpDeliveryStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.FtpDeliveryStatus[] | ListEnumFtpDeliveryStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumFtpDeliveryStatusNullableFilter<$PrismaModel> | $Enums.FtpDeliveryStatus | null
  }

  export type NestedEnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportStatusFilter<$PrismaModel>
    _max?: NestedEnumReportStatusFilter<$PrismaModel>
  }

  export type NestedEnumExportFormatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExportFormat | EnumExportFormatFieldRefInput<$PrismaModel>
    in?: $Enums.ExportFormat[] | ListEnumExportFormatFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExportFormat[] | ListEnumExportFormatFieldRefInput<$PrismaModel>
    not?: NestedEnumExportFormatWithAggregatesFilter<$PrismaModel> | $Enums.ExportFormat
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExportFormatFilter<$PrismaModel>
    _max?: NestedEnumExportFormatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumFtpDeliveryStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FtpDeliveryStatus | EnumFtpDeliveryStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.FtpDeliveryStatus[] | ListEnumFtpDeliveryStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.FtpDeliveryStatus[] | ListEnumFtpDeliveryStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumFtpDeliveryStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.FtpDeliveryStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumFtpDeliveryStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumFtpDeliveryStatusNullableFilter<$PrismaModel>
  }

  export type NestedEnumProtocolFilter<$PrismaModel = never> = {
    equals?: $Enums.Protocol | EnumProtocolFieldRefInput<$PrismaModel>
    in?: $Enums.Protocol[] | ListEnumProtocolFieldRefInput<$PrismaModel>
    notIn?: $Enums.Protocol[] | ListEnumProtocolFieldRefInput<$PrismaModel>
    not?: NestedEnumProtocolFilter<$PrismaModel> | $Enums.Protocol
  }

  export type NestedEnumProtocolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Protocol | EnumProtocolFieldRefInput<$PrismaModel>
    in?: $Enums.Protocol[] | ListEnumProtocolFieldRefInput<$PrismaModel>
    notIn?: $Enums.Protocol[] | ListEnumProtocolFieldRefInput<$PrismaModel>
    not?: NestedEnumProtocolWithAggregatesFilter<$PrismaModel> | $Enums.Protocol
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProtocolFilter<$PrismaModel>
    _max?: NestedEnumProtocolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FiscalConfigurationCreateWithoutShopInput = {
    id?: string
    code: string
    name: string
    description: string
    countries?: FiscalConfigurationCreatecountriesInput | string[]
    currency: string
    fileFormat: string
    encoding: string
    separator: string
    requiredColumns?: FiscalConfigurationCreaterequiredColumnsInput | string[]
    taxRates: JsonNullValueInput | InputJsonValue
    compatibleSoftware?: FiscalConfigurationCreatecompatibleSoftwareInput | string[]
    exportFormats?: FiscalConfigurationCreateexportFormatsInput | string[]
    notes: string
    companyName?: string | null
    country?: string | null
    vatRate?: number | null
    defaultFormat?: $Enums.ExportFormat | null
    salesAccount?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FiscalConfigurationUncheckedCreateWithoutShopInput = {
    id?: string
    code: string
    name: string
    description: string
    countries?: FiscalConfigurationCreatecountriesInput | string[]
    currency: string
    fileFormat: string
    encoding: string
    separator: string
    requiredColumns?: FiscalConfigurationCreaterequiredColumnsInput | string[]
    taxRates: JsonNullValueInput | InputJsonValue
    compatibleSoftware?: FiscalConfigurationCreatecompatibleSoftwareInput | string[]
    exportFormats?: FiscalConfigurationCreateexportFormatsInput | string[]
    notes: string
    companyName?: string | null
    country?: string | null
    vatRate?: number | null
    defaultFormat?: $Enums.ExportFormat | null
    salesAccount?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FiscalConfigurationCreateOrConnectWithoutShopInput = {
    where: FiscalConfigurationWhereUniqueInput
    create: XOR<FiscalConfigurationCreateWithoutShopInput, FiscalConfigurationUncheckedCreateWithoutShopInput>
  }

  export type ReportCreateWithoutShopInput = {
    id?: string
    type: string
    dataType: string
    status: $Enums.ReportStatus
    format: $Enums.ExportFormat
    startDate?: Date | string | null
    endDate?: Date | string | null
    fileSize: number
    fileName: string
    filePath?: string | null
    errorMessage?: string | null
    deliveryMethod?: string
    ftpDeliveryStatus?: $Enums.FtpDeliveryStatus | null
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduledTasks?: ScheduledTaskCreateNestedManyWithoutReportInput
    tasks?: TaskCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutShopInput = {
    id?: string
    type: string
    dataType: string
    status: $Enums.ReportStatus
    format: $Enums.ExportFormat
    startDate?: Date | string | null
    endDate?: Date | string | null
    fileSize: number
    fileName: string
    filePath?: string | null
    errorMessage?: string | null
    deliveryMethod?: string
    ftpDeliveryStatus?: $Enums.FtpDeliveryStatus | null
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduledTasks?: ScheduledTaskUncheckedCreateNestedManyWithoutReportInput
    tasks?: TaskUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutShopInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutShopInput, ReportUncheckedCreateWithoutShopInput>
  }

  export type ReportCreateManyShopInputEnvelope = {
    data: ReportCreateManyShopInput | ReportCreateManyShopInput[]
    skipDuplicates?: boolean
  }

  export type GeneralSettingsCreateWithoutShopInput = {
    id?: string
    timezone?: string
    language?: string
    salesAccount?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GeneralSettingsUncheckedCreateWithoutShopInput = {
    id?: string
    timezone?: string
    language?: string
    salesAccount?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GeneralSettingsCreateOrConnectWithoutShopInput = {
    where: GeneralSettingsWhereUniqueInput
    create: XOR<GeneralSettingsCreateWithoutShopInput, GeneralSettingsUncheckedCreateWithoutShopInput>
  }

  export type FtpConfigCreateWithoutShopInput = {
    id?: string
    host: string
    port?: number
    protocol?: $Enums.Protocol
    username: string
    password: string
    directory?: string
    passiveMode?: boolean
    retryDelay?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FtpConfigUncheckedCreateWithoutShopInput = {
    id?: string
    host: string
    port?: number
    protocol?: $Enums.Protocol
    username: string
    password: string
    directory?: string
    passiveMode?: boolean
    retryDelay?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FtpConfigCreateOrConnectWithoutShopInput = {
    where: FtpConfigWhereUniqueInput
    create: XOR<FtpConfigCreateWithoutShopInput, FtpConfigUncheckedCreateWithoutShopInput>
  }

  export type ScheduledTaskCreateWithoutShopInput = {
    id?: string
    frequency: string
    executionDay: number
    executionTime: string
    emailConfig: string
    lastRun?: Date | string | null
    nextRun: Date | string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    report: ReportCreateNestedOneWithoutScheduledTasksInput
    tasks?: TaskCreateNestedManyWithoutScheduledTaskInput
  }

  export type ScheduledTaskUncheckedCreateWithoutShopInput = {
    id?: string
    reportId: string
    frequency: string
    executionDay: number
    executionTime: string
    emailConfig: string
    lastRun?: Date | string | null
    nextRun: Date | string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutScheduledTaskInput
  }

  export type ScheduledTaskCreateOrConnectWithoutShopInput = {
    where: ScheduledTaskWhereUniqueInput
    create: XOR<ScheduledTaskCreateWithoutShopInput, ScheduledTaskUncheckedCreateWithoutShopInput>
  }

  export type ScheduledTaskCreateManyShopInputEnvelope = {
    data: ScheduledTaskCreateManyShopInput | ScheduledTaskCreateManyShopInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutShopInput = {
    id?: string
    status: string
    scheduledFor: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    emailConfig: string
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduledTask: ScheduledTaskCreateNestedOneWithoutTasksInput
    report: ReportCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutShopInput = {
    id?: string
    scheduledTaskId: string
    reportId: string
    status: string
    scheduledFor: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    emailConfig: string
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateOrConnectWithoutShopInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutShopInput, TaskUncheckedCreateWithoutShopInput>
  }

  export type TaskCreateManyShopInputEnvelope = {
    data: TaskCreateManyShopInput | TaskCreateManyShopInput[]
    skipDuplicates?: boolean
  }

  export type FiscalConfigurationUpsertWithoutShopInput = {
    update: XOR<FiscalConfigurationUpdateWithoutShopInput, FiscalConfigurationUncheckedUpdateWithoutShopInput>
    create: XOR<FiscalConfigurationCreateWithoutShopInput, FiscalConfigurationUncheckedCreateWithoutShopInput>
    where?: FiscalConfigurationWhereInput
  }

  export type FiscalConfigurationUpdateToOneWithWhereWithoutShopInput = {
    where?: FiscalConfigurationWhereInput
    data: XOR<FiscalConfigurationUpdateWithoutShopInput, FiscalConfigurationUncheckedUpdateWithoutShopInput>
  }

  export type FiscalConfigurationUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    countries?: FiscalConfigurationUpdatecountriesInput | string[]
    currency?: StringFieldUpdateOperationsInput | string
    fileFormat?: StringFieldUpdateOperationsInput | string
    encoding?: StringFieldUpdateOperationsInput | string
    separator?: StringFieldUpdateOperationsInput | string
    requiredColumns?: FiscalConfigurationUpdaterequiredColumnsInput | string[]
    taxRates?: JsonNullValueInput | InputJsonValue
    compatibleSoftware?: FiscalConfigurationUpdatecompatibleSoftwareInput | string[]
    exportFormats?: FiscalConfigurationUpdateexportFormatsInput | string[]
    notes?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    vatRate?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultFormat?: NullableEnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat | null
    salesAccount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FiscalConfigurationUncheckedUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    countries?: FiscalConfigurationUpdatecountriesInput | string[]
    currency?: StringFieldUpdateOperationsInput | string
    fileFormat?: StringFieldUpdateOperationsInput | string
    encoding?: StringFieldUpdateOperationsInput | string
    separator?: StringFieldUpdateOperationsInput | string
    requiredColumns?: FiscalConfigurationUpdaterequiredColumnsInput | string[]
    taxRates?: JsonNullValueInput | InputJsonValue
    compatibleSoftware?: FiscalConfigurationUpdatecompatibleSoftwareInput | string[]
    exportFormats?: FiscalConfigurationUpdateexportFormatsInput | string[]
    notes?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    vatRate?: NullableFloatFieldUpdateOperationsInput | number | null
    defaultFormat?: NullableEnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat | null
    salesAccount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUpsertWithWhereUniqueWithoutShopInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutShopInput, ReportUncheckedUpdateWithoutShopInput>
    create: XOR<ReportCreateWithoutShopInput, ReportUncheckedCreateWithoutShopInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutShopInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutShopInput, ReportUncheckedUpdateWithoutShopInput>
  }

  export type ReportUpdateManyWithWhereWithoutShopInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutShopInput>
  }

  export type ReportScalarWhereInput = {
    AND?: ReportScalarWhereInput | ReportScalarWhereInput[]
    OR?: ReportScalarWhereInput[]
    NOT?: ReportScalarWhereInput | ReportScalarWhereInput[]
    id?: StringFilter<"Report"> | string
    type?: StringFilter<"Report"> | string
    dataType?: StringFilter<"Report"> | string
    status?: EnumReportStatusFilter<"Report"> | $Enums.ReportStatus
    format?: EnumExportFormatFilter<"Report"> | $Enums.ExportFormat
    startDate?: DateTimeNullableFilter<"Report"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Report"> | Date | string | null
    shopId?: StringFilter<"Report"> | string
    fileSize?: IntFilter<"Report"> | number
    fileName?: StringFilter<"Report"> | string
    filePath?: StringNullableFilter<"Report"> | string | null
    errorMessage?: StringNullableFilter<"Report"> | string | null
    deliveryMethod?: StringFilter<"Report"> | string
    ftpDeliveryStatus?: EnumFtpDeliveryStatusNullableFilter<"Report"> | $Enums.FtpDeliveryStatus | null
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
  }

  export type GeneralSettingsUpsertWithoutShopInput = {
    update: XOR<GeneralSettingsUpdateWithoutShopInput, GeneralSettingsUncheckedUpdateWithoutShopInput>
    create: XOR<GeneralSettingsCreateWithoutShopInput, GeneralSettingsUncheckedCreateWithoutShopInput>
    where?: GeneralSettingsWhereInput
  }

  export type GeneralSettingsUpdateToOneWithWhereWithoutShopInput = {
    where?: GeneralSettingsWhereInput
    data: XOR<GeneralSettingsUpdateWithoutShopInput, GeneralSettingsUncheckedUpdateWithoutShopInput>
  }

  export type GeneralSettingsUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    salesAccount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeneralSettingsUncheckedUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    salesAccount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FtpConfigUpsertWithoutShopInput = {
    update: XOR<FtpConfigUpdateWithoutShopInput, FtpConfigUncheckedUpdateWithoutShopInput>
    create: XOR<FtpConfigCreateWithoutShopInput, FtpConfigUncheckedCreateWithoutShopInput>
    where?: FtpConfigWhereInput
  }

  export type FtpConfigUpdateToOneWithWhereWithoutShopInput = {
    where?: FtpConfigWhereInput
    data: XOR<FtpConfigUpdateWithoutShopInput, FtpConfigUncheckedUpdateWithoutShopInput>
  }

  export type FtpConfigUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    protocol?: EnumProtocolFieldUpdateOperationsInput | $Enums.Protocol
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    directory?: StringFieldUpdateOperationsInput | string
    passiveMode?: BoolFieldUpdateOperationsInput | boolean
    retryDelay?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FtpConfigUncheckedUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    protocol?: EnumProtocolFieldUpdateOperationsInput | $Enums.Protocol
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    directory?: StringFieldUpdateOperationsInput | string
    passiveMode?: BoolFieldUpdateOperationsInput | boolean
    retryDelay?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledTaskUpsertWithWhereUniqueWithoutShopInput = {
    where: ScheduledTaskWhereUniqueInput
    update: XOR<ScheduledTaskUpdateWithoutShopInput, ScheduledTaskUncheckedUpdateWithoutShopInput>
    create: XOR<ScheduledTaskCreateWithoutShopInput, ScheduledTaskUncheckedCreateWithoutShopInput>
  }

  export type ScheduledTaskUpdateWithWhereUniqueWithoutShopInput = {
    where: ScheduledTaskWhereUniqueInput
    data: XOR<ScheduledTaskUpdateWithoutShopInput, ScheduledTaskUncheckedUpdateWithoutShopInput>
  }

  export type ScheduledTaskUpdateManyWithWhereWithoutShopInput = {
    where: ScheduledTaskScalarWhereInput
    data: XOR<ScheduledTaskUpdateManyMutationInput, ScheduledTaskUncheckedUpdateManyWithoutShopInput>
  }

  export type ScheduledTaskScalarWhereInput = {
    AND?: ScheduledTaskScalarWhereInput | ScheduledTaskScalarWhereInput[]
    OR?: ScheduledTaskScalarWhereInput[]
    NOT?: ScheduledTaskScalarWhereInput | ScheduledTaskScalarWhereInput[]
    id?: StringFilter<"ScheduledTask"> | string
    reportId?: StringFilter<"ScheduledTask"> | string
    shopId?: StringFilter<"ScheduledTask"> | string
    frequency?: StringFilter<"ScheduledTask"> | string
    executionDay?: IntFilter<"ScheduledTask"> | number
    executionTime?: StringFilter<"ScheduledTask"> | string
    emailConfig?: StringFilter<"ScheduledTask"> | string
    lastRun?: DateTimeNullableFilter<"ScheduledTask"> | Date | string | null
    nextRun?: DateTimeFilter<"ScheduledTask"> | Date | string
    status?: StringFilter<"ScheduledTask"> | string
    createdAt?: DateTimeFilter<"ScheduledTask"> | Date | string
    updatedAt?: DateTimeFilter<"ScheduledTask"> | Date | string
  }

  export type TaskUpsertWithWhereUniqueWithoutShopInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutShopInput, TaskUncheckedUpdateWithoutShopInput>
    create: XOR<TaskCreateWithoutShopInput, TaskUncheckedCreateWithoutShopInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutShopInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutShopInput, TaskUncheckedUpdateWithoutShopInput>
  }

  export type TaskUpdateManyWithWhereWithoutShopInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutShopInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    scheduledTaskId?: StringFilter<"Task"> | string
    shopId?: StringFilter<"Task"> | string
    reportId?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    scheduledFor?: DateTimeFilter<"Task"> | Date | string
    startedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    emailConfig?: StringFilter<"Task"> | string
    errorMessage?: StringNullableFilter<"Task"> | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
  }

  export type ShopCreateWithoutFiscalConfigInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportCreateNestedManyWithoutShopInput
    generalSettings?: GeneralSettingsCreateNestedOneWithoutShopInput
    ftpConfig?: FtpConfigCreateNestedOneWithoutShopInput
    scheduledTasks?: ScheduledTaskCreateNestedManyWithoutShopInput
    tasks?: TaskCreateNestedManyWithoutShopInput
  }

  export type ShopUncheckedCreateWithoutFiscalConfigInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportUncheckedCreateNestedManyWithoutShopInput
    generalSettings?: GeneralSettingsUncheckedCreateNestedOneWithoutShopInput
    ftpConfig?: FtpConfigUncheckedCreateNestedOneWithoutShopInput
    scheduledTasks?: ScheduledTaskUncheckedCreateNestedManyWithoutShopInput
    tasks?: TaskUncheckedCreateNestedManyWithoutShopInput
  }

  export type ShopCreateOrConnectWithoutFiscalConfigInput = {
    where: ShopWhereUniqueInput
    create: XOR<ShopCreateWithoutFiscalConfigInput, ShopUncheckedCreateWithoutFiscalConfigInput>
  }

  export type ShopUpsertWithoutFiscalConfigInput = {
    update: XOR<ShopUpdateWithoutFiscalConfigInput, ShopUncheckedUpdateWithoutFiscalConfigInput>
    create: XOR<ShopCreateWithoutFiscalConfigInput, ShopUncheckedCreateWithoutFiscalConfigInput>
    where?: ShopWhereInput
  }

  export type ShopUpdateToOneWithWhereWithoutFiscalConfigInput = {
    where?: ShopWhereInput
    data: XOR<ShopUpdateWithoutFiscalConfigInput, ShopUncheckedUpdateWithoutFiscalConfigInput>
  }

  export type ShopUpdateWithoutFiscalConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUpdateManyWithoutShopNestedInput
    generalSettings?: GeneralSettingsUpdateOneWithoutShopNestedInput
    ftpConfig?: FtpConfigUpdateOneWithoutShopNestedInput
    scheduledTasks?: ScheduledTaskUpdateManyWithoutShopNestedInput
    tasks?: TaskUpdateManyWithoutShopNestedInput
  }

  export type ShopUncheckedUpdateWithoutFiscalConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUncheckedUpdateManyWithoutShopNestedInput
    generalSettings?: GeneralSettingsUncheckedUpdateOneWithoutShopNestedInput
    ftpConfig?: FtpConfigUncheckedUpdateOneWithoutShopNestedInput
    scheduledTasks?: ScheduledTaskUncheckedUpdateManyWithoutShopNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutShopNestedInput
  }

  export type ShopCreateWithoutReportsInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fiscalConfig?: FiscalConfigurationCreateNestedOneWithoutShopInput
    generalSettings?: GeneralSettingsCreateNestedOneWithoutShopInput
    ftpConfig?: FtpConfigCreateNestedOneWithoutShopInput
    scheduledTasks?: ScheduledTaskCreateNestedManyWithoutShopInput
    tasks?: TaskCreateNestedManyWithoutShopInput
  }

  export type ShopUncheckedCreateWithoutReportsInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fiscalConfig?: FiscalConfigurationUncheckedCreateNestedOneWithoutShopInput
    generalSettings?: GeneralSettingsUncheckedCreateNestedOneWithoutShopInput
    ftpConfig?: FtpConfigUncheckedCreateNestedOneWithoutShopInput
    scheduledTasks?: ScheduledTaskUncheckedCreateNestedManyWithoutShopInput
    tasks?: TaskUncheckedCreateNestedManyWithoutShopInput
  }

  export type ShopCreateOrConnectWithoutReportsInput = {
    where: ShopWhereUniqueInput
    create: XOR<ShopCreateWithoutReportsInput, ShopUncheckedCreateWithoutReportsInput>
  }

  export type ScheduledTaskCreateWithoutReportInput = {
    id?: string
    frequency: string
    executionDay: number
    executionTime: string
    emailConfig: string
    lastRun?: Date | string | null
    nextRun: Date | string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutScheduledTasksInput
    tasks?: TaskCreateNestedManyWithoutScheduledTaskInput
  }

  export type ScheduledTaskUncheckedCreateWithoutReportInput = {
    id?: string
    shopId: string
    frequency: string
    executionDay: number
    executionTime: string
    emailConfig: string
    lastRun?: Date | string | null
    nextRun: Date | string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutScheduledTaskInput
  }

  export type ScheduledTaskCreateOrConnectWithoutReportInput = {
    where: ScheduledTaskWhereUniqueInput
    create: XOR<ScheduledTaskCreateWithoutReportInput, ScheduledTaskUncheckedCreateWithoutReportInput>
  }

  export type ScheduledTaskCreateManyReportInputEnvelope = {
    data: ScheduledTaskCreateManyReportInput | ScheduledTaskCreateManyReportInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutReportInput = {
    id?: string
    status: string
    scheduledFor: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    emailConfig: string
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduledTask: ScheduledTaskCreateNestedOneWithoutTasksInput
    shop: ShopCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutReportInput = {
    id?: string
    scheduledTaskId: string
    shopId: string
    status: string
    scheduledFor: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    emailConfig: string
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateOrConnectWithoutReportInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutReportInput, TaskUncheckedCreateWithoutReportInput>
  }

  export type TaskCreateManyReportInputEnvelope = {
    data: TaskCreateManyReportInput | TaskCreateManyReportInput[]
    skipDuplicates?: boolean
  }

  export type ShopUpsertWithoutReportsInput = {
    update: XOR<ShopUpdateWithoutReportsInput, ShopUncheckedUpdateWithoutReportsInput>
    create: XOR<ShopCreateWithoutReportsInput, ShopUncheckedCreateWithoutReportsInput>
    where?: ShopWhereInput
  }

  export type ShopUpdateToOneWithWhereWithoutReportsInput = {
    where?: ShopWhereInput
    data: XOR<ShopUpdateWithoutReportsInput, ShopUncheckedUpdateWithoutReportsInput>
  }

  export type ShopUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalConfig?: FiscalConfigurationUpdateOneWithoutShopNestedInput
    generalSettings?: GeneralSettingsUpdateOneWithoutShopNestedInput
    ftpConfig?: FtpConfigUpdateOneWithoutShopNestedInput
    scheduledTasks?: ScheduledTaskUpdateManyWithoutShopNestedInput
    tasks?: TaskUpdateManyWithoutShopNestedInput
  }

  export type ShopUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalConfig?: FiscalConfigurationUncheckedUpdateOneWithoutShopNestedInput
    generalSettings?: GeneralSettingsUncheckedUpdateOneWithoutShopNestedInput
    ftpConfig?: FtpConfigUncheckedUpdateOneWithoutShopNestedInput
    scheduledTasks?: ScheduledTaskUncheckedUpdateManyWithoutShopNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutShopNestedInput
  }

  export type ScheduledTaskUpsertWithWhereUniqueWithoutReportInput = {
    where: ScheduledTaskWhereUniqueInput
    update: XOR<ScheduledTaskUpdateWithoutReportInput, ScheduledTaskUncheckedUpdateWithoutReportInput>
    create: XOR<ScheduledTaskCreateWithoutReportInput, ScheduledTaskUncheckedCreateWithoutReportInput>
  }

  export type ScheduledTaskUpdateWithWhereUniqueWithoutReportInput = {
    where: ScheduledTaskWhereUniqueInput
    data: XOR<ScheduledTaskUpdateWithoutReportInput, ScheduledTaskUncheckedUpdateWithoutReportInput>
  }

  export type ScheduledTaskUpdateManyWithWhereWithoutReportInput = {
    where: ScheduledTaskScalarWhereInput
    data: XOR<ScheduledTaskUpdateManyMutationInput, ScheduledTaskUncheckedUpdateManyWithoutReportInput>
  }

  export type TaskUpsertWithWhereUniqueWithoutReportInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutReportInput, TaskUncheckedUpdateWithoutReportInput>
    create: XOR<TaskCreateWithoutReportInput, TaskUncheckedCreateWithoutReportInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutReportInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutReportInput, TaskUncheckedUpdateWithoutReportInput>
  }

  export type TaskUpdateManyWithWhereWithoutReportInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutReportInput>
  }

  export type ReportCreateWithoutScheduledTasksInput = {
    id?: string
    type: string
    dataType: string
    status: $Enums.ReportStatus
    format: $Enums.ExportFormat
    startDate?: Date | string | null
    endDate?: Date | string | null
    fileSize: number
    fileName: string
    filePath?: string | null
    errorMessage?: string | null
    deliveryMethod?: string
    ftpDeliveryStatus?: $Enums.FtpDeliveryStatus | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutReportsInput
    tasks?: TaskCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutScheduledTasksInput = {
    id?: string
    type: string
    dataType: string
    status: $Enums.ReportStatus
    format: $Enums.ExportFormat
    startDate?: Date | string | null
    endDate?: Date | string | null
    shopId: string
    fileSize: number
    fileName: string
    filePath?: string | null
    errorMessage?: string | null
    deliveryMethod?: string
    ftpDeliveryStatus?: $Enums.FtpDeliveryStatus | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutScheduledTasksInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutScheduledTasksInput, ReportUncheckedCreateWithoutScheduledTasksInput>
  }

  export type ShopCreateWithoutScheduledTasksInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fiscalConfig?: FiscalConfigurationCreateNestedOneWithoutShopInput
    reports?: ReportCreateNestedManyWithoutShopInput
    generalSettings?: GeneralSettingsCreateNestedOneWithoutShopInput
    ftpConfig?: FtpConfigCreateNestedOneWithoutShopInput
    tasks?: TaskCreateNestedManyWithoutShopInput
  }

  export type ShopUncheckedCreateWithoutScheduledTasksInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fiscalConfig?: FiscalConfigurationUncheckedCreateNestedOneWithoutShopInput
    reports?: ReportUncheckedCreateNestedManyWithoutShopInput
    generalSettings?: GeneralSettingsUncheckedCreateNestedOneWithoutShopInput
    ftpConfig?: FtpConfigUncheckedCreateNestedOneWithoutShopInput
    tasks?: TaskUncheckedCreateNestedManyWithoutShopInput
  }

  export type ShopCreateOrConnectWithoutScheduledTasksInput = {
    where: ShopWhereUniqueInput
    create: XOR<ShopCreateWithoutScheduledTasksInput, ShopUncheckedCreateWithoutScheduledTasksInput>
  }

  export type TaskCreateWithoutScheduledTaskInput = {
    id?: string
    status: string
    scheduledFor: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    emailConfig: string
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutTasksInput
    report: ReportCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutScheduledTaskInput = {
    id?: string
    shopId: string
    reportId: string
    status: string
    scheduledFor: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    emailConfig: string
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateOrConnectWithoutScheduledTaskInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutScheduledTaskInput, TaskUncheckedCreateWithoutScheduledTaskInput>
  }

  export type TaskCreateManyScheduledTaskInputEnvelope = {
    data: TaskCreateManyScheduledTaskInput | TaskCreateManyScheduledTaskInput[]
    skipDuplicates?: boolean
  }

  export type ReportUpsertWithoutScheduledTasksInput = {
    update: XOR<ReportUpdateWithoutScheduledTasksInput, ReportUncheckedUpdateWithoutScheduledTasksInput>
    create: XOR<ReportCreateWithoutScheduledTasksInput, ReportUncheckedCreateWithoutScheduledTasksInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutScheduledTasksInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutScheduledTasksInput, ReportUncheckedUpdateWithoutScheduledTasksInput>
  }

  export type ReportUpdateWithoutScheduledTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dataType?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    format?: EnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fileSize?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryMethod?: StringFieldUpdateOperationsInput | string
    ftpDeliveryStatus?: NullableEnumFtpDeliveryStatusFieldUpdateOperationsInput | $Enums.FtpDeliveryStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutReportsNestedInput
    tasks?: TaskUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutScheduledTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dataType?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    format?: EnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shopId?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryMethod?: StringFieldUpdateOperationsInput | string
    ftpDeliveryStatus?: NullableEnumFtpDeliveryStatusFieldUpdateOperationsInput | $Enums.FtpDeliveryStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ShopUpsertWithoutScheduledTasksInput = {
    update: XOR<ShopUpdateWithoutScheduledTasksInput, ShopUncheckedUpdateWithoutScheduledTasksInput>
    create: XOR<ShopCreateWithoutScheduledTasksInput, ShopUncheckedCreateWithoutScheduledTasksInput>
    where?: ShopWhereInput
  }

  export type ShopUpdateToOneWithWhereWithoutScheduledTasksInput = {
    where?: ShopWhereInput
    data: XOR<ShopUpdateWithoutScheduledTasksInput, ShopUncheckedUpdateWithoutScheduledTasksInput>
  }

  export type ShopUpdateWithoutScheduledTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalConfig?: FiscalConfigurationUpdateOneWithoutShopNestedInput
    reports?: ReportUpdateManyWithoutShopNestedInput
    generalSettings?: GeneralSettingsUpdateOneWithoutShopNestedInput
    ftpConfig?: FtpConfigUpdateOneWithoutShopNestedInput
    tasks?: TaskUpdateManyWithoutShopNestedInput
  }

  export type ShopUncheckedUpdateWithoutScheduledTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalConfig?: FiscalConfigurationUncheckedUpdateOneWithoutShopNestedInput
    reports?: ReportUncheckedUpdateManyWithoutShopNestedInput
    generalSettings?: GeneralSettingsUncheckedUpdateOneWithoutShopNestedInput
    ftpConfig?: FtpConfigUncheckedUpdateOneWithoutShopNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutShopNestedInput
  }

  export type TaskUpsertWithWhereUniqueWithoutScheduledTaskInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutScheduledTaskInput, TaskUncheckedUpdateWithoutScheduledTaskInput>
    create: XOR<TaskCreateWithoutScheduledTaskInput, TaskUncheckedCreateWithoutScheduledTaskInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutScheduledTaskInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutScheduledTaskInput, TaskUncheckedUpdateWithoutScheduledTaskInput>
  }

  export type TaskUpdateManyWithWhereWithoutScheduledTaskInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutScheduledTaskInput>
  }

  export type ScheduledTaskCreateWithoutTasksInput = {
    id?: string
    frequency: string
    executionDay: number
    executionTime: string
    emailConfig: string
    lastRun?: Date | string | null
    nextRun: Date | string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    report: ReportCreateNestedOneWithoutScheduledTasksInput
    shop: ShopCreateNestedOneWithoutScheduledTasksInput
  }

  export type ScheduledTaskUncheckedCreateWithoutTasksInput = {
    id?: string
    reportId: string
    shopId: string
    frequency: string
    executionDay: number
    executionTime: string
    emailConfig: string
    lastRun?: Date | string | null
    nextRun: Date | string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduledTaskCreateOrConnectWithoutTasksInput = {
    where: ScheduledTaskWhereUniqueInput
    create: XOR<ScheduledTaskCreateWithoutTasksInput, ScheduledTaskUncheckedCreateWithoutTasksInput>
  }

  export type ShopCreateWithoutTasksInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fiscalConfig?: FiscalConfigurationCreateNestedOneWithoutShopInput
    reports?: ReportCreateNestedManyWithoutShopInput
    generalSettings?: GeneralSettingsCreateNestedOneWithoutShopInput
    ftpConfig?: FtpConfigCreateNestedOneWithoutShopInput
    scheduledTasks?: ScheduledTaskCreateNestedManyWithoutShopInput
  }

  export type ShopUncheckedCreateWithoutTasksInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fiscalConfig?: FiscalConfigurationUncheckedCreateNestedOneWithoutShopInput
    reports?: ReportUncheckedCreateNestedManyWithoutShopInput
    generalSettings?: GeneralSettingsUncheckedCreateNestedOneWithoutShopInput
    ftpConfig?: FtpConfigUncheckedCreateNestedOneWithoutShopInput
    scheduledTasks?: ScheduledTaskUncheckedCreateNestedManyWithoutShopInput
  }

  export type ShopCreateOrConnectWithoutTasksInput = {
    where: ShopWhereUniqueInput
    create: XOR<ShopCreateWithoutTasksInput, ShopUncheckedCreateWithoutTasksInput>
  }

  export type ReportCreateWithoutTasksInput = {
    id?: string
    type: string
    dataType: string
    status: $Enums.ReportStatus
    format: $Enums.ExportFormat
    startDate?: Date | string | null
    endDate?: Date | string | null
    fileSize: number
    fileName: string
    filePath?: string | null
    errorMessage?: string | null
    deliveryMethod?: string
    ftpDeliveryStatus?: $Enums.FtpDeliveryStatus | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutReportsInput
    scheduledTasks?: ScheduledTaskCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutTasksInput = {
    id?: string
    type: string
    dataType: string
    status: $Enums.ReportStatus
    format: $Enums.ExportFormat
    startDate?: Date | string | null
    endDate?: Date | string | null
    shopId: string
    fileSize: number
    fileName: string
    filePath?: string | null
    errorMessage?: string | null
    deliveryMethod?: string
    ftpDeliveryStatus?: $Enums.FtpDeliveryStatus | null
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduledTasks?: ScheduledTaskUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutTasksInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutTasksInput, ReportUncheckedCreateWithoutTasksInput>
  }

  export type ScheduledTaskUpsertWithoutTasksInput = {
    update: XOR<ScheduledTaskUpdateWithoutTasksInput, ScheduledTaskUncheckedUpdateWithoutTasksInput>
    create: XOR<ScheduledTaskCreateWithoutTasksInput, ScheduledTaskUncheckedCreateWithoutTasksInput>
    where?: ScheduledTaskWhereInput
  }

  export type ScheduledTaskUpdateToOneWithWhereWithoutTasksInput = {
    where?: ScheduledTaskWhereInput
    data: XOR<ScheduledTaskUpdateWithoutTasksInput, ScheduledTaskUncheckedUpdateWithoutTasksInput>
  }

  export type ScheduledTaskUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    executionDay?: IntFieldUpdateOperationsInput | number
    executionTime?: StringFieldUpdateOperationsInput | string
    emailConfig?: StringFieldUpdateOperationsInput | string
    lastRun?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRun?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    report?: ReportUpdateOneRequiredWithoutScheduledTasksNestedInput
    shop?: ShopUpdateOneRequiredWithoutScheduledTasksNestedInput
  }

  export type ScheduledTaskUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    executionDay?: IntFieldUpdateOperationsInput | number
    executionTime?: StringFieldUpdateOperationsInput | string
    emailConfig?: StringFieldUpdateOperationsInput | string
    lastRun?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRun?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopUpsertWithoutTasksInput = {
    update: XOR<ShopUpdateWithoutTasksInput, ShopUncheckedUpdateWithoutTasksInput>
    create: XOR<ShopCreateWithoutTasksInput, ShopUncheckedCreateWithoutTasksInput>
    where?: ShopWhereInput
  }

  export type ShopUpdateToOneWithWhereWithoutTasksInput = {
    where?: ShopWhereInput
    data: XOR<ShopUpdateWithoutTasksInput, ShopUncheckedUpdateWithoutTasksInput>
  }

  export type ShopUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalConfig?: FiscalConfigurationUpdateOneWithoutShopNestedInput
    reports?: ReportUpdateManyWithoutShopNestedInput
    generalSettings?: GeneralSettingsUpdateOneWithoutShopNestedInput
    ftpConfig?: FtpConfigUpdateOneWithoutShopNestedInput
    scheduledTasks?: ScheduledTaskUpdateManyWithoutShopNestedInput
  }

  export type ShopUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalConfig?: FiscalConfigurationUncheckedUpdateOneWithoutShopNestedInput
    reports?: ReportUncheckedUpdateManyWithoutShopNestedInput
    generalSettings?: GeneralSettingsUncheckedUpdateOneWithoutShopNestedInput
    ftpConfig?: FtpConfigUncheckedUpdateOneWithoutShopNestedInput
    scheduledTasks?: ScheduledTaskUncheckedUpdateManyWithoutShopNestedInput
  }

  export type ReportUpsertWithoutTasksInput = {
    update: XOR<ReportUpdateWithoutTasksInput, ReportUncheckedUpdateWithoutTasksInput>
    create: XOR<ReportCreateWithoutTasksInput, ReportUncheckedCreateWithoutTasksInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutTasksInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutTasksInput, ReportUncheckedUpdateWithoutTasksInput>
  }

  export type ReportUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dataType?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    format?: EnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fileSize?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryMethod?: StringFieldUpdateOperationsInput | string
    ftpDeliveryStatus?: NullableEnumFtpDeliveryStatusFieldUpdateOperationsInput | $Enums.FtpDeliveryStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutReportsNestedInput
    scheduledTasks?: ScheduledTaskUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dataType?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    format?: EnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shopId?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryMethod?: StringFieldUpdateOperationsInput | string
    ftpDeliveryStatus?: NullableEnumFtpDeliveryStatusFieldUpdateOperationsInput | $Enums.FtpDeliveryStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTasks?: ScheduledTaskUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ShopCreateWithoutGeneralSettingsInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fiscalConfig?: FiscalConfigurationCreateNestedOneWithoutShopInput
    reports?: ReportCreateNestedManyWithoutShopInput
    ftpConfig?: FtpConfigCreateNestedOneWithoutShopInput
    scheduledTasks?: ScheduledTaskCreateNestedManyWithoutShopInput
    tasks?: TaskCreateNestedManyWithoutShopInput
  }

  export type ShopUncheckedCreateWithoutGeneralSettingsInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fiscalConfig?: FiscalConfigurationUncheckedCreateNestedOneWithoutShopInput
    reports?: ReportUncheckedCreateNestedManyWithoutShopInput
    ftpConfig?: FtpConfigUncheckedCreateNestedOneWithoutShopInput
    scheduledTasks?: ScheduledTaskUncheckedCreateNestedManyWithoutShopInput
    tasks?: TaskUncheckedCreateNestedManyWithoutShopInput
  }

  export type ShopCreateOrConnectWithoutGeneralSettingsInput = {
    where: ShopWhereUniqueInput
    create: XOR<ShopCreateWithoutGeneralSettingsInput, ShopUncheckedCreateWithoutGeneralSettingsInput>
  }

  export type ShopUpsertWithoutGeneralSettingsInput = {
    update: XOR<ShopUpdateWithoutGeneralSettingsInput, ShopUncheckedUpdateWithoutGeneralSettingsInput>
    create: XOR<ShopCreateWithoutGeneralSettingsInput, ShopUncheckedCreateWithoutGeneralSettingsInput>
    where?: ShopWhereInput
  }

  export type ShopUpdateToOneWithWhereWithoutGeneralSettingsInput = {
    where?: ShopWhereInput
    data: XOR<ShopUpdateWithoutGeneralSettingsInput, ShopUncheckedUpdateWithoutGeneralSettingsInput>
  }

  export type ShopUpdateWithoutGeneralSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalConfig?: FiscalConfigurationUpdateOneWithoutShopNestedInput
    reports?: ReportUpdateManyWithoutShopNestedInput
    ftpConfig?: FtpConfigUpdateOneWithoutShopNestedInput
    scheduledTasks?: ScheduledTaskUpdateManyWithoutShopNestedInput
    tasks?: TaskUpdateManyWithoutShopNestedInput
  }

  export type ShopUncheckedUpdateWithoutGeneralSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalConfig?: FiscalConfigurationUncheckedUpdateOneWithoutShopNestedInput
    reports?: ReportUncheckedUpdateManyWithoutShopNestedInput
    ftpConfig?: FtpConfigUncheckedUpdateOneWithoutShopNestedInput
    scheduledTasks?: ScheduledTaskUncheckedUpdateManyWithoutShopNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutShopNestedInput
  }

  export type ShopCreateWithoutFtpConfigInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fiscalConfig?: FiscalConfigurationCreateNestedOneWithoutShopInput
    reports?: ReportCreateNestedManyWithoutShopInput
    generalSettings?: GeneralSettingsCreateNestedOneWithoutShopInput
    scheduledTasks?: ScheduledTaskCreateNestedManyWithoutShopInput
    tasks?: TaskCreateNestedManyWithoutShopInput
  }

  export type ShopUncheckedCreateWithoutFtpConfigInput = {
    id?: string
    shopifyDomain: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fiscalConfig?: FiscalConfigurationUncheckedCreateNestedOneWithoutShopInput
    reports?: ReportUncheckedCreateNestedManyWithoutShopInput
    generalSettings?: GeneralSettingsUncheckedCreateNestedOneWithoutShopInput
    scheduledTasks?: ScheduledTaskUncheckedCreateNestedManyWithoutShopInput
    tasks?: TaskUncheckedCreateNestedManyWithoutShopInput
  }

  export type ShopCreateOrConnectWithoutFtpConfigInput = {
    where: ShopWhereUniqueInput
    create: XOR<ShopCreateWithoutFtpConfigInput, ShopUncheckedCreateWithoutFtpConfigInput>
  }

  export type ShopUpsertWithoutFtpConfigInput = {
    update: XOR<ShopUpdateWithoutFtpConfigInput, ShopUncheckedUpdateWithoutFtpConfigInput>
    create: XOR<ShopCreateWithoutFtpConfigInput, ShopUncheckedCreateWithoutFtpConfigInput>
    where?: ShopWhereInput
  }

  export type ShopUpdateToOneWithWhereWithoutFtpConfigInput = {
    where?: ShopWhereInput
    data: XOR<ShopUpdateWithoutFtpConfigInput, ShopUncheckedUpdateWithoutFtpConfigInput>
  }

  export type ShopUpdateWithoutFtpConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalConfig?: FiscalConfigurationUpdateOneWithoutShopNestedInput
    reports?: ReportUpdateManyWithoutShopNestedInput
    generalSettings?: GeneralSettingsUpdateOneWithoutShopNestedInput
    scheduledTasks?: ScheduledTaskUpdateManyWithoutShopNestedInput
    tasks?: TaskUpdateManyWithoutShopNestedInput
  }

  export type ShopUncheckedUpdateWithoutFtpConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopifyDomain?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalConfig?: FiscalConfigurationUncheckedUpdateOneWithoutShopNestedInput
    reports?: ReportUncheckedUpdateManyWithoutShopNestedInput
    generalSettings?: GeneralSettingsUncheckedUpdateOneWithoutShopNestedInput
    scheduledTasks?: ScheduledTaskUncheckedUpdateManyWithoutShopNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutShopNestedInput
  }

  export type ReportCreateManyShopInput = {
    id?: string
    type: string
    dataType: string
    status: $Enums.ReportStatus
    format: $Enums.ExportFormat
    startDate?: Date | string | null
    endDate?: Date | string | null
    fileSize: number
    fileName: string
    filePath?: string | null
    errorMessage?: string | null
    deliveryMethod?: string
    ftpDeliveryStatus?: $Enums.FtpDeliveryStatus | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduledTaskCreateManyShopInput = {
    id?: string
    reportId: string
    frequency: string
    executionDay: number
    executionTime: string
    emailConfig: string
    lastRun?: Date | string | null
    nextRun: Date | string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateManyShopInput = {
    id?: string
    scheduledTaskId: string
    reportId: string
    status: string
    scheduledFor: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    emailConfig: string
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dataType?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    format?: EnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fileSize?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryMethod?: StringFieldUpdateOperationsInput | string
    ftpDeliveryStatus?: NullableEnumFtpDeliveryStatusFieldUpdateOperationsInput | $Enums.FtpDeliveryStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTasks?: ScheduledTaskUpdateManyWithoutReportNestedInput
    tasks?: TaskUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dataType?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    format?: EnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fileSize?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryMethod?: StringFieldUpdateOperationsInput | string
    ftpDeliveryStatus?: NullableEnumFtpDeliveryStatusFieldUpdateOperationsInput | $Enums.FtpDeliveryStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTasks?: ScheduledTaskUncheckedUpdateManyWithoutReportNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateManyWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dataType?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    format?: EnumExportFormatFieldUpdateOperationsInput | $Enums.ExportFormat
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fileSize?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryMethod?: StringFieldUpdateOperationsInput | string
    ftpDeliveryStatus?: NullableEnumFtpDeliveryStatusFieldUpdateOperationsInput | $Enums.FtpDeliveryStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledTaskUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    executionDay?: IntFieldUpdateOperationsInput | number
    executionTime?: StringFieldUpdateOperationsInput | string
    emailConfig?: StringFieldUpdateOperationsInput | string
    lastRun?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRun?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    report?: ReportUpdateOneRequiredWithoutScheduledTasksNestedInput
    tasks?: TaskUpdateManyWithoutScheduledTaskNestedInput
  }

  export type ScheduledTaskUncheckedUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    executionDay?: IntFieldUpdateOperationsInput | number
    executionTime?: StringFieldUpdateOperationsInput | string
    emailConfig?: StringFieldUpdateOperationsInput | string
    lastRun?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRun?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutScheduledTaskNestedInput
  }

  export type ScheduledTaskUncheckedUpdateManyWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    executionDay?: IntFieldUpdateOperationsInput | number
    executionTime?: StringFieldUpdateOperationsInput | string
    emailConfig?: StringFieldUpdateOperationsInput | string
    lastRun?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRun?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailConfig?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTask?: ScheduledTaskUpdateOneRequiredWithoutTasksNestedInput
    report?: ReportUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledTaskId?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailConfig?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyWithoutShopInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledTaskId?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailConfig?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledTaskCreateManyReportInput = {
    id?: string
    shopId: string
    frequency: string
    executionDay: number
    executionTime: string
    emailConfig: string
    lastRun?: Date | string | null
    nextRun: Date | string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateManyReportInput = {
    id?: string
    scheduledTaskId: string
    shopId: string
    status: string
    scheduledFor: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    emailConfig: string
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduledTaskUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    executionDay?: IntFieldUpdateOperationsInput | number
    executionTime?: StringFieldUpdateOperationsInput | string
    emailConfig?: StringFieldUpdateOperationsInput | string
    lastRun?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRun?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutScheduledTasksNestedInput
    tasks?: TaskUpdateManyWithoutScheduledTaskNestedInput
  }

  export type ScheduledTaskUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    executionDay?: IntFieldUpdateOperationsInput | number
    executionTime?: StringFieldUpdateOperationsInput | string
    emailConfig?: StringFieldUpdateOperationsInput | string
    lastRun?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRun?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutScheduledTaskNestedInput
  }

  export type ScheduledTaskUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    executionDay?: IntFieldUpdateOperationsInput | number
    executionTime?: StringFieldUpdateOperationsInput | string
    emailConfig?: StringFieldUpdateOperationsInput | string
    lastRun?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRun?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailConfig?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledTask?: ScheduledTaskUpdateOneRequiredWithoutTasksNestedInput
    shop?: ShopUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledTaskId?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailConfig?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledTaskId?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailConfig?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyScheduledTaskInput = {
    id?: string
    shopId: string
    reportId: string
    status: string
    scheduledFor: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    emailConfig: string
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateWithoutScheduledTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailConfig?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutTasksNestedInput
    report?: ReportUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutScheduledTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailConfig?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyWithoutScheduledTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopId?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    scheduledFor?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailConfig?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}