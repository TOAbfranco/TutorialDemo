const contentData = [
    {
        header: "Step 1",
        comment: "This is step 1 where the top-left corner is highlighted. Use this to guide users to key actions located in the top-left corner of the screen.",
        image: "Images/TrainingTooltips/TopLeft.png"
    },
    {
        header: "Step 2",
        comment: "Step 2 focuses on the upward direction, pointing users to elements or features positioned directly above the current context.",
        image: "Images/TrainingTooltips/Up.png"
    },
    {
        header: "Step 3",
        comment: "In step 3, the pointer highlights the top-right corner, usually for settings, profile options, or additional menu items.",
        image: "Images/TrainingTooltips/TopRight.png"
    },
    {
        header: "Step 4",
        comment: "Step 4 guides users to the left side of the interface, often used for navigation menus or main content.",
        image: "Images/TrainingTooltips/Left.png"
    },
    {
        header: "Step 5",
        comment: "In step 5, the focus shifts to the right side, which might include secondary actions or contextual information.",
        image: "Images/TrainingTooltips/Right.png"
    },
    {
        header: "Step 6",
        comment: "Step 6 draws attention to the bottom-left corner, commonly used for less prominent but important actions like help or feedback.",
        image: "Images/TrainingTooltips/BottomLeft.png"
    },
    {
        header: "Step 7",
        comment: "Step 7 is about directing the user to elements located below, such as a footer or more details in a longer form.",
        image: "Images/TrainingTooltips/Down.png"
    },
    {
        header: "Step 8",
        comment: "Step 8 targets the bottom-right corner, a spot often reserved for actions like submitting a form or accessing quick tools.",
        image: "Images/TrainingTooltips/DownRight.png"
    }
];

let currentIndex = 0;

// Startボタンの動作
document.getElementById("startBtn").addEventListener("click", () => {
    document.getElementById("popup").style.display = "flex";
    updateContent(currentIndex);
});

// コンテンツ更新
function updateContent(index) {
    const slide = document.querySelector('.carousel-slide .carousel-body');
    const header = document.querySelector('.carousel-slide .header');
    const comment = document.querySelector('.carousel-slide .comment');
    const image = document.querySelector('.imagebox .image');
    const bubble = document.querySelector('.bubble-box .bubble-text');

    // contentDataに基づいて更新
    header.textContent = contentData[index].header;
    comment.textContent = contentData[index].comment;
    image.src = contentData[index].image;
    bubble.textContent = contentData[index].comment;

    // レイアウト調整
    adjustLayout(contentData[index].header);
}

// Previous, Nextボタンの動作
function changeSlide(direction) {
    updateTextPosition(currentIndex);
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = contentData.length - 1;
    } else if (currentIndex >= contentData.length) {
        currentIndex = 0;
    }
    updateContent(currentIndex);
    addTextClass(currentIndex);
}

function updateTextPosition(currentIndex) {
    const bubbleBox = document.getElementById("bubble-box");
    console.log("hi i am being called");
    if (currentIndex == 0) {
        bubbleBox.classList.remove("step-1");
    }
    if (currentIndex == 1) {
        bubbleBox.classList.remove("step-2");
    }
    if (currentIndex == 2) {
        bubbleBox.classList.remove("step-3");
    }
    if (currentIndex == 3) {
        bubbleBox.classList.remove("step-4");
    }
    if (currentIndex == 4) {
        bubbleBox.classList.remove("step-5");
    }
    if (currentIndex == 5) {
        bubbleBox.classList.remove("step-6");
    }
    if (currentIndex == 6) {
        bubbleBox.classList.remove("step-7");
    }
    if (currentIndex == 7) {
        bubbleBox.classList.remove("step-8");
    }
} 

function addTextClass(currentIndex) {
    const bubbleBox = document.getElementById("bubble-box");
    console.log("hi this one is called too");
    if (currentIndex == 0) {
        bubbleBox.classList.add("step-1");
    }
    if (currentIndex == 1) {
        bubbleBox.classList.add("step-2");
    }
    if (currentIndex == 2) {
        bubbleBox.classList.add("step-3");
    }
    if (currentIndex == 3) {
        bubbleBox.classList.add("step-4");
    }
    if (currentIndex == 4) {
        bubbleBox.classList.add("step-5");
    }
    if (currentIndex == 5) {
        bubbleBox.classList.add("step-6");
    }
    if (currentIndex == 6) {
        bubbleBox.classList.add("step-7");
    }
    if (currentIndex == 7) {
        bubbleBox.classList.add("step-8");
    }
}
// Skipボタンの動作
function skipSlide() {
    document.getElementById("popup").style.display = 'none';
}

// 初期表示設定
window.onload = function () {
    updateContent(currentIndex);
};

// レイアウト調整
function adjustLayout(header) {
    const carousel = document.querySelector('.carousel-slide');
    const bubble = document.querySelector('.bubble-box');
    const imageBox = document.querySelector('.imagebox');

    // 各headerに基づいてレイアウトを変更
    switch (header) {
        case "Step 1":
            carousel.style.left = '-20%';
            carousel.style.top = '10%';
            bubble.style.left = '8%';
            bubble.style.top = '-20%';
            break;
        case "Step 2":
            carousel.style.left = '-20%';
            carousel.style.top = '10%';
            bubble.style.left = '-12%';
            bubble.style.top = '-15%';
            break;
        case "Step 3":
            carousel.style.left = '-20%';
            carousel.style.top = '10%';
            bubble.style.left = '-16%';
            bubble.style.top = '-22%';
            break;
        case "Step 4":
            carousel.style.left = '-20%';
            carousel.style.top = '10%';
            bubble.style.left = '10%';
            bubble.style.top = '-25%';
            break;
        case "Step 5":
            carousel.style.left = '-20%';
            carousel.style.top = '10%';
            bubble.style.left = '-19%';
            bubble.style.top = '-27%';
            break;
        case "Step 6":
            carousel.style.left = '-20%';
            carousel.style.top = '10%';
            bubble.style.left = '10%';
            bubble.style.top = '-30%';
            break;
        case "Step 7":
            carousel.style.left = '-20%';
            carousel.style.top = '10%';
            bubble.style.left = '-13%';
            bubble.style.top = '-30%';
            break;
        case "Step 8":
            carousel.style.left = '-20%';
            carousel.style.top = '10%';
            bubble.style.left = '-18%';
            bubble.style.top = '-28%';
            break;
        default:
            break;
    }
}
