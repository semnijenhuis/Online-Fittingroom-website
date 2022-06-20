
export class fittingRoomTool {
	constructor () {
		this.fittingList = []
		this.topList = []
		this.bottomList = []
		this.feetList = []
		this.topOverlayList = []


		this.itemsInList = 0
		this.topOverlay = false
		this.listSizes =[]
		this.reOpenedAndChanged = false
		this.toolOpened = false

		this.fittingList.push(this.topList, this.bottomList, this.feetList, this.topOverlayList)
		this.createListFromCookie()
	}



	openTool() {
		if(this.toolOpened === true){
			for (let i = 0; i < this.fittingList.length; i++) {
				if(this.fittingList[i].length !== this.listSizes[i]){
					this.reOpenedAndChanged = true
				}
			}
			if(this.reOpenedAndChanged === true) {
				let iframeDocument = document.getElementById('frame').contentWindow.document
				let cards = iframeDocument.getElementsByClassName('card')
				while(cards.length > 0) {
					cards[0].parentNode.removeChild(cards[0])
				}
				this.buildTool()
				this.reOpenedAndChanged = false
			}
		} else {
			this.buildTool()
			this.toolOpened = true
		}
	}

	/**
	 * this method is responsible for putting the selected fittingRoomItems inside the html fitting room page,
	 * as well as making the arrow buttons on the page able to let the user scroll through the clothing lists.
	 */
	buildTool() {

		for (let i = 0; i < this.fittingList.length; i++) {
			this.listSizes[i] = this.fittingList[i].length
		}
		/**
		 * Putting all the relevant html elements into variables to be easily accessed, this is done by reaching into
		 * the frame element on the main web store page.
		 * @type {Element}
		 */
		let shirt = document.getElementById('frame').contentWindow.document.querySelector('.shirt')
		let trousers = document.getElementById('frame').contentWindow.document.querySelector('.trousers')
		let shoes = document.getElementById('frame').contentWindow.document.querySelector('.shoe')
		let topOverlaySlot = document.getElementById('frame').contentWindow.document.querySelector('.topLayer')
		let iframeDocument = document.getElementById('frame').contentWindow.document

		/**
		 * This part assigns functionality to the arrow buttons, both the LeftArrow and RightArrow take
		 * the relevant list they need to be able to scroll through as a parameter and the html element
		 * which needs to be changed when the arrow is clicked.
		 */
		let leftShirtArrow = iframeDocument.getElementById('upperLeft')
		leftShirtArrow.onclick = () => LeftArrow(this.fittingList[0], shirt)
		let rightShirtArrow = iframeDocument.getElementById('upperRight')
		rightShirtArrow.onclick = () => RightArrow(this.fittingList[0], shirt)

		let leftPantsArrow = iframeDocument.getElementById('lowerLeft')
		leftPantsArrow.onclick = () => LeftArrow(this.fittingList[1], trousers)
		let rightPantsArrow = iframeDocument.getElementById('lowerRight')
		rightPantsArrow.onclick = () => RightArrow(this.fittingList[1], trousers)

		let leftShoeArrow = iframeDocument.getElementById('shoeLeft')
		leftShoeArrow.onclick = () => LeftArrow(this.fittingList[2], shoes)
		let rightShoeArrow = iframeDocument.getElementById('shoeRight')
		rightShoeArrow.onclick = () => RightArrow(this.fittingList[2], shoes)

		// eslint-disable-next-line no-undef
		if(this.topOverlay === true){
			let leftTopArrow = iframeDocument.getElementById('topLeft')
			leftTopArrow.onclick = () => LeftArrow(this.fittingList[3], topOverlaySlot)
			let rightTopArrow = iframeDocument.getElementById('topRight')
			rightTopArrow.onclick = () => RightArrow(this.fittingList[3], topOverlaySlot)
		}


		/**
		 * This part is responsible for loading all the selected clothing items into the assigned html divs.
		 * Each image is put into a card element and then put into the list relevant to the type of clothing
		 */
		let topList = iframeDocument.getElementById('topList')
		for (let i = 0; i < this.fittingList[0].length; i++) {
			let card = iframeDocument.createElement('div')
			card.className = 'card'

			let image = iframeDocument.createElement('img')
			image.src = this.fittingList[0][i].imageLocation
			image.style.width = '12rem'

			image.onclick = function () {
				shirt.src = image.getAttribute('src')
			}

			let removeButton = iframeDocument.createElement('img')
			removeButton.src = '../fitting-room-module/assets/close.png'
			removeButton.className = 'removeButton'
			removeButton.onclick = () => removeClothingItem(this.fittingList[0], card, this.fittingList)


			card.appendChild(image)
			card.appendChild(removeButton)
			topList.appendChild(card)
		}

		let bottomList = iframeDocument.getElementById('bottomList')
		for (let i = 0; i < this.fittingList[1].length; i++) {
			let card = iframeDocument.createElement('div')
			card.className = 'card'

			let image = iframeDocument.createElement('img')
			image.src = this.fittingList[1][i].imageLocation
			image.style.width = '8rem'
			image.style.height = '17rem'

			image.onclick = function () {
				trousers.src = image.getAttribute('src')
			}

			let removeButton = iframeDocument.createElement('img')
			removeButton.src = '../fitting-room-module/assets/close.png'
			removeButton.className = 'removeButton'
			removeButton.onclick = () => removeClothingItem(this.fittingList[1], card, this.fittingList)

			card.appendChild(image)
			card.appendChild(removeButton)
			bottomList.appendChild(card)
		}

		let shoeList = iframeDocument.getElementById('shoeList')
		for (let i = 0; i < this.fittingList[2].length; i++) {
			let card = iframeDocument.createElement('div')
			card.className = 'card'

			let image = iframeDocument.createElement('img')
			image.src = this.fittingList[2][i].imageLocation
			image.style.width = '200px'

			image.onclick = function () {
				shoes.src = image.getAttribute('src')
			}

			let removeButton = iframeDocument.createElement('img')
			removeButton.src = '../fitting-room-module/assets/close.png'
			removeButton.className = 'removeButton'
			removeButton.onclick = () => removeClothingItem(this.fittingList[2], card, this.fittingList)

			card.appendChild(image)
			card.appendChild(removeButton)
			shoeList.appendChild(card)
		}

		if(this.topOverlay === true) {
			let clothingLists = iframeDocument.getElementById('clothesListings')
			clothingLists.className = 'flex-container'
			let topOverlay = iframeDocument.createElement('div')
			topOverlay.className = 'scrolling-wrapper4'

			for (let i = 0; i < this.fittingList[3].length; i++) {
				let card = iframeDocument.createElement('div')
				card.className = 'card'

				let image = iframeDocument.createElement('img')
				image.src = this.fittingList[3][i].imageLocation
				image.style.width = '200px'

				image.onclick = function () {
					topOverlaySlot.src = image.getAttribute('src')
				}

				let removeButton = iframeDocument.createElement('img')
				removeButton.src = '../fitting-room-module/assets/close.png'
				removeButton.className = 'removeButton'
				removeButton.onclick = () => removeClothingItem(this.fittingList[3], card, this.fittingList)

				card.appendChild(image)
				card.appendChild(removeButton)
				topOverlay.appendChild(card)
			}
			clothingLists.appendChild(topOverlay)
		}
	}

