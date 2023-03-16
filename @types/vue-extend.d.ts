export declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    switchLocalePath(locale: string): string
    localePath(route: string, lang?: string): string
    localePath(route: { name?: string; params?: ObjectType<string> }): string
    // $message: IMessage;
    // $notify: INotification;
    // $loading: (options?: ILoadingOptions) => ILoadingInstance;
    // $store: IRootStore
  }
}
