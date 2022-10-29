let files = [],
button = document.querySelector('.top button');
form = document.querySelector('form');
container = document.querySelector('.container');
text = document.querySelector('.inner');
browse = document.querySelector('.select');
input = document.querySelector('form input');

browse.addEventListener('click', () => input.click());

input.addEventListener('change', () => {
	let file = input.files;

    for(let i=0; i<file.length; i++){
        if(files.every(e => e.name !== file[i].name)) files.push(file[i]);
    }
    form.reset();
    showImages();
})

const showImages = () => {
    let images = '';
    files.forEach( (e, i) => {
        images += `<div class="show-container"><div class="image">
                <img src="${URL.createObjectURL(e)}" alt="image">
                <span onclick="delImage(${i})">&times;</span>
            </div>
            <textarea type="text" class="comment" placeholder="Comment here"></textarea></div>`
    })
    container.innerHTML = images;
 }

const delImage = (index) => {
    files.splice(index, 1);
    showImages();
 }

form.addEventListener('dragover', e => {
    e.preventDefault();
	from.classList.add('dragover');
    text.innerHTML = 'Drop images here';
})

form.addEventListener('dragleave', e => {
    e.preventDefault();
	from.classList.remove('dragover');
    text.innerHTML = `Drag & drop image here or <span class="select">Browse</span>`;
})

form.addEventListener('drop', e => {
	e.preventDefault()

	let file = e.dataTransfer.files;
	for(let i=0; i<file.length; i++){
        if(files.every(e => e.name !== file[i].name)) files.push(file[i]);
    }

    showImages();
});

button.addEventListener('click', () => {
    let form = new FormData();
    files.forEach((e, i) => form.append(`file[${i}]`, e))
    if(files.length == 0){
        alert("Give some images!");
    }else{
        alert("Images are uploaded successfully!");
        container.style.display="none";
        location.reload();
    }
})