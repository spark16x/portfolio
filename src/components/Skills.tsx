import React from 'react';
import TiltCard from './TiltCard';
import { Code, Server, Terminal } from 'lucide-react';

export interface Skill {
  name: string;
  level: string;
}

const frontendSkills: Skill[] = [
  { name: 'React', level: '92%' },
  { name: 'Next.js', level: '88%' },
  { name: 'Tailwind CSS', level: '90%' },
  { name: 'Shadcn UI', level: '60%' }
];

const backendSkills: Skill[] = [
  { name: 'Node.js', level: '85%' },
  { name: 'Express', level: '82%' },
  { name: 'MongoDB', level: '78%' },
  { name: 'Bun', level: '25%' }
];

const tools: string[] = [
  'Git/GitHub',
  'Firebase',
  'AI APIs',
  'Anime.js',
  'Vercel',
  'Performance Tuning'
];

export default function Skills() {
  return (
    <section className="py-xl" id="skills">
      <div className="text-center mb-xl">
        <h2 className="font-headline-lg text-headline-lg">Creative Skills</h2>
        <p className="text-secondary font-body-md">The tools and technologies I use to bring ideas to life.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        {/* Frontend */}
        <TiltCard className="bg-white p-lg rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors shadow-sm">
          <Code className="text-primary mb-sm w-8 h-8" />
          <h3 className="font-headline-md text-headline-md mb-md">Frontend</h3>
          <div className="space-y-4 font-body-sm text-secondary">
            {frontendSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-primary transition-all duration-1000 ease-out"
                    style={{ width: skill.level }}
                  />
                </div>
              </div>
            ))}
          </div>
        </TiltCard>

        {/* Backend */}
        <TiltCard className="bg-white p-lg rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors shadow-sm">
          <Server className="text-primary mb-sm w-8 h-8" />
          <h3 className="font-headline-md text-headline-md mb-md">Backend</h3>
          <div className="space-y-4 font-body-sm text-secondary">
            {backendSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-primary transition-all duration-1000 ease-out"
                    style={{ width: skill.level }}
                  />
                </div>
              </div>
            ))}
          </div>
        </TiltCard>

        {/* Tools & Stack */}
        <TiltCard className="bg-white p-lg rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors shadow-sm">
          <Terminal className="text-primary mb-sm w-8 h-8" />
          <h3 className="font-headline-md text-headline-md mb-md">Tools & Creative Stack</h3>
          <div className="flex flex-wrap gap-xs">
            {tools.map((tool) => (
              <span
                key={tool}
                className="bg-surface-container text-secondary px-sm py-1 rounded-full text-label-sm font-label-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
