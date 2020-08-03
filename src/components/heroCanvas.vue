<template>
  <div class="hero-canvas" ref="heroCanvas"></div>
</template>

<script>
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
//import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

// const scene = new THREE.scene()
// TAI:
// import { Scene } from 'three'
// const scene = new Scene()
// Also, see other popular parts of the library:
// '@/node_modules/three/examples/jsm/...

//MUUTA LOPUKSI KAIKKI MATH.RANDOMIT NIIN ETTEI NIISSÄ OLE MILJOONAA DESIMAALIA!
//MUUTA LOPUKSI KAIKKI MATH.RANDOMIT NIIN ETTEI NIISSÄ OLE MILJOONAA DESIMAALIA!
//MUUTA LOPUKSI KAIKKI MATH.RANDOMIT NIIN ETTEI NIISSÄ OLE MILJOONAA DESIMAALIA!
//MUUTA LOPUKSI KAIKKI MATH.RANDOMIT NIIN ETTEI NIISSÄ OLE MILJOONAA DESIMAALIA!
//MUUTA LOPUKSI KAIKKI MATH.RANDOMIT NIIN ETTEI NIISSÄ OLE MILJOONAA DESIMAALIA!

export default {
	name: 'heroCanvas',

  data() {
    return {
			initated: false,
			scene: null,
			camera: null,
			renderer: null,
			geometry: null,
			material: null,
			//cubes: [],
			//cubeAttrs: [],
			amount: 2000,
			planeWidth: 2000,
			planeHeight: 1000,
			planeDepth: 5000,
			bloomPass: null,
			bloomComposer: null,

			mouseX: 0,
			mouseY: 0,
		}
	},

	// Not reactive
	cubes: [],
	cubeAttrs: [],
	containerObject: null,
	
	mounted() {
		this.init()
		this.animate()

		//console.log(this.scene);

		window.addEventListener('resize', this.onWindowResize, false)
		this.$refs.heroCanvas.addEventListener('mousemove', this.onMousemove, false)
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

			this.initated = true
		},

		setRenderer() {
			this.renderer = new THREE.WebGLRenderer({ antialias: true })
			this.renderer.setSize(window.innerWidth, window.innerHeight)
			this.renderer.setPixelRatio(window.devicePixelRatio)
			this.renderer.toneMapping = THREE.LinearToneMapping
			this.$refs.heroCanvas.appendChild(this.renderer.domElement)
		},

		setCamera() {
			this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10000)
			//this.camera = new THREE.StereoCamera(70, window.innerWidth / window.innerHeight, 0.1, 10000)
			this.camera.position.set(1000, 0, 1200)
			//this.camera.focus(3)

			//this.camera.position.z = 5
			//this.camera.lookAt( scene.position )
			//this.camera.lookAt(0, 0, 0)
			//this.camera.rotation.y = 90 * Math.PI / 180
		},

		setScene() {
			this.scene = new THREE.Scene()
			this.scene.background = new THREE.Color(0xffffff)
			//this.scene.fog = new THREE.Fog(0x000000, 1, 1500)
			//this.scene.fog = new THREE.FogExp2(0x000000, 0.0012)
			this.scene.fog = new THREE.FogExp2(0xffffff, 0.0005)
			this.renderer.setClearColor(this.scene.fog.color) //EI HUOMAA MITÄÄN EROO / POIMITTU JOSTAIN
		},

		setLights() {
			const amibientLight = new THREE.AmbientLight(0xffffff, 1)
			amibientLight.castShadow = true
			this.scene.add(amibientLight)
			//let light = new THREE.DirectionalLight(0xff0000, 0.35)
			//light.position.set(1, 1, 1).normalize()
			//this.scene.add(light)
			
			//const light = new THREE.SpotLight('#da0463', 2, 1000)
      //light.position.set(0, 0, 30)
			//this.scene.add(light)
			
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
			//this.bloomComposer.renderToScreen = true //TUTKI!!!
			this.bloomComposer.addPass(renderPass)
			this.bloomComposer.addPass(this.bloomPass)
		},

		animate() {
			requestAnimationFrame(this.animate)
			this.updateCubes()
			this.render()
		},

		render() {
			//this.renderer.render(this.scene, this.camera)
			this.bloomComposer.render()
		},

		updateCubes() {
			let time = performance.now() * 0.000002

			// Randomly create new cube
			if (Math.random() < 0.15) {
				this.createCube()
			}

			// Animating cubes
			this.$options.cubes.forEach((cube, index) => {
				const attrs = this.$options.cubeAttrs[index]
				const rotationAddition = time * attrs.rotationSpeed

				// Rotation of cubes
				if (cube.rotation.x > 0) { cube.rotation.x += rotationAddition }
				if (cube.rotation.y > 0) { cube.rotation.y += rotationAddition }
				if (cube.rotation.z > 0) { cube.rotation.z += rotationAddition }
				
				// Moving of cubes
				cube.position.z += attrs.speed * (10 + attrs.acceleration)
			})

			//this.renderer.render(this.scene, this.camera)
		},

		onWindowResize() {
			this.camera.aspect = window.innerWidth / window.innerHeight
			this.camera.updateProjectionMatrix()
			
			this.bloomComposer.setSize(window.innerWidth, window.innerHeight)
			this.renderer.setSize(window.innerWidth, window.innerHeight)
		},

		onMousemove(event) {
			event.preventDefault()

			let deltaX = event.clientX - this.mouseX
			let deltaY = event.clientY - this.mouseY
			
			this.mouseX = event.clientX
			this.mouseY = event.clientY

			//this.rotateScene(deltaX, deltaY)
			
			// Rotate container of cubes
			this.$options.containerObject.rotation.y += deltaX / 5000
			this.$options.containerObject.rotation.x += deltaY / 5000
			//https://github.com/mrdoob/three.js/blob/master/examples/misc_lookat.html
			/* camera.position.x += ( mouseX - camera.position.x ) * .05;
				camera.position.y += ( - mouseY - camera.position.y ) * .05;
				camera.lookAt( scene.position ); */
		},

		createCube() {
			let attrs = {
				position: { x: 0, y: null, z: null },
				speed: 0.1, // 0.1-1
				acceleration: 0, // 0-1
				rotation: { x: null, y: null, z: null },
				rotationSpeed: 0.1, // 0.1-1
			}
			const dispersion = {
				acceleration: 10,
				rotationSpeed: 0.3,
				size: 4,
				speed: 10,
			}

			const defaultMaterial = new THREE.MeshLambertMaterial({ color: 0x800f40 })
			const glossyMaterial = new THREE.MeshPhongMaterial( { 
				color: 0x000000,
				//envMap: envMap, // optional environment map
				specular: 0xa78191,
				shininess: 1
			})
			let cube


			if (Math.random() < 0.25) {
				cube = new THREE.Mesh(this.geometry, defaultMaterial)
			} else {
				cube = new THREE.Mesh(this.geometry, glossyMaterial)
			}

			// Set cube's position on plane
			cube.position.y = attrs.y = Math.random() * this.planeWidth - (this.planeWidth / 2)
			cube.position.z = attrs.z = Math.random() * this.planeHeight - (this.planeHeight / 2)

			// Position cube depth-wise on it's first render
			if (!this.initiated) { cube.position.x = attrs.x = Math.random() * this.planeDepth }

			// Set cube's rotation
			if (Math.random() > 0.4) { cube.rotation.x = attrs.rotation.x = Math.random() }
			if (Math.random() > 0.4) { cube.rotation.y = attrs.rotation.y = Math.random() }
			if (Math.random() > 0.4) { cube.rotation.z = attrs.rotation.z = Math.random() }
			if (Math.random() > 0.4) { attrs.rotationSpeed = Math.random() * dispersion.rotationSpeed }

			// Set cube's speed and acceleration
			if (Math.random() > 0.4) { attrs.speed += Math.random() / dispersion.speed }
			if (Math.random() > 0.4) { attrs.acceleration = Math.random() * dispersion.acceleration }

			// Set cube's size
			cube.scale.setScalar(Math.random() * dispersion.size, )
			//const joo = Math.random() * dispersion.size
			//cube.scale(joo, joo, joo * 3)
			/* if (Math.random() < 0.25) {
				cube.scale.setScalar(1, 1, 3)
			} */

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
