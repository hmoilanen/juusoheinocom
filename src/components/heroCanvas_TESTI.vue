<template>
  <div class="hero-canvas" ref="heroCanvas"></div>
</template>

<script>
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
//import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { onScreen } from '@/utils/display'
import Stats from 'three/examples/jsm/libs/stats.module.js';

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
			animating: true,
			scene: null,
			camera: null,
			renderer: null,
			geometry: null, // = cube
			geometry2: null, // = cuboid
			material: null,
			
			amount: 1000,
			planeWidth: 3000,
			planeHeight: 3000,
			planeDepth: 10000,

			mouseRelativeX: 0,
			mouseRelativeY: 0,
			cameraLookAtY: 0,
			cameraLookAtZ: 0,

			bloomPass: null,
			bloomComposer: null,
			bloomParams: {
				exposure: 1,
				bloomThreshold: 0,
				bloomStrength: 2,
				bloomRadius: 0
			},

			stats: null,

			/* testi: 'testi',
			testi2: {
				other: 'other',
				inner: {
					text: 'text'
				}
			} */
		}
	},

	// Not reactive
	//cubes: [],
	//cubeAttrs: [],
	//containerObject: null,

	created() {
		this.cubes = []
		this.cubeAttrs = []
		this.containerObject = null
	},
	
	mounted() {
		/* console.log('this.testi', this.testi);
		this.testi = 'muutettu testi'
		console.log('this.testi', this.testi);
		console.log('this.$data', this.$data);

		console.log('this.testi2', this.testi2);
		console.log('this.testi2.other', this.testi2.other);
		this.testi2.other = 'muutettu testi2.other'
		console.log('this.testi2.other', this.testi2.other); */
		//console.log('this.testi2', this.testi2);

		/* console.log('this.testi2', this.testi2);
		console.log('this.testi2.inner.text', this.testi2.inner.text);
		this.testi2.inner.text = 'muutettu testi2.inner.text'
		console.log('this.testi2.inner.text', this.testi2.inner.text);
		console.log('this.testi2', this.testi2); */
		//console.log('this.testi2', this.testi2);
		//console.log('this.testi2.inner', this.testi2.inner);
		//this.testi2.inner = { joo: 'jee' }
		//this.$set(this.testi2, 'reactive', { joo: 'jee' })
		//console.log('this.testi2.inner', this.testi2.inner);
		//console.log('this.testi2', this.testi2);

		this.init()
		this.animate()

		//console.log('this.$options.cubes', this.$options.cubes);
		//console.log('this.$options.cubeAttrs', this.$options.cubeAttrs);

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
			//this.setContainer()

			//this.setBloomPass()
			//this.setBloomComposer()

			//this.setGUI()

			// Create meshes
			for (let i = 0; i < this.amount; i++) {
				this.createCube()
			}

			this.initiated = true

			//POISTUU!
			this.stats = new Stats()
			this.$refs.heroCanvas.appendChild(this.stats.dom)
		},

		setRenderer() {
			this.renderer = new THREE.WebGLRenderer({ antialias: false })
			this.renderer.setSize(window.innerWidth, window.innerHeight)
			this.renderer.setPixelRatio(window.devicePixelRatio)
			//this.renderer.toneMapping = THREE.LinearToneMapping
			this.$refs.heroCanvas.appendChild(this.renderer.domElement)
		},

		setCamera() {
			this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, this.planeDepth)
			//this.camera = new THREE.StereoCamera(70, window.innerWidth / window.innerHeight, 0.1, 10000)
			this.camera.position.set(this.planeDepth / 2, 1000, 0)
			this.camera.lookAt(this.planeDepth / -2, 1000, 0)
			//this.camera.lookAt(new THREE.Vector3(this.planeDepth / 2, 0, 0))
			//this.camera.focus(3)
		},

		setScene() {
			this.scene = new THREE.Scene()
			this.scene.background = new THREE.Color(0xffffff)
			this.scene.fog = new THREE.FogExp2(0xffffff, 0.00016)
			//this.renderer.setClearColor(this.scene.fog.color) //EI HUOMAA MITÄÄN EROO / POIMITTU JOSTAIN
			//this.scene.fog = new THREE.Fog(0x000000, 1, 1500)
			//this.scene.fog = new THREE.FogExp2(0x000000, 0.0012)
			
			//this.scene.add(new THREE.AxisHelper(10000)) // AxisHelper(size)
    	//this.scene.add(new THREE.GridHelper(100000, 1000)) // GridHelper(size, step)
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
			this.geometry2 = new THREE.BoxBufferGeometry(20, 20, 60)
		},

		setContainer() {
			const containerObject = new THREE.Object3D()
			//this.$options.containerObject = containerObject
			this.containerObject = containerObject
			this.scene.add(containerObject)
		},

		setBloomPass() {
			this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
			this.bloomPass.threshold = this.bloomParams.threshold
			this.bloomPass.strength = this.bloomParams.strength
			this.bloomPass.radius = this.bloomParams.radius
			//this.renderer.toneMappingExposure = Math.pow(1.05, 4.0)
		},

		setBloomComposer() {
			const renderPass = new RenderPass(this.scene, this.camera)

			this.bloomComposer = new EffectComposer(this.renderer)
			//this.bloomComposer.renderToScreen = true
			this.bloomComposer.addPass(renderPass)
			this.bloomComposer.addPass(this.bloomPass)
		},

		setGUI() {
			const gui = new GUI()

			const bloomFolder = gui.addFolder('Bloom Parameters')

			bloomFolder.add(this.bloomParams, 'exposure', 0.1, 2).onChange((newValue) => {
				//this.renderer.toneMappingExposure = Math.pow(newValue, 4.0)
				//this.render()
			})
			bloomFolder.add(this.bloomParams, 'bloomThreshold', 0, 1).onChange((newValue) => {
				this.bloomParams = newValue
				//this.render()
			})
			bloomFolder.add(this.bloomParams, 'bloomStrength', 0, 3).onChange((newValue) => {
				this.bloomParams = newValue
				//this.render()
			})
			bloomFolder.add(this.bloomParams, 'bloomRadius', 0, 1).onChange((newValue) => {
				this.bloomParams = newValue
				//this.render()
			})
			this.render()	
			
			bloomFolder.open()
		},

		animate() {
			if (this.animating) {
				requestAnimationFrame(this.animate)
				this.render()
				this.updateCubes()
				//this.updateCamera()
				this.stats.update()
			}
		},

		render() {
			this.renderer.render(this.scene, this.camera)
			//this.bloomComposer.render()
		},

		updateCubes() {
			//let time = performance.now() * 0.000002

			// Animating cubes
			//for (let index = 0; index < this.$options.cubes.length; index ++) {
			for (let index = 0; index < this.cubes.length; index ++) {
			//this.$options.cubes.forEach((cube, index) => {
				const cube = this.cubes[index]
				// Delete cube if it's positioned behind camera + buffer
				if (cube.position.x > this.planeDepth / 2 + 100) {
					this.cubes.splice(index, 1)
					this.cubeAttrs.splice(index, 1)
					
					// Create a new cube every time one is deleted
					//this.createCube()

					//POISTA KAMAA OIKEALLLA TAVALLA:
					/* this.renderer.forceContextLoss()
					this.renderer.context = null
					this.renderer.domElement = null
					this.renderer = null */

				} else {
					const attrs = this.cubeAttrs[index]

					//const rotationAddition = time * attrs.rotationSpeed
					//const rotationAddition = attrs.rotationSpeed
	
					// Rotation of cubes
					if (cube.rotation.x > 0) { cube.rotation.x += attrs.rotationSpeed }
					if (cube.rotation.y > 0) { cube.rotation.y += attrs.rotationSpeed }
					if (cube.rotation.z > 0) { cube.rotation.z += attrs.rotationSpeed }
					//if (cube.rotation.x > 0) { cube.rotation.x += rotationAddition }
					//if (cube.rotation.y > 0) { cube.rotation.y += rotationAddition }
					//if (cube.rotation.z > 0) { cube.rotation.z += rotationAddition }
					
					// Moving of cubes
					cube.position.x += attrs.speed * (attrs.acceleration)
				}
			}//)
		},

		updateCamera() {
			const cameraLookAtDiameter = 4000

			// Camera's current target on plane
			this.cameraLookAtY += (-(this.mouseRelativeY * cameraLookAtDiameter) - this.cameraLookAtY) * 0.1
			this.cameraLookAtZ += (-(this.mouseRelativeX * cameraLookAtDiameter) - this.cameraLookAtZ) * 0.1

			// Pointing of camera
			this.camera.lookAt(
				this.planeDepth / -2,
				this.cameraLookAtY,
				this.cameraLookAtZ
			)
		},

		onMousemove(event) {
			event.preventDefault()

			// Calculate mouse's relative position on screen:
			// mid point = (0, 0)
			// min / max = -0.5 / 0.5
			this.mouseRelativeX = -(0.5 - event.clientX / window.innerWidth)
			this.mouseRelativeY = -(0.5 - event.clientY / window.innerHeight)
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
				if (!this.animating) {
					this.animating = true
					this.animate() // Restart animation
				}
			} else {
				this.animating = false
			}
		},

		createCube() {
			let attrs = {
				speed: 0.1, // 0.1-1
				//rotationSpeed: 0.001, // 0.1-1
				acceleration: 0 // 0-1
			}
			const dispersion = {
				acceleration: 20,
				rotationSpeed: 0.05,
				size: 4,
				speed: 15,
			}

			const defaultMaterial = new THREE.MeshLambertMaterial({ color: 0x800f40 })
			const glossyMaterial = new THREE.MeshPhongMaterial({ 
				color: 0x000000,
				//envMap: envMap, // optional environment map
				specular: 0xa78191,
				shininess: 1
			})

			let cube

			//cube = new THREE.Mesh(this.geometry, defaultMaterial)
			if (Math.random() < 0.10) {
				cube = new THREE.Mesh(this.geometry, defaultMaterial)
			} else {
				if (Math.random() < 0.10) {
					cube = new THREE.Mesh(this.geometry2, glossyMaterial)
				} else {
					cube = new THREE.Mesh(this.geometry, glossyMaterial)
				}
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
			cube.scale.setScalar(Math.random() * dispersion.size)

			cube.castShadow = false
			cube.receiveShadow = false

			//this.$options.cubes.push(cube)
			//this.$options.cubeAttrs.push(attrs)
			this.cubes[this.cubes.length] = cube
			this.cubeAttrs[this.cubeAttrs.length] = attrs
			//this.$options.cubes[this.$options.cubes.length] = JSON.parse(JSON.stringify(cube))
			//this.$options.cubeAttrs[this.$options.cubeAttrs.length] = JSON.parse(JSON.stringify(attrs))

			this.scene.add(cube)
			//this.$options.containerObject.add(cube)
		}
	}
}
</script>

<style lang="scss" scoped>
.hero-canvas {}
</style>
