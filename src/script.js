import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/* Debug */

const gui = new GUI()

const debugObject = {} // 1ER PASO

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
debugObject.color = '#69ec22' // 2DO PASO

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
  wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// agregar el mesh a la debug gui //////////////////////
// gui.add(mesh.position, 'x', -3, 3, 0.01)

gui.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('posicion x')

// prettier-ignore
gui.add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('posicion y')

// prettier-ignore
gui.add(mesh.position, 'z')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('posicion z')

// SOLO SE PUEDEN USAR OBJETOS

// const myObject = {
//   myVariable: 0,
//   isGood: true,
// }

// prettier-ignore
// gui.add(myObject, 'myVariable')
//     .min(-3)
//     .max(3)
//     .step(0.01)
//     .name('myVariable')

// prettier-ignore
// gui.add(myObject, 'isGood')

gui.add(mesh, 'visible')

gui.add(material, 'wireframe')

// console.log(material.color)

// ESTA FORMA TRA PROBLEMAS QUE LOS COLORES NO COINCIDEN
// gui.addColor(material, 'color').onChange(function (value) {
//   material.color.set(value)
// })

// prettier-ignore
gui
    .addColor(debugObject, 'color') // 3ER PASO
    .onChange(() => {
        material.color.set(debugObject.color)
    })

// const myFunction = () => {
//     console.log('hey :)');
// }

debugObject.spin = () => {
  gsap.to(mesh.rotation, { duration: 3, y: mesh.rotation.y + Math.PI * 2 })
}

gui.add(debugObject, 'spin')

///////////////////////////////////////////////////////
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
// const clock = new THREE.Clock()

const tick = () => {
  //   const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