	/**
	 * Takes a fittingRoomItem and adds it to the relevant clothing type array, based on the type of clothing
	 * assigned to the object.
	 * @param item
	 */
	addItem(item) {
		if(this.isCorrectItem(item)){
			let alreadyPresent = false
			if (item.type === 'top') {
				for (let i = 0; i < this.fittingList[0].length; i++) {
					if(item.imageLocation === this.fittingList[0][i].imageLocation){
						alreadyPresent = true
					}
				}
				if(alreadyPresent === false) {
					this.fittingList[0].push(item)
				}
			} else if (item.type === 'bottom') {
				for (let i = 0; i < this.fittingList[1].length; i++) {
					if(item.imageLocation === this.fittingList[1][i].imageLocation){
						alreadyPresent = true
					}
				}
				if(alreadyPresent === false) {
					this.fittingList[1].push(item)
				}
			} else if (item.type === 'feet') {
				for (let i = 0; i < this.fittingList[2].length; i++) {
					if(item.imageLocation === this.fittingList[2][i].imageLocation){
						alreadyPresent = true
					}
				}
				if(alreadyPresent === false) {
					this.fittingList[2].push(item)
				}
			} else if (item.type === 'topOverlay'){
				for (let i = 0; i < this.fittingList[3].length; i++) {
					if(item.imageLocation === this.fittingList[3][i].imageLocation){
						alreadyPresent = true
					}
				}
				if(alreadyPresent === false) {
					this.fittingList[3].push(item)
				}
			}
			this.itemsInList++
			console.log(this.fittingList)
			let jsonClothingList = JSON.stringify(this.fittingList)
			setFittingRoomCookie('clothingList', jsonClothingList, 1)
		} else {
			console.error('Wrong type of object added to tool')
		}
	}

	/**
	 * Checks if the variable passed as a parameter is a fittingRoomItem that can be processed by the system.
	 * @param item
	 * @returns {boolean}
	 */
	isCorrectItem(item){
		return 'type' in item &&
			'imageLocation' in item &&
			'itemName' in item &&
			'size' in item &&
			Object.keys(item).length === 4
	}

