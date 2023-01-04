import { ref, watch, Ref, computed, watchEffect } from "vue";

export default function useSelection<T>(
  itemList: Ref<T[] | undefined | null>,
  getId?: (i: T) => string,
  initialVal?: boolean
) {
  const getIdFunc = getId || ((i: T) => (i as any).id);

  const itemSelectionMap = ref<Record<string, boolean>>({});

  watchEffect(() => {
    if (!itemList.value) {
      itemSelectionMap.value = {};
      return;
    }
    const newItemSelectionMap: Record<string, boolean> = {};
    itemList.value.forEach((item) => {
      newItemSelectionMap[getIdFunc(item)] =
        itemSelectionMap.value[getIdFunc(item)] || initialVal || false;
    });

    itemSelectionMap.value = newItemSelectionMap;
  });

  const toggleSelectionAll = (v: boolean) => {
    const output = {} as Record<string, boolean>;
    for (const key in itemSelectionMap.value) {
      output[key] = v;
    }
    itemSelectionMap.value = output;
  };

  const toggleSelectionOneItem = (id: string, v: boolean) => {
    itemSelectionMap.value = { ...itemSelectionMap.value, [id]: v };
  };

  const toggleSelectionManyItems = (ids: string[], v: boolean) => {
    itemSelectionMap.value = {
      ...itemSelectionMap.value,
      ...ids.reduce((p, c) => ({ ...p, [c]: v }), {}),
    };
  };
  const selectedItemIds = computed(() =>
    Object.keys(itemSelectionMap.value).filter(
      (id) => itemSelectionMap.value[id]
    )
  );

  const selectedItem = computed(() =>
    itemList.value?.filter((item) => {
      const id = getIdFunc(item);
      return selectedItemIds.value.includes(id);
    })
  );

  const totalItemCount = computed(() => itemList.value?.length);
  const selectedItemCount = computed(() => selectedItemIds.value.length);

  return {
    itemSelectionMap,
    toggleSelectionAll,
    toggleSelectionOneItem,
    selectedItemIds,
    selectedItem,
    totalItemCount,
    selectedItemCount,
    toggleSelectionManyItems,
  };
}
