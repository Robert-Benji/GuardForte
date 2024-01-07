const navWrapper = document.getElementById('navWrapper');
const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', () => {
    if (!navWrapper.classList.contains('nav-show')) {
        navWrapper.classList.add('nav-show');
        hamburger.classList.add('rotate');
    } else {
        navWrapper.classList.remove('nav-show');
        hamburger.classList.remove('rotate');
    }
})




const headerLinks = document.querySelectorAll('#headerLink');

headerLinks.forEach(headerLink => {
    headerLink.addEventListener('click', () => {
        navWrapper.classList.remove('nav-show');
        hamburger.classList.remove('rotate');

        headerLinks.forEach(link => {
            if (link !== headerLink && link.classList.contains('currentlyActive')) {
                link.classList.remove('currentlyActive');
            }
        });

        headerLink.classList.toggle('currentlyActive');
    });
});









// SLIDERS

const swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 32,
    breakpoints: {
        580: {
            slidesPerView: 3,
            spaceBetween: 32
        },
        
        768: {
            slidesPerView: 3,
            spaceBetween: 16
        },

        1024: {
            slidesPerView: 5,
            spaceBetween: 64
        }
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});








// TESTIMONIAL SLIDER

const anotherSwiper = new Swiper(".testimonialSwiper", {
    slidesPerView: 1,
    spaceBetween: 32,
    breakpoints: {
        580: {
            slidesPerView: 1,
            spaceBetween: 32
        },
        
        768: {
            slidesPerView: 1,
            spaceBetween: 32
        },

        1024: {
            slidesPerView: 2,
            spaceBetween: 32
        },

        1320: {
            slidesPerView: 3,
            spaceBetween: 20
        },
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});





// FAQ SECTION DROPDOWN

const faqBoxAccordionItemHeader = document.querySelectorAll('.faq__box-accordion-item-header');

faqBoxAccordionItemHeader.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener('click', e => {
        const currentlyActiveAccordionItemHeader = document.querySelector('.faq__box-accordion-item-header.active'); 
        if (currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeader) {
            currentlyActiveAccordionItemHeader.classList.toggle('active');
            currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0; 
        }

        accordionItemHeader.classList.toggle('active');

        const accordionItemBody = accordionItemHeader.nextElementSibling;
        if (accordionItemHeader.classList.contains('active')) {
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
        } else {
            accordionItemBody.style.maxHeight = 0;
        }
    })
})




// BACK TO TOP 

const backUpBtn = document.querySelector('.backToTop');

backUpBtn.addEventListener('click', () => {
    // console.log('clicked twice')
    window.scrollTo({
        top: -1000,
        behavior: 'smooth'
    });
})







const questionIcon1 = document.getElementById('questionIcon1');
const questionIcon2 = document.getElementById('questionIcon2');
const questionIcon3 = document.getElementById('questionIcon3');
const listDesc1 = document.querySelector('.list__desc1');
const listDesc2 = document.querySelector('.list__desc2');
const listDesc3 = document.querySelector('.list__desc3');

questionIcon1.addEventListener('click', () => {
    listDesc1.classList.toggle('show');
})

questionIcon2.addEventListener('click', () => {
    listDesc2.classList.toggle('show');
})

questionIcon3.addEventListener('click', () => {
    listDesc3.classList.toggle('show');
})






// SOFTWARE SWIPER SLIDER

let currentIndex = 0;

