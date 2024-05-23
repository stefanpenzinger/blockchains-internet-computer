import { html, render } from 'lit-html';
import { crypto_smileys_backend } from 'declarations/crypto_smileys_backend';
import logo from './logo2.svg';

class App {
  greeting = '';

  constructor() {
    this.#render();
    this.parts = {
        head: [
            ["⧙", "⧘"],
            ["༼", "༽"],
            ["ᖗ", "ᖘ"],
            ["ᕳ", "ᕲ"],
            ["(", ")"],
        ],
        eyes: [
            ["•", "•"],
            ["ಠ", "ಠ"],
            [" ͡°", " ͡°"],
            ["o", "Ô"],
            ["ಥ", "ಥ"],
        ],
        nose: [
            "◡",
            "‸",
            "ᴥ",
            "⚇",
            "👄"
        ],
        hands: [
            ["乁", "ㄏ"],
            ["ψ", "ψ"],
            ["〈", "ノ･:*☆"],
            ["ᕙ", "ᕗ"],
            ["┌∩┐", "┌∩┐"]
        ]
    };

  }

  generateSmiley(number) {
    const numString = number.toString()
    const headIndex = parseInt(numString.substring(0, 2))
    const eyesIndex = parseInt(numString.substring(2, 4))
    const noseIndex = parseInt(numString.substring(4, 6))
    const handsIndex = parseInt(numString.substring(6, 8))
    const handsLength = this.parts.hands.length
    const headLength = this.parts.head.length
    const eyesLength = this.parts.eyes.length
    const noseLength = this.parts.nose.length

    
    const smiley = this.parts.hands[handsIndex % handsLength][0] +
		  this.parts.head[headIndex % headLength][0] +
		  this.parts.eyes[eyesIndex % eyesLength][0] +
		  this.parts.nose[noseIndex % noseLength] +
		  this.parts.eyes[eyesIndex % eyesLength][1] +
		  this.parts.head[headIndex % headLength][1] +
		  this.parts.hands[handsIndex % handsLength][1]

    return smiley;
  }

  #handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    this.smiley = this.generateSmiley(await crypto_smileys_backend.get_smiley_hash(name));
    this.#render();
  };

  #render() {
    let body = html`
      <main>
        <img src="${logo}" alt="DFINITY logo" />
        <br />
        <br />
        <form action="#">
          <label for="name">Enter your name: &nbsp;</label>
          <input id="name" alt="Name" type="text" />
          <button type="submit">Click Me!</button>
        </form>
        <section id="greeting">${this.smiley}</section>
      </main>
    `;
    render(body, document.getElementById('root'));
    document
      .querySelector('form')
      .addEventListener('submit', this.#handleSubmit);
  }
}

export default App;
