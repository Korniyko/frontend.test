const productsConfig = () => {

    return new Promise((resolve) => {
        fetch('./configuration/productsConfig.json')
            .then((response) => response.json())
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                console.error(`Error happend on productsConfig:${error}`)
                resolve([]);
            })
    })
}


const addProduct = (product) => {
    const titleProductElements = document.querySelectorAll('.titleProduct');
    const templateSize = document.getElementById('templateSize');
    const dimensionsContainer = document.getElementById('dimensionsContainer');
    const skuProductValue = document.getElementById('skuProductValue');


    titleProductElements.forEach((el) => {
        el.innerHTML = product.productName;
    })

    product.dimensions.reverse().forEach((el) => {


        const containerSizeNode = document.importNode(templateSize.content, true)

        const containerSizeElement = containerSizeNode.querySelector('.containerSize')
        containerSizeElement.textContent = el.size + '"';
        containerSizeElement.setAttribute('data-value', el.size)


        dimensionsContainer.prepend(containerSizeElement);
    })
    dimensionsContainer.querySelector('.containerSize')?.classList.add('active')


    skuProductValue.innerHTML += product.skuProduct

    const swiperWrappers = document.querySelectorAll('.imagesWrapper .sliderContainer .swiper-wrapper');

    product.images.forEach((el) => {
        swiperWrappers.forEach((swiperWrapper) => {
            const swiperSlideDiv = document.createElement('div');
            swiperSlideDiv.classList.add('swiper-slide');

            const imageElement = document.createElement('img');

            imageElement.setAttribute('src', el);

            swiperSlideDiv.appendChild(imageElement);

            swiperWrapper.appendChild(swiperSlideDiv);
        })





    })

}
const changeSizeConveyor = () => {
    const customButton = document.getElementById('customButton');
    const cardsContainerCustom = document.getElementById('cardsContainerCustom');
    const buttonMinusSizeConveyor = document.getElementById('sizeMinusConveyor');
    const buttonPlusSizeConveyor = document.getElementById('sizePlusConveyor');
    const valueSizeElement = document.getElementById('sizeValueElement');
    const containerSizeElements = document.querySelectorAll('.containerSize');



    containerSizeElements.forEach((el) => {
        el.addEventListener('click', function () {
            containerSizeElements.forEach((el) => {
                el.classList.remove('active')
            })
            containerSizeElements
            el.classList.add('active')

            if (el.classList.contains('customButtonStyle')) {

                cardsContainerCustom.classList.add('show')
            } else {
                cardsContainerCustom.classList.remove('show')
            }
        })


    })

    buttonMinusSizeConveyor.addEventListener('click', function () {
        let numberTypeValue = Number(valueSizeElement.value);
        if (numberTypeValue > 1) {
            numberTypeValue -= 1;
            valueSizeElement.value = numberTypeValue;
        }
    });

    buttonPlusSizeConveyor.addEventListener('click', function () {
        let numberTypeValue = Number(valueSizeElement.value);
        numberTypeValue += 1;
        valueSizeElement.value = numberTypeValue;


    });

}
const changeLengthConveyor = () => {
    const buttonMinusConveyorLength = document.getElementById('buttonMinusConveyorLength');
    const buttonPlusConveyorLength = document.getElementById('buttonPlusConveyorLength');
    const inputValueConveyorLength = document.getElementById('inputValueConveyorLength');

    buttonMinusConveyorLength.addEventListener('click', function () {
        let numberTypeValue = Number(inputValueConveyorLength.value);

        if (numberTypeValue > 1) {
            numberTypeValue -= 1;
            inputValueConveyorLength.value = numberTypeValue;
            return numberTypeValue
        }
    });

    buttonPlusConveyorLength.addEventListener('click', function () {
        let numberTypeValue = Number(inputValueConveyorLength.value);

        numberTypeValue += 1;
        inputValueConveyorLength.value = numberTypeValue;
        return numberTypeValue


    });

}
const sliderInit = () => {
    const swiper = new Swiper('#mainProductsSlider', {
        loop: false,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        slidesPerView: 1,


    });
    const swiperNav = new Swiper('#navProductsSlider', {
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        slidesPerView: "auto",
        breakpoints: {
            768: {
                slidesPerView: 4
            }
        }

    });

}
const cauntProduct = () => {
    const buttonMinusCauntProduct = document.getElementById('buttonMinusCauntProduct');
    const buttonPlusCauntProduct = document.getElementById('buttonPlusCauntProduct');
    const inputElementCauntProduct = document.getElementById('inputElementCauntProduct');


    buttonMinusCauntProduct.addEventListener('click', function () {

        let numberTypeValue = Number(inputElementCauntProduct.value);
        if (numberTypeValue > 1) {
            numberTypeValue -= 1;
            inputElementCauntProduct.value = numberTypeValue;
        }
    });
    buttonPlusCauntProduct.addEventListener('click', function () {
        let numberTypeValue = Number(inputElementCauntProduct.value);
        numberTypeValue += 1;
        inputElementCauntProduct.value = numberTypeValue;
    });

}
const additionsProduct = () => {
    const addAdditionsProduct = document.querySelectorAll('.descriptionProducts');



    addAdditionsProduct.forEach((product) => {


        product.addEventListener('click', function () {

            product.classList.toggle('show');
        });
    });



}

const request = () => {

    const rEquestButton = document.getElementById('rEquestButton');
    rEquestButton.addEventListener('click', function () {
        let size;
        let length;
        const additionsProduct = [];
        let price;
        let quantity;
        

        const sizeWithconveqer = document.querySelector('#dimensionsContainer .containerSize.active')

        if (sizeWithconveqer.getAttribute("id") === 'customButton') {
            const sizeValueElement = document.querySelector('#cardsContainerCustom input#sizeValueElement')

            size = sizeValueElement?.value

        } else {
            size = sizeWithconveqer?.getAttribute('data-value')
        }

        const inputValueConveyorLength = document.querySelector('.containerWidthConveyor input#inputValueConveyorLength')
        length = inputValueConveyorLength?.value

        const addAdditionsProduct = document.querySelectorAll('.descriptionProducts.show');

        addAdditionsProduct.forEach((item) => {
            additionsProduct.push(item.getAttribute('data-value'))
        })
        const basketCardRowPriceContainer = document.querySelector('.basketCardRowPrice');

         price = basketCardRowPriceContainer.querySelector('.price')?.innerHTML
         quantity = basketCardRowPriceContainer.querySelector('input#inputElementCauntProduct')?.value


         const titleProduct = document.querySelector('#mainProductTittle')?.innerHTML
         const skuProduct = document.querySelector('#skuProductValue')?.innerHTML

        alert(JSON.stringify(
            {
                size,
                length,
                additionsProduct,
                price,
                quantity,
                titleProduct,
                skuProduct

            }))



    })

}




window.addEventListener('DOMContentLoaded', async (event) => {
    const products = await productsConfig();
    addProduct(products[0]);
    changeSizeConveyor();
    changeLengthConveyor();
    additionsProduct()
    sliderInit();
    cauntProduct();


    request()


})