function showSlide(index) {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const pagination = document.getElementById('pagination');
    const dots = document.querySelectorAll('.dot');

    if (index < 0) {
        currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    slider.style.transform = `translateX(${-currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
        if (i === currentIndex) {
            dot.classList.add('showing');
        } else {
            dot.classList.remove('showing');
        }
    });
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function createPaginationDots() {
    const slides = document.querySelectorAll('.slide');
    const pagination = document.getElementById('pagination');

    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => showSlide(index));
        pagination.appendChild(dot);
    });

    showSlide(0);
}

createPaginationDots();









// UPDATING DELIVERY LOCATION

const updateLocationHeader = (city, state) => {
    const locationHeaders = document.querySelectorAll("#locationHeader");
            
    locationHeaders.forEach(header => {
        header.textContent = `${city}, ${state}`;
    });
}


if ("geolocation" in navigator) {

    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.classList.add('nowActive');

    navigator.geolocation.getCurrentPosition(
        (position) => {

            const { latitude, longitude } = position.coords;


            const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
                    

            fetch(geocodingUrl)
                .then(response => response.json())
                .then(data => {
                    const city = data.address.city || data.address.town;
                    const state = data.address.state || data.address.state_district;


                    updateLocationHeader(city, state);

                    loadingSpinner.classList.remove('nowActive');
                })
                .catch(error => {
                    console.error('Error fetching location information:', error);

                    locationHeader.innerText = 'location unknown';
                    loadingSpinner.classList.remove('nowActive');
                });
        },
        (error) => {
            console.error('Error getting location:', error.message);

            locationHeader.innerText = 'location unknown';
            loadingSpinner.classList.remove('nowActive');
        }
    );
} else {
    console.error('Geolocation is not supported by this browser.');
}






// SOFTWARE MODAL

const openSoftwareModalBtn = document.getElementById('openSoftwareModal');
const closeSoftwareModalBtn = document.getElementById('closeSoftwareModal');
const softwareModal = document.getElementById('softwareModal');
const softwareModalOverlay = document.getElementById('softwareModalOverlay');
const body = document.querySelector('body');

const openSoftwareModal = () => {
    softwareModalOverlay.style.display = 'block';
    softwareModal.style.display = 'block';
    setTimeout(() => {
        softwareModalOverlay.style.opacity = '1';
        softwareModal.style.opacity = '1';
    }, 30);
}

const closeSoftwareModal = () => {
    softwareModalOverlay.style.opacity = '0';
    softwareModal.style.opacity = '0';
    setTimeout(() => {
        softwareModalOverlay.style.display = 'none';
        softwareModal.style.display = 'none';
    }, 300);
}

openSoftwareModalBtn.addEventListener('click', openSoftwareModal);
closeSoftwareModalBtn.addEventListener('click', closeSoftwareModal);


// window.onclick = function(e) {
//     if (e.target == softwareModal) {
//         softwareModal.style.display = "none";
//     }
// }








// SOFTWARE MODAL ERROR

const softwareCheckoutErrorModalOpenBtn = document.getElementById('softwareCheckoutErrorModalOpenBtn');
const softwareCheckoutErrorModalCloseBtn = document.getElementById('softwareCheckoutErrorModalCloseBtn');
const checkoutErrorModalOverlay = document.getElementById('checkoutErrorModalOverlay');
const softwareCheckoutErrorModal = document.getElementById('softwareCheckoutErrorModal');
const softwareCheckoutErrorModalLoader = document.getElementById('softwareCheckoutErrorModalLoader');
const softwareCheckoutModalErrorMessage = document.querySelector('.softwareCheckoutModalErrorMessage');
const softwareCheckoutPaypalErrorModalOpenBtn = document.getElementById('softwareCheckoutPaypalErrorModalOpenBtn');
const softwareCheckoutPaypalErrorModalLoader = document.getElementById('softwareCheckoutPaypalErrorModalLoader');
const checkoutInputs = document.querySelectorAll('input');



const openSoftwareErrorModal = () => {
    softwareCheckoutErrorModalOpenBtn.innerText = 'Processing...';
    softwareCheckoutPaypalErrorModalOpenBtn.innerText = 'Processing...';
    softwareCheckoutErrorModalLoader.classList.add('showLoader');
    softwareCheckoutPaypalErrorModalLoader.classList.add('showLoader');

    setTimeout(() => {
        checkoutErrorModalOverlay.style.display = 'block';
        softwareCheckoutErrorModal.style.display = 'block';
        softwareCheckoutErrorModalLoader.classList.remove('showLoader');
        softwareCheckoutErrorModalOpenBtn.innerText = 'Checkout';
        softwareCheckoutPaypalErrorModalOpenBtn.innerText = 'Log In';
        softwareCheckoutPaypalErrorModalLoader.classList.remove('showLoader');
    }, 5000)

    setTimeout(() => {
        checkoutErrorModalOverlay.style.opacity = '1';
        softwareCheckoutErrorModal.style.opacity = '1';
    }, 100);
}

const closeSoftwareErrorModal = () => {
    checkoutErrorModalOverlay.style.opacity = '0';
    softwareCheckoutErrorModal.style.opacity = '0';
    setTimeout(() => {
        checkoutErrorModalOverlay.style.display = 'none';
        softwareCheckoutErrorModal.style.display = 'none';
    }, 300);
}

softwareCheckoutErrorModalOpenBtn.addEventListener('click', openSoftwareErrorModal);
softwareCheckoutErrorModalCloseBtn.addEventListener('click', closeSoftwareErrorModal);

softwareCheckoutPaypalErrorModalOpenBtn.addEventListener('click', openSoftwareErrorModal);








// FORMAT CREDIT CARD INPUT

const creditCardNumberDisplay = document.getElementById('creditCardNumberDisplay');
const creditCardHolderNameDisplay = document.getElementById('creditCardHolderNameDisplay');
const cardHolderNameInput = document.getElementById('cardHolderNameInput');
const creditCardInput = document.getElementById('creditCardInput');
const creditCardExpDisplay = document.getElementById('creditCardExpDisplay');
const creditCardExpInput = document.getElementById('creditCardExpInput');
const creditCardTypeDisplay = document.getElementById('creditCardTypeDisplay');


creditCardInput.addEventListener('input', e => {
    const creditCardInputValue = e.target.value;
    let cardType = '';

    if (creditCardInputValue) {
        switch (creditCardInputValue.charAt(0)) {
            case '4':
                cardType = 'fa-cc-visa';
                break;
            case '5':
                cardType = 'fa-cc-mastercard';
                break;
            case '2':
            case '7':
                cardType = 'fa-cc-mastercard';
                break;
            case '3':
                if (creditCardInputValue.charAt(1) === '4' || creditCardInputValue.charAt(1) === '7') {
                    cardType = 'fa-cc-amex';
                } else if (creditCardInputValue.charAt(1) === '5') {
                    cardType = 'fa-cc-jcb';
                }
                break;
            default:
                break;
        }
    }

    creditCardTypeDisplay.innerHTML = cardType ? `<i class="fa-brands ${cardType}"></i>` : '';

    const formattedInput = formatCreditCard(creditCardInputValue);
    creditCardNumberDisplay.innerText = formattedInput;
});



function formatCreditCard(inputValue) {
    if (!inputValue.trim()) {
        return '0000 0000 0000 0000';
    }

    const numericValue = inputValue.replace(/\D/g, '');

    const formattedInput = numericValue.replace(/(\d{4})(?=\d)/g, "$1 ");

    return formattedInput;
}




cardHolderNameInput.addEventListener('input', e => {
    let cardHolderNameInputValue = e.target.value;
    creditCardHolderNameDisplay.innerText = cardHolderNameInputValue;

    if (cardHolderNameInputValue === '') {
        creditCardHolderNameDisplay.innerText = 'Cardholder';
    }
})



creditCardExpInput.addEventListener('input', e => {
    let creditCardExpInputValue = e.target.value;

    if (creditCardExpInputValue === '') {
        creditCardExpDisplay.innerText = 'MM / YY';
    }

    const month = e.target.value.slice(0, 2);
    const year = e.target.value.slice(3);
    if (month.length == 1 && month[0] != '0') {
        creditCardExpDisplay.innerText = `0${month}/${year}`;
    } else if (month.length == 2) {
        creditCardExpDisplay.innerText = `${month}/${year}`;
    }
})










// PAYMENT CHECKOUT TAB

const openTab = sectionName => {
    let i;
    let tabContent = document.getElementsByClassName('tab-content');
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    let tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove('nowActive');
    }

    document.getElementById(sectionName).style.display = 'block';
    document.querySelector('button[onclick="openTab(\'' + sectionName + '\')"]').classList.add('nowActive');
}







// LOGIN / REGISTER TAB

function openSection(event, sectionName) {
    let i, tabcontent, tablinks;
        
    tabcontent = document.getElementsByClassName('user-auth-tab-content');
    for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].classList.remove('showingNow');
    }
        
    tablinks = document.getElementsByClassName('user-auth-tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" activeNow", "");
    }
        
    document.getElementById(sectionName).classList.add('showingNow');
    event.currentTarget.className += " activeNow";
}








// SHOW / HIDE PASSWORD

function signinshowPassword() {
    const userAuthPasswdShowIcon = document.getElementById('userAuthPasswdShowIcon');
    const passwordInputField = document.getElementById('passwordInputField');

    if (passwordInputField.type === 'password') {
        passwordInputField.type = 'text';
        userAuthPasswdShowIcon.innerText = 'Hide';
    } else {
        passwordInputField.type = 'password';
        userAuthPasswdShowIcon.innerText = 'Show';
    }
}

function registerShowPassword() {
    const registerPasswordShowIcon = document.getElementById('registerPasswordShowIcon');
    const registerPasswordInput = document.getElementById('registerPasswordInput');

    if (registerPasswordInput.type === 'password') {
        registerPasswordInput.type = 'text';
        registerPasswordShowIcon.innerText = 'Hide';
    } else {
        registerPasswordInput.type = 'password';
        registerPasswordShowIcon.innerText = 'Show';
    }
}

function registerShowConfirmPassword() {
    const registerShowConfirmPasswordIcon = document.getElementById('registerShowConfirmPasswordIcon');
    const registerShowConfirmPasswordInput = document.getElementById('registerShowConfirmPasswordInput');

    if (registerShowConfirmPasswordInput.type === 'password') {
        registerShowConfirmPasswordInput.type = 'text';
        registerShowConfirmPasswordIcon.innerText = 'Hide';
    } else {
        registerShowConfirmPasswordInput.type = 'password';
        registerShowConfirmPasswordIcon.innerText = 'Show';
    }
}



function checkPasswordMatch() {
    const registerShowConfirmPasswordInputErrorMsg = document.querySelector('.registerShowConfirmPasswordInputErrorMsg');
    const passwordInput = document.getElementById('registerPasswordInput');
    const confirmPasswordInput = document.getElementById('registerShowConfirmPasswordInput');
    const passwordMatch = passwordInput.value === confirmPasswordInput.value;

    if (!passwordMatch) {
        registerShowConfirmPasswordInputErrorMsg.classList.add('incorrectPassword');
    } else {
        registerShowConfirmPasswordInputErrorMsg.classList.remove('incorrectPassword');
    }
}










// SIGN IN ERROR MESSAGE / REGISTRATION MESSAGE

function signIn() {
    const signinErrorMsg = document.getElementById('sign-in__error-msg');

    signinErrorMsg.classList.add('loginErrorMsg');

    setTimeout(() => {
        signinErrorMsg.classList.remove('loginErrorMsg');
    }, 3500);
}





function registrationSuccessMsgModalClose() {
    const registrationMessageOverlay = document.querySelector('.registrationMessageOverlay');
    const registrationMessageModalContainer = document.querySelector('.registrationMessageModalContainer');

    registrationMessageOverlay.style.opacity = '0';
    registrationMessageModalContainer.style.opacity = '0';
    setTimeout(() => {
        registrationMessageOverlay.style.display = 'none';
        registrationMessageModalContainer.style.display = 'none';
    }, 300);
}




function registerSuccessMsgModalOpen() {
    const userAuthSection2Input = document.querySelector('.user-auth-section2-input');
    const userAuthSection2Inputs = document.querySelectorAll('.user-auth-section2-input');
    const registrationMessageOverlay = document.querySelector('.registrationMessageOverlay');
    const registrationBtnErrorMsg = document.querySelector('.registrationBtnErrorMsg');
    const registrationMessageModalContainer = document.querySelector('.registrationMessageModalContainer');

    if (userAuthSection2Input.value === '') {
        registrationBtnErrorMsg.classList.add('registerErrorMsg');
    } else {
        registrationBtnErrorMsg.classList.remove('registerErrorMsg');

        registrationMessageOverlay.style.display = 'block';
        registrationMessageModalContainer.style.display = 'block';

        setTimeout(() => {
            registrationMessageOverlay.style.opacity = '1';
            registrationMessageModalContainer.style.opacity = '1';
        }, 30);
    }

    userAuthSection2Inputs.forEach(userAuthSection2Input => {
        userAuthSection2Input.value = '';
    })
}






// SCAN DEVICE

function startScan() {
    const scanBtn = document.getElementById('startScanBtn');
    const scanDeviceLoader = document.getElementById('scanDeviceLoader');

    scanBtn.innerText = 'Scanning Device...';
    scanDeviceLoader.classList.add('showScanDeviceLoader');

    setTimeout(() => {
        scanBtn.innerText = 'Searching Vulnerabilities...';
        scanDeviceLoader.classList.add('showScanDeviceLoader');
    }, 10000);

    setTimeout(() => {
        scanBtn.innerText = 'Scan Finished';
        scanDeviceLoader.classList.remove('showScanDeviceLoader');
    }, 20000);

    setTimeout(() => {
        resetScanButtonText(scanBtn);
        openModal();
    }, 22000);
}


function resetScanButtonText(scanBtn) {
    scanBtn.innerText = 'Start Free Scan';
}




function openModal() {
    const scanDeviceModal = document.getElementById('scanModal');
    const scanDeviceMessageOverlay = document.getElementById('scanDeviceMessageOverlay');
    const body = document.querySelector('body');

    scanDeviceMessageOverlay.style.display = 'block';
    scanDeviceModal.style.display = 'block';
    body.style.overflow = 'hidden';

    setTimeout(() => {
        scanDeviceMessageOverlay.style.opacity = '1';
        scanDeviceModal.style.opacity = '1';
    }, 100);
}



function closeModal() {
    const scanDeviceModal = document.getElementById('scanModal');
    const scanDeviceMessageOverlay = document.getElementById('scanDeviceMessageOverlay');

    scanDeviceMessageOverlay.style.opacity = '0';
    scanDeviceModal.style.opacity = '0';
    body.style.overflow = 'auto';

    setTimeout(() => {
        scanDeviceMessageOverlay.style.display = 'none';
        scanDeviceModal.style.display = 'none';
    }, 300);
}







// COOKIE NOTIFICATION

// document.addEventListener("DOMContentLoaded", function () {
//     const cookieNotification = document.getElementById('cookie-notification');
//     const acceptBtn = document.getElementById('accept-btn');


//     const acceptedCookies = localStorage.getItem('acceptedCookies');


//     if (!acceptedCookies) {
//         cookieNotification.style.display = 'block';
//     }


//         acceptBtn.addEventListener("click", function () {

//         localStorage.setItem("acceptedCookies", "true");


//         cookieNotification.style.display = 'none';
//     });
// });