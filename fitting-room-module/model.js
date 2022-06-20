import { GUI } from '../fitting-room-module/threeJs/dat.gui.module.js'
import { GLTFLoader } from './threeJs/GLTFLoader.js'

let scene, camera, renderer, model, gui, state, texture
let mesh, eyeMesh, eyebrowsMesh, hairMesh, pantsMesh, topMesh
let num = 0, type = 'c1'

//get the function change gender
const btnEl = document.getElementById('button-change')
btnEl.addEventListener('click', function() {
	num = (num+1)%2
	changeGender()
})

//get the function change skin color
const btnCl = document.getElementsByClassName('c')
for (let i = 0; i < btnCl.length; i++) {
	const element = btnCl[i]
	element.addEventListener('click', function() {
		type = element.id
		changeColor(element.id)
	})
}

const genders = {
	Male: {url: 'body/manW.glb'},
	Female: {url: 'body/girlW.glb'}
}

state = {Gender: Object.keys( genders )[num]}

function onLoad() {
	//Renderer
	renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})
	renderer.setClearColor(0xffffff, 0)
	renderer.setSize(300,880)
            
	init(genders[state.Gender])
	render()

	document.getElementById('bodyImg').appendChild(renderer.domElement)
	window.addEventListener('resize', onWindowResize, false)
}

function init(sceneInfo){
	//Scene
	scene = new THREE.Scene()

	//Camera
	camera = new THREE.PerspectiveCamera(75, 300/880, 0.1, 1000)
	camera.position.set( 0, 7.8, 20 )
	scene.add( camera )

	//Light 
	scene.add( new THREE.AmbientLight( 0x9C9B8F ) )

	const dirLight1 = new THREE.DirectionalLight( 0xffffff, 2 )
	dirLight1.position.set( 1, 0.7, 1.5 )
	scene.add( dirLight1 )

	const dirLight2 = new THREE.DirectionalLight( 0xffffff, 2 )
	dirLight2.position.set( - 1, 0.7, - 1.5 )
	scene.add( dirLight2 )

	const dirLight3 = new THREE.DirectionalLight( 0xffffff, 1 )
	dirLight3.position.set( -1, 0.7, 1.5 )
	scene.add( dirLight3 )

	const dirLight4 = new THREE.DirectionalLight( 0xffffff, 1 )
	dirLight4.position.set( 1, 0.7, -1.5 )
	scene.add( dirLight4 )

	//Object
	createObject(sceneInfo)
            
	//Create GUI
	initGUI(state.Gender)
}

//load 3d object
function createObject(sceneInfo) {

	const loader = new GLTFLoader()
	loader.load(sceneInfo.url, function( gltf) {
                
		model = gltf.scene
		console.log(model)
                
		model.rotation.set(0, 0, 0)
		scene.add( model )

		if (num === 0) {
			model.scale.set(1.2, 1.2, 1.2)
			mesh = model.children[1].children[10]
			eyeMesh = model.children[3]
			eyebrowsMesh = model.children[4]
			hairMesh = model.children[5]
			pantsMesh = model.children[2]
		} else {
			model.scale.set(1.3, 1.3, 1.3)
			mesh = model.children[0].children[10]
			eyeMesh = model.children[1]
			eyebrowsMesh = model.children[4]
			hairMesh = model.children[5]
			pantsMesh = model.children[2]
			topMesh = model.children[3]
		}

		if (num === 1) {
			texture = new THREE.TextureLoader().load('body/texture/girl/'+type+'.png')
		} else texture = new THREE.TextureLoader().load('body/texture/man/'+type+'.png')

		texture.encoding = THREE.sRGBEncoding
		texture.flipY = false

		model.traverse( function( child ) {
			mesh.material.map = texture
		} )
	})           
}
        
function initGUI(genderInfo) {
	// Set up dat.GUI to control targets
	let params
	if (genderInfo === 'Male'){
		params = {
			Chest: 0.5,
			Height: 0.6,
			Hips: 0.7,
			Waist: 0.3,
		}
	} else {
		params = {
			Chest: 0.6,
			Height: 0.4,
			Hips: 0.6,
			Waist: 0.2,
		}
	}
            
	gui = new GUI()
	const folder = gui.addFolder( 'Body Physique' )

	folder.add( params, 'Chest', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
		mesh.morphTargetInfluences[0] = value
		if (num === 1) {
			topMesh.morphTargetInfluences[0] = value
		}
                
	} )

	folder.add( params, 'Height', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
		mesh.morphTargetInfluences[1] = value
		eyeMesh.morphTargetInfluences[0] = value
		eyebrowsMesh.morphTargetInfluences[0] = value
		hairMesh.morphTargetInfluences[0] = value
		pantsMesh.morphTargetInfluences[0] = value
		if (num === 1) {
			topMesh.morphTargetInfluences[1] = value
		}
	} )
            
	folder.add( params, 'Hips', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
		mesh.morphTargetInfluences[2] = value
		pantsMesh.morphTargetInfluences[1] = value
	} )

	folder.add( params, 'Waist', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
		mesh.morphTargetInfluences[3] = value
		pantsMesh.morphTargetInfluences[2] = value
		if (num === 1) {
			topMesh.morphTargetInfluences[2] = value
		}
	} )

	folder.open()
}

//change gender
function changeGender() {
            
	gui.destroy()
	state = {Gender: Object.keys( genders )[num]}
	init(genders[state.Gender])
}

//change skin color
function changeColor(id) {
	if (num === 1) {
		texture = new THREE.TextureLoader().load('body/texture/girl/'+id+'.png')
	} else texture = new THREE.TextureLoader().load('body/texture/man/'+id+'.png')

	texture.encoding = THREE.sRGBEncoding
	texture.flipY = false

	model.traverse( function( child ) {
		mesh.material.map = texture
	} )
}

function onWindowResize() {
	camera.aspect = 300/880
	camera.updateProjectionMatrix()
	renderer.setSize(300, 880)
}

function render() {
	requestAnimationFrame(render)

	renderer.render(scene, camera)
}

onLoad()