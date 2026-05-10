# 3D Text with R3F — Three.js Journey

Quick recap of what I learned in the **3D Text with React Three Fiber** lesson from [Three.js Journey](https://threejsjourney.com/) by Bruno Simon.

## What this project covers

This project explores how to build a stylized 3D text scene in React Three Fiber with reusable geometry/material setup and lightweight animation.

- **3D typography with `Text3D`** using a JSON font file.
- **Automatic centering with `Center`** so text stays aligned in the scene.
- **Matcap shading with `useMatcapTexture`** for a clean, artistic look without complex lighting.
- **Geometry and material reuse** to render many objects efficiently.
- **Per-frame animation with `useFrame`** to add subtle motion.
- **Scene controls and profiling** with `OrbitControls` and `r3f-perf`.

## What I built

- Set up a `Canvas` with a perspective camera (`fov`, clipping planes, and position).
- Added a `Text3D` title (`Hello R3F`) with bevel settings for depth and edge detail.
- Loaded a matcap texture and applied it to a shared `MeshMatcapMaterial`.
- Created one reusable `TorusGeometry` and rendered 100 donut meshes from it.
- Randomized donut transforms (position, rotation, scale) for visual variety.
- Animated donut rotation over time using `useFrame` and a ref array of meshes.
- Added `OrbitControls` for interactive camera navigation and `Perf` for quick performance checks.

## What I learned

### 1) How to render true 3D text in React Three Fiber

- `Text3D` makes it easy to create extruded text from a typeface JSON file.
- Parameters like `height`, `curveSegments`, and bevel values strongly affect readability and style.
- Wrapping text in `Center` gives a cleaner composition workflow.

### 2) Why matcaps are useful for stylized scenes

- Matcaps simulate rich shading from a texture, so you can avoid setting up multiple lights.
- `useMatcapTexture` from `@react-three/drei` simplifies loading and reuse.
- Managing texture color space (`SRGBColorSpace`) keeps colors visually correct.

### 3) How to scale object counts with reuse

- Reusing one `TorusGeometry` and one material is more efficient than recreating them per mesh.
- A transform array is a simple pattern for procedural scene variation.
- This structure keeps the scene readable while adding many objects.

### 4) How frame-based animation works in R3F

- `useFrame` gives access to `delta` time for smooth, frame-rate-independent animation.
- Storing mesh references in an array allows updating many instances each frame.
- Small motion (slow Y rotation) adds life without hurting clarity.

### 5) Why interactivity and profiling matter early

- `OrbitControls` helps inspect spacing, depth, and composition from multiple angles.
- `r3f-perf` gives immediate feedback when increasing object count or effect complexity.
- Even in a small lesson project, performance-aware habits are worth practicing.

## Run the project

```bash
npm install
npm run dev
```

## Credits

Part of the **Three.js Journey** course by Bruno Simon.
