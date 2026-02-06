// Data Flow Simulator view
import { osiLayers } from '../data/osi-layers.js';
import { router } from '../router.js';

/**
 * Step info text for each phase of encapsulation/decapsulation.
 */
const STEP_INFO = {
  'idle': 'Press Play or Step to begin the data flow simulation.',
  'sending-7': 'Application layer generates data (HTTP request)',
  'sending-6': 'Presentation layer formats and encrypts data',
  'sending-5': 'Session layer establishes session parameters',
  'sending-4': 'Transport layer segments data, adds TCP/UDP header (port numbers)',
  'sending-3': 'Network layer adds IP header (source/destination IP addresses)',
  'sending-2': 'Data Link layer adds frame header and trailer (MAC addresses, FCS)',
  'sending-1': 'Physical layer converts frame to electrical/optical signals (bits)',
  'wire': 'Bits travel across the physical medium',
  'receiving-1': 'Physical layer receives electrical/optical signals, converts to frame',
  'receiving-2': 'Data Link layer removes frame header/trailer, verifies FCS',
  'receiving-3': 'Network layer removes IP header, checks destination address',
  'receiving-4': 'Transport layer removes TCP/UDP header, reassembles segments',
  'receiving-5': 'Session layer manages session teardown parameters',
  'receiving-6': 'Presentation layer decrypts and translates data format',
  'receiving-7': 'Application layer receives original data (HTTP response delivered)',
  'done': 'Data flow complete! The message has been fully received and decoded.'
};

/**
 * Ordered list of all simulation steps.
 */
const STEPS = [
  'idle',
  'sending-7', 'sending-6', 'sending-5', 'sending-4',
  'sending-3', 'sending-2', 'sending-1',
  'wire',
  'receiving-1', 'receiving-2', 'receiving-3',
  'receiving-4', 'receiving-5', 'receiving-6', 'receiving-7',
  'done'
];

/**
 * Header badge labels for each layer (used during encapsulation).
 */
const HEADER_LABELS = {
  7: 'H7', 6: 'H6', 5: 'H5', 4: 'H4', 3: 'H3', 2: 'H2', 1: 'H1'
};

/**
 * Get layer data by number.
 */
function getLayer(num) {
  return osiLayers.find(l => l.number === num);
}

/**
 * Build the sender stack HTML (layers 7 down to 1, top to bottom).
 */