	/**
	 * Takes a boolean value as a parameter, if true the extra clothing slot for a layer on top of the torso layer
	 * will be added to display clothing like jackets on top of the regular tops.
	 * @param choice
	 */
	allowOverlayLayer(choice){
		if(choice !== true && choice !== false){
			console.error('choice can only be true or false')
		} else {
			this.topOverlay = choice
		}
	}

	createListFromCookie(){
		let persistentList = JSON.parse(getFittingRoomCookie('clothingList'))
		let recreatedList = []
		if(persistentList !== null){
			for (let i = 0; i < persistentList.length; i++) {
				recreatedList[i] = []
				for (let j = 0; j < persistentList[i].length; j++) {
					recreatedList[i][j] = new fittingRoomItem(persistentList[i][j]._type, persistentList[i][j]._imageLocation,
						persistentList[i][j]._itemName, persistentList[i][j]._size,)
				}
			}
			this.fittingList = recreatedList
		}
	}
}

/**
 * A class that will easily allow the creation of the exact kind of objects the system is created to handle.
 * Right now the "size" field has no use but it is already implemented for when functionality for different sized
 * bodies is added.
 */
export class fittingRoomItem {

	constructor(type, imageLocation, itemName, size) {
		this._type = type
		this._imageLocation = imageLocation
		this._itemName = itemName
		this._size = size
	}


	get type() {
		return this._type
	}

	get imageLocation() {
		return this._imageLocation
	}

	get itemName() {
		return this._itemName
	}

	get size() {
		return this._size
	}
}

/**
 * Takes an array of fittingRoomItems as well as an html image element to change when the arrow is clicked.
 * Loops through the items and when the fittingRoomItem in the list references the same image location the
 * image will be changed to display a piece of clothing in one position before the currently displayed piece of clothing.
 * If the piece of clothing on current display is the first element in the list, pressing the arrow will display the last
 * clothing item in the list
 * @param list
 * @param imageElement
 */
export function LeftArrow(list, imageElement){
	let inList = false
	for (let i = 0; i < list.length; i++) {
		if (imageElement.getAttribute('src') === list[i].imageLocation){
			inList = true
		}
	}
	if (inList === true) {
		for (let i = 0; i < list.length ; i++) {
			if (list[i].imageLocation === imageElement.getAttribute('src')) {
				if (i === 0) {
					imageElement.src = list[(list.length-1)].imageLocation
					break
				} else if (i > 0) {
					imageElement.src = list[(i - 1)].imageLocation
					break
				}
			}
		}
	} else {
		imageElement.src = imageElement.src = list[0].imageLocation
	}

}


/**
 * Does the same thing as the LeftArrow function, but shows the next piece of clothing in the list except the
 * previous one and shows the first clothing item in the list if the currently displayed piece of clothing is
 * the last item in the list.
 * @param list
 * @param imageElement
 */
export function RightArrow(list, imageElement){
	let inList = false
	for (let i = 0; i < list.length; i++) {
		if (imageElement.getAttribute('src') === list[i].imageLocation){
			inList = true
		}
	}
	if (inList === true) {
		for (let i = 0; i < list.length ; i++) {
			if (list[i].imageLocation === imageElement.getAttribute('src')) {
				if (i === (list.length-1)) {
					imageElement.src = list[0].imageLocation
					break
				} else if (i < (list.length-1)) {
					imageElement.src = list[(i + 1)].imageLocation
					break
				}
			}
		}
	} else {
		imageElement.src = imageElement.src = list[0].imageLocation
	}
}

export function removeClothingItem(list, cardElement, completeList){
	for (let i = 0; i < list.length; i++) {
		if(list[i].imageLocation === cardElement.getElementsByTagName('img')[0].getAttribute('src')){
			list.splice(i,1)
		}
	}
	let jsonClothingList = JSON.stringify(completeList)
	setFittingRoomCookie('clothingList', jsonClothingList, 4)
	cardElement.remove()
}

/**
 * These two methods are responsible for setting a cookie and taking a cookie, hopefully in the way this is done it will
 * not overwrite or wrongly take cookies from the web store that the tool is fitted on
 * @param name
 */
export function getFittingRoomCookie(name) {
	let nameEQ = name + '='
	let ca = document.cookie.split(';')
	for(let i=0;i < ca.length;i++) {
		let c = ca[i]
		while (c.charAt(0)==' ') c = c.substring(1,c.length)
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length)
	}
	return null
}

export function setFittingRoomCookie(name, value, hours) {
	let expires = ''
	if (hours) {
		let date = new Date()
		date.setTime(date.getTime() + (hours*60*60*1000))
		expires = '; expires=' + date.toUTCString()
	}
	document.cookie = name + '=' + (value || '')  + expires + '; path=/'
}
