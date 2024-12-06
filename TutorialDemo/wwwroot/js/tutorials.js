document.addEventListener('DOMContentLoaded', () => {
    const hotspots = Array.from(document.querySelectorAll('.hotspot'));
    const popup = document.getElementById('tutorialModal');
    const closeButton = popup.querySelector('.tutorial-close-button');
    const speechNextButton = popup.querySelector('#speechNextButton');
    const speechSkipButton = popup.querySelector('#speechSkipButton');
    const tutorialImageContainer = document.getElementById('tutorialImageContainer');

    let currentStep = 1;
    const totalSteps = hotspots.length;
    let currentHotspot = null; // Track the current hotspot for focus management

    // Function to get image for pointer type
    function getImageForPointerType(pointerType) {
        console.log(`Searching for image with PointerType: ${pointerType}`);
        const imageElement = tutorialImageContainer.querySelector(`img[data-pointer-type="${pointerType}"]`);
        if (imageElement) {
            console.log(`Found image: ${imageElement.src}`);
            return imageElement.src;
        } else {
            console.warn(`No image found for PointerType: ${pointerType}`);
            return null;
        }
    }

    // Function to draw the speech bubble using SVG
    function drawSpeechBubble(pointerType) {
        const speechBubbleContainer = document.getElementById('speechBubble');
        speechBubbleContainer.innerHTML = ''; // Clear any existing SVG

        // Define dimensions
        const bubbleWidth = 300;
        const bubbleHeight = 150;
        const pointerSize = 20; // Size of the arrow

        // Create SVG namespace
        const svgns = "http://www.w3.org/2000/svg";

        // Create SVG element
        const svg = document.createElementNS(svgns, 'svg');
        svg.setAttribute('width', '100%'); // Responsive width
        svg.setAttribute('height', 'auto'); // Responsive height
        svg.setAttribute('viewBox', `0 0 ${bubbleWidth} ${bubbleHeight}`);
        svg.setAttribute('xmlns', svgns);
        svg.setAttribute('aria-hidden', 'true'); // Decorative

        // Create speech bubble path
        const path = document.createElementNS(svgns, 'path');
        path.setAttribute('fill', 'white'); // Bubble color
        path.setAttribute('stroke', '#ccc'); // Border color
        path.setAttribute('stroke-width', '2');

        // Define path based on pointer type
        let d = '';

        switch (pointerType) {
            case "PointUp":
                // Pointer at the top center
                d = `
                    M 20 20
                    h ${bubbleWidth - 40}
                    a 10 10 0 0 1 10 10
                    v ${bubbleHeight - 40}
                    a 10 10 0 0 1 -10 10
                    h -${bubbleWidth - 40}
                    a 10 10 0 0 1 -10 -10
                    v -${bubbleHeight - 40}
                    a 10 10 0 0 1 10 -10
                    Z
                    M ${bubbleWidth / 2 - pointerSize} 20
                    L ${bubbleWidth / 2} 0
                    L ${bubbleWidth / 2 + pointerSize} 20
                    Z
                `;
                break;
            case "PointDown":
                // Pointer at the bottom center
                d = `
                    M 20 0
                    h ${bubbleWidth - 40}
                    a 10 10 0 0 1 10 10
                    v ${bubbleHeight - 20}
                    a 10 10 0 0 1 -10 10
                    h -${bubbleWidth - 40}
                    a 10 10 0 0 1 -10 -10
                    v -${bubbleHeight - 20}
                    a 10 10 0 0 1 10 -10
                    Z
                    M ${bubbleWidth / 2 - pointerSize} ${bubbleHeight}
                    L ${bubbleWidth / 2} ${bubbleHeight + pointerSize}
                    L ${bubbleWidth / 2 + pointerSize} ${bubbleHeight}
                    Z
                `;
                break;
            case "PointLeft":
                // Pointer at the center left
                d = `
                    M ${pointerSize} 20
                    h ${bubbleWidth - 20}
                    a 10 10 0 0 1 10 10
                    v ${bubbleHeight - 40}
                    a 10 10 0 0 1 -10 10
                    h -${bubbleWidth - 20}
                    a 10 10 0 0 1 -10 -10
                    v -${bubbleHeight - 40}
                    a 10 10 0 0 1 10 -10
                    Z
                    M 0 ${bubbleHeight / 2 - pointerSize}
                    L -pointerSize ${bubbleHeight / 2}
                    L 0 ${bubbleHeight / 2 + pointerSize}
                    Z
                `;
                break;
            case "PointRight":
                // Pointer at the center right
                d = `
                    M 0 20
                    h ${bubbleWidth - 20}
                    a 10 10 0 0 1 10 10
                    v ${bubbleHeight - 40}
                    a 10 10 0 0 1 -10 10
                    h -${bubbleWidth - 20}
                    a 10 10 0 0 1 -10 -10
                    v -${bubbleHeight - 40}
                    a 10 10 0 0 1 10 -10
                    Z
                    M ${bubbleWidth} ${bubbleHeight / 2 - pointerSize}
                    L ${bubbleWidth + pointerSize} ${bubbleHeight / 2}
                    L ${bubbleWidth} ${bubbleHeight / 2 + pointerSize}
                    Z
                `;
                break;
            case "PointTopLeft":
                // Pointer at bottom-right
                d = `
                    M 20 0
                    h ${bubbleWidth - 40}
                    a 10 10 0 0 1 10 10
                    v ${bubbleHeight - 40}
                    a 10 10 0 0 1 -10 10
                    h -${bubbleWidth - 40}
                    a 10 10 0 0 1 -10 -10
                    v -${bubbleHeight - 40}
                    a 10 10 0 0 1 10 -10
                    Z
                    M ${bubbleWidth - 20} ${bubbleHeight}
                    L ${bubbleWidth} ${bubbleHeight + pointerSize}
                    L ${bubbleWidth - 20} ${bubbleHeight - pointerSize}
                    Z
                `;
                break;
            case "PointTopRight":
                // Pointer at bottom-left
                d = `
                    M 20 0
                    h ${bubbleWidth - 40}
                    a 10 10 0 0 1 10 10
                    v ${bubbleHeight - 40}
                    a 10 10 0 0 1 -10 10
                    h -${bubbleWidth - 40}
                    a 10 10 0 0 1 -10 -10
                    v -${bubbleHeight - 40}
                    a 10 10 0 0 1 10 -10
                    Z
                    M 20 ${bubbleHeight}
                    L 0 ${bubbleHeight + pointerSize}
                    L 20 ${bubbleHeight - pointerSize}
                    Z
                `;
                break;
            case "PointBottomLeft":
                // Pointer at top-right
                d = `
                    M 20 ${pointerSize}
                    h ${bubbleWidth - 40}
                    a 10 10 0 0 1 10 10
                    v ${bubbleHeight - 20}
                    a 10 10 0 0 1 -10 10
                    h -${bubbleWidth - 40}
                    a 10 10 0 0 1 -10 -10
                    v -${bubbleHeight - 20}
                    a 10 10 0 0 1 10 -10
                    Z
                    M ${bubbleWidth - 20} 0
                    L ${bubbleWidth} -pointerSize
                    L ${bubbleWidth - 20} ${pointerSize}
                    Z
                `;
                break;
            case "PointBottomRight":
                // Pointer at top-left
                d = `
                    M 20 ${pointerSize}
                    h ${bubbleWidth - 40}
                    a 10 10 0 0 1 10 10
                    v ${bubbleHeight - 20}
                    a 10 10 0 0 1 -10 10
                    h -${bubbleWidth - 40}
                    a 10 10 0 0 1 -10 -10
                    v -${bubbleHeight - 20}
                    a 10 10 0 0 1 10 -10
                    Z
                    M 20 0
                    L 0 -pointerSize
                    L 20 pointerSize
                    Z
                `;
                break;
            default:
                // Default: Pointer at top center
                d = `
                    M 20 20
                    h ${bubbleWidth - 40}
                    a 10 10 0 0 1 10 10
                    v ${bubbleHeight - 40}
                    a 10 10 0 0 1 -10 10
                    h -${bubbleWidth - 40}
                    a 10 10 0 0 1 -10 -10
                    v -${bubbleHeight - 40}
                    a 10 10 0 0 1 10 -10
                    Z
                    M ${bubbleWidth / 2 - pointerSize} 20
                    L ${bubbleWidth / 2} 0
                    L ${bubbleWidth / 2 + pointerSize} 20
                    Z
                `;
                break;
        }

        path.setAttribute('d', d.trim());

        // Append path to SVG
        svg.appendChild(path);

        // Append SVG to the speech bubble container
        speechBubbleContainer.appendChild(svg);
    }

    // Function to position the modal near the hotspot
    function positionModal(hotspot, popup) {
        // Temporarily make the modal visible to measure its size
        popup.style.display = 'block';
        popup.style.visibility = 'hidden'; // Hide content to prevent flicker

        const hotspotRect = hotspot.getBoundingClientRect();
        const modalContent = popup.querySelector('.modal-content');
        const modalRect = modalContent.getBoundingClientRect();

        popup.style.visibility = 'visible'; // Make content visible after measuring

        const pointerType = hotspot.getAttribute('data-pointer-type');

        let top = 0;
        let left = 0;

        switch (pointerType) {
            case "PointUp":
                // Arrow points up; modal should be below, centered horizontally
                top = hotspotRect.bottom + 10;
                left = hotspotRect.left + (hotspotRect.width / 2) - (modalRect.width / 2);
                break;
            case "PointDown":
                // Arrow points down; modal should be above, centered horizontally
                top = hotspotRect.top - modalRect.height - 10;
                left = hotspotRect.left + (hotspotRect.width / 2) - (modalRect.width / 2);
                break;
            case "PointLeft":
                // Arrow points left; modal should be to the right, centered vertically
                top = hotspotRect.top + (hotspotRect.height / 2) - (modalRect.height / 2);
                left = hotspotRect.right + 10;
                break;
            case "PointRight":
                // Arrow points right; modal should be to the left, centered vertically
                top = hotspotRect.top + (hotspotRect.height / 2) - (modalRect.height / 2);
                left = hotspotRect.left - modalRect.width - 10;
                break;
            case "PointTopLeft":
                // Arrow points up-left; modal should be below and to the right
                top = hotspotRect.bottom + 10;
                left = hotspotRect.left + hotspotRect.width - 10;
                break;
            case "PointTopRight":
                // Arrow points up-right; modal should be below and to the left
                top = hotspotRect.bottom + 10;
                left = hotspotRect.left - modalRect.width + 10;
                break;
            case "PointBottomLeft":
                // Arrow points down-left; modal should be above and to the right
                top = hotspotRect.top - modalRect.height - 10;
                left = hotspotRect.left + hotspotRect.width - 10;
                break;
            case "PointBottomRight":
                // Arrow points down-right; modal should be above and to the left
                top = hotspotRect.top - modalRect.height - 10;
                left = hotspotRect.left - modalRect.width + 10;
                break;
            default:
                // Default positioning: modal below the hotspot, centered horizontally
                top = hotspotRect.bottom + 10;
                left = hotspotRect.left + (hotspotRect.width / 2) - (modalRect.width / 2);
                break;
        }

        // Debugging Logs
        console.log(`PointerType: ${pointerType}`);
        console.log(`Hotspot Rect: Top=${hotspotRect.top}, Bottom=${hotspotRect.bottom}, Left=${hotspotRect.left}, Right=${hotspotRect.right}`);
        console.log(`Modal Rect: Width=${modalRect.width}, Height=${modalRect.height}`);
        console.log(`Calculated Position: Top=${top}, Left=${left}`);

        // Ensure the modal stays within the viewport
        if (left < 10) left = 10;
        if (left + modalRect.width > window.innerWidth - 10) left = window.innerWidth - modalRect.width - 10;
        if (top < 10) top = 10;
        if (top + modalRect.height > window.innerHeight - 10) top = window.innerHeight - modalRect.height - 10;

        console.log(`Final Position: Top=${top}px, Left=${left}px`);

        // Apply positions, accounting for page scroll
        popup.style.top = `${top + window.scrollY}px`;
        popup.style.left = `${left + window.scrollX}px`;
    }

    // Function to show the modal
    function showPopup(step) {
        const hotspot = hotspots.find(h => parseInt(h.getAttribute('data-step')) === step);
        if (hotspot) {
            console.log(`Showing popup for step: ${step}`);

            // Highlight the current hotspot and reset others
            hideAllHotspots();
            hotspot.style.display = 'block';
            hotspot.style.border = '2px solid red';

            currentHotspot = hotspot; // Track the current hotspot for focus

            const pointerType = hotspot.getAttribute('data-pointer-type');
            const header = hotspot.getAttribute('data-header');
            const description = hotspot.getAttribute('data-description');
            const imageSrc = getImageForPointerType(pointerType);

            // Update speech bubble content
            const speechHeader = popup.querySelector('#speech-header');
            const speechDescription = popup.querySelector('#speech-description');
            speechHeader.textContent = header || "No Header";
            speechDescription.textContent = description || "No Description Available";

            // Draw the speech bubble based on PointerType
            drawSpeechBubble(pointerType);

            // Update image
            const popupText = popup.querySelector('#tutorial-popup-text');
            popupText.innerHTML = ''; // Clear previous content

            if (imageSrc) {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = `Step ${step} Image`;
                img.style.maxWidth = '100%';
                img.style.height = 'auto';

                img.onload = () => {
                    console.log(`Image loaded successfully: ${imageSrc}`);
                    popupText.appendChild(img);
                    // Position modal after image is loaded
                    positionModal(hotspot, popup);
                };

                img.onerror = () => {
                    console.error(`Failed to load image: ${imageSrc}`);
                    const errorMsg = document.createElement('p');
                    errorMsg.textContent = `Step ${step}: Failed to load image.`;
                    popupText.appendChild(errorMsg);
                    positionModal(hotspot, popup);
                };

                popupText.appendChild(img);
            } else {
                console.warn(`No image available for step: ${step}`);
                const noImageMsg = document.createElement('p');
                noImageMsg.textContent = "No image available.";
                popupText.appendChild(noImageMsg);
                positionModal(hotspot, popup);
            }

            // Show the modal
            popup.style.display = 'block';
            popup.focus(); // Set focus for accessibility
        } else {
            console.error(`No hotspot found for step: ${step}`);
        }
    }

    // Function to hide the modal
    function hidePopup() {
        console.log("Hiding popup");
        popup.style.display = 'none';
        hideAllHotspots();

        // Return focus to the last interacted hotspot
        if (currentHotspot) {
            currentHotspot.focus();
            currentHotspot = null;
        }
    }

    // Function to hide all hotspots
    function hideAllHotspots() {
        hotspots.forEach(hotspot => {
            hotspot.style.display = 'none';
            hotspot.style.border = '';
        });
    }

    // Next button functionality
    if (speechNextButton) {
        speechNextButton.addEventListener('click', () => {
            console.log("Next button clicked");
            hideAllHotspots();
            if (currentStep < totalSteps) {
                currentStep += 1;
                showPopup(currentStep);
            } else {
                hidePopup();
                alert("You've completed the tutorial!");
            }
        });
    }

    // Skip button functionality
    if (speechSkipButton) {
        speechSkipButton.addEventListener('click', () => {
            console.log("Skip button clicked");
            hidePopup();
            alert("Tutorial skipped.");
        });
    }

    // Close button functionality
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            console.log("Close button clicked");
            hidePopup();
        });
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            console.log("Clicked outside the modal content");
            hidePopup();
        }
    });

    // Start the tutorial on page load
    showPopup(currentStep);
});
