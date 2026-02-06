// Packet traversal animation engine
export class PacketFlowEngine {
  constructor(container, options = {}) {
    this.container = container;
    this.speed = options.speed || 1;
    this.onStep = options.onStep || (() => {});
    this.currentStep = -1;
    this.playing = false;
    this.timer = null;
    this.totalSteps = 15; // 7 down + wire + 7 up
  }

  getStepDuration() {
    return 800 / this.speed;
  }

  play() {
    if (this.currentStep >= this.totalSteps - 1) this.reset();
    this.playing = true;
    this._advance();
  }

  pause() {
    this.playing = false;
    if (this.timer) clearTimeout(this.timer);
  }

  step() {
    this.playing = false;
    if (this.timer) clearTimeout(this.timer);
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
      this.onStep(this.currentStep, this._getStepInfo());
    }
  }

  reset() {
    this.pause();
    this.currentStep = -1;
    this.onStep(-1, null);
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  _advance() {
    if (!this.playing || this.currentStep >= this.totalSteps - 1) {
      this.playing = false;
      return;
    }
    this.currentStep++;
    this.onStep(this.currentStep, this._getStepInfo());
    this.timer = setTimeout(() => this._advance(), this.getStepDuration());
  }

  _getStepInfo() {
    const s = this.currentStep;
    if (s < 7) {
      return { phase: 'sending', layer: 7 - s, side: 'sender' };
    } else if (s === 7) {
      return { phase: 'wire', layer: 0, side: 'wire' };
    } else {
      return { phase: 'receiving', layer: s - 7, side: 'receiver' };
    }
  }

  destroy() {
    this.pause();
  }
}
