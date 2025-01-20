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
import Contact from './components/Contact/Contact';
import voorbeeld from './assets/voorbeeld.svg';
import { Button } from './components/Button/Button';

const Home = () => (
  <Article className="article_flex">
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
    </Article>

    <Article>
      <Heading2 className="project-heading-title">Projects</Heading2>
      <ProjectCard
        title={'Gemeente Voorbeeld'}
        showPreviewLabel={false}
        status={'contributed'}
        description={
          'Collaboration between Frameless, NL Design System and VNG to help new municipalities get started with their website. The project is built with Next.js, TypeScript, and the NL Design System.'
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
      <ProjectCard
        title="NL Design System storybook"
        showPreviewLabel={false}
        status="contributed"
        description="I set up the storybook for the nldesignsystem.nl website"
        imageSrc={voorbeeld}
        imageAlt="picture of storybook"
        tags={['Storybook', 'React', 'TypeScript']}
      ></ProjectCard>
    </Article>

    <Button className="contact_button" to="/contact">
      Get in touch
    </Button>
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
