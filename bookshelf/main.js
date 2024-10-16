const bookForm = document.getElementById('bookForm');
const bookFormSubmit = document.getElementById('bookFormSubmit');
const titleForm = document.getElementById('titleForm');
let inCompleteBookList = document.getElementById('incompleteBookList');
let completeBookList = document.getElementById('completeBookList');

const bookFormTitle = document.getElementById('bookFormTitle'),
    bookFormAuthor = document.getElementById('bookFormAuthor'),
    bookFormYear = document.getElementById('bookFormYear'),
    bookFormIsComplete = document.getElementById('bookFormIsComplete');

let isFormEdit = false;

let data_bookShelf = [];
let getData;

function reloadData(){
    let getDatas = JSON.parse(localStorage.getItem('BOOKSHELF'));
    completeBookList.innerHTML = "";
    inCompleteBookList.innerHTML = "";
    getDatas.forEach(data => {
        if (data.isComplete) {
            completeBookList.innerHTML += `
            <div data-bookid="${data.id}" data-testid="bookItem">
                <h3 data-testid="bookItemTitle">${data.title}</h3>
                <p data-testid="bookItemAuthor">Penulis: ${data.author}</p>
                <p data-testid="bookItemYear">Tahun: ${data.year}</p>
                <div>
                    <button class="btn-primary selesai-btn" bookId="${data.id}" data-testid="bookItemIsCompleteButton">Belum Selesai</button>
                    <button class="btn-danger hapus-btn" bookId="${data.id}" data-testid="bookItemDeleteButton">Hapus Buku</button>
                    <button class="btn-second edit-btn" bookId="${data.id}" data-testid="bookItemEditButton">Edit Buku</button>
                    </div>
                    </div>
                    `;
        } else {
            inCompleteBookList.innerHTML += `
            <div data-bookid="${data.id}" data-testid="bookItem">
                <h3 data-testid="bookItemTitle">${data.title}</h3>
                <p data-testid="bookItemAuthor">Penulis: ${data.author}</p>
                <p data-testid="bookItemYear">Tahun: ${data.year}</p>
                <div>
                    <button class="btn-primary selesai-btn" bookId="${data.id}" data-testid="bookItemIsCompleteButton">Selesai dibaca</button>
                    <button class="btn-danger hapus-btn" bookId="${data.id}" data-testid="bookItemDeleteButton">Hapus Buku</button>
                    <button class="btn-second edit-btn" bookId="${data.id}" data-testid="bookItemEditButton">Edit Buku</button>
                    </div>
                    </div>
                    `;
        }
    });

    let selesai_btn = document.querySelectorAll('.selesai-btn');
    let hapus_btn = document.querySelectorAll('.hapus-btn');
    let edit_btn = document.querySelectorAll('.edit-btn');

    selesai_btn.forEach(btn => {
        let id = btn.getAttribute('bookId');
        btn.addEventListener('click', () => {
            selesaiBuku(id);
        })
    })

    hapus_btn.forEach(btn => {
        let id = btn.getAttribute('bookId');
        btn.addEventListener('click', () => {
            hapusBuku(id);
        })
    })

    edit_btn.forEach(btn => {
        let id = btn.getAttribute('bookId');
        btn.addEventListener('click', () => {
            editData(id);
        })
    });
}

function addData(data = null) {
    let getDatas;

    if (localStorage.getItem('BOOKSHELF') && localStorage.getItem('BOOKSHELF') != null) {
        getDatas = JSON.parse(localStorage.getItem('BOOKSHELF'));

        if (Array.isArray(getDatas)) {
            getDatas.push(data);
            localStorage.setItem('BOOKSHELF', JSON.stringify(getDatas));
        }

        reloadData();
        bookForm.reset();
    } else {
        localStorage.setItem('BOOKSHELF', JSON.stringify([data]));
        reloadData();
        bookForm.reset();
    }
}

