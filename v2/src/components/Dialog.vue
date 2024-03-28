<script setup lang="ts">
const dialogVisible = defineModel<boolean>('dialogVisible');
const props = defineProps<{
    dialogTitle: string;
}>();
</script>

<template>
    <div class="dialog-box">
        <el-dialog class="" v-model="dialogVisible" :title="props.dialogTitle" width="500">
            <slot name="content"></slot>

            <template #footer>
                <div class="dialog-footer">
                    <slot name="footer"></slot>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped lang="less">
.dialog-box :deep(.el-dialog) {
    width: 50dvw;

    @media screen and (min-width: 1268px) {
        width: 30dvw;
    }

    @media screen and (max-width: 768px) {
        width: 80dvw;
    }
}

.dialog-box :deep(.el-dialog__header .el-dialog__title) {
    font-size: 3dvh;
}
</style>