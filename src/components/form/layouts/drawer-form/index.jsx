import { defineComponent, Fragment, ref, unref, watch } from 'vue'
import { Drawer } from 'ant-design-vue'
import { default as BaseForm, Submitter } from '../../base-form'
import { default as useFloatForm, floatProps } from '../hooks/useFloatForm'
import { getSlotVNode } from '@/utils/props-util'
import { useLocaleReceiver } from '@/components/locale-provider'
import { isFunction, omit, pick } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: floatProps,
    emits: ['update:open', 'open', 'cancel', 'afterClose', 'openChange', 'loadingChange'],
    setup (props, { emit, slots, attrs, expose }) {
        const baseFormRef = ref(null)

        const { t } = useLocaleReceiver('Form')

        const { open, loading, onOpen, onCancel, onFinish } = useFloatForm(props, {
            onOpen: () => emit('open'),
            onCancel: () => emit('cancel'),
            onUpdateOpen: (value) => emit('update:open', value)
        })

        watch(open, (value) => {
            emit('openChange', value)
        })

        watch(loading, (value) => {
            emit('loadingChange', value)
        })

        function onAfterClose () {
            const drawerProps = {
                ...pick(props, Object.keys(Drawer.props)),
                ...props.extraProps
            }
            if (drawerProps.destroyOnClose) {
                const context = unref(baseFormRef)
                context && context.resetFields()
            }
            props.onAfterClose && emit('afterClose')
            isFunction(props.extraProps.onAfterClose) && props.extraProps.onAfterClose()
        }

        function onSubmit () {
            const context = unref(baseFormRef)
            context && context.submit()
        }

        function getFormInstance () {
            return unref(baseFormRef)
        }

        expose({
            open: onOpen,
            close: onCancel,
            getFormInstance,
        })

        return () => {
            const { extraProps, submitText, resetText } = props

            const drawerSlots = {
                extra: () => {
                    const submitterProps = {
                        ...pick(props, Object.keys(Submitter.props)),
                        submitText: submitText || t('okText'),
                        resetText: resetText || t('cancelText'),
                        loading: unref(loading),
                        onSubmit: onSubmit,
                        onReset: onCancel
                    }
                    return <Submitter {...submitterProps}/>
                },
                default: () => {
                    const baseFormProps = {
                        ...attrs,
                        ...pick(props, Object.keys(BaseForm.props)),
                        onFinish: onFinish,
                        onSubmit: onFinish
                    }
                    const needSlots = omit(slots, ['trigger'])
                    return (
                        <BaseForm {...baseFormProps} ref={baseFormRef} v-slots={needSlots}/>
                    )
                }
            }

            const needDrawerProps = {
                ...pick(props, Object.keys(Drawer.props)),
                ...extraProps,
                headerStyle: { paddingBlock: '14px' },
                open: unref(open),
                onClose: onCancel,
                onAfterOpenChange: onAfterClose
            }

            const triggerDom = getSlotVNode(slots, props, 'trigger')

            return (
                <Fragment>
                    <Drawer {...needDrawerProps} v-slots={drawerSlots}/>
                    {triggerDom && (
                        <div style={{ display: 'inline-block' }} onClick={onOpen}>
                            {triggerDom}
                        </div>
                    )}
                </Fragment>
            )
        }
    }
})
