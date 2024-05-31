interface NodeInternal {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface LinkInternal {
  source: string;
  target: string;
}

interface NetworkData {
  nodes: NodeInternal[];
  links: LinkInternal[];
}
export function forceDirectedLayout(): void {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  if (!ctx) {
    throw new Error('Canvas context not available');
  }

  const networkData: NetworkData = {
    nodes: [
      { id: '1', x: 0, y: 0, vx: 0, vy: 0 },
      { id: '2', x: 0, y: 0, vx: 0, vy: 0 },
      { id: '3', x: 0, y: 0, vx: 0, vy: 0 },
      { id: '4', x: 0, y: 0, vx: 0, vy: 0 },
      { id: '5', x: 0, y: 0, vx: 0, vy: 0 },
      { id: '6', x: 0, y: 0, vx: 0, vy: 0 },
      // Add more nodes as needed
    ],
    links: [
      { source: '1', target: '2' },
      { source: '2', target: '3' },
      { source: '3', target: '1' },
      { source: '3', target: '4' },
      { source: '4', target: '5' },
      { source: '4', target: '6' },
      { source: '2', target: '6' },
      // Add more links as needed
    ],
  };

  function drawNode(node: NodeInternal): void {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = 'black';
    ctx.fillText(node.id, node.x + 12, node.y + 4);
  }

  function drawLink(link: LinkInternal): void {
    const sourceNode = networkData.nodes.find(
      (node) => node.id === link.source,
    );
    const targetNode = networkData.nodes.find(
      (node) => node.id === link.target,
    );

    if (!sourceNode || !targetNode) {
      console.error('Invalid link: ', link);
      return;
    }

    ctx.beginPath();
    ctx.moveTo(sourceNode.x, sourceNode.y);
    ctx.lineTo(targetNode.x, targetNode.y);
    ctx.stroke();
    ctx.closePath();
  }

  function drawNetwork(networkData: NetworkData): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw links first
    networkData.links.forEach((link) => drawLink(link));

    // Draw nodes
    networkData.nodes.forEach((node) => drawNode(node));
  }

  function applyForces(
    nodes: NodeInternal[],
    links: LinkInternal[],
    width: number,
    height: number,
  ): void {
    const repulsionStrength = 10000;
    const springLength = 100;
    const springStrength = 0.1;

    // Initialize positions randomly
    nodes.forEach((node) => {
      node.x = Math.random() * width;
      node.y = Math.random() * height;
    });

    for (let i = 0; i < 300; i++) {
      // Run the simulation for 300 iterations
      // Calculate repulsive forces
      for (let j = 0; j < nodes.length; j++) {
        for (let k = 0; k < nodes.length; k++) {
          if (j === k) continue;
          const dx = nodes[j].x - nodes[k].x;
          const dy = nodes[j].y - nodes[k].y;
          const distance = Math.sqrt(dx * dx + dy * dy) + 0.1; // Prevent division by zero
          const repulsion = repulsionStrength / (distance * distance);

          nodes[j].vx += (dx / distance) * repulsion;
          nodes[j].vy += (dy / distance) * repulsion;
        }
      }

      // Calculate attractive forces (spring forces)
      links.forEach((link) => {
        const sourceNode = nodes.find((node) => node.id === link.source);
        const targetNode = nodes.find((node) => node.id === link.target);
        if (!sourceNode || !targetNode) return;

        const dx = targetNode.x - sourceNode.x;
        const dy = targetNode.y - sourceNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const displacement = springStrength * (distance - springLength);

        const fx = (dx / distance) * displacement;
        const fy = (dy / distance) * displacement;

        sourceNode.vx += fx;
        sourceNode.vy += fy;
        targetNode.vx -= fx;
        targetNode.vy -= fy;
      });

      // Update positions based on velocity
      nodes.forEach((node) => {
        node.x += node.vx * 0.01; // Damping factor to stabilize the simulation
        node.y += node.vy * 0.01;
        node.vx *= 0.9; // Friction to prevent infinite motion
        node.vy *= 0.9;
      });
    }
  }

  // Run the force-directed layout algorithm
  applyForces(
    networkData.nodes,
    networkData.links,
    canvas.width,
    canvas.height,
  );

  // Draw the final network
  drawNetwork(networkData);
}
