import { ElMessage, ElMessageBox } from 'element-plus'
import { isCompleted } from '../utiles/isComplete';

const deleteTodo = (backFunc: Function, id: string, complete: boolean) => {
    ElMessageBox.confirm(
        isCompleted(complete, '嗯，已经完成了，不需要也是可以的。', '这个任务不是很难，以前辈的实力确定不尝试一下吗？'),
        '星绘：',
        {
            confirmButtonText: isCompleted(complete, '删除吧', '其实我很菜的 (哭)'),
            cancelButtonText: isCompleted(complete, '我考虑一下', '你都这么说了'),
            type: 'warning',
        }
    )
        .then(() => {
            backFunc(id);
            ElMessage({
                duration: 5000,
                type: 'success',
                message: isCompleted(complete, '任务删除成功，前辈可以尝试一个其他活动哦。', '既然前辈都这么说了，那就不要尝试了。'),
            })
        })
        .catch(() => {
            ElMessage({
                duration: 5000,
                type: 'info',
                message: isCompleted(complete, '前辈，有什么顾虑吗，莫非……', '前辈需要帮助的话，可以和我说哦。'),
            })
        })
}

export default deleteTodo;