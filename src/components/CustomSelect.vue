<script setup>
import Select from "primevue/select";

const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: null,
  },
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: "Все номинации",
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="custom-select-wrapper">
    <label v-if="label" class="select-label">{{ label }}</label>

    <Select
      :model-value="modelValue"
      :options="options"
      optionLabel="name"
      optionValue="value"
      placeholder="Все номинации"
      class="custom-select"
      panelClass="custom-select-panel"
      @update:model-value="(val) => emit('update:modelValue', val)"
    />
  </div>
</template>

<style lang="scss">
$primary-pink: #e02868;
$light-pink-bg: #f8eaef;
$border-pink: #f2a8c3;
$text-color: #1a1a1a;
$border-radius: 12px;

.custom-select-wrapper {
  margin-top: 64px !important;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  max-width: 320px;

  .select-label {
    color: #a1a7aa;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 18px */
  }
}

/* === Поле селекта (Trigger) === */
.p-select.custom-select {
  width: 100%;
  background: #ffffff;
  border: 2px solid #e4b8c7 !important;
  border-radius: 8px;
  box-shadow: none !important;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  outline: none !important;

  &.p-focus,
  &:focus-within {
    border-color: $primary-pink;
    box-shadow: 0 0 0 1px $primary-pink;
  }

  .p-select-label {
    font-weight: 600;
    color: $text-color;
    font-size: 14px;
    padding: 19px 12px;
  }

  .p-select-dropdown {
    color: $primary-pink;
    width: 2.2rem;
  }
}

.p-select-overlay.custom-select-panel {
  border-radius: $border-radius;
  border: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  margin-top: 6px;
  overflow: hidden;

  .p-select-list-container {
    padding: 6px;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: $primary-pink;
      border-radius: 4px;
    }
  }

  .p-select-list {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .p-select-option {
    font-weight: 600;
    font-size: 14px;
    color: $text-color;
    padding: 10px 14px;
    border-radius: 8px;
    transition:
      background-color 0.15s ease,
      color 0.15s ease;

    &:not(.p-select-option-selected):hover {
      background: #f5f5f5;
      color: $text-color;
    }

    &.p-select-option-selected {
      background: $light-pink-bg;
      color: $primary-pink;
    }

    &.p-focus {
      background: #f5f5f5;

      &.p-select-option-selected {
        background: $light-pink-bg;
      }
    }
  }
}

.p-select-list-container {
  border-radius: 8px !important;
  margin-top: 12px;
  background: #fff;
  box-shadow: 0 8px 24px 0 rgba(173, 181, 190, 0.4);
  padding: 6px;
  max-height: 400px !important;
}

.p-select-option {
  padding: 12px !important;
  border-radius: 6px !important;
  color: #000 !important;
  font-family: Montserrat;
  font-size: 14px !important;
  font-style: normal;
  font-weight: 600 !important;
  line-height: 150%;
}
.p-select-option-selected {
  background: #f4e2e8 !important;
  color: #d21957 !important;
}
</style>
