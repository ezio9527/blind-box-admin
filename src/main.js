import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/theme/default/index.less'
import '@/server/http'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import installIcon from '@/plugins/icon'

const app = createApp(App)
app.use(store).use(router)
  .use(installIcon)
  .use(ElMessage)
  .mount('#app')

for (const iconName in ElementPlusIconsVue) {
  app.component(iconName, ElementPlusIconsVue[iconName])
}
