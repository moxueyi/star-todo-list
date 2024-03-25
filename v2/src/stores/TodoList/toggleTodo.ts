import { ElMessage, ElMessageBox } from 'element-plus'
import { isCompleted } from '../utiles/isComplete';


const toggleTodo = (backFunc: Function, id: string, complete: boolean) => {
    ElMessageBox.confirm(
        isCompleted(complete, '我就知道……（生气）', '任务完成？前辈，你确定没有遗漏吗？',),
        '星绘：',
        {
            confirmButtonText: isCompleted(complete, '我错了，我保证', '那当然。'),
            cancelButtonText: isCompleted(complete, '你听我说', '还有一点，等我一下……'),
            type: 'warning',
        }
    )
        .then(() => {
            backFunc(id);
            ElMessage({
                duration: 5000,
                type: 'success',
                message: isCompleted(complete, '前辈……好吧，下不为例（叉腰）', '前辈，要来杯星芒咖啡休息下吗？'),
            })
        })
        .catch(() => {
            ElMessage({
                duration: 5000,
                type: 'info',
                message: isCompleted(complete, '我明白了，前辈。', '前辈加油，我去给你泡杯星芒咖啡。'),
            })
        })
}

export default toggleTodo;
