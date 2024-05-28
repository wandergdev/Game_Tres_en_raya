/*import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import React from "react";
import MainScreen from "@/components/mainScreen";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <MainScreen />
    </section>
  );
}

*/

'use client';

import React from 'react';
import MainScreen from '@/components/mainScreen';

const Home: React.FC = () => {
  return <MainScreen />;
};

export default Home;
