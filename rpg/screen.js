
let count = 0;

export class Screen {
  constructor(code) {
    this.name = `Screen ${count++}`;
    this.canvas = null;
    this.addScreen();
    code(this);
  }

  addScreen() {
    const elemDiv = document.createElement('canvas');
    elemDiv.style.cssText = 'width:100px;height:100px;margin:10px;float:left;';
    document.body.appendChild(elemDiv);

    this.canvas = elemDiv;
  }

  log() {
    console.log(this.name, ": ", ...arguments);
  }

}
