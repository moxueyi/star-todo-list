<script lang="ts" setup>
import { h, reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useUserToken } from '../stores';
import userRuleForm from '../stores/User/type';
import { useRouter } from 'vue-router';

const userToken = useUserToken()
const router = useRouter()

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<userRuleForm>({
    nikeName: '',
    password: '',
})

const rules = reactive<FormRules<userRuleForm>>({
    nikeName: [
        {
            required: true,
            message: 'Please input your nike name',
            type: 'string',
            trigger: 'change'
        },
        {
            min: 3, max: 5,
            message: 'Length should be 3 to 5',
            trigger: 'change'
        },
    ],
    password: [
        {
            required: true,
            message: 'Please input your password',
            trigger: 'change',
        },
        { min: 8, max: 16, message: 'Length should be 8 to 16', trigger: 'change' },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, _fields) => {
        if (valid) {
            console.log('submit!')
            userToken.setToken(ruleForm)
            // console.log(userToken.getToken());
            router.push({
                path: '/',
                replace: true,
            });

            ElMessage({
                showClose: true,
                duration: 5000,
                message: h('p', { style: 'color: #3949B8; font-size: 2dvb;' }, `你来啦，${userToken.getToken()!.nikeName}前辈。`),
            })

        } else {
            console.log('error submit!')
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>


<template>
    <div class="login">
        <div class="form">
            <div class="form-title">Login</div>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm"
                :size="'default'" status-icon>
                <el-form-item label="nike name" prop="nikeName">
                    <el-input v-model="ruleForm.nikeName" />
                </el-form-item>
                <el-form-item label="password" prop="password">
                    <el-input type="password" v-model="ruleForm.password" />
                </el-form-item>
                <div class="login-button">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        Create and Login
                    </el-button>
                    <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<style scoped lang="less">
.login {
    display: grid;
    place-items: center;
    height: 100%;
    width: 100%;

    .form-title {
        font-size: 4dvh;
        margin-bottom: 3dvh;
        font-family: "Kranky", serif;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(3px);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
        padding: 5dvh;

        @media screen and (max-width: 762px) {
            width: 80%;
        }
    }

    .login-button {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>