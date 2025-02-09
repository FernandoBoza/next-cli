
export type Config = {
  defaultPaths: {
    components: string,
    flags: string[],
    locationByFlag: { [key: string]: string }
  }
} | undefined