<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export function lisaaDekkiin(kortti) {
    dispatch(kortti);
  }
</script>
