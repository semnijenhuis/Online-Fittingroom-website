// create variables for the change-able clothing and face
let shirt = document.querySelector('.shirt')
let trousers = document.querySelector('.trousers')
let face = document.querySelector('.face')
let shoes = document.querySelector('.shoe')
let topOverlay = document.querySelector('.topLayer')
let clicked = null

let moveBy = 8
let color = 1
let flName, count = 1

/** create variables for the webcam stream and the face overlay
    @author Stephen Nedd
 */
var modal = document.getElementById('cameraModal')
var faceButton = document.getElementById('openCam')
var closeSpan = document.getElementsByClassName('closeModal')[0]
var canvas = document.getElementById('canvas')
// var photo = document.getElementById("photo");
let takeSnapshot = document.getElementById('snap')
var video = null
var overlay = document.getElementById('face-overlay')
var streaming = false

var confirm = document.getElementById('confirm')
var width = 320
var height = 0
const faceCanvas = document.getElementById('faceCanvas')

// needed for photo upload
let photoUploadButton = document.getElementById('uploadPhotoButton')

/**
    @author Lucia Pusova
 */
photoUploadButton.addEventListener('change', handleFile)

function handleFile(e) {
	var faceWidth = 190
	var faceHeight = 140
	var ctx = document.getElementById('faceCanvas').getContext('2d')
	var img = new Image
	img.src = URL.createObjectURL(e.target.files[0])
	img.onload = function() {
		ctx.drawImage(img, 0,0, faceWidth, faceHeight )
		removebackground(faceCanvas).then(
			faceCanvas.style.left = '-18%',
			faceCanvas.style.top = '7%'
		)
	}
}


function resizeImage(reader) {
	reader.onload = function (e) {
		var img = document.createElement('img')

		img.src = e.target.result
		var canvas = document.createElement('canvas')
		var ctx = canvas.getContext('2d')

		ctx.drawImage(img, 0, 0)
		var MAX_WIDTH = 400
		var MAX_HEIGHT = 400
		var width = img.width

		var height = img.height
		if (width > height) {
			if (width > MAX_WIDTH) {
				height *= MAX_WIDTH / width
				width = MAX_WIDTH
			}
		} else {
			if (height > MAX_HEIGHT) {
				width *= MAX_HEIGHT / height
				height = MAX_HEIGHT
			}
		}
		canvas.width = width
		canvas.height = height
		ctx = canvas.getContext('2d')

		ctx.drawImage(img, 0, 0, width, height)
		dataurl = canvas.toDataURL(file.type)
		document.getElementById('output').src = dataurl
	}
	reader.readAsDataURL(file)
}


// these functions give the clothing/face variables a position when the page loads
window.addEventListener('load', () => {
	shirt.style.position = 'absolute'
	shirt.style.top = 145 +'px'
	shirt.style.left = 55 +'px'
	shirt.style.height = 260 + 'px'
	trousers.style.position = 'absolute'
	trousers.style.top = 350 + 'px'
	trousers.style.left = 90 + 'px'
	trousers.style.width = 125 + 'px'
	shoes.style.position = 'absolute'
	shoes.style.left = 105 + 'px'
	shoes.style.top = 655 + 'px'
	shoes.style.width = 100 + 'px'
})


/** when the "take picture" button is pressed
    @author Stephen Nedd
*/
takeSnapshot.onclick = function () {
	video.style.display = 'none'
	overlay.style.display = 'none'
	canvas.style.display = 'block'
	takeSnapshot.style.display = 'none'
	confirm.style.display = 'block'
	takePicture()
}

/** when the "close modal" button is pressed
    @author Stephen Nedd
*/
closeSpan.onclick = function() {
	modal.style.display = 'none'
	confirm.style.display ='none'
}

/** when you press outside the modal
    @author Stephen Nedd
*/
window.onclick = function(event) {
	if (event.target === modal) {
		modal.style.display = 'none'
		confirm.style.display ='none'
	}
}

/**
    @author Stephen Nedd
    * Gets and starts user webcam
 */
function loadVideo() {
	video = document.getElementById('video')
	navigator.mediaDevices.getUserMedia({video: true, audio: false})
		.then(function (stream) {
			video.srcObject = stream
			video.play()

			video.addEventListener('canplay', function (){
				if (!streaming) {
					streaming = true
					height = video.videoHeight / (video.videoWidth/width)
				}
			}, false)
		})
		.catch(function (err) {
			console.log('an error occured: ' + err)
		})
		.finally(function () {
			canvas.style.display = 'none'
			video.style.display = 'block'
			overlay.style.display = 'inline-block'
			takeSnapshot.style.display = 'block'
			streaming = false
		})
}

/**
   @author Stephen Nedd
   * when the face change button is pressed
 */
faceButton.onclick = function()  {
	modal.style.display = 'block'
	loadVideo()
}

/**
 @author Stephen Nedd
 * Takes a snapshot of the current webcam frame and replace the face image with snapshot once confirmed
 */
function takePicture() {
	var faceWidth = 190
	var faceHeight = 140
	const context = canvas.getContext('2d')
	if (width && height) {
		canvas.width = width
		canvas.height = height
		context.drawImage(video, 0, 0, width, height)
		canvas.setAttribute('class', 'flipped')

		confirm.onclick = function () {
			stopBothVideoAndAudio(video.srcObject)
			const context = faceCanvas.getContext('2d')
			context.drawImage(canvas, 0,0, faceWidth, faceHeight)
			removebackground(faceCanvas).then(
				canvas.style.display = 'none',
				modal.style.display = 'none',
				confirm.style.display = 'none',
				faceCanvas.style.display = 'absolute',
				faceCanvas.style.left = '-18%',
				faceCanvas.style.top = '7%'
			)
		}
	}
}

