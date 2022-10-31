export declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    switchLocalePath(locale: string): string
    localePath(route: string, lang?: string): string
    localePath(route: { name?: string; params?: { [key: string]: string } }): string
    // $message: IMessage;
    // $notify: INotification;
    // $loading: (options?: ILoadingOptions) => ILoadingInstance;
    // $store: IRootStore
  }
}

// declare module '@nuxt/types' {
//   interface NuxtAppOptions {
//     i18n: VueI18n
//   }
// }