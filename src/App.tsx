// import '@utrecht/component-library-css';
import '@utrecht/design-tokens/dist/index.css';
import {
  Article,
  Heading1,
  Heading2,
  PageContent,
  Paragraph,
} from '@utrecht/component-library-react';
import React from 'react';
import ProjectCard from './components/ProjectCard/ProjectCard';
import preview_MS_Maas_95 from './assets/preview_MS_Maas_95.png';

const App: React.FC = () => {
  return (
    <PageContent>
      <Article>
        <Heading1 className="heading-title-small">Heyo! my name is,</Heading1>
        <Heading1 className="heading-title-big">Mees Post</Heading1>
      </Article>
      <Article className="container">
        <Paragraph className="left-line-text">
          I'm currently wrapping up my final year at ROC Midden Nederland in Amersfoort. Throughout
          my studies, and one very I've really enjoyed diving into different programming languages
          and frameworks. Started with the basics like HTML and CSS, then worked my way through
          JavaScript and PHP. I've also taken on more challenging languages like C# and Rust.
          Lately, I've been spending a lot of time with TypeScript and modern frameworks like React,
          Vite, and Next.js. One of my favorite recent projects involved working with Storybook and
          the NL Design System
        </Paragraph>
        <div className="verticalLine" />
        <Paragraph className="right-line-text">
          Outside of my studies, I enjoy watching movies and TV series, listening to music, and
          playing games. I am primarily interested in Frontend, and I am enthusiastic about
          continuing to learn and master new skills in this field.
        </Paragraph>
      </Article>
      <Article>
        <Heading2 className="project-heading-title">Projects</Heading2>
        <ProjectCard
          title={'MS Maas 95'}
          status={'In Progress'}
          description={
            'MS Maas95 is a nostalgic Windows 95 themed web application built with Next.js, React95, and TypeScript. It allows users to submit requests for movies and series in a fun, retro-styled interface. (only if you know the login though)'
          }
          imageSrc={preview_MS_Maas_95}
          imageAlt={'MS Maas 95 website preview in windows 95 style'}
          tags={[
            'Nextjs',
            'React',
            'TypeScript',
            'React95 (storybook)',
            'NL Design System',
            'Utrecht Components',
          ]}
          githubUrl={'https://github.com/MeesoPost/react95'}
          demoUrl={'https://react95-meesoposts-projects.vercel.app/'}
          sources={[
            {
              name: 'React95',
              url: 'https://react95.github.io/React95/?path=/story/all--all',
            },
          ]}
        />
      </Article>
    </PageContent>
  );
};

export default App;
