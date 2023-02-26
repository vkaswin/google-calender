import { ref, watch, onUnmounted, Ref } from "vue";
import {
  createPopper,
  Instance,
  OptionsGeneric,
  Modifier,
} from "@popperjs/core";

type UsePopper = (
  reference: Ref<HTMLElement | null>,
  popper: Ref<HTMLElement | null>,
  options?: Partial<OptionsGeneric<Partial<Modifier<any, any>>>>
) => void;

const usePopper: UsePopper = (reference, popper, options) => {
  let popperInstance = ref<Instance | null>(null);

  onUnmounted(() => {
    if (!popperInstance.value) return;

    popperInstance.value.destroy();
  });

  watch(
    [reference, popper],
    ([newReference, newPopper], [oldReference, oldPopper]) => {
      if (!newReference || !newPopper) return;

      if (popperInstance.value) {
        if (newReference !== oldReference) {
          popperInstance.value.state.elements.reference = newReference;
        }
        if (newPopper !== oldPopper) {
          popperInstance.value.state.elements.popper = newPopper;
        }
        popperInstance.value.update();
      } else {
        popperInstance.value = createPopper(newReference, newPopper, options);
      }
    },
    { flush: "post" }
  );
};

export default usePopper;