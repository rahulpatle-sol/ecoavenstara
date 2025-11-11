// components/SplineHero.jsx
import { Suspense } from 'react';
import Spline from '@splinetool/react-spline/next';

export default function SplineHero() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Suspense fallback={<div className="text-white text-center mt-20">Loading 3D scene...</div>}>
        <Spline scene="https://my.spline.design/untitled-MeaB6HYDD7Y6bkUz5cQ7eT1F/" />
      </Suspense>
    </div>
  );
}
