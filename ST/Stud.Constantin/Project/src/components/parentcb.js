
export default class Parentcb{
    constructor(container,url,basket){
        this.items=[];
        this.container=document.querySelector(container);
        this.url=url;
        this.basket=basket;
        this._init();
    }
} 
