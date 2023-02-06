const btn = document.querySelector('#btn')
const container = document.querySelector('.container')

// When PLUS Button is clicked..
btn.addEventListener('click', function () {
  addNote()
})

// addNote Function...
const addNote = (text = '') => {
  const note = document.createElement('div')
  note.classList.add('note')
  note.innerHTML = `
          <div class="heading flex">
                <i class=" save fa-solid  fa-floppy-disk"></i>
                <i class=" trash fa-solid fa-trash"></i>
          </div>
          <textarea  placeholder="Write Your Note Here!">${text}</textarea>`

  container.appendChild(note)


  // When Trash will be clicked...
  note.querySelector('.trash').addEventListener('click', function () {
    note.remove()
    saveNotes() /* yaha per save notes wala function chalane se jo hum data note se delete karangai wah , storage se v delete hoga */
  })

  // When save will be clicked...
  note.querySelector('.save').addEventListener('click', function () {
    saveNotes()
  })

  // For Auto-save
  note.querySelector('textarea').addEventListener('focusout', function () {
    saveNotes()
  })
}

// saveNotes Function...
const saveNotes = () => {
  const notes = document.querySelectorAll('.note textarea')
  // console.log(notes)
  const data = []
  notes.forEach((note) => {
    data.push(note.value)
  })
  // console.log(data) /* jo v hum note mai likhangai , wah data Array mai chala jaega , upar ke loop ke karan */

  if (data.length === 0) {
    localStorage.removeItem('notes')
  } else {
    localStorage.setItem('notes', JSON.stringify(data)) // bcz hum data array ko string ke form mai Localstorage mai save karna cahte hai
  }
}

// Self Calling Function , jo ki page load hote hi , hme ek note dikhna cahiye..
;(function () {
  const lsNotes = JSON.parse(localStorage.getItem('notes'))
  // console.log(lsNotes)
  if (lsNotes === null) {
    addNote()
  } else {
    //  jo local storage mai data h , wah homko dikhana cahiye..uske liye yah code hai..
    lsNotes.forEach((lsNotes) => {
      addNote(lsNotes)
    })
  }
})()