function buildSenderStack() {
  const layers = [7, 6, 5, 4, 3, 2, 1];
  return `
    <div class="simulator-stack" id="sender-stack">
      <div class="simulator-stack-title">Sender</div>
      ${layers.map(n => {
        const layer = getLayer(n);
        return `
          <div class="simulator-layer layer-${n}-bg" data-layer="${n}" data-side="sender" id="sender-layer-${n}">
            <span class="layer-label">L${n} ${layer.name}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

/**
 * Build the receiver stack HTML (layers 1 up to 7, but rendered top to bottom
 * as 7 down to 1 visually so it mirrors the sender).
 */
function buildReceiverStack() {
  const layers = [7, 6, 5, 4, 3, 2, 1];
  return `
    <div class="simulator-stack" id="receiver-stack">
      <div class="simulator-stack-title">Receiver</div>
      ${layers.map(n => {
        const layer = getLayer(n);
        return `
          <div class="simulator-layer layer-${n}-bg" data-layer="${n}" data-side="receiver" id="receiver-layer-${n}">
            <span class="layer-label">L${n} ${layer.name}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

/**
 * Build the wire/connection area HTML.
 */
function buildWire() {
  return `
    <div class="simulator-wire" id="simulator-wire">
      <div class="wire-line" id="wire-line"></div>
      <div class="packet" id="sim-packet" style="opacity: 0;">
        <span>PKT</span>
        <div class="packet-headers" id="packet-headers"></div>
      </div>
    </div>
  `;
}

/**
 * Build the controls panel HTML.
 */
function buildControls() {
  return `
    <div class="simulator-controls">
      <button class="sim-btn sim-btn-primary" id="sim-play-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <polygon points="5 3 19 12 5 21 5 3" id="play-icon"/>
        </svg>
        <span id="play-label">Play</span>
      </button>
      <button class="sim-btn sim-btn-secondary" id="sim-step-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/>
        </svg>
        Step
      </button>
      <button class="sim-btn sim-btn-secondary" id="sim-reset-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
        </svg>
        Reset
      </button>
      <div class="speed-control">
        <label for="sim-speed">Speed:</label>
        <input type="range" class="speed-slider" id="sim-speed" min="0.5" max="3" step="0.25" value="1">
        <span id="speed-value">1x</span>
      </div>
    </div>
  `;
}

/**
 * Build the step indicator dots for the info panel.
 */
function buildStepDots() {
  return STEPS.map((step, i) => {
    return `<span class="step-dot" data-step-index="${i}" id="step-dot-${i}"></span>`;
  }).join('');
}

/**
 * Build the info panel HTML.
 */
function buildInfoPanel() {
  return `
    <div class="simulator-info" id="sim-info-panel">
      <h3 id="sim-info-title">Data Flow Simulator</h3>
      <p id="sim-info-text">${STEP_INFO['idle']}</p>
      <div class="step-indicator">
        <span>Progress:</span>
        ${buildStepDots()}
      </div>
    </div>
  `;
}

/**
 * Main render function for the data flow simulator view.
 * @param {HTMLElement} container - The container element to render into.
 * @returns {{ destroy: Function }} Cleanup handle.
 */
export function renderDataFlow(container) {
  // -- State --
  let currentStepIndex = 0;
  let playing = false;
  let playInterval = null;
  let speed = 1;

  // -- Render HTML --
  container.innerHTML = `
    <div class="animate-fade-in">
      <div style="text-align: center; margin-bottom: var(--space-xl);">
        <h1 class="section-title">Data Flow Simulator</h1>
        <p class="section-subtitle" style="max-width: 700px; margin: var(--space-sm) auto 0;">
          Watch data travel through the OSI model — encapsulated layer by layer on the sender side,
          transmitted across the wire, and decapsulated on the receiver side.
        </p>
      </div>

      <div class="simulator-container">
        <div class="simulator-viewport" id="sim-viewport">
          ${buildSenderStack()}
          ${buildWire()}
          ${buildReceiverStack()}
        </div>

        ${buildControls()}
        ${buildInfoPanel()}
      </div>
    </div>
  `;

  // -- DOM references --
  const viewport = container.querySelector('#sim-viewport');
  const packet = container.querySelector('#sim-packet');
  const packetHeaders = container.querySelector('#packet-headers');
  const wireLine = container.querySelector('#wire-line');
  const playBtn = container.querySelector('#sim-play-btn');
  const playLabel = container.querySelector('#play-label');
  const playIcon = container.querySelector('#play-icon');
  const stepBtn = container.querySelector('#sim-step-btn');
  const resetBtn = container.querySelector('#sim-reset-btn');
  const speedSlider = container.querySelector('#sim-speed');
  const speedValue = container.querySelector('#speed-value');
  const infoTitle = container.querySelector('#sim-info-title');
  const infoText = container.querySelector('#sim-info-text');

  // -- Helpers --

  /**
   * Get the current step name.
   */
  function currentStep() {
    return STEPS[currentStepIndex];
  }

  /**
   * Clear all active/processing states from layers.
   */
  function clearLayerStates() {
    container.querySelectorAll('.simulator-layer').forEach(el => {
      el.classList.remove('active', 'processing');
    });
  }

  /**
   * Clear all header badges from layers.
   */
  function clearHeaderBadges() {
    container.querySelectorAll('.header-badge').forEach(el => el.remove());
  }

  /**
   * Clear packet header chips.
   */
  function clearPacketHeaders() {
    packetHeaders.innerHTML = '';
  }

  /**
   * Add a header badge to a sender layer.
   */
  function addSenderHeaderBadge(layerNum) {
    const layerEl = container.querySelector(`#sender-layer-${layerNum}`);
    if (layerEl && !layerEl.querySelector('.header-badge')) {
      const badge = document.createElement('span');
      badge.className = 'header-badge';
      badge.textContent = HEADER_LABELS[layerNum];
      layerEl.appendChild(badge);
    }
  }

  /**
   * Mark a receiver layer header as removing.
   */
  function markReceiverHeaderRemoving(layerNum) {
    const layerEl = container.querySelector(`#receiver-layer-${layerNum}`);
    if (layerEl) {
      const badge = layerEl.querySelector('.header-badge');
      if (badge) {
        badge.classList.add('removing');
        setTimeout(() => badge.remove(), 300);
      }
    }
  }

  /**
   * Add a header chip to the packet visualization.
   */
  function addPacketHeaderChip(layerNum) {
    const chip = document.createElement('span');
    chip.className = `packet-header-chip layer-${layerNum}-bg`;
    chip.textContent = HEADER_LABELS[layerNum];
    chip.dataset.layer = layerNum;
    packetHeaders.appendChild(chip);
  }

  /**
   * Remove a header chip from the packet visualization.
   */
  function removePacketHeaderChip(layerNum) {
    const chip = packetHeaders.querySelector(`[data-layer="${layerNum}"]`);
    if (chip) chip.remove();
  }

  /**
   * Position the packet element relative to a given layer element on the sender or receiver side,
   * or centered on the wire.
   */
  function positionPacketAtLayer(side, layerNum) {
    const layerEl = container.querySelector(`#${side}-layer-${layerNum}`);
    if (!layerEl) return;

    const vpRect = viewport.getBoundingClientRect();
    const layerRect = layerEl.getBoundingClientRect();

    const top = layerRect.top - vpRect.top + (layerRect.height / 2) - 20;

    if (side === 'sender') {
      const left = layerRect.right - vpRect.left + 8;
      packet.style.top = top + 'px';
      packet.style.left = left + 'px';
    } else {
      const left = layerRect.left - vpRect.left - 48;
      packet.style.top = top + 'px';
      packet.style.left = left + 'px';
    }
  }

  function positionPacketAtWire() {
    const wireEl = container.querySelector('#simulator-wire');
    if (!wireEl) return;

    const vpRect = viewport.getBoundingClientRect();
    const wireRect = wireEl.getBoundingClientRect();

    const top = wireRect.top - vpRect.top + (wireRect.height / 2) - 20;
    const left = wireRect.left - vpRect.left + (wireRect.width / 2) - 20;

    packet.style.top = top + 'px';
    packet.style.left = left + 'px';
  }

  /**
   * Update step dot indicators.
   */
  function updateStepDots() {
    STEPS.forEach((_, i) => {
      const dot = container.querySelector(`#step-dot-${i}`);
      if (!dot) return;
      dot.classList.remove('active', 'completed');
      if (i < currentStepIndex) {
        dot.classList.add('completed');
      } else if (i === currentStepIndex) {
        dot.classList.add('active');
      }
    });
  }

  /**
   * Derive a readable title from the current step.
   */
  function getStepTitle(step) {
    if (step === 'idle') return 'Ready';
    if (step === 'done') return 'Complete';
    if (step === 'wire') return 'Physical Medium';
    const match = step.match(/^(sending|receiving)-(\d)$/);
    if (match) {
      const direction = match[1] === 'sending' ? 'Encapsulation' : 'Decapsulation';
      const layerNum = parseInt(match[2], 10);
      const layer = getLayer(layerNum);
      return `${direction} — Layer ${layerNum}: ${layer.name}`;
    }
    return 'Data Flow Simulator';
  }

  /**
   * Apply the visual state for the current step.
   */
  function applyStep() {
    const step = currentStep();

    clearLayerStates();
    updateStepDots();

    // Update info panel
    infoTitle.textContent = getStepTitle(step);
    infoText.textContent = STEP_INFO[step];

    if (step === 'idle') {
      packet.style.opacity = '0';
      packet.classList.remove('sending');
      clearHeaderBadges();
      clearPacketHeaders();
      wireLine.classList.remove('active');
      return;
    }

    // Show the packet once simulation starts
    packet.style.opacity = '1';

    if (step === 'done') {
      packet.classList.remove('sending');
      positionPacketAtLayer('receiver', 7);
      // All receiver headers removed, all sender headers present
      return;
    }

    if (step === 'wire') {
      wireLine.classList.add('active');
      packet.classList.add('sending');
      positionPacketAtWire();
      return;
    }

    const match = step.match(/^(sending|receiving)-(\d)$/);
    if (!match) return;

    const direction = match[1];
    const layerNum = parseInt(match[2], 10);
    const side = direction === 'sending' ? 'sender' : 'receiver';

    // Highlight the active layer
    const activeLayerEl = container.querySelector(`#${side}-layer-${layerNum}`);
    if (activeLayerEl) {
      activeLayerEl.classList.add('active', 'processing');
    }

    // Position the packet
    positionPacketAtLayer(side, layerNum);
    packet.classList.add('sending');

    if (direction === 'sending') {
      // Add header badge on sender side and packet chip
      addSenderHeaderBadge(layerNum);
      addPacketHeaderChip(layerNum);
      wireLine.classList.remove('active');
    } else {
      // On receiving side, ensure all sender badges are present,
      // add header badges to receiver layers that have been processed,
      // then remove for the current layer
      wireLine.classList.add('active');

      // Show all sender headers (they stay)
      for (let n = 7; n >= 1; n--) {
        addSenderHeaderBadge(n);
      }

      // Add badges for previously received layers (already processed, lower numbers)
      // Then show and remove badge for current layer
      const receiverLayerEl = container.querySelector(`#receiver-layer-${layerNum}`);
      if (receiverLayerEl && !receiverLayerEl.querySelector('.header-badge')) {
        const badge = document.createElement('span');
        badge.className = 'header-badge removing';
        badge.textContent = HEADER_LABELS[layerNum];
        receiverLayerEl.appendChild(badge);
        setTimeout(() => badge.remove(), 300);
      }

      // Remove packet header chip for this layer
      removePacketHeaderChip(layerNum);
    }
  }

  /**
   * Advance to the next step.
   * @returns {boolean} True if there was a next step, false if already done.
   */
  function advanceStep() {
    if (currentStepIndex >= STEPS.length - 1) {
      stopPlaying();
      return false;
    }
    currentStepIndex++;
    applyStep();
    return true;
  }

  /**
   * Reset the simulation to idle.
   */
  function resetSimulation() {
    stopPlaying();
    currentStepIndex = 0;
    clearHeaderBadges();
    clearPacketHeaders();
    applyStep();
  }

  /**
   * Start auto-play mode.
   */
  function startPlaying() {
    if (playing) return;
    if (currentStepIndex >= STEPS.length - 1) {
      // Already done, reset first
      resetSimulation();
    }
    playing = true;
    updatePlayButton();

    const intervalMs = 1500 / speed;
    playInterval = setInterval(() => {
      const advanced = advanceStep();
      if (!advanced) {
        stopPlaying();
      }
    }, intervalMs);
  }

  /**
   * Stop auto-play mode.
   */
  function stopPlaying() {
    playing = false;
    if (playInterval !== null) {
      clearInterval(playInterval);
      playInterval = null;
    }
    updatePlayButton();
  }

  /**
   * Toggle play/pause.
   */
  function togglePlay() {
    if (playing) {
      stopPlaying();
    } else {
      startPlaying();
    }
  }

  /**
   * Update the play button label and icon.
   */
  function updatePlayButton() {
    if (playing) {
      playLabel.textContent = 'Pause';
      playIcon.setAttribute('points', '6 4 6 20 10 4 10 20 14 4 14 20 18 4 18 20');
      // Use two bars for pause icon
      playIcon.outerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" id="play-icon">
          <rect x="6" y="4" width="4" height="16"/>
          <rect x="14" y="4" width="4" height="16"/>
        </svg>
      `;
    } else {
      playLabel.textContent = 'Play';
      const existingIcon = playBtn.querySelector('#play-icon');
      if (existingIcon) {
        existingIcon.outerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" id="play-icon">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        `;
      }
    }
    // Re-cache the references since we replaced the SVG
    // (playLabel is still valid since it was not replaced)
  }

  /**
   * Handle speed slider changes.
   */
  function onSpeedChange() {
    speed = parseFloat(speedSlider.value);
    speedValue.textContent = speed + 'x';

    // If currently playing, restart interval with new speed
    if (playing) {
      clearInterval(playInterval);
      const intervalMs = 1500 / speed;
      playInterval = setInterval(() => {
        const advanced = advanceStep();
        if (!advanced) {
          stopPlaying();
        }
      }, intervalMs);
    }
  }

  // -- Event Listeners --
  playBtn.addEventListener('click', togglePlay);

  stepBtn.addEventListener('click', () => {
    if (playing) stopPlaying();
    advanceStep();
  });

  resetBtn.addEventListener('click', resetSimulation);
  speedSlider.addEventListener('input', onSpeedChange);

  // -- Initialize --
  applyStep();

  // -- Return destroy handle --
  return {
    destroy() {
      if (playInterval !== null) {
        clearInterval(playInterval);
        playInterval = null;
      }
      playing = false;
    }
  };
}
