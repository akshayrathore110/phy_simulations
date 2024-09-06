// JavaScript for Interactive Simulations

// JavaScript for Interactive Simulations

// Start Torque Simulation
function startTorque() {
  document.getElementById('torque-container').style.display = 'block';
  document.getElementById('cm-container').style.display = 'none';

  const forceSlider = document.getElementById('torqueForce');
  const distanceSlider = document.getElementById('torqueDistance');
  const torqueResult = document.getElementById('torqueResult');
  const forceValue = document.getElementById('forceValue');
  const distanceValue = document.getElementById('distanceValue');
  const torqueCanvas = document.getElementById('torqueCanvas');
  const torqueCtx = torqueCanvas.getContext('2d');

  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;

  function drawTorque(force, distance) {
    torqueCtx.clearRect(0, 0, torqueCanvas.width, torqueCanvas.height);

    // Draw lever arm
    torqueCtx.strokeStyle = 'black';
    torqueCtx.lineWidth = 5;
    torqueCtx.beginPath();
    torqueCtx.moveTo(150, 300);
    torqueCtx.lineTo(150 + distance * 30, 300); // Scale distance
    torqueCtx.stroke();

    // Draw force vector
    torqueCtx.strokeStyle = 'blue';
    torqueCtx.lineWidth = 3;
    torqueCtx.beginPath();
    torqueCtx.moveTo(150 + distance * 30, 300);
    torqueCtx.lineTo(150 + distance * 30, 300 - force * 3); // Scale force
    torqueCtx.stroke();

    // Draw force arrow
    torqueCtx.fillStyle = 'blue';
    torqueCtx.beginPath();
    torqueCtx.moveTo(150 + distance * 30, 300 - force * 3);
    torqueCtx.lineTo(150 + distance * 30 - 10, 300 - force * 3 + 10);
    torqueCtx.lineTo(150 + distance * 30 + 10, 300 - force * 3 + 10);
    torqueCtx.fill();

    // Draw rotating effect
    torqueCtx.strokeStyle = 'red';
    torqueCtx.lineWidth = 2;
    torqueCtx.beginPath();
    torqueCtx.arc(150, 300, distance * 30, 0, Math.PI * 2 * (force / 100), false);
    torqueCtx.stroke();

    // Draw text
    torqueCtx.fillStyle = 'black';
    torqueCtx.font = '16px Arial';
    torqueCtx.fillText('Lever Arm', 120, 320);
    torqueCtx.fillText('Force', 150 + distance * 30 + 20, 300 - force * 3);
    torqueCtx.fillText('Torque = ' + (force * distance).toFixed(2) + ' Nm', 150, 50);
  }

  function updateTorque() {
    const force = forceSlider.value;
    const distance = distanceSlider.value;
    const torque = force * distance;
    torqueResult.textContent = torque.toFixed(2);
    forceValue.textContent = force;
    distanceValue.textContent = distance;
    
    drawTorque(force, distance);
  }

  forceSlider.addEventListener('input', updateTorque);
  distanceSlider.addEventListener('input', updateTorque);

  // Interactive dragging
  torqueCanvas.addEventListener('mousedown', function(e) {
    isDragging = true;
    dragStartX = e.offsetX;
    dragStartY = e.offsetY;
  });

  torqueCanvas.addEventListener('mouseup', function() {
    isDragging = false;
  });

  torqueCanvas.addEventListener('mousemove', function(e) {
    if (isDragging) {
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;
      const dx = mouseX - dragStartX;
      const dy = mouseY - dragStartY;
      
      const force = Math.min(Math.max(dy / 5, 1), 100); // Adjust force based on drag
      const distance = Math.min(Math.max(dx / 10, 1), 10); // Adjust distance based on drag
      
      forceSlider.value = force;
      distanceSlider.value = distance;
      
      updateTorque();
    }
  });

  updateTorque(); // Initialize with default values
}

