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

  function drawTorque() {
    torqueCtx.clearRect(0, 0, torqueCanvas.width, torqueCanvas.height);

    // Draw lever arm
    torqueCtx.strokeStyle = 'black';
    torqueCtx.lineWidth = 5;
    torqueCtx.beginPath();
    torqueCtx.moveTo(100, 300);
    torqueCtx.lineTo(100 + distanceSlider.value * 30, 300);
    torqueCtx.stroke();

    // Draw force vector
    torqueCtx.strokeStyle = 'blue';
    torqueCtx.lineWidth = 3;
    torqueCtx.beginPath();
    torqueCtx.moveTo(100 + distanceSlider.value * 30, 300);
    torqueCtx.lineTo(100 + distanceSlider.value * 30, 300 - forceSlider.value * 2);
    torqueCtx.stroke();

    // Draw force arrow
    torqueCtx.fillStyle = 'blue';
    torqueCtx.beginPath();
    torqueCtx.moveTo(100 + distanceSlider.value * 30, 300 - forceSlider.value * 2);
    torqueCtx.lineTo(100 + distanceSlider.value * 30 - 10, 300 - forceSlider.value * 2 + 10);
    torqueCtx.lineTo(100 + distanceSlider.value * 30 + 10, 300 - forceSlider.value * 2 + 10);
    torqueCtx.fill();

    torqueResult.textContent = (forceSlider.value * distanceSlider.value).toFixed(2);
    forceValue.textContent = forceSlider.value;
    distanceValue.textContent = distanceSlider.value;
  }

  function updateTorque() {
    drawTorque();
  }

  forceSlider.addEventListener('input', updateTorque);
  distanceSlider.addEventListener('input', updateTorque);

  updateTorque(); // Initialize with default values
}

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

  function drawCM() {
    cmCtx.clearRect(0, 0, cmCanvas.width, cmCanvas.height);

    // Draw Mass 1
    cmCtx.fillStyle = 'blue';
    cmCtx.fillRect(position1Slider.value * 50 - 15, 300 - mass1Slider.value * 5, 30, mass1Slider.value * 5);

    // Draw Mass 2
    cmCtx.fillStyle = 'red';
    cmCtx.fillRect(position2Slider.value * 50 - 15, 300 - mass2Slider.value * 5, 30, mass2Slider.value * 5);

    // Draw Center of Mass
    const centerOfMass = (mass1Slider.value * position1Slider.value + mass2Slider.value * position2Slider.value) / (mass1Slider.value + mass2Slider.value);
    cmCtx.fillStyle = 'green';
    cmCtx.fillRect(centerOfMass * 50 - 5, 290, 10, 10);

    cmResult.textContent = centerOfMass.toFixed(2);
    mass1Value.textContent = mass1Slider.value;
    position1Value.textContent = position1Slider.value;
    mass2Value.textContent = mass2Slider.value;
    position2Value.textContent = position2Slider.value;
  }

  function updateCM() {
    drawCM();
  }

  mass1Slider.addEventListener('input', updateCM);
  position1Slider.addEventListener('input', updateCM);
  mass2Slider.addEventListener('input', updateCM);
  position2Slider.addEventListener('input', updateCM);

  updateCM(); // Initialize with default values
}
