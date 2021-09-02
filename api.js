const result = document.getElementById('result')
const cardContainer = document.getElementById('card-parent')
const errorMsg = document.createElement('div');
const bookDataLoad = () =>{
    const bookNameInput = document.getElementById('book-name')
    if(bookNameInput.value == ''){
      errorMsg.innerHTML = `
      <div class="d-flex justify-content-center">
      <p class="text-center py-1 px-2 mt-2 rounded text-danger bg-light ">Please Search with a valid book name ⚠️</p>
      </div>
      `;
      result.textContent = ''
      cardContainer.textContent = '';
      cardContainer.appendChild(errorMsg);
  }
  else{
      collectData(bookNameInput.value)
      bookNameInput.value = '';
  }
}

const collectData = (bookData) =>{
  const url = `https://openlibrary.org/search.json?q=${bookData}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displyShowBook(data.docs))
}
const displyShowBook = (book)=> {
    var conditionArr = book.filter(find => find.cover_i !== undefined && find.author_name !== undefined && find.publisher !== undefined && find.title !== undefined && find.first_publish_year !== undefined)
   if(conditionArr.length === 0){
          cardContainer.textContent = ''
          result.innerText = 'No Result Found!'
   } else{
         errorMsg.textContent = ''
         result.innerText = `You got ${conditionArr.length} books`
          cardContainer.innerHTML = ''
          conditionArr.forEach(books => {
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
             <div class="card h-100 p-3 shadow-sm">
              <img src="https://covers.openlibrary.org/b/id/${books.cover_i}-M.jpg" class="card-img-top rounded" height="300">
              <div class="card-body">
               <hr class="text-white">
                <h5 class="card-title">${books.title}</h5>
                <p class="card-text">Author Name : ${books.author_name[0]}</p>
                <p class="card-text">Book Publisher : ${books.publisher[0]}</p>
              </div>
              <div class="card-footer">
                <small class="text-secondary">First Publish Year : ${books.first_publish_year}</small>
              </div>
            </div>
    `;
    cardContainer.appendChild(div);
})
   }
}






