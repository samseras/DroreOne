/*
导入模块api
* */
import axios from '@/http'

const importFile={
    getCameraType(){
      return axios({
          method:'GET',
          url:'/device/import/file'
      })
    }


}
export default importFile
