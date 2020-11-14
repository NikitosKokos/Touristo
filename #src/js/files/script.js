
document.addEventListener('DOMContentLoaded', () => {
    // @ @include("swiper-bundle.min.js");
    // @@include("some.js");
    // @@include('burger.js');
    // @ @include("spoller.js",{});
    // @ @include("select.js",{});
    // @ @include("tabs.js",{});
    
    const searchInputWrapper = document.querySelector('.hero__input');
    const searchInput = document.querySelector('.hero__input input');
    let closeButtons = [];
    searchInput.addEventListener('keydown', (e) => {
        if(e.key == 'Enter'){
            const el = document.createElement('div');
            el.className = 'hero__searchElement';
            el.textContent = searchInput.value;
            searchInput.before(el);
            searchInput.value = '';
            closeButtons.push(el);
            closeButtons.forEach(element => {
                element.addEventListener('click', () => {
                    let perent = element.closest('.hero__searchElement');
                    perent.remove();
                });
            });
        }
    });

    const expandedLink = document.querySelector('.expanded-hero__link');
    const expandedBody = document.querySelector('.body-expanded');
    expandedLink.addEventListener('click', () => {
        expandedLink.classList.add('_hide');
        _slideDown(expandedBody);
    });

    const expandedClose = document.querySelector('.body-expanded__close');
    expandedClose.addEventListener('click', () => {
        expandedLink.classList.remove('_hide');
        _slideUp(expandedBody);
    });


    const sliderFilter = document.querySelector('.body-expanded__slider');
    if(sliderFilter){
      noUiSlider.create(sliderFilter, {
        start: [2, 120],
        connect: true,
        tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})],
        range: {
            'min': 2,
            'max': 120
        }
    });
    }

     let tooltips = sliderFilter.querySelectorAll('.noUi-tooltip');
    const handle = sliderFilter.querySelectorAll('.noUi-handle');
    handle.forEach((element, index) => {
        const tooltipsWrapper = document.createElement('div');
        tooltipsWrapper.className = 'body-expanded__tooltips';
        if(index == 1){
            tooltipsWrapper.className = 'body-expanded__tooltips body-expanded__tooltips_l';
        }
        element.append(tooltipsWrapper);
        tooltipsWrapper.insertAdjacentElement('beforeend',tooltips[index]);
    });

   
    tooltips.forEach((element, index) => {
        const el = document.createElement('span');
            el.textContent = sliderFilter.dataset.day;
            el.className = 'body-expanded__el';
            element.after(el);
        if(index == 0){
            const el1 = document.createElement('span');
            el1.textContent = sliderFilter.dataset.from;
            el1.className = 'body-expanded__el1';
            element.before(el1);
        }else if(index == 1){
            const el2 = document.createElement('span');
            el2.textContent = sliderFilter.dataset.to;
            el2.className = 'body-expanded__el2';
            element.before(el2);
        }
    }); 


    const peopleTitle = document.querySelector('.people-expanded__title');
    const peopleBody = document.querySelector('.people-expanded__body');
    peopleTitle.addEventListener('click', () => {
        _slideToggle(peopleBody);
    });



    let catalogSwiper;
    let sliderCatalog = document.querySelector(".catalog__items");

    function mobileSlider() {
    if (window.innerWidth <= 992 && sliderCatalog.dataset.mobile == "false") {
        catalogSwiper = new Swiper(".catalog__items", {
        slidesPerView: 1,
        pagination: {
            el: '.catalog__info',
            type: 'fraction'
          },
        breakpoints: {
            320: {
            slidesPerView: 1,
            },
            480: {
            slidesPerView: 2,
            },
            767: {
            slidesPerView: 3,
            }
            
        },
        });
        sliderCatalog.dataset.mobile = "true";
    }
    if (window.innerWidth > 992) {
        sliderCatalog.dataset.mobile = "false";
        // catalogSwiper.destroy();
    }
    }
    mobileSlider();
    window.addEventListener("resize", mobileSlider);


    class Code {
        constructor(options){
            this.size = options.size;
            this.code = options.code;
            this.onMinSize = options.onMinSize;
            this.heightResize = options.heightResize;
        }
    }
    class OnResize extends Code {
        constructor(options){
            super({
                size: options.size,
                code: options.code,
                onMinSize: (options.onMinSize == undefined) ? false: options.onMinSize,
                heightResize: (options.heightResize == undefined) ? false: options.heightResize,
            })
            let isSize = false;
            console.log(this.heightResize);
            const mobileCode = () =>{

                const minHeight = () => {
                        if(this.size < window.innerHeight && isSize === false){
                            this.code();
                            isSize = true;
                        }else if(this.size > window.innerHeight && isSize === true){
                            isSize = false;
                        }
                };
                const minWidth = () => {
                    if(this.size < window.innerWidth && isSize === false){
                        this.code();
                        isSize = true;
                    }else if(this.size > window.innerWidth && isSize === true){
                        isSize = false;
                    }
                };
                const maxHeight = () => {
                    if(this.size > window.innerHeight && isSize === false){
                        this.code();
                        isSize = true;
                    }else if(this.size < window.innerHeight && isSize === true){
                        isSize = false;
                    }
                };
                const maxWidth = () => {
                    if(this.size > window.innerWidth && isSize === false){
                        this.code();
                        isSize = true;
                    }else if(this.size < window.innerWidth && isSize === true){
                        isSize = false;
                    }
                };


                if(this.onMinSize == true){
                    if(this.heightResize == true){
                        minHeight();
                    }else{
                        minWidth();
                    }
                }else{
                    if(this.heightResize == true){
                        maxHeight();
                    }else{
                        maxWidth();
                    }
                }
            }
            mobileCode();
            window.addEventListener("resize", mobileCode);
        }
    }
    
    const codeTabs = () =>{
        console.log(767);
    }
    const mobileTabs = new OnResize({
        size: 767,
        code: codeTabs,
        // onMinSize: true,
        // heightResize: true,
    });
    
});