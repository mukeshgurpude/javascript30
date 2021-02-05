const items = document.querySelectorAll('header li');
const overlay = document.querySelector('#overlap');
const header = document.querySelector('.header');


function show(){
    const dropdown = this.querySelector('.dropdown');

    dropdown.classList.add('active');
    setTimeout(_=>{
        dropdown.classList.value.includes('active') && dropdown.classList.add('visible')
    }, 350)
    const geometry = dropdown.getBoundingClientRect();

    overlay.style.visibility = 'visible';
    overlay.style.left = `${geometry.left}px`;
    overlay.style.top = `${geometry.top}px`;
    overlay.style.left = `${geometry.left}px`;
    overlay.style.left = `${geometry.left}px`;
    overlay.style.width = `${geometry.width}px`
    overlay.style.height = `${geometry.height}px`

}

function remove(){
    const dropdown = this.querySelector('.dropdown');
    dropdown.classList.remove('visible', 'active');
    overlay.style.visibility = 'hidden';
}


items.forEach(
    item=>{
        item.addEventListener('mouseenter', show);
        item.addEventListener('mouseleave', remove)
    }
)
