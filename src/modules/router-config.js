import { Loading } from "element-ui"
import NProgress from 'nprogress'
export const install = ({ router }) => {
  router?.beforeEach((to, from, next) => {
    NProgress.start()
    next()
  })
  router?.afterEach((to, from) => {
    NProgress.done()
  })
}
