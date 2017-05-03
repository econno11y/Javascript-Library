



function newBook(title, author, numberOfPages,publishDate){
    this.title=title;
    this.author=author;
    this.numberOfPages= numberOfPages;
    this.publishDates= new Date(publishDate);
}

var library = function() {
}


library.prototype.myBookArray = new Array();


library.prototype.removeBookByTitle = function (title) {
    for (var i = this.myBookArray.length-1; i >=0; i--) {
        if (title == this.myBookArray[i].title) {
            //remove 1 book starting at index i
            this.myBookArray.splice([i],1);
            return true;
        }
    }   //complete the loop before returning false
        return false;
};



library.prototype.removeBookByAuthor = function (authorName) {
    var booksRemoved = 0;
    //same as removeBookByTitle but need to run loop backwards to remove more than one
    for (var i = this.myBookArray.length-1; i>=0; i--) {
        if (authorName == this.myBookArray[i].author) {
            this.myBookArray.splice(i,1);
            booksRemoved++; //add to booksRemoved if an author matches but don't exit loop until all books are checked
        } //keep looking for author matches until you get to the book at index 0 posiiton
    }
    if (booksRemoved > 0) { return true;}
    return false;
};





library.prototype.getBookByTitle = function (title) {
    var booksThatMatch = new Array();
    for (var i = 0; i<this.myBookArray.length; i++) {
        var titlesInLibrary = this.myBookArray[i].title;
        //match is an easy way to check if a string matches any part of another string
        if (titlesInLibrary.toLowerCase().match(title.toLowerCase()) !== null) {
            booksThatMatch.push(this.myBookArray[i]);
        }
    }//2nd leg of if statement has to be outside of loop to get more than one match
    return booksThatMatch;
};

library.prototype.getBooksByAuthor = function (author) {
    var booksWithAuthorsThatMatch = new Array();
    for (var i = 0; i<this.myBookArray.length; i++) {
        var authorInLibrary = this.myBookArray[i].author;
        if (authorInLibrary.toLowerCase().match(author.toLowerCase()) !== null) {
            booksWithAuthorsThatMatch.push(this.myBookArray[i]);
        }
    }//2nd leg of if statement has to be outside of loop to get more than one match
    return booksWithAuthorsThatMatch;
};


library.prototype.getAuthors = function () {
    var filter = {}; //staging object searches for duplicates before passing authors to a new array
    var Authors=[];//new array of authors in library
	  for(var i = 0; i < this.myBookArray.length; i++) {
		    if (!filter[this.myBookArray[i].author]) {//if this does not exist
			       filter[this.myBookArray[i].author] = true; //then add key/value pair of "author xyz" = true to the n object
			       Authors.push(this.myBookArray[i].author); //and push, the author into the Authors array
		    } //do nothing
	  } return Authors; //show authors
};


library.prototype.getRandomAuthorName = function () {
    if (this.myBookArray.length) {
        var randomNumberInArray = Math.floor(Math.random() * (this.myBookArray.length));
        return this.myBookArray[randomNumberInArray].author;
    } return null;
};



  // var d = new Date(99, 5, 24);
  // //document.getElementById("demo").innerHTML = date



library.prototype.init = function(){
  this.$randomBook = $("button.randomB");
  this.$randomAuthor = $("button.randomA");
  this.$submitBtn = $("button.submit");
  this.$addForm = $("button.add-forms");
  this.$formWrapper = $("div.forms");
  this._bindEvents();
  this.addBooksOnPageLoad();
};

library.prototype._bindEvents = function(){
  this.$addForm.on("click", $.proxy(this._getRandomBook, this));
  this.$submitBtn.on("click", $.proxy(this._addBooks, this));
  this.$addForm.on("click", $.proxy(this._addForm, this));
};

library.prototype._addBook = function (a) {

    var aVals = a;
    	if (aVals.length >= 4){

    		var book = new newBook(aVals[0], aVals[1], aVals[2], aVals[3]);

            for(var i = 0; i < this.myBookArray.length; i++){
                if(this.myBookArray[i].title == book.title) {
                    alert("Book already exists.");
    				        return false;
                }
            }
            this.myBookArray.push(book);
            $("#library").append("<li>" + book.title + ": " +  book.author  + ", " + book.numberOfPages + ", " + book.publishDates + "." + "</li>");
        }
};

library.prototype._addBooks = function(){
  var aVals = this._getArrayValues();
	for(var i=0; i < aVals.length; i++){
		this._addBook(aVals[i]);
	}
};

library.prototype._getArrayValues = function (){
  var books=[], arr2 = [], len;
  $.each($(".aBooks input"),function(Index, val){
        var vInput = $(this).val();
		    books.push(vInput);
  });

  len = (books.length/4)-1;

for(var i = 0; i <= len; i++){
  arr2.push(books.splice(0,4));
}
return arr2;
}

library.prototype._addForm = function(){
  this.$formWrapper.append(this._formHTML);
};

library.prototype._formHTML = function(){
  return '<br /><p>Book ' + ($("form.add-books").length + 1) + '</p><form class="form-inline add-books">'
  + '<div class="form-group aBooks">' +
    '<input type="text" class="form-control input-space" placeholder="title">' +
    '<input type="text" class="form-control input-space" placeholder="author">' +
    '</div>' +
    '<div class="form-group aBooks">' +
    '<input type="number" class="form-control input-space" placeholder="# of pages">' +
    '<input type="date" class="form-control input-space" placeholder="Publish Date">' +
    '</div>' + '</form>';
};

library.prototype._getRandomBook = function () {
    if (this.myBookArray.length) {
        var randomBook = this.myBookArray[Math.floor(Math.random() * (this.myBookArray.length))];
        return randomBook;
        $("#result").append("<li>" + title.val() + ": " +  author.val()  + ", " + numberOfPages.val() + ", " + publishDates.val() + "." + "</li>");
    } return null;
};

var gnewLibrary = new library();

var gbook1 = ["1987","George Orwell", 3, "1986/03/25"];
var gbook2 = ["Duck Farm","George Orwell", 3, "1986/01/20"];
var gbook3 = ["The Crucible","Arther Miller", 3, "1886/04/20"];
var gbook4 = ["Bling Money","George Orwell", 3, "1987/04/01"];
var gbook5 = ["Zen and the Art of Motorcycle Maintenance","Robert M. Persig", 3, "1986/11/15"];
var gbook6 = ["The Crucified Church","Joel L. Rissinger", 500, "2010/02/01"];
var gbook7 = ["The Social Meaning of Money: Pin Money, Paychecks, Poor Relief, and Other Currencies", "Viviana A. Zelizer", 420,"1997/08/30"];


library.prototype.addBooksOnPageLoad = function(){
    this._addBook(gbook1);
    this._addBook(gbook2);
    this._addBook(gbook3);
    // this.gnewLibrary.addBook(gbook4);
    // this.gnewLibrary.addBook(gbook6);
    // this.gnewLibrary.addBook(gbook7);
};

$(function(){
  gnewLibrary.init();
});
