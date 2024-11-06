import { computed, defineComponent, unref } from 'vue'
import { Checkbox } from 'ant-design-vue'
import baseFieldProps from '../props'
import { optionsToValueEnum, valueEnumToOptions, valueEnumToText } from '../utils/valueEnum'
import { getSlotVNode } from '@/utils/props-util'
import { isUndefined } from 'lodash-es'

/**
 * @todo 待优化
 * validateStatus 变化应该使组件颜色变化
 * 组件库没有对外暴露 Form.Item 的 Status
 */
export default defineComponent({
    inheritAttrs: false,
    props: { ...baseFieldProps },
    setup (props, { slots }) {
        const options = computed(() => {
            if (isUndefined(props.valueEnum)) {
                return props.fieldProps.options || []
            }
            return valueEnumToOptions(props.valueEnum)
        })

        return () => {
            const { mode, text, emptyText, valueEnum, fieldProps } = props

            if (mode === 'read') {
                const { options: propsOptions, fieldNames } = fieldProps
                const optionsValueEnum = optionsToValueEnum(propsOptions, fieldNames)
                const valueText = valueEnumToText(text, valueEnum || optionsValueEnum)
                return valueText ?? emptyText
            }
            const needFieldProps = {
                options: unref(options),
                ...fieldProps
            }
            const dom = <Checkbox.Group {...needFieldProps} v-slots={slots}/>
            const slotScope = { text, props: { mode, ...fieldProps }, dom }
            const renderDom = getSlotVNode(slots, props, 'renderField', slotScope)
            return renderDom || dom
        }
    }
})
