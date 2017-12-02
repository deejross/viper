import { regex } from 'vuelidate/lib/validators/common'
const urlRegex = /^(?:(http[s]?):\/\/)([^:/\s]+)(:[0-9]+)?$/i
export default regex('url', urlRegex)
