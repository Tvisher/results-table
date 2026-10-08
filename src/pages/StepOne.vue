<script setup>
import { reactive, ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import CustomSelect from "@/components/CustomSelect.vue";
import Column from "primevue/column";
import { getFirstStepData } from "@/services/api.js";

const sortState = reactive({
  field: null,
  order: null,
});

// 1. Создаем переменную для выбранного значения (по умолчанию 'hiring_comm' или null)
const selectedNomination = ref("all");

// 2. Список опций, который передадим в компонент
const nominationOptions = ref([{ name: "Все номинации", id: "all" }]);
const nominationAllData = ref([]);
const tableData = ref([]);

const onSort = (event) => {
  sortState.field = event.sortField;
  sortState.order = event.sortOrder === 1 ? "asc" : "desc";
  console.log(sortState);
};

const formatPercent = (val) => {
  return (
    Number(val).toLocaleString("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "%"
  );
};

// Возвращаем нужный CSS-класс в зависимости от значения
const getBgClass = (val) => {
  if (val >= 60) return "bg-green";
  if (val >= 50) return "bg-yellow";
  return "bg-pink";
};

// Если хотите реагировать через функцию прямо из шаблона:
const onNominationChange = (val) => {
  console.log("Новое значение из события:", val);
  if (val === "all") {
    tableData.value = [...nominationAllData.value];
    return;
  }
  tableData.value = nominationAllData.value.filter(
    (item) => item.nominationId == val,
  );
};

onMounted(() => {
  getFirstStepData()
    .then((res) => {
      console.log(res.data);
      const noms = res.data.nominations.map((item) => {
        return { name: item.name, id: item.id };
      });
      nominationOptions.value = [...nominationOptions.value, ...noms];
      const bids = [];
      res.data.nominations.forEach((item) => {
        if (item.projects.length) {
          item.projects.forEach((proj) => {
            bids.push({
              ...proj,
              nomination: item.name,
              nominationId: item.id,
            });
          });
        }
      });

      console.log(bids);
      tableData.value = [...bids];
      nominationAllData.value = bids;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<template>
  <div class="wrap" :class="{ 'show-loader': !nominationAllData.length }">
    <span class="loader" :class="{ hide: nominationAllData.length }"></span>
    <CustomSelect
      v-model="selectedNomination"
      :options="nominationOptions"
      label="Номинации"
      @update:model-value="onNominationChange"
    />
    <DataTable
      v-if="tableData.length"
      :value="tableData"
      @sort="onSort"
      scrollHeight="600px"
      scrollable
      :tableStyle="{ width: '100%', tableLayout: 'fixed' }"
      class="custom-table"
    >
      <Column field="nomination" header="Номинация" sortable style="width: 18%">
        <template #body="{ data }">
          <div class="cell-content" :title="data.nomination">
            {{ data.nomination }}
          </div>
        </template>
      </Column>

      <Column field="projectName" header="Проект" sortable style="width: 18%">
        <template #body="{ data }">
          <div class="cell-content" :title="data.projectName">
            {{ data.projectName }}
          </div>
        </template>
      </Column>

      <Column
        field="totalVotes"
        header="Всего голосов"
        sortable
        style="width: 8%"
      >
        <template #body="{ data }">
          <div class="cell-content" :title="data.totalVotes">
            {{ data.totalVotes }}
          </div>
        </template>
      </Column>

      <Column field="short" header="Шорт" sortable style="width: 8%">
        <template #body="{ data }">
          <div class="cell-content" :title="data.short">{{ data.short }}</div>
        </template>
      </Column>

      <Column field="notShort" header="Не шорт" sortable style="width: 8%">
        <template #body="{ data }">
          <div class="cell-content" :title="data.notShort">
            {{ data.notShort }}
          </div>
        </template>
      </Column>

      <Column
        field="jury"
        header="Жюри (ФИО, проголосовали)"
        style="width: 30%"
      >
        <template #body="{ data }">
          <div class="cell-content" :title="data.jury">{{ data.jury }}</div>
        </template>
      </Column>

      <Column
        field="shortShare"
        header="Доля шорта, %"
        sortable
        style="width: 10%"
      >
        <template #body="{ data }">
          <div :class="['share-cell', getBgClass(data.shortShare)]">
            {{ formatPercent(data.shortShare) }}
          </div>
        </template>
      </Column>
    </DataTable>
    <div v-else style="margin: 10px 0; font-size: 16px; font-weight: 500">
      Нет данных
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  min-height: 700px;
  position: relative;
  overflow: hidden;
  &::before {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-color: #fff;
    z-index: 10;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }
  &.show-loader {
    &::before {
      opacity: 1;
      visibility: visible;
    }
  }
}

.loader {
  z-index: 11;
  --color-1: #d21957;
  --color-2: #000;
  --size: 1px;

  width: calc(48 * var(--size));
  height: calc(48 * var(--size));
  border: calc(3 * var(--size)) dotted var(--color-1);
  border-style: solid solid dotted dotted;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
  transition: all 0.3s ease-in-out;
  &.hide {
    opacity: 0;
    visibility: hidden;
  }
}
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: calc(3 * var(--size)) dotted var(--color-2);
  border-style: solid solid dotted;
  width: calc(24 * var(--size));
  height: calc(24 * var(--size));
  border-radius: 50%;
  animation: rotationBack 1s linear infinite;
  transform-origin: center center;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

.custom-table {
  margin-top: 32px;
  border-radius: 8px;
  overflow: hidden;
  font-family: "Montserrat";

  :deep(.p-datatable-thead > tr > th) {
    background-color: #eff2f5;
    color: #1a1a1a;
    border-bottom: 1px solid #e0e4e8;
    border-right: 1px solid #e0e4e8;
    // text-align: start;
    height: 56px;
    padding: 12px;
    vertical-align: middle;

    &:last-child {
      border-right: none;
    }
  }

  :deep(.p-datatable-tbody > tr > td) {
    border-bottom: none;
    border-right: 1px solid #e0e4e8;
    color: #000;
    font-style: normal;
    font-weight: 500;
    height: 56px;
    padding: 12px;
    &:last-child {
      border-right: none;
      padding: 0;
    }
  }

  :deep(.p-datatable-tbody > tr:nth-child(odd) > td) {
    background-color: #ffffff;
  }

  :deep(.p-datatable-tbody > tr:nth-child(even) > td) {
    background-color: #f8f9fa;
  }
}
</style>
