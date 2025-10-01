<script>
  import Validointi from './Validointi.svelte';
  import Modal from './Modal.svelte';
  import Otsikko from './otsikko.svelte';
  import { fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { cubicOut } from 'svelte/easing';

  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const url = 'https://oauth.battle.net/token';

  let manaCost = null;
  let attack = null;
  let health = null;
  let kortit = [];
  let dekki = [];
  let naytaModal = false;
  let kortinkuva = null;
  let accessToken = '';

  const headers = {
    Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
  });

  fetch(url, {
    method: 'POST',
    headers: headers,
    body: body,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      accessToken = data.access_token;
    });

  const validiNumero = (arvo) => {
    return arvo !== null && arvo >= 0;
  };

  $: validiMana = validiNumero(manaCost);
  $: validiAttack = validiNumero(attack);
  $: validiHealth = validiNumero(health);
  $: voiHakea = validiMana && validiAttack && validiHealth;

  function getCards() {
    const queryString = luoHakuUrl();
    fetch(
      `https://us.api.blizzard.com/hearthstone/cards?locale=en_US${queryString}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        kortit = data.cards;
      });
  }

  function serialize(obj) {
    const str = [];
    for (const p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return '&' + str.join('&');
  }

  function luoHakuUrl() {
    const queryString = serialize({ manaCost, attack, health });
    return queryString;
  }

  function avaaUusi(kortti) {
    naytaModal = true;
    kortinkuva = kortti;
  }

  function suljeUusi() {
    naytaModal = false;
    kortinkuva = null;
  }

  function sekoitakortit() {
    kortit = kortit.sort(() => Math.random() - 0.5);
  }

  const lisaaDekkiin = (event) => {
    dekki = [...dekki, event.detail];
  };
</script>

<main>
  <Otsikko />

  <div id="syotto">
    <div class="kentta">
      <label for="mana">Mana cost:</label>
      <Validointi
        bind:arvo={manaCost}
        onkoValidi={validiMana}
        virheviesti="Ilmoita kortin Mana cost!"
      />
    </div>
    <div class="kentta">
      <label for="attack">Attack:</label>
      <Validointi
        bind:arvo={attack}
        onkoValidi={validiAttack}
        virheviesti="Ilmoita kortin Attack!"
      />
    </div>
    <div class="kentta">
      <label for="health">Health:</label>
      <Validointi
        bind:arvo={health}
        onkoValidi={validiHealth}
        virheviesti="Ilmoita kortin Health!"
      />
    </div>
    <button id="haekortteja" on:click={getCards} disabled={!voiHakea}>
      Hae kortteja
    </button>
  </div>

  {#if kortit.length > 0}
    <div>
      <h2>Kortit:</h2>
      <ul>
        <button on:click={sekoitakortit}>Randomize</button>
        {#each kortit as kortti, index (kortti.id)}
          <div
            in:fly|global={{ duration: 200, x: -200, delay: index * 80 }}
            animate:flip={{ easing: cubicOut }}
          >
            <button id="kortinnimi" on:click={() => avaaUusi(kortti)}>
              {kortti.name}
            </button>
            <button on:click={() => lisaaDekkiin({ detail: kortti })}>
              Lisää dekkiin
            </button>
          </div>
        {/each}
      </ul>
    </div>
  {/if}

  {#if naytaModal}
    <Modal>
      <button id="modalbutton" on:click={suljeUusi}>Sulje</button>
      <div>
        <h3>{kortinkuva.name}</h3>
        <img src={kortinkuva.image} alt="kortinkuva" />
      </div>
    </Modal>
  {/if}

  <div id="dekki">
    {#if dekki.length > 0}
      <div>
        <h2>Dekki:</h2>
        <ul>
          {#each dekki as kortti}
            <div>{kortti.name}</div>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</main>

<style>
  #syotto {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: brown;
  }

  .kentta {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .kentta label {
    margin-bottom: 0.5rem;
  }

  h2 {
    color: brown;
  }

  #modalbutton {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgb(0, 0, 0);
    color: aliceblue;
    border-radius: 5vh;
    border-width: 7px;
  }

  #kortinnimi {
    background: rgb(21, 66, 71);
    color: aliceblue;
    transition:
      background-color 0.1s ease,
      transform 0.1s ease;
  }

  button:hover {
    transform: scale(1.02);
    background-color: #b12a1b;
  }

  h3 {
    color: white;
    text-align: center;
  }

  button {
    background-color: black;
    color: rgb(255, 255, 255);
    height: fit-content;
    align-self: center;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-top: 15px;
    margin-left: 15px;
  }

  button:disabled {
    background-color: grey;
    cursor: not-allowed;
  }

  #dekki {
    color: white;
    width: 200px;
    position: fixed;
    top: 20%;
    right: 0;
    padding: 5rem;
  }
</style>
