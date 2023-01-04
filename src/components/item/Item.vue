<!--------------------------SCRIPT-------------------------->
<script lang="ts" setup>
import { Checkmark, CloseOutline, TrashOutline } from "@vicons/ionicons5";
import { NButton, NCheckbox, NIcon, NSpace, NText } from "naive-ui";
import {
  toRefs,
  reactive,
  inject,
  defineProps,
  toRef,
  computed,
  watch,
} from "vue";
import {
  HandleDeleteKey,
  HandleToggleDoneKey,
  HandleToggleSelectionKey,
} from "../../App.provide.key";
import { IItem } from "../../App.vue";

interface IProps {
  data: IItem;
  selected: boolean;
}

const props = defineProps<IProps>();

let { data, selected } = toRefs(props);

const title = computed(() => data.value.title);
const done = computed(() => data.value.done);
const id = computed(() => data.value.id);

const handleDelete = inject<(id: string) => void>(HandleDeleteKey, () => {});
const handleToggleSelection = inject<(id: string, newVal: boolean) => void>(
  HandleToggleSelectionKey,
  () => {}
);
const handleToggleDone = inject<(id: string, newVal: boolean) => void>(
  HandleToggleDoneKey,
  () => {}
);
</script>

<!--------------------------TEMPLATE-------------------------->
<template>
  <NSpace align="center" class="item-wrapper" :wrap-item="false">
    <NCheckbox
      @change="handleToggleSelection(id, $event)"
      :checked="selected"
    />
    <NText class="item__title" :class="{ 'item__title--done': done }">{{
      title
    }}</NText>
    <NSpace align="center">
      <NButton text type="error" @click="handleDelete(id)">
        <NIcon size="20">
          <TrashOutline />
        </NIcon>
      </NButton>
      <NButton
        :title="`Mark as ${done ? 'undone' : 'done'}`"
        :aria-label="`Mark as ${done ? 'undone' : 'done'}`"
        text
        type="info"
        @click="handleToggleDone(id, !done)"
      >
        <NIcon size="20">
          <Checkmark v-if="!done" />
          <CloseOutline v-else />
        </NIcon>
      </NButton>
    </NSpace>
  </NSpace>
</template>

<!--------------------------STYLES-------------------------->
<style>
.item__title {
  flex: 1;
}
.item-wrapper {
}
.item__title--done {
  color: gray;
  text-decoration: line-through;
}
</style>
