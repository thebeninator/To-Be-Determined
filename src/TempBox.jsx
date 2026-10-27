import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function TempBox() {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x += 1.5 * delta;
    ref.current.rotation.y += 2 * delta;
    ref.current.rotation.z += 1 * delta;
  })

  return(
    <mesh position={[0, 0, -30]} rotation={[0, 0, 0]} ref={ref}>
      <boxGeometry args={[15, 15, 15]} />
      <meshBasicMaterial color="rgb(255, 0, 0)" />        
      <Edges color="black" lineWidth={5}/>
    </mesh>
  );
}

export default TempBox;