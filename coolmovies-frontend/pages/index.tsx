import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const HomePage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('../pages/reviews/index')
  }, [router])

};

export default HomePage;
