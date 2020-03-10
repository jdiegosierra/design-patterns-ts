class Book {
    private title: string;
    private author: string;
    private readonly page: Page;

    constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
        this.page = new Page()
    }

    getCurrentPage(): Page {
        return this.page;
    }
}

class Page {
    readonly data: string;

    constructor() {
        this.data = 'Page 0'
    }
}

class PagePrinter  {
    static print(page: Page) {
        console.log(page.data)
    }
}

(function main(){
    let book = new Book('Hola Mundo', 'Juan Diego Sierra Fernández');
    PagePrinter.print(book.getCurrentPage());
})();