function selesaiBuku(id = null) {
    let getDatas;

    if (localStorage.getItem('BOOKSHELF') && localStorage.getItem('BOOKSHELF') != null) {
        getDatas = JSON.parse(localStorage.getItem('BOOKSHELF'));
    }

    if (id != null) {
        getDatas.some(data => {
            if (data.id == id) {
                getData = data;
                return true;
            }
        });

        const newDatas = getDatas.map(item => {
            if (item.id === getData.id) {
                item.isComplete = !item.isComplete;
            }
            return item;
        });

        reloadData();
        localStorage.setItem('BOOKSHELF', JSON.stringify(newDatas));
    }
}

function hapusBuku(id = null) {
    let getDatas;

    if (localStorage.getItem('BOOKSHELF') && localStorage.getItem('BOOKSHELF') != null) {
        getDatas = JSON.parse(localStorage.getItem('BOOKSHELF'));
    }

    if (id != null) {
        getDatas = getDatas.filter(book => book.id != id);
        localStorage.setItem('BOOKSHELF', JSON.stringify(getDatas));

        reloadData();
        bookForm.reset();
    }
}

function updateData() {
    let getDatas;

    if (localStorage.getItem('BOOKSHELF') && localStorage.getItem('BOOKSHELF') != null) {
        getDatas = JSON.parse(localStorage.getItem('BOOKSHELF'));
    }

    const newDatas = getDatas.map(item => {
        if (item.id === getData.id) {
            item.title = bookFormTitle.value;
            item.author = bookFormAuthor.value;
            item.year = parseInt(bookFormYear.value);
            item.isComplete = bookFormIsComplete.checked;
        }
        return item;
    });

    localStorage.setItem('BOOKSHELF', JSON.stringify(newDatas));

    isFormEdit = false;
    bookFormSubmit.innerHTML = 'Masukkan Buku ke rak <span style="font-weight: 700;">Belum selesai dibaca';
    titleForm.innerText = 'Tambah Buku Baru';
    bookForm.reset();
    reloadData()
}

function editData(id = null) {
    let getDatas;

    isFormEdit = true;

    if (localStorage.getItem('BOOKSHELF') && localStorage.getItem('BOOKSHELF') != null) {
        getDatas = JSON.parse(localStorage.getItem('BOOKSHELF'));

        getDatas.some(data => {
            if (data.id == id) {
                getData = data;
                return true;
            }
        });
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })

    bookFormSubmit.innerHTML = 'Edit';
    titleForm.innerText = 'Edit Buku';

    bookFormTitle.value = getData.title;
    bookFormAuthor.value = getData.author;
    bookFormYear.value = parseInt(getData.year);
    bookFormIsComplete.checked = getData.isComplete;

}

function submitForm(e) {
    e.preventDefault();

    if (!isFormEdit) {


        let randomNumber = Math.floor(Math.random() * 1000) + 1;

        data_bookShelf = {
            id: randomNumber,
            title: bookFormTitle.value.trim(),
            author: bookFormAuthor.value.trim(),
            year: parseInt(bookFormYear.value.trim()),
            isComplete: bookFormIsComplete.checked
        }

        addData(data_bookShelf);
    } else {
        updateData();
    }

}

window.addEventListener('load', () => {
    bookForm.addEventListener('submit', submitForm);

    reloadData();

    let selesai_btn = document.querySelectorAll('.selesai-btn');
    let hapus_btn = document.querySelectorAll('.hapus-btn');
    let edit_btn = document.querySelectorAll('.edit-btn');

    selesai_btn.forEach(btn => {
        let id = btn.getAttribute('bookId');
        btn.addEventListener('click', () => {
            selesaiBuku(id);
        })
    })

    hapus_btn.forEach(btn => {
        let id = btn.getAttribute('bookId');
        btn.addEventListener('click', () => {
            hapusBuku(id);
        })
    })

    edit_btn.forEach(btn => {
        let id = btn.getAttribute('bookId');
        btn.addEventListener('click', () => {
            editData(id);
        })
    });
})