<!--------------------------SCRIPT-------------------------->
<script lang="ts" setup>
import { uniqueId } from "lodash";
import { NSpace, NCard, NH1, NText } from "naive-ui";
import { provide, ref, watch } from "vue";
import {
  HandleDeleteKey,
  HandleToggleSelectionKey,
  HandleToggleDoneKey,
} from "./App.provide.key";
import AddItem from "./components/add-item/AddItem.vue";
import AppStatus from "./components/AppStatus/AppStatus.vue";
import ItemList from "./components/item-list/ItemList.vue";
import useSelection from "./hooks/useSelection";

export type IItem = {
  id: string;
  title: string;
  done: boolean;
};

const itemList = ref<IItem[]>([]);

const deleteItem = (id: string) => {
  itemList.value = itemList.value.filter((item) => item.id !== id);
};

const addItem = (item: IItem) => {
  itemList.value = [...itemList.value, item];
};

const toggleDoneOneItem = (id: string, newVal: boolean) => {
  itemList.value = itemList.value.map((item) =>
    item.id === id ? { ...item, done: newVal } : item
  );
};

const toggleDoneManyItems = (ids: string[], newVal: boolean) => {
  itemList.value = itemList.value.map((item) =>
    ids.includes(item.id) ? { ...item, done: newVal } : item
  );
};

const handleAddItem = (newItemTitle: string) => {
  const newItemId = uniqueId();
  const item: IItem = {
    done: false,
    id: newItemId,
    title: newItemTitle,
  };

  addItem(item);
  addItemRef.value?.clear();
  addItemRef.value?.focus();
};

const handleDeleteMany = (ids: string[]) => {
  itemList.value = itemList.value.filter((i) => !ids.includes(i.id));
};

const { toggleSelectionAll, toggleSelectionOneItem, itemSelectionMap } =
  useSelection(itemList);

const addItemRef = ref<InstanceType<typeof AddItem> | null>(null);

provide(HandleDeleteKey, deleteItem);
provide(HandleToggleSelectionKey, toggleSelectionOneItem);
provide(HandleToggleDoneKey, toggleDoneOneItem);
</script>

<!--------------------------TEMPLATE-------------------------->
<template>
  <div class="app-wrapper">
    <NSpace class="app-container" justify="center" align="center" vertical>
      <NCard
        :content-style="{ display: 'flex', flexDirection: 'column' }"
        class="app"
      >
        <template #header>
          <NH1 class="app-header" align-text> Todo App </NH1>
        </template>
        <AddItem ref="addItemRef" class="add-item" @add-item="handleAddItem" />
        <ItemList
          @toggle-all="toggleSelectionAll"
          class="item-list"
          :item-list="itemList"
          :selection-map="itemSelectionMap"
          v-if="itemList.length"
        />
        <NSpace
          class="item-list item-list__no-item"
          vertical
          justify="center"
          align="center"
          v-else
          ><NText>No item yet!</NText></NSpace
        >
        <AppStatus
          @delete-many="handleDeleteMany"
          @toggle-many="toggleDoneManyItems"
          :itemList="itemList"
          :itemSelectionMap="itemSelectionMap"
        />
      </NCard>
    </NSpace>
  </div>
</template>

<!--------------------------STYLES-------------------------->
<style>
.app-wrapper {
  width: 100%;
  min-height: 100vh;
}
.app-container {
  min-height: 100vh;
  width: 100%;
}
.app {
  border-radius: 20px;
  max-width: 600px;
  width: 40vw;
  min-height: 50vh;
}
.app-header {
  text-align: left;
}
.add-item {
  margin-bottom: 12px;
}
.item-list {
  flex: 1;
}
</style>
