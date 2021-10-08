//! Variables

var $ = document //? For shorter code
var bookmarkContainer = $.querySelector('#bookmarks-container')
var showModal = $.querySelector('#show-modal')
var closeModal = $.querySelector('#close-modal')
var modal = $.querySelector('#modal')
var form = $.forms[0]
var websiteName = $.querySelector('#website-name')
var websiteUrl = $.querySelector('#website-url')

//! DOM events

showModal.addEventListener('click',showModalHandler, false)

closeModal.addEventListener('click',closeModalHandler, false)

form.addEventListener('submit', addBookmarkHandler, false)

//! Event handler functions

function showModalHandler(){
    modal.style.display = 'flex'
}

function closeModalHandler(){
    modal.style.display = 'none'
}

function addBookmarkHandler(event){
    event.preventDefault()
    addBookmarkToDOM()
    addBookmarkToLocalStorage()
    closeModalHandler()
    mainBookmarkDeleter()
}

//! Main functions

function websiteNameGetter(){
    return websiteName.value
}

function websiteUrlGetter(){
    return websiteUrl.value
}

function addBookmarkToDOM(){
    //? Variables for this function
    let div = $.createElement('div')
    let a = $.createElement('a')
    let span = $.createElement('span')
    //? Add properties to elements (tags)
    a.href = websiteUrlGetter(), a.innerHTML = websiteNameGetter()
    div.className = 'item'
    span.className = 'fa-time', span.innerHTML = '&times;'
    //? Append elements
    div.append(...[a, span])
    bookmarkContainer.append(div)
}

function addBookmarkToLocalStorage(){
    //? Variables for this function
    let item = localStorage.getItem('bookmark')
    let itemValue = JSON.parse(item)
    //? If statement to check whether the localstorage is empty or not
    if (typeof item !== 'object'){
        //? The code below run if the localstorage is empty
        itemValue.push({
            name : websiteNameGetter(),
            url : websiteUrlGetter()
        })
        localStorage.setItem('bookmark', JSON.stringify(itemValue))
    }else{
        //? The code below run if the localstorage is not empty
        localStorage.setItem('bookmark', JSON.stringify([{
            name : websiteNameGetter(),
            url : websiteUrlGetter()
        }]))
    }
}

function addBookmarkToDOMByTheFirstTime(){
    //? Variables for this function
    let div = $.createElement('div')
    let a = $.createElement('a')
    let span = $.createElement('span')
    //? Add properties to elements (tags)
    a.href = 'www.google.com', a.innerHTML = 'Google'
    div.className = 'item'
    span.className = 'fa-time', span.innerHTML = '&times;'
    //? Append elements
    div.append(...[a, span])
    bookmarkContainer.append(div)
}

function addBookmarkToLocalStorageByTheFirstTime(){
    //? Variables for this function
    let item = localStorage.getItem('bookmark')
    let itemValue = JSON.parse(item)
    localStorage.setItem('bookmark', JSON.stringify([{
        name : 'Google',
        url : 'www.google.com'
    }]))
}

//! Self invoke functions

(function showBookmarksForTheFirstTime(){
    let item = localStorage.getItem('bookmark')
    let items = JSON.parse(item)
    console.log(item);
    if (item !== '[]' && item !== null){
        items.forEach(element => {
            //? Variables for this function
            let div = $.createElement('div')
            let a = $.createElement('a')
            let span = $.createElement('span')
            //? Add properties to "a" and "div" tag
            a.href = element.url,a.innerHTML = element.name
            div.className = 'item'
            span.className = 'fa-time', span.innerHTML = '&times;'
            //? Append elements
            div.append(...[a, span])
            bookmarkContainer.append(div)
        })
    }else{
        addBookmarkToDOMByTheFirstTime()
        addBookmarkToLocalStorageByTheFirstTime()
    }
})()

//! Aditional functions (for deleter/remover button)

function mainBookmarkDeleter(){
    function bookmarkDeleterBtn(){
        return $.querySelectorAll('.fa-time')
    }
    
    bookmarkDeleterBtn().forEach(element => element.addEventListener('click', event=>{
        removeItemFromDOM(event)
        removeItemFromLocalStorage(event)
    }, false))
    
    function removeItemFromDOM(event){
        event.target.parentElement.style.opacity = 0
        setTimeout(()=> event.target.parentElement.remove(), 200)
    }
    
    function removeItemFromLocalStorage(event){
        let item = JSON.parse(localStorage.getItem('bookmark'))
        target = event.target.parentElement.firstElementChild
        let obj = {name: target.innerHTML, url: target.href}
        item.pop(item.indexOf(obj))
        localStorage.setItem('bookmark', JSON.stringify(item))
    }
}

mainBookmarkDeleter()