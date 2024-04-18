import App from '../App.vue';
import { mount } from '@vue/test-utils';
import router from '../router';
import { createPinia, setActivePinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useCheckedList, useTodoList } from '../stores';


describe('APP.vue', () => {
    // todo 添加次数
    const loop = 5;

    const pinia = createPinia();
    let todoStore: any;
    let checkedList: any;

    beforeEach(() => {
        pinia.use(piniaPluginPersistedstate);
        setActivePinia(pinia);
        todoStore = useTodoList();
        checkedList = useCheckedList();
    })

    const wrapper = mount(App, {
        global: {
            plugins: [pinia, router],
        },
    });

    test('test add todo', async () => {

        await wrapper.find('[data-test="openAddWindow"]').trigger('click').then(() => {

            // 先检查todo list 长度
            expect(todoStore.todoList.length).toBe(0);

            // 查找 class="dialog-add" 弹窗
            const dialogAdd = wrapper.find('.dialog-add');
            expect(dialogAdd.exists()).toBe(true);

            // 查找 data-test="addTodoInput" 弹窗中的输入框
            const addTodoInput = dialogAdd.find('[data-test="addTodoInput"]');
            expect(addTodoInput.exists()).toBe(true);

            // 查找 class="enter" 的button
            const enterButton = wrapper.find('.enter');
            expect(enterButton.exists()).toBe(true);

            for (let i = 0; i < loop; i++) {
                addTodoInput.setValue(`test input todo ${i}`);
                enterButton.trigger('click');
            }

            // 检查todo list 长度是否增加
            expect(todoStore.todoList.length).toBe(loop);
        });
    });


    test('test delete todo', async () => {
        // 选择第一个todo
        const firstTodo = wrapper.findAll('.card-item')[0];
        expect(firstTodo.exists()).toBe(true);

        // 检查勾选列表
        expect(checkedList.checkedList.length).toBe(0);
        // 触发勾选
        firstTodo.find('.card-item-checkbox').trigger('click');

        // 检查勾选列表
        expect(checkedList.checkedList.length).toBe(1);

        // 触发删除弹窗
        await wrapper.find('[data-test="openDeleWindow"]').trigger('click').then(() => {
            const deleteTodoButton = wrapper.find('[data-test="deletePanding"]');
            expect(deleteTodoButton.exists()).toBe(true);

            // 检查勾选列表、检查todoList 
            expect(checkedList.checkedList.length).toBe(1);
            expect(todoStore.todoList.length).toBe(loop);

            // 触发删除
            deleteTodoButton.trigger('click');
            // 检查勾选列表、检查todoList 
            expect(checkedList.checkedList.length).toBe(0);
            expect(todoStore.todoList.length).toBe(loop - 1);

        })

    });

    test('test edit todo', async () => {
        // 检查勾选列表、检查todoList 
        expect(checkedList.checkedList.length).toBe(0);
        expect(todoStore.todoList.length).toBe(loop - 1);

        // 以目前的状态选择第三个todo进行修改
        const thirdTodo = wrapper.findAll('.card-item')[2];
        thirdTodo.find('.card-item-checkbox').trigger('click');

        // 检查勾选列表
        expect(checkedList.checkedList.length).toBe(1);

        // 触发编辑弹窗
        await wrapper.find('[data-test="openEditWindow"]').trigger('click').then(() => {
            // 查找输入栏
            const editTodoInput = wrapper.find('[data-test="editTodoInput"]');
            expect(editTodoInput.exists()).toBe(true);

            // 输入新的todo
            editTodoInput.setValue('new todo');
            // 触发提交
            const enterButton = wrapper.find('.enter');
            expect(enterButton.exists()).toBe(true);
            enterButton.trigger('click');

            // 检查勾选列表、检查todoList
            expect(checkedList.checkedList.length).toBe(1);
            expect(todoStore.todoList.length).toBe(loop - 1);

            // 检查todoList 中的内容是否修改
            expect(todoStore.getTodoList()[2].title).toBe('new todo');

            thirdTodo.find('.card-item-checkbox').trigger('click');
        })
    });

    test('test all todo delete', async () => {
        // 检查勾选列表、检查todoList
        expect(checkedList.checkedList.length).toBe(0);
        expect(todoStore.todoList.length).toBe(loop - 1);

        // 勾选全部todo
        const allTodo = wrapper.findAll('.card-item');
        allTodo.forEach((todo) => {
            todo.find('.card-item-checkbox').trigger('click');
        })

        // 检查勾选列表、检查todoList
        expect(checkedList.checkedList.length).toBe(loop - 1);
        expect(todoStore.todoList.length).toBe(loop - 1);

        // 触发删除弹窗
        await wrapper.find('[data-test="openDeleWindow"]').trigger('click').then(() => {
            // 查找统一删除按钮
            const enterButton = wrapper.find('.enter');
            expect(enterButton.exists()).toBe(true);

            // 触发删除
            enterButton.trigger('click');

            // 检查勾选列表、检查todoList
            expect(checkedList.checkedList.length).toBe(0);
            expect(todoStore.todoList.length).toBe(0);
        })
    })
})
