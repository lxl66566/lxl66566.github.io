<template>
  <div class="radio-group">
    <div>
      <label
        v-for="option in options"
        :key="option.value"
        :class="['radio-option', { 'radio-option--selected': option.value === modelValue }]"
      >
        <input
          type="radio"
          :value="option.value"
          v-model="internalValue"
          @change="updateValue(option.value)"
        />
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref, watch } from "vue";

interface RadioOption {
  label: string;
  value: string | number;
}

export default defineComponent({
  name: "RadioButtonGroup",
  props: {
    options: {
      type: Array as PropType<RadioOption[]>,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const internalValue = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newValue) => {
        internalValue.value = newValue;
      },
    );

    const updateValue = (value: string | number) => {
      emit("update:modelValue", value);
    };

    return {
      internalValue,
      updateValue,
    };
  },
});
</script>

<style scoped>
.radio-group {
  display: flex;
  gap: 0.5rem;
}

.radio-option {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-option--selected {
  font-weight: bold;
}
</style>
