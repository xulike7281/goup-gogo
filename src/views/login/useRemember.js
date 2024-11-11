import { ref, unref } from 'vue'
import { localCache, PASSWORD__LOCAL, USERNAME__LOCAL } from '@/utils/storage'
import { AesDecode, AesEncode } from '@/common/ase'

function useRemember (options) {
    const { setState } = options

    const checked = ref(false)

    const phone = localCache.get(USERNAME__LOCAL)
    const password = localCache.get(PASSWORD__LOCAL)
    if (phone && password) {
        checked.value = true
        setState({
            phone: AesDecode(phone),
            password: AesDecode(password)
        })
    }

    function setChecked (evt) {
        const { target } = evt
        checked.value = target.checked
    }

    function localRemember (state) {
        if (unref(checked)) {
            const phone = localCache.get(USERNAME__LOCAL)
            const password = localCache.get(PASSWORD__LOCAL)
            const nextUsername = AesEncode(state.phone)
            const nextPassword = AesEncode(state.password)
            if (phone !== nextUsername && password !== nextPassword) {
                localCache.set(USERNAME__LOCAL, nextUsername)
                localCache.set(PASSWORD__LOCAL, nextPassword)
            }
        } else {
            localCache.remove(USERNAME__LOCAL)
            localCache.remove(PASSWORD__LOCAL)
        }
    }

    return {
        checked,
        setChecked,
        localRemember
    }
}

export default useRemember
