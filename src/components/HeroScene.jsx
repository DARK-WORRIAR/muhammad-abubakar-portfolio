import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A single translucent "layer" panel representing a stage of the pipeline
// (design / mobile / web / backend) that drifts into a locked, orbiting stack.
function Layer({ index, total, color, size, wireframe }) {
  const ref = useRef();
  const group = useRef();
  const basePos = useMemo(() => {
    const angle = (index / total) * Math.PI * 2;
    const scatterRadius = 5.5;
    return {
      scattered: new THREE.Vector3(
        Math.cos(angle) * scatterRadius,
        (index - total / 2) * 0.6 + Math.sin(angle) * 1.5,
        Math.sin(angle) * scatterRadius
      ),
      locked: new THREE.Vector3(0, (index - total / 2) * 0.85, 0),
    };
  }, [index, total]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // progress: panels assemble over the first ~4s, then settle into gentle orbit
    const progress = Math.min(t / 4, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    if (group.current) {
      const pos = new THREE.Vector3().lerpVectors(
        basePos.scattered,
        basePos.locked,
        eased
      );
      // gentle continuous rotation once assembled
      const orbitAngle = eased * (Math.PI * 0.4) + t * 0.12;
      group.current.position.set(
        pos.x * (1 - eased * 0.85),
        pos.y,
        pos.z * (1 - eased * 0.85)
      );
      group.current.rotation.y = orbitAngle;
      group.current.rotation.x = 0.5 + Math.sin(t * 0.3 + index) * 0.03;
    }
    if (ref.current) {
      ref.current.material.opacity =
        0.15 + eased * 0.35 + Math.sin(t * 1.2 + index) * 0.03;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={ref}>
        <boxGeometry args={[size, 0.12, size]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          wireframe={wireframe}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(size, 0.12, size)]} />
        <lineBasicMaterial color={color} transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
}

function ConnectorLines() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }
  });
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 4; i++) {
      pts.push(new THREE.Vector3(0, (i - 1.5) * 0.85, 0));
    }
    return pts;
  }, []);
  return (
    <group ref={ref}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ff7a3d" transparent opacity={0.4} />
      </line>
    </group>
  );
}

function Particles() {
  const ref = useRef();
  const count = 140;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return arr;
  }, []);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#3fe0c5" size={0.03} transparent opacity={0.5} />
    </points>
  );
}

export default function HeroScene({ active = true }) {
  const colors = ["#ff7a3d", "#3fe0c5", "#ff7a3d", "#3fe0c5"];
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      camera={{ position: [4.5, 2.2, 6], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ff7a3d" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#3fe0c5" />
      <group rotation={[0.1, 0, 0]}>
        <ConnectorLines />
        {colors.map((c, i) => (
          <Layer
            key={i}
            index={i}
            total={colors.length}
            color={c}
            size={2.4 - i * 0.25}
            wireframe={i % 2 === 1}
          />
        ))}
      </group>
      <Particles />
    </Canvas>
  );
}