// Start Center of Mass Simulation
function startCM() {
  document.getElementById('cm-container').style.display = 'block';
  document.getElementById('torque-container').style.display = 'none';

  const mass1Slider = document.getElementById('mass1');
  const position1Slider = document.getElementById('position1');
  const mass2Slider = document.getElementById('mass2');
  const position2Slider = document.getElementById('position2');
  const cmResult = document.getElementById('cmResult');
  const mass1Value = document.getElementById('mass1Value');
  const position1Value = document.getElementById('position1Value');
  const mass2Value = document.getElementById('mass2Value');
  const position2Value = document.getElementById('position2Value');

  // Update Center of Mass Calculation
  function updateCM() {
    const mass1 = parseFloat(mass1Slider.value);
    const position1 = parseFloat(position1Slider.value);
    const mass2 = parseFloat(mass2Slider.value);
    const position2 = parseFloat(position2Slider.value);

    const centerOfMass = (mass1 * position1 + mass2 * position2) / (mass1 + mass2);
    cmResult.textContent = centerOfMass.toFixed(2);
    mass1Value.textContent = mass1;
    position1Value.textContent = position1;
    mass2Value.textContent = mass2;
    position2Value.textContent = position2;
  }

  mass1Slider.addEventListener('input', updateCM);
  position1Slider.addEventListener('input', updateCM);
  mass2Slider.addEventListener('input', updateCM);
  position2Slider.addEventListener('input', updateCM);

  updateCM(); // Initialize with default values
}
// JavaScript for Interactive Simulations

// Start Torque Simulation
function startTorque() {
  document.getElementById('torque-container').style.display = 'block';
  document.getElementById('cm-container').style.display = 'none';

  const forceSlider = document.getElementById('torqueForce');
  const distanceSlider = document.getElementById('torqueDistance');
  const torqueResult = document.getElementById('torqueResult');
  const forceValue = document.getElementById('forceValue');
  const distanceValue = document.getElementById('distanceValue');
  const torqueCanvas = document.getElementById('torqueCanvas');
  const torqueCtx = torqueCanvas.getContext('2d');

  function updateTorque() {
    const force = forceSlider.value;
    const distance = distanceSlider.value;
    const torque = force * distance;
    torqueResult.textContent = torque.toFixed(2);
    forceValue.textContent = force;
    distanceValue.textContent = distance;

    // Clear and redraw the canvas for torque
    torqueCtx.clearRect(0, 0, torqueCanvas.width, torqueCanvas.height);
    torqueCtx.fillStyle = 'blue';
    torqueCtx.fillRect(10, 10, force * 2, 20); // Example visual effect
  }

  forceSlider.addEventListener('input', updateTorque);
  distanceSlider.addEventListener('input', updateTorque);

  updateTorque(); // Initialize with default values
}

// Start Center of Mass Simulation
function startCM() {
  document.getElementById('cm-container').style.display = 'block';
  document.getElementById('torque-container').style.display = 'none';

  const mass1Slider = document.getElementById('mass1');
  const position1Slider = document.getElementById('position1');
  const mass2Slider = document.getElementById('mass2');
  const position2Slider = document.getElementById('position2');
  const cmResult = document.getElementById('cmResult');
  const mass1Value = document.getElementById('mass1Value');
  const position1Value = document.getElementById('position1Value');
  const mass2Value = document.getElementById('mass2Value');
  const position2Value = document.getElementById('position2Value');
  const cmCanvas = document.getElementById('cmCanvas');
  const cmCtx = cmCanvas.getContext('2d');

  function updateCM() {
    const mass1 = parseFloat(mass1Slider.value);
    const position1 = parseFloat(position1Slider.value);
    const mass2 = parseFloat(mass2Slider.value);
    const position2 = parseFloat(position2Slider.value);

    const centerOfMass = (mass1 * position1 + mass2 * position2) / (mass1 + mass2);
    cmResult.textContent = centerOfMass.toFixed(2);
    mass1Value.textContent = mass1;
    position1Value.textContent = position1;
    mass2Value.textContent = mass2;
    position2Value.textContent = position2;

    // Clear and redraw the canvas for center of mass
    cmCtx.clearRect(0, 0, cmCanvas.width, cmCanvas.height);
    cmCtx.fillStyle = 'red';
    cmCtx.fillRect(position1, 100, mass1 * 2, 20); // Example visual effect
    cmCtx.fillRect(position2, 130, mass2 * 2, 20); // Example visual effect
    cmCtx.fillStyle = 'green';
    cmCtx.fillRect(centerOfMass * 2, 160, 20, 20); // Center of Mass
  }

  mass1Slider.addEventListener('input', updateCM);
  position1Slider.addEventListener('input', updateCM);
  mass2Slider.addEventListener('input', updateCM);
  position2Slider.addEventListener('input', updateCM);

  updateCM(); // Initialize with default values
}
