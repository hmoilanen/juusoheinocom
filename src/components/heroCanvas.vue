<template>
  <div class="hero-canvas" ref="heroCanvas"></div>
</template>

<script>
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
//import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { onScreen } from '@/utils/display'

// const scene = new THREE.scene()
// TAI:
// import { Scene } from 'three'
// const scene = new Scene()
// Also, see other popular parts of the library:
// '@/node_modules/three/examples/jsm/...

//MUUTA LOPUKSI KAIKKI MATH.RANDOMIT NIIN ETTEI NIISSÄ OLE MILJOONAA DESIMAALIA!
//MUUTA LOPUKSI KAIKKI MATH.RANDOMIT NIIN ETTEI NIISSÄ OLE MILJOONAA DESIMAALIA!
//MUUTA LOPUKSI KAIKKI MATH.RANDOMIT NIIN ETTEI NIISSÄ OLE MILJOONAA DESIMAALIA!

export default {
	name: 'heroCanvas',

  data() {
    return {
			initiated: false,
			scene: null,
			camera: null,
			renderer: null,
			geometry: null,
			material: null,
			amount: 1000,
			planeWidth: 3000,
			planeHeight: 3000,
			planeDepth: 10000,
			bloomPass: null,
			bloomComposer: null,
			//mouseX: 0,
			//mouseY: 0,
			playing: true,
		}
	},

	// Not reactive
	cubes: [],
	cubeAttrs: [],
	containerObject: null,
	
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

			this.setBloomPass()
			this.setBloomComposer()

			// Create meshes
			for (let i = 0; i < this.amount; i++) {
				this.createCube()
			}

			this.initiated = true
		},

		setRenderer() {
			this.renderer = new THREE.WebGLRenderer({ antialias: true })
			this.renderer.setSize(window.innerWidth, window.innerHeight)
			this.renderer.setPixelRatio(window.devicePixelRatio)
			this.renderer.toneMapping = THREE.LinearToneMapping
			this.$refs.heroCanvas.appendChild(this.renderer.domElement)
		},

		setCamera() {
			this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, this.planeDepth)
			//this.camera = new THREE.StereoCamera(70, window.innerWidth / window.innerHeight, 0.1, 10000)
			this.camera.position.set(this.planeDepth / 2, 0, 0)
			this.camera.lookAt(this.planeDepth / -2, 0, 0)
			//this.camera.lookAt(new THREE.Vector3(this.planeDepth / 2, 0, 0))
			//this.camera.focus(3)
		},

		setScene() {
			this.scene = new THREE.Scene()
			this.scene.background = new THREE.Color(0xffffff)
			this.scene.fog = new THREE.FogExp2(0xffffff, 0.00014)
			//this.renderer.setClearColor(this.scene.fog.color) //EI HUOMAA MITÄÄN EROO / POIMITTU JOSTAIN
			//this.scene.fog = new THREE.Fog(0x000000, 1, 1500)
			//this.scene.fog = new THREE.FogExp2(0x000000, 0.0012)
			
		},

		setLights() {
			const amibientLight = new THREE.AmbientLight(0xffffff, 1)
			amibientLight.castShadow = true
			this.scene.add(amibientLight)
			
			//Create a DirectionalLight and turn on shadows for the light
			const spotLight = new THREE.DirectionalLight(0xffffff, 1, 100)
			spotLight.position.set(0, 1, 0) // default; light shining from top
			//spotLight.castShadow = true // default false
			this.scene.add(spotLight)
			
			const spotLight2 = new THREE.DirectionalLight(0xffffff, 1, 100)
			spotLight2.position.set(1, 1, 1) // default; light shining from top
			//spotLight2.castShadow = true // default false
			this.scene.add(spotLight2)
		},

		setGeometry() {
			this.geometry = new THREE.BoxBufferGeometry(20, 20, 20)
		},

		setContainer() {
			const containerObject = new THREE.Object3D()
			this.$options.containerObject = containerObject
			this.scene.add(containerObject)
		},

		setBloomPass() {
			this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
			this.bloomPass.threshold = 2
			this.bloomPass.strength = 2
			this.bloomPass.radius = 0.8
			this.renderer.toneMappingExposure = Math.pow(1.05, 4.0)
		},

		setBloomComposer() {
			const renderPass = new RenderPass(this.scene, this.camera)

			this.bloomComposer = new EffectComposer(this.renderer)
			//this.bloomComposer.renderToScreen = true
			this.bloomComposer.addPass(renderPass)
			this.bloomComposer.addPass(this.bloomPass)
		},

		animate() {
			if (this.playing) {
				requestAnimationFrame(this.animate)
				this.updateCubes()
				this.render()
			}
		},

		render() {
			//this.renderer.render(this.scene, this.camera)
			this.bloomComposer.render()
		},

		updateCubes() {
			let time = performance.now() * 0.000002

			// Animating cubes
			this.$options.cubes.forEach((cube, index) => {
				// Delete cube if it's positioned behind camera + buffer
				if (cube.position.x > this.planeDepth / 2 + 100) {
					this.$options.cubes.splice(index, 1)
					this.$options.cubeAttrs.splice(index, 1)
				} else {
					const attrs = this.$options.cubeAttrs[index]
					const rotationAddition = time * attrs.rotationSpeed
	
					// Rotation of cubes
					if (cube.rotation.x > 0) { cube.rotation.x += rotationAddition }
					if (cube.rotation.y > 0) { cube.rotation.y += rotationAddition }
					if (cube.rotation.z > 0) { cube.rotation.z += rotationAddition }
					
					// Moving of cubes
					cube.position.x += attrs.speed * (attrs.acceleration)
				}
			})

			// Randomly create new cube
			if (Math.random() < 0.015) { this.createCube() }
		},

		onWindowResize() {
			this.camera.aspect = window.innerWidth / window.innerHeight
			this.camera.updateProjectionMatrix()
			
			this.bloomComposer.setSize(window.innerWidth, window.innerHeight)
			this.renderer.setSize(window.innerWidth, window.innerHeight)
		},

		onWindowScroll() {
			// Check if canvas is vertically visible on screen
			// and play this.animation() if so
			const canvasOnScreen = this.$refs.heroCanvas.getBoundingClientRect()

			if (onScreen(canvasOnScreen)) {
				if (!this.playing) {
					this.playing = true
					this.animate() // Restart animation
				}
			} else {
				this.playing = false
			}
		},

		onMousemove(event) {
			event.preventDefault()

			const cameraLookAtRadius = 6000
			const cursorOffsetX = -(0.5 - event.clientX / window.innerWidth)
			const cursorOffsetY = -(0.5 - event.clientY / window.innerHeight)

			this.camera.lookAt(
				this.planeDepth / -2,
				-cursorOffsetY * cameraLookAtRadius,
				-cursorOffsetX * cameraLookAtRadius
			)
		},

		createCube() {
			let attrs = {
				speed: 0.1, // 0.1-1
				rotationSpeed: 0.1, // 0.1-1
				acceleration: 0 // 0-1
			}
			const dispersion = {
				acceleration: 20,
				rotationSpeed: 0.3,
				size: 4,
				speed: 10,
			}

			const defaultMaterial = new THREE.MeshLambertMaterial({ color: 0x800f40 })
			const glossyMaterial = new THREE.MeshPhongMaterial({ 
				color: 0x000000,
				//envMap: envMap, // optional environment map
				specular: 0xa78191,
				shininess: 1
			})

			let cube

			if (Math.random() < 0.10) {
				cube = new THREE.Mesh(this.geometry, defaultMaterial)
			} else {
				cube = new THREE.Mesh(this.geometry, glossyMaterial)
			}

			// Set cube's position on plane
			cube.position.x = this.planeDepth / -2
			cube.position.y = Math.random() * this.planeHeight - (this.planeHeight / 2)
			cube.position.z = Math.random() * this.planeWidth - (this.planeWidth / 2)

			// Position cube depth-wise on it's first render
			if (!this.initiated) { cube.position.x = Math.random() * this.planeDepth - (this.planeDepth / 2) }

			// Set cube's rotation
			if (Math.random() > 0.4) { cube.rotation.x = Math.random() }
			if (Math.random() > 0.4) { cube.rotation.y = Math.random() }
			if (Math.random() > 0.4) { cube.rotation.z = Math.random() }
			if (Math.random() > 0.4) { attrs.rotationSpeed = Math.random() * dispersion.rotationSpeed }

			// Set cube's speed and acceleration
			if (Math.random() > 0.4) { attrs.speed += Math.random() / dispersion.speed }
			if (Math.random() > 0.4) { attrs.acceleration = Math.random() * dispersion.acceleration }

			// Set cube's size
			cube.scale.setScalar(Math.random() * dispersion.size, )

			cube.castShadow = true
			cube.receiveShadow = false

			this.$options.cubes.push(cube)
			this.$options.cubeAttrs.push(attrs)
			//this.scene.add(cube)
			this.$options.containerObject.add(cube)
		}
	}
}
</script>

<style lang="scss" scoped>
.hero-canvas {}
</style>
