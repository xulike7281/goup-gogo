import { defineComponent, unref } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import LocaleProvider from '@/components/locale-provider'
import { useLocale } from '@/locale'
import { createAppInstance } from './useAppInstance'
import { theme } from 'ant-design-vue';
export default defineComponent({
    setup () {
        const { ant, provider, setLocale } = useLocale()

        createAppInstance({
            setLocale: setLocale
        })

        return () => {
            const configProviderProps = {
                // theme:{
                //     token: {
                //       colorPrimary: '#00b96b',
                //       primary:'#00b96b'
                //     },
                //   }
            }
            return (
                <ConfigProvider {...configProviderProps}>
                    {/* <LocaleProvider locale={unref(provider)}>
                    </LocaleProvider> */}
                        <RouterView/>
                </ConfigProvider>
            )
        }
    }
})
