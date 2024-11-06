import { defineComponent } from 'vue'
import { Tree } from 'ant-design-vue'
import TreeNode from './TreeNode'
import classNames from '@/utils/classNames/bind'
import styles from './style/tree.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    props: {
        showTitle: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: undefined
        },
        fixed: {
            type: String,
            default: undefined
        },
        columns: {
            type: Array,
            default: () => ([])
        },
        checkable: {
            type: Boolean,
            default: true
        },
        draggable: {
            type: Boolean,
            default: true
        },
        onCheckChange: {
            type: Function,
            default: undefined
        },
        onDropChange: {
            type: Function,
            default: undefined
        },
        onFixedChange: {
            type: Function,
            default: undefined
        }
    },
    emits: ['checkChange', 'dropChange', 'fixedChange'],
    setup (props, { emit }) {
        function onTreeNodeCheck (_, info) {
            const { node, checked } = info
            const column = props.columns.find((item) => item.key === node.key)
            emit('checkChange', node.key, { ...column, checked: checked })
        }

        function onTreeNodeDrop (info) {
            const { node, dragNode, dropPosition } = info
            const dragKey = dragNode.key, dropKey = node.key, dropPos = node.pos.split('-')
            const trueDropPosition = dropPosition - Number(dropPos[dropPos.length - 1])
            emit('dropChange', dragKey, dropKey, trueDropPosition, dropPosition)
        }

        function onChangeFixed (key, fixed) {
            const column = props.columns.find((item) => item.key === key)
            emit('fixedChange', key, { ...column, fixed: fixed })
        }

        return () => {
            if (props.columns.length === 0) return null
            const { columns, showTitle, title, fixed, checkable, draggable } = props

            const checkedKeys = columns.filter((item) => {
                return item.checked !== false
            }).map((item) => {
                return item.key
            })

            const treeSlots = {
                title: (slotScope) => {
                    const checkboxItemProps = {
                        ...slotScope,
                        fixed: fixed,
                        columnKey: slotScope.key,
                        onChange: onChangeFixed
                    }
                    return (
                        <TreeNode {...checkboxItemProps}/>
                    )
                }
            }

            const loopTreeData = columns.map((item) => {
                return {
                    key: item.key,
                    title: item.title,
                    selectable: false,
                    disableCheckbox: item.disable === true
                }
            })

            const needTreeProps = {
                height: 280,
                showLine: false,
                blockNode: true,
                checkStrictly: true,
                checkable: checkable,
                draggable: draggable,
                checkedKeys: checkedKeys,
                treeData: loopTreeData,
                onCheck: onTreeNodeCheck,
                onDrop: onTreeNodeDrop
            }

            return (
                <div class={cx('tree-list')}>
                    {showTitle && (
                        <div class={cx('tree-list-title')}>{title}</div>
                    )}
                    <Tree {...needTreeProps} v-slots={treeSlots}/>
                </div>
            )
        }
    }
})
