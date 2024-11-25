var bookMarkInput = document.getElementById("bookMarkName");
var urlInput = document.getElementById("url");

/* To Check local storage OR  Create Array To collect All element */
var bookList;
if (localStorage.getItem("books") == null) {
  bookList = [];
} else {
  bookList = JSON.parse(localStorage.getItem("books"));
  display();
}

/* ADD BOOK  */

function addBook() {
  if (
    bookMarkInput.classList.contains("is-valid") &&
    urlInput.classList.contains("is-valid")
  ) {
    var book = {
      siteName: bookMarkInput.value,
      Link: urlInput.value,
    };
    if (bookList.length == 0) {
      bookList.push(book);
      localStorage.setItem("books", JSON.stringify(bookList));
      console.log(bookList);
      console.log(bookList.length);
    } else {
      for (i = 0; i < bookList.length; i++) {
        if (bookList[i].siteName.includes(book.siteName) == true) {
          alert("This Name  Is Already Here");
          bookList.splice(i, 1);
          localStorage.removeItem("books", JSON.stringify(bookList));
        }
      }
      console.log(bookList);
      bookList.push(book);
      localStorage.setItem("books", JSON.stringify(bookList));
    }

    // clear();
    display();
  } else {
    alert("DataNotValid");
  }
}
// To Clear All DATA IN input After Add

function clear() {
  (bookMarkInput.value = null), (urlInput.value = null);
}
// To display All Element
var index;
function display() {
  cartona = "";
  for (var i = 0; i < bookList.length; i++) {
    index = i;
    cartona += ` <tr>
    <td>${i + 1}</td>
    <td>${bookList[i].siteName}</td>
    <td>
      <button onclick = checkLink() class="btn btn-success fs-4 p-0">
        <i class="fa-solid fa-eye"><a href="${bookList[i].Link}"></a></i> Visit
      </button>
    </td>
    <td>
      <button  onclick =deletebook(${i}) class="btn btn-danger fs-4 p-0">
        <i class="fa-solid fa-trash"></i> Delete
      </button>
    </td>
    
  </tr>`;
  }

  document.getElementById("DataRow").innerHTML = cartona;
}
//Check Link  ==> IF user Write Any Link
function checkLink() {
  var testlink = bookList[index].Link;
  if (
    testlink.includes("http") ||
    (testlink.includes("https") &&
      testlink.includes("://") &&
      testlink.includes("www.") &&
      testlink.includes(".com"))
  ) {
    window.open(testlink, "_blank");
  } else {
    alert("SAD ERROR LINK");
  }
}

// To DELETE AN ELEMENT
function deletebook(deletedIndex) {
  // console.log("delete ..... ");
  bookList.splice(deletedIndex, 1);
  display();
  localStorage.setItem("books", JSON.stringify(bookList));
  console.log(bookList);
}

function validateInputs(element) {
  var RegexTE = {
    bookMarkName: /^[a-zA-z0-9]{4,}$/,
    url: /^(https?:\/\/)?(www\.)[a-zA-z0-9]{3,10}\.com$/i,
  };
  RegexTE[element.id].test(element.value);
  if (RegexTE[element.id].test(element.value) == true) {
    console.log("Match");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    console.log("Not Match");
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
  }
}
