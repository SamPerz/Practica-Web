var navbarItems = document.getElementsByClassName("navbar-item");

for (var i = 0; i < navbarItems.length; i++) {
    navbarItems[i].addEventListener('click', function (event) {
        deleteActiveClass();
        this.classList.add('active');
        var sectionToGo = this.getElementsByTagName('a')[0].href.split("#")

        if (sectionToGo.length === 2) {
            event.preventDefault();
            var goTo = sectionToGo[sectionToGo.length -1];
            getElementByIdAndScroll(goTo);
        }
    });
}

function getElementByIdAndScroll(id) {
    var elem;
    if (id === "") {
        elem = document.getElementsByClassName('header')[0];
    } else {
        elem = document.getElementById(id);
    }
    scrollToElement(elem);
}

function scrollToElement (element) {
    var jump = parseInt(element.getBoundingClientRect().top * 0.3)
    document.body.scrollTop += jump; 
    if(!element.lastJump || element.lastJump > Math.abs(jump)) {
        element.lastJump = Math.abs(jump);

        setTimeout(function(){
            scrollToElement(element);
        }, 40);
    } else {
        element.lastJump = null;
    }
}

function deleteActiveClass () {
    for (var i = 0; i < navbarItems.length; i++) {
        navbarItems[i].classList.remove('active');
    }
}

// distancia desde donde estoy hasta la sección
var acumulativeOffset = function (element) {
    var top = 0;
    do{
        top += element.offsetTop || 0;
        element = element.offsetparent;
    }while (element);

    return top;
};

var offsetHyrule = acumulativeOffset(document.getElementById('hyrule')) - 50;
var offsetSabios = acumulativeOffset(document.getElementById('sabios')) - 50;
var offsetCompañía = acumulativeOffset(document.getElementById('compañía')) - 50;

window.addEventListener('scroll', changeMenuStyle);

var previus;

function changeMenuStyle (event) {
    var pageOffset = window.pageYOffset;

    if (pageOffset >= 0 && pageOffset < offsetHyrule) {
        if (!previus || previus !== 1){
            previus = 1;
        } else if (previus === 1){
            return false;
        }

        deleteActiveClass();
        document.querySelector("a[href='#']").parentNode.classList.add("active");
    }



    if (pageOffset >= offsetHyrule && pageOffset < offsetSabios) {
        if (!previus || previus !== 2){
            previus = 2;
        } else if (previus === 2){
            return false;
        }

        deleteActiveClass();
        document.querySelector("a[href$='hyrule']").parentNode.classList.add("active");
    }

    if (pageOffset >= offsetSabios && pageOffset < offsetCompañía) {
        if (!previus || previus !== 3){
            previus = 3;
        } else if (previus === 3){
            return false;
        }

        deleteActiveClass();
        document.querySelector("a[href$='sabios']").parentNode.classList.add("active");
    } else {

    }

}

// Al introducirlo en Index me desliga el menu de arriba con los paneles. y no baja al clikear

//<script src="./js/menu.js"></script>
