import '@utrecht/design-tokens/dist/index.css';
import {
  Article,
  Heading1,
  Heading2,
  PageContent,
  PageHeader,
  Paragraph,
} from '@utrecht/component-library-react';
import React from 'react';
import { createBrowserRouter, RouterProvider, NavLink, Outlet } from 'react-router-dom';
import ProjectCard from './components/ProjectCard/ProjectCard';
import Contact from './components/Contact/Contact'; // Updated import
import preview_MS_Maas_95 from './assets/preview_MS_Maas_95.png';
import voorbeeld from './assets/voorbeeld.svg';

const Home = () => (
  <Article>
    <Heading1 className="heading-title-small">Heyo! my name is,</Heading1>
    <Heading1 className="heading-title-big">Mees Post</Heading1>
    <Article className="container">
      <Paragraph className="left-line-text">
        I'm currently wrapping up my final year at ROC Midden Nederland in Amersfoort. Throughout my
        studies, I've really enjoyed diving into different programming languages and frameworks.
        Started with the basics like HTML and CSS, then worked my way through JavaScript and PHP.
        I've also taken on more challenging languages like C# and Rust. Lately, I've been spending a
        lot of time with TypeScript and modern frameworks like React, Vite, and Next.js. One of my
        favorite recent projects involved working with Storybook and the NL Design System
      </Paragraph>
      <div className="vertical-line" />
      <Paragraph className="right-line-text">
        Outside of my studies, I enjoy watching movies and TV series, listening to music, and
        playing games. I am primarily interested in Frontend, and I am enthusiastic about continuing
        to learn and master new skills in this field.
      </Paragraph>
      <div className="flex justify-center mt-8">
        <NavLink to="/contact" className="button-contact">
          Get in touch
        </NavLink>
      </div>
    </Article>
    <Article>
      <Heading2 className="project-heading-title">Projects</Heading2>
      <ProjectCard
        title={'MS Maas 95'}
        status={'In Progress'}
        description={
          'MS Maas95 is a nostalgic Windows 95 themed web application built with Next.js, React95, and TypeScript. It allows users to submit requests for movies and series in a fun, retro-styled interface.'
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
      <ProjectCard
        title={'Discord Bot Rust'}
        status={'In Progress'}
        description={
          'A Discord bot written in Rust that manages automatic voice channel creation. Using the Serenity framework and Tokio for async operations, it implements thread-safe state management.'
        }
        imageSrc={'poep'}
        imageAlt={''}
        tags={['Rust', 'Discord.rs']}
        githubUrl={'https://github.com/MeesoPost/discord-bot-rust'}
        sources={[
          {
            name: 'Discord.rs',
            url: 'https://github.com/SpaceManiac/discord-rs',
          },
        ]}
      />
      <ProjectCard
        title={'Gemeente Voorbeeld'}
        showPreviewLabel={false}
        status={'contributed'}
        description={
          'Collaboration between Frameless, NL Design System and VNG to experience components in an example layout.'
        }
        imageSrc={voorbeeld}
        imageAlt={'Gemeente Voorbeeld website preview'}
        tags={['Next.js', 'typescript', 'NL Design System', 'Utrecht Components']}
        githubUrl={'https://github.com/frameless/gemeentevoorbeeld.nl'}
        sources={[
          {
            name: 'Gemeente Voorbeeld',
            url: 'https://gemeentevoorbeeld.nl',
          },
        ]}
      />
    </Article>
  </Article>
);

const Layout = () => {
  return (
    <>
      <PageHeader>
        <nav className="flex justify-end space-x-4 p-4">
          <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            <span className="nav-link-text">Home</span>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <span className="nav-link-text">Contact</span>
          </NavLink>
        </nav>
      </PageHeader>
      <PageContent>
        <Outlet />
      </PageContent>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
