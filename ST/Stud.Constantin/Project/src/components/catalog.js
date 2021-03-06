import CatalogItem from './catalogItem.js';
import Parentcb from './parentcb.js';
export default class Catalog extends Parentcb{
    constructor(container,url,basket){
      super(container,url,basket);
        

    }
    _init() {
        this._get(this.url)
            .then(arr => {
                this.items = arr;
            })
            .finally(() => {
                this._render();
                this._handleActions();
            })
    }
    _get(url) {
        return fetch(url).then(d => d.json());
    }
    _fillCatalog() { //Инкапсуляция (условная для JS)
        this.items = getArrayOfObjects();
    }
    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += new CatalogItem(item).render();
        });
        this.container.innerHTML = htmlStr;
    }
    _handleActions() {
        this.container.addEventListener('click', ev => {
            if (ev.target.name == 'add') {
                let dataset = ev.target.dataset;
                this.basket.add(this._createNewItem(dataset));
            }
        })
    }
    _createNewItem(dataset) {
        return {
            productId: dataset.id,
            productName: dataset.name,
            productImg: dataset.img,
            productPrice: +dataset.price,
            amount: 1
        }
    }
}

