import { reactive } from 'vue'
// 引入全部图标
import * as ElementPlusIconsVue from '@element-plus/icons'

const dictIcon = reactive(ElementPlusIconsVue)

const installIcon = (app) => {
  // 便于模板获取
  app.config.globalProperties.$icon = dictIcon
  // 使用全部图标
  // app.config.globalProperties.$icon = Icons
}

export default installIcon
