import { defineStore } from "pinia";
import { ref } from "vue";
import userRuleForm from "./type";

const useUserToken = defineStore('token', () => {

    const token = ref<userRuleForm | null>(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null);

    const setToken = (newToken: userRuleForm) => {
        token.value = newToken;
    }

    const getToken = () => {
        return token.value;
    }

    const removeToken = () => {
        token.value = null;
    }

    return {
        token,
        setToken,
        getToken,
        removeToken,
    }
}, {
    persist: {
        key: 'token',
        storage: localStorage,
        paths: ['token'],
    }
});

export default useUserToken;