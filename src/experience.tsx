import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useEffect, useRef } from "react";
import {
  MeshMatcapMaterial,
  SRGBColorSpace,
  TorusGeometry,
  type Mesh,
} from "three";

const torusGeometry = new TorusGeometry(1, 0.6, 16, 32);
const material = new MeshMatcapMaterial();

const DONUT_COUNT = 100;
const donutTransforms = Array.from({ length: DONUT_COUNT }, () => ({
  position: [
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
  ] as [number, number, number],
  scale: 0.2 + Math.random() * 0.2,
  rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [
    number,
    number,
    number,
  ],
}));

export function Experience() {
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);

  useEffect(() => {
    const matcapClone = matcapTexture.clone();
    matcapClone.colorSpace = SRGBColorSpace;
    matcapClone.needsUpdate = true;
    material.matcap = matcapClone;
    material.needsUpdate = true;
    return () => {
      matcapClone.dispose();
    };
  }, [matcapTexture]);

  const donuts = useRef<Mesh[]>([]);

  useFrame((_, delta) => {
    donuts.current.forEach((donut) => {
      donut.rotation.y += delta * 0.2;
    });
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          material={material}
        >
          Hello R3F
        </Text3D>
      </Center>

      {donutTransforms.map(({ position, scale, rotation }, index) => (
        <mesh
          ref={(el) => {
            if (el) {
              donuts.current[index] = el;
            }
          }}
          key={index}
          position={position}
          scale={scale}
          rotation={rotation}
          geometry={torusGeometry}
          material={material}
        />
      ))}
    </>
  );
}
