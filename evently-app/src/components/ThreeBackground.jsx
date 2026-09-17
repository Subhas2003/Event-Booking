import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Renders a drifting field of chromatic particles plus a few sweeping
// "laser" beams, echoing the DESIGN.md brief: "Prismatic gradients that
// mimic laser projections, light tunnels, and festival wristbands."
export default function HeroScene({ className = '' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const width = Math.max(mount.clientWidth, 1)
    const height = Math.max(mount.clientHeight, 1)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100)
    camera.position.z = 12

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)

    //  Particle field 
    const particleCount = 260
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const palette = [
      new THREE.Color('#d0bcff'), // primary
      new THREE.Color('#ffb0cd'), // secondary
      new THREE.Color('#4cd7f6'), // tertiary
    ]

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // --- Laser beams ---
    const beamGroup = new THREE.Group()
    const beamColors = ['#8B5CF6', '#EC4899', '#06B6D4']
    beamColors.forEach((hex, i) => {
      const beamGeo = new THREE.CylinderGeometry(0.015, 0.015, 20, 8, 1, true)
      const beamMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(hex),
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      })
      const beam = new THREE.Mesh(beamGeo, beamMat)
      beam.rotation.z = Math.PI / 2
      beam.position.set(-4 + i * 4, -2 + i * 1.5, -4)
      beam.userData.speed = 0.15 + i * 0.05
      beamGroup.add(beam)
    })
    scene.add(beamGroup)

    const clock = new THREE.Clock()

    const animate = () => {
      const t = clock.getElapsedTime()

      const motionScale = prefersReducedMotion ? 0.2 : 1
      const motionTime = t * motionScale

      points.rotation.y = motionTime * 0.06
      points.rotation.x = Math.sin(motionTime * 0.05) * 0.05

      beamGroup.children.forEach((beam, i) => {
        beam.rotation.x = Math.sin(motionTime * beam.userData.speed + i) * 0.6
        beam.rotation.z = Math.PI / 2 + Math.cos(motionTime * beam.userData.speed * 0.5) * 0.3
      })

      camera.position.x = Math.sin(motionTime * 0.05) * 0.6
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(animate)

    const handleResize = () => {
      const w = Math.max(mount.clientWidth, 1)
      const h = Math.max(mount.clientHeight, 1)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      renderer.setAnimationLoop(null)
      window.removeEventListener('resize', handleResize)
      geometry.dispose()
      material.dispose()
      beamGroup.children.forEach((b) => {
        b.geometry.dispose()
        b.material.dispose()
      })
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className={`pointer-events-none ${className}`} />
}
