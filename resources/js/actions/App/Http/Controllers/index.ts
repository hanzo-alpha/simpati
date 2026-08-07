import Web from './Web'
import Api from './Api'
import Settings from './Settings'
const Controllers = {
    Web: Object.assign(Web, Web),
Api: Object.assign(Api, Api),
Settings: Object.assign(Settings, Settings),
}

export default Controllers