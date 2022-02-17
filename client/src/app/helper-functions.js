export const toggleMenu = (e) => {
    const menu = e.target.parentElement;
    if(!menu.querySelector('.actions_menu_elements').firstChild) {
        return
    }

    let elements = document.querySelectorAll('.actions_menu');
    elements.forEach(element => {
        element.classList.remove('active');
    })

    if(menu.classList.contains('actions_menu')) {
        menu.classList.toggle('active');
    } 

    const closeMenuOnOutsideClick = (e) => {
        if(!e.target.parentElement.classList.contains('actions_menu')) {
            menu.classList.remove('active');
            window.removeEventListener('click', closeMenuOnOutsideClick);
        } 
    }

    window.addEventListener('click', closeMenuOnOutsideClick)
}