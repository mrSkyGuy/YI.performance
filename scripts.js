function bind(nodes, event, handler) {
    nodes.forEach(node => {
        node.addEventListener(event, handler);
    });
}

function makeTabs(node) {
    let selected = node.querySelector('.section__tab_active').dataset.id;
    const tabs = node.querySelectorAll('.section__tab');
    const list = Array.from(tabs).map(node => node.dataset.id);
    const select = node.querySelector('.section__select');

    function selectTab(newId) {
        const newTab = node.querySelector(`.section__tab[data-id=${newId}]`);
        const newPanel = node.querySelector(`.section__panel[data-id=${newId}]`);
        const oldTab = node.querySelector('.section__tab_active');
        const oldPanel = node.querySelector('.section__panel:not(.section__panel_hidden)');
    
        selected = newId;
    
        oldTab.classList.remove('section__tab_active');
        oldTab.setAttribute('aria-selected', 'false');
        oldTab.removeAttribute('tabindex');

        newTab.classList.add('section__tab_active');
        newTab.setAttribute('aria-selected', 'true');
        newTab.setAttribute('tabindex', '0');
        newTab.focus({preventScroll: true});
    
        oldPanel.classList.add('section__panel_hidden');
        oldPanel.setAttribute('aria-hidden', 'true');
        
        newPanel.classList.remove('section__panel_hidden');
        newPanel.setAttribute('aria-hidden', 'false');
    
        select.value = newId;
    }
    

    select.addEventListener('input', () => {
        selectTab(select.value);
    });

    bind(tabs, 'click', event => {
        selectTab(event.target.dataset.id);
    });

    bind(tabs, 'keydown', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        if (![37, 39, 36, 35].includes(event.which)) return
        let index = list.indexOf(selected);

        if (event.which === 37) --index;
        else if (event.which === 39) ++index;
        else if (event.which === 36) index = 0;
        else if (event.which === 35) index = list.length - 1;
        else return;

        if (index >= list.length) index = 0;
        else if (index < 0) index = list.length - 1;

        selectTab(list[index]);
        event.preventDefault();
    });
}

function makeMenu(node) {
    const links = document.querySelector('.header__links');

    node.addEventListener('click', () => {
        const expanded = links.classList.contains("header__links_opened");
        node.setAttribute('aria-expanded', expanded);
        // node.querySelector('.header__menu-text').textContent = expanded ? 'Закрыть меню' : 'Открыть меню';
        links.classList.toggle('header__links_opened');
        // links.classList.add('header__links-toggled');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.main__devices').forEach(makeTabs);
    document.querySelectorAll('.header__menu').forEach(makeMenu);
});
