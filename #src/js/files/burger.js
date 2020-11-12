 // * burger
    const burger = document.querySelector('.burger');
    const headerMenu = document.querySelector('.menu-header__lists');
    const wrapper = document.querySelector('body');
    burger.addEventListener("click", () =>{
        headerMenu.classList.toggle("_active");
        burger.classList.toggle("burger_active");
        wrapper.classList.toggle("hidden");
    });