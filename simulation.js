// JavaScript for Interactive Simulations

// Initialize variables for torque simulation
let animationFrameId;
let isAnimating = false;
let angle = 0;
let angularVelocity = 0;

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

    angularVelocity = torque / 10; // Adjust the factor to scale the rotation speed
  }

  function drawTorque() {
    torqueCtx.clearRect(0, 0, torqueCanvas.width, torqueCanvas.height);

    // Draw lever arm
    torqueCtx.strokeStyle = 'black';
    torqueCtx.lineWidth = 5;
    torqueCtx.beginPath();
    torqueCtx.moveTo(300, 200);
    torqueCtx.lineTo(300 + distanceSlider.value * 20 * Math.cos(angle), 200 + distanceSlider.value * 20 * Math.sin(angle));
    torqueCtx.stroke();

    // Draw object
    torqueCtx.fillStyle = 'blue';
    torqueCtx.beginPath();
    torqueCtx.arc(300 + distanceSlider.value * 20 * Math.cos(angle), 200 + distanceSlider.value * 20 * Math.sin(angle), 20, 0, 2 * Math.PI);
    torqueCtx.fill();

    // Draw force vector
    torqueCtx.strokeStyle = 'red';
    torqueCtx.lineWidth = 3;
    torqueCtx.beginPath();
    torqueCtx.moveTo(300 + distanceSlider.value * 20 * Math.cos(angle), 200 + distanceSlider.value * 20 * Math.sin(angle));
    torqueCtx.lineTo(300 + distanceSlider.value * 20 * Math.cos(angle) + forceSlider.value * Math.cos(angle), 200 + distanceSlider.value * 20 * Math.sin(angle) + forceSlider.value * Math.sin(angle));
    torqueCtx.stroke();

    // Draw force arrow
    torqueCtx.fillStyle = 'red';
    torqueCtx.beginPath();
    torqueCtx.moveTo(300 + distanceSlider.value * 20 * Math.cos(angle) + forceSlider.value * Math.cos(angle), 200 + distanceSlider.value * 20 * Math.sin(angle) + forceSlider.value * Math.sin(angle));
    torqueCtx.lineTo(300 + distanceSlider.value * 20 * Math.cos(angle) + forceSlider.value * Math.cos(angle) - 10, 200 + distanceSlider.value * 20 * Math.sin(angle) + forceSlider.value * Math.sin(angle) + 10);
    torqueCtx.lineTo(300 + distanceSlider.value * 20 * Math.cos(angle) + forceSlider.value * Math.cos(angle) + 10, 200 + distanceSlider.value * 20 * Math.sin(angle) + forceSlider.value * Math.sin(angle) + 10);
    torqueCtx.fill();
  }

  function animate() {
    if (isAnimating) {
      angle += angularVelocity;
      drawTorque();
      animationFrameId = requestAnimationFrame(animate);
    }
  }

  function startAnimation() {
    isAnimating = true;
    animate();
  }

  function stopAnimation() {
    isAnimating = false;
    cancelAnimationFrame(animationFrameId);
  }

  function resetSimulation() {
    stopAnimation();
    angle = 0;
    document.getElementById('torqueForce').value = 50;
    document.getElementById('torqueDistance').value = 5;
    updateTorque();
    drawTorque();
  }

  document.getElementById('playButton').addEventListener('click', startAnimation);
  document.getElementById('pauseButton').addEventListener('click', stopAnimation);
  document.getElementById('resetButton').addEventListener('click', resetSimulation);

  forceSlider.addEventListener('input', updateTorque);
  distanceSlider.addEventListener('input', updateTorque);

  updateTorque(); // Initialize with default values
  drawTorque(); // Initial drawing
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

    drawCM();
  }

  function drawCM() {
    cmCtx.clearRect(0, 0, cmCanvas.width, cmCanvas.height);

    // Draw masses
    cmCtx.fillStyle = 'red';
    cmCtx.beginPath();
    cmCtx.arc(position1Slider.value * 20, 200, mass1Slider.value / 2, 0, 2 * Math.PI);
    cmCtx.fill();

    cmCtx.fillStyle = 'blue';
    cmCtx.beginPath();
    cmCtx.arc(position2Slider.value * 20, 200, mass2Slider.value / 2, 0, 2 * Math.PI);
    cmCtx.fill();

    // Draw center of mass
    cmCtx.strokeStyle = 'green';
    cmCtx.lineWidth = 2;
    cmCtx.beginPath();
    cmCtx.moveTo(centerOfMass * 20, 0);
    cmCtx.lineTo(centerOfMass * 20, 400);
    cmCtx.stroke();
  }

  mass1Slider.addEventListener('input', updateCM);
  position1Slider.addEventListener('input', updateCM);
  mass2Slider.addEventListener('input', updateCM);
  position2Slider.addEventListener('input', updateCM);

  updateCM(); // Initialize with default values
}
