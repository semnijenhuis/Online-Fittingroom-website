/* eslint-disable no-unused-vars */
//https://initialcommit.com/blog/nodejs-module

import {fittingRoomItem, fittingRoomTool} from '../fitting-room-module/fittingRoomTool.js'


/**
 * Basic javascript to create button functionality on webpage and creating fittingRoomItem objects to be put in
 * a map for easy access.
 *
 */
// eslint-disable-next-line new-cap
const tool = new fittingRoomTool()
const fittingRoomItems = new Map()
let buttonId = 0

tool.allowOverlayLayer(true)

// get all buttons on page
const buttons = document.getElementsByTagName('button')
for (let i = 0; i < buttons.length; i++) {
	if(buttons[i].id === 'openTool'){
		buttons[i].onclick = function () {
			tool.openTool()
		}
	}
	if(buttons[i].classList.contains('fittingToolButton')){

		//give button id if it has none
		if(!buttons[i].hasAttribute('id')){
			buttons[i].id = buttonId.toString()
			buttonId++
		}
		let randomType = Math.round(Math.random() * 2)
		let randomSize = Math.round(Math.random() * 2)
		let type
		let size

		//give random type of clothing
		if(buttons[i].classList.contains('shirtSlot')){
			type = 'top'
		} else if (buttons[i].classList.contains('pantsSlot')){
			type = 'bottom'
		} else if (buttons[i].classList.contains('overlaySlot')){
			type = 'topOverlay'
		} else {
			type = 'feet'
		}

		//give random size
		if(randomSize === 0){
			size = 'S'
		} else if (randomType === 1){
			size = 'M'
		} else {
			size = 'L'
		}

		//get image location
		let parentDiv = buttons[i].parentElement
		let snackbar = document.createElement("div");
		snackbar.id = "snackbar";
		snackbar.textContent = "Item added";
		parentDiv.appendChild(snackbar);
		let image = parentDiv.getElementsByTagName('img')
		let imageLocation = "../test-webstore/" + image[0].getAttribute('src')

		//add item to map
		let item = new fittingRoomItem(type,imageLocation,buttons[i].id,size)
		fittingRoomItems.set(buttons[i].id,item)
		// eslint-disable-next-line no-undef
		buttons[i].onclick = function () {
			// eslint-disable-next-line no-undef
			tool.addItem(fittingRoomItems.get(buttons[i].id))
			snackbar.className = "show";
			setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 1000);
		}
	}
}
