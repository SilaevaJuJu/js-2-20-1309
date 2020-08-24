export class Basket {
  constructor() {
    this.items = [];
    this.container = document.querySelector('#basket');
    this.containerItems = document.querySelector('#basket-items');
    this.shown = false;
    this.url =
      'https://raw.githubusercontent.com/kellolo/static/master/JSON/basket.json';

    this._get(this.url)
      .then(basket => {
        this.items = basket.content;
      })
      .finally(() => {
        this._render();
        this._handleActions();
      });
  }

  _get(url) {
    return fetch(url).then(d => d.json());
  }

  _render() {
    let htmlStr = '';
    this.items.forEach(item => {
      htmlStr += `
            <div class="d-flex headerCartWrapIn mb-1 p-2">
                    <img class="mr-2" src="${item.productImg}" alt="" width="85" height="100>
                    <div>
                        <div>${item.productName}</div>
                        <span>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                        </span>
                        <div class="headerCartWrapPrice mx-2">${item.amount}
                            <span>x</span> $${item.productPrice}
                        </div>

                <button
                    class="fas fa-times-circle mx-2"
                    data-id="${item.productId}"
                    name="remove"
                ></button>
            </div>
            `;
    });
    this.containerItems.innerHTML = htmlStr;
  }

  _handleActions() {
    document.querySelector('#basket-toggler').addEventListener('click', () => {
      this.container.classList.toggle('invisible');
      this.shown = !this.shown;
    });

    this.container.addEventListener('click', ev => {
      if (ev.target.name == 'remove') {
        this._remove(ev.target.dataset.id);
      }
    });
  }

  add(item) {
    let find = this.items.find(el => el.productId == item.productId);
    if (find) {
      find.amount++;
    } else {
      this.items.push(item);
    }
    this._render();
  }

  _remove(id) {
    let find = this.items.find(el => el.productId == id);
    if (find.amount > 1) {
      find.amount--;
    } else {
      this.items.splice(this.items.indexOf(find), 1);
    }
    this._render();
  }
}
