<!--------------------------SCRIPT-------------------------->
<script lang="ts" setup>
import {
  NSpace,
  NInputGroupLabel,
  NInput,
  NText,
  NH6,
  NButton,
  NIcon,
} from "naive-ui";
import { onMounted, ref } from "vue";
import { Add } from "@vicons/ionicons5";
const newItemTitle = ref("");

const emit = defineEmits<{
  (e: "add-item", title: string): void;
}>();

const inputFieldRef = ref<HTMLInputElement | null>(null);

const clear = () => {
  newItemTitle.value = "";
};
const focus = () => {
  inputFieldRef.value?.focus();
};

defineExpose({
  focus,
  clear,
});
</script>

<!--------------------------TEMPLATE-------------------------->
<template>
  <form @submit.prevent="emit('add-item', newItemTitle)">
    <NSpace size="medium" align="center" class="add-item" :wrap-item="false">
      <NH6 tag="label" class="add-item__label">Add item</NH6>
      <NInput
        autofocus
        ref="inputFieldRef"
        id="new-item"
        v-model:value="newItemTitle"
        type="text"
      />
      <NButton type="primary" attr-type="submit">
        <template #icon>
          <NIcon :size="20">
            <Add />
          </NIcon>
        </template>
        Add</NButton
      >
    </NSpace>
  </form>
</template>

<!--------------------------STYLES-------------------------->
<style>
.add-item {
  width: 100%;
}
#new-item {
  flex: 1;
}
.add-item__label {
  margin-bottom: 0;
}
</style>
