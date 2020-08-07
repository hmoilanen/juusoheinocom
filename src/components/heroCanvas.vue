<template>
  <div class="hero-canvas" ref="heroCanvas">
		<div class="joku">tämä oon tekstiä</div>
	</div>
</template>

<script>
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
//import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { onScreen } from '@/utils/display'

// const scene = new THREE.scene()
// TAI:
// import { Scene } from 'three'
// const scene = new Scene()
// Also, see other popular parts of the library:
// '@/node_modules/three/examples/jsm/...

// Add text:
// https://threejs.org/docs/#manual/en/introduction/Creating-text

export default {
	name: 'heroCanvas',

	// Using $options for preventing Vue's reactivity
	initiated: false,
	animating: true,
	scene: null,
	camera: null,
	renderer: null,
	geometryCube: null,
	geometryCuboid: null,

	cubes: [],
	cubeAttrs: [],
	containerObject: null,
	
	amount: 1400,
	planeWidth: 4000,
	planeHeight: 4000,
	planeDepth: 10000,

	mouseRelativeX: 0,
	mouseRelativeY: 0,
	cameraLookAtY: 0,
	cameraLookAtZ: 0,

	bloomPass: null,
	bloomComposer: null,
	bloomParams: {
		exposure: 0.9,
		threshold: 0.9,
		strength: 0.45,
		radius: 0
	},

	stats: null,
	
	mounted() {
		this.init()
		this.animate()

		window.addEventListener('resize', this.onWindowResize, false)
		window.addEventListener('scroll', this.onWindowScroll, false)
		this.$refs.heroCanvas.addEventListener('mousemove', this.onMousemove, false)
		
		this.$on('hook:beforeDestroy', () => {
			window.removeEventListener('resize', this.onWindowResize)
			window.removeEventListener('scroll', this.onWindowScroll)
			this.$refs.heroCanvas.removeEventListener('mousemove', this.onMousemove)
		})
	},

  methods: {
		init() {
			this.setRenderer()
			this.setCamera()
			this.setScene()
			this.setLights()
			this.setGeometry()
			this.setContainer()

			this.setGUI()
			this.setBloomPass()
			this.setBloomComposer()


			// Create meshes
			for (let i = 0; i < this.$options.amount; i++) {
				this.createCube()
			}

			this.$options.initiated = true

			//POISTUU!
			this.$options.stats = new Stats()
			this.$refs.heroCanvas.appendChild(this.$options.stats.dom)
		},

		setRenderer() {
			this.$options.renderer = new THREE.WebGLRenderer({ antialias: true })
			this.$options.renderer.setSize(window.innerWidth, window.innerHeight)
			this.$options.renderer.setPixelRatio(window.devicePixelRatio)
			//this.$options.renderer.toneMapping = THREE.LinearToneMapping
			this.$options.renderer.toneMapping = THREE.ReinhardToneMapping
			this.$refs.heroCanvas.appendChild(this.$options.renderer.domElement)
		},

		setCamera() {
			this.$options.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, this.$options.planeDepth)
			this.$options.camera.position.set(this.$options.planeDepth / 2, 0, 0)
			this.$options.camera.lookAt(this.$options.planeDepth / -2, 0, 0)
		},

		setScene() {
			this.$options.scene = new THREE.Scene()
			this.$options.scene.background = new THREE.Color(0xffffff)
			//this.$options.scene.fog = new THREE.FogExp2(0xffffff, 0.00016)
			
			//this.scene.add(new THREE.AxisHelper(10000)) // AxisHelper(size)
    	//this.scene.add(new THREE.GridHelper(100000, 1000)) // GridHelper(size, step)
		},

		setLights() {
			const ambientLight = new THREE.AmbientLight(0xffffff, 1)
			ambientLight.castShadow = true
			this.$options.scene.add(ambientLight)
			
			//Create a DirectionalLight and turn on shadows for the light
			const spotLight = new THREE.DirectionalLight(0xffffff, 1, 100)
			spotLight.position.set(0, 1, 0) // default = light shining from top
			//spotLight.castShadow = true
			this.$options.scene.add(spotLight)
			
			const spotLight2 = new THREE.DirectionalLight(0xffffff, 1, 100)
			spotLight2.position.set(1, 1, 1)
			//spotLight2.castShadow = true
			this.$options.scene.add(spotLight2)
		},

		setGeometry() {
			this.$options.geometryCube = new THREE.BoxBufferGeometry(20, 20, 20)
			this.$options.geometryCuboid = new THREE.BoxBufferGeometry(20, 20, 60)
		},

		setContainer() {
			const containerObject = new THREE.Object3D()
			this.$options.containerObject = containerObject
			this.$options.scene.add(containerObject)
		},

		setBloomPass() {
			//this.$options.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0, 0, 0)
			this.$options.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
			this.$options.bloomPass.threshold = this.$options.bloomParams.threshold
			this.$options.bloomPass.strength = this.$options.bloomParams.strength
			this.$options.bloomPass.radius = this.$options.bloomParams.radius
			//this.renderer.toneMappingExposure = Math.pow(1.05, 4.0)
		},

		setBloomComposer() {
			const renderPass = new RenderPass(this.$options.scene, this.$options.camera)

			this.$options.bloomComposer = new EffectComposer(this.$options.renderer)
			this.$options.bloomComposer.addPass(renderPass)
			this.$options.bloomComposer.addPass(this.$options.bloomPass)
		},

		setGUI() {
			const gui = new GUI()

			const bloomFolder = gui.addFolder('Bloom Parameters')

			bloomFolder.add(this.$options.bloomParams, 'exposure', 0, 2).onChange((newValue) => {
				this.$options.renderer.toneMappingExposure = Math.pow(newValue, 4.0)
				this.render()
			})
			bloomFolder.add(this.$options.bloomParams, 'threshold', 0, 2).onChange((newValue) => {
				this.$options.bloomPass.threshold = Number(newValue)
				this.render()
			})
			bloomFolder.add(this.$options.bloomParams, 'strength', 0, 2).onChange((newValue) => {
				this.$options.bloomPass.strength = Number(newValue)
				this.render()
			})
			bloomFolder.add(this.$options.bloomParams, 'radius', 0, 10).onChange((newValue) => {
				this.$options.bloomPass.radius = Number(newValue)
				this.render()
			})
			//this.render()	
			
			bloomFolder.open()
		},

		createCube() {
			let attrs = {
				speed: 1, // 0.1-1
				rotationSpeed: 0.001, // 0.1-1
				acceleration: 1 // 0-1
			}
			const dispersion = {
				acceleration: 0.1,
				rotationSpeed: 0.05,
				size: 5,
				speed: 0.2,
			}

			//const defaultMaterial = new THREE.MeshLambertMaterial({ color: 0x800f40 })
			const defaultMaterial = new THREE.MeshLambertMaterial({ color: 0x2b0113 })
			const glossyMaterial = new THREE.MeshPhongMaterial({ 
				color: 0x000000,
				//envMap: envMap, // optional environment map
				specular: 0x413339,
				shininess: 0.5
			})

			let cube

			if (Math.random() < 0.10) {
				cube = new THREE.Mesh(this.$options.geometryCube, defaultMaterial)
			} else {
				const cubeType = Math.random() < 0.10 ? 'geometryCuboid' : 'geometryCube'
				cube = new THREE.Mesh(this.$options[cubeType], glossyMaterial)
				/* if (Math.random() < 0.10) {
				} else {
					cube = new THREE.Mesh(this.$options.geometryCube, glossyMaterial)
				} */
			}

			// Set cube's position on plane
			cube.position.x = this.planeDepth / -2
			cube.position.y = Math.random() * this.$options.planeHeight - (this.$options.planeHeight / 2)
			cube.position.z = Math.random() * this.$options.planeWidth - (this.$options.planeWidth / 2)

			// Position cube depth-wise on it's first render
			if (!this.$options.initiated) { cube.position.x = Math.random() * this.$options.planeDepth - (this.$options.planeDepth / 2) }

			// Set cube's rotation
			if (Math.random() > 0.4) { cube.rotation.x = Math.random() }
			if (Math.random() > 0.4) { cube.rotation.y = Math.random() }
			if (Math.random() > 0.4) { cube.rotation.z = Math.random() }
			if (Math.random() > 0.4) { attrs.rotationSpeed = Math.random() * dispersion.rotationSpeed }

			// Set cube's speed and acceleration
			if (Math.random() > 0.4) { attrs.speed += Math.random() / dispersion.speed }
			if (Math.random() > 0.4) { attrs.acceleration += Math.random() * dispersion.acceleration }

			// Set cube's size
			cube.scale.setScalar(Math.random() * dispersion.size)

			cube.castShadow = false
			cube.receiveShadow = false

			this.$options.cubes.push(cube)
			this.$options.cubeAttrs.push(attrs)
			//this.$options.cubes[this.$options.cubes.length] = cube
			//this.$options.cubeAttrs[this.$options.cubeAttrs.length] = attrs

			//this.scene.add(cube)
			this.$options.containerObject.add(cube)
		},

		animate() {
			if (this.$options.animating) {
				requestAnimationFrame(this.animate)
				this.updateCubes()
				this.updateCamera()
				this.$options.stats.update()
				this.render()
			}
		},

		render() {
			//this.$options.renderer.render(this.$options.scene, this.$options.camera)
			this.$options.bloomComposer.render()
		},

		updateCubes() {
			for (let index = 0; index < this.$options.cubes.length; index ++) {
				const cube = this.$options.cubes[index]
				
				// Delete cube if it's positioned behind camera + buffer
				if (cube.position.x > this.$options.planeDepth / 2 + 300) {
					this.$options.cubes.splice(index, 1)
					this.$options.cubeAttrs.splice(index, 1)
					//POISTA KAMAA OIKEALLLA TAVALLA:
					/* this.renderer.forceContextLoss()
					this.renderer.context = null
					this.renderer.domElement = null
					this.renderer = null */
					
					// Create a new cube every time one is deleted
					this.createCube()
				} else {
					const attrs = this.$options.cubeAttrs[index]

					// Rotation of cubes
					if (cube.rotation.x > 0) { cube.rotation.x += attrs.rotationSpeed }
					if (cube.rotation.y > 0) { cube.rotation.y += attrs.rotationSpeed }
					if (cube.rotation.z > 0) { cube.rotation.z += attrs.rotationSpeed }
					
					// Moving of cubes
					cube.position.x += attrs.speed * attrs.acceleration
				}
			}
		},

		updateCamera() {
			const cameraLookAtDiameter = 5000

			// Camera's current target on plane
			this.$options.cameraLookAtY += (-(this.$options.mouseRelativeY * cameraLookAtDiameter) - this.$options.cameraLookAtY) * 0.1
			this.$options.cameraLookAtZ += (-(this.$options.mouseRelativeX * cameraLookAtDiameter) - this.$options.cameraLookAtZ) * 0.1

			// Pointing of camera
			this.$options.camera.lookAt(
				this.$options.planeDepth / -2,
				this.$options.cameraLookAtY,
				this.$options.cameraLookAtZ
			)
		},

		onMousemove(event) {
			event.preventDefault()

			// Calculate mouse's relative position on screen:
			this.$options.mouseRelativeX = -(0.5 - event.clientX / window.innerWidth)
			this.$options.mouseRelativeY = -(0.5 - event.clientY / window.innerHeight)
		},

		onWindowResize() {
			this.$options.camera.aspect = window.innerWidth / window.innerHeight
			this.$options.camera.updateProjectionMatrix()
			
			this.$options.bloomComposer.setSize(window.innerWidth, window.innerHeight)
			this.$options.renderer.setSize(window.innerWidth, window.innerHeight)
		},

		onWindowScroll() {
			// Check if canvas is vertically visible on screen,
			// and run .animation() if so
			const canvasOnScreen = this.$refs.heroCanvas.getBoundingClientRect()

			if (onScreen(canvasOnScreen)) {
				if (!this.$options.animating) {
					this.$options.animating = true
					this.animate() // Run animation again
				}
			} else {
				this.$options.animating = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.hero-canvas {
	.joku {
		position: absolute;
		top: 50%;
		width: 100%;
		text-align: center;
		z-index: 100;
		display:block;
	}
}
</style>
