import { defineComponent, onUnmounted, reactive, ref, unref } from 'vue'
import { Button, Card, Checkbox } from 'ant-design-vue'
import { Form, Password, Text } from '@/components/form'
import { UserFilled, PasswordFilled } from '@/components/icon'
import { useRoute, useRouter } from 'vue-router'
import { HOME_NAME } from '@/config'
import useRemember from './useRemember'
import bubbly from './bubbly'
import { setToken } from '@/common/auth'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'
import BACKGROUND from './images/background.svg'
import * as api from '@/common/index'
const cx = classNames.bind(styles)

let destroy = null

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.src = src
        image.onload = () => {
            resolve(image)
        }
        image.onerror = (err) => {
            reject(err)
        }
    })
}

export default defineComponent({
    setup() {
        const canvasRef = ref(null)
        const router = useRouter()
        const route = useRoute()

        const loading = ref(false)
        const errorType = ref(undefined)

        const model = reactive({
            phone: '',
            password: ''
        })

        const { checked, setChecked, localRemember } = useRemember({
            setState: (state) => {
                model.phone = state.phone
                model.password = state.password
            }
        })

        const rules = {
            phone: [{
                required: true,
                message: '账号不能为空'
            }],
            password: [{
                required: true,
                message: '密码不能为空'
            }]
        }

        loadImage(BACKGROUND).then((image) => {
            destroy = bubbly(unref(canvasRef), image)
        })

        onUnmounted(() => {
            destroy && destroy()
            destroy = null
        })

        function onSubmit() {
            errorType.value = undefined
            const data = {
                phone: model.phone,
                password: model.password
            }
            loading.value = true
            // setTimeout(() => {
            //     setToken('token')
            //     const { redirect } = route.query || {}
            //     localRemember(model)
            //     const name = redirect && String(redirect)
            //     router.push({ name: name || HOME_NAME })
            // }, 1000)
            console.log('[ data ]-87', data);
            api.Login(data).then((res) => {
                console.log('[ res ]-88', res);
                setToken(res.data.token)
                localRemember(model)
                const { redirect } = route.query || {}
                const name = redirect && String(redirect)
                router.push({ name: name || HOME_NAME })
                // router.push({ path: '' })
            })
                .catch((err) => {
                    errorType.value = err.message || '登录失败'
                })
                .finally(() => {
                    loading.value = false
                })
        }

        return () => {
            const cardProps = {
                title: '欢迎登陆GOGO运营商服务系统',
                bordered: false,
                bodyStyle: {
                    padding: '16px'
                }
            }

            return (
                <div class={cx('login')}>
                    <div class={cx('login-bg')}>
                        <canvas class={cx('login-bg__canvas')} ref={canvasRef} />
                    </div>
                    <Card class={cx('login-form')} {...cardProps}>
                        <Form model={model} rules={rules} onFinish={onSubmit}>
                            <Text
                                name={'phone'}
                                placeholder={'请输入手机号'}
                                fieldProps={{ allowClear: false }}
                                v-slots={{ addonBefore: () => <UserFilled /> }}
                            />
                            <Password
                                name={'password'}
                                placeholder={'请输入密码'}
                                fieldProps={{ allowClear: false }}
                                v-slots={{ addonBefore: () => <PasswordFilled /> }}
                            />
                            <div class={cx('checked-wrap')}>
                                <Checkbox checked={unref(checked)} onChange={setChecked}>
                                    记住账号
                                </Checkbox>
                                <a href={'javaScript: void 0'}>忘记密码</a>
                            </div>
                            <Form.Item class={cx('login-form__error')} validateStatus={'error'} help={unref(errorType)}>
                                <Button type={'primary'} html-type={'submit'} block={true} loading={unref(loading)}>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            )
        }
    }
})
