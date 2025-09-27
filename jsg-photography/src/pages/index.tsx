import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import MasonryGallery from '@/components/MasonryGallery';
import SEOHead from '@/components/SEOHead';
import { fetchImagesByFolder, CloudinaryImage } from '@/lib/cloudinary';

export const getStaticProps: GetStaticProps = async () => {
  const images = await fetchImagesByFolder('photography'); // fetch featured/homepage via tag in future
  return { props: { images }, revalidate: 60 };
};

export default function Home({ images }: { images: CloudinaryImage[] }) {
  return (
    <Layout>
      <SEOHead title="Home" description="JSG Photography — Featured work" />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold my-8">Featured Work</h1>
        <MasonryGallery images={images} />
      </div>
    </Layout>
  );
}
