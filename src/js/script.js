{
  ('use strict');

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  function renderInBooks() {
    for (let book in dataSource.books) {

      const data = {
        name: dataSource.books[book].name,
        price: dataSource.books[book].price,
        rating: dataSource.books[book].rating,
        image: dataSource.books[book].image,
      };

      const generatedHTML = templates.bookTemplate(data);
      book = utils.createDOMFromHTML(generatedHTML);
      
      const bookContainer = document.querySelector(select.containerOf.booksList);
      bookContainer.appendChild(book);
    }
  }
  renderInBooks();
}
