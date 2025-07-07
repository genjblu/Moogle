const buttonEl = document.getElementById('search-button')
const formEl = document.getElementById('form')
const inputEl = document.getElementById('search-input')
const resultsEl = document.getElementById('results')
const loadMEl = document.getElementById('load-more')

let page = 1
async function fetchImages() {
    const token = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw"
    const inputData = inputEl.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${token}`
    try{
    const fetched = await fetch(url)
    const data = await fetched.json()
    if(page == 1){
        resultsEl.innerHTML = ""
    }
    for (let i = 0; i < data.results.length; i++){
        const imgUrl = data.results[i].urls.regular
        const originUrl  = data.results[i].links.html
        const description = data.results[i].alt_description
        const resultItemEl = document.createElement('div')
        resultItemEl.classList.add('result-item')
        const imgEl = document.createElement('img')
        imgEl.classList.add('image')
        const aEl = document.createElement('a')
        aEl.classList.add('description')
        imgEl.setAttribute('src', imgUrl)
        aEl.innerText = description
        aEl.setAttribute('href', originUrl)
        aEl.setAttribute('target', '_blank')
        resultItemEl.append(imgEl)
        resultItemEl.append(aEl)
        resultsEl.append(resultItemEl)
        console.log(resultItemEl)
        console.log(url)
    }
    loadMEl.style.display = "block"
    } catch {
        alert("Sorry, something went wrong")
    }
}

formEl.addEventListener('submit', (event) => {
    event.preventDefault()
    fetchImages()
})

loadMEl.addEventListener('click', () => {
    page += 1
    fetchImages()
})