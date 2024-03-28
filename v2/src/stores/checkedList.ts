import { defineStore } from "pinia";
import { ref } from "vue";

export const useCheckedList = defineStore("checkedList", () => {
    const checkedList = ref<string[]>([]);

    function addID(id: string) {
        checkedList.value.push(id);
    }

    function removeID(id: string): boolean {
        if (checkedList.value.includes(id)) {
            checkedList.value.splice(checkedList.value.indexOf(id), 1);
            return true;
        }
        return false;
    }

    function pushID(id: string) {
        if (!removeID(id)) {
            addID(id)
        }
    }

    function removeAll() {
        checkedList.value = [];
    }

    function includeID(id: string): boolean {
        return checkedList.value.includes(id);
    }

    return {
        checkedList,
        addID,
        removeID,
        pushID,
        removeAll,
        includeID,
    }

})