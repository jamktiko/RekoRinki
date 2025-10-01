<script>
  export let arvo;
  export let onkoValidi;
  export let virheviesti;

  let onkoVierailtu = false;

  function vierailtu() {
    onkoVierailtu = true;
  }
</script>

<input
  type="number"
  bind:value={arvo}
  class:tyhja={!onkoValidi && onkoVierailtu}
  on:blur={vierailtu}
/>
{#if virheviesti && !onkoValidi && onkoVierailtu}
  <p class="virhe">{virheviesti}</p>
{/if}

<style>
  .virhe {
    color: red;
    margin: 0.5rem 0;
  }

  .tyhja {
    border: 1px solid red;
  }
</style>