/*
    @author Stephen Nedd
    * Stop the webcam from streaming video to browser
 */
function stopBothVideoAndAudio(stream) {
	stream.getTracks().forEach(function(track) {
		if (track.readyState == 'live') {
			track.stop()
		}
	})
}

window.addEventListener('load', () =>{
	topOverlay.style.position = 'absolute'
	topOverlay.style.top = 145 +'px'
	topOverlay.style.left = 70 +'px'
	topOverlay.style.height = 260 + 'px'
})

/**
    @author Stephen Nedd
    * Listens for key presses and moves the selected clothing item
 */
window.addEventListener('keyup', (e) => {
	switch (e.key) {
	case 'ArrowLeft':
		clicked.style.left = parseInt(clicked.style.left) - moveBy + 'px'
		break
	case 'ArrowRight':
		clicked.style.left = parseInt(clicked.style.left) + moveBy + 'px'
		break
	case 'ArrowUp':
		clicked.style.top = parseInt(clicked.style.top) - moveBy + 'px'
		break
	case 'ArrowDown':
		clicked.style.top = parseInt(clicked.style.top) + moveBy + 'px'
		break

	}
})

/**
    @author Stephen Nedd
    when an clothing image is clicked replaces the placeholder <p> with the image id
 */
function onClickedImage(itemId) {
	clicked = document.querySelector('.'+itemId)
	document.getElementById('placeholder').innerHTML = itemId
}

// should change the color of the body image
function changeColor(buttonValue) {
	color = buttonValue
	if (type === 1) {
		gender.src = '../fitting-room-module/assets/model-girl' + buttonValue + '.png'
	} else gender.src = '../fitting-room-module/assets/model-man' + buttonValue + '.png'
}

//changes the gender of the body image
function changeGender() {
	type = (type+1)%2
	if (type === 1) {
		gender.src = '../fitting-room-module/assets/model-girl' + color + '.png'
	} else gender.src = '../fitting-room-module/assets/model-man' + color + '.png'

}

// changes the shirt image on the model
function addShirt(itemId) {
	shirt.src = 'images/shirt' + itemId + '.png'
}

function addShirtWithLocation(imageLocation) {
	console.log(imageLocation)
	// console.log(shirt)
	shirt.src = imageLocation
}

// changes the trouser image on th model
function addTrouser(itemId) {
	trousers.src = 'images/jeans' + itemId + '.png'
}

// changes the shoe image on the model
function addShoe(itemId) {
	shoes.src = 'images/shoes' + itemId + '.png'
}

/**
 * @author Stephen Nedd
 * functions to change the absolute position of the selected clothing item, if no item selected it will call showToast method to show the error
 */
function scaleUp() {
	if (clicked) {
		var currHeight = clicked.clientHeight
		clicked.style.height = (currHeight + 5) + 'px'
	} else {
		showToast()
	}
}

function scaleDown() {
	if (clicked) {
		var currHeight = clicked.clientHeight
		clicked.style.height = (currHeight - 5) + 'px'
	} else {
		showToast()
	}
}

function widthUp() {
	if (clicked) {
		var currWidth = clicked.clientWidth
		clicked.style.width = (currWidth + 5) + 'px'
	} else {
		showToast()
	}
}

function widthDown() {
	if (clicked) {
		var currWidth = clicked.clientWidth
		clicked.style.width = (currWidth - 5) + 'px'
	} else {
		showToast()
	}
}

/**
    @author Stephen Nedd
 */
async function removebackground(image) {
	const ctx = image.getContext('2d')

	/**
     * Loading the model BodyPix comes with a few different versions of the model,
     * with different performance characteristics trading off model size and prediction time with accuracy.
     */
	const net = await bodyPix.load({
		architecture: 'MobileNetV1',
		outputStride: 8,
		multiplier: 1.0,
		quantBytes: 4
	})

	/**
     * Segmentation Given an image with one or more people, person segmentation predicts segmentation for all people together.
     * It returns a PersonSegmentation object corresponding to segmentation for people in the image
     */
	const {data: map} = await net.segmentPerson(image, {
		internalResolution: 'full',
	})

	/**
     * Extracting image data
     */
	const { data:imgData } = ctx.getImageData(0, 0, image.width, image.height)

	/** Creating new image data
     * @type {ImageData}
     */
	const newImg = ctx.createImageData(image.width, image.height)
	const newImgData = newImg.data

	for(let i=0; i<map.length; i++) {
		//The data array stores four values for each pixel
		const [r, g, b, a] = [imgData[i*4], imgData[i*4+1], imgData[i*4+2], imgData[i*4+3]];
		[
			newImgData[i*4],
			newImgData[i*4+1],
			newImgData[i*4+2],
			newImgData[i*4+3]
		] = !map[i] ? [214, 214, 214, 0] : [r, g, b, a]
	}


	/**
     * Draw the new image back to canvas
     */
	ctx.putImageData(newImg, 0, 0)

}

function showToast() {
	// Get the snackbar div
	var toast = document.getElementById('snackbar')

	// Add the "show" class to div
	toast.className = 'show'

	// After 3 seconds, remove the show class from div
	setTimeout(function(){ toast.className = toast.className.replace('show', '') }, 3000)
}