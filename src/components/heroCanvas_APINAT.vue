<template>
  <div class="hero-canvas" ref="heroCanvas"></div>
</template>

<script>
//import * as THREE from '../build/three.module.js';
import * as THREE from 'three'
//import Stats from './jsm/libs/stats.module.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

//const opsit = []

export default {
	name: 'heroCanvas',

  /* data() {
    return {
			//container: null,
			stats: null,
			camera: null,
			scene: null,
			renderer: null,
			mouseX: 0,
			mouseY: 0,
			windowHalfX: 0,
			windowHalfY: 0,
			objectsit: []
		}
	}, */

	stats: null,
	camera: null,
	scene: null,
	renderer: null,
	mouseX: 0,
	mouseY: 0,
	windowHalfX: 0,
	windowHalfY: 0,
	objectsit: [],
	
	mounted() {
		this.init()
		/* setTimeout(() => {
			
			this.animate()
		}, 3000); */
		this.animate()
		/* this.$nextTick(() => {
			this.init()
			this.animate()
		}) */

		console.log(this.scene);

		
		//window.addEventListener('resize', this.onWindowResize, false)
		//window.addEventListener('scroll', this.onWindowScroll, false)
		document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
		
		this.$on('hook:beforeDestroy', () => {
			document.removeEventListener( 'mousemove', this.onDocumentMouseMove);
			//window.removeEventListener('resize', this.onWindowResize)
			//window.removeEventListener('scroll', this.onWindowScroll)
			//this.$refs.heroCanvas.removeEventListener('mousemove', this.onMousemove)
		})
	},

  methods: {
		init() {
			//const container = document.createElement( 'div' );
			//document.body.appendChild( container );

			this.$options.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
			this.$options.camera.position.z = 3200;

			this.$options.scene = new THREE.Scene();
			this.$options.scene.background = new THREE.Color( 0xffffff );

			//this.objectsit = [];

			const material = new THREE.MeshNormalMaterial();

			const loader = new THREE.BufferGeometryLoader();
			const self = this
			loader.load( 'bufferGeo.json', function ( geometry ) {
				console.log('geometry', geometry);
				geometry.computeVertexNormals();

				for ( let i = 0; i < 5000; i ++ ) {

					let mesh = new THREE.Mesh( geometry, material );

					mesh.position.x = Math.random() * 8000 - 4000;
					mesh.position.y = Math.random() * 8000 - 4000;
					mesh.position.z = Math.random() * 8000 - 4000;
					mesh.rotation.x = Math.random() * 2 * Math.PI;
					mesh.rotation.y = Math.random() * 2 * Math.PI;
					mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50 + 100;

					//console.log('mesh2', mesh);
					//console.log('self.objectsit', self.objectsit);
					self.$options.objectsit.push(mesh);
					//console.log('self.objectsit2', self.objectsit);

					self.$options.scene.add( mesh );

				}

			} );

			this.$options.renderer = new THREE.WebGLRenderer();
			this.$options.renderer.setPixelRatio( window.devicePixelRatio );
			this.$options.renderer.setSize( window.innerWidth, window.innerHeight );
			this.$refs.heroCanvas.appendChild( this.$options.renderer.domElement );

			this.$options.stats = new Stats();
			this.$refs.heroCanvas.appendChild( this.$options.stats.dom );

			//

			window.addEventListener( 'resize', this.onWindowResize, false );
		},

		onWindowResize() {
			this.$options.windowHalfX = window.innerWidth / 2;
			this.$options.windowHalfY = window.innerHeight / 2;

			this.$options.camera.aspect = window.innerWidth / window.innerHeight;
			this.$options.camera.updateProjectionMatrix();

			this.$options.renderer.setSize( window.innerWidth, window.innerHeight );

		},

		onDocumentMouseMove(event) {
			this.$options.mouseX = ( event.clientX - this.$options.windowHalfX ) * 10;
			this.$options.mouseY = ( event.clientY - this.$options.windowHalfY ) * 10;
		},

		animate() {
			requestAnimationFrame( this.animate );

			this.render();
			this.$options.stats.update();
		},

		render() {
			this.$options.camera.position.x += ( this.$options.mouseX - this.$options.camera.position.x ) * .05;
			this.$options.camera.position.y += ( - this.$options.mouseY - this.$options.camera.position.y ) * .05;
			this.$options.camera.lookAt( this.$options.scene.position );

			for ( var i = 0, il = this.$options.objectsit.length; i < il; i ++ ) {

				this.$options.objectsit[ i ].rotation.x += 0.01;
				this.$options.objectsit[ i ].rotation.y += 0.02;

			}

			this.$options.renderer.render( this.$options.scene, this.$options.camera );
		}
	}
}
</script>

<style lang="scss" scoped>
.hero-canvas {}
</style>
