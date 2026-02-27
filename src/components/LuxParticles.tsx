import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleCloud()
{
    const ref = useRef<THREE.Points>(null);

    // Create 1500 particles
    const count = 1500;
    const positions = useMemo(() =>
    {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Golden ratio spiraling / random sphere distribution
            const r = 20 * Math.cbrt(Math.random());
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);

            p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            p[i * 3 + 2] = r * Math.cos(phi);
        }
        return p;
    }, [count]);

    useFrame((state, delta) =>
    {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#d4af37"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
}

export default function LuxParticles()
{
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-50">
            <Canvas camera={{ position: [0, 0, 10] }}>
                <ParticleCloud />
            </Canvas>
        </div>
    );
}
