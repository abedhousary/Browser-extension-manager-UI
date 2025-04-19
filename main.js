function addExtension(Title, Descrption, Logosrc, isActive) {

    // Create the main extension div
    const extension = document.createElement('div');
    extension.className = 'extension';

    // Create the top container
    const container = document.createElement('div');
    container.className = 'container';

    // Create the extension logo section
    const extensionLogo = document.createElement('div');
    extensionLogo.className = 'extension-logo';

    const logoImg = document.createElement('img');
    logoImg.src = Logosrc;
    logoImg.alt = '';

    extensionLogo.appendChild(logoImg);

    // Create the content section
    const extensionContent = document.createElement('div');
    extensionContent.className = 'extension-content';

    const extensionTitle = document.createElement('div');
    extensionTitle.className = 'extension-title';
    extensionTitle.textContent = Title;

    const extensionDescription = document.createElement('div');
    extensionDescription.className = 'extension-description';
    extensionDescription.textContent = Descrption;

    extensionContent.appendChild(extensionTitle);
    extensionContent.appendChild(extensionDescription);

    // Append logo and content to container
    container.appendChild(extensionLogo);
    container.appendChild(extensionContent);

    // Create the bottom container
    const containerBottom = document.createElement('div');
    containerBottom.className = 'container-bottom';

    const removeBtn = document.createElement('div');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';

    const toggle = document.createElement('div');
    toggle.className = 'toggle';

    const toggler = document.createElement('div');
    toggler.className = 'toggler';
    if (isActive == 0) {
        toggler.classList.add("offToggler")
        toggle.style.backgroundColor = "var(--Neutral-600)"
    }

    toggle.appendChild(toggler);
    containerBottom.appendChild(removeBtn);
    containerBottom.appendChild(toggle);

    // Append top and bottom containers to the main extension div
    extension.appendChild(container);
    extension.appendChild(containerBottom);

    // Append the extension to the parent container
    const parent = document.querySelector('.extension-container');
    if (parent) {
        parent.appendChild(extension);
    } else {
        console.error('Parent container ".extension-container" not found.');
    }

}

const pills = document.querySelectorAll(".pill");
let toShow = 20

pills.forEach((e) => {
    e.addEventListener("click", function () {
        pills.forEach((i) => { i.classList.remove("Active-pill") });
        e.classList.add("Active-pill");
        toShow = e.dataset.value;
        const TheMainCon = document.querySelector('.extension-container');
        if (!TheMainCon) {
            console.error('Parent container ".extension-container" not found.');
            return;
        }

        // Remove all existing children
        while (TheMainCon.firstChild) {
            TheMainCon.removeChild(TheMainCon.firstChild);
        }
        fetch('./data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load JSON');
                }
                return response.json(); // parses JSON response into JS object
            })
            .then(data => {
                data.forEach((e) => {
                    if (toShow != 20) {
                        if (e.isActive = toShow) {
                            addExtension(e.name, e.description, e.logo, e.isActive)
                        }
                    } else {
                        addExtension(e.name, e.description, e.logo, e.isActive)
                    }
                })
            })
            .catch(error => {
                console.error('Error:', error);
            });

    })
})


let themeToggler = document.querySelector(".theme-toggler");
let thebody = document.querySelector("body");
let logo = document.querySelector(".logo");
themeToggler.addEventListener("click", function () {
    thebody.classList.toggle("dark-mode");
    if (thebody.classList.contains("dark-mode")) {
        themeToggler.src = "./assets/images/icon-sun.svg"
        logo.src = "./assets/images/logo-Dark.svg"
    } else {
        themeToggler.src = "./assets/images/icon-moon.svg"
        logo.src = "./assets/images/logo.svg"
    }
})



window.onload = () => {
    fetch('./data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load JSON');
            }
            return response.json(); // parses JSON response into JS object
        })
        .then(data => {
            data.forEach((e) => {
                if (toShow != 20) {
                    if (e.isActive = toShow) {
                        addExtension(e.name, e.description, e.logo, e.isActive)
                    }
                } else {
                    addExtension(e.name, e.description, e.logo, e.isActive)
                }
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });

}
