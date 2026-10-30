<script lang="ts">
  import Aviso from './Aviso.svelte';

  let nome = 'Lilo';
  let urlVite = 'https://vitejs.dev/';
  let urlSvelte = 'https://svelte.dev/';
  let urlTypeScript = 'https://www.typescriptlang.org/';
</script>

<h1>Minha aplicação web</h1>
<p>Oi {nome.toUpperCase()}, vamos criar uma aplicação web com:</p>
<ul>
  <li><a href={urlVite} target="_blank">Vite</a></li>
  <li><a href={urlSvelte} target="_blank">Svelte</a></li>
  <li><a href={urlTypeScript} target="_blank">TypeScript</a></li>
</ul>

<Aviso />

<style>
  p {
    color: blue;
    font-family: 'Comic Sans MS', cursive;
    font-size: 1.2em;
  }
</style>