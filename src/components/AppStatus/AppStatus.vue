<!--------------------------SCRIPT-------------------------->
<script lang="ts" setup>
import { Checkmark, CloseOutline, TrashOutline } from "@vicons/ionicons5";
import { NButton, NIcon, NSpace, NText } from "naive-ui";
import { computed, toRefs } from "vue";
import { IItem } from "../../App.vue";

const props = defineProps<{
  itemList: IItem[];
  itemSelectionMap: Record<string, boolean>;
}>();

const emit = defineEmits<{
  (e: "deleteMany", ids: string[]): void;
  (e: "toggleMany", ids: string[], val: boolean): void;
}>();

const { itemList, itemSelectionMap } = toRefs(props);

const doneItemCount = computed(
  () => itemList.value.filter((item) => item.done).length
);
const totalItemCount = computed(() => itemList.value.length);

const seletedItemIds = computed(() =>
  Object.keys(itemSelectionMap.value).filter((i) => !!itemSelectionMap.value[i])
);

const selectedItems = computed(() => {
  return seletedItemIds.value
    .map((id) => itemList.value.find((i) => i.id === id))
    .filter((i) => !!i) as IItem[];
});

const selectedItemsCount = computed(() => selectedItems.value.length);

const shouldToggleDoneSelectedItem = computed(() => {
  const doneItemCoutInSelectedItems = selectedItems.value.filter(
    (i) => i.done
  ).length;
  return doneItemCoutInSelectedItems < selectedItemsCount.value / 2;
});
</script>

<!--------------------------TEMPLATE-------------------------->
<template>
  <NSpace :size="32" justify="space-between">
    <NSpace vertical>
      <NText>
        {{ selectedItemsCount }} item{{ selectedItemsCount > 1 ? "s" : "" }}
        seleted
      </NText>
      <NSpace>
        <NText
          >Total: {{ totalItemCount }} item{{
            totalItemCount > 1 ? "s" : ""
          }}</NText
        >
        <NText>
          {{ doneItemCount }} item{{ doneItemCount > 1 ? "s" : "" }} completed
        </NText>
      </NSpace>
    </NSpace>
    <!-- <NSpace :style="{ ...(!selectedItemsCount && { display: 'none' }) }"> -->
    <NSpace v-if="selectedItemsCount">
      <NButton @click="emit('deleteMany', seletedItemIds)" type="error">
        <template #icon>
          <NIcon>
            <TrashOutline />
          </NIcon>
        </template>
        Delete
      </NButton>
      <NButton
        type="info"
        @click="
          emit(
            'toggleMany',
            seletedItemIds,
            shouldToggleDoneSelectedItem ? true : false
          )
        "
      >
        <template #icon>
          <NIcon>
            <Checkmark v-if="shouldToggleDoneSelectedItem" />
            <CloseOutline v-else />
          </NIcon>
        </template>
        Mark as {{ shouldToggleDoneSelectedItem ? "done" : "undone" }}
      </NButton>
    </NSpace>
  </NSpace>
</template>

<!--------------------------STYLES-------------------------->
<style></style>
