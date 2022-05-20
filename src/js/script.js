{
  ('use strict');

  const select = {
    templateOf: {
      bookTemplate: '#template-book',

    },
    listOf: {
      booksList: '.books-list',
      image: '.book__image',
      imageLinkId: '#data-id',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  const renderInBooks = function () {

    for (const book of dataSource.books) {

      const generatedHTML = templates.bookTemplate(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      const bookList = document.querySelector(select.listOf.booksList);
      bookList.appendChild(element);
    }
  };

  
  const initAction = function() {
    const favoriteBooks = [];

    const bookCovers = document.querySelectorAll(select.listOf.image);

    for(const cover of bookCovers) {
      cover.addEventListener('dblclick', function(event){
        event.preventDefault();

        cover.classList.toggle('favorite');
        const coverId = cover.getAttribute(select.listOf.imageLinkId);
        favoriteBooks.push(coverId);
      });
    }
  };

  renderInBooks();
  initAction();
}
