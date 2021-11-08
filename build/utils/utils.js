const grabLast = (item, length) => {
    return item.url.slice(item.url.length - length);
};

const isolateID = (item) => {
    let id;
    id = grabLast(item, 3);
    let newId = id.slice(0, -1);
    if (newId[0] === '/') {
        return (newId = newId.slice(1));
    }
    return newId;
};

const renderDOM = (arr, container) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    arr.forEach((arr_item) => {
        container.innerHTML += `
            <div class="card">
                <div class="card-profile">
                    <h1 class="card-title">${arr_item.name}</h1>
                    <div class="card-pfp">
                        <img src="https://starwars-visualguide.com/assets/img/characters/${isolateID(
                            arr_item
                        )}.jpg">
                    </div>
                </div>
            </div>
        `;
    });
};

const addListeners = (listenOn, typeOfListener, cb) => {
    return listenOn.addEventListener(typeOfListener, cb);
};

const sortStringArr = (arr) => {
    return arr.sort((a, b) => {
        if (a > b) {
            return -1;
        }
        if (b > a) {
            return 1;
        }
        return 0;
    });
};

export { grabLast, isolateID, renderDOM, addListeners, sortStringArr };
