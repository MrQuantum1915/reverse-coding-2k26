'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BlueDataStream = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 12; 

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const streamLight = new THREE.PointLight(0xffffff, 2, 30);
    streamLight.position.set(0, 0, 5);
    scene.add(streamLight);

    const particles = [];
    const particleCount = 450; 

    const targetColor = new THREE.Color("rgb(3, 63, 147)");
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: targetColor, 
      emissive: targetColor, 
      emissiveIntensity: 4.0,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 1.0,
    });

    const calculateConePosition = (xPos) => {
        const dist = Math.abs(xPos);
        

        const maxRadius = 0.5 + (dist * 0.3); 

        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * maxRadius;

        return {
            y: Math.cos(angle) * radius,
            z: Math.sin(angle) * radius
        };
    };


    for (let i = 0; i < particleCount; i++) {
      const cube = new THREE.Mesh(geometry, baseMaterial);
      
 
      cube.position.x = (Math.random() - 0.5) * 70; 
      
      const pos = calculateConePosition(cube.position.x);
      cube.position.y = pos.y;
      cube.position.z = pos.z;

      cube.userData = {
        speed: 0.08 + Math.random() * 0.1,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.3
        },
        // Twinkle Data
        blinkSpeed: 3 + Math.random() * 7, 
        blinkOffset: Math.random() * Math.PI
      };

      scene.add(cube);
      particles.push(cube);
    }

    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      particles.forEach(cube => {
        cube.position.x += cube.userData.speed;
        
        cube.rotation.x += cube.userData.rotSpeed.x;
        cube.rotation.y += cube.userData.rotSpeed.y;

        const scale = 0.8 + Math.sin(time * cube.userData.blinkSpeed + cube.userData.blinkOffset) * 0.6;
        cube.scale.setScalar(scale);

        if (cube.position.x > 35) {
          cube.position.x = -35; 
          
        
          const pos = calculateConePosition(-35);
          cube.position.y = pos.y * (0.8 + Math.random() * 0.2); 
          cube.position.z = pos.z * (0.8 + Math.random() * 0.2);
        }
      });

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
      geometry.dispose();
      baseMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', outline: 'none' }} />;
};

export default BlueDataStream;