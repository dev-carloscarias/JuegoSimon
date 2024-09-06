 import {Howl} from 'howler'

const colors: string[] = ['red', 'green', 'blue', 'yellow'];

const sounds: { [key: string]: Howl } = {
  red: new Howl({ src: ['/sounds/red-sound.mp3'] }),
  green: new Howl({ src: ['/sounds/green-sound.mp3'] }),
  blue: new Howl({ src: ['/sounds/blue-sound.mp3'] }),
  yellow: new Howl({ src: ['/sounds/yellow-sound.mp3'] }),
};

export class GameService {
  private gameSequence: string[] = [];
  private userSequence: string[] = [];

  getColors(): string[] {
    return colors;
  }

  playColor(color: string): void {
    sounds[color].play();
  }

  generateNextColor(): string {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    this.gameSequence.push(randomColor);
    return randomColor;
  }

  getGameSequence(): string[] {
    return this.gameSequence;
  }
  
  getUserSequenceLength(): number {
    return this.userSequence.length;
  }

  resetGame(): void {
    this.gameSequence = [];
    this.userSequence = [];
  }

  addUserColor(color: string): void {
    this.userSequence.push(color);
  }

  checkUserSequence(): boolean {
    if (this.userSequence.length !== this.gameSequence.length) return false;
    return this.userSequence.every((color, index) => color === this.gameSequence[index]);
  }

  resetUserSequence(): void {
    this.userSequence = [];
  }
  
  isUserSequenceComplete(): boolean {
    return this.userSequence.length === this.gameSequence.length;
  }
}
