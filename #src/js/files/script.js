
document.addEventListener('DOMContentLoaded', () => {
    
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



    
    let sliderCatalog = document.querySelectorAll(".catalog__block");

    function mobileSlider() {
        sliderCatalog.forEach(element => {
          if (window.innerWidth <= 992 && element.querySelector('.catalog__items').dataset.mobile == "false") {
            new Swiper(element.querySelector('.catalog__items'), {
            slidesPerView: 1,
            pagination: {
                el: element.querySelector('.catalog__info'),
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
            element.querySelector('.catalog__items').dataset.mobile = "true";
        }
        if (window.innerWidth > 992) {
            element.querySelector('.catalog__items').dataset.mobile = "false";
            // element.querySelector('.catalog__items').destroy();
        }
      });  
    
    }
    mobileSlider();
    window.addEventListener("resize", mobileSlider);


    const mobileTabs = new OnResize({
        size: 767,
        code: () => {
            let tabParent = document.querySelector('.subscription__body');
            let tabsSubscription = document.querySelectorAll('.subscription__item'),
            tabsContentSubscription = document.querySelectorAll('.subscription__block');

            function hideTabsContentSubscription(){
            tabsContentSubscription.forEach(item => {
                item.classList.remove('_active');
            });

            tabsSubscription.forEach(item => {
                item.classList.remove('_active');
            });
            };

            let showTabsContentSubscription = function (i = 0){
                tabsContentSubscription[i].classList.add('_active');
                tabsSubscription[i].classList.add('_active');
            }

            hideTabsContentSubscription();
            showTabsContentSubscription(0);

            tabParent.addEventListener('click', (event) => {
            const targetElement = event.target;
            
            if( targetElement && targetElement.classList.contains('subscription__item') || targetElement && targetElement.closest('.subscription__item')){
                hideTabsContentSubscription();
                tabsSubscription.forEach((item, i)=>{
                    if(targetElement.closest('.subscription__item') == item){
                        showTabsContentSubscription(i);
                    }
                    });
            }
            });
        
        },
    });
    
});