'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const TesseractViewer = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    
    // 1. Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5; // Increased exposure to make the core pop
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    currentMount.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture;

    // 3. Lighting
    // Ambient Light (Low, so the black stays black)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // External Rim Lights (To define the shape)
    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(-5, 5, -5);
    scene.add(backLight);

    // CORE REACTOR LIGHT (The "Inside" Brightness)
    // Positioned at 0,0,0 to light it from within
    const coreLight = new THREE.PointLight(0x00ffff, 30, 10); // Color, Intensity, Distance
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // 4. Model Loader
    const loader = new GLTFLoader();
    let model = null;
    let mixer = null;

    loader.load('/dark_tesseract.glb', (gltf) => {
      model = gltf.scene;
      
      model.traverse((child) => {
        if (child.isMesh && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          
          materials.forEach(mat => {
             // 🔹 MATERIAL SETTINGS: Black Metal
             mat.color.set(0x000000); // Pure Black
             mat.metalness = 0.9;     // Metallic look
             mat.roughness = 0.1;     // Very shiny/glossy
             
             // Important: Render both sides so the internal light hits the inside walls
             mat.side = THREE.DoubleSide; 
             
             // Slight emissive hint to prevent it from disappearing completely in dark areas
             mat.emissive.set(0x001133); // Very dark blue glow
             mat.emissiveIntensity = 0.2;

             mat.transparent = true;
             mat.opacity = 0.95; 
             mat.needsUpdate = true;
          });

          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(model);

      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      }

      const box = new THREE.Box3().setFromObject(model);
      const maxDim = Math.max(box.getSize(new THREE.Vector3()).x, box.getSize(new THREE.Vector3()).y, box.getSize(new THREE.Vector3()).z);
      const scale = 2.5 / maxDim;
      model.scale.multiplyScalar(scale);
      
      const center = box.getCenter(new THREE.Vector3());
      model.position.x = -center.x * scale;
      model.position.y = -center.y * scale;
      model.position.z = -center.z * scale;
    });

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false; 
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;

    // 6. Animation Loop
    const clock = new THREE.Clock();
    let animationId;
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      
      const time = clock.getElapsedTime();
      coreLight.intensity = 20 + Math.sin(time * 3) * 10; 

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (currentMount) currentMount.removeChild(renderer.domElement);
      renderer.dispose();
      pmremGenerator.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', outline: 'none' }} />;
};

export default TesseractViewer;