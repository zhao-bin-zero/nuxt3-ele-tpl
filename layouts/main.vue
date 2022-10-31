<!-- <template>
  <div class="layout-main flex">
    <SideMenu :is-collapse="!expand" @input="expand = $event"></SideMenu>
    <main class="main flex-1 flex flex-col">
      <NavBar v-model="expand" class="toolBar"></NavBar>
      <nuxt class="flex-1 main-container" />
    </main>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'MainLayout',
    data() {
      return {
        expand: true
      }
    },
    computed: {},
    async mounted() {
      await this['metadata/loadCountryOrRegion']()
      await this['metadata/loadCurrencies']()
      await this['metadata/loadChains']()
    },
    methods: {
      ...mapActions(['metadata/loadCountryOrRegion', 'metadata/loadCurrencies', 'metadata/loadChains'])
    }
  }
</script>

<style scoped lang="less">
  .layout-main {
    width: 100vw;
    height: 100vh;
    background: #f0f2f5;
    position: relative;
    left: 0;
    top: 0;

    main {
      overflow-x: scroll;
      min-height: 100vh;
      position: relative;
      padding-top: 48px;

      .toolBar {
        width: 100%;
        min-width: unit(1440-208, px);
        position: absolute;
        left: 0;
        top: 0;
      }
      .main-container {
        width: 100%;
        min-width: unit(1440-208-16 * 2, px);
        height: 100%;
        overflow-y: scroll;

        /deep/ header {
          background: white;
          padding: 24px 24px 0px;
          .info-wrap {
            position: relative;
            z-index: 2;
            background: white;
            overflow: hidden;
          }
          .el-tabs {
            .el-tabs__header {
              margin: 0;
            }
            .el-tabs__content {
              display: none;
            }
            .el-tabs__nav-wrap::after {
              background: transparent;
            }
          }
        }

        /deep/ .tabs-content {
          &:not(.bg-none) {
          }
          & > div {
            width: 100%;
            min-height: 100%;

            &.assets-wrap {
              dt {
                label {
                  display: inline-block;
                  min-width: 130px;
                  color: #000000;
                  margin-right: 10px;
                }
                span {
                  color: rgba(0, 0, 0, 0.56);
                }
              }
            }
          }
          .el-empty {
            min-height: 400px;
          }
        }
      }
      section.main-container {
        &:not(.no-bg) {
          background: white;
        }
        padding: 24px;
      }
    }
  }
</style> -->
