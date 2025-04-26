export const swcPlugins = [
  [
    '@effector/swc-plugin',
    {
      transformLegacyDomainMethods: false,
    },
  ],
] satisfies Array<[string, Record<string, unknown>]>
