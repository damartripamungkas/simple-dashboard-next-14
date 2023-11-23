declare namespace NodeJS {
  export interface ProcessEnv {
    readonly BASE_URL: string
    readonly SERVICE_URL_PRODUCT: string
    readonly DB_DIALECT: string
    readonly DB_HOST: string
    readonly DB_PORT: string
    readonly DB_USERNAME: string
    readonly DB_PASSWORD: string
    readonly DB_NAME: string
  }
}
