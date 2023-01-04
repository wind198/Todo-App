<!--------------------------SCRIPT-------------------------->
<script lang="ts" setup>
import { NCheckbox, NSpace, NText } from "naive-ui";
import { toRefs, defineProps, computed } from "vue";
import { IItem } from "../../App.vue";
import Item from "../item/Item.vue";

interface IProps {
  itemList: IItem[];
  selectionMap: Record<string, boolean>;
}

const emit = defineEmits<{
  (e: "toggleAll", v: boolean): void;
}>();

const props = defineProps<IProps>();

const shouldShowToggleAllOption = computed(() => itemList.value.length >= 2);

const { itemList, selectionMap } = toRefs(props);
</script>

<!--------------------------TEMPLATE-------------------------->
<template>
  <NSpace class="item-list" vertical :size="12">
    <NSpace v-if="shouldShowToggleAllOption">
      <NCheckbox
        @change="emit('toggleAll', $event)"
        class="toggle-all"
        id="toggle-all"
      />
      <NText tag="label" for="toggle-all">Select all</NText>
    </NSpace>
    <Item
      v-for="item in itemList"
      :data="item"
      :selected="selectionMap[item.id]"
      >{{ item.title }}</Item
    >
  </NSpace>
</template>

<!--------------------------STYLES-------------------------->
<style>
.toggle-all {
  margin-left: -4px;
}
.item-list {
  padding-left: 4px;
}
</style>
