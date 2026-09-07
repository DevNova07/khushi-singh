import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHeartProps {
  isExpanding?: boolean;
}

export const ThreeHeart: React.FC<ThreeHeartProps> = ({ isExpanding = false }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const heartMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 320;
    const height = mount.clientHeight || 320;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Create 3D Heart Geometry
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.25, y + 0.25);
    heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    heartShape.bezierCurveTo(x - 0.35, y, x - 0.35, y + 0.35, x - 0.35, y + 0.35);
    heartShape.bezierCurveTo(x - 0.35, y + 0.55, x - 0.15, y + 0.77, x + 0.25, y + 1.0);
    heartShape.bezierCurveTo(x + 0.65, y + 0.77, x + 0.85, y + 0.55, x + 0.85, y + 0.35);
    heartShape.bezierCurveTo(x + 0.85, y + 0.35, x + 0.85, y, x + 0.5, y);
    heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.15,
      bevelThickness: 0.15
    };

    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geometry.center();

    // Luxurious translucent pink glass material
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FF4081'),
      emissive: new THREE.Color('#C2185B'),
      emissiveIntensity: 0.25,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.7,
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.92
    });

    const heartMesh = new THREE.Mesh(geometry, material);
    heartMesh.rotation.x = Math.PI; // Correct orientation
    scene.add(heartMesh);
    heartMeshRef.current = heartMesh;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff80ab, 3, 50);
    pointLight.position.set(3, 4, 4);
    scene.add(pointLight);

    const goldRimLight = new THREE.PointLight(0xd6a85f, 2, 50);
    goldRimLight.position.set(-3, -3, 3);
    scene.add(goldRimLight);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 0.8;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 0.8;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animationId: number;
    const startTime = performance.now();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      if (heartMesh) {
        // Floating and gentle rotation
        heartMesh.rotation.y = Math.sin(elapsedTime * 0.8) * 0.35 + mouseX;
        heartMesh.rotation.z = Math.cos(elapsedTime * 0.6) * 0.12 - mouseY * 0.5;
        heartMesh.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Handle cinematic transition expansion
  useEffect(() => {
    if (isExpanding && heartMeshRef.current) {
      let scale = 1;
      const expandInterval = setInterval(() => {
        scale += 0.12;
        if (heartMeshRef.current) {
          heartMeshRef.current.scale.set(scale, scale, scale);
        }
        if (scale > 3.5) {
          clearInterval(expandInterval);
        }
      }, 16);
      return () => clearInterval(expandInterval);
    }
  }, [isExpanding]);

  return (
    <div
      ref={mountRef}
      className="w-56 h-56 md:w-72 md:h-72 flex items-center justify-center relative cursor-grab active:cursor-grabbing"
      aria-label="3D Floating Glass Heart"
    />
  );
};
