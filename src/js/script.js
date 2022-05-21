{
  ('use strict');

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    listOf: {
      booksList: '.books-list',
      image: '.book__image',
      imageId: '#data-id',
    },
    formOf: {
      filters: '.filters',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  const favoriteBooks = [];
  const filters = [];

  const renderInBooks = function () {
    const thisBook = this;
    thisBook.data = dataSource.books;

    for (let book of thisBook.data) {

      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;

      const generatedHTML = templates.bookTemplate(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      const bookList = document.querySelector(select.listOf.booksList);
      bookList.appendChild(element);
    }
  };

  const initActions = function () {
    const thisBook = this;

    thisBook.container = document.querySelector(select.listOf.booksList);
    thisBook.filter = document.querySelector(select.formOf.filters);

    thisBook.container.addEventListener('dblclick', function (event) {
      event.preventDefault();

      const cover = event.target.offsetParent;

      if (cover.classList.contains('book__image')) {
        //select.listOf.image?
        cover.classList.toggle('favorite');

        const bookCoverId = cover.getAttribute(select.listOf.imageId); // '#data-id',

        if (favoriteBooks.includes(bookCoverId)) {
          const list = favoriteBooks;
          const listId = list.indexOf(bookCoverId);
          list.splice(listId, 1);
        } else {
          favoriteBooks.push(bookCoverId);
        }
      }
    });

    thisBook.filter.addEventListener('click', function (event) {
      const filterInput = event.target;

      if (filterInput.tagName == 'INPUT' && filterInput.type == 'checkbox' && filterInput.name == 'filter') {
        if (filterInput.checked == true) {
          filters.push(filterInput.value);
        } else if (filters.includes(filterInput.value)) {
          const indexOf = filters.indexOf(filterInput.value);
          filters.splice(indexOf, 1);
        }
      }
      filterBooks();
    });
  };

  const filterBooks = function () {
    for (let book of dataSource.books) {
      const bookId = [];
      let shouldBeHidden = false;

      for (let filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          bookId.push(book.id);
          break;
        }
      }

      const bookElem = document.querySelector('[data-id="' + book.id + '"]');

      if (shouldBeHidden == true && !shouldBeHidden == false) {
        bookElem.classList.add('hidden');
      } else {
        bookElem.classList.remove('hidden');
      }
    }
  };

  const determineRatingBgc = function (rating) {

    if(rating < 6){
      ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if(rating > 6 && rating <= 8){
      ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';

    } else if (rating > 8 && rating <= 9){
      ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';

    } else if(rating > 9){
      ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return ratingBgc;

  };
  renderInBooks();
  determineRatingBgc()
  initActions();
}
