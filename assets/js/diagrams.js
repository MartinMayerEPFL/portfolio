// Directed graph checked against the engine improvement loop on page 8 of the PDF.
// The evaluator scores the plans; the separate agentic LLM updates the engine.
export const engineFlow = {
  nodes: [
    { id: 'tests', label: 'engineTest' },
    { id: 'data', label: 'engineData' },
    { id: 'benchmark', label: 'engineBenchmark' },
    { id: 'evaluator', label: 'engineEvaluator' },
    { id: 'engine', label: 'engineCore' },
    { id: 'report', label: 'engineReport' },
    { id: 'agent', label: 'engineAgent' }
  ],
  edges: [
    { from: 'tests', to: 'benchmark' },
    { from: 'data', to: 'benchmark' },
    { from: 'benchmark', to: 'evaluator', label: 'engineResults' },
    { from: 'evaluator', to: 'report', label: 'engineAnalysis' },
    { from: 'report', to: 'agent', label: 'enginePlan' },
    { from: 'agent', to: 'engine', label: 'engineUpdate', feedback: true },
    { from: 'engine', to: 'benchmark', label: 'engineRetest', feedback: true }
  ]
};

const svgNS = 'http://www.w3.org/2000/svg';
const diagrams = new Map();
let instance = 0;
const escape = value => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

export function engineDiagram(text) {
  const id = `engine-flow-${++instance}`;
  return `<figure class="engine-diagram">
    <figcaption class="engine-caption">${text.engineCaption}</figcaption>
    <div class="engine-canvas" role="img" aria-label="${escape(text.engineDescription)}" data-engine-marker="${id}">
      <svg class="engine-connections" aria-hidden="true"></svg>
      ${engineFlow.nodes.map(node => `<span class="engine-node engine-node-${node.id}" data-engine-node="${node.id}">${escape(text[node.label])}</span>`).join('')}
      ${engineFlow.edges.filter(edge => edge.label).map(edge => `<span hidden data-engine-label="${edge.from}-${edge.to}">${escape(text[edge.label])}</span>`).join('')}
    </div>
  </figure>`;
}

function svgElement(name, attributes = {}) {
  const element = document.createElementNS(svgNS, name);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
  return element;
}

function drawLabel(svg, value, x, y, maxWidth) {
  const group = svgElement('g', { class: 'engine-edge-label' });
  const text = svgElement('text', { x, y, 'text-anchor': 'middle', 'dominant-baseline': 'middle' });
  group.append(text);
  svg.append(group);
  const lines = [];
  let line = '';
  for (const word of value.split(' ')) {
    const candidate = line ? `${line} ${word}` : word;
    text.textContent = candidate;
    if (text.getComputedTextLength() > maxWidth && line) {
      lines.push(line);
      line = word;
    } else line = candidate;
  }
  lines.push(line);
  text.textContent = '';
  lines.forEach((content, index) => {
    const span = svgElement('tspan', { x, y: y + (index - (lines.length - 1) / 2) * 14 });
    span.textContent = content;
    text.append(span);
  });
  const bounds = text.getBBox();
  group.prepend(svgElement('rect', { x: bounds.x - 4, y: bounds.y - 2, width: bounds.width + 8, height: bounds.height + 4, rx: 2 }));
}

function drawConnections(canvas) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (!width || !height || !canvas.isConnected) return;
  const svg = canvas.querySelector('svg');
  const marker = canvas.dataset.engineMarker;
  const nodes = {};
  canvas.querySelectorAll('[data-engine-node]').forEach(node => {
    nodes[node.dataset.engineNode] = {
      left: node.offsetLeft, top: node.offsetTop,
      right: node.offsetLeft + node.offsetWidth, bottom: node.offsetTop + node.offsetHeight,
      cx: node.offsetLeft + node.offsetWidth / 2, cy: node.offsetTop + node.offsetHeight / 2,
      width: node.offsetWidth
    };
  });
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.replaceChildren();
  const defs = svgElement('defs');
  for (const [suffix, color] of [['normal', '#a7aaa5'], ['feedback', '#ef8177']]) {
    const head = svgElement('marker', { id: `${marker}-${suffix}`, viewBox: '0 0 8 8', refX: 7, refY: 4, markerWidth: 6, markerHeight: 6, orient: 'auto', markerUnits: 'userSpaceOnUse' });
    head.append(svgElement('path', { d: 'M0 0 8 4 0 8Z', fill: color }));
    defs.append(head);
  }
  svg.append(defs);
  const labels = [];
  for (const edge of engineFlow.edges) {
    const a = nodes[edge.from];
    const b = nodes[edge.to];
    let d, labelX, labelY;
    if (edge.to === 'benchmark' && (edge.from === 'tests' || edge.from === 'data')) {
      const joint = b.top - 22;
      d = `M${a.cx} ${a.bottom}V${joint}H${b.cx}V${b.top - 5}`;
    } else if (edge.from === 'benchmark') {
      const joint = b.top - 24;
      d = `M${a.cx} ${a.bottom}V${joint}H${b.cx}V${b.top - 5}`;
      labelX = b.cx; labelY = joint;
    } else if (edge.from === 'report') {
      d = `M${a.right} ${a.cy}H${b.left - 5}`;
      labelX = width / 2; labelY = Math.max(a.bottom, b.bottom) + 23;
    } else if (edge.from === 'engine') {
      d = `M${a.cx} ${a.top}V${b.cy}H${b.right + 5}`;
      labelX = a.cx; labelY = (a.top + b.bottom) / 2;
    } else if (edge.from === 'agent') {
      d = `M${a.cx} ${a.top}V${b.bottom + 5}`;
      labelX = a.cx; labelY = (a.top + b.bottom) / 2;
    } else {
      d = `M${a.cx} ${a.bottom}V${b.top - 5}`;
      labelX = a.cx; labelY = (a.bottom + b.top) / 2;
    }
    svg.append(svgElement('path', {
      d, class: `engine-edge${edge.feedback ? ' engine-edge-feedback' : ''}`,
      'data-edge': `${edge.from}-${edge.to}`,
      'marker-end': `url(#${marker}-${edge.feedback ? 'feedback' : 'normal'})`
    }));
    if (edge.label) {
      const value = canvas.querySelector(`[data-engine-label="${edge.from}-${edge.to}"]`).textContent;
      labels.push({ value, x: labelX, y: labelY, maxWidth: edge.from === 'report' ? width - 16 : Math.min(a.width, b.width) - 8 });
    }
  }
  labels.forEach(label => drawLabel(svg, label.value, label.x, label.y, label.maxWidth));
}

export function refreshEngineDiagrams() {
  for (const [canvas, observer] of diagrams) {
    if (!canvas.isConnected) {
      observer?.disconnect();
      diagrams.delete(canvas);
    }
  }
  document.querySelectorAll('.engine-canvas').forEach(canvas => {
    if (!diagrams.has(canvas)) {
      const observer = 'ResizeObserver' in window ? new ResizeObserver(() => drawConnections(canvas)) : null;
      observer?.observe(canvas);
      diagrams.set(canvas, observer);
    }
    drawConnections(canvas);
  });
}

document.fonts.ready.then(() => diagrams.forEach((_, canvas) => drawConnections(canvas)));
