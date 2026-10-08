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
const nominationOptions = ref([
  { name: "Все номинации", value: "all" },
  { name: "Женское дело", value: "women" },
  { name: "Коммуникации в найме", value: "hiring_comm" },
  { name: "Комфортный онбординг", value: "onboarding" },
  { name: "Культурный код", value: "cultural_code" },
  { name: "Лучший блог на Хабре", value: "habr_blog" },
  { name: "Люди и технологии", value: "people_tech" },
  { name: "Маршрут в будущее", value: "future_route" },
]);

const tableData = ref([
  {
    id: 1,
    nomination: "Коммуникации в найме",
    projectName: "Доставка как спорт: как Ozo...",
    totalVotes: 9,
    short: 8,
    notShort: 0,
    jury: "Виктория Кабакова, Екатерина Тышковская, Кристи...",
    shortShare: 100.0,
  },
  {
    id: 2,
    nomination: "Коммуникации в найме",
    projectName: "Найм без границ",
    totalVotes: 9,
    short: 9,
    notShort: 0,
    jury: "Виктория Кабакова, Екатерина Тышковская, Кристи...",
    shortShare: 100.0,
  },
  {
    id: 3,
    nomination: "Коммуникации в найме",
    projectName: "Убеги от рекрутера: продв...",
    totalVotes: 10,
    short: 9,
    notShort: 1,
    jury: "Виктория Кабакова, Екатерина Тышковская, Кристи...",
    shortShare: 90.0,
  },
  {
    id: 4,
    nomination: "Коммуникации в найме",
    projectName: 'Карьерный портал для "Но...',
    totalVotes: 9,
    short: 8,
    notShort: 1,
    jury: "Виктория Кабакова, Екатерина Тышковская, Кристи...",
    shortShare: 88.89,
  },
  {
    id: 5,
    nomination: "Коммуникации в найме",
    projectName: "Твой выбор",
    totalVotes: 10,
    short: 2,
    notShort: 8,
    jury: "Виктория Кабакова, Екатерина Тышковская, Кристи...",
    shortShare: 20.0,
  },
  {
    id: 6,
    nomination: "Коммуникации в найме",
    projectName: "Телеграм-канал о работе и...",
    totalVotes: 8,
    short: 1,
    notShort: 7,
    jury: "Виктория Кабакова, Кристина Рязанцева, Михаил СРязанцева ,Михаил СРязанцева Виктория Кабакова, Кристина Рязанцева, Михаил СРязанцева ,Михаил СРязанцева",
    shortShare: 12.5,
  },
  {
    id: 7,
    nomination: "Коммуникации в найме",
    projectName: 'HR-проект "Славу — металл...',
    totalVotes: 9,
    short: 0,
    notShort: 9,
    jury: "Виктория Кабакова, Екатерина Тышковская, Кристи...",
    shortShare: 0.0,
  },
  {
    id: 8,
    nomination: "Коммуникации в найме",
    projectName: "Телеграм-канал о работе и...",
    totalVotes: 8,
    short: 1,
    notShort: 7,
    jury: "Виктория Кабакова, Кристина Рязанцева, Михаил С...",
    shortShare: 0.0,
  },
  {
    id: 9,
    nomination: "Коммуникации в найме",
    projectName: 'HR-проект "Славу — металл...',
    totalVotes: 9,
    short: 0,
    notShort: 9,
    jury: "Виктория Кабакова, Екатерина Тышковская, Кристи...",
    shortShare: 0.0,
  },
  {
    id: 10,
    nomination: "Коммуникации в найме",
    projectName: "Телеграм-канал о работе и...",
    totalVotes: 8,
    short: 1,
    notShort: 7,
    jury: "Виктория Кабакова, Кристина Рязанцева, Михаил С...",
    shortShare: 0.0,
  },
  {
    id: 11,
    nomination: "Коммуникации в найме",
    projectName: 'HR-проект "Славу — металл...',
    totalVotes: 9,
    short: 0,
    notShort: 9,
    jury: "Виктория Кабакова, Екатерина Тышковская, Кристи...",
    shortShare: 0.0,
  },
]);

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
  if (val >= 80) return "bg-green";
  if (val > 0) return "bg-yellow";
  return "bg-pink";
};

// Если хотите реагировать через функцию прямо из шаблона:
const onNominationChange = (val) => {
  console.log("Новое значение из события:", val);
};

onMounted(() => {
  getFirstStepData()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<template>
  <CustomSelect
    v-model="selectedNomination"
    :options="nominationOptions"
    label="Номинации"
    @update:model-value="onNominationChange"
  />
  <DataTable
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

    <Column field="jury" header="Жюри (ФИО, проголосовали)" style="width: 30%">
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
</template>

<style lang="scss" scoped>
.custom-table {
  margin-top: 32px;
  border-radius: 8px;
  overflow: hidden;
  font-family: sans-serif;

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
