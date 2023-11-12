import { useRouter } from 'next/router';
import React from 'react';

export interface AboutPageProps {
}

export default function AboutPage (props: AboutPageProps) {
  const route = useRouter();
  console.log('About Query: ', route.query);
  return (
    <div>About Page</div>
  );
}

// export function getServerSideProps () {
//   return {
//     props: {}
//   };
// }