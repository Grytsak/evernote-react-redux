export const toggleMenu = (e) => {
    let elements = document.querySelectorAll('.actions_menu');
    elements.forEach(element => {
        console.log('element:', element);
        element.classList.remove('active');
    })

    const menu = e.target.parentElement;
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