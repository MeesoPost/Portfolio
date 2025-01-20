import { Article, Heading3, Link, Paragraph, StatusBadge } from '@utrecht/component-library-react';
import { IconBrandGithub, IconExternalLink, IconSourceCode } from '@tabler/icons-react';
import React from 'react';
import './ProjectCard.css';

interface Source {
  name: string;
  url: string;
}

interface ProjectCardProps {
  title: string;
  status: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  sources?: Source[];
  showPreviewLabel?: boolean; // New optional prop
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  status,
  description,

  tags,
  githubUrl,
  demoUrl,
  sources,
}) => {
  return (
    <div className="Project-Card">
      <div className="ProjectCard-content">
        <Article className="HeadingStatus-Group">
          <Heading3>{title}</Heading3>
          <StatusBadge className="StatusBadge-dark">{status}</StatusBadge>
        </Article>

        <Paragraph className="ProjectCard-description">{description}</Paragraph>

        <div className="ProjectCard-tags">
          {tags.map((tag) => (
            <span key={tag} className="ProjectCard-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="ProjectCard-links">
          {githubUrl && (
            <Link
              href={githubUrl}
              className="ProjectCard-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandGithub size={20} stroke={1.5} />
              GitHub
            </Link>
          )}
          {demoUrl && (
            <Link
              href={demoUrl}
              className="ProjectCard-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconExternalLink size={20} stroke={1.5} />
              Live Demo
            </Link>
          )}
          {sources &&
            sources.length > 0 &&
            sources.map((source) => (
              <Link
                key={source.url}
                href={source.url}
                className="ProjectCard-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconSourceCode size={20} stroke={1.5} />
                {source.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
