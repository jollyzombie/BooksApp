{
  ('use strict');

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.book-list',
    },
  };

  const templates = {
    //bookList: Handlebars.compile(document.querySelector(select.templateOf.bookList).innerHTML),
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  const renderInBooks = function () {
    for (let book in dataSource.books) {
      const data = {
        name: dataSource.books[book].name,
        price: dataSource.books[book].price,
        rating: dataSource.books[book].rating,
        image: dataSource.books[book].image,
      };

      const generatedHTML = templates.bookTemplate(data);

      book = utils.createDOMFromHTML(generatedHTML);

      const bookContainer = document.querySelector(select.containerOf.bookList);
      bookContainer.appendChild(book);
    }
  };
  renderInBooks();
  console.log('renderInBooks: ', renderInBooks);
}
